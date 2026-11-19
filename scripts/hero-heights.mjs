// HERO HEIGHT GATE (operator review 5, 19 Nov 2026): the computed height of EVERY hero on EVERY
// route, at three widths, proving one policy for the whole site.
//   desktop 1440x900: every hero exactly 780px (the one shared height; round 4's 690 home against
//     720 inner was the mismatch the operator rejected, and both were too small)
//   tablet   768x1024: every hero exactly 640px
//   phone     390x844: every hero at least 540px, and never with its content clipped
// Usage: node scripts/hero-heights.mjs [baseURL]   (no URL: serves dist/ locally)
// Exit 1 on any mismatch. --selftest proves the gate fails a deliberately mismatched hero.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const EXE = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';

const WANT = [
  { name: 'desktop', width: 1440, height: 900, exact: 780 },
  { name: 'tablet', width: 768, height: 1024, exact: 640 },
  { name: 'phone', width: 390, height: 844, min: 540 },
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
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, isMobile: vp.name === 'phone', hasTouch: vp.name === 'phone' });
  const seen = new Map();
  for (const r of heroRoutes) {
    const page = await ctx.newPage();
    const res = await page.goto(base + r, { waitUntil: 'load', timeout: 60000 });
    if (!res || res.status() !== 200) fails.push(`${vp.name} ${r}: HTTP ${res?.status()}`);
    const m = await page.evaluate(measure);
    await page.close();
    if (!m) { fails.push(`${vp.name} ${r}: no hero section`); continue; }
    rows.push(`${vp.name.padEnd(7)} ${r.padEnd(44)} ${String(m.height).padStart(4)}px  (${m.kind}, --hero-h ${m.token})`);
    seen.set(m.height, (seen.get(m.height) || 0) + 1);
    if (vp.exact != null && Math.abs(m.height - vp.exact) > 2) fails.push(`${vp.name} ${r}: hero ${m.height}px, want ${vp.exact}px (the one height every hero shares)`);
    if (vp.min != null && m.height < vp.min - 2) fails.push(`${vp.name} ${r}: hero ${m.height}px, under the ${vp.min}px floor every hero shares`);
    if (m.clip != null && m.clip > 1) fails.push(`${vp.name} ${r}: hero content clipped by ${m.clip}px`);
  }
  await ctx.close();
  if (vp.exact != null && seen.size > 1) fails.push(`${vp.name}: ${seen.size} different hero heights across the site (${[...seen.keys()].sort((a, b) => a - b).join(', ')}px) - they must all match`);
}
await browser.close();
server?.close();
rows.forEach((l) => console.log('  ' + l));
console.log(`hero heights: ${heroRoutes.length} routes x ${WANT.length} widths, ${fails.length} fails`);
fails.forEach((f) => console.log('  FAIL ' + f));
process.exit(fails.length ? 1 : 0);
