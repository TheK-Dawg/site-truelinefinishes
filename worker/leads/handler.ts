/**
 * POST /api/lead: the site's own enquiry handler (site lead kit).
 *
 *   checks   same-origin, honeypot, required fields, Turnstile, per-IP limit, English, spam score
 *   save     lead + one outbox row per recipient + the recording-copy row, in ONE D1 batch
 *   send     each recipient through this Worker's send_email binding (Cloudflare Email Sending)
 *   record   Olympus copy afterwards, in waitUntil/cron only: never on the submit path
 *
 * The visitor is told "received" only once the lead is durably saved (or, if the store is
 * down, once at least one recipient has accepted the email). Anything not yet delivered is
 * retried by the cron trigger (scheduled -> drainOutbox).
 */
import { leadConfig, type LeadEnv } from './config';
import { composeLeadEmail, type Fields } from './compose';
import { scoreSpam } from './spam';
import { nonEnglishReason } from './lang-guard.js';
import { drainOutbox, sendEmailRow, sendRecordRow, type LeadRow, type OutboxRow } from './outbox';

export interface LeadRequestDeps {
  /** Turnstile verdict for the token (injected so tests never call Cloudflare). */
  verifyTurnstile(token: string, ip: string): Promise<{ ok: boolean; verdict: string }>;
  waitUntil(p: Promise<unknown>): void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const;
const RATE_LIMIT = { count: 8, minutes: 10 };

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

async function sha(text: string) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Field contract: the ordinary fields this form has always sent, in email order. */
export const FIELD_ORDER = ['name', 'email', 'phone', 'postcode', 'message', 'service'] as const;

export async function handleLeadPost(req: Request, env: LeadEnv, deps: LeadRequestDeps): Promise<Response> {
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin) return json({ ok: false, error: 'forbidden' }, 403);
  let body: Record<string, unknown>;
  try { body = (await req.json()) as Record<string, unknown>; } catch { return json({ ok: false, error: 'bad-request' }, 400); }

  // Honeypot: answered like a success so a bot learns nothing. Nothing stored or sent.
  if (str(body._company)) return json({ ok: true }, 202);

  const cfg = leadConfig(env);
  const fields: Fields = {
    name: str(body.name, 120), email: str(body.email, 200).toLowerCase(), phone: str(body.phone, 40),
    postcode: str(body.postcode, 80), message: str(body.message, 4000), service: str(body.service, 120),
  };
  const invalid = [
    !fields.name && 'name', !EMAIL_RE.test(fields.email) && 'email', !PHONE_RE.test(fields.phone) && 'phone',
    !fields.postcode && 'postcode', !fields.message && 'message',
  ].filter(Boolean) as string[];
  if (invalid.length) return json({ ok: false, error: 'invalid', fields: invalid }, 400);

  const ip = req.headers.get('cf-connecting-ip') || '';
  const ts = await deps.verifyTurnstile(str(body['cf-turnstile-response'], 4096), ip);
  if (!ts.ok) return json({ ok: false, error: 'forbidden', verdict: ts.verdict }, 403);

  // Server-side attribution, in the order the lead email has always shown it.
  const attribution: Record<string, string> = {};
  const pageUrl = str(body.page_url, 500) || str(req.headers.get('referer'), 500);
  if (pageUrl) attribution.page_url = pageUrl;
  const referrer = str(body.referrer, 500);
  if (referrer) attribution.referrer = referrer;
  attribution.ip = ip || 'unknown';
  const ua = str(req.headers.get('user-agent'), 200);
  if (ua) attribution.user_agent = ua;
  for (const k of UTM) { const v = str(body[k], 300); if (v) attribution[k] = v; }

  const db = env.LEADS;
  const nonEnglish = nonEnglishReason(fields.message);
  if (nonEnglish) {
    await db.prepare(`INSERT INTO rejections(id,reason,detail,page_url) VALUES(?,?,?,?)`)
      .bind(`rej_${crypto.randomUUID()}`, 'non-english', nonEnglish, attribution.page_url || null).run().catch(() => {});
    return json({ ok: false, error: 'Please write your message in English.' }, 422);
  }

  const spam = scoreSpam(fields);
  const status = spam.verdict === 'spam' ? 'spam' : spam.verdict === 'hold' && cfg.holdPolicy === 'hold' ? 'held' : 'pending';
  const { subject, text } = composeLeadEmail(cfg, fields, attribution);
  const submissionId = str(body.submission_id, 80);
  const idemKey = /^[A-Za-z0-9_-]{8,80}$/.test(submissionId)
    ? `sub:${submissionId}`
    : `h:${await sha([fields.email, fields.phone, fields.message, new Date().toISOString().slice(0, 13)].join('|'))}`;
  const leadId = `${cfg.host.split('.')[0].replace(/[^a-z0-9]/g, '')}_${Date.now().toString(36)}${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
  const emails = status === 'pending' ? cfg.recipients : [];

  try {
    const recent = await db.prepare(`SELECT COUNT(*) AS n FROM leads WHERE ip=? AND created_at > datetime('now', ?)`)
      .bind(ip, `-${RATE_LIMIT.minutes} minutes`).first<{ n: number }>();
    if (ip && (recent?.n ?? 0) >= RATE_LIMIT.count) {
      await db.prepare(`INSERT INTO rejections(id,reason,detail,page_url) VALUES(?,?,?,?)`)
        .bind(`rej_${crypto.randomUUID()}`, 'rate-limit', `${recent?.n} in ${RATE_LIMIT.minutes} min`, attribution.page_url || null).run().catch(() => {});
      return json({ ok: false, error: 'too many submissions; try again later' }, 429);
    }
    const existing = await db.prepare(`SELECT id FROM leads WHERE idem_key=?`).bind(idemKey).first<{ id: string }>();
    if (existing) return json({ ok: true, id: existing.id, duplicate: true });
    await db.batch([
      db.prepare(`INSERT INTO leads(id,idem_key,status,fields_json,attribution_json,ip,spam_score,spam_reasons,reply_to,subject,body) VALUES(?,?,?,?,?,?,?,?,?,?,?)`)
        .bind(leadId, idemKey, status, JSON.stringify(fields), JSON.stringify(attribution), ip || null, spam.score, spam.reasons.join('; ') || null, fields.email || null, subject, text),
      ...emails.map((to, i) => db.prepare(`INSERT INTO outbox(id,lead_id,kind,target,state) VALUES(?,?,'email',?,'pending')`).bind(`${leadId}_e${i}`, leadId, to)),
      db.prepare(`INSERT INTO outbox(id,lead_id,kind,target,state) VALUES(?,?,'record','olympus','pending')`).bind(`${leadId}_r`, leadId),
    ]);
  } catch (e) {
    // A race on the same submission id lands here as a UNIQUE failure: that lead is saved.
    const raced = await db.prepare(`SELECT id FROM leads WHERE idem_key=?`).bind(idemKey).first<{ id: string }>().catch(() => null);
    if (raced) return json({ ok: true, id: raced.id, duplicate: true });
    // Store unavailable: never pretend. Try the email directly; succeed only if someone got it.
    console.error('lead store unavailable', (e as Error).message?.slice(0, 120));
    if (status !== 'pending') return json({ ok: false, error: 'server' }, 503);
    let accepted = 0;
    for (const to of cfg.recipients) {
      try { await env.LEAD_MAIL.send({ from: { email: cfg.from, name: cfg.business }, to, replyTo: fields.email, subject, text }); accepted++; }
      catch (err) { console.error('lead email failed (no store)', (err as { code?: string }).code || 'error'); }
    }
    return accepted ? json({ ok: true, stored: false }) : json({ ok: false, error: 'server' }, 503);
  }

  // Saved. Send now (each recipient independently), then record in the background.
  const lead = await db.prepare(`SELECT * FROM leads WHERE id=?`).bind(leadId).first<LeadRow>();
  if (lead) {
    const rows = (await db.prepare(`SELECT * FROM outbox WHERE lead_id=? ORDER BY rowid`).bind(leadId).all<OutboxRow>()).results;
    for (const row of rows.filter((r) => r.kind === 'email')) await sendEmailRow(env, cfg, row, lead);
    const record = rows.find((r) => r.kind === 'record');
    if (record) deps.waitUntil(sendRecordRow(env, cfg, record, lead).catch(() => {}));
  }
  return json({ ok: true, id: leadId });
}

export { drainOutbox, leadConfig };
