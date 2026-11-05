// GO-LIVE VERIFY (GO-LIVE-CLOUDFLARE-LAW steps 4 and 5), run after a deploy and
// again once the nameservers have switched. Needs dist/ built from the deployed commit.
//
//   node scripts/verify-golive.mjs [baseUrl]     default https://buildingsforlife.com
//
// Every file in dist/ must come back byte-identical (catches the stale edge cache
// that kept serving an old build on a custom domain, 23 Sep). The real domain must
// be indexable with no X-Robots-Tag; a workers.dev preview must carry the noindex
// header from public/_headers. On the real domain, www and plain http must 301 to
// https on the apex, keeping path and query.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const BASE = (process.argv[2] ?? 'https://buildingsforlife.com').replace(/\/$/, '');
const host = new URL(BASE).host;
const preview = host.endsWith('.workers.dev');
const dist = new URL('../dist/', import.meta.url).pathname;
const SITEKEY = '0x4AAAAAAFORbhYcgEFeeLSB';

const fails = [];
const log = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); if (!ok) fails.push(msg); };
const bust = `cb=${Date.now()}`;
const get = (url) => fetch(`${url}${url.includes('?') ? '&' : '?'}${bust}`, { redirect: 'manual' });

try { await get(`${BASE}/`); } catch (e) {
  console.log(`FAIL  ${BASE} is not reachable (${e.cause?.code ?? e.message}): nameservers not switched yet, or the edge certificate is still pending`);
  process.exit(1);
}

const files = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); } };
walk(dist);
const differ = [];
let checked = 0;
for (const file of files) {
  const rel = '/' + relative(dist, file).replace(/\\/g, '/');
  if (rel === '/_headers' || rel === '/404.html') continue;
  const path = rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
  const res = await get(`${BASE}${path}`);
  const body = Buffer.from(await res.arrayBuffer());
  checked++;
  if (res.status !== 200 || !body.equals(readFileSync(file))) differ.push(`${path} (${res.status})`);
}
log(!differ.length, `${checked - differ.length}/${checked} dist files served byte-identical${differ.length ? `: ${differ.slice(0, 5).join(', ')}` : ''}`);

const home = await get(`${BASE}/`);
const html = await home.text();
const xr = home.headers.get('x-robots-tag');
log(home.status === 200, `home HTTP ${home.status}`);
log(preview ? /noindex/.test(xr || '') : !xr, `X-Robots-Tag ${xr ?? '(none)'} (${preview ? 'preview host must be noindexed' : 'real domain must have none'})`);
log(html.includes('<meta name="robots" content="index, follow"') && !/noindex/.test(html), 'home robots meta is "index, follow", zero noindex refs');
log(html.includes('<link rel="canonical" href="https://buildingsforlife.com/"'), 'home canonical is https://buildingsforlife.com/');

const ty = await (await get(`${BASE}/thank-you/`)).text();
log(ty.includes('<meta name="robots" content="noindex, nofollow"'), 'thank-you stays noindex');
const nf = await get(`${BASE}/no-such-page-zz9/`);
log(nf.status === 404, `unknown path -> ${nf.status}`);
const robots = await (await get(`${BASE}/robots.txt`)).text();
log(/^Allow: \/$/m.test(robots) && robots.includes('Sitemap: https://buildingsforlife.com/sitemap-index.xml'), 'robots.txt allows crawling and names the sitemap');
const lead = await (await fetch(`${BASE}/api/lead`)).json().catch(() => ({}));
log(lead.sitekey === SITEKEY, `/api/lead hands the form sitekey ${lead.sitekey ?? '(none)'}`);

if (!preview) {
  const path = '/services/?utm_source=golive-check&x=1';
  for (const from of [`https://www.${host}${path}`, `http://www.${host}${path}`, `http://${host}${path}`]) {
    const r = await fetch(from, { redirect: 'manual' });
    const to = r.headers.get('location');
    log(r.status === 301 && to === `https://${host}${path}`, `${from} -> ${r.status} ${to}`);
  }
}

console.log(fails.length ? `\nGO-LIVE: FAIL (${fails.length})` : '\nGO-LIVE: PASS');
process.exit(fails.length ? 1 : 0);
