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
// from our own code. Trustindex (6 Nov 2026): every widget actually renders (its own id, height > 0)
// after a first interaction; main/review-page fill the reviews section, which is the first section
// after the hero; slimline text white on dark grounds and AA on light ones; the corner is fixed
// bottom-left on desktop, hidden on mobile, and never sits over a link, button or field while the
// page scrolls. A missing route (the 404 page) is checked too. Exit 1 on any failure.
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
const NOT_FOUND = '/404-check-trustindex/';
routes.push(NOT_FOUND);
// CHECK_ROUTES=/a/,/b/ limits the run to those routes (gate proofs on a broken copy); default: every route.
if (process.env.CHECK_ROUTES) { const keep = process.env.CHECK_ROUTES.split(','); routes.splice(0, routes.length, ...routes.filter((x) => keep.includes(x))); }
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
const fails = []; const btnLog = []; const heroLog = []; const tiLog = [];
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
    const wantStatus = r === NOT_FOUND ? 404 : 200;
    if (!res || res.status() !== wantStatus) fails.push(`${tag}: HTTP ${res?.status()} (want ${wantStatus})`);
    await page.waitForTimeout(live ? 2500 : 300);
    // Trustindex widgets start on the first visitor input: move, scroll a little, then wait for all of them.
    // Each slot must hold ITS OWN widget (the corner badge may be moved out of its box, so it is found by id).
    // Lower widgets render as they near the viewport, so the whole page is scrolled first.
    await page.mouse.move(60, 60);
    for (let i = 0, H = await page.evaluate(() => document.documentElement.scrollHeight); i * 500 < H; i++) { await page.mouse.wheel(0, 500); await page.waitForTimeout(60); }
    const tiRendered = await page.waitForFunction(() => [...document.querySelectorAll('[data-trustindex-slot]')].every((s) => s.dataset.trustindexRole === 'corner' ? document.querySelector(`.ti-widget[data-pid="${s.dataset.trustindexId}"]`) : s.querySelector(':scope > .ti-widget')), null, { timeout: 25000 }).then(() => true, () => false);
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(live ? 1500 : 1000);
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
        // ROUND 3: hours day by day (Monday ... Sunday, one row each), never "Monday to Friday" anywhere on the page.
        hours: (() => { const dl = document.querySelector('footer dl[data-hours]'); const days = dl ? [...dl.querySelectorAll('dt')].filter(vis).map((d) => d.innerText.trim()) : []; return JSON.stringify(days) === JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']) && !/Monday to Friday|Saturday and Sunday/.test(document.body.innerText); })(),
        // ROUND 3: geometry of the slimlines. Hero: below the paragraph, above the buttons. Quote section:
        // in the left copy column (left of the form card on desktop, above it on mobile), never inside the card.
        r3: (() => {
          const out = {};
          const h = document.querySelector('[data-section="hero"]'); const hs = h?.querySelector('[data-trustindex-slot="slim-hero"]');
          const lead = hs?.previousElementSibling; const btn = h?.querySelector('a.btn');
          if (hs && btn) { const sb = hs.getBoundingClientRect(); out.hero = { leadAbove: !!lead && lead.tagName === 'P' && lead.getBoundingClientRect().bottom <= sb.top + 1, gapLead: lead ? Math.round(sb.top - lead.getBoundingClientRect().bottom) : null, btnBelow: btn.getBoundingClientRect().top >= sb.bottom - 1, gapBtn: Math.round(btn.getBoundingClientRect().top - sb.bottom) }; }
          const q = document.querySelector('[data-section="quote-form"]'); const qs = q?.querySelector('[data-trustindex-slot="slim-form"]'); const card = q?.querySelector('.qf__card, .dm-qf__card');
          if (qs && card) { const sb = qs.getBoundingClientRect(); const cb = card.getBoundingClientRect(); out.form = { inCard: card.contains(qs), leftOfCard: sb.right <= cb.left + 1, aboveCard: sb.bottom <= cb.top + 1 }; }
          if (location.pathname === '/home-2/') {
            const ff = getComputedStyle(document.querySelector('h1')).fontFamily; out.font = { family: ff, loaded: document.fonts.check('500 40px Outfit') };
            out.royal = ['services-all', 'articles-all', 'faq-all'].map((c) => getComputedStyle(document.querySelector(`[data-cta="${c}"]`)).backgroundColor);
            out.bar = getComputedStyle(document.querySelector('.ft__bar')).backgroundColor;
            out.rvBg = getComputedStyle(document.querySelector('[data-section="reviews"]')).backgroundImage + '|' + getComputedStyle(document.querySelector('[data-section="reviews"]')).backgroundColor;
            const cards = [...document.querySelectorAll('.fx-ap__card')].map((c) => Math.round(c.getBoundingClientRect().height)); out.apHeights = cards;
            const imgs = [...document.querySelectorAll('.fx-ap__img')].map((c) => Math.round(c.getBoundingClientRect().height)); out.apImgs = imgs;
            const tl = [...document.querySelectorAll('.fx-tl__card')].map((c) => { const i = c.querySelector('.fx-tl__img'); return i ? Math.round(c.getBoundingClientRect().width - i.getBoundingClientRect().width) : -1; }); out.tlGap = tl;
          }
          return out;
        })(),
        ti: (() => {
          const lum = (c) => { const v = (c.match(/[\d.]+/g) || []).slice(0, 3).map(Number).map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
          const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; const a = (c.match(/[\d.]+/g) || [])[3]; if (c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent' && (a === undefined || +a > 0.5)) return c; } return 'rgb(255, 255, 255)'; };
          return [...document.querySelectorAll('[data-trustindex-slot]')].map((s) => {
            const w = s.dataset.trustindexRole === 'corner' ? document.querySelector(`.ti-widget[data-pid="${s.dataset.trustindexId}"]`) : s.querySelector(':scope > .ti-widget');
            const b = w?.getBoundingClientRect(); const ss = getComputedStyle(s); const sb = { width: s.clientWidth - parseFloat(ss.paddingLeft) - parseFloat(ss.paddingRight) }; const cs = w ? getComputedStyle(w) : null;
            const strong = w?.querySelector('.ti-header strong');
            let contrast = null; if (strong) { const fg = getComputedStyle(strong).color; const bg = bgOf(s.parentElement); const [a, c] = [lum(fg), lum(bg)].sort((x, y) => y - x); contrast = +((a + 0.05) / (c + 0.05)).toFixed(2); }
            return { place: s.dataset.trustindexSlot, role: s.dataset.trustindexRole, id: s.dataset.trustindexId, pid: w?.dataset.pid || null, h: b ? Math.round(b.height) : 0, w: b ? Math.round(b.width) : 0, slotW: Math.round(sb.width), shown: !!w && vis(w), pos: cs?.position, left: b ? Math.round(b.left) : null, bottom: b ? Math.round(innerHeight - b.bottom) : null, dark: s.classList.contains('ti-slot--on-dark'), color: strong ? getComputedStyle(strong).color : null, contrast, inSection: s.closest('[data-section]')?.dataset.section || null };
          });
        })(),
        order: [...document.querySelectorAll('main section[data-section]')].filter((x) => !x.parentElement.closest('main section')).map((x) => x.dataset.section).slice(0, 2),
        formFields: form ? [...form.querySelectorAll('input, select, textarea')].filter((e) => e.type !== 'hidden' && vis(e)).map((e) => e.getAttribute('placeholder') || e.getAttribute('aria-label') || e.name || e.tagName) : null,
        formSelect: form ? [...form.querySelectorAll('select option')].map((o) => o.textContent.trim()) : [],
        visibleLabels: form ? [...form.querySelectorAll('label')].filter((l) => vis(l) && l.getBoundingClientRect().height > 4 && l.innerText.trim() && !l.querySelector('input[type=radio],input[type=checkbox]')).length : 0,
        utility: /thank-you|404/.test(location.pathname),
        // OPERATOR OVERHAUL (5 Nov 2026): computed styles, not source.
        underlined: [...document.querySelectorAll('a')].filter((a) => vis(a) && !a.closest('.ti-widget') && getComputedStyle(a).textDecorationLine.includes('underline')).map((a) => a.innerText.trim().slice(0, 40)),
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
        topBorders: [...document.querySelectorAll('main *')].filter((e) => { const c = getComputedStyle(e); return vis(e) && !e.closest('.ti-slot') && parseFloat(c.borderTopWidth) >= 2 && parseFloat(c.borderBottomWidth) === 0 && parseFloat(c.borderLeftWidth) === 0; }).map((e) => e.className).slice(0, 5),
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
    if (!m.hours) fails.push(`${tag}: footer hours not day by day (Monday ... Sunday), or "Monday to Friday" on the page`);
    // ROUND 3 rendered gates.
    if (m.r3.hero && (!m.r3.hero.leadAbove || !m.r3.hero.btnBelow || m.r3.hero.gapLead > 24 || m.r3.hero.gapBtn > 32)) fails.push(`${tag}: hero slimline not between the paragraph and the buttons ${JSON.stringify(m.r3.hero)}`);
    if (m.r3.form && (m.r3.form.inCard || (vp.name === 'desktop' ? !m.r3.form.leftOfCard : !m.r3.form.aboveCard))) fails.push(`${tag}: quote-section slimline not in the left column ${JSON.stringify(m.r3.form)}`);
    if (r === '/home-2/') {
      const x = m.r3;
      if (!/^"?Outfit/.test(x.font.family) || !x.font.loaded) fails.push(`${tag}: home-2 headings not in Outfit ${JSON.stringify(x.font)}`);
      if (x.royal.some((c) => c !== 'rgb(1, 82, 155)')) fails.push(`${tag}: home-2 View All / All Resources / All Questions buttons not royal blue ${JSON.stringify(x.royal)}`);
      if (x.bar !== 'rgb(16, 35, 58)') fails.push(`${tag}: home-2 footer legal bar ${x.bar} (want the navy ink-800)`);
      if (x.rvBg !== 'none|rgb(255, 255, 255)') fails.push(`${tag}: home-2 reviews background ${x.rvBg} (want white)`);
      if (vp.name === 'desktop' && (Math.max(...x.apHeights) - Math.min(...x.apHeights) > 2 || Math.max(...x.apImgs) - Math.min(...x.apImgs) > 1)) fails.push(`${tag}: home-2 resource cards not equal height ${JSON.stringify([x.apHeights, x.apImgs])}`);
      if (x.tlGap.some((g) => g < 0 || g > 32)) fails.push(`${tag}: home-2 tiles: photo missing or not full width ${JSON.stringify(x.tlGap)}`);
    }
    if (m.underlined.length) fails.push(`${tag}: underlined links ${JSON.stringify(m.underlined.slice(0, 5))}`);
    if (m.heroBad.length) fails.push(`${tag}: hero carries ${m.heroBad.join(', ')}`);
    if (m.formInHero) fails.push(`${tag}: quote form inside the hero`);
    if (!m.utility && !m.formSection) fails.push(`${tag}: quote form not in its own section`);
    if (m.slider) fails.push(`${tag}: before-and-after slider present`);
    if (!m.charity) fails.push(`${tag}: footer charity line missing`);
    if (!m.credit) fails.push(`${tag}: footer LMB credit missing`);
    if (m.logos.some((l) => l !== 'header') || m.logos.length !== 1) fails.push(`${tag}: logo outside the header bar ${JSON.stringify(m.logos)}`);
    if (m.dropHubs < 5) fails.push(`${tag}: services dropdown lists ${m.dropHubs} links`);
    // TRUSTINDEX (6 Nov 2026): rendered, mapped, placed, readable; corner desktop only.
    if (!tiRendered) fails.push(`${tag}: Trustindex widgets did not all render ${JSON.stringify(m.ti.filter((x) => !x.pid).map((x) => x.place))}`);
    const want = r === '/reviews/' ? 'reviewPage' : 'main';
    const tiBy = (place) => m.ti.filter((x) => x.place === place);
    for (const x of m.ti) if (x.pid && x.pid !== x.id) fails.push(`${tag}: ${x.place} rendered widget ${x.pid}, slot is ${x.id}`);
    if (tiBy('reviews').length !== 1 || tiBy('reviews')[0].role !== want) fails.push(`${tag}: reviews widget ${JSON.stringify(tiBy('reviews').map((x) => x.role))} (want one ${want})`);
    else { const x = tiBy('reviews')[0]; if (!x.shown || x.h < 200 || x.w < x.slotW * 0.9 || x.inSection !== 'reviews') fails.push(`${tag}: reviews widget not filling its section ${JSON.stringify(x)}`); }
    if (JSON.stringify(m.order) !== '["hero","reviews"]') fails.push(`${tag}: sections start ${m.order.join(' > ')} (want hero > reviews)`);
    for (const place of ['slim-hero', ...(m.utility ? [] : ['slim-form'])]) {
      const xs = tiBy(place); const x = xs[0];
      if (xs.length !== 1 || x.role !== 'slimline') fails.push(`${tag}: ${place} ${JSON.stringify(xs.map((y) => y.role))} (want one slimline)`);
      else if (!x.shown || x.h < 16 || x.inSection !== (place === 'slim-hero' ? 'hero' : 'quote-form')) fails.push(`${tag}: ${place} not visible in its section ${JSON.stringify(x)}`);
      else if (x.dark ? x.color !== 'rgb(255, 255, 255)' : !(x.contrast >= 4.5)) fails.push(`${tag}: ${place} text ${x.color} on ${x.dark ? 'dark' : 'light'} ground (contrast ${x.contrast})`);
    }
    const corner = tiBy('corner');
    if (corner.length !== 1) fails.push(`${tag}: ${corner.length} corner widgets`);
    else if (vp.name === 'desktop' && (!corner[0].shown || corner[0].pos !== 'fixed' || corner[0].left > 40 || corner[0].bottom > 40)) fails.push(`${tag}: corner badge not fixed bottom-left on desktop ${JSON.stringify(corner[0])}`);
    else if (vp.name === 'mobile' && corner[0].shown) fails.push(`${tag}: corner badge visible on mobile`);
    tiLog.push(`${tag} ${m.ti.map((x) => `${x.place}=${x.role}:${x.pid ? x.pid.slice(0, 6) : 'NONE'}:${x.w}x${x.h}${x.contrast ? ':c' + x.contrast : ''}${x.place === 'corner' ? ':' + (x.shown ? 'shown' : 'hidden') : ''}`).join(' ')}`);
    if (vp.name === 'desktop') {
      // The corner badge must never OBSCURE a control: a link, button or field it covers at every
      // scroll position where that control is on screen (so the visitor can never reach it), a fixed
      // control it overlaps, or the quote form after the Quick Quote jump. Content that merely
      // scrolls past under it is not obscured: it is clear a moment earlier or later.
      const hits = await page.evaluate(async () => {
        const badge = document.querySelector('.ti-widget[data-pid="750bdd38520519524a16f32074e"]'); if (!badge) return ['no badge'];
        const ctl = [...document.querySelectorAll('a, button, input, textarea, select, [role="button"]')].filter((e) => !e.closest('.ti-widget') && !e.closest('[hidden]'));
        const label = (e) => `${e.tagName.toLowerCase()} "${(e.innerText || e.getAttribute('aria-label') || e.name || '').trim().replace(/\s+/g, ' ').slice(0, 30)}"`;
        const over = (r, b) => r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top;
        const shown = (e) => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return s.visibility !== 'hidden' && s.display !== 'none' && r.width > 0 && r.height > 0; };
        const seen = new Map(); const out = new Set(); const H = document.documentElement.scrollHeight;
        const steps = []; for (let y = 0; y < H - innerHeight; y += Math.round(innerHeight * 0.2)) steps.push(y); steps.push(H);
        for (const y of steps) {
          window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30));
          const b = badge.getBoundingClientRect();
          for (const e of ctl) {
            if (!shown(e)) continue; const r = e.getBoundingClientRect();
            if (r.bottom <= 0 || r.top >= innerHeight) continue;
            const fixed = ['fixed', 'sticky'].includes(getComputedStyle(e.closest('[style*="position"], header, [data-sticky-cta], .wa') || e).position);
            if (fixed && over(r, b)) out.add(`${label(e)} (fixed)`);
            const st = seen.get(e) || { onScreen: 0, clear: 0 }; st.onScreen++; if (!over(r, b) && r.top >= 0 && r.bottom <= innerHeight) st.clear++; seen.set(e, st);
          }
        }
        for (const [e, st] of seen) if (st.onScreen && !st.clear) out.add(`${label(e)} (never clear)`);
        const form = document.getElementById('contact');
        if (form) {
          (form.closest('[data-quote-card]')?.parentElement ?? form).scrollIntoView({ block: 'start' }); await new Promise((r) => setTimeout(r, 60));
          const b = badge.getBoundingClientRect();
          for (const e of form.parentElement.querySelectorAll('input, textarea, select, button')) if (shown(e) && over(e.getBoundingClientRect(), b)) out.add(`${label(e)} (quote form after the Quick Quote jump)`);
        }
        window.scrollTo(0, 0); return [...out];
      });
      if (hits.length) fails.push(`${tag}: corner badge obscures ${hits.length} control(s): ${hits.slice(0, 4).join(' | ')}`);
    }
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
tiLog.forEach((l) => console.log('  ti', l));
if (args.includes('--log')) { heroLog.forEach((l) => console.log('  hero', l)); const seen = new Set(); btnLog.forEach((l) => { const k = l.replace(/^\S+ \S+ /, (x) => x.split(' ')[0] + ' '); if (!seen.has(k)) { seen.add(k); console.log('  btn', l); } }); }
const worst = btnLog.map((l) => Math.abs(+l.split('delta ')[1])).reduce((a, b) => Math.max(a, b), 0);
console.log(`buttons measured: ${btnLog.length}, worst |delta| ${worst}px`);
console.log(`check: ${routes.length} routes x ${sizes.length} widths against ${base}, ${fails.length} fails`);
fails.forEach((f) => console.log('  FAIL', f));
process.exit(fails.length ? 1 : 0);
