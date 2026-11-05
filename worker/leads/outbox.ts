/**
 * Durable outbox: every lead email (one row per recipient) and the Olympus recording copy are
 * rows in this site's D1. A row is claimed with a short lease before it is worked, so the
 * submit request and the cron retry never send the same row at once. Each row retries on its
 * own backoff and goes 'dead' (visible, never silently dropped) after the last attempt.
 *
 * Email and recording are independent: a failed recording copy never touches an email row,
 * and the recording copy is only ever sent from here (waitUntil / cron), never inline.
 */
import type { LeadConfig, LeadEnv } from './config';

export const BACKOFF_MS = [60e3, 5 * 60e3, 15 * 60e3, 60 * 60e3, 3 * 3600e3, 6 * 3600e3, 12 * 3600e3, 24 * 3600e3];
export const MAX_ATTEMPTS = BACKOFF_MS.length + 1;
const LEASE_MS = 2 * 60e3;
// Email Service errors that a retry cannot fix.
const PERMANENT = new Set(['E_VALIDATION_ERROR', 'E_FIELD_MISSING', 'E_CONTENT_TOO_LARGE', 'E_TOO_MANY_RECIPIENTS', 'E_RECIPIENT_SUPPRESSED', 'E_RECIPIENT_NOT_ALLOWED', 'E_HEADER_NOT_ALLOWED', 'E_HEADER_USE_API_FIELD', 'E_HEADER_VALUE_INVALID']);

export interface OutboxRow { id: string; lead_id: string; kind: 'email' | 'record'; target: string; state: string; attempts: number }
export interface LeadRow { id: string; status: string; fields_json: string; attribution_json: string; spam_score: number; spam_reasons: string | null; reply_to: string | null; subject: string; body: string; created_at: string }

const now = () => Date.now();
const errText = (e: unknown) => {
  const err = e as { code?: string; message?: string };
  return `${err?.code ? `${err.code}: ` : ''}${String(err?.message || e)}`.slice(0, 300);
};

async function claim(db: D1Database, id: string, at: number): Promise<boolean> {
  const r = await db.prepare(
    `UPDATE outbox SET state='sending', lease_until=?, attempts=attempts+1, updated_at=datetime('now')
     WHERE id=? AND ((state='pending' AND next_at<=?) OR (state='sending' AND lease_until<?))`,
  ).bind(at + LEASE_MS, id, at, at).run();
  return (r.meta?.changes ?? 0) === 1;
}

async function settle(db: D1Database, row: OutboxRow, ok: boolean, detail: string | null, permanent = false) {
  const attempts = row.attempts + 1;
  if (ok) {
    await db.prepare(`UPDATE outbox SET state='sent', provider_id=?, last_error=NULL, lease_until=0, updated_at=datetime('now') WHERE id=?`).bind(detail, row.id).run();
    return;
  }
  const dead = permanent || attempts >= MAX_ATTEMPTS;
  await db.prepare(`UPDATE outbox SET state=?, next_at=?, last_error=?, lease_until=0, updated_at=datetime('now') WHERE id=?`)
    .bind(dead ? 'dead' : 'pending', dead ? 0 : now() + BACKOFF_MS[Math.min(attempts - 1, BACKOFF_MS.length - 1)], detail, row.id).run();
}

/** Lead status from its email rows; re-arms the recording copy when the status moves on. */
export async function refreshLeadStatus(db: D1Database, leadId: string) {
  const lead = await db.prepare(`SELECT status FROM leads WHERE id=?`).bind(leadId).first<{ status: string }>();
  if (!lead || lead.status === 'spam' || lead.status === 'held') return lead?.status;
  const rows = (await db.prepare(`SELECT state FROM outbox WHERE lead_id=? AND kind='email'`).bind(leadId).all<{ state: string }>()).results;
  const sent = rows.filter((r) => r.state === 'sent').length;
  const dead = rows.filter((r) => r.state === 'dead').length;
  const status = rows.length && sent === rows.length ? 'sent' : sent ? 'partial' : rows.length && dead === rows.length ? 'failed' : 'pending';
  if (status !== lead.status) {
    await db.batch([
      db.prepare(`UPDATE leads SET status=?, updated_at=datetime('now') WHERE id=?`).bind(status, leadId),
      // The recording copy carries delivery state, so a change is posted again (same id: Olympus updates, never duplicates).
      db.prepare(`UPDATE outbox SET state='pending', next_at=0, attempts=0, updated_at=datetime('now') WHERE lead_id=? AND kind='record' AND state IN ('sent','dead')`).bind(leadId),
    ]);
  }
  return status;
}

export async function sendEmailRow(env: LeadEnv, cfg: LeadConfig, row: OutboxRow, lead: LeadRow) {
  if (!(await claim(env.LEADS, row.id, now()))) return 'skipped';
  try {
    const result = await env.LEAD_MAIL.send({
      from: { email: cfg.from, name: cfg.business },
      to: row.target,
      ...(lead.reply_to ? { replyTo: lead.reply_to } : {}),
      subject: lead.subject,
      text: lead.body,
    });
    await settle(env.LEADS, row, true, result?.messageId || 'accepted');
    return 'sent';
  } catch (e) {
    const code = (e as { code?: string })?.code || '';
    // Log the code only: no addresses or lead content in Worker logs.
    console.error('lead email failed', row.lead_id, code || 'error');
    await settle(env.LEADS, row, false, errText(e), PERMANENT.has(code));
    return 'failed';
  } finally {
    await refreshLeadStatus(env.LEADS, row.lead_id);
  }
}

async function hmacHex(key: string, message: string) {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return [...new Uint8Array(await crypto.subtle.sign('HMAC', k, enc.encode(message)))].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function recordingPayload(db: D1Database, cfg: LeadConfig, lead: LeadRow) {
  const rows = (await db.prepare(`SELECT target, state, last_error FROM outbox WHERE lead_id=? AND kind='email' ORDER BY rowid`).bind(lead.id).all<{ target: string; state: string; last_error: string | null }>()).results;
  const status = lead.status === 'pending' ? 'pending' : lead.status;
  return {
    v: 1, id: lead.id, site: cfg.host, submitted_at: lead.created_at, tradie: cfg.business,
    fields: JSON.parse(lead.fields_json), attribution: JSON.parse(lead.attribution_json),
    spam: { score: lead.spam_score, reasons: lead.spam_reasons ? lead.spam_reasons.split('; ') : [], verdict: lead.status === 'spam' ? 'spam' : lead.status === 'held' ? 'hold' : 'clean' },
    delivery: { status, recipients: rows.map((r) => ({ to: r.target, state: r.state === 'sent' ? 'sent' : r.state === 'dead' ? 'failed' : 'retrying', ...(r.last_error && r.state !== 'sent' ? { error: r.last_error } : {}) })) },
  };
}

export async function sendRecordRow(env: LeadEnv, cfg: LeadConfig, row: OutboxRow, lead: LeadRow) {
  if (!cfg.recordUrl || !cfg.recordKey) return 'disabled';
  if (!(await claim(env.LEADS, row.id, now()))) return 'skipped';
  try {
    // Fresh read: the email rows may have settled since the caller loaded the lead.
    const current = (await env.LEADS.prepare(`SELECT * FROM leads WHERE id=?`).bind(lead.id).first<LeadRow>()) || lead;
    const raw = JSON.stringify(await recordingPayload(env.LEADS, cfg, current));
    const ts = Math.floor(now() / 1000);
    const res = await fetch(cfg.recordUrl, {
      method: 'POST',
      body: raw,
      headers: {
        'content-type': 'application/json',
        'x-olympus-site': cfg.host,
        'x-olympus-timestamp': String(ts),
        'x-olympus-signature': `v1=${await hmacHex(cfg.recordKey, `${ts}.${cfg.host}.${raw}`)}`,
      },
      signal: AbortSignal.timeout(10_000),
    });
    const out = (await res.json().catch(() => ({}))) as { lead_id?: string; error?: string };
    if (!res.ok) throw new Error(`HTTP ${res.status} ${String(out.error || '').slice(0, 120)}`);
    await settle(env.LEADS, row, true, out.lead_id || 'recorded');
    return 'sent';
  } catch (e) {
    console.error('lead recording copy failed', row.lead_id, errText(e).slice(0, 120));
    await settle(env.LEADS, row, false, errText(e));
    return 'failed';
  }
}

/** Cron: work every due row. Email rows first; recording copies in a second pass, so a copy
 *  re-armed by an email that just settled carries the new state in the same run. */
export async function drainOutbox(env: LeadEnv, cfg: LeadConfig, limit = 50) {
  const tally: Record<string, number> = {};
  for (const kind of ['email', 'record'] as const) {
    const at = now();
    const due = (await env.LEADS.prepare(
      `SELECT * FROM outbox WHERE kind=? AND ((state='pending' AND next_at<=?) OR (state='sending' AND lease_until<?)) ORDER BY next_at LIMIT ?`,
    ).bind(kind, at, at, limit).all<OutboxRow>()).results;
    for (const row of due) {
      const lead = await env.LEADS.prepare(`SELECT * FROM leads WHERE id=?`).bind(row.lead_id).first<LeadRow>();
      if (!lead) continue;
      const r = kind === 'email' ? await sendEmailRow(env, cfg, row, lead) : await sendRecordRow(env, cfg, row, lead);
      tally[`${kind}:${r}`] = (tally[`${kind}:${r}`] || 0) + 1;
    }
  }
  return tally;
}
