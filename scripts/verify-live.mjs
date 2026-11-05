// LIVE VERIFY (services wall-of-text + header services dropdown), run against a deployed URL.
// Usage: node scripts/verify-live.mjs [baseUrl]
import { createRequire } from 'node:module';
const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const EXE = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';
const BASE = (process.argv[2] ?? 'https://site-buildingsforlifeltd-v3-test.small-bird-3273.workers.dev').replace(/\/$/, '');
const shots = new URL('../shots/', import.meta.url).pathname;

const fails = [];
const log = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); if (!ok) fails.push(msg); };
const b = await chromium.launch({ executablePath: EXE });

// 1. Service pages: status, intro <= 2 paragraphs before first H2, no run of 3+ paragraphs.
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`${BASE}/services/`);
const slugs = await p.evaluate(() => [...document.querySelectorAll('#hd-drop a')].map((a) => a.getAttribute('href')));
log(slugs.length === 11, `dropdown lists hub + 10 services (${slugs.length})`);
for (const href of slugs) {
  const res = await p.goto(`${BASE}${href}`);
  const status = res?.status();
  if (href === '/services/') { log(status === 200, `${href} ${status}`); continue; }
  // Pass 2 (conversion page): intro block of <=2 paragraphs, then one band per H2, no TOC.
  const r = await p.evaluate(() => {
    const intro = document.querySelectorAll('.sb3__copy p').length;
    const bands = [...document.querySelectorAll('.sb3__band')];
    if (!bands.length) return null;
    let max = 0;
    for (const band of bands) {
      let run = 0;
      for (const el of band.querySelectorAll('.sb3__body p, .sb3__body ul, .sb3__body ol, .sb3__body h3, .sb3__body table, .sb3__body blockquote')) {
        run = el.tagName === 'P' ? run + 1 : 0; max = Math.max(max, run);
      }
    }
    return { intro, max, h2: bands.filter((s) => s.querySelector('h2')).length, bands: bands.length, toc: document.querySelectorAll('.sb2__toc li, [class*="toc"] li').length };
  });
  log(status === 200 && r && r.intro <= 2 && r.max <= 2 && r.h2 === r.bands && r.toc === 0, `${href} ${status} intro=${r?.intro} maxParaRun=${r?.max} h2=${r?.h2}/${r?.bands} bands toc=${r?.toc}`);
}

// 2. Header dropdown: desktop hover + chevron (keyboard/touch), no overflow.
const overflow = (pg) => pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
const shown = (pg, sel) => pg.evaluate((s) => { const e = document.querySelector(s); const cs = e && getComputedStyle(e); const r = e?.getBoundingClientRect(); return !!e && cs.visibility === 'visible' && Number(cs.opacity) > 0.9 && r.width > 0 && r.right <= window.innerWidth && r.bottom <= window.innerHeight; }, sel);

for (const w of [1440, 1024]) {
  const d = await b.newPage({ viewport: { width: w, height: 900 } });
  await d.goto(`${BASE}/loft-conversions/`);
  await d.hover('[data-drop] .hd__link');
  await d.waitForTimeout(300);
  log(await shown(d, '#hd-drop'), `@${w} hover opens dropdown, inside viewport`);
  log((await overflow(d)) <= 0, `@${w} no horizontal overflow with dropdown open`);
  await d.screenshot({ path: `${shots}live-dropdown-${w}.png` });
  await d.mouse.move(w / 2, 700);
  await d.waitForTimeout(300);
  log(!(await shown(d, '#hd-drop')), `@${w} dropdown closes on mouse leave`);
  await d.focus('[data-drop-btn]');
  await d.keyboard.press('Enter');
  await d.waitForTimeout(300);
  log(await shown(d, '#hd-drop') && (await d.getAttribute('[data-drop-btn]', 'aria-expanded')) === 'true', `@${w} keyboard Enter on chevron opens`);
  await d.keyboard.press('Escape');
  await d.waitForTimeout(300);
  log(!(await shown(d, '#hd-drop')), `@${w} Escape closes`);
  await d.close();
}

// 3. Mobile/tablet: burger -> tap accordion -> service links visible, no overflow.
for (const w of [768, 390]) {
  const m = await b.newPage({ viewport: { width: w, height: 844 }, hasTouch: true, isMobile: w < 500 });
  await m.goto(`${BASE}/`);
  log((await overflow(m)) <= 0, `@${w} no horizontal overflow (closed)`);
  await m.tap('[data-burger]');
  await m.waitForTimeout(200);
  log((await m.isHidden('#hd-acc')), `@${w} accordion starts collapsed`);
  await m.tap('[data-acc-btn]');
  await m.waitForTimeout(200);
  const links = await m.evaluate(() => [...document.querySelectorAll('#hd-acc a')].map((a) => { const r = a.getBoundingClientRect(); return r.width > 0 && r.right <= window.innerWidth && r.height >= 40; }));
  log(links.length === 11 && links.every(Boolean), `@${w} tap opens accordion: ${links.filter(Boolean).length}/11 links visible, >=40px tall, inside width`);
  log((await overflow(m)) <= 0, `@${w} no horizontal overflow (accordion open)`);
  await m.screenshot({ path: `${shots}live-accordion-${w}.png` });
  await m.tap('[data-acc-btn]');
  log(await m.isHidden('#hd-acc'), `@${w} second tap collapses`);
  await m.close();
}
// Service page body at mobile, for the eye.
const sp = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
await sp.goto(`${BASE}/loft-conversions/`);
log((await overflow(sp)) <= 0, '@390 /loft-conversions/ no horizontal overflow');
// Every section body must still reveal on a phone (tall bodies are taller than the screen).
for (const el of await sp.$$('.sb3__body')) { await el.scrollIntoViewIfNeeded(); await sp.waitForTimeout(250); }
await sp.waitForTimeout(1000);
log(await sp.evaluate(() => [...document.querySelectorAll('.sb3__body')].every((e) => getComputedStyle(e).opacity === '1')), '@390 service section bodies reveal on scroll');
await sp.screenshot({ path: `${shots}live-body-390.png` });
await (await sp.$('#details')).screenshot({ path: `${shots}live-service-body-390.png` });
const dp = await b.newPage({ viewport: { width: 1440, height: 900 } });
await dp.goto(`${BASE}/loft-conversions/`);
await (await dp.$('#details')).screenshot({ path: `${shots}live-service-body-1440.png` });

await b.close();
console.log(fails.length ? `\nLIVE VERIFY: FAIL (${fails.length})` : '\nLIVE VERIFY: PASS');
process.exit(fails.length ? 1 : 0);
