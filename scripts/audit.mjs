// STATIC AUDIT over dist/ (TrueLine Finishes). SEO plumbing, schema, the plan's prohibitions as
// code, link integrity and the mandatory furniture. Exit 1 on any FAIL.
// --selftest: proves the copy gate fires on known-bad strings before trusting a clean pass.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const BANNED = [
  [/[—–]/, 'em/en dash'], [/free quote\b/i, '"free quote" (the word is "free quotation")'], [/\bbespoke\b/i, 'bespoke'], [/\bcustom\b/i, 'custom'], [/\btailored\b/i, 'tailored'],
  [/£|\bprices? from\b|\bper (room|day)\b/i, 'price'], [/\d+\s?%/, 'percentage'], [/\bguarantee/i, 'guarantee'], [/\bwarrant(y|ies)\b/i, 'warranty'],
  [/accredit|certified|qualified|city ?& ?guilds|checkatrade|trustmark/i, 'credential'], [/24\/7|24 hours?|emergency|out[- ]of[- ]hours|overnight/i, 'availability'],
  [/many five[- ]star/i, '"many five-star reviews"'], [/rated ?people/i, 'Rated People'], [/07706|215917/, "Brandon's personal mobile"],
  [/briar rhydding|charlestown|BD17|7JW/i, 'address'], [/\bLtd\b|\blimited\b/i, '"Ltd"'], [/\bTrueline\b/, 'name spelt "Trueline"'], [/True Line/, 'name spelt "True Line"'],
  [/\bour team\b|\bthe team\b|\bcrew\b|\bstaff of\b|\bour staff\b/i, 'team claim'], [/\bguides?\b/i, '"guide(s)"'], [/\bblog\b/i, '"blog"'], [/\bcheap/i, 'cheap'],
  [/8 years(?! ?')|\beight years(?!')/i, 'years figure without "over"'], [/\b(?:[0-79]|1\d|[2-9]\d) years'? experience/i, 'wrong years figure'],
  [/kitchen (fitting|installation|fitter)|fit(ting)? kitchens?\b(?! or)/i, 'kitchen fitting as a service'], [/\bdecking\b|\bmurals?\b(?! (?:or|and|,))/i, 'not-offered service'],
  [/lorem|ipsum|TODO/i, 'placeholder text'], [/\bnestled\b|\bbustling\b|\bseamless/i, 'slop word'], [/across (west|north) yorkshire/i, 'whole-region coverage'],
  [/within (an|one|\d+) (hour|day|week)/i, 'response-time promise'], [/get a quote|read more/i, 'banned CTA wording'],
];
const ARTICLE_ONLY = [[/\b(best|leading|number one|no\.? ?1|top-rated|most trusted|finest)\b/i, 'superlative in an SEO article']];

const visibleText = (html) => html.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;|&#x27;/g, "'").replace(/\s+/g, ' ');
const copyFails = (text, article) => [...BANNED, ...(article ? ARTICLE_ONLY : [])].flatMap(([re, label]) => { const m = text.match(new RegExp(`.{0,50}${re.source}.{0,50}`, re.flags.replace('g', ''))); return m ? [`banned ${label}: "...${m[0].trim()}..."`] : []; });

// TRUSTINDEX (operator, 6 Nov 2026): the four TrueLine widgets, one role per id (src/data/site.ts
// `trustindex`). Every page: one CORNER; one MAIN in the reviews section, the first section after
// the hero (on /reviews/ the REVIEW PAGE grid instead, never both); a SLIMLINE in the hero and in
// the quote-form section. No other Trustindex id, no loader in the wrong role.
const TI = { corner: '750bdd38520519524a16f32074e', main: '980be2f8585419540236d6075d0', reviewPage: '77dcbf385600195a22468d47c59', slimline: 'c4b35ec858641953835667d83d1' };
const tiFails = (r, html) => {
  const f = [];
  const body = html.replace(/<!--[\s\S]*?-->/g, '');
  const slots = [...body.matchAll(/<div class="ti-slot[^"]*"[^>]*data-trustindex-slot="([^"]+)" data-trustindex-role="([^"]+)" data-trustindex-id="([^"]+)"[^>]*><script defer async src="https:\/\/cdn\.trustindex\.io\/loader\.js\?([0-9a-f]+)"><\/script><\/div>/g)].map((m) => ({ at: m.index, place: m[1], role: m[2], id: m[3], src: m[4] }));
  const loaders = [...body.matchAll(/cdn\.trustindex\.io\/loader\.js\?([0-9a-f]+)/g)].map((m) => m[1]);
  if (loaders.length !== slots.length) f.push(`${loaders.length} Trustindex loaders but ${slots.length} marked slots (a loader outside a slot)`);
  for (const x of slots) {
    if (TI[x.role] === undefined) f.push(`unknown Trustindex role "${x.role}"`);
    else if (x.id !== TI[x.role] || x.src !== TI[x.role]) f.push(`${x.role} slot loads ${x.src} (want ${TI[x.role]})`);
  }
  for (const id of loaders) if (!Object.values(TI).includes(id)) f.push(`foreign Trustindex id ${id}`);
  const n = (role, place) => slots.filter((x) => x.role === role && (!place || x.place === place)).length;
  const reviewsPage = r === '/reviews/';
  if (n('corner', 'corner') !== 1 || n('corner') !== 1) f.push(`${n('corner')} corner widgets (want 1)`);
  if (reviewsPage) { if (n('reviewPage', 'reviews') !== 1 || n('main')) f.push(`/reviews/ has ${n('reviewPage')} review-page and ${n('main')} main widgets (want 1 and 0)`); }
  else if (n('main', 'reviews') !== 1 || n('main') !== 1 || n('reviewPage')) f.push(`${n('main')} main and ${n('reviewPage')} review-page widgets (want 1 main, 0 review-page)`);
  const section = (name) => { const m = body.match(new RegExp(`<section[^>]*data-section="${name}"[\\s\\S]*?</section>`)); return m ? [m.index, m.index + m[0].length] : null; };
  const inside = (place, name) => { const s = section(name); return s && slots.some((x) => x.place === place && x.role === 'slimline' && x.at > s[0] && x.at < s[1]); };
  if (!inside('slim-hero', 'hero') || n('slimline', 'slim-hero') !== 1) f.push('slimline missing from the hero (or more than one)');
  const hasForm = /data-section="quote-form"/.test(body);
  if (hasForm && (!inside('slim-form', 'quote-form') || n('slimline', 'slim-form') !== 1)) f.push('slimline missing from the quote-form section (or more than one)');
  if (!hasForm && n('slimline', 'slim-form')) f.push('slim-form slot on a page without a form');
  const main = (body.match(/<main[^>]*>([\s\S]*)<\/main>/) || [, ''])[1];
  const order = [...main.matchAll(/<section\b[^>]*data-section="([^"]+)"/g)].map((m) => m[1]);
  if (order[0] !== 'hero' || order[1] !== 'reviews') f.push(`sections start ${order.slice(0, 3).join(' > ')} (want hero > reviews)`);
  const rv = section('reviews');
  if (!rv || !slots.some((x) => x.place === 'reviews' && x.at > rv[0] && x.at < rv[1])) f.push('review widget not inside the reviews section');
  return f;
};

// ROUND 3 (operator live review 3, 6 Nov 2026; DECISIONS R3-*): machine gates for this round's rulings.
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const NAP_HOURS = JSON.parse(readFileSync(new URL('../site-plan/nap.json', import.meta.url), 'utf8')).hours;
const sectionOf = (html, name) => (html.match(new RegExp(`<section[^>]*data-section="${name}"[\\s\\S]*?</section>`)) || [''])[0];
function r3Fails(r, html, text, isArticle) {
  const f = [];
  // Hours: day by day, as the Google listing shows them; never "Monday to Friday" / "Saturday and Sunday".
  const dls = [...html.matchAll(/<dl[^>]*data-hours[^>]*>([\s\S]*?)<\/dl>/g)];
  if (!dls.length) f.push('no day-by-day opening hours (footer)');
  for (const [, dl] of dls) {
    const rows = [...dl.matchAll(/<dt[^>]*>([^<]*)<\/dt><dd[^>]*>([^<]*)<\/dd>/g)].map((m) => [m[1], m[2]]);
    const want = DAYS.map((d) => [d, NAP_HOURS[d].replace(/^(\w+)-(\w+)$/, '$1 to $2')]);
    if (JSON.stringify(rows) !== JSON.stringify(want)) f.push(`opening hours not Monday to Sunday one per day as nap.json: ${JSON.stringify(rows)}`);
  }
  if (/Monday to Friday|Saturday and Sunday|Mon(day)?\s*[-–]\s*Fri/i.test(text)) f.push('compressed opening hours ("Monday to Friday") in the page');
  // Hero: the slimline directly under the paragraph and ABOVE the buttons.
  const hero = sectionOf(html, 'hero');
  const slim = hero.search(/data-trustindex-slot="slim-hero"/); const btn = hero.search(/<a[^>]*class="btn\b/);
  if (slim < 0) f.push('no hero slimline');
  else {
    if (btn >= 0 && slim > btn) f.push('hero slimline sits below the buttons (want under the paragraph, above the buttons)');
    const before = hero.slice(0, hero.lastIndexOf('<div', slim)).trimEnd();
    if (!before.endsWith('</p>')) f.push('hero slimline does not follow the hero paragraph directly');
  }
  // Quote section: the slimline in the LEFT intro column under the selling points, never in the form card.
  const qf = sectionOf(html, 'quote-form');
  if (qf && r !== '/home-2/') {
    const s2 = qf.search(/data-trustindex-slot="slim-form"/); const list = qf.search(/class="(qf__list|dm-qf__list)"/); const card = qf.search(/class="(qf__card|dm-qf__card)"/);
    if (s2 < 0 || list < 0 || card < 0 || !(s2 > list && s2 < card)) f.push(`quote-section slimline not in the left column under the selling points (slot ${s2}, list ${list}, card ${card})`);
  }
  // WhatsApp branding removed where the operator flagged it.
  if (isArticle && /article-aside-whatsapp|art__wa/.test(html)) f.push('WhatsApp in the article "Need a quote?" card');
  if (r === '/home-3/' && /data-cta="form-whatsapp"/.test(html)) f.push('WhatsApp button in the quote section');
  // Articles: Quick Rundown; internal links spread out (no paragraph with more than one); no link-dump line.
  if (isArticle) {
    const body = (html.match(/<article class="art__main[\s\S]*?<\/article>/) || [''])[0];
    if (!/data-rundown/.test(body)) f.push('no Quick Rundown box');
    for (const m of body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) if ((m[1].match(/<a\b[^>]*href="\//g) || []).length > 1) f.push(`a paragraph carries ${(m[1].match(/<a\b/g) || []).length} internal links: "${visibleText(m[1]).slice(0, 60)}..."`);
    if (/class="art__next"/.test(html)) f.push('the "More on..." link-dump line');
    const crumbs = html.search(/class="art__crumbs/); const rv = html.search(/data-section="reviews"/); const art = html.search(/data-section="article-body"/);
    if (!(rv < crumbs && crumbs < art)) f.push('breadcrumbs are not between the reviews section and the article');
  }
  // Service pages: the intro has its own H2 and photo; the cards have an H2 over them; no empty grid cell.
  if (/data-section="service-intro"/.test(html)) {
    const intro = sectionOf(html, 'service-intro'); const grid = sectionOf(html, 'service-sections');
    if (!/<h2\b/.test(intro) || !/<figure class="sb3__ifig[^"]*"[^>]*>\s*<img/.test(intro)) f.push('service intro without its own H2 and photo');
    if (!/<h2 class="sb3__gh2/.test(grid)) f.push('service section cards have no H2 over them');
    const cards = (grid.match(/<article class="sb3__card/g) || []).length;
    if (cards % 2) f.push(`service grid ends on an empty cell (${cards} cards in two columns)`);
  }
  // Variants.
  if (r === '/home-2/') {
    if (/class="fx-bn__chips"/.test(html)) f.push('services repeated in the "Rooms looking tired" CTA');
    for (const cta of ['services-all', 'articles-all', 'faq-all']) if (!new RegExp(`class="btn fx-pill fx-pill--royal" data-cta="${cta}"`).test(html)) f.push(`${cta} button is not the royal-blue pill`);
    const tiles = sectionOf(html, 'craft');
    if ((tiles.match(/<li class="fx-tl__card/g) || []).length !== 3 || (tiles.match(/class="fx-tl__img"/g) || []).length !== 3) f.push('the three tiles are not all photo cards');
    if (/class="fx-ar__panel"|class="fx-tag"/.test(html)) f.push('Where to Find Us still boxed / chips');
    if (/class="fx-qf__lead"/.test(html)) f.push('the "Leave your name..." paragraph is still in the form');
  }
  if (r === '/home-3/') {
    const rv = sectionOf(html, 'reviews');
    if (!/class="rv section section-reviews/.test(rv) || /<img/.test(rv)) f.push('reviews is not the site review section (bespoke photo band)');
    const band = sectionOf(html, 'cta-band');
    if (!/<img class="dm-band__bg"/.test(band) || !/data-cta="band-quote"/.test(band) || !/data-cta="band-call"/.test(band)) f.push('CTA band needs a photo and both buttons');
    const gl = sectionOf(html, 'gallery');
    if (!/<h2 class="dm-h2"/.test(gl) || (gl.match(/data-lightbox/g) || []).length !== 6) f.push('gallery needs a visible introduction and six photos');
    if ((sectionOf(html, 'craft').match(/<li class="dm-tl__card/g) || []).length !== 5) f.push('"Homes and business premises" does not list all five services');
  }
  return f;
}
function r3Selftest() {
  // Each case breaks one round-3 rule on an otherwise good minimal page and must fail; the good page must pass.
  const hrs = `<dl class="hrs" data-hours>${DAYS.map((d) => `<div class="hrs__row"><dt>${d}</dt><dd>${NAP_HOURS[d].replace(/^(\w+)-(\w+)$/, '$1 to $2')}</dd></div>`).join('')}</dl>`;
  const page = ({ hours = hrs, hero = '<p class="hero__lead">Lead</p>\n<div class="ti-slot" data-trustindex-slot="slim-hero"></div><div class="hero__actions"><a href="#contact" class="btn btn-primary">Q</a></div>', form = '<ul class="qf__list"><li>x</li></ul><div data-trustindex-slot="slim-form"></div><div class="qf__card"><div data-lead-form></div></div>', extra = '' } = {}) =>
    `<section data-section="hero">${hero}</section><section data-section="quote-form">${form}</section>${extra}<footer>${hours}</footer>`;
  const ok = (html, r = '/x/') => r3Fails(r, html, visibleText(html), false).length === 0;
  const bad = [];
  if (!ok(page())) bad.push(`good page fails: ${r3Fails('/x/', page(), visibleText(page()), false)}`);
  const cases = [
    ['compressed hours', page({ hours: '<p>Monday to Friday 7am to 7pm</p>' })],
    ['six days', page({ hours: hrs.replace(/<div class="hrs__row"><dt>Sunday[\s\S]*?<\/div>/, '') })],
    ['slim under buttons', page({ hero: '<p>Lead</p><div class="hero__actions"><a href="#contact" class="btn x">Q</a></div><div data-trustindex-slot="slim-hero"></div>' })],
    ['slim in form card', page({ form: '<ul class="qf__list"></ul><div class="qf__card"><div data-trustindex-slot="slim-form"></div><div data-lead-form></div></div>' })],
    ['slim above USPs', page({ form: '<div data-trustindex-slot="slim-form"></div><ul class="qf__list"></ul><div class="qf__card"></div>' })],
    ['odd service grid', page({ extra: '<section data-section="service-intro"><h2>I</h2><figure class="sb3__ifig"><img alt=""></figure></section><section data-section="service-sections"><h2 class="sb3__gh2">S</h2><article class="sb3__card"></article></section>' })],
  ];
  for (const [name, html] of cases) if (ok(html)) bad.push(`not caught: ${name}`);
  const art = '<section data-section="reviews"></section><nav class="art__crumbs"></nav><section data-section="article-body"><article class="art__main prose"><div data-rundown></div><p>One <a href="/a/">a</a></p></article></section>';
  if (r3Fails('/resources/x/', page({ extra: art }), '', true).length) bad.push('good article fails');
  if (!r3Fails('/resources/x/', page({ extra: art.replace('<p>One <a href="/a/">a</a></p>', '<p><a href="/a/">a</a> and <a href="/b/">b</a></p>') }), '', true).length) bad.push('not caught: two links in one article paragraph');
  if (!r3Fails('/resources/x/', page({ extra: art.replace('<div data-rundown></div>', '') }), '', true).length) bad.push('not caught: no rundown');
  if (!r3Fails('/resources/x/', page({ extra: art + '<a class="art__wa" data-cta="article-aside-whatsapp"></a>' }), '', true).length) bad.push('not caught: article WhatsApp');
  return bad;
}

if (process.argv.includes('--selftest')) {
  // Trustindex mapping gate: a correct page passes; swapped ids, a missing slot, main on /reviews/
  // and reviews below another section each fail.
  const slot = (place, role, id = TI[role]) => `<div class="ti-slot ti-slot--${role}" data-trustindex-slot="${place}" data-trustindex-role="${role}" data-trustindex-id="${id}" data-trustindex-state="live"><script defer async src="https://cdn.trustindex.io/loader.js?${id}"></script></div>`;
  const page = ({ hero = slot('slim-hero', 'slimline'), rv = slot('reviews', 'main'), form = slot('slim-form', 'slimline'), corner = slot('corner', 'corner'), swap = false } = {}) => {
    const h = `<section data-section="hero">${hero}</section>`; const v = `<section data-section="reviews">${rv}</section>`; const o = '<section data-section="about"></section>';
    return `<main>${h}${swap ? o + v : v + o}<section data-section="quote-form">${form}</section></main>${corner}`;
  };
  const tiCases = [
    ['good', '/', page(), 0], ['good reviews page', '/reviews/', page({ rv: slot('reviews', 'reviewPage') }), 0],
    ['swapped ids', '/', page({ hero: slot('slim-hero', 'slimline', TI.main) }), 1], ['no hero slim', '/', page({ hero: '' }), 1],
    ['no form slim', '/', page({ form: '' }), 1], ['no corner', '/', page({ corner: '' }), 1], ['main on /reviews/', '/reviews/', page(), 1],
    ['review-page elsewhere', '/', page({ rv: slot('reviews', 'reviewPage') }), 1], ['reviews not under hero', '/', page({ swap: true }), 1],
    ['foreign id', '/', page({ corner: slot('corner', 'corner', 'aaaaaaaaaaaaaaaaaaaaaaaaaaa') }), 1],
  ];
  const tiBad = tiCases.filter(([, r, h, want]) => (tiFails(r, h).length > 0) !== (want > 0)).map(([n, r, h]) => [n, tiFails(r, h)]);
  if (tiBad.length) { console.error('SELFTEST FAIL (trustindex)', JSON.stringify(tiBad)); process.exit(1); }
  console.log(`selftest: trustindex mapping gate, ${tiCases.length} cases (${tiCases.filter((c) => c[3]).length} broken on purpose) behave`);
  const bad = ['Get a free quote today', 'We guarantee it — always', 'Our team of staff', 'Call 07706 215917', '8 years experience', 'Trueline Finishes Ltd', 'Many five-star reviews', 'across West Yorkshire'];
  const missed = bad.filter((b) => copyFails(b, false).length === 0);
  const good = ["Over eight years' experience. Get a free quotation from Brandon.", 'TrueLine Finishes, fully insured'];
  const falsePos = good.filter((g) => copyFails(g, false).length > 0);
  if (missed.length || falsePos.length) { console.error('SELFTEST FAIL', { missed, falsePos: falsePos.map((g) => [g, copyFails(g, false)]) }); process.exit(1); }
  console.log(`selftest: ${bad.length} bad strings caught, ${good.length} good strings pass`);
  const r3 = r3Selftest();
  if (r3.length) { console.error('SELFTEST FAIL (round 3)', r3); process.exit(1); }
  console.log('selftest: round-3 gates, 10 broken cases caught, the good page and good article pass');
  process.exit(0);
}

const dist = new URL('../dist/', import.meta.url).pathname;
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p); } };
walk(dist);
const articles = JSON.parse(readFileSync(new URL('../src/data/articles.json', import.meta.url), 'utf8'));
const review = new Set(articles.filter((a) => a.status !== 'published').map((a) => `/resources/${a.slug}/`));
// HOMEPAGE VARIANTS (TEMPORARY, operator brief 5 Nov 2026): noindex, out of the sitemap, and exempt
// from the one-hero-pattern check only (they port other templates' heroes on purpose).
const VARIANT = /^\/home-[23]\/$/;
const fails = []; const warns = [];
const route = (file) => '/' + relative(dist, file).replace(/index\.html$/, '').replace(/\.html$/, '/');
const exists = (href) => { const p = href.split('#')[0].split('?')[0]; if (!p || p === '/') return true; const f = join(dist, p); return existsSync(join(f, 'index.html')) || existsSync(f); };
const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
for (const need of ['/faq/', '/services/', '/gallery/', '/reviews/', '/resources/', '/sitemap/', '/privacy/', '/terms/', '/cookie-policy/', '/company-facts/', '/complaints-procedure/', '/accessibility/', '/find-us-online/']) if (!existsSync(join(dist, need, 'index.html'))) fails.push(`${need}: page missing`);
const cssFiles = []; const walkCss = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walkCss(p) : f.endsWith('.css') && cssFiles.push(p); } }; walkCss(dist);
for (const f of cssFiles) if (/text-decoration(-line)?:\s*underline/.test(readFileSync(f, 'utf8'))) fails.push(`${relative(dist, f)}: underline in compiled CSS`);

for (const file of pages) {
  const r = route(file);
  const html = readFileSync(file, 'utf8');
  const utility = /404|thank-you/.test(r);
  const isArticle = r.startsWith('/resources/') && r !== '/resources/';
  const h1 = (html.match(/<h1\b/g) || []).length;
  if (h1 !== 1) fails.push(`${r}: ${h1} H1s`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (!/\| TrueLine Finishes$/.test(title.replace(/&amp;/g, '&'))) fails.push(`${r}: title must end "| TrueLine Finishes" (brand last): "${title}"`);
  if (title.length > 75) warns.push(`${r}: title ${title.length} chars`);
  if (desc.length < 110 || desc.length > 165) warns.push(`${r}: description ${desc.length} chars`);
  const variant = VARIANT.test(r);
  const wantRobots = utility || review.has(r) || variant ? 'noindex, nofollow' : 'index, follow';
  if (!html.includes(`<meta name="robots" content="${wantRobots}"`)) fails.push(`${r}: robots meta is not "${wantRobots}"`);
  if (!/<link rel="canonical" href="https:\/\/www\.truelinefinishes\.com\//.test(html)) fails.push(`${r}: canonical missing or not www`);
  if (!utility && !review.has(r) && !variant && !sitemap.includes(`https://www.truelinefinishes.com${r}<`)) fails.push(`${r}: missing from sitemap`);
  if ((utility || review.has(r) || variant) && sitemap.includes(`https://www.truelinefinishes.com${r}<`)) fails.push(`${r}: noindex page is in the sitemap`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let j; try { j = JSON.parse(m[1]); } catch (e) { fails.push(`${r}: schema JSON parse ${e.message}`); continue; }
    const biz = j['@graph']?.find((n) => n['@type'] === 'HousePainter');
    if (!biz) fails.push(`${r}: no HousePainter node`);
    else {
      if (biz.address || /PostalAddress|BD17/.test(m[1])) fails.push(`${r}: address in schema`);
      if (biz.telephone !== '+447949484274') fails.push(`${r}: schema phone`);
      if ((biz.openingHoursSpecification || []).length !== 2) fails.push(`${r}: openingHoursSpecification`);
      if ((biz.areaServed || []).length !== 116) fails.push(`${r}: areaServed has ${(biz.areaServed || []).length} towns, plan has 116`);
      if (!biz.sameAs?.includes('https://www.youtube.com/@TruelineFinishes')) fails.push(`${r}: sameAs YouTube`);
      if (!biz.sameAs?.includes('https://maps.app.goo.gl/47CXTvHKMybPQHkR9')) fails.push(`${r}: sameAs Google listing share link`);
      if (!/cid=8023434379390696838/.test(biz.hasMap || '')) fails.push(`${r}: hasMap is not the Google listing`);
    }
    if (isArticle && !j['@graph'].some((n) => n['@type'] === 'Article')) fails.push(`${r}: no Article schema`);
    if (/VideoObject/.test(m[1])) fails.push(`${r}: VideoObject schema (no video is embedded)`);
  }
  const text = visibleText(html);
  for (const f of copyFails(text, isArticle)) fails.push(`${r}: ${f}`);
  if (/class="eyebrow"/.test(html)) fails.push(`${r}: eyebrow label`);
  if (!text.includes('07949 484274')) fails.push(`${r}: phone missing`);
  for (const f of r3Fails(r, html, text, isArticle)) fails.push(`${r}: round 3: ${f}`);
  if (!text.includes("Proud to support A Child's Wish, a children's charity.")) fails.push(`${r}: charity line missing from footer`);
  if (!html.includes('href="https://wa.me/447949484274"')) fails.push(`${r}: WhatsApp link missing`);
  const contactIds = (html.match(/id="contact"/g) || []).length;
  if (!utility) {
    if (contactIds !== 1) fails.push(`${r}: ${contactIds} id="contact" (need exactly 1, the form)`);
    if (!/data-lead-form="f_5ELbk5JcKfFh2EEaclT6" data-lf-token="npGnYEsjXAHrYRp13No3gA"/.test(html)) fails.push(`${r}: Formlane slot missing`);
    if (!html.includes('https://api.formlane.uk/edge/form.js')) fails.push(`${r}: form.js missing`);
    if (!text.includes('Any submission through this form is secure. We do not sell your details to third parties.')) fails.push(`${r}: security line missing`);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="/.test(m[0])) fails.push(`${r}: img without alt ${m[0].slice(0, 80)}`);
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const h = m[1];
    if (/^\/(_astro|brand|images|favicon|site\.webmanifest|sitemap)/.test(h)) continue;
    if (!exists(h)) fails.push(`${r}: broken link ${h}`);
    for (const rv of review) if (h.split('#')[0] === rv && r !== rv) fails.push(`${r}: links to unpublished article ${h}`);
  }
  for (const m of html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) {
    const anchor = visibleText(m[1]).trim();
    if (/^(the|in|our|a|on|to|here|at|click here)$/i.test(anchor)) fails.push(`${r}: weak anchor "${anchor}"`);
  }
  if (/src="https:\/\/www\.youtube\.com\/embed/.test(html)) fails.push(`${r}: YouTube embed not on youtube-nocookie`);
  // OPERATOR OVERHAUL (5 Nov 2026, DECISIONS O1-O8) + ROUND 2 (DECISIONS R2-*): no YouTube embed
  // anywhere; every page's hero is the home hero pattern (background photo, no side image, no
  // logo / video / form); no before-and-after slider; no underlined links; footer charity line +
  // LMB credit; the Trustindex widgets mapped by role (tiFails); no Google-reviews line in
  // the hero; the home map is the Google listing (CID); list-of-services H2s are banned.
  if (/youtube(-nocookie)?\.com\/embed|data-video=/.test(html)) fails.push(`${r}: YouTube embed (round 2: none anywhere)`);
  const hero = (html.match(/<section[^>]*data-section="hero"[\s\S]*?<\/section>/) || [''])[0];
  if (/<iframe|data-video=|data-lead-form|<form\b|\/brand\/logo/.test(hero)) fails.push(`${r}: hero carries a video, a form or the logo`);
  if (!/404|thank-you/.test(r)) {
    if (!variant && (!/class="hero on-dark section-hero[^"]*"[^>]*data-hero="(home|page)"/.test(hero) || !/class="hero__bg"/.test(hero))) fails.push(`${r}: hero is not the shared home-hero pattern`);
    if (/ph__img|class="ph /.test(html)) fails.push(`${r}: old inner hero / side image`);
    if (/reviews on Google/i.test(visibleText(hero))) fails.push(`${r}: Google reviews line still in the hero`);
  }
  for (const m of html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)) if (/^interior painting, exterior painting and wallpapering$/i.test(visibleText(m[1]).trim())) fails.push(`${r}: banned list heading "${visibleText(m[1]).trim()}"`);
  if (r === '/' && !/data-section="areas"[\s\S]*?data-map="gbp"[\s\S]*?src="https:\/\/www\.google\.com\/maps\?cid=8023434379390696838&amp;output=embed"/.test(html)) fails.push('/: areas map is not the Google listing CID embed');
  if (/data-ba\b|before-and-after|class="ba[ _]/i.test(html)) fails.push(`${r}: before-and-after slider`);
  if (/text-decoration:\s*underline|text-decoration-line:\s*underline/.test(html)) fails.push(`${r}: underline style in the page`);
  if (!/data-footer-credit/.test(html) || !/href="https:\/\/localmapbooster\.com\/" rel="nofollow noopener"/.test(html)) fails.push(`${r}: footer LMB credit missing`);
  for (const f of tiFails(r, html)) fails.push(`${r}: trustindex: ${f}`);
  if (!/<h2 class="rv__h2"[^>]*>What customers say about us<\/h2>/.test(html)) fails.push(`${r}: reviews heading is not "What customers say about us"`);
}
const published = articles.filter((a) => a.status === 'published');
if (published.length < 3) fails.push(`only ${published.length} published articles (operator: three)`);
for (const a of published) {
  const f = join(dist, 'resources', a.slug, 'index.html');
  if (!existsSync(f)) { fails.push(`/resources/${a.slug}/: not built`); continue; }
  const html = readFileSync(f, 'utf8');
  const h2s = (html.match(/<h2 id=/g) || []).length; const figs = (html.match(/<figure class="art__fig">/g) || []).length;
  if (figs < h2s - 1) fails.push(`/resources/${a.slug}/: ${figs} photos for ${h2s} H2s (one above every content H2)`);
  if (!/"@type":"FAQPage"/.test(html)) fails.push(`/resources/${a.slug}/: no FAQPage schema`);
}
console.log(`audit: ${pages.length} pages, ${fails.length} fails, ${warns.length} warnings`);
warns.forEach((w) => console.log('  warn', w));
fails.forEach((f) => console.log('  FAIL', f));
process.exit(fails.length ? 1 : 0);
