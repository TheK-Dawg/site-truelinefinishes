/**
 * LAUNCH INTERLOCK. true = ordinary public pages carry `index, follow` (newly commissioned site:
 * indexable at publication). Utility pages (thank-you, 404) and articles still awaiting Brandon's
 * review stay noindex, and public/_headers keeps the workers.dev preview out of Google.
 */
export const INDEXABLE = true;
