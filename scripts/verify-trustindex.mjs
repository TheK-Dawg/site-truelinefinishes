// LIVE VERIFY (TrustIndex placement, revision pass 2, 28 Sep), run against a deployed URL.
// Every content page: slim white widget inside the hero (under the CTAs) and in the footer,
// the LARGE reviews section directly under the hero, the floating left-corner widget (shown
// at desktop, hidden on mobile), and the Quick Quote form last. Service pages: no "On this
// page" list, no article eyebrow, exactly 3 steps, no mid-page slim strip. Header: final nav,
// phone number, no Quick Quote button. No horizontal overflow at 1440/768/390.
// Usage: node scripts/verify-trustindex.mjs [baseUrl]
import { createRequire } from 'node:module';
const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const EXE = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';
const BASE = (process.argv[2] ?? 'https://site-buildingsforlifeltd-v3-test.small-bird-3273.workers.dev').replace(/\/$/, '');
const shots = new URL('../shots/', import.meta.url).pathname;

const LARGE = 'ebd6155824da39453e862aab14c', WHITE = '7c36aed8213c396b301612d316d', DARK = 'f76b912820b139618806e76e1f6', CORNER = '1ce57018217f3951c1461d6be75';
const fails = [];
const log = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); if (!ok) fails.push(msg); };
const hub = await (await fetch(`${BASE}/services/`)).text();
const drop = hub.slice(hub.indexOf('id="hd-drop"'), hub.indexOf('</ul>', hub.indexOf('id="hd-drop"')));
const services = [...drop.matchAll(/href="(\/[^"]+\/)"/g)].map((m) => m[1]).filter((h) => h !== '/services/');
log(services.length === 10, `dropdown lists 10 service pages (${services.length})`);
const article = [...(await (await fetch(`${BASE}/resources/`)).text()).matchAll(/href="(\/[a-z0-9-]+-hedge-end\/)"/g)].map((m) => m[1])[0];
const routes = ['/', '/services/', ...services, '/areas/', '/about/', '/contact/', '/resources/', '/faq/', '/terms/', '/privacy/', ...(article ? [article] : [])];
const b = await chromium.launch({ executablePath: EXE });

// Header (static HTML, same on every page).
const home = await (await fetch(`${BASE}/`)).text();
const mainNav = home.slice(home.indexOf('aria-label="Main"'), home.indexOf('</nav>', home.indexOf('aria-label="Main"')));
const labels = [...mainNav.matchAll(/class="hd__link"[^>]*>([^<]+)</g)].map((m) => m[1].trim());
log(labels.join(',') === 'Home,Services,Areas,About,Contact,Resources', `nav = ${labels.join(', ')}`);
const panel = home.slice(home.indexOf('class="hd__panel"'), home.indexOf('hd__burger'));
log(/hd__phone/.test(panel) && !/Quick Quote/.test(panel), 'header: phone number, no Quick Quote button');

for (const route of routes) {
  const html = await (await fetch(`${BASE}${route}`)).text();
  const srcs = [...html.matchAll(/<script[^>]+src="https:\/\/cdn\.trustindex\.io\/loader\.js\?([a-z0-9]+)"/g)].map((m) => m[1]);
  const n = (id) => srcs.filter((s) => s === id).length;
  log(n(WHITE) === 2 && n(LARGE) === 1 && n(CORNER) === 1 && n(DARK) === 0, `${route} loaders: white x${n(WHITE)}, large x${n(LARGE)}, corner x${n(CORNER)}, dark x${n(DARK)}`);
  log(!/People rated/i.test(html), `${route} no "People rated our work" heading`);
  if (services.includes(route)) {
    const steps = (html.match(/class="hw__step /g) || []).length;
    log(!/On this page|sb2__toc|What the work involves/.test(html), `${route} no TOC / article framing`);
    log(steps === 3, `${route} steps = ${steps}`);
    log(!/data-cta="body-close-quote"|data-section="cta"/.test(html), `${route} no duplicate closing Quick Quote buttons`);
  }

  for (const w of [1440, 768, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: w > 500 ? 900 : 844 }, isMobile: w < 500, hasTouch: w < 500 });
    await p.goto(`${BASE}${route}`, { waitUntil: 'load' });
    await p.mouse.move(w / 2, 300);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 700) { await p.mouse.wheel(0, 700); await p.waitForTimeout(100); }
    await p.waitForTimeout(2500);
    // The loader only arms its input listeners once its CDN fetch resolves; if that lands after
    // the wheel loop, no further input arrives and the slim widgets never mount (a flake, seen once
    // on / @768). Keep nudging like a real visitor until both slim widgets exist, up to ~10s.
    for (let i = 0; i < 10; i++) {
      const ready = await p.evaluate((WHITE) => document.querySelectorAll(`[data-trustindex-slot^="slim"] .ti-widget[data-pid="${WHITE}"]`).length === 2, WHITE);
      if (ready) break;
      await p.mouse.move(w / 2 + i, 320); await p.mouse.wheel(0, i % 2 ? 400 : -400); await p.waitForTimeout(1000);
    }
    const r = await p.evaluate(({ LARGE, WHITE, CORNER }) => {
      const main = document.querySelector('main');
      const secs = [...main.children].filter((e) => e.matches('section, div')).map((e) => e.dataset.section || e.className);
      const hero = document.querySelector('[data-section="hero"]');
      const heroWhite = hero?.querySelector(`[data-trustindex-slot="slim-hero"] .ti-widget[data-pid="${WHITE}"]`);
      const ftWhite = document.querySelector(`footer [data-trustindex-slot="slim-footer"] .ti-widget[data-pid="${WHITE}"]`);
      const large = document.querySelector(`[data-section="reviews"] .ti-widget[data-pid="${LARGE}"]`);
      const corner = document.querySelector(`.ti-widget[data-pid="${CORNER}"]`);
      const ctas = hero?.querySelector('[data-cta="hero-quote"]');
      const h = (e) => (e ? Math.round(e.getBoundingClientRect().height) : 0);
      return {
        heroWhite: h(heroWhite), below: heroWhite && ctas ? heroWhite.getBoundingClientRect().top >= ctas.getBoundingClientRect().bottom : false,
        ftWhite: h(ftWhite), large: h(large),
        corner: corner ? { display: getComputedStyle(corner).display, h: h(corner) } : null,
        order: secs, overflow: document.documentElement.scrollWidth - innerWidth,
      };
    }, { LARGE, WHITE, CORNER });
    const tag = `${route} @${w}`;
    log(r.heroWhite > 0 && r.below, `${tag} hero slim widget under the CTAs (h=${r.heroWhite})`);
    log(r.ftWhite > 0, `${tag} footer slim widget (h=${r.ftWhite})`);
    log(r.large > 0 && r.order[1] === 'reviews', `${tag} LARGE reviews directly under the hero (h=${r.large}, 2nd section: ${r.order[1]})`);
    log(r.order.at(-1) === 'quote-form' || (r.order.at(-1) || '').includes('art__contact'), `${tag} form last (${r.order.at(-1)})`);
    const cornerOk = w >= 1024 ? r.corner && r.corner.display !== 'none' && r.corner.h > 0 : !r.corner || r.corner.display === 'none';
    log(cornerOk, `${tag} left-corner ${r.corner ? `display=${r.corner.display} h=${r.corner.h}` : 'missing'} (want ${w >= 1024 ? 'shown' : 'hidden'})`);
    log(r.overflow <= 0, `${tag} no horizontal overflow (${r.overflow})`);
    if (['/', '/loft-conversions/', '/contact/', '/terms/'].includes(route) && w !== 768) {
      const name = route === '/' ? 'home' : route.replace(/\//g, '');
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
      await p.screenshot({ path: `${shots}p2live-${name}-top-${w}.png` });
    }
    await p.close();
  }
}
await b.close();
console.log(fails.length ? `\nPASS-2 VERIFY: FAIL (${fails.length})` : '\nPASS-2 VERIFY: PASS');
process.exit(fails.length ? 1 : 0);
