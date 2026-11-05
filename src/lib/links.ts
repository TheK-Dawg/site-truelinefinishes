/**
 * Collect the internal service targets linked contextually in authored HTML,
 * so cards further down the page can render those names as plain text
 * (ANCHOR LAW 4: one follow link per target per page).
 */
export function linkedSlugs(...html: (string | undefined)[]): Set<string> {
  const out = new Set<string>();
  for (const h of html) for (const m of (h ?? '').matchAll(/href="\/([a-z0-9-]+)\/"/g)) out.add(m[1]);
  return out;
}

export const stripTags = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
