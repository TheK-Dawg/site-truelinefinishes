// STATIC AUDIT over dist/: SEO plumbing, schema parse, banned copy, ANCHOR-LAW
// link rules, broken internal links, phased-rollout town links, word counts and
// cross-page 5-gram similarity. Exit 1 on any FAIL.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p); } };
walk(dist);

// The launch interlock decides what every non-utility page's robots meta must say.
const INDEXABLE = /INDEXABLE\s*=\s*true/.test(readFileSync(new URL('../src/data/launch.ts', import.meta.url), 'utf8'));

const fails = [];
const warns = [];
const texts = {};
const builtTowns = new Set(readdirSync(join(dist, 'areas')).filter((f) => statSync(join(dist, 'areas', f)).isDirectory()));
const serviceSlugs = new Set(['builders', 'house-extensions', 'brickwork', 'loft-conversions', 'structural-and-groundworks', 'renovation-and-refurbishment', 'patios-and-garden-walls', 'landscaping', 'carpentry', 'basement-conversions']);
const BANNED = [
  [/—|–/, 'em/en dash'], [/free quote/i, '"free quote"'], [/\bbespoke\b/i, 'bespoke'], [/\bcustom\b/i, 'custom'], [/\btailored\b/i, 'tailored'],
  [/30 years/i, '30 years'], [/£/, '£'], [/\d+\s?%/, 'percentage'], [/\bexperts?\b/i, 'expert'], [/\btrusted\b/i, 'trusted'], [/\bbest\b/i, 'best'],
  [/\bleading\b/i, 'leading'], [/\bseamless(ly)?\b/i, 'seamless'], [/peace of mind/i, 'peace of mind'], [/stress-free|hassle-free/i, 'x-free'],
  [/wheelchair|disabled adaptation/i, 'dropped service'], [/lorem|ipsum|TODO/i, 'placeholder text'], [/\bnestled\b|\bbustling\b/i, 'slop word'],
  [/get a quote/i, '"get a quote"'], [/read more/i, '"read more"'],
];
const route = (file) => '/' + relative(dist, file).replace(/index\.html$/, '').replace(/\.html$/, '/');
const exists = (href) => {
  const p = href.split('#')[0].split('?')[0];
  if (!p || p === '/') return true;
  const f = join(dist, p);
  return existsSync(join(f, 'index.html')) || existsSync(f);
};

for (const file of pages) {
  const r = route(file);
  const html = readFileSync(file, 'utf8');
  const utility = /404|thank-you/.test(r);
  const h1 = (html.match(/<h1\b/g) || []).length;
  if (h1 !== 1) fails.push(`${r}: ${h1} H1s`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const t = title.replace(/&amp;/g, '&');
  if (/&amp;amp;|&amp;#/.test(title)) fails.push(`${r}: double-escaped title "${title}"`);
  if (t.length < 40 || t.length > 70) warns.push(`${r}: title ${t.length} chars "${t}"`);
  if (desc.length < 120 || desc.length > 160) warns.push(`${r}: description ${desc.length} chars`);
  const robots = INDEXABLE && !utility ? 'index, follow' : 'noindex, nofollow';
  if (!html.includes(`<meta name="robots" content="${robots}"`)) fails.push(`${r}: robots meta is not "${robots}"`);
  if (!/<link rel="canonical" href="https:\/\/buildingsforlife\.com\//.test(html)) fails.push(`${r}: canonical missing`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); if (!j['@context'] || !Array.isArray(j['@graph'])) fails.push(`${r}: schema shape`); } catch (e) { fails.push(`${r}: schema JSON parse ${e.message}`); }
  }
  const main = (html.match(/<main[\s\S]*<\/main>/) || [''])[0];
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'");
  for (const [re, label] of BANNED) {
    const m = visible.match(new RegExp(`.{0,50}${re.source}.{0,50}`, re.flags.replace('g', '')));
    if (m && !(label === 'best' && /best-/.test(m[0]))) fails.push(`${r}: banned ${label}: "...${m[0].trim()}..."`);
  }
  for (const m of visible.matchAll(/.{0,60}\b(bathroom|garage conversion|en-?suite|wet room)s?\b.{0,60}/gi)) warns.push(`${r}: mentions "${m[1]}": ${m[0].replace(/\s+/g, ' ').trim()}`);

  // Links in <main>, breadcrumbs excluded (structural nav, exempt per ANCHOR-LAW 5).
  const body = main.replace(/<nav[^>]*aria-label="Breadcrumb"[\s\S]*?<\/nav>/g, '');
  const counts = {};
  for (const m of body.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const href = m[1];
    if (/^(tel:|mailto:|#|https?:)/.test(href)) continue;
    if (!exists(href)) fails.push(`${r}: broken link ${href}`);
    const path = href.split('#')[0];
    if (path === r && href.includes('#')) continue; // same-page anchor jump (engine CTA -> #contact), not a link
    if (path === r && !utility) fails.push(`${r}: self-link "${m[2].replace(/<[^>]+>/g, '').trim()}"`);
    counts[path] = (counts[path] || 0) + 1;
    const town = path.match(/^\/areas\/([^/]+)\/$/);
    if (town && !builtTowns.has(town[1])) fails.push(`${r}: link to unbuilt town ${path}`);
  }
  for (const [path, n] of Object.entries(counts)) {
    const slug = path.replace(/\//g, '');
    if (n > 1 && (serviceSlugs.has(slug) || path.startsWith('/resources/') && path !== '/resources/' || path.startsWith('/areas/') && path !== '/areas/')) fails.push(`${r}: ${n} links to ${path} (one per target per page)`);
  }
  // Card law: a card holds at most one link.
  for (const m of body.matchAll(/<li class="(sv__card|rl__card|ap__card|ah__card)[^"]*"[^>]*>([\s\S]*?)<\/li>/g)) {
    const n = (m[2].match(/<a\b/g) || []).length;
    if (n > 1) fails.push(`${r}: ${m[1]} with ${n} links`);
  }
  // Global: every internal href/src on the page resolves.
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) if (!exists(m[1])) fails.push(`${r}: missing asset/page ${m[1]}`);
  texts[r] = main.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
}

// Word counts + 5-gram similarity across content pages (shared components inflate it, so it is a guide).
const grams = (s) => { const w = s.split(/\W+/).filter(Boolean); const g = new Set(); for (let i = 0; i + 5 <= w.length; i++) g.add(w.slice(i, i + 5).join(' ')); return g; };
const content = Object.keys(texts).filter((r) => /^\/[a-z-]+\/$/.test(r) && serviceSlugs.has(r.replace(/\//g, '')) || /^\/areas\/[a-z-]+\/$/.test(r));
const G = Object.fromEntries(content.map((r) => [r, grams(texts[r])]));
let worst = { v: 0 };
for (let i = 0; i < content.length; i++) for (let j = i + 1; j < content.length; j++) {
  const a = G[content[i]], b = G[content[j]];
  let inter = 0; for (const x of a) if (b.has(x)) inter++;
  const v = inter / (a.size + b.size - inter);
  if (v > worst.v) worst = { v, a: content[i], b: content[j] };
}
console.log('WORDS (main):', Object.entries(texts).map(([r, t]) => `${r} ${t.split(' ').length}`).join(' | '));
console.log(`SIMILARITY: highest 5-gram Jaccard ${(worst.v * 100).toFixed(1)}% (${worst.a} vs ${worst.b}); shared components included`);
if (warns.length) console.log(`WARN (${warns.length}):\n` + warns.join('\n'));
if (fails.length) { console.log(`AUDIT: FAIL (${fails.length})\n` + fails.join('\n')); process.exit(1); }
console.log(`AUDIT: PASS (${pages.length} pages)`);
