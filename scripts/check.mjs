// RENDERED CHECKS (Playwright Chromium) at 1440x900 and 390x844 on every route.
// Usage: node scripts/check.mjs [baseURL] [--shots dir]
//   no baseURL: serves dist/ locally (the Formlane form only renders on its allowed domains, so
//   the form-render check runs only against the live worker URL).
// Checks: no horizontal overflow; one visible H1; hero CTA above the fold; mobile header = logo +
// call + burger, desktop nav visible; mobile WhatsApp button bottom-right (hidden on desktop);
// sticky bar hidden at top, shown mid-page, hidden over the form; footer hours; reviews slot
// present with the TODO state; the form renders the five default fields (live only); round 2:
// no YouTube iframe, one hero pattern aligned to the page container, no lone top borders, home
// map = the Google listing CID, areas boxless, how a job runs left-aligned with the photo flush,
// every button's label optically centred (cap box, |delta| <= 1.5px); no console errors
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
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}`;
}
const measureButtons = (sel) => {
          const vis = (el) => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && b.width > 0 && b.height > 0; };
          // Optical vertical centring: the CAP box (baseline - cap height) of the label against the
          // button's border box. A Range over the label gives its inline box; canvas gives the font metrics.
          const cv = document.createElement('canvas').getContext('2d'); const out = [];
          for (const b of document.querySelectorAll(sel)) {
            if (!vis(b)) continue;
            const walker = document.createTreeWalker(b, NodeFilter.SHOW_TEXT, { acceptNode: (n) => n.textContent.trim() ? 1 : 2 });
            const tn = walker.nextNode(); if (!tn) continue;
            const host = tn.parentElement; const cs = getComputedStyle(host);
            cv.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
            const t = cs.textTransform === 'uppercase' ? tn.textContent.trim().toUpperCase() : tn.textContent.trim();
            const mt = cv.measureText(t);
            // The text's inline box spans the font's ascent + descent; its top + the ascent is the baseline.
            const rg = document.createRange(); rg.selectNodeContents(tn); const rr = rg.getClientRects()[0] || rg.getBoundingClientRect();
            const base = rr.top + mt.fontBoundingBoxAscent; const capTop = base - mt.actualBoundingBoxAscent; const glyphBottom = base + (/[gjpqy,]/.test(t) ? mt.actualBoundingBoxDescent : 0);
            const bb = b.getBoundingClientRect(); const bs = getComputedStyle(b);
            const top = capTop - (bb.top + parseFloat(bs.borderTopWidth)); const bottom = (bb.bottom - parseFloat(bs.borderBottomWidth)) - glyphBottom;
            out.push({ label: t.slice(0, 30), cls: (b.className || '').toString().split(' ')[0], top: +top.toFixed(1), bottom: +bottom.toFixed(1), delta: +(top - bottom).toFixed(1) });
          }
          return out;
        };
// HOMEPAGE VARIANTS (TEMPORARY, operator brief 5 Nov 2026): /home-2/ and /home-3/ port other templates'
// heroes and areas treatments on purpose, so the one-hero-pattern and boxless-areas checks skip them.
const VARIANT = /^\/home-[23]\/$/;
const fails = []; const btnLog = []; const heroLog = [];
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
        // ROUND 2 (5 Nov 2026): no YouTube anywhere; one hero pattern on every page; no lone top
        // borders; the home map is the Google listing; areas boxless; steps left + image flush.
        youtube: [...document.querySelectorAll('iframe')].filter((f) => /youtube/.test(f.src)).length,
        heroPattern: (() => {
          const h = document.querySelector('[data-section="hero"]'); if (!h || !h.dataset.hero) return { ok: false, why: 'no shared hero' };
          const bg = h.querySelector('.hero__bg'); const hb = h.getBoundingClientRect(); const bb = bg?.getBoundingClientRect();
          const h1 = h.querySelector('h1').getBoundingClientRect();
          const ref = document.querySelector('[data-section="reviews"] .container, main section:not([data-section="hero"]) .container');
          const cs = ref ? getComputedStyle(ref) : null; const refLeft = ref ? ref.getBoundingClientRect().left + parseFloat(cs.paddingLeft) : null;
          return { ok: !!bb && Math.abs(bb.width - hb.width) < 2 && Math.abs(bb.height - hb.height) < 2, side: !!h.querySelector('.ph__img'), h1Left: Math.round(h1.left), refLeft: refLeft == null ? null : Math.round(refLeft), height: Math.round(hb.height), kind: h.dataset.hero };
        })(),
        topBorders: [...document.querySelectorAll('main *')].filter((e) => { const c = getComputedStyle(e); return vis(e) && parseFloat(c.borderTopWidth) >= 2 && parseFloat(c.borderBottomWidth) === 0 && parseFloat(c.borderLeftWidth) === 0; }).map((e) => e.className).slice(0, 5),
        homeMap: document.querySelector('[data-section="areas"] iframe')?.getAttribute('src') || null,
        areasBoxed: [...document.querySelectorAll('[data-section="areas"] li, [data-section="areas"] .ar__copy')].filter((e) => { const c = getComputedStyle(e); return c.backgroundColor !== 'rgba(0, 0, 0, 0)' || parseFloat(c.borderTopWidth) > 0 || parseFloat(c.borderLeftWidth) > 0; }).length,
        steps: (() => { const s = document.querySelector('[data-section="process"]'); if (!s) return null; const h2 = s.querySelector('h2'); const more = s.querySelector('.more-line'); const p = s.querySelector('.hw__panel').getBoundingClientRect(); const ph = s.querySelector('.hw__photo'); const pb = ph && vis(ph) ? ph.getBoundingClientRect() : null; return { h2: getComputedStyle(h2).textAlign, more: more ? getComputedStyle(more).textAlign : null, gap: pb ? Math.round(pb.left - p.right) : null, step: getComputedStyle(s.querySelector('.hw__step')).textAlign }; })(),
      };
    }, vp.width);
    m.buttons = await page.evaluate(measureButtons, '.btn, .lf-b, button[type="submit"]');
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
      // ROUND 2: the DEFAULT form, exactly these five fields in this order, no dropdowns.
      const want = ['Your name', 'Email address', 'Phone number', 'Postcode', 'Short description of the job'];
      if (!m.formFields) fails.push(`${tag}: Formlane form did not render`);
      else if (JSON.stringify(m.formFields) !== JSON.stringify(want)) fails.push(`${tag}: form fields ${JSON.stringify(m.formFields)} (want the five defaults)`);
      if (m.formSelect.length) fails.push(`${tag}: form still has a dropdown ${JSON.stringify(m.formSelect.slice(0, 4))}`);
      if (m.visibleLabels) fails.push(`${tag}: ${m.visibleLabels} visible form labels`);
      if (!m.buttons.some((x) => x.cls === 'lf-b')) fails.push(`${tag}: form submit button not measured`);
    }
    if (m.youtube) fails.push(`${tag}: ${m.youtube} YouTube iframe(s)`);
    if (!m.utility && !VARIANT.test(r)) {
      if (!m.heroPattern.ok || m.heroPattern.side) fails.push(`${tag}: hero not the home pattern ${JSON.stringify(m.heroPattern)}`);
      if (m.heroPattern.refLeft != null && Math.abs(m.heroPattern.h1Left - m.heroPattern.refLeft) > 2) fails.push(`${tag}: hero H1 left ${m.heroPattern.h1Left} vs page container ${m.heroPattern.refLeft}`);
      heroLog.push(`${tag} ${m.heroPattern.kind} h=${m.heroPattern.height} h1x=${m.heroPattern.h1Left} cx=${m.heroPattern.refLeft}`);
    }
    if (m.topBorders.length) fails.push(`${tag}: lone top borders ${JSON.stringify(m.topBorders)}`);
    if (r === '/' && m.homeMap !== 'https://www.google.com/maps?cid=8023434379390696838&output=embed') fails.push(`${tag}: home map ${m.homeMap}`);
    if (m.areasBoxed && !VARIANT.test(r)) fails.push(`${tag}: areas section still boxed (${m.areasBoxed})`);
    if (m.steps && (m.steps.h2 !== 'left' && m.steps.h2 !== 'start' || !['left', 'start'].includes(m.steps.more) || !['left', 'start'].includes(m.steps.step) || (m.steps.gap !== null && m.steps.gap !== 0))) fails.push(`${tag}: how a job runs ${JSON.stringify(m.steps)}`);
    for (const x of m.buttons) { btnLog.push(`${tag} ${x.cls} "${x.label}" top ${x.top} bottom ${x.bottom} delta ${x.delta}`); if (Math.abs(x.delta) > 1.5) fails.push(`${tag}: button "${x.label}" (${x.cls}) not centred: top ${x.top} / bottom ${x.bottom}`); }
    if (vp.name === 'mobile' && !m.utility) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
      await page.waitForTimeout(400);
      const mid = await page.evaluate(() => { const b = document.querySelector('[data-sticky-cta]'); const f = document.querySelector('[data-quote-card]')?.getBoundingClientRect(); const ft = document.querySelector('footer').getBoundingClientRect(); const over = (f && f.top < innerHeight && f.bottom > 0) || ft.top < innerHeight; return { shown: b && !b.hidden, over }; });
      if (!mid.over && !mid.shown) fails.push(`${tag}: sticky bar not shown mid-page`);
      if (mid.shown) for (const x of await page.evaluate(measureButtons, '[data-sticky-cta] a')) { btnLog.push(`${tag} sticky "${x.label}" top ${x.top} bottom ${x.bottom} delta ${x.delta}`); if (Math.abs(x.delta) > 1.5) fails.push(`${tag}: sticky button "${x.label}" not centred: top ${x.top} / bottom ${x.bottom}`); }
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
// STD-PAGES round (operator, 5 Nov 2026): the article sidebar CTA stays in view while the article scrolls (desktop),
// and every internal link on every page resolves (redirects followed).
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  for (const r of routes.filter((x) => /^\/resources\/.+/.test(x))) {
    await page.goto(base + r, { waitUntil: 'load' });
    for (const f of [0.4, 0.7]) {
      await page.evaluate((f) => { const m = document.querySelector('.art__main'); window.scrollTo(0, m.getBoundingClientRect().top + scrollY + m.offsetHeight * f - 300); }, f);
      await page.waitForTimeout(250);
      const b = await page.evaluate(() => { const c = document.querySelector('.art__cta').getBoundingClientRect(); return { top: c.top, bottom: c.bottom }; });
      if (b.top < 0 || b.bottom > 900) fails.push(`${r} desktop: sidebar CTA out of view at ${f * 100}% (top ${Math.round(b.top)}, bottom ${Math.round(b.bottom)})`);
    }
  }
  const targets = new Set();
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: 'domcontentloaded' });
    for (const h of await page.evaluate(() => [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0]).filter(Boolean))) targets.add(h);
  }
  for (const h of targets) { const res = await ctx.request.get(base + h, { maxRedirects: 3 }); if (res.status() !== 200) fails.push(`link ${h} -> ${res.status()}`); }
  console.log(`internal link targets: ${targets.size}`);
  await ctx.close();
}
await browser.close();
server?.close();
if (args.includes('--log')) { heroLog.forEach((l) => console.log('  hero', l)); const seen = new Set(); btnLog.forEach((l) => { const k = l.replace(/^\S+ \S+ /, (x) => x.split(' ')[0] + ' '); if (!seen.has(k)) { seen.add(k); console.log('  btn', l); } }); }
const worst = btnLog.map((l) => Math.abs(+l.split('delta ')[1])).reduce((a, b) => Math.max(a, b), 0);
console.log(`buttons measured: ${btnLog.length}, worst |delta| ${worst}px`);
console.log(`check: ${routes.length} routes x ${sizes.length} widths against ${base}, ${fails.length} fails`);
fails.forEach((f) => console.log('  FAIL', f));
process.exit(fails.length ? 1 : 0);
