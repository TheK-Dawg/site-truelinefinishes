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
  four TrueLine Trustindex widgets (`trustindex` in `src/data/site.ts`, DECISIONS T1-T7): corner
  (desktop), main (under every hero; not on /reviews/), reviewPage (/reviews/ grid), slimline (every
  hero + every form). Never a review count or rating written by the site; never "many five-star
  reviews"; never Rated People.
- The address is NEVER shown on the site or in schema. Phone 07949 484274 only; never 07706 215917.
- "Free quotation" (Brandon's word) is allowed; "free quote" is not. Buttons say Quick Quote Online.
- No prices, guarantees, warranties, accreditations, team claims, response times or out-of-hours
  promises. "Over eight years' experience" only.
- ROUND 5 (19 Nov 2026, DECISIONS R5-3/R5-4, superseding the earlier "Brandon is named as the person
  doing every job"): the BRAND leads all marketing copy. No self-work trope ("does the work himself")
  anywhere; no owner name in any H1/H2/H3, title or meta description; the full name "Brandon Dawson"
  only on /privacy/, /terms/, /company-facts/ and in structured data; the first name only in the
  /contact/ quote-form lead. H1s = real service + a verified place, never a question: a town from
  towns.json, OR (home page, /services/ and every hub page only, since the 25 Nov 2026 plan change)
  the plan's region wording "West and North Yorkshire". Gates: `node scripts/audit.mjs` round-5 block.
- ROUND 5 heroes and gallery: ONE hero height for every route from `--hero-h` in Hero.astro (780
  desktop, 640 tablet, 540 phone floor); `.hero--compact` sets no height. The home gallery is the
  curated `HOME_PICKS` list, at most 20 DISTINCT photographs. The services tile footer carries a
  Quick Quote Online button and never a phone number. Check with `node scripts/hero-heights.mjs`.
- ROUND 6 (25 Nov 2026, DECISIONS R6-*): the HOME hero alone is taller, `--hero-h-home` (840 desktop,
  720 tablet, 720 phone floor); every other hero keeps round 5's shared figure. The hero overlay is
  0.62-0.72 so the Trustindex strip reads over a bright photograph. The shared call pill carries its
  own navy glass (`--glass-pill`) with a WHITE phone icon, never a white film with a chrome icon. The
  mobile sticky bar is two PILLS, says "Call Us" with no number, and both buttons carry the sheen.
  WhatsApp uses the OFFICIAL mark (Icon.astro `SOLID`), white on green, with a 4px bob; never redraw
  a brand logo. ARTICLES: photographs come only from the hub's own subject pool
  (`src/lib/article-photos.js`, no fallback chain, no repeats, no `*-before-*`), the engine's CTA
  block and all inline styles are rewritten at render (`src/lib/article-body.js`), and the importer
  lifts the engine's "Quick Answer" box into the Quick Rundown. Inventory: `npm run articles:pool`.
  Before any engine batch, follow `ARTICLE-PUBLICATION-CONTRACT.md` - it also records what is NOT
  wired (no CI deploy on push; worker-drip-worker cannot publish to this site as configured).
- SITE PLAN 25 NOV 2026 (commit `542315e`, D-2026-11-25-01/-02, implemented 25 Nov 2026 - see
  DECISIONS F1-F8): SIX hubs, Fencing added at the locked URL `/fencing/` (panel, close board,
  composite, trellis fencing and toppers; installation and repairs; no blueprint bought, default
  skeleton). The top nav stays the owner's FIVE entries - Fencing is reached from the Services
  dropdown, the home tiles, /services/, the footer and related-services cards. The home page,
  /services/ and every hub page lead on "West and North Yorkshire" ("West Yorkshire" where brevity
  needs it) and still name real towns in support; EVERY SEO ARTICLE IS UNCHANGED and still names one
  town only. There is NO photograph of TrueLine fencing in the pool, so that hub's section cards
  carry copy alone: do not borrow painting photographs for it. Its pictures band is the credited STOCK
  band Brandon asked for on 26 Nov 2026 (DECISIONS B3), labelled as example photographs.
- No Areas page, no town pages at the root. Articles live at /resources/<hub>-<town>/ and are
  written by the engine after handoff; anything not `published` in `src/data/articles.json` is
  noindex and unlinked.
- Royal blue never on black; chrome blue never on white. All raw colours live in `src/styles/tokens.css`.
- Images: Brandon's own photos from R2 only (`npm run images`), never generated. ONE exception (26 Nov 2026,
  DECISIONS B1-B6, his own request): credited free-licence STOCK fencing photographs on the Fencing tile and the
  /fencing/ pictures band only, kept in `src/data/stock-images.json` (never `images.json`), receipts in
  `stock-src/`, credits on /image-credits/, always labelled as example photographs, never as TrueLine jobs.
- Round 2 (DECISIONS R2-*): the DEFAULT quote form everywhere (name, email, phone, postcode, short
  description) unless the operator says otherwise; one hero pattern (Hero.astro) on every page; no
  lone top borders on cards.
- HOME 3 SITE-WIDE (19 Nov 2026, DECISIONS H3-*): Vince selected Home 3 (the Dom-reference variant,
  https://dom.themerex.net/ captured 5 Nov) as the design for the whole site. Its navy/royal/chrome
  tokens, Lexend Deca + Kumbh Sans, pill buttons, centred photo heroes and Dom section patterns are
  the defaults in tokens.css/global.css. /home-2/ and /home-3/ are retired: worker/redirects.js 301s
  them (and /complaints/) to their targets. Brandon's two YouTube videos are embedded on the home
  page ONLY (youtube-nocookie, Videos.astro); no other video anywhere (supersedes R2-13 for those two).

## Commands
- `npm run build` · `node scripts/audit.mjs` (+ `--selftest`) · `node scripts/token-gate.mjs`
- `node scripts/check.mjs [liveURL] [--shots dir]` (Playwright, 1440 + 390)
- `node scripts/contrast.mjs [extra routes...]` (WCAG AA per element; PASS NEW ROUTES EXPLICITLY)
- `npm run articles:pool` (per-hub figure budget) · `npm run articles:import -- <run> [--publish a,b]`
- `node scripts/hero-heights.mjs [liveURL]` (every hero route at 1440 + 768 + 390, one height policy)
- `node scripts/cookies.mjs <liveURL>` (Cookie Policy must match)
- `npm run deploy` (deploy guard: worker `site-truelinefinishes` only)
