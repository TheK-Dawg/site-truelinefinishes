// CONTRAST (D-149): every visible text element's colour vs its nearest opaque background,
// WCAG 2.x AA (4.5:1 body, 3:1 for 24px+ or 18.66px+ bold). Serves dist/ locally. Text over
// photographs (no opaque ancestor background before an <img> container) is skipped.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png' };
const server = createServer((req, res) => { let f = join(dist, decodeURIComponent(new URL(req.url, 'http://x').pathname)); if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html'); if (!existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(readFileSync(f)); });
await new Promise((r) => server.listen(4418, r));
const routes = ['/', '/painting-and-decorating/', '/exterior-painting/', '/wallpapering/', '/about/', '/contact/', '/gallery/', '/reviews/', '/privacy/', '/resources/painting-and-decorating-baildon/', '/thank-you/'];
const b = await chromium.launch({ executablePath: '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell' });
const fails = new Set();
for (const w of [1440, 390]) for (const r of routes) {
  const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  await p.goto(`http://localhost:4418${r}`, { waitUntil: 'load' });
  const out = await p.evaluate(() => {
    const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r, g, b, a }; };
    const lum = ({ r, g, b }) => [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
    const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
    const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a > 0.9) return c; if (e.querySelector(':scope > img') && e !== el) return null; } return { r: 255, g: 255, b: 255, a: 1 }; };
    const res = [];
    for (const el of document.querySelectorAll('body *')) {
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!own) continue;
      const s = getComputedStyle(el); const box = el.getBoundingClientRect();
      if (s.visibility === 'hidden' || s.display === 'none' || box.width === 0 || s.opacity === '0' || el.closest('[hidden],.visually-hidden,.skip-link,iframe,.ba__tag')) continue;
      const fg = parse(s.color); const bg = bgOf(el); if (!fg || !bg) continue;
      const size = parseFloat(s.fontSize); const bold = parseInt(s.fontWeight) >= 700;
      const need = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5;
      const rt = ratio(fg, bg);
      if (rt < need) res.push(`${rt.toFixed(2)} < ${need}: "${el.textContent.trim().slice(0, 40)}" ${s.color} on rgb(${bg.r},${bg.g},${bg.b})`);
    }
    return res;
  });
  out.forEach((o) => fails.add(`${w} ${r}: ${o}`));
  await p.close();
}
await b.close(); server.close();
console.log(`contrast: ${fails.size} fails`); [...fails].slice(0, 40).forEach((f) => console.log('  FAIL', f));
process.exit(fails.size ? 1 : 0);
