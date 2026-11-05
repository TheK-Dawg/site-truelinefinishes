// LEAD ENDPOINT PROBE — runs real POSTs against /api/lead and reports PASS/FAIL.
// Needs the Worker running: `npx wrangler dev --port 8788` (local, uses .dev.vars)
// or pass a deployed base URL.
//
//   node scripts/verify-lead.mjs [baseUrl]     default http://localhost:8788
//
// With the REAL Turnstile keys configured, every probe here must be REFUSED:
// that is the point. A siteverify verdict of "invalid-input-response" (rather
// than "invalid-input-secret") is the proof that the configured secret is a
// real, recognised Turnstile secret and only the token was wrong.
const BASE = (process.argv[2] ?? 'http://localhost:8788').replace(/\/$/, '');
const good = {
  name: 'Endpoint probe', email: 'admin@localmapbooster.com', phone: '07853 945013',
  postcode: 'SO30 2UQ', message: 'Automated endpoint probe, never forwarded.',
  service: 'Builders', page_url: `${BASE}/builders/`,
};
const fails = [];
const log = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); if (!ok) fails.push(msg); };
const post = async (body, headers = {}) => {
  const res = await fetch(`${BASE}/api/lead`, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
  let out = {}; try { out = await res.json(); } catch {}
  return { status: res.status, out };
};

const sitekey = await (await fetch(`${BASE}/api/lead`)).json();
log(/^0x[A-Za-z0-9]+$/.test(sitekey.sitekey ?? ''), `GET /api/lead hands the form a Turnstile sitekey (${sitekey.sitekey || 'none'})`);

const noToken = await post(good);
log(noToken.status === 403 && noToken.out.verdict === 'missing-token', `no Turnstile token -> ${noToken.status} ${noToken.out.verdict}`);

const badToken = await post({ ...good, 'cf-turnstile-response': 'not-a-real-token' });
log(badToken.status === 403 && badToken.out.verdict === 'invalid-input-response',
  `bogus token -> ${badToken.status} ${badToken.out.verdict} (invalid-input-response proves the SECRET is real; invalid-input-secret would mean it is not)`);

const honeypot = await post({ ...good, _company: 'bot', 'cf-turnstile-response': 'x' });
log(honeypot.status === 202 && honeypot.out.ok === true, `honeypot filled -> ${honeypot.status} (accepted and dropped, so a bot learns nothing)`);

for (const [field, body] of [
  ['postcode', { ...good, postcode: '' }],
  ['email', { ...good, email: 'nope' }],
  ['phone', { ...good, phone: '12' }],
  ['name', { ...good, name: '' }],
  ['message', { ...good, message: '' }],
]) {
  const r = await post({ ...body, 'cf-turnstile-response': 'x' });
  log(r.status === 400 && r.out.fields?.includes(field), `invalid ${field} -> ${r.status} ${JSON.stringify(r.out.fields ?? r.out)}`);
}

const cross = await post({ ...good, 'cf-turnstile-response': 'x' }, { origin: 'https://not-this-site.example' });
log(cross.status === 403 && cross.out.error === 'forbidden', `cross-origin post -> ${cross.status} ${cross.out.error}`);

const method = await fetch(`${BASE}/api/lead`, { method: 'PUT' });
log(method.status === 405, `PUT /api/lead -> ${method.status}`);

console.log(fails.length ? `\nLEAD ENDPOINT: FAIL (${fails.length})` : `\nLEAD ENDPOINT: PASS`);
process.exit(fails.length ? 1 : 0);
