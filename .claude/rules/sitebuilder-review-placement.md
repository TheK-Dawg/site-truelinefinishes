---
name: sitebuilder-review-placement
description: Use when building/revising SiteBuilder sites — review rules.
---

# Review placement rules (Vince standard, 10 Sep 2026)

Applies to EVERY LMB/SiteBuilder site build. Reviews are a standard, not an option.

## Where reviews go (every site)
1. **Hero section** — slimline review strip: Google mark + stars + "4.9 from 30 reviews"
   style text, linking to the real GBP listing URL. Position: under the hero paragraph
   and/or under the hero buttons. Hero spacing must stay tight — no large gap between
   paragraph and buttons.
2. **Quick-quote / form section** — same slimline review strip (can reuse component),
   near the form heading.
3. **Bottom-left fixed review badge** — a different badge component (e.g. floating
   card with stars + rating) linking out to the GBP.

## Data rules
- Only real GBP data: rating, review count, listing URL — from the site-planner ledger
  (ledger.json → gbp: reviews, rating, listingUrl, cid) or supplied by client.
- NEVER invent ratings/counts. If a site genuinely has no GBP reviews, omit the review
  surfaces rather than fake them, and flag it to Vince.
- Link all review displays to the real listingUrl.
- If client has a TrustIndex account, reviews can later be created/managed via browser
  automation (Vince's TrustIndex account) — future capability, not built yet.

## Build notes
- Clone is a GUIDE: sections can be added/changed per site; house standards like reviews
  must be added even if the clone source lacked them.
- spec should carry gbp fields (rating, reviews, listingUrl) so components read real data.
- Boilerplate rule to promote: review surfaces + spacing law (hero paragraph → buttons
  gap must be small) into the boilerplate at next batch retro.