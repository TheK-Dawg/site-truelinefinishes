// REV3 VERIFY — one PASS/FAIL check per numbered item of REV3-BRIEF.md, measured
// against the BUILT output in dist/ (copy greps for 4/5/6, a real 360x780 and
// 1440x900 Chromium probe for 1/2/3/8/9, and a field/name diff against the live
// oly_form_fields config for 7).
//
//   node scripts/verify-rev3.mjs            all items
//   node scripts/verify-rev3.mjs 1 2 8      only those items
//
// Exit 1 if any selected item FAILs.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { createHash } from 'node:crypto';

const require = createRequire('/root/projects/lead-gen-websites/visionplumbing/package.json');
const { chromium } = require('playwright');
const EXE = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell';
const dist = new URL('../dist/', import.meta.url).pathname;
const PORT = 4418;
const want = new Set(process.argv.slice(2));
const on = (n) => want.size === 0 || want.has(String(n));

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.md': 'text/markdown' };
const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(dist, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404, { 'content-type': 'text/html' }); res.end(readFileSync(join(dist, '404.html'))); return; }
  res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(PORT, r));

const routes = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f === 'index.html') routes.push('/' + relative(dist, d).replace(/\\/g, '/') + (relative(dist, d) ? '/' : '')); } };
walk(dist);
const html = (route) => readFileSync(join(dist, route.replace(/^\//, ''), 'index.html'), 'utf8');
const SERVICES = ['builders', 'house-extensions', 'brickwork', 'loft-conversions', 'structural-and-groundworks', 'renovation-and-refurbishment', 'patios-and-garden-walls', 'landscaping', 'carpentry', 'basement-conversions'];
const SERVICE_ROUTES = SERVICES.map((s) => `/${s}/`);
const ARTICLE_ROUTES = routes.filter((r) => /-hedge-end\/$/.test(r));
const PAGE_TYPES = ['/', '/services/', '/areas/', '/about/', '/contact/', '/resources/', '/builders/', ARTICLE_ROUTES[0]].filter(Boolean);

const results = [];
const item = (n, name) => { const checks = []; results.push({ n, name, checks }); return (ok, msg) => checks.push({ ok, msg }); };

const browser = await chromium.launch({ executablePath: EXE });
const ctx360 = await browser.newContext({ viewport: { width: 360, height: 780 } });
const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
for (const c of [ctx360, ctx1440]) await c.route(/maps\.google|cdn\.trustindex\.io/, (r) => r.abort());
const open = async (c, route) => { const p = await c.newPage(); await p.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'load' }); return p; };
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

// ─────────────────────────────────────────────────────────────── 1. No text walls
if (on(1)) {
  const log = item(1, 'Service-page bands: short intro + scannable points, an image in every band');
  for (const route of SERVICE_ROUTES) {
    const p = await open(ctx360, route);
    const r = await p.evaluate(() => {
      const bands = [...document.querySelectorAll('[data-section="service-section"]')];
      return {
        intro: document.querySelectorAll('.sb3__copy p').length,
        bands: bands.map((b) => ({
          imgs: b.querySelectorAll('img').length,
          paras: b.querySelectorAll('.sb3__text p').length,
          lead: b.querySelector('.sb3__lead')?.textContent ?? '',
          points: [...b.querySelectorAll('.sb3__points li')].map((li) => li.textContent.trim()),
          imgTop: b.querySelector('img')?.getBoundingClientRect().top ?? 0,
          textTop: b.querySelector('.sb3__text')?.getBoundingClientRect().top ?? 0,
        })),
        // longest vertical stretch of the service-body region with no photograph in it
        gap: (() => {
          if (!bands.length) return 0;
          const first = bands[0].getBoundingClientRect().top + window.scrollY;
          const last = bands[bands.length - 1].getBoundingClientRect().bottom + window.scrollY;
          const ys = [first, ...bands.map((b) => b.querySelector('img').getBoundingClientRect().bottom + window.scrollY), last].sort((a, b) => a - b);
          let max = 0;
          for (let i = 1; i < ys.length; i++) max = Math.max(max, ys[i] - ys[i - 1]);
          return Math.round(max);
        })(),
      };
    });
    await p.close();
    const bad = [];
    if (r.intro > 2) bad.push(`intro ${r.intro} paragraphs`);
    if (!r.bands.length) bad.push('no bands');
    r.bands.forEach((b, i) => {
      if (b.imgs !== 1) bad.push(`band ${i + 1}: ${b.imgs} images`);
      if (b.paras > 1) bad.push(`band ${i + 1}: ${b.paras} paragraphs`);
      if (words(b.lead) > 50) bad.push(`band ${i + 1}: lead ${words(b.lead)} words`);
      if (!b.points.length) bad.push(`band ${i + 1}: no points`);
      const long = b.points.filter((t) => words(t) > 16).length;
      if (long) bad.push(`band ${i + 1}: ${long} points over 16 words`);
      if (b.imgTop > b.textTop) bad.push(`band ${i + 1}: text before image at 360px`);
    });
    if (r.gap > 1560) bad.push(`${r.gap}px of the service body with no photograph (limit 1560 = 2 screens)`);
    const leads = r.bands.map((b) => words(b.lead));
    log(!bad.length, `${route} ${r.bands.length} bands, leads ${Math.min(...leads)}-${Math.max(...leads)} words, max imageless run in the bands ${r.gap}px${bad.length ? ' :: ' + bad.join('; ') : ''}`);
  }
}

// ─────────────────────────────────────────────── 2. Areas: wide map, list under it
if (on(2)) {
  const log = item(2, 'Areas: full-width heading, WIDE map, town list UNDER the map, link to the areas page');
  for (const route of ['/builders/', '/', '/areas/']) {
    for (const [ctx, w] of [[ctx360, 360], [ctx1440, 1440]]) {
      const p = await open(ctx, route);
      const r = await p.evaluate(() => {
        const sec = document.querySelector('[data-section="areas"]');
        if (!sec) return null;
        const box = (el) => { const b = el?.getBoundingClientRect(); return b ? { top: Math.round(b.top), bottom: Math.round(b.bottom), w: Math.round(b.width), h: Math.round(b.height) } : null; };
        const inner = sec.querySelector('.ar__inner');
        const ics = getComputedStyle(inner);
        const innerContent = Math.round(inner.getBoundingClientRect().width - parseFloat(ics.paddingLeft) - parseFloat(ics.paddingRight));
        return {
          innerContent,
          head: box(sec.querySelector('.ar__h2')),
          body: box(sec.querySelector('.ar__body')),
          map: box(sec.querySelector('.ar__map')),
          list: box(sec.querySelector('.ar__list')),
          inner: box(inner),
          link: sec.querySelector('a[href="/areas/"]')?.textContent.trim() ?? null,
        };
      });
      await p.close();
      if (!r) { log(false, `${route} @${w}: no areas section`); continue; }
      const bad = [];
      if (r.map.w < r.innerContent - 2) bad.push(`map ${r.map.w}px of ${r.innerContent}px, not full width`);
      if (r.head.w < r.innerContent - 2) bad.push(`heading ${r.head.w}px of ${r.innerContent}px, not full width`);
      if (r.body.w < r.innerContent - 2) bad.push(`body ${r.body.w}px of ${r.innerContent}px, not full width`);
      if (r.map.bottom > r.list.top) bad.push(`list top ${r.list.top} is not below map bottom ${r.map.bottom}`);
      if (r.map.w <= r.map.h) bad.push(`map ${r.map.w}x${r.map.h} is not wide`);
      if (route !== '/areas/' && !r.link) bad.push('no link to /areas/');
      if (route === '/areas/' && r.link) bad.push('self-link to /areas/ on the areas page');
      log(!bad.length, `${route} @${w} map ${r.map.w}x${r.map.h} full-width, list under map, link ${r.link ?? '(none, areas page)'}${bad.length ? ' :: ' + bad.join('; ') : ''}`);
    }
  }
}

// ──────────────────────────────────────────────── 3. Our Work above the map/areas
if (on(3)) {
  const log = item(3, 'Our Work sits ABOVE the map/areas section on every page that has both');
  for (const route of [...SERVICE_ROUTES, '/']) {
    const h = html(route);
    const g = h.indexOf('data-section="gallery"');
    const a = h.indexOf('data-section="areas"');
    const both = g >= 0 && a >= 0;
    log(!both || g < a, `${route} gallery@${g} areas@${a}${both ? (g < a ? ' (gallery first)' : ' (AREAS FIRST)') : ' (not both)'}`);
  }
}

// ───────────────────────────────────── 4. Related-services cards: button = name
if (on(4)) {
  const log = item(4, 'Related-services cards: plain title, link on the BUTTON, anchor = exact service name');
  const names = Object.fromEntries(SERVICES.map((s) => [s, null]));
  const nameOf = JSON.parse(readFileSync(new URL('./rev3-service-names.json', import.meta.url), 'utf8'));
  for (const route of SERVICE_ROUTES) {
    const p = await open(ctx1440, route);
    const r = await p.evaluate(() => [...document.querySelectorAll('[data-section="related"] .rl__card')].map((c) => ({
      title: c.querySelector('.rl__title')?.textContent.trim() ?? '',
      titleIsLink: !!c.querySelector('.rl__title a'),
      btn: c.querySelector('.rl__btn')?.textContent.trim() ?? null,
      btnHref: c.querySelector('a.rl__btn')?.getAttribute('href') ?? null,
      plain: !!c.querySelector('span.rl__btn'),
    })));
    await p.close();
    const bad = [];
    if (r.length !== 3) bad.push(`${r.length} cards`);
    for (const c of r) {
      if (c.titleIsLink) bad.push(`"${c.title}" title is a link`);
      if (c.btn === null) bad.push(`"${c.title}" has no button`);
      else if (c.btn !== c.title) bad.push(`button text "${c.btn}" != title "${c.title}"`);
      if (!c.plain) {
        const slug = Object.keys(nameOf).find((k) => nameOf[k] === c.title);
        if (!c.btnHref) bad.push(`"${c.title}" button is not a link`);
        else if (c.btnHref !== `/${slug}/`) bad.push(`"${c.title}" button href ${c.btnHref} != /${slug}/`);
      }
    }
    log(!bad.length, `${route} ${r.length} cards, buttons [${r.map((c) => `${c.btn}${c.plain ? ' (plain: linked in body)' : ' -> ' + c.btnHref}`).join(' | ')}]${bad.length ? ' :: ' + bad.join('; ') : ''}`);
    void names;
  }
}

// ──────────────────────────────────────────────────────────── 5. "guides" banned
if (on(5)) {
  const log = item(5, 'The word "guides" appears nowhere in the built output');
  const files = [];
  const walkAll = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walkAll(p) : /\.(html|txt|md|xml|js|css)$/.test(f) && files.push(p); } };
  walkAll(dist);
  let total = 0;
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    const hits = [...src.matchAll(/guide/gi)];
    if (hits.length) { total += hits.length; log(false, `${relative(dist, f)}: ${hits.length} x "guide" -> ${src.slice(Math.max(0, hits[0].index - 40), hits[0].index + 30).replace(/\s+/g, ' ')}`); }
  }
  log(total === 0, `${files.length} built files scanned, ${total} occurrences of "guide"`);
}

// ────────────────────────────────────────────────────── 6. One review component
if (on(6)) {
  const log = item(6, 'Reviews: one component site-wide, one slimline strip, no duplicate rating/count lines');
  // 6b: no "average rating" line anywhere
  let avg = 0, counts = new Set();
  for (const route of routes) {
    const h = html(route);
    const a = h.match(/average rating/gi);
    if (a) { avg += a.length; log(false, `${route}: ${a.length} x "average rating"`); }
    for (const m of h.matchAll(/([\d.]+)\s+from\s+(\d+)\s+Google reviews/gi)) counts.add(m[0]);
  }
  log(avg === 0, `"average rating" lines in built output: ${avg}`);
  log(counts.size === 0, `hard-coded "<n> from <n> Google reviews" count lines: ${counts.size}${counts.size ? ' -> ' + [...counts].join(', ') : ''}`);
  // 6a: the slimline strip is the TrustIndex slim widget, and it is the one in the footer
  const slimSrc = new Set(), footerSlim = [];
  for (const route of PAGE_TYPES) {
    const h = html(route);
    for (const m of h.matchAll(/data-trustindex-slot="slim-([a-z]+)" data-trustindex-src="([^"]*)"/g)) slimSrc.add(`${m[1]}:${m[2]}`);
    footerSlim.push(/<footer[\s\S]*data-trustindex-slot="slim-footer"/.test(h));
  }
  log(footerSlim.every(Boolean), `footer slimline strip present on all ${PAGE_TYPES.length} page types`);
  const srcs = new Set([...slimSrc].map((s) => s.split(':').slice(1).join(':')));
  log(srcs.size === 1, `slimline widget srcs in use: ${srcs.size} (${[...srcs].join(' | ')})`);
  // 6c: the rendered reviews section is byte-identical across page types
  const hashes = new Map();
  for (const route of PAGE_TYPES) {
    const h = html(route);
    const m = h.match(/<section class="rv[\s\S]*?<\/section>/);
    if (!m) { log(false, `${route}: no reviews section`); continue; }
    hashes.set(route, createHash('sha256').update(m[0]).digest('hex').slice(0, 12));
  }
  const uniq = new Set(hashes.values());
  log(uniq.size === 1, `reviews-section HTML across ${hashes.size} page types: ${uniq.size} distinct (${[...hashes].map(([r, h]) => `${r}=${h}`).join(' ')})`);
  // 6a live: every slim slot must actually RENDER the one widget (the footer strip
  // used to render empty, because a second copy of the loader hides what it finds).
  for (const [vw, vh] of [[1440, 900], [360, 780]]) {
  const live = await browser.newContext({ viewport: { width: vw, height: vh } });
  await live.route(/maps\.google/, (r) => r.abort());
  for (const route of ['/builders/', '/']) {
    const p = await open(live, route);
    await p.mouse.move(100, 100); await p.mouse.wheel(0, 80);
    await p.waitForFunction(
      () => [...document.querySelectorAll('[data-trustindex-slot]')].every((s) => s.querySelector('.ti-widget')),
      null, { timeout: 20000 },
    ).catch(() => {});
    await p.waitForTimeout(1000);
    const w = await p.evaluate(() => [...document.querySelectorAll('[data-trustindex-slot]')].map((s) => ({
      slot: s.getAttribute('data-trustindex-slot'),
      text: (s.innerText || '').replace(/\s+/g, ' ').trim(),
      shown: (s.querySelector('.ti-widget')?.getBoundingClientRect().height ?? 0) > 0,
      items: s.querySelectorAll('.ti-review-item').length,
      hostLeftover: s.querySelectorAll('[data-reviews-host] .ti-widget').length,
    })));
    await p.close();
    const slim = w.filter((x) => x.slot.startsWith('slim-'));
    const big = w.find((x) => x.slot === 'reviews');
    const texts = new Set(slim.map((x) => x.text));
    const bad = [];
    if (slim.length < 3) bad.push(`${slim.length} slim slots`);
    if (!slim.every((x) => x.shown && x.text)) bad.push(`empty strips: ${slim.filter((x) => !x.shown || !x.text).map((x) => x.slot).join(',')}`);
    if (texts.size !== 1) bad.push(`strips disagree: ${[...texts].join(' | ')}`);
    const n = (t) => Number((t.match(/(\d+)\s*reviews?/) || [])[1]);
    if (big && n(big.text) && n([...texts][0]) && n(big.text) !== n([...texts][0])) bad.push(`slim says ${n([...texts][0])} reviews, the large widget says ${n(big.text)}`);
    // The LARGE widget must render at BOTH viewports, home page included: TrustIndex
    // only renders what is laid out in the first screen, so it loads from a pinned host.
    if (!big?.shown || !big.items) bad.push(`the large reviews widget did not render (${big?.items ?? 0} review cards)`);
    if (big?.hostLeftover) bad.push(`the widget is still sitting in its loader host`);
    log(!bad.length, `${route} @${vw} live: ${slim.map((x) => `${x.slot}="${x.text}" (${n(x.text)} reviews)`).join(' ')} | large widget ${big?.shown ? 'rendered' : 'BLANK'}, ${big?.items ?? 0} review cards${bad.length ? ' :: ' + bad.join('; ') : ''}`);
  }
  await live.close();
  }
  // The large widget is MOVED out of its loader host, not copied, so it must still be
  // the working slider TrustIndex bound its handlers to.
  const slide = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await slide.route(/maps\.google/, (r) => r.abort());
  const sp = await open(slide, '/');
  await sp.mouse.move(100, 100); await sp.mouse.wheel(0, 60);
  await sp.waitForFunction(() => document.querySelector('[data-trustindex-slot="reviews"] .ti-review-item'), null, { timeout: 20000 }).catch(() => {});
  await sp.evaluate(() => document.querySelector('[data-trustindex-slot="reviews"]').scrollIntoView({ block: 'center' }));
  await sp.waitForTimeout(1200);
  const firstX = () => sp.evaluate(() => Math.round(document.querySelector('[data-trustindex-slot="reviews"] .ti-review-item').getBoundingClientRect().left));
  const before = await firstX();
  await sp.click('[data-trustindex-slot="reviews"] .ti-next', { force: true }).catch(() => {});
  await sp.waitForTimeout(1500);
  const after = await firstX();
  await sp.close(); await slide.close();
  log(after < before, `/ @1440 the moved slider still advances on its own next control (first card x ${before} -> ${after})`);
}

// ──────────────────────────────────────────────────────────── 7. The quote form
if (on(7)) {
  const log = item(7, 'Quote form: same-origin /api/lead, invisible Turnstile, fields matching oly_form_fields');
  let cfg = null;
  try {
    const res = await fetch('https://olympus.small-bird-3273.workers.dev/forms/site/buildingsforlifeltd.com', { signal: AbortSignal.timeout(20000) });
    const j = await res.json();
    cfg = {
      token: j.form.token,
      visible: [...j.html_embed.matchAll(/data-field="([^"]+)"/g)].map((m) => m[1]),
      hidden: [...j.html_embed.matchAll(/<input type="hidden" name="([^"]+)"/g)].map((m) => m[1]),
      honeypot: (j.html_embed.match(/<input name="(_company|company_website)"/) || [])[1],
    };
  } catch (e) { log(false, `could not read the live oly_form_fields config: ${e.message}`); }
  if (cfg) log(cfg.hidden.includes('service'), `the engine config for ${cfg.token} records a hidden service field (hidden keys: ${cfg.hidden.join(', ')})`);

  const p = await open(ctx360, '/builders/');
  const r = await p.evaluate(() => {
    const f = document.querySelector('form[data-quote-form]');
    if (!f) return null;
    // "Visible to a person": on screen, sized, not transparent. The honeypot is
    // parked off the left edge at 1x1 with opacity 0, so it must fail this.
    const vis = (el) => {
      const b = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return b.width > 2 && b.height > 2 && b.right > 0 && b.left < window.innerWidth && Number(cs.opacity) > 0 && cs.visibility !== 'hidden';
    };
    return {
      action: f.getAttribute('action'),
      endpoint: f.dataset.endpoint,
      fields: [...f.querySelectorAll('input:not([type=hidden]), textarea, select')].map((e) => ({ name: e.name, ph: e.getAttribute('placeholder'), req: e.required, label: !!document.querySelector(`label[for="${e.id}"]`), w: Math.round(e.getBoundingClientRect().width), vis: vis(e) })),
      hidden: [...f.querySelectorAll('input[type=hidden]')].map((e) => ({ name: e.name, value: e.value })),
      selects: f.querySelectorAll('select').length,
      honeypot: [...f.querySelectorAll('input')].filter((e) => !vis(e) && e.type !== 'hidden').map((e) => e.name),
      turnstileMount: f.querySelectorAll('[data-turnstile]').length,
      formW: Math.round(f.getBoundingClientRect().width),
      submit: f.querySelector('button[type=submit]')?.textContent.trim(),
    };
  });
  await p.close();
  if (!r) log(false, '/builders/: no quote form');
  else {
    const visible = r.fields.filter((f) => f.vis);
    const got = visible.map((f) => f.name);
    const bad = [];
    if (cfg && JSON.stringify(got) !== JSON.stringify(cfg.visible)) bad.push(`fields ${got.join(',')} != config ${cfg.visible.join(',')}`);
    if (cfg && !r.honeypot.includes(cfg.honeypot)) bad.push(`honeypot ${r.honeypot.join(',')} != engine honeypot ${cfg.honeypot}`);
    if (r.selects) bad.push(`${r.selects} visible select(s)`);
    if (visible.some((f) => !f.ph)) bad.push('a field without placeholder text');
    if (visible.some((f) => f.label)) bad.push('a field with an external label');
    if (!visible.every((f) => f.req)) bad.push('a field that is not required');
    if (!got.includes('postcode')) bad.push('no postcode field');
    const narrow = visible.filter((f) => f.w < r.formW * 0.8);
    if (narrow.length) bad.push(`${narrow.length} field(s) not full width`);
    const service = r.hidden.find((h) => h.name === 'service');
    if (!service?.value) bad.push('no hidden service value on the service page');
    if (r.endpoint !== '/api/lead' || r.action !== '/api/lead') bad.push(`posts to ${r.action} / ${r.endpoint}, not the site's own /api/lead`);
    if (r.turnstileMount !== 1) bad.push(`${r.turnstileMount} Turnstile mount points`);
    log(!bad.length, `fields [${got.join(', ')}] vs config [${cfg ? cfg.visible.join(', ') : '?'}], hidden service="${service?.value}", honeypot ${r.honeypot.join(',')}, posts to ${r.endpoint}, Turnstile mount ${r.turnstileMount}, selects ${r.selects}${bad.length ? ' :: ' + bad.join('; ') : ''}`);
  }

  // LEAD FORM LAW G2: no third-party form host, and no sitekey, in anything we ship.
  const shipped = [];
  const walkShipped = (d) => { for (const f of readdirSync(d)) { const p2 = join(d, f); statSync(p2).isDirectory() ? walkShipped(p2) : /\.(html|js)$/.test(f) && shipped.push(p2); } };
  walkShipped(dist);
  const leaked = [];
  for (const f of shipped) {
    const src = readFileSync(f, 'utf8');
    for (const needle of ['olympus.small-bird', 'workers.dev/forms', 'gbpmonster', 'myjobquote', 'bfl-cf-v1', '0x4AAAAAAF']) {
      if (src.includes(needle)) leaked.push(`${relative(dist, f)} contains "${needle}"`);
    }
  }
  log(!leaked.length, `${shipped.length} shipped .html/.js files carry no form host, token or sitekey${leaked.length ? ' :: ' + leaked.slice(0, 4).join('; ') : ''}`);
}

// ──────────────────────────────────────────────────────── 8. Mobile sticky bar
if (on(8)) {
  const log = item(8, 'Sticky bar: "Quick Quote" + a YELLOW number-only call button, gapped, mobile only');
  const p = await open(ctx360, '/builders/');
  await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.4));
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => {
    const bar = document.querySelector('[data-sticky-cta]');
    const q = bar.querySelector('[data-cta="sticky-quote"]');
    const c = bar.querySelector('[data-cta="sticky-call"]');
    const bq = q.getBoundingClientRect(), bc = c.getBoundingClientRect();
    return {
      hidden: bar.hidden,
      quote: q.textContent.trim(), call: c.textContent.trim(),
      callHref: c.getAttribute('href'),
      callName: c.getAttribute('aria-label') ?? c.textContent.trim(),
      qBg: getComputedStyle(q).backgroundColor, cBg: getComputedStyle(c).backgroundColor,
      gap: Math.round(bc.left - bq.right),
    };
  });
  await p.close();
  const p2 = await open(ctx1440, '/builders/');
  await p2.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.4));
  await p2.waitForTimeout(400);
  const desk = await p2.evaluate(() => {
    const bar = document.querySelector('[data-sticky-cta]');
    const b = bar.getBoundingClientRect();
    return { display: getComputedStyle(bar).display, w: Math.round(b.width), h: Math.round(b.height) };
  });
  await p2.close();
  // The yellow is --brand-primary (#F2C94C -> rgb(242, 201, 76)).
  const YELLOW = 'rgb(242, 201, 76)';
  const bad = [];
  if (r.hidden) bad.push('bar hidden mid-page at 360px');
  if (r.quote !== 'Quick Quote') bad.push(`quote button reads "${r.quote}"`);
  if (!/^0\d[\d ]+$/.test(r.call)) bad.push(`call button reads "${r.call}", not the phone number alone`);
  if (/call/i.test(r.call) || /call/i.test(r.callName)) bad.push(`the word "Call" is on the call button ("${r.callName}")`);
  if (r.cBg !== YELLOW) bad.push(`call button background ${r.cBg} is not the yellow ${YELLOW}`);
  if (r.qBg === r.cBg) bad.push('both buttons are the same colour');
  if (r.gap < 4) bad.push(`gap between buttons ${r.gap}px`);
  if (desk.display !== 'none' || desk.h !== 0) bad.push(`visible at 1440px (display ${desk.display}, ${desk.w}x${desk.h})`);
  log(!bad.length, `@360 "${r.quote}" | "${r.call}" ${r.callHref}, call bg ${r.cBg} vs quote bg ${r.qBg}, gap ${r.gap}px; @1440 display ${desk.display}${bad.length ? ' :: ' + bad.join('; ') : ''}`);
}

// ────────────────────────────────── 9. Mobile slimline reviews under the header
if (on(9)) {
  const log = item(9, 'Mobile: a white, centred slimline review strip directly under the header');
  for (const route of ['/', '/builders/', '/areas/']) {
    const p = await open(ctx360, route);
    const r = await p.evaluate(() => {
      const strip = document.querySelector('[data-section="header-reviews"]');
      if (!strip) return null;
      const row = document.querySelector('.hd__row');
      const b = strip.getBoundingClientRect(), rb = row.getBoundingClientRect();
      const cs = getComputedStyle(strip);
      const hero = document.querySelector('[data-section="hero"]');
      return {
        w: Math.round(b.width), h: Math.round(b.height), top: Math.round(b.top),
        rowBottom: Math.round(rb.bottom), bg: cs.backgroundColor, align: cs.textAlign,
        display: cs.display,
        slot: strip.getAttribute('data-trustindex-slot') ?? strip.querySelector('[data-trustindex-slot]')?.getAttribute('data-trustindex-slot') ?? null,
        src: strip.getAttribute('data-trustindex-src') ?? strip.querySelector('[data-trustindex-slot]')?.getAttribute('data-trustindex-src') ?? null,
        heroTop: hero ? Math.round(hero.getBoundingClientRect().top) : null,
      };
    });
    await p.close();
    if (!r) { log(false, `${route}: no header review strip`); continue; }
    const bad = [];
    if (r.display === 'none' || r.h === 0) bad.push('not visible at 360px');
    if (r.bg !== 'rgb(255, 255, 255)') bad.push(`background ${r.bg} is not white`);
    if (r.align !== 'center') bad.push(`text-align ${r.align}`);
    if (Math.abs(r.top - r.rowBottom) > 2) bad.push(`top ${r.top} is not the header row bottom ${r.rowBottom}`);
    if (r.w < 358) bad.push(`width ${r.w}px`);
    if (!r.slot) bad.push('no slimline widget slot inside');
    log(!bad.length, `${route} strip ${r.w}x${r.h} at y=${r.top} (header row ends ${r.rowBottom}), bg ${r.bg}, align ${r.align}, slot ${r.slot}${bad.length ? ' :: ' + bad.join('; ') : ''}`);
  }
  const p = await open(ctx1440, '/');
  const d = await p.evaluate(() => {
    const s = document.querySelector('[data-section="header-reviews"]');
    return s ? { display: getComputedStyle(s).display, h: Math.round(s.getBoundingClientRect().height) } : null;
  });
  await p.close();
  log(!!d && (d.display === 'none' || d.h === 0), `@1440 header review strip display ${d?.display} height ${d?.h} (must not render at desktop)`);
  // Live: the strip must carry its own rendered widget, and the same six reviews.
  const live9 = await browser.newContext({ viewport: { width: 360, height: 780 } });
  await live9.route(/maps\.google/, (r) => r.abort());
  const lp = await open(live9, '/builders/');
  await lp.mouse.move(100, 100); await lp.mouse.wheel(0, 80);
  await lp.waitForTimeout(7000);
  const lw = await lp.evaluate(() => {
    const s = document.querySelector('[data-section="header-reviews"]');
    const w = s?.querySelector('.ti-widget');
    const slim = document.querySelector('[data-trustindex-slot="slim-hero"]');
    return {
      text: (s?.innerText || '').replace(/\s+/g, ' ').trim(),
      h: Math.round(w?.getBoundingClientRect().height ?? 0),
      centred: (() => { const b = w?.getBoundingClientRect(); const sb = s?.getBoundingClientRect(); return b && sb ? Math.abs((b.left - sb.left) - (sb.right - b.right)) < 12 : false; })(),
      slimText: (slim?.innerText || '').replace(/\s+/g, ' ').trim(),
    };
  });
  await lp.close(); await live9.close();
  const n9 = (t) => Number((t.match(/(\d+)\s*reviews?/) || [])[1]);
  const bad9 = [];
  if (!lw.text || lw.h === 0) bad9.push('the widget did not render in the strip');
  if (!lw.centred) bad9.push('the widget is not centred in the strip');
  if (n9(lw.text) !== n9(lw.slimText)) bad9.push(`strip shows ${n9(lw.text)} reviews, the slimline shows ${n9(lw.slimText)}`);
  log(!bad9.length, `/builders/ @360 live header strip "${lw.text}" (${lw.h}px, centred ${lw.centred}) vs slimline "${lw.slimText}"${bad9.length ? ' :: ' + bad9.join('; ') : ''}`);

  // REV3 follow-up: ONE review line in the first screen on mobile. The hero slimline is
  // desktop only now, but the form and footer strips must still render on mobile.
  const once = await browser.newContext({ viewport: { width: 360, height: 780 } });
  await once.route(/maps\.google/, (r) => r.abort());
  for (const route of ['/', '/builders/', '/areas/']) {
    const op = await open(once, route);
    await op.mouse.move(100, 100); await op.mouse.wheel(0, 40);
    // TrustIndex renders on first input, each widget in its own time: wait for them all.
    await op.waitForFunction(
      () => [...document.querySelectorAll('[data-trustindex-slot]')].every((s) => s.querySelector('.ti-widget')),
      null, { timeout: 20000 },
    ).catch(() => {});
    await op.evaluate(() => window.scrollTo(0, 0));
    await op.waitForTimeout(500);
    const r = await op.evaluate(async () => {
      const strips = [...document.querySelectorAll('[data-trustindex-slot]')];
      const rendered = (s) => {
        const w = s.querySelector('.ti-widget');
        if (!w) return null;
        const b = w.getBoundingClientRect();
        return b.height > 0 && b.width > 0 ? b : null;
      };
      // What the visitor can actually SEE in the first screen. IntersectionObserver's
      // intersectionRect accounts for clipping by ancestors, so the hero strip's widget
      // (collapsed to 0px and clipped, because it is only the loader host) counts as 0.
      const visible = await new Promise((resolve) => {
        const widgets = strips.map((s) => [s, s.querySelector('.ti-widget')]).filter(([, w]) => w);
        if (!widgets.length) return resolve([]);
        const seen = new Map();
        const io = new IntersectionObserver((entries) => {
          for (const e of entries) seen.set(e.target, e.intersectionRect.height);
          if (seen.size === widgets.length) {
            io.disconnect();
            resolve(widgets.filter(([, w]) => (seen.get(w) ?? 0) > 1).map(([s]) => s.getAttribute('data-trustindex-slot')));
          }
        });
        widgets.forEach(([, w]) => io.observe(w));
        setTimeout(() => { io.disconnect(); resolve(widgets.filter(([, w]) => (seen.get(w) ?? 0) > 1).map(([s]) => s.getAttribute('data-trustindex-slot'))); }, 1500);
      });
      return {
        inFirstScreen: visible,
        heroStrip: (() => {
          const el = document.querySelector('.hero__strip, .ph__strip');
          return el ? { display: getComputedStyle(el).display, h: Math.round(el.getBoundingClientRect().height) } : null;
        })(),
        filled: strips.filter((s) => rendered(s)).map((s) => s.getAttribute('data-trustindex-slot')),
        blank: strips.filter((s) => !rendered(s)).map((s) => s.getAttribute('data-trustindex-slot')),
      };
    });
    await op.close();
    const bad = [];
    if (r.inFirstScreen.length !== 1) bad.push(`${r.inFirstScreen.length} review lines in the first screen: ${r.inFirstScreen.join(', ')}`);
    if (r.inFirstScreen[0] !== 'dark-slim-header') bad.push(`the one in view is ${r.inFirstScreen[0]}, not the header strip`);
    if (!r.heroStrip || r.heroStrip.h !== 0) bad.push(`hero slimline still takes space (${r.heroStrip?.h}px)`);
    for (const must of ['slim-form', 'slim-footer', 'reviews']) if (!r.filled.includes(must)) bad.push(`${must} did not render`);
    log(!bad.length, `${route} @360 first screen shows [${r.inFirstScreen.join(', ')}], hero slimline ${r.heroStrip?.h}px tall, rendered [${r.filled.join(', ')}]${r.blank.length ? `, blank [${r.blank.join(', ')}]` : ''}${bad.length ? ' :: ' + bad.join('; ') : ''}`);
  }
  await once.close();

  // Desktop keeps its hero slimline.
  const dp = await open(ctx1440, '/builders/');
  const ds = await dp.evaluate(() => {
    const el = document.querySelector('.hero__strip, .ph__strip');
    const cs = el ? getComputedStyle(el) : null;
    return { display: cs?.display, h: Math.round(el?.getBoundingClientRect().height ?? 0), slot: el?.querySelector('[data-trustindex-slot]')?.getAttribute('data-trustindex-slot') };
  });
  await dp.close();
  log(ds.h > 0 && ds.slot === 'slim-hero', `@1440 hero slimline still shown (${ds.h}px tall, display ${ds.display}, slot ${ds.slot})`);
}

await browser.close();
server.close();

let failed = 0;
for (const { n, name, checks } of results) {
  const bad = checks.filter((c) => !c.ok).length;
  if (bad) failed++;
  console.log(`\n── ITEM ${n}: ${bad ? 'FAIL' : 'PASS'} — ${name}`);
  for (const c of checks) console.log(`   ${c.ok ? 'PASS' : 'FAIL'}  ${c.msg}`);
}
console.log(`\nREV3 VERIFY: ${failed ? `FAIL (${failed} item(s))` : `PASS (${results.length} item(s))`}`);
process.exit(failed ? 1 : 0);
