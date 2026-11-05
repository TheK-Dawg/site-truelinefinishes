// IMPORT THE SEO ENGINE'S ARTICLES INTO THE SITE (no hand-written article content).
//
// Source: the engine write stage's artefacts for this client, i.e. the exact bytes
// core/pipeline.mjs::writeOneArticle validated and would store in D1 `articles`:
//   /root/audit/claude-seo-engine/clients/buildingsforlifeltd.com/<run>/work/rank-N-article-out.json
//   + rank-N-result.json (engine verdicts) + rank-N-context.json (row, dials).
// Only ACCEPTED, non-export-blocked articles are imported.
//
// Transformations (markup plumbing only, never the words or the link targets):
//   - same-domain absolute hrefs -> root-relative, so the links resolve on the test URL;
//   - ids added to <h2> for the table of contents;
//   - the FAQ list is read back out of the engine's own FAQPage JSON-LD for the page schema.
import fs from 'node:fs';
import path from 'node:path';

const RUN = process.argv[2] || 'seed-staging';
const DIR = `/root/audit/claude-seo-engine/clients/buildingsforlifeltd.com/${RUN}/work/`;
const OUT = new URL('../src/data/articles.json', import.meta.url).pathname;
const HERO = { 'house-extensions': ['rear-extension-glazing', 'Large brick house with a wide glazed rear extension opening onto the lawn'], builders: ['new-build-brickwork', 'Detached new build in grey and red brick with the roof on and groundworks still open'], 'loft-conversions': ['loft-insulation', 'Insulation boards fitted between new roof rafters during a loft build'], 'structural-and-groundworks': ['groundworks-drainage', 'Excavated trench with a drainage pipe beneath a timber lintel'], 'renovation-and-refurbishment': ['tudor-house-renovation', 'Tudor-style house under renovation with scaffolding and large new glazing'], carpentry: ['oak-and-brick-well', 'Round brick well with an oak frame and shingled timber roof'] };
const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const ranks = fs.readdirSync(DIR).map((f) => f.match(/^rank-(\d+)-article-out\.json$/)).filter(Boolean).map((m) => Number(m[1])).sort((a, b) => a - b);
const articles = [];
for (const n of ranks) {
  const out = JSON.parse(fs.readFileSync(path.join(DIR, `rank-${n}-article-out.json`), 'utf8'));
  const res = JSON.parse(fs.readFileSync(path.join(DIR, `rank-${n}-result.json`), 'utf8'));
  const ctx = JSON.parse(fs.readFileSync(path.join(DIR, `rank-${n}-context.json`), 'utf8'));
  if (!res.accepted || res.exportBlocked) { console.log(`SKIP rank ${n} ${out.slug}: accepted=${res.accepted} exportBlocked=${res.exportBlocked}`); continue; }
  const seen = new Set();
  const html = `${out.introHtml}\n${out.bodyHtml}`
    .replace(/href="https:\/\/buildingsforlifeltd\.com\//g, 'href="/')
    .replace(/<h2>([\s\S]*?)<\/h2>/g, (m, inner) => { let id = slugify(inner) || 'section'; while (seen.has(id)) id += '-2'; seen.add(id); return `<h2 id="${id}">${inner}</h2>`; });
  let faqs = [];
  try { const j = JSON.parse(out.schemaJsonLd); faqs = (j.mainEntity || []).map((q) => ({ q: q.name, a: q.acceptedAnswer?.text ?? '' })); } catch { /* no FAQ schema */ }
  const svcSlug = ctx.row.serviceSlug;
  const [heroSlug, heroAlt] = HERO[svcSlug] || HERO.builders;
  articles.push({
    slug: out.slug, title: out.pageTitle, metaTitle: out.seoTitle, description: out.metaDescription,
    topic: out.service, summary: out.hero, hero: `/images/work/${heroSlug}.webp`, heroAlt,
    related: svcSlug, town: out.town, bodyHtml: html, faqs,
    words: res.measured?.wordCount ?? null,
    engine: { runId: RUN, rank: n, publishDate: ctx.row.publishDate, persona: ctx.row.persona, gates: `accepted=${res.accepted} exportBlocked=${res.exportBlocked} failures=${(res.failures || []).length}`, url: out.url },
  });
  console.log(`rank ${n}: ${out.slug} (${res.measured?.wordCount} words, ${faqs.length} FAQs, publish ${ctx.row.publishDate})`);
}
fs.writeFileSync(OUT, `${JSON.stringify(articles, null, 1)}\n`);
console.log(`wrote ${articles.length} articles -> src/data/articles.json`);
