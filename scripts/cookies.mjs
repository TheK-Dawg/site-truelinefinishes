// COOKIE INVENTORY (Cookie Policy must match what the build sets). Loads each page in a fresh
// Chromium context, waits for third-party embeds, and lists every cookie by domain plus our own
// origin's localStorage/sessionStorage keys. Does NOT press play and does NOT submit the form.
// Usage: node scripts/cookies.mjs https://site-truelinefinishes.small-bird-3273.workers.dev
import { createRequire } from 'node:module';
const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const EXE = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';
const base = (process.argv[2] || '').replace(/\/$/, '');
const routes = ['/', '/painting-and-decorating/', '/contact/', '/resources/painting-and-decorating-baildon/', '/reviews/'];
const browser = await chromium.launch({ executablePath: EXE });
const out = {};
for (const r of routes) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(base + r, { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((s) => setTimeout(s, 80)); } });
  await page.waitForTimeout(4000);
  const cookies = await ctx.cookies();
  const storage = await page.evaluate(() => ({ local: Object.keys(localStorage), session: Object.keys(sessionStorage) }));
  out[r] = { cookies: cookies.map((c) => `${c.domain} ${c.name}`), firstPartyStorage: storage };
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
