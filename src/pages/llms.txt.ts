/**
 * /llms.txt — plain-text summary of the business for AI crawlers.
 * Generated from src/data (site.ts, articles.ts) so it can never drift from the site.
 * Links the full-site markdown (/llms-full.txt) and each article's .md twin (written
 * by the ai-files integration). Articles live at the engine's /<slug>/ URL, not under /resources/.
 */
import type { APIRoute } from 'astro';
import { business, facts, services, towns, seo } from '../data/site';
import { articles } from '../data/articles';
import { markdownPath } from '../lib/md-path.js';

export const GET: APIRoute = ({ site }) => {
  const origin = site!.toString().replace(/\/$/, '');

  const lines = [
    `# ${business.name}`,
    '',
    `> ${seo.description}`,
    '',
    `${business.name} is a family-run building company based in ${business.baseTown}, ${business.city}, covering ${towns.length} towns and villages across ${business.region}, UK. Run by ${business.owner}.`,
    `- ${facts.yearsLine}`,
    `- ${facts.stone}`,
    `- ${facts.guarantee}`,
    `- ${facts.bbc}`,
    `Phone: ${business.phone}. Email: ${business.email}. Hours: ${business.hours}. Company number ${business.companyNumber}.`,
    '',
    '## Full content',
    `- [Full site as markdown](${origin}/llms-full.txt): every page and article in one file`,
    `- Any page as markdown: add .md to its URL without the trailing slash (e.g. ${origin}/brickwork.md, home = ${origin}/index.md)`,
    '',
    '## Services',
    ...services.map((s) => `- [${s.name}](${origin}/${s.slug}/): ${s.short}`),
    '',
    ...(articles.length
      ? ['## Resources', ...articles.map((a) => `- [${a.title}](${origin}${markdownPath(`/${a.slug}/`)}): ${a.description}`), '']
      : []),
    '## Areas served',
    `- [All areas](${origin}/areas/)`,
    ...towns.map((t) => `- ${t.name}`),
    '',
    '## Key pages',
    `- [Services](${origin}/services/)`,
    `- [Resources](${origin}/resources/)`,
    `- [About](${origin}/about/)`,
    `- [FAQ](${origin}/faq/)`,
    `- [Contact and quote](${origin}/contact/)`,
  ];

  return new Response(lines.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
