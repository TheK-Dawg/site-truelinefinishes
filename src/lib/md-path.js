/**
 * Page path → its markdown twin: /brickwork/ → /brickwork.md, / → /index.md.
 * Shared by the ai-files integration (writes the files), Base.astro (rel=alternate)
 * and llms.txt (links), so the three can never disagree.
 */
export function markdownPath(pathname) {
  const p = pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '');
  return p ? `${p}.md` : '/index.md';
}
