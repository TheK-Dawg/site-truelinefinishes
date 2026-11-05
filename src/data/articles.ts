/**
 * SEO ARTICLES at /resources/<hub-slug>-<town-slug>/ (plan, Build scope). Written by the article
 * engine (claude-seo-engine) from site-plan/seed.json AFTER handoff, a few a day, in the seed's
 * town order; imported by scripts/import-articles.mjs into articles.json.
 * STATUS GATE: test articles go to Brandon for comments first (23 Oct call). Anything not
 * `published` builds at its URL for review but is noindex, out of the sitemap, the listings and
 * every internal link.
 * VIDEO ROTATION (plan, Video; both hubs' content notes): the house video goes in EVERY
 * Painting and Decorating and Interior Painting article; by the town's publish order the 1st,
 * 4th, 7th ... article has it just above the first H2, the 2nd, 5th, 8th ... mid-article between
 * two H2 sections, the 3rd, 6th, 9th ... after the last H2 section and before the FAQ.
 * "Painting and Decorating in Harrogate" always has it above its first H2 (#harrogate tag).
 */
import data from './articles.json';
import { towns } from './site';

export interface Article {
  slug: string; // engine contract: <hub-slug>-<town-slug>
  hub: string; // hub slug
  town: string; // exact seed town name
  status: 'review' | 'published';
  title: string; // "<Hub> in <Town>"
  metaTitle: string;
  description: string;
  summary: string; // hero lead
  hero: string; // pool image key
  bodyHtml: string; // intro + H2 sections (engine HTML)
  faqs: { q: string; a: string }[];
  engine: { runId: string; rank?: number; source: string };
}

export const allArticles: Article[] = data as Article[];
export const articles = allArticles.filter((a) => a.status === 'published');
export const articleUrl = (a: Pick<Article, 'slug'>) => `/resources/${a.slug}/`;

export const VIDEO_HUBS = ['painting-and-decorating', 'interior-painting'];
export type VideoPos = 'top' | 'mid' | 'end' | null;
export function videoPosition(a: Pick<Article, 'hub' | 'town'>): VideoPos {
  if (!VIDEO_HUBS.includes(a.hub)) return null;
  if (a.hub === 'painting-and-decorating' && a.town === 'Harrogate') return 'top';
  const t = towns.find((x) => x.name === a.town);
  if (!t) return 'top';
  return (['top', 'mid', 'end'] as const)[(t.order - 1) % 3];
}
