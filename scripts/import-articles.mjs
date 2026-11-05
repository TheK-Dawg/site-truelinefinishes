// IMPORT THE SEO ENGINE'S ARTICLES INTO THE SITE (engine wiring; runs AFTER handoff).
//
// Source: the engine write stage's artefacts for this client, the exact bytes
// core/pipeline.mjs::writeOneArticle validated:
//   <engine>/clients/truelinefinishes.com/<run>/work/rank-N-article-out.json
//   + rank-N-result.json (verdicts) + rank-N-context.json (row, dials).
// Only ACCEPTED, non-export-blocked articles are imported. The engine's URL contract is
// /<hub>-<town>/; on this site articles live at /resources/<hub>-<town>/ (plan), so the slug is
// kept and the path is prefixed. Every imported article starts as status "review" (test
// articles go to Brandon for comments first); pass --publish <slug,...> to publish approved ones.
// The house-video position and the per-H2 photos are applied by the template, not here.
//
// Usage: node scripts/import-articles.mjs <run> [--engine /root/audit/claude-seo-engine] [--publish a,b]
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const RUN = args[0];
const opt = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };
if (!RUN) { console.error('usage: node scripts/import-articles.mjs <run> [--engine dir] [--publish slug,slug]'); process.exit(2); }
const ENGINE = opt('--engine', '/root/audit/claude-seo-engine');
const PUBLISH = new Set((opt('--publish', '') || '').split(',').filter(Boolean));
const DIR = path.join(ENGINE, 'clients/truelinefinishes.com', RUN, 'work');
const OUT = new URL('../src/data/articles.json', import.meta.url).pathname;
const HUBS = ['painting-and-decorating', 'interior-painting', 'exterior-painting', 'wallpapering', 'commercial-painting-and-decorating'];
// Hero photo per hub (Brandon's pool; plan hub picks). Any pool photo may illustrate any article it fits.
const HERO = { 'painting-and-decorating': 'victorian-hallway-0066', 'interior-painting': 'green-bedroom-0131', 'exterior-painting': 'stone-terrace-sash-windows-0028', wallpapering: 'leaf-pattern-feature-wall-0026', 'commercial-painting-and-decorating': 'office-navy-feature-wall-0177' };

const existing = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : [];
const bySlug = new Map(existing.map((a) => [a.slug, a]));
const ranks = fs.readdirSync(DIR).map((f) => f.match(/^rank-(\d+)-article-out\.json$/)).filter(Boolean).map((m) => Number(m[1])).sort((a, b) => a - b);
for (const n of ranks) {
  const read = (k) => JSON.parse(fs.readFileSync(path.join(DIR, `rank-${n}-${k}.json`), 'utf8'));
  const out = read('article-out'); const res = read('result'); const ctx = read('context');
  if (!res.accepted || res.exportBlocked) { console.log(`SKIP rank ${n} ${out.slug}: accepted=${res.accepted} exportBlocked=${res.exportBlocked}`); continue; }
  const hub = ctx.row.serviceSlug;
  if (!HUBS.includes(hub)) throw new Error(`rank ${n}: unknown hub ${hub}`);
  const slug = String(out.slug).replace(/^\/|\/$/g, '');
  const html = `${out.introHtml}\n${out.bodyHtml}`
    .replace(/href="https:\/\/(www\.)?truelinefinishes\.com\//g, 'href="/')
    .replace(/href="\/((?:painting-and-decorating|interior-painting|exterior-painting|wallpapering|commercial-painting-and-decorating)-[a-z0-9-]+)\/"/g, 'href="/resources/$1/"');
  let faqs = [];
  try { const j = JSON.parse(out.schemaJsonLd); faqs = (j.mainEntity || []).map((q) => ({ q: q.name, a: q.acceptedAnswer?.text ?? '' })); } catch { /* no FAQ schema */ }
  const prev = bySlug.get(slug);
  bySlug.set(slug, {
    slug, hub, town: out.town, status: PUBLISH.has(slug) || prev?.status === 'published' ? 'published' : 'review',
    title: out.pageTitle, metaTitle: out.seoTitle, description: out.metaDescription, summary: out.hero,
    hero: HERO[hub], bodyHtml: html, faqs,
    engine: { runId: RUN, rank: n, source: `${DIR}/rank-${n}-article-out.json` },
  });
  console.log(`rank ${n}: ${slug} (${res.measured?.wordCount ?? '?'} words, ${faqs.length} FAQs)`);
}
for (const s of PUBLISH) if (bySlug.has(s)) bySlug.get(s).status = 'published';
fs.writeFileSync(OUT, `${JSON.stringify([...bySlug.values()], null, 1)}\n`);
console.log(`wrote ${bySlug.size} articles -> src/data/articles.json`);
