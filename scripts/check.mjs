// RENDERED CHECKS over every built route at 1440x900 and 360x780 (Playwright
// Chromium): no horizontal overflow, one visible H1, hero CTA above the fold,
// every <img> has alt, mobile header shows burger only, burger menu lists the
// nav + Quick Quote inside the viewport, sticky bar hidden at top / shown
// mid-page / hidden over the form, and the mobile Quick Quote tap lands the
// form fields in view. Exit 1 on any failure.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const EXE = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';
const dist = new URL('../dist/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.xml': 'application/xml' };
const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(dist, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404, { 'content-type': 'text/html' }); res.end(readFileSync(join(dist, '404.html'))); return; }
  res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(4412, r));
const routes = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f === 'index.html') routes.push('/' + relative(dist, d).replace(/\\/g, '/') + (relative(dist, d) ? '/' : '')); } };
walk(dist);
routes.push('/404.html');

const fails = [];
const b = await chromium.launch({ executablePath: EXE });
for (const [w, h] of [[1440, 900], [360, 780]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  await ctx.route(/maps\.google/, (r) => r.abort());
  for (const route of routes) {
    const p = await ctx.newPage();
    const tag = `${route} @${w}`;
    const resp = await p.goto(`http://localhost:4412${route.replace('//', '/')}`, { waitUntil: 'load' });
    if (!resp || (resp.status() !== 200 && route !== '/404.html')) fails.push(`${tag}: HTTP ${resp?.status()}`);
    const r = await p.evaluate(() => {
      const out = {};
      out.overflow = document.documentElement.scrollWidth - window.innerWidth;
      const h1s = [...document.querySelectorAll('h1')];
      out.h1 = h1s.length;
      out.h1Visible = h1s[0] ? h1s[0].getBoundingClientRect().height > 0 : false;
      out.noAlt = [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length;
      const cta = document.querySelector('main .btn-primary, main a[href="#contact"]');
      out.ctaTop = cta ? cta.getBoundingClientRect().top : -1;
      const wide = [...document.querySelectorAll('main *')].filter((el) => { const rr = el.getBoundingClientRect(); return rr.width > 0 && rr.right > window.innerWidth + 1 && getComputedStyle(el).position !== 'fixed' && !el.closest('.rv__track, .ow__list, [aria-hidden="true"], .hero__bg, .ph__bg, .rv__bg, .nf__bg, .cb__bg'); });
      out.wide = wide.slice(0, 3).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`);
      return out;
    });
    if (r.overflow > 0) fails.push(`${tag}: horizontal overflow ${r.overflow}px`);
    if (r.wide.length) fails.push(`${tag}: elements past viewport ${r.wide.join(', ')}`);
    if (r.h1 !== 1 || !r.h1Visible) fails.push(`${tag}: H1 count ${r.h1} visible ${r.h1Visible}`);
    if (r.noAlt) fails.push(`${tag}: ${r.noAlt} img without alt`);
    if (!/thank-you|404|privacy|terms/.test(route) && (r.ctaTop < 0 || r.ctaTop > h)) fails.push(`${tag}: hero CTA below the fold (top ${Math.round(r.ctaTop)})`);
    if (w === 360 && route === '/') {
      const hdr = await p.evaluate(() => ({ btns: [...document.querySelectorAll('.hd__row .btn, .hd__phone')].filter((e) => e.getBoundingClientRect().width > 0).length }));
      if (hdr.btns) fails.push(`${tag}: mobile header shows ${hdr.btns} buttons`);
      await p.click('[data-burger]');
      const menu = await p.evaluate(() => [...document.querySelectorAll('#hd-menu a')].filter((a) => !a.closest('[hidden]')).map((a) => { const rr = a.getBoundingClientRect(); return rr.bottom <= window.innerHeight && rr.width > 0; }));
      if (!menu.length || menu.some((v) => !v)) fails.push(`${tag}: menu links not all inside viewport (${menu.join(',')})`);
      await p.click('[data-burger]');
      const bar0 = await p.evaluate(() => document.querySelector('[data-sticky-cta]').hidden);
      await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.4));
      await p.waitForTimeout(300);
      const bar1 = await p.evaluate(() => document.querySelector('[data-sticky-cta]').hidden);
      if (!bar0 || bar1) fails.push(`${tag}: sticky bar top-hidden=${bar0} mid-hidden=${bar1}`);
      await p.click('[data-sticky-cta] a[href="#contact"]');
      // Wait for the smooth scroll to settle (TrustIndex widgets render on the tap and can slow it), max 3s.
      await p.waitForTimeout(600);
      for (let i = 0, last = -1; i < 12; i++) { const y = await p.evaluate(() => scrollY); if (y === last) break; last = y; await p.waitForTimeout(200); }
      const land = await p.evaluate(() => { const f = document.getElementById('contact').getBoundingClientRect(); const i = document.querySelector('#contact input[name="name"]').getBoundingClientRect(); return { form: Math.round(f.top), input: Math.round(i.top), bar: document.querySelector('[data-sticky-cta]').hidden }; });
      if (land.form < 40 || land.input > h * 0.5) fails.push(`${tag}: QQ landing form ${land.form} input ${land.input}`);
      if (!land.bar) fails.push(`${tag}: sticky bar visible over the form`);
      console.log(`mobile QQ landing: form y=${land.form}, first input y=${land.input}`);
    }
    await p.close();
  }
  await ctx.close();
}
await b.close();
server.close();
if (fails.length) { console.log(`CHECK: FAIL (${fails.length})\n` + fails.join('\n')); process.exit(1); }
console.log(`CHECK: PASS (${routes.length} routes x 2 viewports)`);
