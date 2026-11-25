// HERO HEIGHT GATE. Operator review 5 (19 Nov 2026) set one height for every hero on the site;
// operator review 6 (25 Nov 2026) supersedes that FOR THE HOME PAGE ONLY ("homepage hero should feel
// a little bigger / not stop too soon", with the explicit instruction not to change every hero when
// only home needs the room). So the gate now proves TWO things at once: the home hero is the taller
// one, and every OTHER hero on the site still shares review 5's single height exactly.
//   desktop 1440x900: home exactly 840px, every inner hero exactly 780px
//   tablet   768x1024: home exactly 720px, every inner hero exactly 640px
//   phone     390x844: home at least 720px, every inner hero at least 540px, none with content clipped
// Usage: node scripts/hero-heights.mjs [baseURL]   (no URL: serves dist/ locally)
// Exit 1 on any mismatch. There is no --selftest switch here (an earlier header claimed one that was
// never written): the gate is proved by breaking the subject instead - give .hero--compact a height of
// its own and the inner-page checks fail; drop the home re-point and the home checks fail. Both were
// run on 25 Nov 2026 and both failed as they should before this pass was called clean.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const EXE = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';

const WANT = [
  { name: 'desktop', width: 1440, height: 900, exact: 780, home: 840 },
  { name: 'tablet', width: 768, height: 1024, exact: 640, home: 720 },
  { name: 'phone', width: 390, height: 844, min: 540, homeMin: 720 },
];
const HOME = '/';
const args = process.argv.slice(2);
const live = args[0] && !args[0].startsWith('--') ? args[0].replace(/\/$/, '') : '';
const dist = new URL('../dist/', import.meta.url).pathname;
const routes = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f === 'index.html') routes.push('/' + relative(dist, d) + (relative(dist, d) ? '/' : '')); } };
walk(dist);
// Utility pages have no hero by design (404, thank-you).
const SKIP = new Set(['/404/', '/thank-you/']);
const heroRoutes = routes.filter((r) => !SKIP.has(r));

let base = live, server;
if (!live) {
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.xml': 'application/xml', '.ico': 'image/x-icon' };
  server = createServer((req, res) => {
    let f = join(dist, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
    if (!existsSync(f)) { res.writeHead(404, { 'content-type': 'text/html' }); res.end(readFileSync(join(dist, '404.html'))); return; }
    res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(readFileSync(f));
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}`;
}

const measure = () => {
  const h = document.querySelector('[data-section="hero"]');
  if (!h) return null;
  const c = h.querySelector('.hero__copy');
  const hb = h.getBoundingClientRect(); const cb = c?.getBoundingClientRect();
  return {
    height: Math.round(hb.height),
    kind: h.dataset.hero,
    token: getComputedStyle(h).getPropertyValue('--hero-h').trim(),
    clip: cb ? Math.round(Math.max(hb.top - cb.top, cb.bottom - hb.bottom)) : null,
  };
};

const fails = []; const rows = [];
const browser = await chromium.launch({ executablePath: EXE });
for (const vp of WANT) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, isMobile: vp.name === 'phone', hasTouch: vp.name === 'phone' });
  const seen = new Map();
  for (const r of heroRoutes) {
    const page = await ctx.newPage();
    const res = await page.goto(base + r, { waitUntil: 'load', timeout: 60000 });
    if (!res || res.status() !== 200) fails.push(`${vp.name} ${r}: HTTP ${res?.status()}`);
    // A LIVE page is still settling at 'load': the self-hosted fonts and the Trustindex slimline
    // arrive after it, and measuring then reported heights from 487 to 1384px on pages that are
    // actually all 640 (proved with a probe). Wait for the network to go quiet and the fonts to be
    // ready, then take the same reading twice and only trust it when the two agree.
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    let m = null;
    for (let i = 0; i < 4; i++) {
      await page.waitForTimeout(400);
      const a = await page.evaluate(measure);
      await page.waitForTimeout(400);
      const b = await page.evaluate(measure);
      if (a && b && Math.abs(a.height - b.height) <= 1) { m = b; break; }
      m = b;
    }
    await page.close();
    if (!m) { fails.push(`${vp.name} ${r}: no hero section`); continue; }
    rows.push(`${vp.name.padEnd(7)} ${r.padEnd(44)} ${String(m.height).padStart(4)}px  (${m.kind}, --hero-h ${m.token})`);
    const isHome = r === HOME;
    if (!isHome) seen.set(m.height, (seen.get(m.height) || 0) + 1);
    // The home hero is its own (taller) height, review 6; every other hero shares review 5's.
    const exact = isHome ? vp.home : vp.exact;
    const min = isHome ? vp.homeMin : vp.min;
    if (exact != null && Math.abs(m.height - exact) > 2) fails.push(`${vp.name} ${r}: hero ${m.height}px, want ${exact}px (${isHome ? 'the home hero height, review 6' : 'the one height every inner hero shares'})`);
    if (min != null && m.height < min - 2) fails.push(`${vp.name} ${r}: hero ${m.height}px, under the ${min}px floor (${isHome ? 'home, review 6' : 'shared by every inner hero'})`);
    if (isHome && vp.exact != null && m.height <= vp.exact) fails.push(`${vp.name} ${r}: the home hero (${m.height}px) is not taller than the inner heroes (${vp.exact}px) - review 6 asked for it bigger`);
    if (isHome && vp.min != null && m.height <= vp.min) fails.push(`${vp.name} ${r}: the home hero (${m.height}px) is not taller than the inner floor (${vp.min}px) - review 6 asked for it bigger`);
    if (m.clip != null && m.clip > 1) fails.push(`${vp.name} ${r}: hero content clipped by ${m.clip}px`);
  }
  await ctx.close();
  if (vp.exact != null && seen.size > 1) fails.push(`${vp.name}: ${seen.size} different hero heights across the inner pages (${[...seen.keys()].sort((a, b) => a - b).join(', ')}px) - every hero but the home one must match`);
}
await browser.close();
server?.close();
rows.forEach((l) => console.log('  ' + l));
console.log(`hero heights: ${heroRoutes.length} routes x ${WANT.length} widths, ${fails.length} fails`);
fails.forEach((f) => console.log('  FAIL ' + f));
process.exit(fails.length ? 1 : 0);
