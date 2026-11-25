/**
 * WHICH OF BRANDON'S PHOTOGRAPHS MAY ILLUSTRATE AN ARTICLE IN WHICH HUB.
 * Shared by src/data/articles.ts (the renderer picks the figures) and scripts/audit.mjs (the gate
 * proves, on the BUILT pages, that nothing else got in), so the two can never disagree - the same
 * arrangement as md-path.js.
 *
 * OPERATOR REVIEW 6 (25 Nov 2026), on the resources path the SEO engine will publish into: the
 * articles must use the "correct service-matched photo pool" and "block off-topic fallbacks".
 *
 * Before this, the renderer ranked whole CATEGORIES per hub and CONCATENATED the fallbacks. Two
 * things went wrong with that. The before-after folder mixes interior and exterior jobs, so an
 * Interior Painting article could be illustrated with a gable wall and the front of a house. And a
 * Wallpapering article, whose own category holds exactly one photograph, was padded with up to 147
 * interior painting shots, none of which show wallpaper.
 *
 * Now a photograph carries a SUBJECT and a hub accepts only its own subjects. There is no fallback
 * chain at all. SUBJECT is the category, except in the before-after folder, which is split by what
 * the job actually was: the bathroom and bedroom pairs are interior work, the gable-wall and
 * semi-detached pairs are exterior work. Only the "after" frame of a pair is ever an article figure
 * (a "before" above an H2 shows the problem, not the work).
 *
 * Consequence, recorded honestly rather than papered over: a WALLPAPERING article carries its hero
 * photograph and no body figures, because TrueLine has exactly one wallpapering photograph in R2 and
 * it is that hero. `node scripts/article-pool.mjs` prints the per-hub inventory, and the figure
 * budget it reports is what Kieran's batch has to live within until Brandon supplies more.
 */
export const BEFORE_AFTER_SUBJECT = {
  'bathroom-after': 'interior',
  'bedroom-after': 'interior',
  'gable-wall-after': 'exterior',
  'semi-detached-after': 'exterior',
};

/** Which subjects genuinely show the work an article in this hub is about. No chain, no fallback. */
export const HUB_SUBJECTS = {
  'painting-and-decorating': ['interior', 'exterior', 'wallpapering', 'commercial'],
  'interior-painting': ['interior'],
  'exterior-painting': ['exterior'],
  wallpapering: ['wallpapering'],
  'commercial-painting-and-decorating': ['commercial'],
};

const SUBJECTS = ['interior', 'exterior', 'wallpapering', 'commercial'];

/** The subject a photograph shows, or null when it may never be an article figure. */
export function photoSubject(img) {
  // A "before" frame shows the problem, not the work, so it is never a figure above an H2. The name
  // carries it in every folder, not just before-after: painted-brick-side-before is in `exterior`
  // and room-before-patched is in `interior`.
  if (/-before-/.test(img.key)) return null;
  if (img.cat === 'before-after') return BEFORE_AFTER_SUBJECT[img.key.replace(/-\d+$/, '')] ?? null;
  return SUBJECTS.includes(img.cat) ? img.cat : null;
}

/** Every photograph that may illustrate an article in this hub, hero excluded, in key order. */
export function articlePhotoPool(images, hub, heroKey) {
  const want = HUB_SUBJECTS[hub];
  if (!want) throw new Error(`articlePhotoPool: unknown hub ${hub}`);
  return images.filter((i) => {
    if (i.key === heroKey) return false;
    const subject = photoSubject(i);
    return subject !== null && want.includes(subject);
  });
}
