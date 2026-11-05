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

if (process.argv.includes('--selftest')) {
  const bad = ['Get a free quote today', 'We guarantee it — always', 'Our team of staff', 'Call 07706 215917', '8 years experience', 'Trueline Finishes Ltd', 'Many five-star reviews', 'across West Yorkshire'];
  const missed = bad.filter((b) => copyFails(b, false).length === 0);
  const good = ["Over eight years' experience. Get a free quotation from Brandon.", 'TrueLine Finishes, fully insured'];
  const falsePos = good.filter((g) => copyFails(g, false).length > 0);
  if (missed.length || falsePos.length) { console.error('SELFTEST FAIL', { missed, falsePos: falsePos.map((g) => [g, copyFails(g, false)]) }); process.exit(1); }
  console.log(`selftest: ${bad.length} bad strings caught, ${good.length} good strings pass`);
  process.exit(0);
}

const dist = new URL('../dist/', import.meta.url).pathname;
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p); } };
walk(dist);
const articles = JSON.parse(readFileSync(new URL('../src/data/articles.json', import.meta.url), 'utf8'));
const review = new Set(articles.filter((a) => a.status !== 'published').map((a) => `/resources/${a.slug}/`));
const fails = []; const warns = [];
const route = (file) => '/' + relative(dist, file).replace(/index\.html$/, '').replace(/\.html$/, '/');
const exists = (href) => { const p = href.split('#')[0].split('?')[0]; if (!p || p === '/') return true; const f = join(dist, p); return existsSync(join(f, 'index.html')) || existsSync(f); };
const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
const slotTodo = (html) => /data-trustindex-state="live"/.test(html) || /data-trustindex-todo="TODO-TrustIndex-ID"/.test(html);
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
    if (/VideoObject/.test(m[1])) fails.push(`${r}: VideoObject schema (no video is embedded)`);
  }
  const text = visibleText(html);
  for (const f of copyFails(text, isArticle)) fails.push(`${r}: ${f}`);
  if (/class="eyebrow"/.test(html)) fails.push(`${r}: eyebrow label`);
  if (!text.includes('07949 484274')) fails.push(`${r}: phone missing`);
  if (!/Monday to Friday 7am to 7pm/.test(text) || !/Saturday and Sunday 8am to 6pm/.test(text)) fails.push(`${r}: footer hours missing`);
  if (!text.includes("Proud to support A Child's Wish, a children's charity.")) fails.push(`${r}: charity line missing from footer`);
  if (!html.includes('href="https://wa.me/447949484274"')) fails.push(`${r}: WhatsApp link missing`);
  const contactIds = (html.match(/id="contact"/g) || []).length;
  if (!utility) {
    if (contactIds !== 1) fails.push(`${r}: ${contactIds} id="contact" (need exactly 1, the form)`);
    if (!/data-lead-form="f_5ELbk5JcKfFh2EEaclT6" data-lf-token="npGnYEsjXAHrYRp13No3gA"/.test(html)) fails.push(`${r}: Formlane slot missing`);
    if (!html.includes('https://api.formlane.uk/edge/form.js')) fails.push(`${r}: form.js missing`);
    if (!text.includes('Any submission through this form is secure. We do not sell your details to third parties.')) fails.push(`${r}: security line missing`);
    if (!html.includes('data-trustindex-slot="reviews"')) fails.push(`${r}: reviews section missing`);
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
  // LMB credit; the reviews slot keeps its TODO-TrustIndex-ID marker; no Google-reviews line in
  // the hero; the home map is the Google listing (CID); list-of-services H2s are banned.
  if (/youtube(-nocookie)?\.com\/embed|data-video=/.test(html)) fails.push(`${r}: YouTube embed (round 2: none anywhere)`);
  const hero = (html.match(/<section[^>]*data-section="hero"[\s\S]*?<\/section>/) || [''])[0];
  if (/<iframe|data-video=|data-lead-form|<form\b|\/brand\/logo/.test(hero)) fails.push(`${r}: hero carries a video, a form or the logo`);
  if (!/404|thank-you/.test(r)) {
    if (!/class="hero on-dark section-hero[^"]*"[^>]*data-hero="(home|page)"/.test(hero) || !/class="hero__bg"/.test(hero)) fails.push(`${r}: hero is not the shared home-hero pattern`);
    if (/ph__img|class="ph /.test(html)) fails.push(`${r}: old inner hero / side image`);
    if (/reviews on Google/i.test(visibleText(hero))) fails.push(`${r}: Google reviews line still in the hero`);
  }
  for (const m of html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)) if (/^interior painting, exterior painting and wallpapering$/i.test(visibleText(m[1]).trim())) fails.push(`${r}: banned list heading "${visibleText(m[1]).trim()}"`);
  if (r === '/' && !/data-section="areas"[\s\S]*?data-map="gbp"[\s\S]*?src="https:\/\/www\.google\.com\/maps\?cid=8023434379390696838&amp;output=embed"/.test(html)) fails.push('/: areas map is not the Google listing CID embed');
  if (/data-ba\b|before-and-after|class="ba[ _]/i.test(html)) fails.push(`${r}: before-and-after slider`);
  if (/text-decoration:\s*underline|text-decoration-line:\s*underline/.test(html)) fails.push(`${r}: underline style in the page`);
  if (!/data-footer-credit/.test(html) || !/href="https:\/\/localmapbooster\.com\/" rel="nofollow noopener"/.test(html)) fails.push(`${r}: footer LMB credit missing`);
  if (!utility && !slotTodo(html)) fails.push(`${r}: reviews slot lost its TODO-TrustIndex-ID marker`);
  if (!utility && !/<h2 class="rv__h2"[^>]*>What customers say about us<\/h2>/.test(html)) fails.push(`${r}: reviews heading is not "What customers say about us"`);
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
