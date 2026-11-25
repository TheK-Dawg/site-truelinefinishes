// STATIC AUDIT over dist/ (TrueLine Finishes). SEO plumbing, schema, the plan's prohibitions as
// code, link integrity and the mandatory furniture. Exit 1 on any FAIL.
// --selftest: proves the copy gate fires on known-bad strings before trusting a clean pass.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { articlePhotoPool, HUB_SUBJECTS } from '../src/lib/article-photos.js';

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
// ROUND 5 (operator review 5, 19 Nov 2026; DECISIONS R5-*): round 4's "half the gallery" put 95
// photographs on the home page and the operator rejected it ("95 images is too many"). The home
// gallery now carries AT MOST 20 DISTINCT photographs, and distinct means distinct source files,
// not 20 slots with repeats. The floor keeps it a showcase rather than a thin strip.
const HOME_GALLERY_MAX = 20;
const HOME_GALLERY_MIN = 12;
const LEGAL_SET = ['/privacy/', '/terms/', '/cookie-policy/', '/complaints-procedure/', '/accessibility/'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const NAP_HOURS = JSON.parse(readFileSync(new URL('../site-plan/nap.json', import.meta.url), 'utf8')).hours;
// THE TOP NAV: five entries, that order (the site owner, 25 Nov 2026). Mirrors `nav` in src/data/site.ts.
const TOP_NAV = ['Home', 'Services', 'About', 'Resources', 'Contact'];
const sectionOf = (html, name) => (html.match(new RegExp(`<section[^>]*data-section="${name}"[\\s\\S]*?</section>`)) || [''])[0];
// ---- ROUND 5 (operator review 5, 19 Nov 2026; DECISIONS R5-*) ----
// Three rulings become hard gates here: H1s grounded in the real service AND the verified service
// area (never a vague question, never an owner slogan); no owner-centric marketing copy (no
// self-work trope, no full name outside legal identification, the brand leads); and the services
// tile footer carrying a Quick Quote Online button instead of a phone number.
const TOWN_NAMES = JSON.parse(readFileSync(new URL('../site-plan/towns.json', import.meta.url), 'utf8')).towns.map((t) => t.town);
const SERVICE_H1 = {
  '/painting-and-decorating/': 'Painting and Decorating',
  '/interior-painting/': 'Interior Painting',
  '/exterior-painting/': 'Exterior Painting',
  '/wallpapering/': 'Wallpapering',
  '/commercial-painting-and-decorating/': 'Commercial Painting and Decorating',
};
// The full name is legal identification: the data controller, the trading name and the company
// facts. Everywhere else it is owner-name repetition the operator banned from marketing copy.
const FULL_NAME_OK = ['/privacy/', '/terms/', '/company-facts/'];
const namedTown = (t) => TOWN_NAMES.find((n) => new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(t));
function r5Fails(r, html, text) {
  const f = [];
  const h1 = visibleText((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1]).trim();
  const title = (html.match(/<title>([^<]*)<\/title>/) || [, ''])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1];
  const heads = [...html.matchAll(/<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/g)].map((m) => visibleText(m[1]).trim());
  // 1. H1 = real service + verified location.
  if (SERVICE_H1[r]) {
    if (!h1.toLowerCase().includes(SERVICE_H1[r].toLowerCase())) f.push(`service H1 does not carry its service keyword "${SERVICE_H1[r]}": "${h1}"`);
    if (!namedTown(h1)) f.push(`service H1 names no town from the plan's service area: "${h1}"`);
  }
  if (r === '/services/') {
    if (!/painting and decorating/i.test(h1)) f.push(`/services/ H1 must say "Painting and Decorating": "${h1}"`);
    if (!/\b(Baildon|Shipley)\b/.test(h1)) f.push(`/services/ H1 must name Baildon or Shipley: "${h1}"`);
  }
  if (r === '/') {
    if (!/painter and decorator|painting and decorating/i.test(h1)) f.push(`home H1 does not answer a painter or decorator search: "${h1}"`);
    if (!namedTown(h1)) f.push(`home H1 names no town from the plan's service area: "${h1}"`);
  }
  if (/^(\/|\/services\/)$/.test(r) || SERVICE_H1[r] || ['/about/', '/contact/', '/reviews/', '/gallery/', '/faq/', '/resources/'].includes(r)) {
    if (/\?\s*$/.test(h1)) f.push(`H1 is a question, which round 5 ruled out: "${h1}"`);
  }
  // 2. No owner-centric marketing copy.
  for (const [re, label] of [
    [/\b(carries out|does) the work himself\b/i, 'self-work trope'],
    [/work Brandon carries out/i, 'self-work trope naming the owner'],
    [/the person you call is the person who does the work/i, 'self-work trope'],
    [/Who Does the Work Himself/i, 'self-work trope in a headline'],
  ]) if (re.test(text)) f.push(`banned ${label}: "${(text.match(new RegExp(`.{0,40}${re.source}.{0,40}`, 'i')) || [''])[0].trim()}"`);
  const bodyText = text.replace(/Brandon@truelinefinishes\.com/g, 'EMAIL');
  const fullName = (bodyText.match(/Brandon Dawson/g) || []).length;
  if (fullName && !FULL_NAME_OK.includes(r)) f.push(`the owner's full name is in this page's copy ${fullName}x (round 5: legal identification pages only)`);
  if (/Brandon Dawson/.test(title) || /Brandon Dawson/.test(desc)) f.push('the owner\'s full name is in the title or meta description');
  for (const h of heads) if (/\bBrandon\b/.test(h)) f.push(`a heading leads with the owner's name: "${h}"`);
  const firstName = (bodyText.match(/\bBrandon\b/g) || []).length;
  const allowance = FULL_NAME_OK.includes(r) ? 4 : r === '/contact/' ? 1 : 0;
  if (firstName > allowance) f.push(`the owner's name appears ${firstName}x in this page's copy (round 5 allowance here: ${allowance})`);
  // 3. The services tile footer: a Quick Quote Online button, never a phone number.
  const sv = sectionOf(html, 'services');
  if (sv) {
    const btn = (sv.match(/<a[^>]*data-cta="services-quote"[^>]*>[\s\S]*?<\/a>/) || [''])[0];
    if (!btn) f.push('the services section has no Quick Quote Online action under the tiles');
    else {
      if (!/class="[^"]*\bbtn\b/.test(btn)) f.push('the services footer Quick Quote Online is a text link, not a button');
      if (!/href="(#contact|\/contact\/#contact)"/.test(btn)) f.push('the services footer button does not go to the quote form');
      if (!/Quick Quote Online/.test(visibleText(btn))) f.push(`the services footer button does not say Quick Quote Online: "${visibleText(btn).trim()}"`);
    }
    if (/href="tel:/.test(sv) || /data-cta="services-call"/.test(sv)) f.push('the services section still carries a phone number under the tiles');
    if ((sv.match(/data-cta="services-quote"/g) || []).length > 1) f.push('the services footer repeats the quick quote action');
  }
  return f;
}
function r5Selftest() {
  const bad = [];
  const page = ({ h1 = 'Interior Painting in Baildon, Guiseley and Ilkley', body = '', sv = '' } = {}) =>
    `<title>Interior Painting in Baildon | TrueLine Finishes</title><meta name="description" content="x"><h1>${h1}</h1>${body}${sv}`;
  const goodSv = '<section data-section="services"><a href="#contact" class="btn btn-primary" data-cta="services-quote"><span class="btn__t">Quick Quote Online</span></a></section>';
  const ok = (r, html) => r5Fails(r, html, visibleText(html)).length === 0;
  const good = page({ sv: goodSv });
  if (!ok('/interior-painting/', good)) bad.push(`good page fails: ${r5Fails('/interior-painting/', good, visibleText(good))}`);
  const cases = [
    ['service H1 without its keyword', '/interior-painting/', page({ h1: 'Rooms Repainted in Baildon', sv: goodSv })],
    ['service H1 without a town', '/interior-painting/', page({ h1: 'Interior Painting, Room by Room', sv: goodSv })],
    ['services hub H1 without the trade', '/services/', page({ h1: 'Which Kind of Decorating Does Your Job Need?', sv: goodSv })],
    ['services hub H1 without the town', '/services/', page({ h1: 'Painting and Decorating Services', sv: goodSv })],
    ['home H1 without the trade', '/', page({ h1: 'Tired Rooms in Baildon?', sv: goodSv })],
    ['home H1 without a town', '/', page({ h1: 'Painter and Decorator, Inside and Out', sv: goodSv })],
    ['question H1', '/gallery/', page({ h1: 'Want to See the Finish First?', sv: goodSv })],
    ['owner name in the H1', '/gallery/', page({ h1: "Brandon's Work in Photographs", sv: goodSv })],
    ['self-work trope', '/about/', page({ h1: 'About TrueLine Finishes in Baildon', body: '<p>Every card below is work Brandon carries out himself.</p>', sv: goodSv })],
    ['the person you call trope', '/', page({ h1: 'Painter and Decorator in Baildon', body: '<p>The person you call is the person who does the work.</p>', sv: goodSv })],
    ['full name in marketing copy', '/about/', page({ h1: 'About TrueLine Finishes in Baildon', body: '<p>Brandon Dawson, the owner, carries out the work.</p>', sv: goodSv })],
    ['first name on a page with no allowance', '/gallery/', page({ h1: 'Photographs in Baildon', body: '<p>Photographs from Brandon jobs.</p>', sv: goodSv })],
    ['call button under the tiles', '/', page({ h1: 'Painter and Decorator in Baildon', sv: '<section data-section="services"><a href="#contact" class="btn" data-cta="services-quote"><span>Quick Quote Online</span></a><a href="tel:+447949484274" class="btn" data-cta="services-call">07949 484274</a></section>' })],
    ['quick quote as a text link only', '/', page({ h1: 'Painter and Decorator in Baildon', sv: '<section data-section="services"><a href="#contact" class="dm-link" data-cta="services-quote">Quick Quote Online</a></section>' })],
    ['no quick quote under the tiles', '/', page({ h1: 'Painter and Decorator in Baildon', sv: '<section data-section="services"><p>tiles</p></section>' })],
    ['duplicated quick quote action', '/', page({ h1: 'Painter and Decorator in Baildon', sv: '<section data-section="services"><p>Not sure? <a href="#contact" class="dm-link" data-cta="services-quote">Quick Quote Online</a></p><a href="#contact" class="btn" data-cta="services-quote"><span>Quick Quote Online</span></a></section>' })],
  ];
  for (const [name, r, html] of cases) if (ok(r, html)) bad.push(`not caught: ${name}`);
  // Legal identification pages keep the full name.
  const legal = page({ h1: 'Privacy Policy', body: '<p>TrueLine Finishes is run by Brandon Dawson. Brandon Dawson is the data controller.</p>', sv: '' });
  if (!ok('/privacy/', legal)) bad.push(`legal page with the full name fails: ${r5Fails('/privacy/', legal, visibleText(legal))}`);
  // The contact page keeps one first-name mention for the direct line.
  const contact = page({ h1: 'Get a Free Painting and Decorating Quotation in Baildon', body: '<p>Call Brandon on 07949 484274. Email Brandon@truelinefinishes.com.</p>', sv: '' });
  if (!ok('/contact/', contact)) bad.push(`contact page with one first name fails: ${r5Fails('/contact/', contact, visibleText(contact))}`);
  return bad;
}
// THE HEADER (the site owner, 25 Nov 2026), on every built page: the top nav is exactly Home,
// Services, About, Resources, Contact and the mobile menu is the same five (Gallery and Reviews
// stay linked from the footer's Company column and from their own page buttons); the call control
// carries NO phone icon at either width and still dials Brandon's number.
function headerFails(html) {
  const f = [];
  // Class attributes are matched loosely: Astro may add its own scope class or attribute alongside.
  const hd = (html.match(/<header[^>]*class="[^"]*\bhd\b[^"]*"[\s\S]*?<\/header>/) || [''])[0];
  if (hd) {
    const navOf = (name, link) => [...((hd.match(new RegExp(`<nav[^>]*class="[^"]*\\b${name}\\b[^"]*"[\\s\\S]*?</nav>`)) || [''])[0])
      .matchAll(new RegExp(`class="[^"]*\\b${link}\\b[^"]*"[^>]*>([^<]*)<`, 'g'))].map((m) => m[1].trim());
    const topNav = navOf('hd__nav', 'hd__link');
    const menuNav = navOf('hd__menu-nav', 'hd__menu-link');
    if (JSON.stringify(topNav) !== JSON.stringify(TOP_NAV)) f.push(`top nav ${JSON.stringify(topNav)}, want ${JSON.stringify(TOP_NAV)}`);
    if (JSON.stringify(menuNav) !== JSON.stringify(TOP_NAV)) f.push(`mobile menu nav ${JSON.stringify(menuNav)}, want ${JSON.stringify(TOP_NAV)}`);
    const call = (hd.match(/<a[^>]*href="tel:[^"]*"[^>]*class="[^"]*\bhd__(?:phone|mcall)\b[^"]*"[^>]*>[\s\S]*?<\/a>/g) || []);
    if (call.length !== 2) f.push(`the header has ${call.length} call control(s), want the desktop number and the narrow Call pill`);
    for (const c of call) if (/<svg|hd__phone-ic/.test(c)) f.push('the header call control still carries a phone icon');
    if (!call.some((c) => c.includes('07949 484274'))) f.push('the header does not show Brandon\'s number');
  } else f.push('no site header in the page');
  return f;
}


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
  if (qf) {
    const s2 = qf.search(/data-trustindex-slot="slim-form"/); const list = qf.search(/class="(qf__list|dm-qf__list)"/); const card = qf.search(/class="(qf__card|dm-qf__card)"/);
    if (s2 < 0 || list < 0 || card < 0 || !(s2 > list && s2 < card)) f.push(`quote-section slimline not in the left column under the selling points (slot ${s2}, list ${list}, card ${card})`);
  }
  // THE SITE OWNER'S 25 NOV 2026 CORRECTIONS, in the served bytes of every page.
  //  - the quote-form band carries no opening hours (they stay in the footer, on /contact/ and in
  //    the structured data, which the hours gate above still proves);
  if (qf && /<dl[^>]*data-hours/.test(qf)) f.push('opening hours are still inside the quote-form band');
  // WhatsApp branding removed where the operator flagged it.
  if (isArticle && /article-aside-whatsapp|art__wa/.test(html)) f.push('WhatsApp in the article "Need a quote?" card');
  // HOME 3 SITE-WIDE (19 Nov 2026): Home 3's form band has no WhatsApp button, so no quote section has one.
  if (/data-cta="form-whatsapp"/.test(qf)) f.push('WhatsApp button in the quote section');
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
  // HOME = HOME 3 (operator, 19 Nov 2026): the round-3 Home 3 rulings now hold on the regular homepage.
  if (r === '/') {
    const rv = sectionOf(html, 'reviews');
    if (!/class="rv section section-reviews/.test(rv) || /<img/.test(rv)) f.push('reviews is not the site review section (bespoke photo band)');
    const band = sectionOf(html, 'cta-band');
    if (!/<img class="hb__bg"/.test(band) || !/data-cta="band-quote"/.test(band) || !/data-cta="band-call"/.test(band)) f.push('CTA band needs a photo and both buttons');
    // ROUND 4 (operator review 4, 19 Nov 2026): about HALF the gallery page's collection on the home
    // page, in the gallery page's square spaced tiles, not a six-photo strip.
    const gl = sectionOf(html, 'gallery');
    const shots = (gl.match(/data-lightbox/g) || []).length;
    if (!/<h2 class="dm-h2"/.test(gl) || !/href="\/gallery\/"/.test(gl)) f.push('gallery needs a visible introduction and See the Gallery');
    if (!/wg__grid--full/.test(gl)) f.push("home gallery is not the gallery page's square spaced tiles");
    // ROUND 5: at most 20 photographs on the home page, and every one a DIFFERENT photograph.
    const fulls = [...gl.matchAll(/data-full="([^"]+)"/g)].map((m) => m[1]);
    const srcs = fulls.length ? fulls : [...gl.matchAll(/<img[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]);
    const uniq = new Set(srcs).size;
    if (shots > HOME_GALLERY_MAX) f.push(`home gallery shows ${shots} photographs, the operator's ceiling is ${HOME_GALLERY_MAX}`);
    if (shots < HOME_GALLERY_MIN) f.push(`home gallery shows only ${shots} photographs (want ${HOME_GALLERY_MIN} to ${HOME_GALLERY_MAX})`);
    if (uniq !== shots) f.push(`home gallery repeats a photograph: ${shots} tiles but ${uniq} distinct source files`);
    // ONE services-links section on the home page: the second card set is gone (round 4).
    if (/data-section="craft"|ht__card/.test(html)) f.push('the duplicate "For homes and business premises" services section is back');
    if ((html.match(/data-section="services"/g) || []).length !== 1) f.push('the home page must carry exactly one services-links section');
    if ((sectionOf(html, 'services').match(/<li class="sv__tile/g) || []).length !== 5) f.push('the five hub tiles are missing');
    // The hero still cross-fades several photos, but round 4 removed every visitor-facing control.
    const hero = sectionOf(html, 'hero');
    if ((hero.match(/<img class="hero__bg/g) || []).length < 2) f.push('home hero is not the photo carousel');
    if (/data-slide-next|data-slide-prev|data-slide-to/.test(hero)) f.push('home hero carries manual slide controls (round 4: the carousel runs on its own)');
  }
  // ---- ROUND 4 (operator review 4, 19 Nov 2026) ----
  // No "Further Reading" article teaser anywhere but the resources pages.
  if (/data-section="further-reading"|: Further Reading</.test(html)) f.push('a "Further Reading" article teaser is on this page (round 4: resources only)');
  // Service pages: the "Ready to talk it through?" call to action is a BUTTON, not a text link.
  if (/data-cta="steps-quote"/.test(html)) {
    const cta = (html.match(/<a[^>]*data-cta="steps-quote"[^>]*>/) || [''])[0];
    if (!/class="[^"]*\bbtn\b/.test(cta)) f.push('the "Ready to talk it through?" call to action is not a button');
  }
  // The reviews section carries a button through to /reviews/ on every page but /reviews/ itself.
  if (/data-section="reviews"/.test(html)) {
    const rvs = sectionOf(html, 'reviews');
    const rvBtn = (rvs.match(/<a\b[^>]*data-cta="reviews-page"[^>]*>/) || [''])[0];
    const hasBtn = /href="\/reviews\/"/.test(rvBtn) && /class="[^"]*\bbtn\b/.test(rvBtn);
    if (r === '/reviews/' && hasBtn) f.push('the reviews page links to itself from its own reviews section');
    if (r !== '/reviews/' && !hasBtn) f.push('the reviews section has no button through to the reviews page');
  }
  // The legal set interlinks inside the page content: the other four, plus About, Contact and home.
  if (LEGAL_SET.includes(r)) {
    const nxt = (html.match(/<nav class="lg__next"[\s\S]*?<\/nav>/) || [''])[0];
    const want = [...LEGAL_SET.filter((x) => x !== r), '/about/', '/contact/', '/'];
    const missing = want.filter((h) => !new RegExp(`href="${h.replace(/\//g, '\\/')}"`).test(nxt));
    if (!nxt) f.push('no "Where to go next" block: this legal page does not interlink in its content');
    else if (missing.length) f.push(`legal interlinks missing: ${missing.join(' ')}`);
  }
  // The gallery page needs real space between the last photo group and the quote section.
  if (r === '/gallery/' && !/class="gl section gl--last"/.test(html)) f.push('the last gallery group has no bottom padding before the quote section');
  return f;
}
function r3Selftest() {
  // Each case breaks one round-3 rule on an otherwise good minimal page and must fail; the good page must pass.
  const hrs = `<dl class="hrs" data-hours>${DAYS.map((d) => `<div class="hrs__row"><dt>${d}</dt><dd>${NAP_HOURS[d].replace(/^(\w+)-(\w+)$/, '$1 to $2')}</dd></div>`).join('')}</dl>`;
  const page = ({ hours = hrs, hero = '<p class="hero__lead">Lead</p>\n<div class="ti-slot" data-trustindex-slot="slim-hero"></div><div class="hero__actions"><a href="#contact" class="btn btn-primary">Q</a></div>', form = '<ul class="qf__list"><li>x</li></ul><div data-trustindex-slot="slim-form"></div><div class="qf__card"><div data-lead-form></div></div>', extra = '' } = {}) =>
    `<section data-section="hero">${hero}</section><section data-section="quote-form">${form}</section>${extra}<footer>${hours}</footer>`;
  const ok = (html, r = '/x/') => r3Fails(r, html, visibleText(html), false).length === 0;
  const rvBtn = '<a href="/reviews/" class="btn btn-primary" data-cta="reviews-page"><span class="btn__t">Read the Reviews</span></a>';
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
  // ROUND 4 (operator review 4): each case breaks one of the new rules and must fail.
  const legalNext = (skip = '') => `<nav class="lg__next">${[...LEGAL_SET.filter((x) => x !== '/privacy/'), '/about/', '/contact/', '/'].filter((h) => h !== skip).map((h) => `<a href="${h}">x</a>`).join('')}</nav>`;
  cases.push(
    ['further reading teaser', page({ extra: '<section data-section="further-reading"><h2>Interior Painting: Further Reading</h2></section>' })],
    ['steps CTA not a button', page({ extra: '<p class="more-line">Ready to talk it through? <a href="#contact" class="text-link" data-cta="steps-quote">Quick Quote Online</a></p>' })],
    ['reviews section with no button', page({ extra: '<section data-section="reviews"></section>' })],
  );
  for (const [name, html] of cases) if (ok(html)) bad.push(`not caught: ${name}`);
  const steps = page({ extra: '<a href="#contact" class="btn btn-primary" data-cta="steps-quote"><span class="btn__t">Quick Quote Online</span></a>' });
  if (!ok(steps)) bad.push(`good steps button fails: ${r3Fails('/x/', steps, visibleText(steps), false)}`);
  const rvOk = page({ extra: `<section data-section="reviews">${rvBtn}</section>` });
  if (!ok(rvOk)) bad.push('good reviews button fails');
  if (ok(page({ extra: `<section data-section="reviews">${rvBtn}</section>` }), '/reviews/')) bad.push('not caught: /reviews/ linking to itself');
  // Legal interlinks + the gallery gap.
  const legalPage = (nav) => page({ extra: nav });
  if (!ok(legalPage(legalNext()), '/privacy/')) bad.push(`good legal interlinks fail: ${r3Fails('/privacy/', legalPage(legalNext()), '', false)}`);
  if (ok(legalPage(''), '/privacy/')) bad.push('not caught: legal page with no interlink block');
  if (ok(legalPage(legalNext('/about/')), '/privacy/')) bad.push('not caught: legal interlinks missing About');
  if (!ok(page({ extra: '<section class="gl section gl--last"></section>' }), '/gallery/')) bad.push('good gallery gap fails');
  if (ok(page({ extra: '<section class="gl section"></section>' }), '/gallery/')) bad.push('not caught: gallery with no gap before the quote section');
  // ROUND 5: the home gallery ceiling and the no-repeat rule, proved on a synthetic home page (the
  // other home-page rules fail on this stub, so the gate is checked by its own message).
  const tile = (n) => `<li><button type="button" class="wg__shot wg__shot--sq" data-lightbox><img src="/images/p${n}-sm.webp" data-full="/images/p${n}.webp" alt=""></button></li>`;
  const homeGallery = (tiles) => page({ extra: `<section data-section="gallery"><h2 class="dm-h2">Work</h2><a href="/gallery/">See the Gallery</a><ul class="wg__grid wg__grid--full">${tiles}</ul></section>` });
  const galleryMsgs = (tiles) => r3Fails('/', homeGallery(tiles), '', false).join(' | ');
  const twenty = Array.from({ length: 20 }, (_, i) => tile(i)).join('');
  if (/ceiling is 20|repeats a photograph|only \d+ photographs/.test(galleryMsgs(twenty))) bad.push(`good 20-photo home gallery fails: ${galleryMsgs(twenty)}`);
  if (!/ceiling is 20/.test(galleryMsgs(twenty + tile(20)))) bad.push('not caught: 21 photographs on the home page');
  if (!/repeats a photograph/.test(galleryMsgs(Array.from({ length: 20 }, (_, i) => tile(i % 10)).join('')))) bad.push('not caught: the home gallery repeating photographs');
  if (!/only 8 photographs/.test(galleryMsgs(Array.from({ length: 8 }, (_, i) => tile(i)).join('')))) bad.push('not caught: a home gallery thinned below the floor');
  const art = `<section data-section="reviews">${rvBtn}</section><nav class="art__crumbs"></nav><section data-section="article-body"><article class="art__main prose"><div data-rundown></div><p>One <a href="/a/">a</a></p></article></section>`;
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
  console.log('selftest: round-3, round-4 and the round-5 home-gallery gates, 19 broken cases caught, the good pages and good article pass');
  const r5 = r5Selftest();
  if (r5.length) { console.error('SELFTEST FAIL (round 5)', r5); process.exit(1); }
  console.log('selftest: round-5 gates (H1 service + location, no owner-centric copy, services footer quote not call), 16 broken cases caught, the good, legal and contact pages pass');
  process.exit(0);
}

const dist = new URL('../dist/', import.meta.url).pathname;
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p); } };
walk(dist);
const articles = JSON.parse(readFileSync(new URL('../src/data/articles.json', import.meta.url), 'utf8'));
const review = new Set(articles.filter((a) => a.status !== 'published').map((a) => `/resources/${a.slug}/`));
// ARTICLE PHOTOGRAPHS (operator review 6, 25 Nov 2026): every figure on a built article page must
// come from that article's own hub pool (src/lib/article-photos.js - the same module the renderer
// uses), and no photograph may appear twice on one page. This is the gate that holds the SEO
// engine's future batches to the service-matched pool instead of whatever the renderer happened to
// reach for. It is keyed on the BUILT html, so it fails on what actually shipped.
const siteImages = JSON.parse(readFileSync(new URL('../src/data/images.json', import.meta.url), 'utf8'));
const articleBySlug = new Map(articles.map((a) => [`/resources/${a.slug}/`, a]));
function articlePhotoFails(route, html) {
  const a = articleBySlug.get(route);
  if (!a) return [];
  const out = [];
  if (!HUB_SUBJECTS[a.hub]) return [`article hub "${a.hub}" has no declared photo subjects`];
  const allowed = new Set(articlePhotoPool(siteImages, a.hub, a.hero).map((i) => i.src));
  const figs = [...html.matchAll(/<figure class="art__fig"><img src="([^"]+)"/g)].map((m) => m[1]);
  const heroSrc = (siteImages.find((i) => i.key === a.hero) || {}).src;
  for (const src of figs) {
    if (src === heroSrc) out.push(`the hero photograph is used again in the body (${src})`);
    else if (!allowed.has(src)) out.push(`figure ${src} is not in the ${a.hub} photo pool (off-topic fallback)`);
  }
  const seen = new Set();
  for (const src of figs) { if (seen.has(src)) out.push(`figure ${src} used twice on one page`); seen.add(src); }
  if (figs.length > allowed.size) out.push(`${figs.length} figures from a pool of ${allowed.size}`);
  return out;
}
// ARTICLE BODY (operator review 6): an engine article must carry "the same styled in-article CTA as
// the rest of the site". The engine hard-codes its own CTA block with another client's palette, URL
// and telephone number as INLINE styles; src/lib/article-body.js rebuilds it in the site's markup at
// render. This proves it on the built page: no inline style survives inside the reading column, the
// only telephone number anywhere on the page is Brandon's, and any in-article CTA is the site's own
// pill buttons pointing at the page's own form.
function articleBodyFails(route, html) {
  if (!articleBySlug.has(route)) return [];
  const out = [];
  const main = (html.match(/<article class="art__main prose"[^>]*>([\s\S]*?)<\/article>/) || [])[1] || '';
  if (!main) return ['the article reading column was not found in the built page'];
  for (const m of main.matchAll(/\sstyle="([^"]*)"/g)) out.push(`inline style in the article body -> ${m[1].slice(0, 70)}`);
  for (const m of html.matchAll(/href="tel:([^"]*)"/g)) if (m[1] !== '+447949484274') out.push(`a telephone link that is not Brandon's -> tel:${m[1]}`);
  for (const m of main.matchAll(/<div class="art__inline-cta"[\s\S]*?<\/div>/g)) {
    const cta = m[0];
    if (!/class="btn btn-primary" href="#contact"/.test(cta)) out.push('the in-article CTA does not use the site\'s Quick Quote Online button to its own form');
    if (!/class="btn btn-call btn-call--light" href="tel:\+447949484274"/.test(cta)) out.push('the in-article CTA does not use the site\'s call button');
  }
  if (/data-lmb="cta"[^>]*style=/.test(main)) out.push("the engine's own CTA block shipped unrewritten");
  return out;
}
// HOMEPAGE VARIANTS RETIRED (19 Nov 2026): /home-2/ and /home-3/ must not be built (they 301 to / in
// worker/redirects.js); nothing may link to them.
const RETIRED = /^\/(home-[23]|complaints)\/$/;
const fails = []; const warns = [];
const route = (file) => '/' + relative(dist, file).replace(/index\.html$/, '').replace(/\.html$/, '/');
const exists = (href) => { const p = href.split('#')[0].split('?')[0]; if (!p || p === '/') return true; const f = join(dist, p); return existsSync(join(f, 'index.html')) || existsSync(f); };
const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
for (const need of ['/faq/', '/services/', '/gallery/', '/reviews/', '/resources/', '/sitemap/', '/privacy/', '/terms/', '/cookie-policy/', '/company-facts/', '/complaints-procedure/', '/accessibility/', '/find-us-online/']) if (!existsSync(join(dist, need, 'index.html'))) fails.push(`${need}: page missing`);
const cssFiles = []; const walkCss = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walkCss(p) : f.endsWith('.css') && cssFiles.push(p); } }; walkCss(dist);
for (const f of cssFiles) if (/text-decoration(-line)?:\s*underline/.test(readFileSync(f, 'utf8'))) fails.push(`${relative(dist, f)}: underline in compiled CSS`);
// HERO HEIGHT POLICY (round 5): every hero, home page included, takes its height from the one
// --hero-h custom property, and the compact (inner-page) variant never sets a height of its own.
{
  const css = cssFiles.map((f) => readFileSync(f, 'utf8')).join('\n');
  if (!/--hero-h:/.test(css)) fails.push('compiled CSS: no --hero-h hero height token');
  if (!/\.hero\b[^{}]*\{[^{}]*min-height:\s*var\(--hero-h\)/.test(css)) fails.push('compiled CSS: the hero does not take its height from --hero-h');
  for (const m of css.matchAll(/\.hero--compact[^{}]*\{([^{}]*)\}/g)) if (/min-height/.test(m[1])) fails.push(`compiled CSS: .hero--compact sets its own height (round 5: one height for every hero) -> ${m[1].slice(0, 80)}`);
  const breaks = [...css.matchAll(/--hero-h:\s*([^;]+);/g)].map((m) => m[1].trim());
  if (new Set(breaks).size !== breaks.length) fails.push(`compiled CSS: --hero-h declared twice with the same value (${breaks.join(' | ')})`);
}

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
  if (RETIRED.test(r)) fails.push(`${r}: retired URL is still built (it must 301 through worker/redirects.js)`);
  const wantRobots = utility || review.has(r) ? 'noindex, nofollow' : 'index, follow';
  if (!html.includes(`<meta name="robots" content="${wantRobots}"`)) fails.push(`${r}: robots meta is not "${wantRobots}"`);
  if (!/<link rel="canonical" href="https:\/\/www\.truelinefinishes\.com\//.test(html)) fails.push(`${r}: canonical missing or not www`);
  if (!utility && !review.has(r) && !sitemap.includes(`https://www.truelinefinishes.com${r}<`)) fails.push(`${r}: missing from sitemap`);
  if ((utility || review.has(r)) && sitemap.includes(`https://www.truelinefinishes.com${r}<`)) fails.push(`${r}: noindex page is in the sitemap`);
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
  }
  const text = visibleText(html);
  for (const f of copyFails(text, isArticle)) fails.push(`${r}: ${f}`);
  if (/class="eyebrow"/.test(html)) fails.push(`${r}: eyebrow label`);
  if (!text.includes('07949 484274')) fails.push(`${r}: phone missing`);
  for (const f of r3Fails(r, html, text, isArticle)) fails.push(`${r}: round 3: ${f}`);
  for (const f of headerFails(html)) fails.push(`${r}: header (25 Nov 2026): ${f}`);
  for (const f of r5Fails(r, html, text)) fails.push(`${r}: round 5: ${f}`);
  for (const f of articlePhotoFails(r, html)) fails.push(`${r}: round 6 article photos: ${f}`);
  for (const f of articleBodyFails(r, html)) fails.push(`${r}: round 6 article body: ${f}`);
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
    if (RETIRED.test(h.split('#')[0].split('?')[0])) fails.push(`${r}: links to a retired URL ${h}`);
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
  // VIDEOS (operator, 19 Nov 2026, superseding round 2's "none anywhere"): Brandon's two videos, on the
  // home page only, privacy-enhanced (youtube-nocookie), lazy, titled, no autoplay; no other video.
  const yt = [...html.matchAll(/<iframe\b[^>]*youtube[^>]*>/g)].map((m) => m[0]);
  if (r === '/') {
    const ids = yt.map((t) => (t.match(/youtube-nocookie\.com\/embed\/([\w-]+)/) || [])[1]).sort();
    if (JSON.stringify(ids) !== JSON.stringify(['mNwdUtQedkc', 'v3g1Kdja0gk'])) fails.push(`/: videos ${JSON.stringify(ids)} (want Brandon's two: mNwdUtQedkc + v3g1Kdja0gk, on youtube-nocookie)`);
    for (const t of yt) if (!/loading="lazy"/.test(t) || !/title="[^"]+"/.test(t) || /autoplay=1/.test(t) || !/allowfullscreen/.test(t)) fails.push(`/: video iframe not lazy/titled/fullscreen or autoplaying: ${t.slice(0, 100)}`);
    const vs = sectionOf(html, 'videos');
    if (!/vd__item--wide[\s\S]*mNwdUtQedkc[\s\S]*vd__item--short[\s\S]*v3g1Kdja0gk/.test(vs)) fails.push('/: the full video (16:9) and the Short (9:16) are not together in the videos section');
  } else if (yt.length || /data-video=/.test(html)) fails.push(`${r}: YouTube embed off the home page (${yt.length})`);
  const hero = (html.match(/<section[^>]*data-section="hero"[\s\S]*?<\/section>/) || [''])[0];
  if (/<iframe|data-video=|data-lead-form|<form\b|\/brand\/logo/.test(hero)) fails.push(`${r}: hero carries a video, a form or the logo`);
  if (!/404|thank-you/.test(r)) {
    if (!/class="hero on-dark section-hero[^"]*"[^>]*data-hero="(home|page)" data-hero-style="home-3"/.test(hero) || !/class="hero__bg( is-on)?"/.test(hero)) fails.push(`${r}: hero is not the shared Home 3 hero pattern`);
    if (/ph__img|class="ph /.test(html)) fails.push(`${r}: old inner hero / side image`);
    if (/reviews on Google/i.test(visibleText(hero))) fails.push(`${r}: Google reviews line still in the hero`);
  }
  for (const m of html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)) if (/^interior painting, exterior painting and wallpapering$/i.test(visibleText(m[1]).trim())) fails.push(`${r}: banned list heading "${visibleText(m[1]).trim()}"`);
  if (r === '/' && !/data-section="areas"[\s\S]*?data-map="gbp"[\s\S]*?src="https:\/\/www\.google\.com\/maps\?cid=8023434379390696838&amp;output=embed"/.test(html)) fails.push('/: areas map is not the Google listing CID embed');
  if (/data-ba\b|before-and-after|class="ba[ _]/i.test(html)) fails.push(`${r}: before-and-after slider`);
  if (/text-decoration:\s*underline|text-decoration-line:\s*underline/.test(html)) fails.push(`${r}: underline style in the page`);
  // LMB CREDIT (operator review 4, 19 Nov 2026): the same visible wording on every route, but the
  // keyword is a LINK on the home page ONLY; everywhere else it is plain text, so the site makes
  // exactly one outbound credit link.
  if (!/data-footer-credit/.test(html) || !/Painting and decorating websites<\/(a|span)>\s*by/.test(html)) fails.push(`${r}: footer LMB credit missing`);
  const creditLinked = /href="https:\/\/localmapbooster\.com\/" rel="nofollow noopener"/.test(html);
  if (r === '/' && !creditLinked) fails.push('/: the LMB credit keyword must be the one nofollow link, on the home page');
  if (r !== '/' && creditLinked) fails.push(`${r}: the LMB credit is linked off the home page (round 4: home page only)`);
  for (const f of tiFails(r, html)) fails.push(`${r}: trustindex: ${f}`);
  if (!/<h2 class="rv__h2"[^>]*>What customers say about us<\/h2>/.test(html)) fails.push(`${r}: reviews heading is not "What customers say about us"`);
}
// NO ORPHAN PAGES (operator review 4, 19 Nov 2026: "There should be no orphan pages on the site
// anywhere. I need you to make sure that nothing's orphaned anywhere"). Every built route must be
// linked from at least one OTHER built page. Exempt: the two routes a visitor is never meant to
// reach by a link - /thank-you/ (the form's own redirect target, noindex) and the 404 page - and
// any article still at "review" status.
// That last exemption is the status gate in src/data/articles.ts doing its job, not a hole: an
// article the operator has not approved is DELIBERATELY noindex, out of the sitemap and out of every
// link, so it is unlinked by design and the orphan rule cannot apply to it. Found by running the
// real importer on a fixture batch (operator review 6, 25 Nov 2026): without this, the first engine
// article to land at review status would have failed the audit and blocked the whole release.
{
  const ORPHAN_OK = new Set(['/thank-you/', '/404/', ...review]);
  const built = pages.map(route).filter((r) => !RETIRED.test(r));
  const inbound = new Map(built.map((r) => [r, 0]));
  for (const file of pages) {
    const from = route(file);
    const html = readFileSync(file, 'utf8');
    const seen = new Set();
    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      let h = m[1]; if (!h.endsWith('/')) h += '/';
      if (h !== from && inbound.has(h)) seen.add(h);
    }
    for (const h of seen) inbound.set(h, inbound.get(h) + 1);
  }
  for (const [r, n] of inbound) if (!n && !ORPHAN_OK.has(r)) fails.push(`${r}: orphan page, nothing on the site links to it`);
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
