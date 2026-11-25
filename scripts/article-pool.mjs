// ARTICLE PHOTO INVENTORY, per hub (operator review 6, 25 Nov 2026: "make an honest per-service
// suitable-photo inventory and block off-topic fallbacks").
//
// Prints, for every hub, how many of Brandon's photographs genuinely show that service and are
// therefore available to illustrate an article in it - that is the FIGURE BUDGET an article in that
// hub has. The renderer (ArticlePage.astro) and the gate (scripts/audit.mjs) read the same rule out
// of src/lib/article-photos.js, so this is the same arithmetic that ships, not a separate estimate.
//
// Run it before handing a batch to the engine: an article with more H2s than its hub's budget simply
// carries fewer figures (it never repeats and never borrows another service's photographs).
// Usage: node scripts/article-pool.mjs [--json]
import { readFileSync } from 'node:fs';
import { articlePhotoPool, photoSubject, HUB_SUBJECTS } from '../src/lib/article-photos.js';

const images = JSON.parse(readFileSync(new URL('../src/data/images.json', import.meta.url), 'utf8'));
const articles = JSON.parse(readFileSync(new URL('../src/data/articles.json', import.meta.url), 'utf8'));
// The hero each hub's articles use, as scripts/import-articles.mjs assigns it.
const HERO = { 'painting-and-decorating': 'victorian-hallway-0066', 'interior-painting': 'green-bedroom-0131', 'exterior-painting': 'stone-terrace-sash-windows-0028', wallpapering: 'leaf-pattern-feature-wall-0026', 'commercial-painting-and-decorating': 'office-navy-feature-wall-0177' };

const bySubject = {};
for (const i of images) { const s = photoSubject(i) ?? `(not an article figure: ${i.cat})`; bySubject[s] = (bySubject[s] || 0) + 1; }

const rows = Object.keys(HUB_SUBJECTS).map((hub) => {
  const hero = HERO[hub];
  const pool = articlePhotoPool(images, hub, hero);
  const live = articles.filter((a) => a.hub === hub);
  return { hub, subjects: HUB_SUBJECTS[hub], hero, budget: pool.length, articles: live.length, published: live.filter((a) => a.status === 'published').length };
});

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ images: images.length, bySubject, hubs: rows }, null, 1));
} else {
  console.log(`photographs on the site: ${images.length}`);
  for (const [k, v] of Object.entries(bySubject).sort()) console.log(`  ${k}: ${v}`);
  console.log('\nfigure budget per article, by hub (hero excluded, no repeats, no borrowing):');
  for (const r of rows) {
    console.log(`  ${r.hub.padEnd(36)} ${String(r.budget).padStart(3)} photographs  [${r.subjects.join(', ')}]  hero ${r.hero}  articles ${r.published}/${r.articles} published`);
    if (r.budget === 0) console.log(`      ^ an article in this hub carries its hero only. More ${r.subjects.join('/')} photographs are needed from Brandon before it can carry figures.`);
    else if (r.budget < 4) console.log(`      ^ thin: an article with more than ${r.budget} H2 sections will carry figures above only the first ${r.budget}.`);
  }
}
