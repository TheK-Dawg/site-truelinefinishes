/**
 * ai-files — AI/GEO outputs written after every build, from the built HTML itself
 * so they can never drift from what the site actually shows:
 *
 *   /<page>.md       every page's <main> as clean markdown
 *                    (/brickwork/ → /brickwork.md, / → /index.md)
 *   /llms-full.txt   all of those pages in one file (the sitemap's pages, home first)
 *
 * Chrome that carries no content is dropped: header/footer (outside <main>), nav,
 * aside, forms, buttons, scripts, SVG icons, images. Utility pages (`skip`, the same
 * pattern the sitemap filter uses) get no markdown. Once the site is `indexable`,
 * noindex pages are skipped too; before that (test build, every page noindex) the
 * noindex tag is ignored so the output can be checked ahead of go-live.
 * Must run after @astrojs/sitemap in the integrations list (build:done hooks run in
 * order) so the sitemap files exist.
 * Portable: nothing here is site-specific — copy the file + md-path.js and add
 * `aiFiles({ indexable, skip })` to astro.config.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative, sep } from 'node:path';
import * as cheerio from 'cheerio';
import { markdownPath } from '../lib/md-path.js';

// [data-ai-skip] opts a site-wide band (reviews carousel, quote form) out, so it is
// not repeated on every page of llms-full.txt.
const DROP = 'script, style, noscript, template, svg, img, picture, video, audio, iframe, canvas, form, button, input, select, textarea, nav, aside, dialog, [hidden], [aria-hidden="true"], .skip-link, [data-ai-skip]';
const BLOCK = new Set(['address', 'article', 'blockquote', 'dd', 'details', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'ol', 'p', 'pre', 'section', 'summary', 'table', 'ul']);

const text = (s) => s.replace(/\s+/g, ' ');

/** HTML <main> → markdown. `origin` makes relative links absolute. */
export function htmlToMarkdown(html, origin) {
  const $ = cheerio.load(html);
  const main = $('main').first();
  const root = main.length ? main : $('body');
  root.find(DROP).remove();

  const isBlock = (el) => el.type === 'tag' && (BLOCK.has(el.name) || $(el).find([...BLOCK].join(',')).length > 0);

  const inline = (nodes) =>
    nodes
      .map((n) => {
        if (n.type === 'text') return text(n.data);
        if (n.type !== 'tag') return '';
        const inner = inline(n.children);
        switch (n.name) {
          case 'br': return '\n';
          // Emphasis only around words — not decorative separators like <i>•</i>.
          case 'strong': case 'b': return /\w/.test(inner) ? `**${inner.trim()}**` : inner;
          case 'em': case 'i': return /\w/.test(inner) ? `*${inner.trim()}*` : inner;
          case 'code': return `\`${inner}\``;
          case 'a': {
            const href = n.attribs.href ?? '';
            const label = inner.trim();
            // In-page jumps are CTA buttons ("Quick Quote Online" → #contact): no content.
            if (href.startsWith('#')) return '';
            if (!label || !href || href.startsWith('javascript:')) return inner;
            let abs = href;
            try { abs = new URL(href, origin + '/').href; } catch {}
            // Button rows put links side by side with no text between them.
            const gap = n.prev?.type === 'tag' ? ' ' : '';
            return `${gap}[${label}](${abs})`;
          }
          default: return inner;
        }
      })
      .join('');

  const para = (s) => s.replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/ {2,}/g, ' ').trim();

  /** Children → array of markdown blocks; inline runs between blocks become paragraphs. */
  const blocks = (nodes) => {
    const out = [];
    let buf = [];
    const flush = () => {
      const p = para(inline(buf));
      if (p) out.push(p);
      buf = [];
    };
    for (const n of nodes) {
      if (n.type === 'tag' && isBlock(n)) {
        flush();
        out.push(...block(n));
      } else buf.push(n);
    }
    flush();
    return out;
  };

  const list = (el, ordered) =>
    $(el).children('li').toArray().map((li, i) => {
      const [first = '', ...rest] = blocks(li.children);
      const bullet = ordered ? `${i + 1}. ` : '- ';
      const pad = ' '.repeat(bullet.length);
      return bullet + [first, ...rest].join('\n\n').split('\n').join('\n' + pad);
    }).join('\n');

  const block = (el) => {
    const name = el.name;
    if (/^h[1-6]$/.test(name)) {
      const t = para(inline(el.children)).replace(/\n/g, ' ');
      return t ? [`${'#'.repeat(Number(name[1]))} ${t}`] : [];
    }
    if (name === 'p' || name === 'dt' || name === 'dd' || name === 'figcaption') {
      if ($(el).find([...BLOCK].join(',')).length) return blocks(el.children);
      const t = para(inline(el.children));
      return t ? [t] : [];
    }
    if (name === 'summary') {
      const t = para(inline(el.children)).replace(/\n/g, ' ');
      return t ? [`### ${t}`] : [];
    }
    if (name === 'ul' || name === 'ol') {
      const l = list(el, name === 'ol');
      return l.trim() ? [l] : [];
    }
    if (name === 'blockquote') return blocks(el.children).map((b) => b.replace(/^/gm, '> '));
    if (name === 'pre') return ['```\n' + $(el).text().replace(/\n$/, '') + '\n```'];
    if (name === 'hr') return ['---'];
    if (name === 'table') {
      const rows = $(el).find('tr').toArray().map((tr) =>
        $(tr).children('th, td').toArray().map((c) => para(inline(c.children)).replace(/\n/g, ' ').replace(/\|/g, '\\|')),
      ).filter((r) => r.length);
      if (!rows.length) return [];
      const w = Math.max(...rows.map((r) => r.length));
      const line = (r) => `| ${[...r, ...Array(w - r.length).fill('')].join(' | ')} |`;
      return [[line(rows[0]), line(Array(w).fill('---')), ...rows.slice(1).map(line)].join('\n')];
    }
    return blocks(el.children);
  };

  const out = blocks(root.get(0).children)
    // Collapse consecutive duplicates (e.g. a card title repeated as its link text).
    .filter((b, i, a) => b !== a[i - 1]);
  return out.join('\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

/** Page paths listed in the sitemap: sitemap.xml, or @astrojs/sitemap's sitemap-N.xml shards. */
async function sitemapPaths(root) {
  const files = (await readdir(root)).filter((f) => /^sitemap(-\d+)?\.xml$/.test(f));
  if (!files.length) return null;
  const paths = new Set();
  for (const f of files) {
    const xml = await readFile(join(root, f), 'utf8');
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) paths.add(new URL(m[1]).pathname);
  }
  return paths;
}

const attr = ($, sel, a) => ($(sel).attr(a) ?? '').trim();

/**
 * @param {{ indexable?: boolean, skip?: RegExp }} [opts]
 *   indexable: the launch interlock. false = obey `skip` only (every page is noindex).
 *   skip: page paths that never get markdown (thank-you, 404).
 */
export default function aiFiles({ indexable = true, skip } = {}) {
  let origin = '';
  return {
    name: 'ai-files',
    hooks: {
      'astro:config:done': ({ config }) => {
        origin = (config.site ?? 'http://localhost:4321').replace(/\/$/, '');
      },
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const pages = [];
        for (const file of await walk(root)) {
          const path = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
          if (skip?.test(path)) continue;
          const html = await readFile(file, 'utf8');
          const $ = cheerio.load(html);
          if (indexable && /noindex/i.test(attr($, 'meta[name="robots"]', 'content'))) continue;
          const url = attr($, 'link[rel="canonical"]', 'href') || origin + path;
          const title = $('title').first().text().trim();
          const description = attr($, 'meta[name="description"]', 'content');
          const body = htmlToMarkdown(html, origin);
          const front = ['---', `title: ${JSON.stringify(title)}`, `description: ${JSON.stringify(description)}`, `url: ${url}`, '---', ''].join('\n');
          await writeFile(join(root, markdownPath(path)), front + '\n' + body);
          pages.push({ path, url, title, body });
        }

        // llms-full.txt = the sitemap's pages (legal/utility pages stay out, as there).
        const listed = await sitemapPaths(root);
        const full = pages
          .filter((p) => !listed || listed.has(p.path))
          .sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)));
        const head = [
          `# ${origin.replace(/^https?:\/\/(www\.)?/, '')} — full site content`,
          '',
          `> Every page of ${origin} as markdown, in one file (${full.length} pages). Summary and key links: ${origin}/llms.txt. Each page is also served on its own at <page-url>.md.`,
        ].join('\n');
        const parts = full.map((p) => `URL: ${p.url}\nMarkdown: ${origin}${markdownPath(p.path)}\n\n${p.body.trim()}`);
        await writeFile(join(root, 'llms-full.txt'), [head, ...parts].join('\n\n---\n\n') + '\n');
        logger.info(`${pages.length} page .md files, llms-full.txt (${full.length} pages)`);
      },
    },
  };
}
