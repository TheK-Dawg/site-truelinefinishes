// Site lead kit tests: run the REAL handler and outbox (bundled from worker/ with esbuild)
// against real SQLite running migrations/0001_site_leads.sql, with a MOCK Email Service
// binding and a MOCK Olympus. Nothing leaves this machine: global fetch is replaced, and
// any unexpected outbound call fails the test.
//   npm run test:leads
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildSync } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(mkdtempSync(join(tmpdir(), 'leadkit-')), 'kit.mjs');
buildSync({
  stdin: { contents: "export { default as worker } from './worker/index.ts'; export * from './worker/leads/handler.ts'; export * from './worker/leads/outbox.ts'; export * from './worker/leads/compose.ts';", resolveDir: root, loader: 'ts' },
  bundle: true, format: 'esm', platform: 'neutral', outfile: out, logLevel: 'silent',
});
const kit = await import(pathToFileURL(out).href);
const { worker } = kit;
const MIGRATION = readFileSync(join(root, 'migrations/0001_site_leads.sql'), 'utf8');

// ---- fakes -----------------------------------------------------------------------------
let clock = Date.parse('2026-10-27T15:00:00Z');
const realNow = Date.now;
Date.now = () => clock;
const advance = (ms) => { clock += ms; };

function d1({ broken = false } = {}) {
  const db = new DatabaseSync(':memory:');
  db.exec(MIGRATION);
  const guard = () => { if (broken) throw new Error('D1_ERROR: database unavailable'); };
  const stmt = (sql, args = []) => ({
    bind: (...next) => stmt(sql, next),
    first: async () => { guard(); return db.prepare(sql).get(...args) ?? null; },
    all: async () => { guard(); return { results: db.prepare(sql).all(...args) }; },
    run: async () => { guard(); const r = db.prepare(sql).run(...args); return { meta: { changes: Number(r.changes) } }; },
    _exec: () => db.prepare(sql).run(...args),
  });
  return {
    raw: db,
    prepare: (sql) => stmt(sql),
    batch: async (list) => { guard(); db.exec('BEGIN'); try { const r = list.map((s) => s._exec()); db.exec('COMMIT'); return r; } catch (e) { db.exec('ROLLBACK'); throw e; } },
  };
}

function mailer(plan = {}) {
  // plan[address] = array of outcomes per attempt: 'ok' | 'E_CODE'
  const sent = [], attempts = [];
  return {
    sent, attempts,
    async send(msg) {
      attempts.push(msg.to);
      const queue = plan[msg.to];
      const outcome = queue?.length ? queue.shift() : 'ok';
      if (outcome !== 'ok') { const e = new Error(`mock ${outcome}`); e.code = outcome; throw e; }
      sent.push(msg);
      return { messageId: `mock-${sent.length}` };
    },
  };
}

// Mock Olympus: verifies the signature exactly as Olympus does, dedupes by lead id.
function olympus({ down = 0 } = {}) {
  const state = { calls: 0, down, leads: new Map(), posts: [] };
  return state;
}
let OLY = olympus();
const SITE_KEY = 'test-site-key';
const enc = new TextEncoder();
async function hmac(key, msg) {
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return [...new Uint8Array(await crypto.subtle.sign('HMAC', k, enc.encode(msg)))].map((b) => b.toString(16).padStart(2, '0')).join('');
}
const unexpected = [];
globalThis.fetch = async (input, init = {}) => {
  const url = String(input?.url || input);
  if (url !== 'https://olympus.test/ingest/site-lead') { unexpected.push(url); throw new Error(`unexpected fetch ${url}`); }
  OLY.calls++;
  if (OLY.down > 0) { OLY.down--; throw new Error('connect ECONNREFUSED (mock Olympus down)'); }
  const h = new Headers(init.headers);
  const ts = h.get('x-olympus-timestamp'), host = h.get('x-olympus-site');
  const good = `v1=${await hmac(SITE_KEY, `${ts}.${host}.${init.body}`)}`;
  if (h.get('x-olympus-signature') !== good) return new Response(JSON.stringify({ error: 'unauthorised' }), { status: 401 });
  const payload = JSON.parse(init.body);
  OLY.posts.push(payload);
  const dup = OLY.leads.has(payload.id);
  OLY.leads.set(payload.id, payload);
  return new Response(JSON.stringify({ ok: true, duplicate: dup, lead_id: `lead_${payload.id}` }), { status: dup ? 200 : 201 });
};

function makeEnv(over = {}) {
  return {
    LEADS: d1(), LEAD_MAIL: mailer(),
    SITE_ORIGIN: 'https://buildingsforlife.com',
    LEAD_TO: 'mail@buildingsforlifeltd.com', LEAD_ADMIN_COPY: 'admin@apexaimarketing.com',
    LEAD_FROM: 'leads@buildingsforlife.com', LEAD_BUSINESS: 'Buildings For Life Ltd', LEAD_GREETING: 'Hey team',
    OLYMPUS_RECORD_URL: 'https://olympus.test/ingest/site-lead', OLYMPUS_SITE_KEY: SITE_KEY,
    TURNSTILE_SITEKEY: '0xTEST', TURNSTILE_SECRET: 'unused-in-tests',
    ASSETS: { fetch: async () => new Response('asset') },
    ...over,
  };
}

const GOOD = { name: 'Jane Test', email: 'Jane@Example.test', phone: '07700 900123', postcode: 'SO30 2UQ', message: 'Could you quote for a single storey rear extension please?', service: 'Extensions', page_url: 'https://buildingsforlife.com/extensions/', referrer: 'https://www.google.com/', utm_source: 'google' };

async function submit(env, body = {}, { turnstile = true, headers = {} } = {}) {
  const waits = [];
  const deps = { verifyTurnstile: async () => (turnstile ? { ok: true, verdict: 'ok:buildingsforlife.com' } : { ok: false, verdict: 'invalid-input-response' }), waitUntil: (p) => waits.push(p) };
  const req = new Request('https://buildingsforlife.com/api/lead', {
    method: 'POST', body: JSON.stringify({ ...GOOD, 'cf-turnstile-response': 'tok', ...body }),
    headers: { 'content-type': 'application/json', origin: 'https://buildingsforlife.com', 'cf-connecting-ip': '203.0.113.9', 'user-agent': 'Mozilla/5.0 test', ...headers },
  });
  const res = await kit.handleLeadPost(req, env, deps);
  await Promise.all(waits);
  return { status: res.status, body: await res.json() };
}
const rows = (env, sql, ...a) => env.LEADS.raw.prepare(sql).all(...a);
const one = (env, sql, ...a) => env.LEADS.raw.prepare(sql).get(...a);
const drain = (env) => kit.drainOutbox(env, kit.leadConfig(env));
test.beforeEach(() => { OLY = olympus(); });
test.after(() => { Date.now = realNow; assert.deepEqual(unexpected, [], 'no outbound call other than the mock Olympus'); });

// ---- tests -------------------------------------------------------------------------------
test('clean lead: saved, both recipients emailed with the Olympus wording, then recorded', async () => {
  const env = makeEnv();
  const r = await submit(env, { submission_id: 'sub-happy-0001' });
  assert.equal(r.status, 200); assert.equal(r.body.ok, true);
  const mail = env.LEAD_MAIL.sent;
  assert.deepEqual(mail.map((m) => m.to), ['mail@buildingsforlifeltd.com', 'admin@apexaimarketing.com'], 'client first, then the admin copy, one message each');
  for (const m of mail) {
    assert.deepEqual(m.from, { email: 'leads@buildingsforlife.com', name: 'Buildings For Life Ltd' });
    assert.equal(m.replyTo, 'jane@example.test');
    assert.equal(m.subject, 'New lead inquiry · Jane Test · Buildings For Life Ltd');
  }
  assert.equal(mail[0].text, [
    'Hey team,', '', 'A new enquiry has come in through your website (buildingsforlife.com).', '',
    'Name: Jane Test', 'Email: jane@example.test', 'Phone: 07700 900123', 'Postcode: SO30 2UQ',
    'Message: Could you quote for a single storey rear extension please?', 'Service: Extensions', '',
    'Reply to this email to respond to the customer directly.', '', '— Buildings For Life Ltd', '',
    'Where this lead came from:',
    'Came from: form (cf_form). page_url: https://buildingsforlife.com/extensions/ · referrer: https://www.google.com/ · ip: 203.0.113.9 · user_agent: Mozilla/5.0 test · utm_source: google',
  ].join('\n'));
  assert.equal(one(env, 'SELECT status FROM leads').status, 'sent');
  assert.equal(OLY.posts.length, 1, 'one recording copy');
  const p = OLY.posts[0];
  assert.equal(p.site, 'buildingsforlife.com'); assert.equal(p.delivery.status, 'sent');
  assert.deepEqual(p.delivery.recipients.map((x) => x.state), ['sent', 'sent']);
  assert.equal(one(env, "SELECT state FROM outbox WHERE kind='record'").state, 'sent');
});

test('Olympus down: email is unaffected, the copy is kept and recorded once Olympus is back', async () => {
  const env = makeEnv();
  OLY.down = 3;
  const r = await submit(env, { submission_id: 'sub-olydown-01' });
  assert.equal(r.status, 200, 'visitor succeeds while Olympus is down');
  assert.equal(env.LEAD_MAIL.sent.length, 2, 'both emails sent with Olympus down');
  assert.equal(one(env, 'SELECT status FROM leads').status, 'sent');
  let rec = one(env, "SELECT * FROM outbox WHERE kind='record'");
  assert.equal(rec.state, 'pending'); assert.match(rec.last_error, /ECONNREFUSED/);
  assert.equal(OLY.leads.size, 0);
  await drain(env); assert.equal(OLY.calls, 1, 'not retried before its backoff');
  advance(61e3); await drain(env);   // attempt 2 fails
  advance(5 * 60e3 + 1); await drain(env); // attempt 3 fails
  assert.equal(OLY.leads.size, 0);
  advance(15 * 60e3 + 1); await drain(env); // Olympus back
  rec = one(env, "SELECT * FROM outbox WHERE kind='record'");
  assert.equal(rec.state, 'sent'); assert.equal(OLY.leads.size, 1);
  advance(24 * 3600e3); await drain(env); await drain(env);
  assert.equal(OLY.posts.length, 1, 'no duplicate recording after success');
  assert.equal(env.LEAD_MAIL.attempts.length, 2, 'retries of the copy never re-send email');
});

test('one recipient fails transiently: the other is unaffected, retry delivers, copy updated not duplicated', async () => {
  const env = makeEnv({ LEAD_MAIL: mailer({ 'mail@buildingsforlifeltd.com': ['E_INTERNAL_SERVER_ERROR', 'E_RATE_LIMIT_EXCEEDED'] }) });
  const r = await submit(env, { submission_id: 'sub-partial-01' });
  assert.equal(r.status, 200);
  assert.deepEqual(env.LEAD_MAIL.sent.map((m) => m.to), ['admin@apexaimarketing.com']);
  assert.equal(one(env, 'SELECT status FROM leads').status, 'partial');
  assert.equal(OLY.posts.at(-1).delivery.status, 'partial');
  advance(61e3); await drain(env);
  assert.equal(one(env, "SELECT state FROM outbox WHERE target='mail@buildingsforlifeltd.com'").state, 'pending');
  advance(5 * 60e3 + 1); await drain(env);
  assert.equal(one(env, "SELECT state FROM outbox WHERE target='mail@buildingsforlifeltd.com'").state, 'sent');
  assert.equal(one(env, 'SELECT status FROM leads').status, 'sent');
  assert.equal(env.LEAD_MAIL.sent.filter((m) => m.to === 'admin@apexaimarketing.com').length, 1, 'admin copy not re-sent');
  assert.equal(OLY.leads.size, 1, 'one Olympus lead');
  assert.equal(OLY.leads.values().next().value.delivery.status, 'sent', 'Olympus copy updated to sent');
});

test('permanent email error goes dead at once and is visible; transient ones die after the last backoff', async () => {
  const env = makeEnv({ LEAD_MAIL: mailer({ 'mail@buildingsforlifeltd.com': ['E_RECIPIENT_SUPPRESSED'], 'admin@apexaimarketing.com': Array(20).fill('E_INTERNAL_SERVER_ERROR') }) });
  await submit(env, { submission_id: 'sub-dead-0001' });
  assert.equal(one(env, "SELECT state FROM outbox WHERE target='mail@buildingsforlifeltd.com'").state, 'dead');
  for (let i = 0; i < 12; i++) { advance(25 * 3600e3); await drain(env); }
  const admin = one(env, "SELECT * FROM outbox WHERE target='admin@apexaimarketing.com'");
  assert.equal(admin.state, 'dead'); assert.equal(admin.attempts, kit.MAX_ATTEMPTS);
  assert.equal(one(env, 'SELECT status FROM leads').status, 'failed', 'lead marked failed, never silently dropped');
  assert.equal(OLY.leads.values().next().value.delivery.status, 'failed');
});

test('idempotency: the same submission twice is saved and emailed once', async () => {
  const env = makeEnv();
  const a = await submit(env, { submission_id: 'sub-same-0001' });
  const b = await submit(env, { submission_id: 'sub-same-0001' });
  assert.equal(b.status, 200); assert.equal(b.body.duplicate, true); assert.equal(b.body.id, a.body.id);
  assert.equal(one(env, 'SELECT COUNT(*) n FROM leads').n, 1);
  assert.equal(env.LEAD_MAIL.sent.length, 2);
});

test('lease: a row being sent is not claimed twice by a concurrent drain', async () => {
  const env = makeEnv();
  let release; const gate = new Promise((r) => { release = r; });
  const base = env.LEAD_MAIL; let inFlight = 0, maxInFlight = 0;
  env.LEAD_MAIL = { sent: base.sent, attempts: base.attempts, async send(m) { inFlight++; maxInFlight = Math.max(maxInFlight, inFlight); await gate; inFlight--; return base.send(m); } };
  const p = submit(env, { submission_id: 'sub-lease-0001' });
  await new Promise((r) => setTimeout(r, 20));
  const d = drain(env); // runs while the first send is held open
  await new Promise((r) => setTimeout(r, 20));
  release(); await Promise.all([p, d]); await drain(env);
  assert.equal(maxInFlight <= 2, true);
  assert.equal(base.sent.length, 2, 'each recipient exactly once');
});

test('spam: stored and recorded, never emailed', async () => {
  const env = makeEnv();
  const r = await submit(env, { submission_id: 'sub-spam-00001', message: 'Earn $5000 with crypto https://telegra.ph/x guaranteed' });
  assert.equal(r.status, 200);
  assert.equal(env.LEAD_MAIL.attempts.length, 0);
  assert.equal(one(env, 'SELECT status FROM leads').status, 'spam');
  assert.equal(OLY.posts[0].spam.verdict, 'spam');
});

test('borderline score: delivered by default, held when LEAD_HOLD_POLICY=hold', async () => {
  const msg = 'Please see my plans at www.example-plans.test before quoting the extension';
  const a = makeEnv();
  await submit(a, { submission_id: 'sub-hold-00001', message: msg });
  assert.equal(a.LEAD_MAIL.sent.length, 2);
  const b = makeEnv({ LEAD_HOLD_POLICY: 'hold' });
  await submit(b, { submission_id: 'sub-hold-00002', message: msg });
  assert.equal(b.LEAD_MAIL.attempts.length, 0); assert.equal(one(b, 'SELECT status FROM leads').status, 'held');
});

test('refusals store and send nothing: non-English, Turnstile, honeypot, invalid, cross-origin, rate limit', async () => {
  const env = makeEnv();
  const nonEn = await submit(env, { message: 'Bonjour, je voudrais un devis pour une extension de la maison avec vous' });
  assert.equal(nonEn.status, 422); assert.equal(nonEn.body.error, 'Please write your message in English.');
  assert.equal(one(env, "SELECT reason FROM rejections").reason, 'non-english');
  assert.equal((await submit(env, {}, { turnstile: false })).status, 403);
  assert.equal((await submit(env, { _company: 'bot' })).status, 202);
  assert.equal((await submit(env, { email: 'nope' })).status, 400);
  assert.equal((await submit(env, {}, { headers: { origin: 'https://evil.example' } })).status, 403);
  assert.equal(one(env, 'SELECT COUNT(*) n FROM leads').n, 0); assert.equal(env.LEAD_MAIL.attempts.length, 0);
  for (let i = 0; i < 8; i++) assert.equal((await submit(env, { submission_id: `sub-rate-${i}0000` })).status, 200);
  assert.equal((await submit(env, { submission_id: 'sub-rate-90000' })).status, 429);
});

test('store down: email is sent directly; only an accepted email counts as success', async () => {
  const a = makeEnv({ LEADS: d1({ broken: true }) });
  const r = await submit(a, { submission_id: 'sub-nostore-01' });
  assert.equal(r.status, 200); assert.equal(r.body.stored, false); assert.equal(a.LEAD_MAIL.sent.length, 2);
  const b = makeEnv({ LEADS: d1({ broken: true }), LEAD_MAIL: mailer({ 'mail@buildingsforlifeltd.com': ['E_INTERNAL_SERVER_ERROR'], 'admin@apexaimarketing.com': ['E_INTERNAL_SERVER_ERROR'] }) });
  const s = await submit(b, { submission_id: 'sub-nostore-02' });
  assert.equal(s.status, 503, 'no fake success when nothing was saved or sent');
});

test('recording disabled (handover): email still goes, copy waits harmlessly', async () => {
  const env = makeEnv({ OLYMPUS_RECORD_URL: '', OLYMPUS_SITE_KEY: '', LEAD_ADMIN_COPY: '' });
  await submit(env, { submission_id: 'sub-handover-1' });
  assert.deepEqual(env.LEAD_MAIL.sent.map((m) => m.to), ['mail@buildingsforlifeltd.com'], 'admin copy off');
  assert.equal(OLY.calls, 0);
});

test('cron entry point drains the outbox through the real scheduled handler', async () => {
  const env = makeEnv(); OLY.down = 1;
  await submit(env, { submission_id: 'sub-cron-00001' });
  advance(61e3);
  const waits = [];
  await worker.scheduled({}, env, { waitUntil: (p) => waits.push(p) });
  await Promise.all(waits);
  assert.equal(OLY.leads.size, 1);
});

// Contract: the site's signature is accepted by the REAL Olympus endpoint code, when present.
const OLY_INGEST = '/root/projects/olympus/app/site-lead-ingest.js';
test('contract: real Olympus ingest code accepts the site copy (skipped if Olympus source absent)', { skip: !existsSync(OLY_INGEST) }, async () => {
  const { siteLeadKey, signSiteLead } = await import(OLY_INGEST);
  const key = await siteLeadKey('master', 'buildingsforlife.com');
  const raw = JSON.stringify({ id: 'x' });
  const theirs = await signSiteLead(key, 1700000000, 'buildingsforlife.com', raw);
  assert.equal(theirs, `v1=${await hmac(key, `1700000000.buildingsforlife.com.${raw}`)}`);
});
