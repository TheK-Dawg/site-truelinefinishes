// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import aiFiles from './src/integrations/ai-files.mjs';
import { INDEXABLE } from './src/data/launch.ts';
import articles from './src/data/articles.json' with { type: 'json' };

// Utility pages and articles still in review: out of the sitemap, and no markdown twin.
const REVIEW = articles.filter((a) => a.status !== 'published').map((a) => `/resources/${a.slug}/`);
const UTILITY = /\/(thank-you|404)\/?$/;
const skip = (page) => UTILITY.test(page) || REVIEW.some((r) => page.endsWith(r));

// TrueLine Finishes client site. The canonical host is www (Brandon's own "Www.truelinefinishes.com");
// the apex 301s to it at the zone when DNS goes live.
export default defineConfig({
  site: 'https://www.truelinefinishes.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({ filter: (page) => !skip(page) }),
    aiFiles({ indexable: INDEXABLE, skip: UTILITY }),
  ],
});
