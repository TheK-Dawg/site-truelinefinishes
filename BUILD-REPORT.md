# BUILD REPORT: TrueLine Finishes (truelinefinishes.com), 5 Nov 2026

Approved plan `site-plan/SITE-PLAN.md`, fingerprint **7495853204d1a803** (`site-plan/APPROVED-BY-OPERATOR`,
Kieran, 4 Nov). Template: Buildings for Life v4, structure and layout only. Every colour, word,
photo and claim is TrueLine's. Rule conflicts and what won: `DECISIONS.md`.

| | |
|---|---|
| Repo | github.com/TheK-Dawg/site-truelinefinishes, branch `main` (push verified with `git ls-remote`) |
| Commits | `27cb310` (build), `5f19653` (live-check fixes, deployed as version 53e48496), then this report |
| Worker | `site-truelinefinishes` (deployed through `scripts/deploy-guard.mjs`), static assets only |
| Worker URL | https://site-truelinefinishes.small-bird-3273.workers.dev (noindexed by `public/_headers`) |
| Real domain | not attached: GoDaddy DNS is handed over at launch. Canonical host `www.truelinefinishes.com` |

## What was built (18 pages)
- `/` home, in the plan's order: black hero (headline, CTA line, Quick Quote Online + Call, Brandon's
  kitchen Short portrait, the quote form) → the three tiles (Specialist Wallcoverings → Wallpapering;
  Interior & Exterior Work → Interior Painting + Exterior Painting; Domestic & Commercial → Commercial
  Painting and Decorating) → before-and-after slider (bedroom, bathroom, gable wall) → five hub cards →
  why choose us + how a job runs → Brandon's photos → coverage line → reviews → charity line → FAQ →
  CTA band → latest articles.
- Five hubs at the locked URLs: `/painting-and-decorating/` (headline), `/interior-painting/`,
  `/exterior-painting/`, `/wallpapering/`, `/commercial-painting-and-decorating/`. Seed sections in
  order (blueprint headings for the three blueprint hubs), a real photo directly above every H2, the
  `sectors:` line, slider where a pair fits, how a job runs, "<hub> in pictures", the house video once
  on Painting and Decorating and Interior Painting, related hubs, FAQ, form, further reading.
- `/about/`, `/contact/` (phone, email, WhatsApp, hours, CID map embed, form; no address),
  `/reviews/`, `/gallery/` (all 194 photos), `/resources/`, `/sitemap/`, `/privacy/`, `/terms/`,
  `/cookie-policy/`, `/thank-you/` (the plan's exact words), `/404`.
- Article engine wiring: `src/data/articles.ts` (status gate, `/resources/<hub>-<town>/`, the house
  video rotation by town publish order, Harrogate override), `src/components/ArticlePage.astro`
  (breadcrumbs under the header band, white reading column, sticky "On this page" + "Need a quote?",
  pool photo above every H2, FAQ, related articles), `scripts/import-articles.mjs` (engine artefacts
  for `clients/truelinefinishes.com/<run>`, imported as `review` until published). One engine-stub
  article: `/resources/painting-and-decorating-baildon/` (town 1 → video above the first H2),
  **status review: noindex, out of the sitemap, linked from nowhere.**
- Schema: `HousePainter` on every page (name, +447949484274, URL, email, five services, areaServed =
  all 116 plan towns, openingHoursSpecification Mo-Fr 07:00-19:00 / Sa-Su 08:00-18:00, sameAs YouTube
  @TruelineFinishes + the GBP CID, hasMap; **no address**), Service + FAQPage + BreadcrumbList on hubs,
  Article (+ VideoObject) + FAQPage + BreadcrumbList on articles, VideoObject for the Short on home.
- Brand: Brandon's primary logo used as-is (crops of the original JPG, `scripts/brand.mjs`; true #000
  ground, sharp at every size used, so no redraw); favicon set from the logo's own T; OG image.
  Palette exactly the plan's sampled hexes; serif capitals for headings, system sans for body; no webfonts.

## Form (Formlane)
- Website "TrueLine Finishes website" and form **"TrueLine Finishes — Quick Quote Online"**, ref
  `truelinefinishes-quick-quote-online-form`, public id `f_5ELbk5JcKfFh2EEaclT6`, **Live**; allowed on
  truelinefinishes.com, www.truelinefinishes.com and the workers.dev preview. Both already existed
  (created 15:21 UTC today by an earlier run) with exactly the right config, so they were reused.
- Fields exactly Brandon's 28 Oct list: work dropdown (Exterior work / Bedroom / Living room / Kitchen /
  Hallway / Bathroom), Home owner / Tenant, Postcode, Short description, name, phone, email. Labels
  visually hidden. After sending → `/thank-you/`.
- Direct embed (`data-lead-form` + `data-lf-token` + `https://api.formlane.uk/edge/form.js`) in the
  form card (`id="contact"`), with the lock + "Any submission through this form is secure. We do not
  sell your details to third parties." under it (Formlane's own privacy line hidden).
- **Destination: `admin@apexaimarketing.com` only.** The brief said `admin@apexiamarketing.com`; that
  spelling is the parked domain with no mail (Formlane DECISIONS, operator ruling Round F, 5 Nov), so
  the working agency inbox was kept. **Operator: confirm.** Not Brandon's address yet.
- No test submission was sent.

## Images and R2 (bucket `site-images`, `customers/trueline-finishes/`)
| Folder | Objects |
|---|---|
| gallery/ | 204 (the originals, kept) |
| interior/ | 147 |
| exterior/ | 31 |
| before-after/ | 8 (bedroom, bathroom, gable wall pairs + the semi-detached pair) |
| commercial/ | 7 |
| wallpapering/ | 1 |
| logo/ | 1 (primary blue logo, sha256 212858040c24…) |
- The category folders were created (descriptive names) by the earlier run at 15:24-15:34 UTC today;
  this run re-listed and downloaded all 195 objects, MD5-matched every one to its R2 ETag, and matched
  190 byte-for-byte to the SHA-checked WhatsApp originals. The other 5 are the deliberate edits
  (bathroom pair aligned; dark grey house cropped so the car and number plate are out of frame;
  exhibition stand cropped so the other business's name board is gone) and the logo.
- Not categorised, so never used: the other decorator's website screenshot, both logo files, and 7
  photos held back (people at work, not-for-the-site). Magazine cover and advert are not in the pool.
- The site serves 194 WebP conversions of the R2 copies (`npm run images`, provenance in
  `src/data/images.json`). No image was generated.
- **New WhatsApp images:** the Whapi token is NOT in `/root/.hermes/.env` (variable needed:
  `WHAPI_TOKEN`, the customer-service channel's bearer token). Checked instead through the Olympus D1
  WhatsApp mirror (`oly_whatsapp_events`, chat 447706215917): after 26 Oct Brandon sent only two images,
  the A Child's Wish magazine cover and his printed advert (both banned), so nothing new to add.
  `/root/work/trueline-finishes-media/incoming-new/` was therefore not needed.

## Checks (all re-runnable; results at the time of writing)
- `node scripts/audit.mjs`: 18 pages, **0 fails** (selftest: 8 bad strings caught, 2 good pass). Covers
  titles (brand last), robots, www canonical, sitemap membership, schema (HousePainter, no address,
  phone, hours, 116 towns, sameAs), the plan's prohibitions as code, phone/footer hours/charity/WhatsApp
  on every page, exactly one `id="contact"` + the Formlane slot + the security line, reviews slot,
  broken links, links to unpublished articles, kitchen Short on home only, house video placements.
- `node scripts/token-gate.mjs`: PASS. `node scripts/contrast.mjs`: **0 fails** (proven by breaking it:
  139 fails with muted text set to #BBB).
- `node scripts/check.mjs <worker URL>` (Playwright chromium, 1440×900 and 390×844, every route):
  **0 fails** on the live worker: no overflow, one H1, hero CTA above the fold, header correct per width,
  WhatsApp button bottom-right on mobile only, sticky bar hidden over hero/form/footer, footer hours,
  reviews TODO slot present, and **the Formlane form rendering Brandon's six dropdown options on every
  page**, no visible labels. Header also verified at 360/768/1024/1100/1180/1280.
- `node scripts/cookies.mjs <worker URL>`: no cookies and no first-party storage on load on any page
  type, which is what the Cookie Policy says.
- Screenshots: `/root/work/tl-shots/live2/` (desktop + mobile, every route).

## Open items
1. **Trustindex widget id** for TrueLine (Google CID 8023434379390696838). The reviews section on every
   page and `/reviews/` carry a `TODO(operator)` and `data-trustindex-state="pending-widget-id"`; set
   `slots.trustindexReviews` in `src/data/site.ts`. No id was invented or borrowed.
2. **Form destination spelling** (above) and the later swap to Brandon@truelinefinishes.com on the
   operator's say-so (`set_form_client_email`).
3. **Brandon@truelinefinishes.com receiving mail**: check before launch (it is printed on the site).
4. **WhatsApp on 07949 484274**: tap the button on a phone; if no chat opens, set `WHATSAPP_ON = false`
   in `src/components/WhatsAppButton.astro`. Never 07706 215917.
5. **Logo original file** (PNG/SVG) from Brandon. Not needed for the site, wanted for print.
6. **More wallpaper photos** (one so far) and **finished commercial photos**; confirm whether the person
   in the held-back work photos is Brandon.
7. **The February website** ("getting a website built as we speak", 22 Feb): does it exist, on what domain.
8. **Charity wording/link**: the line is words only, as the plan says; a link or logo needs the charity's say-so.
9. **DNS/launch**: attach `www.truelinefinishes.com` + apex (301 → www) to the worker when GoDaddy access
   arrives; `public/_headers` already confines noindex to the workers.dev host.
10. **Article engine onboarding** (separate repo, not touched by this build): create
    `clients/truelinefinishes.com/` in claude-seo-engine from `site-plan/seed.json`. Note the engine's
    head-term rule (`core/url-contract.mjs`): "painting and decorating" is the trade head term, so check
    it does not refuse the Painting and Decorating grid rows before the first run. Approve the Baildon
    stub (or the engine's replacement) with Brandon, then publish with `--publish`.
11. **Kirkstall, Bramley, Farsley** and the YouTube channel's spelling ("Trueline"): Brandon's call, per the plan.
12. Watch both videos in full before launch (plan, Video).
