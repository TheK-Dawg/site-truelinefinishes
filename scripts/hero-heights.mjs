// HERO HEIGHT GATE. THE SITE OWNER'S OWN POLICY (25 Nov 2026, superseding review 5's fixed
// 780/640/540 and review 6's taller home figure): "the hero should fill the entire visible vertical
// viewport automatically, and the EXACT SAME hero size policy on ALL my pages, not just the home
// page". So the gate now proves ONE rule on every hero route, home included, at four widths:
//   the hero is at least the full viewport height (it fills the window: no strip of the next
//   section showing under it), and its content is never clipped by it. A hero is allowed to GROW
//   past the viewport when a long headline needs the room - that is reported, never failed - and a
//   hero that is SHORTER than the viewport is the failure this gate exists to catch.
// Widths: 1440x900 desktop, 768x1024 tablet, 390x844 phone, 320x640 narrow phone.
// Usage: node scripts/hero-heights.mjs [baseURL]   (no URL: serves dist/ locally)
// Exit 1 on any mismatch. Proved by breaking the subject: put a fixed `min-height: 540px` back on
// .hero and every route fails the fill check at every width (run 25 Nov 2026 before this pass was
// called clean).
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const EXE = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';

const WANT = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'phone', width: 390, height: 844 },
  { name: 'narrow', width: 320, height: 640 },
];
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
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, isMobile: vp.width <= 390, hasTouch: vp.width <= 390 });
  let grown = 0;
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
    const over = m.height - vp.height;
    if (over > 2) grown += 1;
    rows.push(`${vp.name.padEnd(7)} ${r.padEnd(44)} ${String(m.height).padStart(4)}px of ${vp.height}px viewport${over > 2 ? `  (+${over}px: grown for its headline)` : ''}  (${m.kind}, --hero-h ${m.token})`);
    // ONE POLICY, EVERY ROUTE: the hero fills the visible viewport. Shorter than the window is the
    // defect the site owner reported (a white strip of the next section under the hero).
    if (m.height < vp.height - 2) fails.push(`${vp.name} ${r}: hero ${m.height}px in a ${vp.height}px window - it does not fill the visible viewport, so the next section shows under it`);
    if (!/^100[sd]?vh$/.test(m.token)) fails.push(`${vp.name} ${r}: --hero-h is "${m.token}", not the shared viewport height`);
    if (m.clip != null && m.clip > 1) fails.push(`${vp.name} ${r}: hero content clipped by ${m.clip}px`);
  }
  await ctx.close();
  if (grown) console.log(`  ${vp.name}: ${grown} hero(es) grew past the ${vp.height}px window for their headline (allowed: content is never clipped)`);
}
await browser.close();
server?.close();
rows.forEach((l) => console.log('  ' + l));
console.log(`hero heights: ${heroRoutes.length} routes x ${WANT.length} widths, ${fails.length} fails`);
fails.forEach((f) => console.log('  FAIL ' + f));
process.exit(fails.length ? 1 : 0);
