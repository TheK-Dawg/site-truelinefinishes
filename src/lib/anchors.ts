/**
 * ANCHOR PLAN (v3) — the SEO engine's internal-linking rules, wired into the v3 templates.
 *
 * Source of truth: /root/audit/claude-seo-engine/core/link-plan-v2.mjs + variant-pool.mjs
 * and context/03-SEO-STANDARD.md ("Internal linking") + context/SEO-DETAIL.md §0.
 *
 * THE OPERATOR'S CARD LAW (22 Sep, binding):
 *  - A service card's ONLY link is the service-name title itself: exact service name as the
 *    anchor text, canonical href to that service page. One follow link per page per target.
 *  - Buttons, arrow icons, whole-card wraps are NOT links — the anchor text lives only on
 *    the title link so Google's anchor = the card title = the destination page's subject.
 *  - Article cards: same rule — the title (or the named button) is the only link.
 *  - SEO articles' internal links are the SEO engine's business; this module never touches
 *    article bodies.
 *  - No cannibalisation: one core keyword → one canonical target; the same (href,anchor)
 *    pair must never repeat across the page (structural nav excluded).
 *
 * The variant pool (DataForSEO keyword CSVs in the site plan) is used for CONTEXTUAL in-body
 * links (70/30 keyword/natural, ≤6 words) — NOT for card titles, which stay the exact
 * service name per the card law above.
 */

export interface CardLink {
  href: string;
  anchor: string;
}

/** Track (href,anchor) pairs used on one page so no pair repeats. */
export class AnchorLedger {
  private used = new Set<string>();
  has(href: string, anchor: string): boolean {
    return this.used.has(`${href}::${anchor.toLowerCase()}`);
  }
  add(href: string, anchor: string): void {
    this.used.add(`${href}::${anchor.toLowerCase()}`);
  }
  /** Count of inbound links already pointing at a target across the page. */
  private inbound = new Map<string, number>();
  inboundCount(href: string): number {
    return this.inbound.get(href) ?? 0;
  }
  noteInbound(href: string): void {
    this.inbound.set(href, (this.inbound.get(href) ?? 0) + 1);
  }
}

/**
 * Build the ONE canonical card link for a service card.
 * - anchor: the exact service name (card title law).
 * - href: canonical service page, trailing slash.
 * Returns the link only if this page hasn't already linked that target (one link per target
 * per page, per the cannibalisation law). Callers must render nothing else as a link —
 * the arrow/icon is decoration, never an <a>.
 */
export function serviceCardLink(s: { name: string; slug: string }, ledger: AnchorLedger): CardLink | null {
  const href = `/${s.slug}/`;
  if (ledger.inboundCount(href) > 0) return null; // one follow link per target per page
  const anchor = s.name.trim();
  if (ledger.has(href, anchor)) return null;
  ledger.add(href, anchor);
  ledger.noteInbound(href);
  return { href, anchor };
}

/**
 * Article card link: title-only anchor (never "Read more"), canonical href, once per page.
 */
export function articleCardLink(a: { title: string; slug: string }, ledger: AnchorLedger): CardLink | null {
  // Articles live at the SEO engine's URL contract (`/<service>-<town>/`), not under /resources/.
  const href = `/${a.slug}/`;
  if (ledger.inboundCount(href) > 0) return null;
  const anchor = a.title.trim();
  if (ledger.has(href, anchor)) return null;
  ledger.add(href, anchor);
  ledger.noteInbound(href);
  return { href, anchor };
}

/**
 * In-body contextual anchor from the service's DataForSEO variant pool (used by the article
 * engine only — service pages do not emit contextual variant anchors).
 * Ported rules: 70% keyword variants / 30% natural frames, ≤6 words, no superlatives,
 * never the same anchor text twice to one target, allowlist filter (real ways people name
 * the service, not intent/place/noise keywords).
 */
const KEYWORD_SHARE = 0.7;
const MAX_ANCHOR_WORDS = 6;
const MODIFIER_ALLOWLIST = new Set([
  "emergency", "24/7", "24 hour", "same day", "local", "professional", "certified",
  "gas safe", "domestic", "commercial", "affordable", "expert",
]);

export interface VariantRow { phrasing: string; avg_monthly_volume: number }

/** Allowlist filter: keep only phrasings that name the service (modifiers allowed). */
export function buildVariantPool(rows: VariantRow[]): string[] {
  const seen = new Set<string>();
  const pool: string[] = [];
  for (const row of rows) {
    const p = row.phrasing.trim().toLowerCase();
    if (seen.has(p) || p.split(/\s+/).length > MAX_ANCHOR_WORDS) continue;
    // every token is either in the allowlist or part of the service phrasing family —
    // the seed CSVs are already per-service research, so we accept them but drop obvious
    // non-name noise (places, costs, ideas, images):
    if (/(cost|price|ideas|image|picture|near me|jobs|salary|course|insurance|tool)/i.test(p)) continue;
    seen.add(p);
    pool.push(p);
  }
  return pool;
}

/**
 * Deterministic variant anchor picker for in-body contextual links.
 * `used` carries anchors already emitted to this target across the corpus.
 */
export function pickContextualAnchor(
  pool: string[],
  used: Set<string>,
  rng: () => number = Math.random,
): string | null {
  const usable = pool.filter((p) => !used.has(p) && p.split(/\s+/).length <= MAX_ANCHOR_WORDS);
  if (!usable.length) return null;
  // 70%: keyword variant verbatim; 30%: natural frame around the variant.
  if (rng() < KEYWORD_SHARE) return usable[Math.floor(rng() * usable.length)];
  const frames = [
    (v: string) => `our ${v} service`,
    (v: string) => `${v} by our team`,
    (v: string) => `more about our ${v}`,
  ];
  const frame = frames[Math.floor(rng() * frames.length)];
  const text = frame(usable[Math.floor(rng() * usable.length)]);
  return used.has(text) ? null : text;
}
