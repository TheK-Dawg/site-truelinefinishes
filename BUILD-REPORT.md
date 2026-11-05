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

## OVERHAUL (operator verdict "really bad, complete overhaul", 5 Nov 2026)

Brief: `TRUELINE-OVERHAUL-BRIEF.md`. The home page and footer were rebuilt on the Buildings for Life
structure (`/root/projects/lead-gen-websites/buildingsforlifeltd/site`), keeping TrueLine's own words,
photos, colours and claims. Every override is recorded in `DECISIONS.md` O1-O10.

| | |
|---|---|
| Commits | `950a22d` (overhaul), `a0b7968` (home map + Cookie Policy), then this report. Push verified with `git ls-remote` |
| Version | 1.1.0 (`package.json`) |
| Deploy | worker `site-truelinefinishes` through the deploy guard, version `a6460634-e7a5-4dd0-9308-a03071534500` |
| URL | https://site-truelinefinishes.small-bird-3273.workers.dev (real domain still not attached) |

### What changed, fix by fix
1. **Logo**: now only in the black header bar (logo left, nav right). The big wordmark in the hero is gone.
2. **Hero = BFL hero**: Brandon's bay-window living room under the black overlay, H1, lead, Quick Quote
   Online + Call 07949 484274, "Read Brandon's reviews on Google" line, three info cards (Over eight
   years' experience / Brandon on every job / Fully insured). **No video and no form in the hero.** The
   kitchen Short moved to `/about/`, beside Brandon's story (VideoObject schema moved with it). The house
   video is unchanged on Painting and Decorating + Interior Painting.
3. **Form**: the Formlane embed (`data-lead-form="f_5ELbk5JcKfFh2EEaclT6"`) in its own black section,
   LAST on every page, white card, field styling and blue button. The preview's earlier form was already
   the Formlane embed, styled to the site (checked: it rendered Brandon's six dropdown options). It just
   sat in the hero. Every Quick Quote Online button scrolls to it.
4. **Before-and-after slider: deleted** from home, the three hubs and the gallery; the component is
   removed. The gallery shows the finished "after" shots in their room/exterior groups and does not show
   the "before" shots. The freed home slot is BFL's Our Work section.
5. **Services** on BFL's ServicesGrid (five cards in one row, first card black, the title is the only
   link, "Not sure which of these your job falls under? Quick Quote Online"). "Why people choose us" became
   BFL's statement slab + trust-badge row.
6. **No underlined links anywhere**: every underline rule removed (cards, prose, article sidebar,
   breadcrumbs, footer bar, credit, contact, sitemap, thank-you). Links read by colour and weight and
   change colour on hover. Enforced by the audit (compiled CSS + page HTML) and by a computed-style
   Playwright check on every visible link.
7. **Reviews section** directly under the hero on every page (home included), BFL layout, slot marked
   `data-trustindex-todo="TODO-TrustIndex-ID"` + an HTML comment. Until the widget id arrives it links to
   the Google listing. No reviews, rating or count were invented. `/reviews/` unchanged.
8. **Pages**: `/faq/` (built; the plan's own Q&A only: the home questions + each hub's, de-duplicated,
   FAQPage schema) and `/services/` (built; all five hubs, CollectionPage schema). `/gallery/`,
   `/reviews/`, `/resources/` checked, all 200. The home page now carries the resources preview in BFL's
   position. With no article published yet it shows an honest "being written" line, never a draft link.
   No `/areas/` or town pages (plan).
9. **Footer = BFL footer**: logo + "A room, the whole house or business premises to decorate?" + Quick
   Quote Online. Then four columns: About Us (with **"Proud to support A Child's Wish, a children's
   charity."**), Our Services (5 + All services), Company, Quick Contact (call button, email, WhatsApp,
   the hours). Bottom bar: © year, Privacy / Terms / Cookie Policy / Site map, and the LMB credit
   "Painting and decorating websites by Local Map Booster" (one nofollow link, on the keyword). No address.
10. **Nav**: Home, Services (now opens `/services/`; the dropdown lists all five hubs + All services),
    Gallery, Reviews, About, Resources, Contact + phone. The burger is used below 1180px, as before.
- Home order now: hero → reviews → statement → trust badges → about block → services → our work → the
  three tiles (BFL craft row: Specialist Wallcoverings / Interior & Exterior Work / Domestic & Commercial)
  → how a job runs → areas (map + Brandon's places) → resources → FAQ → quote form.
- **Home areas map** is an area map centred on Baildon, with no business pin. The Business Profile
  (CID) embed's Google card prints the street address, which the plan forbids on the site.

### Verification (final deploy)
- `node scripts/audit.mjs`: 20 pages, **0 fails** (selftest passes). New checks: the kitchen Short only on
  /about/; no iframe/video/form/logo inside any hero; no slider; no underline in page HTML or compiled CSS;
  footer LMB credit; the TODO-TrustIndex-ID marker; /faq/, /services/, /gallery/, /reviews/, /resources/
  exist. **Each one was proven by breaking dist on purpose first (31 fails raised), then re-run clean.**
- `node scripts/token-gate.mjs`: PASS. `node scripts/contrast.mjs`: 0 fails.
- `node scripts/check.mjs <worker URL>` (Playwright, 1440×900 + 390×844, all 19 routes): **0 fails**.
  New rendered checks: no underlined visible link (computed style), no video/form/logo in the hero, form
  inside its own quote-form section, no slider, footer charity line + LMB credit, the logo only in the
  header, the dropdown lists ≥5 links. The Formlane form rendered Brandon's fields on every page.
- **Harness fix:** the old overflow test compared the page to `innerWidth`. Under mobile emulation
  `innerWidth` widens with the page, so a 14px overflow from the new trust tiles was not caught. The
  test now compares against the viewport width (390/1440). It was proven on a page broken on purpose
  (31px caught) after the tiles were fixed.
- `node scripts/cookies.mjs <worker URL>` (now including /about/): no cookies, no first-party storage on
  any page. Cookie Policy updated: the Google map is on the home and Contact pages.
- Live read-back: `/`, `/faq/`, `/services/`, `/gallery/`, `/reviews/`, `/resources/`, `/about/`, hubs all 200.
- Screenshots: `/root/work/tl-shots/overhaul/` (desktop + mobile, every route, + the home areas map).
- **NOT RUN:** `astro check` (it wants to install `@astrojs/check`; no install on this server).
  `astro build` is clean. No test lead was sent.

### Open items added by the overhaul
13. **The Contact page map still prints the address.** It is the CID embed ordered by the original
    brief (D14), and Google's listing card shows Brandon's street address. That conflicts with "address
    never shown". It is outside this overhaul's fixes, so it was left as built. Operator: switch
    /contact/ to the same area map as home (one-line change: `<MapEmbed area="Baildon, Shipley" />`)?
14. **LMB credit on a client site**: added because the overhaul brief orders BFL's footer "LMB credit".
    The fleet branding split says client sites carry none, so confirm it stays.
15. **Trustindex widget id** (open item 1) is now the only thing between the review section and live reviews.
