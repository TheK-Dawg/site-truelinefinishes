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
// ROUND 4 (19 Nov 2026): card/teaser body text never under 16px; the home hero carousel has NO manual
// controls; one services-links section on the home page; a reviews button on every page but /reviews/;
// the service CTA is a button; no Further Reading teaser; the gallery page has real space before the
// quote section; inner heroes all 720px on a desktop; the LMB credit links on the home page only.
// from our own code. Trustindex (6 Nov 2026): every widget actually renders (its own id, height > 0)
// after a first interaction; main/review-page fill the reviews section, which is the first section
// after the hero; slimline text white on dark grounds and AA on light ones; the corner is fixed
// bottom-left on desktop, hidden on mobile, and never sits over a link, button or field while the
// page scrolls. A missing route (the 404 page) is checked too. Home 3 site-wide (19 Nov 2026): the
// selected design's fonts, navy header/footer, pill buttons and centred hero on every page; Brandon's two
// videos on the home page only (geometry + each player loads inside its frame); live: the retired
// /home-2/, /home-3/ and /complaints/ URLs answer 301. Exit 1 on any failure.
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
            // CAP HEIGHT comes from the flat-topped 'H' and the descender depth from 'p', NOT from the
            // label's own ink: round capitals (Q, O, C) and tall lowercase overshoot the cap line, which
            // made the measured gap shrink as the type grew. `text-box: trim-both cap alphabetic` centres
            // the METRIC cap box, so the gate has to measure the same box (round 4, 19 Nov 2026: the
            // button size went up one step and the old ink-based reading reported a false 2px offset).
            const capH = cv.measureText('H').actualBoundingBoxAscent;
            const descH = cv.measureText('p').actualBoundingBoxDescent;
            // The text's inline box spans the font's ascent + descent; its top + the ascent is the baseline.
            const rg = document.createRange(); rg.selectNodeContents(tn); const rr = rg.getClientRects()[0] || rg.getBoundingClientRect();
            const base = rr.top + mt.fontBoundingBoxAscent; const capTop = base - capH; const glyphBottom = base + (/[gjpqy,]/.test(t) ? descH : 0);
            const bb = b.getBoundingClientRect(); const bs = getComputedStyle(b);
            const top = capTop - (bb.top + parseFloat(bs.borderTopWidth)); const bottom = (bb.bottom - parseFloat(bs.borderBottomWidth)) - glyphBottom;
            out.push({ label: t.slice(0, 30), cls: (b.className || '').toString().split(' ')[0], top: +top.toFixed(1), bottom: +bottom.toFixed(1), delta: +(top - bottom).toFixed(1) });
          }
          return out;
        };
// HOME 3 SITE-WIDE (operator, 19 Nov 2026): the variants are retired and 301 to / (worker/redirects.js).
const REDIRECTS = [['/home-3/', '/'], ['/home-3', '/'], ['/home-2/', '/'], ['/home-2', '/'], ['/complaints/', '/complaints-procedure/']];
const fails = []; const btnLog = []; const heroLog = []; const tiLog = []; const videoLog = [];
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
          return out;
        })(),
        // HOME 3 SITE-WIDE (19 Nov 2026): computed styles of the selected design on every page.
        design: (() => {
          const h1 = document.querySelector('h1'); const h2 = document.querySelector('main h2'); const q = document.querySelector('[data-cta="hero-quote"]') || document.querySelector('main .btn');
          return {
            h1Font: getComputedStyle(h1).fontFamily.split(',')[0].replace(/"/g, ''), headLoaded: document.fonts.check('400 40px "Lexend Deca"'),
            bodyFont: getComputedStyle(document.body).fontFamily.split(',')[0].replace(/"/g, ''), bodyLoaded: document.fonts.check('400 16px "Kumbh Sans"'),
            upper: [h1, h2].filter(Boolean).map((e) => getComputedStyle(e).textTransform).filter((t) => t === 'uppercase').length,
            header: getComputedStyle(document.querySelector('[data-header]')).backgroundColor,
            footer: getComputedStyle(document.querySelector('footer')).backgroundColor, bar: getComputedStyle(document.querySelector('.ft__bar')).backgroundColor,
            pill: q ? parseFloat(getComputedStyle(q).borderTopLeftRadius) >= q.getBoundingClientRect().height / 2 - 1 : false,
            // The headline's TEXT lines (not its box) centred in the hero: every line's centre within 2px of the hero's.
            heroCentred: (() => { const h = document.querySelector('[data-section="hero"]'); const t = h?.querySelector('h1'); if (!h || !t) return null; const hb = h.getBoundingClientRect(); const c = (hb.left + hb.right) / 2; const rg = document.createRange(); rg.selectNodeContents(t); const lines = [...rg.getClientRects()].filter((r) => r.width > 4); return lines.length ? Math.round(Math.max(...lines.map((r) => Math.abs((r.left + r.right) / 2 - c)))) : null; })(),
          };
        })(),
        videos: [...document.querySelectorAll('[data-section="videos"] iframe')].map((f) => { const b = f.getBoundingClientRect(); return { src: f.getAttribute('src'), w: Math.round(b.width), h: Math.round(b.height), left: Math.round(b.left), top: Math.round(b.top + scrollY) }; }),
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
        // ROUND 4 (19 Nov 2026): the credit reads the same on every page; the keyword is a LINK on the
        // home page only, plain text (no href, tabindex or role) everywhere else.
        credit: (() => {
          const c = document.querySelector('footer [data-footer-credit]'); if (!c) return null;
          const a = c.querySelector('a[href="https://localmapbooster.com/"]');
          const kw = c.querySelector('.footer-credit__link');
          return { text: c.innerText.replace(/\s+/g, ' ').trim(), linked: !!a, kw: kw ? kw.innerText.trim() : '', tab: kw ? kw.getAttribute('tabindex') : null, role: kw ? kw.getAttribute('role') : null, rel: a ? a.getAttribute('rel') : null };
        })(),
        logos: [...document.querySelectorAll('img[src*="/brand/logo"]')].filter((i) => vis(i) && !i.closest('footer')).map((i) => i.closest('header') ? 'header' : 'other'),
        dropHubs: document.querySelectorAll('.hd__drop a').length,
        // ---- ROUND 4 (operator review 4, 19 Nov 2026), measured on the rendered page ----
        // Card and teaser body text: never the 12px he rejected, on either width.
        r4Cards: [...document.querySelectorAll('.sv__body, .rl__body, .ap__body, .ht__p')].filter(vis)
          .map((e) => ({ cls: (e.className || '').toString().split(' ')[0], px: parseFloat(getComputedStyle(e).fontSize) })),
        // Home carousel: more than one photo, nothing for a visitor to operate.
        r4Slides: document.querySelectorAll('[data-section="hero"] .hero__bg').length,
        r4Controls: document.querySelectorAll('[data-section="hero"] [data-slide-next], [data-section="hero"] [data-slide-prev], [data-section="hero"] [data-slide-to]').length,
        // One services-links section on the home page.
        r4Services: document.querySelectorAll('[data-section="services"], [data-section="craft"]').length,
        // The reviews section's button through to /reviews/.
        r4RvBtn: (() => { const a = document.querySelector('[data-section="reviews"] a[data-cta="reviews-page"]'); return a ? { href: a.getAttribute('href'), btn: a.classList.contains('btn'), vis: vis(a) } : null; })(),
        // The service-page "Ready to talk it through?" call to action is a button.
        r4StepsCta: (() => { const a = document.querySelector('a[data-cta="steps-quote"]'); return a ? { btn: a.classList.contains('btn'), vis: vis(a), h: Math.round(a.getBoundingClientRect().height) } : null; })(),
        // No Further Reading teaser anywhere.
        r4Further: document.querySelectorAll('[data-section="further-reading"]').length,
        // Gap between the last photo block and the quote-form section (the gallery page's bug).
        r4QuoteGap: (() => {
          const q = document.querySelector('[data-section="quote-form"]'); if (!q) return null;
          const prev = q.previousElementSibling; if (!prev) return null;
          return Math.round(q.getBoundingClientRect().top - prev.getBoundingClientRect().bottom + parseFloat(getComputedStyle(prev).paddingBottom));
        })(),
        // Home gallery tiles: square, with space between them.
        r4HomeTiles: (() => {
          const g = document.querySelector('.wg__grid--full'); if (!g) return null;
          const li = g.querySelector('.wg__shot'); const b = li?.getBoundingClientRect();
          return { n: g.querySelectorAll('.wg__shot').length, gap: Math.round(parseFloat(getComputedStyle(g).columnGap || 0)), sq: b ? Math.abs(b.width - b.height) < 2 : false };
        })(),
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
        steps: (() => { const s = document.querySelector('[data-section="process"]'); if (!s) return null; const h2 = s.querySelector('h2'); const more = s.querySelector('.hw__cta'); const p = s.querySelector('.hw__panel').getBoundingClientRect(); const ph = s.querySelector('.hw__photo'); const pb = ph && vis(ph) ? ph.getBoundingClientRect() : null; // ROUND 4: the closing line is now a heading + the Quick Quote Online BUTTON, left-aligned with the rest.
          return { h2: getComputedStyle(h2).textAlign, more: more ? getComputedStyle(more).textAlign : null, moreBtn: !!more?.querySelector('a.btn'), gap: pb ? Math.round(pb.left - p.right) : null, step: getComputedStyle(s.querySelector('.hw__step')).textAlign }; })(),
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
    // HOME 3 design gates (every page): Lexend Deca headings + Kumbh Sans body, loaded; no capitals transform on
    // h1/h2; navy header and footer, the deeper-navy legal bar; pill buttons; the hero headline centred.
    const d = m.design;
    if (d.h1Font !== 'Lexend Deca' || !d.headLoaded || d.bodyFont !== 'Kumbh Sans' || !d.bodyLoaded) fails.push(`${tag}: Home 3 fonts not in use/loaded ${JSON.stringify(d)}`);
    if (d.upper) fails.push(`${tag}: headings still in capitals (text-transform)`);
    if (d.header !== 'rgb(14, 27, 42)' || d.footer !== 'rgb(14, 27, 42)' || d.bar !== 'rgb(16, 35, 58)') fails.push(`${tag}: header/footer/legal bar not the Home 3 navy ${JSON.stringify([d.header, d.footer, d.bar])}`);
    if (!d.pill) fails.push(`${tag}: buttons are not pills`);
    if (d.heroCentred == null || d.heroCentred > 2) fails.push(`${tag}: hero headline not centred (${d.heroCentred}px off)`);
    // VIDEOS (operator, 19 Nov 2026): Brandon's two, home page only; desktop side by side at the same height in
    // 16:9 and 9:16; mobile stacked inside the viewport. Each player must actually load (checked inside the frame below).
    if (r === '/') {
      const v = m.videos; const wide = v.find((x) => /mNwdUtQedkc/.test(x.src)); const short = v.find((x) => /v3g1Kdja0gk/.test(x.src));
      if (v.length !== 2 || !wide || !short) fails.push(`${tag}: videos ${JSON.stringify(v)}`);
      else {
        if (Math.abs(wide.w / wide.h - 16 / 9) > 0.03 || Math.abs(short.w / short.h - 9 / 16) > 0.03) fails.push(`${tag}: video aspect ratios ${JSON.stringify(v)}`);
        if (vp.name === 'desktop' && (Math.abs(wide.h - short.h) > 2 || Math.abs(wide.top - short.top) > 2 || short.left <= wide.left)) fails.push(`${tag}: videos not side by side at one height ${JSON.stringify(v)}`);
        if (vp.name === 'mobile' && (short.top <= wide.top || v.some((x) => x.left < 0 || x.left + x.w > vp.width))) fails.push(`${tag}: videos not stacked inside the viewport ${JSON.stringify(v)}`);
      }
      const frames = page.frames().filter((f) => /youtube-nocookie\.com\/embed\//.test(f.url()));
      for (const id of ['mNwdUtQedkc', 'v3g1Kdja0gk']) {
        const fr = frames.find((f) => f.url().includes(id));
        const st = fr ? await fr.waitForSelector('.html5-video-player, .ytp-error, .ytp-cued-thumbnail-overlay', { timeout: 15000 }).then(() => fr.evaluate(() => ({ player: !!document.querySelector('.html5-video-player'), error: document.querySelector('.ytp-error')?.innerText?.trim().slice(0, 80) || '' })), () => null) : null;
        if (!st || !st.player || st.error) fails.push(`${tag}: video ${id} did not load a playable player ${JSON.stringify(st)}`);
        else videoLog.push(`${tag} ${id}: player ready, no error`);
      }
    } else if (m.videos.length) fails.push(`${tag}: ${m.videos.length} video(s) off the home page`);
    if (m.underlined.length) fails.push(`${tag}: underlined links ${JSON.stringify(m.underlined.slice(0, 5))}`);
    if (m.heroBad.length) fails.push(`${tag}: hero carries ${m.heroBad.join(', ')}`);
    if (m.formInHero) fails.push(`${tag}: quote form inside the hero`);
    if (!m.utility && !m.formSection) fails.push(`${tag}: quote form not in its own section`);
    if (m.slider) fails.push(`${tag}: before-and-after slider present`);
    if (!m.charity) fails.push(`${tag}: footer charity line missing`);
    const cr = m.credit;
    if (!cr || cr.kw !== 'Painting and decorating websites' || !/by Local Map Booster$/.test(cr.text)) fails.push(`${tag}: footer LMB credit missing or reworded ${JSON.stringify(cr)}`);
    else if (r === '/') { if (!cr.linked || cr.rel !== 'nofollow noopener') fails.push(`${tag}: the home page LMB credit keyword is not the one nofollow link ${JSON.stringify(cr)}`); }
    else if (cr.linked || cr.tab || cr.role) fails.push(`${tag}: LMB credit is a link/control off the home page (round 4: home page only) ${JSON.stringify(cr)}`);
    if (m.logos.some((l) => l !== 'header') || m.logos.length !== 1) fails.push(`${tag}: logo outside the header bar ${JSON.stringify(m.logos)}`);
    if (m.dropHubs < 5) fails.push(`${tag}: services dropdown lists ${m.dropHubs} links`);
    // ---- ROUND 4 gates ----
    const small = m.r4Cards.filter((c) => c.px < 16);
    if (small.length) fails.push(`${tag}: card body text under 16px ${JSON.stringify(small.slice(0, 4))}`);
    if (m.r4Further) fails.push(`${tag}: a "Further Reading" teaser is on this page (round 4: resources only)`);
    if (m.r4RvBtn) { if (m.r4RvBtn.href !== '/reviews/' || !m.r4RvBtn.btn || !m.r4RvBtn.vis) fails.push(`${tag}: reviews button wrong ${JSON.stringify(m.r4RvBtn)}`); }
    else if (r !== '/reviews/' && !/404/.test(r)) fails.push(`${tag}: the reviews section has no button through to /reviews/`);
    if (r === '/reviews/' && m.r4RvBtn) fails.push(`${tag}: the reviews page links to itself from its own reviews section`);
    if (m.r4StepsCta && (!m.r4StepsCta.btn || !m.r4StepsCta.vis)) fails.push(`${tag}: the "Ready to talk it through?" CTA is not a visible button ${JSON.stringify(m.r4StepsCta)}`);
    if (r === '/') {
      if (m.r4Slides < 2) fails.push(`${tag}: home hero is not the photo carousel (${m.r4Slides} photos)`);
      if (m.r4Controls) fails.push(`${tag}: home hero has ${m.r4Controls} manual slide control(s) (round 4: it runs on its own)`);
      if (m.r4Services !== 1) fails.push(`${tag}: ${m.r4Services} services-links sections on the home page (round 4: one)`);
      const t = m.r4HomeTiles;
      if (!t || !t.sq || t.gap < 8 || t.n < 60) fails.push(`${tag}: home gallery is not half the collection in spaced square tiles ${JSON.stringify(t)}`);
    }
    if (r === '/gallery/' && (m.r4QuoteGap == null || m.r4QuoteGap < 40)) fails.push(`${tag}: no space between the gallery and the quote section (${m.r4QuoteGap}px)`);
    // HERO HEIGHTS (round 4): one height for every inner page on a desktop; the home hero shorter than
    // the window so the reviews section below it shows.
    if (vp.name === 'desktop' && m.heroPattern.kind === 'page' && Math.abs(m.heroPattern.height - 720) > 2) fails.push(`${tag}: inner hero is ${m.heroPattern.height}px, not the 720px every page shares`);
    if (vp.name === 'desktop' && r === '/' && m.heroPattern.height >= vp.height - 40) fails.push(`${tag}: home hero fills the window (${m.heroPattern.height}px), so the reviews section does not come up`);
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
    if (r !== '/' && m.youtube) fails.push(`${tag}: ${m.youtube} YouTube iframe(s) off the home page`);
    if (!m.utility) {
      if (!m.heroPattern.ok || m.heroPattern.side) fails.push(`${tag}: hero not the home pattern ${JSON.stringify(m.heroPattern)}`);
      heroLog.push(`${tag} ${m.heroPattern.kind} h=${m.heroPattern.height} centre-offset=${m.design.heroCentred}`);
    }
    if (m.topBorders.length) fails.push(`${tag}: lone top borders ${JSON.stringify(m.topBorders)}`);
    if (r === '/' && m.homeMap !== 'https://www.google.com/maps?cid=8023434379390696838&output=embed') fails.push(`${tag}: home map ${m.homeMap}`);
    if (m.areasBoxed) fails.push(`${tag}: areas section still boxed (${m.areasBoxed})`);
    if (m.steps && (m.steps.h2 !== 'left' && m.steps.h2 !== 'start' || !['left', 'start'].includes(m.steps.more) || !m.steps.moreBtn || !['left', 'start'].includes(m.steps.step) || (m.steps.gap !== null && m.steps.gap !== 0))) fails.push(`${tag}: how a job runs ${JSON.stringify(m.steps)}`);
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
  // Retired URLs answer 301 to their replacement (worker/redirects.js). Live only: the local server has no Worker.
  if (live) for (const [from, to] of REDIRECTS) {
    const res = await ctx.request.get(base + from, { maxRedirects: 0 });
    const loc = res.headers()['location'] || '';
    if (res.status() !== 301 || new URL(loc, base).pathname !== to) fails.push(`redirect ${from} -> ${res.status()} ${loc} (want 301 ${to})`);
    else console.log(`  redirect ${from} -> 301 ${new URL(loc, base).pathname}`);
  }
  await ctx.close();
}
await browser.close();
server?.close();
tiLog.forEach((l) => console.log('  ti', l));
videoLog.forEach((l) => console.log('  video', l));
if (args.includes('--log')) { heroLog.forEach((l) => console.log('  hero', l)); const seen = new Set(); btnLog.forEach((l) => { const k = l.replace(/^\S+ \S+ /, (x) => x.split(' ')[0] + ' '); if (!seen.has(k)) { seen.add(k); console.log('  btn', l); } }); }
const worst = btnLog.map((l) => Math.abs(+l.split('delta ')[1])).reduce((a, b) => Math.max(a, b), 0);
console.log(`buttons measured: ${btnLog.length}, worst |delta| ${worst}px`);
console.log(`check: ${routes.length} routes x ${sizes.length} widths against ${base}, ${fails.length} fails`);
fails.forEach((f) => console.log('  FAIL', f));
process.exit(fails.length ? 1 : 0);
