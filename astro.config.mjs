// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import aiFiles from './src/integrations/ai-files.mjs';
import { INDEXABLE } from './src/data/launch.ts';

// Utility pages: out of the sitemap, and no markdown twin.
const UTILITY = /\/(thank-you|404)\/?$/;

// v3 client build, production since 26 Oct 2026. The apex is the canonical
// host for every canonical/OG/sitemap URL; www 301s to it at the zone.
export default defineConfig({
  site: 'https://buildingsforlife.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({ filter: (page) => !UTILITY.test(page) }),
    // Per-page .md twins + llms-full.txt, from the built HTML. Last: needs the sitemap.
    aiFiles({ indexable: INDEXABLE, skip: UTILITY }),
  ],
});
