// Serve dist/ and screenshot routes in 1800px bands. usage: node scripts/shoot.mjs <width> /route/ [/route2/ ...]
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';
const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const EXE = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';
const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const out = join(root, 'shots');
mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml' };
const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(dist, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404, { 'content-type': 'text/html' }); res.end(readFileSync(join(dist, '404.html'))); return; }
  res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(4411, r));
const [w, ...routes] = process.argv.slice(2);
const width = Number(w);
const b = await chromium.launch({ executablePath: EXE });
for (const route of routes) {
  const p = await b.newPage({ viewport: { width, height: width < 800 ? 780 : 900 } });
  await p.route(/maps\.google/, (r) => r.abort());
  await p.goto(`http://localhost:4411${route}`, { waitUntil: 'load' });
  await p.evaluate(() => { document.querySelectorAll('[data-motion]').forEach((e) => e.classList.add('is-in')); document.querySelectorAll('img[loading="lazy"]').forEach((i) => i.setAttribute('loading', 'eager')); });
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(500);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  const band = 1800;
  const name = route.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home';
  for (let i = 0; i < Math.ceil(h / band); i++) await p.screenshot({ path: join(out, `${name}-${width}-${i}.png`), clip: { x: 0, y: i * band, width, height: Math.min(band, h - i * band) }, fullPage: true });
  console.log(route, width, h, Math.ceil(h / band));
  await p.close();
}
await b.close();
server.close();
