# TrueLine Finishes (truelinefinishes.com): site repo

Client site for TrueLine Finishes (Brandon Dawson), painter and decorator. Built on the Buildings
for Life v4 structure ONLY: TrueLine's own brand, words and photos.

## Read first, in this order
1. `site-plan/SITE-PLAN.md`: the approved plan (fingerprint 7495853204d1a803,
   `site-plan/APPROVED-BY-OPERATOR`). It is LAW. Section 1 is the build spec; Section 2 is records.
2. `site-plan/seed.json`, `site-plan/nap.json`, `site-plan/towns.json`: machine truth. Where the
   plan and the seed differ on hubs, towns or content sections, the seed decides; the plan decides
   order, form and wording.
3. `.claude/rules/*.md`: the v4 build laws (copied from the fleet law set).
4. `DECISIONS.md`: where a generic v4 law and this site's plan conflict, and which won.

## Site-specific rules that override generic v4 defaults (plan wins)
- NO written/invented reviews (standing prohibition 2); reviews = Brandon's Google listing via the
  Trustindex slot (`slots.trustindexReviews` in `src/data/site.ts`, TODO until the operator supplies
  the widget id). Never a review count or rating; never "many five-star reviews"; never Rated People.
- The address is NEVER shown on the site or in schema. Phone 07949 484274 only; never 07706 215917.
- "Free quotation" (Brandon's word) is allowed; "free quote" is not. Buttons say Quick Quote Online.
- No prices, guarantees, warranties, accreditations, team claims, response times or out-of-hours
  promises. "Over eight years' experience" only. Brandon is named as the person doing every job.
- No Areas page, no town pages at the root. Articles live at /resources/<hub>-<town>/ and are
  written by the engine after handoff; anything not `published` in `src/data/articles.json` is
  noindex and unlinked.
- Royal blue never on black; chrome blue never on white. All raw colours live in `src/styles/tokens.css`.
- Images: Brandon's own photos from R2 only (`npm run images`), never generated.
- Round 2 (DECISIONS R2-*): the DEFAULT quote form everywhere (name, email, phone, postcode, short
  description) unless the operator says otherwise; no YouTube embed anywhere; one hero pattern
  (Hero.astro) on every page; no lone top borders on cards.

## Commands
- `npm run build` · `node scripts/audit.mjs` (+ `--selftest`) · `node scripts/token-gate.mjs`
- `node scripts/check.mjs [liveURL] [--shots dir]` (Playwright, 1440 + 390)
- `node scripts/cookies.mjs <liveURL>` (Cookie Policy must match)
- `npm run deploy` (deploy guard: worker `site-truelinefinishes` only)
