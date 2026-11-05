// RENDERED CHECKS (Playwright Chromium) at 1440x900 and 390x844 on every route.
// Usage: node scripts/check.mjs [baseURL] [--shots dir]
//   no baseURL: serves dist/ locally (the Formlane form only renders on its allowed domains, so
//   the form-render check runs only against the live worker URL).
// Checks: no horizontal overflow; one visible H1; hero CTA above the fold; mobile header = logo +
// call + burger, desktop nav visible; mobile WhatsApp button bottom-right (hidden on desktop);
// sticky bar hidden at top, shown mid-page, hidden over the form; footer hours; reviews slot
// present with the TODO state; the form renders Brandon's fields (live only); no console errors
// from our own code. Exit 1 on any failure.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync, mkdirSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const EXE = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';
const args = process.argv.slice(2);
const live = args[0] && !args[0].startsWith('--') ? args[0].replace(/\/$/, '') : '';
const shots = args.includes('--shots') ? args[args.indexOf('--shots') + 1] : '';
if (shots) mkdirSync(shots, { recursive: true });
const dist = new URL('../dist/', import.meta.url).pathname;
const routes = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f === 'index.html') routes.push('/' + relative(dist, d) + (relative(dist, d) ? '/' : '')); } };
walk(dist);
let base = live, server;
if (!live) {
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.xml': 'application/xml', '.ico': 'image/x-icon' };
  server = createServer((req, res) => {
    let f = join(dist, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
    if (!existsSync(f)) { res.writeHead(404, { 'content-type': 'text/html' }); res.end(readFileSync(join(dist, '404.html'))); return; }
    res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(readFileSync(f));
  });
  await new Promise((r) => server.listen(4417, r));
  base = 'http://localhost:4417';
}
const fails = [];
const browser = await chromium.launch({ executablePath: EXE });
const sizes = [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }];
for (const vp of sizes) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, isMobile: vp.name === 'mobile', hasTouch: vp.name === 'mobile', reducedMotion: shots ? 'reduce' : 'no-preference' });
  for (const r of routes) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    const res = await page.goto(base + r, { waitUntil: 'load', timeout: 60000 });
    const tag = `${vp.name} ${r}`;
    if (!res || res.status() !== 200) fails.push(`${tag}: HTTP ${res?.status()}`);
    await page.waitForTimeout(live ? 2500 : 300);
    const m = await page.evaluate((vpw) => {
      const vis = (el) => { if (!el) return false; const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && b.width > 0 && b.height > 0; };
      const h1s = [...document.querySelectorAll('h1')].filter(vis).length;
      const cta = document.querySelector('[data-cta="hero-quote"]');
      const ctaB = cta?.getBoundingClientRect();
      const wa = document.querySelector('.wa');
      const waB = wa?.getBoundingClientRect();
      const ft = document.querySelector('footer')?.innerText || '';
      const form = document.querySelector('[data-lead-form]');
      return {
        overflow: Math.max(document.documentElement.scrollWidth, window.innerWidth) - vpw,
        h1s, ctaTop: ctaB ? ctaB.top + window.scrollY : null, ctaVisible: vis(cta),
        burger: vis(document.querySelector('[data-burger]')), nav: vis(document.querySelector('.hd__nav')), mcall: vis(document.querySelector('.hd__mcall')),
        wa: vis(wa), waRight: waB ? window.innerWidth - waB.right : null, waBottom: waB ? window.innerHeight - waB.bottom : null,
        hours: /Monday to Friday/.test(ft) && /7am to 7pm/.test(ft) && /8am to 6pm/.test(ft),
        reviews: document.querySelector('[data-trustindex-slot="reviews"]')?.getAttribute('data-trustindex-state'),
        formFields: form ? [...form.querySelectorAll('input, select, textarea')].filter((e) => e.type !== 'hidden' && vis(e)).map((e) => e.getAttribute('placeholder') || e.getAttribute('aria-label') || e.name || e.tagName) : null,
        formSelect: form ? [...form.querySelectorAll('select option')].map((o) => o.textContent.trim()) : [],
        visibleLabels: form ? [...form.querySelectorAll('label')].filter((l) => vis(l) && l.getBoundingClientRect().height > 4 && l.innerText.trim() && !l.querySelector('input[type=radio],input[type=checkbox]')).length : 0,
        utility: /thank-you|404/.test(location.pathname),
        // OPERATOR OVERHAUL (5 Nov 2026): computed styles, not source.
        underlined: [...document.querySelectorAll('a')].filter((a) => vis(a) && getComputedStyle(a).textDecorationLine.includes('underline')).map((a) => a.innerText.trim().slice(0, 40)),
        heroBad: (() => { const h = document.querySelector('[data-section="hero"]'); return h ? [...h.querySelectorAll('iframe, form, [data-lead-form], [data-video], img[src*="/brand/logo"]')].map((e) => e.tagName + (e.className ? '.' + e.className : '')) : []; })(),
        formInHero: !!document.querySelector('[data-quote-card]')?.closest('[data-section="hero"]'),
        formSection: !!document.querySelector('[data-quote-card]')?.closest('[data-section="quote-form"]'),
        slider: !!document.querySelector('[data-ba], .ba'),
        charity: ft.includes("Proud to support A Child's Wish, a children's charity."),
        credit: !!document.querySelector('footer [data-footer-credit] a[href="https://localmapbooster.com/"]'),
        logos: [...document.querySelectorAll('img[src*="/brand/logo"]')].filter((i) => vis(i) && !i.closest('footer')).map((i) => i.closest('header') ? 'header' : 'other'),
        dropHubs: document.querySelectorAll('.hd__drop a').length,
      };
    }, vp.width);
    if (m.overflow > 0) fails.push(`${tag}: horizontal overflow ${m.overflow}px`);
    if (m.h1s !== 1) fails.push(`${tag}: ${m.h1s} visible H1s`);
    if (!m.utility && (!m.ctaVisible || m.ctaTop > vp.height)) fails.push(`${tag}: hero Quick Quote not above the fold (top ${Math.round(m.ctaTop)})`);
    if (vp.name === 'mobile') {
      if (!m.burger || m.nav || !m.mcall) fails.push(`${tag}: mobile header wrong (burger ${m.burger}, nav ${m.nav}, call ${m.mcall})`);
      if (!m.wa || m.waRight > 40 || m.waBottom > 120) fails.push(`${tag}: WhatsApp button not bottom-right (${m.wa}, r ${m.waRight}, b ${m.waBottom})`);
    } else {
      if (m.burger || !m.nav) fails.push(`${tag}: desktop header wrong`);
      if (m.wa) fails.push(`${tag}: WhatsApp float visible on desktop`);
    }
    if (!m.hours) fails.push(`${tag}: footer hours missing`);
    if (m.underlined.length) fails.push(`${tag}: underlined links ${JSON.stringify(m.underlined.slice(0, 5))}`);
    if (m.heroBad.length) fails.push(`${tag}: hero carries ${m.heroBad.join(', ')}`);
    if (m.formInHero) fails.push(`${tag}: quote form inside the hero`);
    if (!m.utility && !m.formSection) fails.push(`${tag}: quote form not in its own section`);
    if (m.slider) fails.push(`${tag}: before-and-after slider present`);
    if (!m.charity) fails.push(`${tag}: footer charity line missing`);
    if (!m.credit) fails.push(`${tag}: footer LMB credit missing`);
    if (m.logos.some((l) => l !== 'header') || m.logos.length !== 1) fails.push(`${tag}: logo outside the header bar ${JSON.stringify(m.logos)}`);
    if (m.dropHubs < 5) fails.push(`${tag}: services dropdown lists ${m.dropHubs} links`);
    if (!m.utility && m.reviews !== 'pending-widget-id' && m.reviews !== 'live') fails.push(`${tag}: reviews slot missing`);
    if (live && !m.utility) {
      const want = ['Exterior work', 'Bedroom', 'Living room', 'Kitchen', 'Hallway', 'Bathroom'];
      if (!m.formFields || m.formFields.length < 6) fails.push(`${tag}: Formlane form did not render (${JSON.stringify(m.formFields)})`);
      else if (!want.every((w) => m.formSelect.includes(w))) fails.push(`${tag}: work dropdown options ${JSON.stringify(m.formSelect)}`);
      if (m.visibleLabels) fails.push(`${tag}: ${m.visibleLabels} visible form labels`);
    }
    if (vp.name === 'mobile' && !m.utility) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
      await page.waitForTimeout(400);
      const mid = await page.evaluate(() => { const b = document.querySelector('[data-sticky-cta]'); const f = document.querySelector('[data-quote-card]')?.getBoundingClientRect(); const ft = document.querySelector('footer').getBoundingClientRect(); const over = (f && f.top < innerHeight && f.bottom > 0) || ft.top < innerHeight; return { shown: b && !b.hidden, over }; });
      if (!mid.over && !mid.shown) fails.push(`${tag}: sticky bar not shown mid-page`);
      await page.evaluate(() => document.querySelector('[data-quote-card]')?.scrollIntoView({ block: 'center' }));
      await page.waitForTimeout(400);
      if (await page.evaluate(() => !document.querySelector('[data-sticky-cta]').hidden)) fails.push(`${tag}: sticky bar shown over the form`);
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    const own = errors.filter((e) => !/formlane|youtube|google|trustindex/i.test(e));
    if (own.length) fails.push(`${tag}: page errors ${own.join(' | ').slice(0, 200)}`);
    if (shots) {
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(800);
    }
    if (shots) await page.screenshot({ path: join(shots, `${vp.name}${r.replace(/\//g, '_') || '_home'}.png`), fullPage: true });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
server?.close();
console.log(`check: ${routes.length} routes x ${sizes.length} widths against ${base}, ${fails.length} fails`);
fails.forEach((f) => console.log('  FAIL', f));
process.exit(fails.length ? 1 : 0);
