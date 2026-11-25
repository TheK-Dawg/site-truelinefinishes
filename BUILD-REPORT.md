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

## CORRECTIONS-2 (operator live review 2, 5 Nov 2026)

Brief: `TRUELINE-FIX2-BRIEF.md`. Every ruling is recorded in `DECISIONS.md` R2-1 to R2-16, including the
standing rule **R2-10a: the default quick-quote form everywhere unless the operator says otherwise**.

**Why the first build failed (recorded for the operator):** it followed the plan's hero instructions
literally (form + video in the hero, the slider) and only loosely copied the Buildings for Life
section structure instead of treating BFL's components as the law. The overhaul fixed that; this
round works through the operator's remaining points.

| | |
|---|---|
| Commits | `62dff37` (round 2), `e7a7494` (live fixes), then this report. Push verified with `git ls-remote` |
| Version | 1.2.0 |
| Deploy | worker `site-truelinefinishes` via the deploy guard; final version `6940b3e2-9d4c-40e1-9b84-9a561f211c95` |
| URL | https://site-truelinefinishes.small-bird-3273.workers.dev (real domain still not attached) |

### Fix by fix
1. **Hero reviews line gone.** "Read Brandon's reviews on Google" is removed. In its place is a slim Trustindex slot (`slots.trustindexStrip`, `data-trustindex-todo="TODO-TrustIndex-ID"`) that renders nothing until the widget arrives. Nothing is faked.
2. **Review section:** heading "What customers say about us", its lead, then the marked MAIN widget slot (`slots.trustindexReviews`, the 5 Star pattern). Only /reviews/ keeps a "Read Our Google Reviews" button, so that page is not empty.
3. **No lone top borders.** Every 2-3px top line is gone (cards, hero info cards, form card, contact cards, statement slab, map, CTA cards, dropdown). Cards now use a full 1px border and the card shadow, as BFL does. A Playwright check fails any element with a top border and no other border.
4. **Five hubs confirmed.** Exterior painting and wallpapering are offered. All five hubs are linked from the nav dropdown, the footer, /services/ and the home cards.
5. **Copy pass.** Every H1 is now problem-first ("Tired Rooms? Painting and Decorating by Brandon", "Walls Marked and Woodwork Chipped? Interior Painting, Room by Room" ...). Every hub H2 is rewritten as natural English that keeps the blueprint heading's topic ("Surface Preparation" became "The Preparation That Makes Paint Last", and so on). The list heading "Interior painting, exterior painting and wallpapering" is replaced and banned by the audit. Copy that still told people to pick a room from the old dropdown is rewritten on every page and in the Baildon article. Hub leads no longer repeat their H1. No new claims: only the plan's usable list.
6. **How a job runs:** heading, lead, steps and the Quick Quote Online line are left-aligned and start on the page container's left edge. The photo sits flush against the panel (measured gap 0px).
7. **Where to Find Us:** plain text and a plain dotted list of places. No box, border or background (Playwright check). The map is kept.
8. **Home map = Brandon's real listing:** `https://www.google.com/maps?cid=8023434379390696838&output=embed`, the same embed as /contact/. Schema: `hasMap` points at the listing, and `sameAs` = YouTube channel + `https://maps.app.goo.gl/47CXTvHKMybPQHkR9` + the CID URL. **Operator, note:** Google's own card inside the map frame shows the listing's street address and its rating and review count ("5.0 ★ (17)"). The site's own text and schema still never show the address, and they show no count or rating. The plan bans both, but the operator ordered this embed (DECISIONS R2-8). Say if the home page should go back to the area map.
9. **Three published articles, all live, indexable and in the sitemap:** `/resources/painting-and-decorating-baildon/`, `/resources/painting-and-decorating-guiseley/`, `/resources/interior-painting-ilkley/` (towns 1, 2 and 4 in the publish order; Menston, 3, is next). Each has about 660-760 words with six or seven H2s, a pool photo above every content H2, an FAQ section, and Article + FAQPage + BreadcrumbList schema. They link once to each related hub and show on the hubs' further reading, the resources page, the home resources strip and the site map. The words come from the plan's service detail and content notes only. Guiseley and Ilkley have no bought town research, so their local colour is general geography. No video, because fix 13 overrides the rotation.
10. **Default form:** the Formlane form `truelinefinishes-quick-quote-online-form` was updated through the Formlane MCP to **version 3**. Fields, in order: name, email, phone, postcode, short description. The "Type of work" and "Home owner or tenant" dropdowns are gone. Still Live, button "Quick Quote Online", heading and security line unchanged. The alert email body now lists the five fields. Destination unchanged: **`admin@apexaimarketing.com`**. The brief again wrote `apexia...`, which is the parked domain with no mail (D4), so I didn't switch to it. Operator: confirm. Privacy Policy field list updated. No test lead was sent.
11. **Button centring.** Measured on every button: capitals sat about 2px high (1.8px by font metrics, 2.5px by pixel ink). The flex box centred the line box, which leaves room for descenders under capitals. Fix: every label is wrapped in `.btn__t` with `text-box: trim-both cap alphabetic`, so the capitals themselves are centred whatever the system font. The live check then found a second cause on the **Formlane submit button**: form.js gives it uneven padding (10.5px top, 21px bottom), which put the label 5px high. That is overridden with even padding, `display: block` (flex turns the trim off) and the same trim. Result on the live worker, 1440 + 390, every route, including the sticky bar and the Formlane submit: **426 buttons, worst offset 0px**. Firefox has no `text-box` yet and keeps plain line-box centring. Cumbria: see below.
12. **One hero on every page.** `Hero.astro` is the only hero, and `PageHero` uses it in compact mode. Every page gets the same full-bleed photo under the overlay, the same container and headline position, and Quick Quote Online + Call. Sub-pages are shorter (about 420-650px desktop against the home page's 800px) and have no info cards. The hubs' right-hand photos are now their hero backgrounds. Pages without their own photo use Brandon's dust-sheeted room.
13. **No YouTube anywhere.** The kitchen Short is off /about/ (a photo of Brandon's work replaces it). The house video is off both hubs and the article template. The VideoObject schema and VideoEmbed component are deleted. Cookie Policy, Privacy and Terms no longer mention embedded videos. The video ids and captions stay in `site.ts`.
14. **Standard pages added:** `/company-facts/`, `/complaints-procedure/`, plus `/accessibility/` and `/find-us-online/` (the rest of the 5 Star / Vision Plumbing small-trade set). They use plan facts only: no address, company or VAT number, guarantee or response time. They are linked from the footer and the site map. The legal pages keep their base wording.
15. **Site map hero bug:** a no-photo hero used to set `margin-inline: 0` on its container, which pinned the copy to the far left. The shared hero removes it. Measured: H1 left edge = page container on all 24 non-utility routes (120px desktop, 16px mobile).
16. **LMB credit** kept as "Painting and decorating websites by Local Map Booster", with one nofollow link on the keyword. It reads naturally for the trade.

### Verification (final deploy `6940b3e2`)
- `node scripts/audit.mjs`: 26 pages, **0 fails** (selftest passes). New checks: no YouTube embed, no VideoObject, the shared hero pattern with no side image or Google line, the reviews heading, the home map is the CID embed, `sameAs`/`hasMap`, the banned list heading, all standard pages exist, at least 3 published articles each with a photo per H2 and FAQPage. **Proven by breaking a copy of dist: 8 mutations planted, 8 caught.**
- `node scripts/check.mjs <worker URL>` (Playwright, 1440×900 + 390×844, 25 routes): **0 fails**. New rendered checks: exactly the five default form fields with no dropdown, no YouTube iframe, hero pattern + H1 aligned to the container, no lone top borders, home map src, areas boxless, steps left-aligned + photo flush, optical centring of every button. **Proven on a broken copy: centred steps, a 20px gap, boxed areas, top-bordered cards, an untrimmed label and a far-left hero were all caught.** The first live run caught the Formlane padding, which the local run cannot see (the form only renders on its allowed domains). Fixed, then re-run clean.
- `node scripts/token-gate.mjs`: PASS. `node scripts/contrast.mjs`: 0 fails. `node scripts/cookies.mjs <worker URL>`: no cookies or first-party storage on any page type.
- Live read-back: every route 200 (company facts, complaints, accessibility, find us online, the 3 articles, sitemap). The articles are `index, follow` and in `sitemap-0.xml`. Zero YouTube/VideoObject on home, about, hubs and articles.
- Screenshots: `/root/work/tl-shots/round2/` (desktop + mobile, every route).
- **NOT RUN:** `astro check` (needs an install; `astro build` is clean). No test lead.

### Fix 11 on Cumbria Spas (separate repo, done by a delegated agent)
Checkout `cumbriaspires/site-cumbriaspas-build` (TheK-Dawg/site-cumbriaspas), worker `site-cumbriaspires-preview2`. Commits `6e0d03c` (fix), `ff139bf` + `fd439f9` (that repo's BUILD-REPORT "BUTTON CENTRING" section), pushed (`fd439f9` confirmed on origin); deploy `701bb09b-39bc-4d8b-9cbf-c74660485a2a`.
- **Cause:** an earlier fix moved about 0.075em of padding from the bottom to the top of every button, assuming Figtree sits its capitals high. Pixel measurement shows Figtree's capitals are already centred, so that nudge pushed the labels about 1px low (worst +2.25px; 223/251 buttons at 1440 and 271/271 at 390 were over 1px).
- **Fix:** nudge removed; padding set by pixel measurement: 14.25px / 13.75px on `.btn`, the sticky bar and the Formlane submit, 12.5px / 9.5px on the 14px header pill.
- **Live re-measure:** worst +0.39px at 1440 (0/267 over 1px) and +0.19px at 390 (0/284 over 1px). Pixel checks at densities 1-3: within ±0.44px.
- **Not verified on Cumbria:** Safari/Firefox (Chromium only); the repo's own `qa.mjs --url` against live (its local run is 0 fails); operator acceptance.
- **The two sites use different methods on purpose:** TrueLine uses `text-box` on a label span, which works with any system font (TrueLine has no webfont). Cumbria uses padding measured for its one webfont, a CSS-only change.

### Handoff note for the STANDARD-PAGES session (STD-PAGES-ROUND-BRIEF)
That brief was written before this round and says TrueLine lacks company facts, complaints and accessibility, and that only one article exists. **This round has already added `/company-facts/`, `/complaints-procedure/` (not `/complaints/`), `/accessibility/` and `/find-us-online/`, and published all three articles.** All are linked from the footer and the site map. Extend these rather than duplicating them. If the operator wants `/complaints/` as the URL, make it a 301 to the existing page or a rename, not a second page. Company facts already omits the legal entity type, as that brief asks.

### Open items after round 2
1. ~~**Trustindex widget ids**~~ **Done 6 Nov 2026**: the four TrueLine widgets are live, see "TRUSTINDEX round" at the end.
2. **Home and contact maps show the address and rating in Google's own card** (fix 8 above): operator's call.
3. **Form destination spelling** apexai vs apexia (unchanged, D4).
4. Earlier open items 2-12 and 14 still stand. Item 13 (contact map address) is now the same question as item 2 here.

## STANDARD-PAGES round (operator's review 2, 5 Nov 2026)
Brief: `STD-PAGES-ROUND-BRIEF.md`. This round started after the fix-2 session had committed and pushed its work
(`32cf361`, with its handoff note). Commits `0b69dd1` and `1a7457c`. Worker `site-truelinefinishes`, version
`a148d5b3-4cd9-486c-bb46-3f08da8594b6`. Rollback to fix-2: `npx wrangler rollback 6940b3e2-9d4c-40e1-9b84-9a561f211c95`.

| # | Item | Result |
|---|---|---|
| 1 | **Standard page set** | **Already complete; no duplicate pages were made.** Fix-2 had built `/company-facts/`, `/complaints-procedure/`, `/accessibility/` and `/find-us-online/`. With About, Contact, Reviews, Gallery, FAQ, Resources, Sitemap, Privacy, Terms and Cookie Policy, all 13 standard pages exist and return 200. Company Facts omits the entity type, as the brief asks, and the plan's open item is unchanged. The footer links every one: the Company column plus the legal row in the bottom bar. |
| 1 | **`/complaints/` URL** | **Not live.** A `public/_redirects` 301 to `/complaints-procedure/` was deployed, but wrangler 3.114 does not apply `_redirects` to Workers static assets, so it returned 404. It was removed. **Operator:** if `/complaints/` is wanted, either upgrade wrangler to v4 and restore the one-line `_redirects`, or rename the page. |
| 1 | **Charity line** | Stays plain text ("Proud to support A Child's Wish, a children's charity."). There is a `TODO(operator, charity link)` in `Footer.astro`: link it `rel="nofollow noopener"` once the operator supplies the URL. |
| 3 | **Sticky sidebar CTA** | **Already working** (`.art__aside` is a sticky grid item). Playwright at 1440×900 on Guiseley and Ilkley: the CTA box sits at about 1340 to 1380px on load, then stays at about 495 to 503px from scroll 1200 to 3600. `check.mjs` now asserts the CTA is in view at 40% and 70% through every article. |
| 4 | **Interlinking** | Every article now ends with links to its hub, Resources, the FAQ, the form (`#contact`) and Contact. Related articles fall back to other published articles when none share the hub or town: Ilkley (interior painting) had no related links and now links Baildon and Guiseley. Hubs already list their town articles (painting-and-decorating → Baildon and Guiseley; interior-painting → Ilkley). Exterior painting and wallpapering have no articles yet. |
| 5 | **Three articles** | Verified live: Baildon, Guiseley and Ilkley are published, render, and appear in the sitemap and on their hubs. |

### Verification
- `npm run build` gives 26 pages. `audit.mjs`: 0 fails. `token-gate.mjs`: PASS.
- `check.mjs`, run locally and against the live worker: 25 routes × 2 widths, **0 fails**. This includes no underlined links, the footer, the sticky CTA on all 3 articles, and all 24 internal link targets returning 200. The new link crawl was added this round.
- Click depth (a BFS crawl of `dist/` from `/`): every page is **1 click** from home, except `/thank-you/`, which is reached after a form submit.

## TRUSTINDEX round (6 Nov 2026, brief TRUELINE-TRUSTINDEX-FOUR-WIDGETS)
Vince's four TrueLine loaders, live on the preview Worker. Code commit `6fdf93b` (pushed, `git ls-remote` = `6fdf93b`).
Worker `site-truelinefinishes`, version **`f723a343-eb10-4085-83c2-5ce97462be12`**. Rollback: `npx wrangler rollback 7165baf2-0046-4f39-9abb-91eca729d2e4`.
The real domain is not attached (unchanged). Decisions: DECISIONS T1-T7.

| Role | Id | Where |
|---|---|---|
| CORNER | `750bdd38520519524a16f32074e` | Every page (Base), fixed bottom-left; hidden below 1024px |
| MAIN | `980be2f8585419540236d6075d0` | The reviews section, the first section after the hero, on every page except /reviews/ (incl. /home-2/, /home-3/, /thank-you/, 404) |
| REVIEW PAGE | `77dcbf385600195a22468d47c59` | /reviews/ only, in the same section, instead of MAIN |
| SLIMLINE | `c4b35ec858641953835667d83d1` | Every hero, and every quote-form section under the form heading (the same loader twice per page: each renders in place) |

### Verification
- `npm run build` (28 pages), `token-gate.mjs` PASS, `audit.mjs --selftest` (Trustindex gate: 10 cases, 8 broken on purpose, all caught), `audit.mjs` 0 fails. Breaking two real built pages on purpose (an id swapped on /about/, the form slimline removed on /reviews/) gave exactly those 2 fails.
- `check.mjs` (Playwright Chromium, 1440×900 and 390×844) on 28 routes, including a missing URL for the 404 page: local **0 fails**; **live preview 0 fails**. On every route and both widths it checks that each slot holds its OWN rendered widget (by Trustindex id, height above 0, after a first interaction), that MAIN / REVIEW PAGE fills the reviews section and the order is hero > reviews, the slimline's place and text contrast (21:1 white on the black heroes, 17.4:1 / 13.4:1 on the variants' navy, 21:1 dark on the white form cards), that the corner is fixed bottom-left on desktop and not visible on mobile, and that the corner never obscures a control: no fixed control under it, no control that is covered at every scroll position where it is on screen, and no form field covered after the Quick Quote jump. Live, it also checks the Formlane form's five default fields.
- Gate proof for `check.mjs`: a broken copy of `dist` (dark-ground override removed, corner mobile hiding removed, the /about/ form slimline removed, /reviews/ given MAIN instead of the grid) failed every one: black hero text 56/56, corner visible on mobile 28/28, the /about/ form slimline missing, and /reviews/ "reviews widget [main] (want one reviewPage)".
- Served HTML read back on all 28 routes: one corner each; MAIN once on 27 and 0 on /reviews/; REVIEW PAGE once on /reviews/ only; a hero slimline on all of them; a form slimline on all 26 with a form. Robots: /home-2/ and /home-3/ `noindex, nofollow` meta, still out of the sitemap; whole preview host `X-Robots-Tag: noindex, nofollow`.
- Network: every loader and `widgets/<id>/content.html` returns 200 from cdn.trustindex.io. Trustindex's own `companies/.../richsnippet.json` returns 404 (its rich-snippet add-on is not enabled for this account; nothing is injected). Page errors from our own code: none. The site has no CSP header, so no CSP conflicts.
- `cookies.mjs` live (6 routes): no cookies on any domain and no first-party storage. The Cookie Policy now names Trustindex.

### Remaining limitations / for the operator
1. **Widget look is set in Trustindex, not here.** All four use Trustindex's light set. On dark grounds the site turns the slimline's text white with a CSS override, and that override depends on Trustindex's current class names. If Trustindex changes them, `check.mjs` fails on contrast rather than going quiet.
2. **Live review text**: one Google review says "Brandon and his team". That is a customer's own words shown by the widget, not site copy (the no-team-claims audit covers site copy only).
3. **Corner badge while scrolling**: on desktop it passes over left-column content (gallery thumbnails, card links) as the page scrolls. It never permanently hides a control (checked above), but it does sit over content for a moment.
4. The article breadcrumb strip (D6) sits between the hero and the reviews section; reviews is still the first section.
5. Chromium only (no Safari/Firefox run). `astro check` was not run: it needs `@astrojs/check` installed, and no install was approved.
6. The 404 page now carries the slimline and the reviews section (brief: "every page"). Its only actions are still Home and Call.

## ROUND-3 (operator live review 3, 6 Nov 2026, brief TRUELINE-LIVE-REVIEW-ROUND3-20261106)
Code commit `11ebe8c` (pushed, `git ls-remote` = `11ebe8c`). Worker `site-truelinefinishes`, version **`2bafda5d-4c81-487a-bf6e-5715f931414e`**.
Rollback: `npx wrangler rollback f723a343-eb10-4085-83c2-5ce97462be12`. Real domain still not attached. Decisions: DECISIONS R3-1 to R3-11.
States: built and checked (below), deployed to the preview Worker and read back. **Operator visual acceptance: NOT RUN (Vince's). The site is not accepted.**

### Per point (the operator's attachment, in order)
1. Quote-section review widget sat in the form card: **done**. It is now in the left column, under the selling points, above the Call / WhatsApp buttons, on every page (R3-2).
2. Hero review widget under the buttons: **done**. It now sits under the paragraph and above the buttons in every hero (R3-1).
3. Sidebar opens when the widget is clicked; other review section, /reviews/, company facts: **kept** as they are (approvals, no change).
4. Service page: the lone "If a wall has already been rendered..." box and the unheaded sections: **done** on all five hubs (R3-4). The intro has an H2 and a photo, the cards have an H2, and the cards are H3s.
5. Empty space after the five cards: **done**. Exterior and Commercial (the two hubs with 5 cards) get a photo + black "Who the Work Is For" card in that cell. The other three hubs have 6 cards and no gap.
6. Gallery, other services, hub page, About: **kept**.
7. Why the homepage shows 3 scrolling reviews and other pages show 6: **explained, no change** (R3-10). Every page except /reviews/ has the same MAIN slider, which fits as many cards as the width allows (measured 3 to 4 at desktop widths). /reviews/ has the REVIEW PAGE grid, which shows 6 at once. Cards per view and autoplay are Trustindex settings.
8. Resources hub: **kept**.
9. Articles: big gap after reviews, no quick rundown, gulf between body and sidebar, WhatsApp in "Need a quote?", breadcrumb gap: **done** (R3-5).
10. "You didn't use the SEO engine" and three links in one paragraph: **confirmed true**. Links are now spread one per paragraph in the section each belongs to, and the five-link "More on..." line is removed. The articles are **still not engine output** and are not labelled as such (R3-6). **GATED**: see "Engine pass" below.
11. Home 2 hero font: **Outfit**, self-hosted (R3-7).
12. Home 2 review section background: **white**.
13. Home 2 "Preparation First" gap / off-centre: **done**. The tall photo spans the copy's height, the copy is centred, and the trailing gap is reduced.
14. "What Brandon Can Paint and Paper for You" copy: **DEFERRED by Vince**, kept unchanged.
15. View All Services colour: **royal blue pill**.
16. Where to Find Us not updated: **done**. Round-2 fix 7 (plain text, plain dotted list, no box, map kept) is now applied on Home 2, plus day-by-day hours.
17. Specialist Wallcoverings / Interior and Exterior Work / Domestic and Commercial: **done**. All three are the same card, each with a full-width photo. The middle card gets `stone-farmhouse-0092`.
18. "Rooms looking tired": **done**. The services are removed and the buttons are the hero's pair (chrome Quick Quote Online + white Call).
19. Worth Reading button colour and unequal cards: **done** (royal pill; all three photos are the same height, so the cards are equal).
20. Form too tall: **done**. The "Leave your name..." paragraph is removed and the contact card is moved to the top of the photo and made compact. The form still works (live check below).
21. All Questions and Answers colour: **royal pill**.
22. Footer bottom bar grey: **done** on Home 2 (and Home 3, same footer): now the deeper navy (ink-800).
23. Hours as Google shows them: **done site-wide**. Every day is listed separately (R3-3).
24. Home 3 review section with a second background: **done**. It is now the site's own Reviews section.
25. "Branding Paper" section: **kept**.
26. "The person you call..." CTA: **done**. It now has both buttons and one of Brandon's photos under the navy overlay.
27. Preparation block with the circle: **kept**.
28. Gallery: **done**. Added a visible heading plus a line saying it shows six photos, and a See the Gallery button. The six photos are the sharpest finished-work photos in the pool, measured, then checked by eye.
29. "Homes and Business Premises Inside and Out": **done**. It lists all five services.
30. Home 3 Worth Reading: **kept**.
31. Home 3 form: **done**. WhatsApp button removed, the slimline moved to the left column, and "put the IRs correctly" read as **hours**, so the hours are now day by day (R3-3, interpretation recorded).

### Engine pass (the three articles): GATED, needs Vince
- Approved route: SEO engine (TheK-Dawg/claude-seo-engine) → drip D1 → drip worker (law: zeus-brain-2 `10-laws/sitebuilder-ARTICLE-PUBLISHING-LAW.md`). Before launch the seed exception allows baking articles into the build via `scripts/import-articles.mjs`. The importer's field contract matches a real engine output (rank mode only).
- **Blockers:**
  - The only engine checkout on this server (`/root/audit/claude-seo-engine`, HEAD 5 Sep) is stale. `git fetch` fails, and the newer engine (decisions dated Oct/Nov) is not here.
  - There is no `clients/truelinefinishes.com` brief or matrix. The handoff (`site-planner/scripts/handoff.mjs`) has fields still marked KIERAN-INPUT-REQUIRED.
  - Town research exists only for Baildon and Harrogate.
  - Brain CANON still lists "Anthropic API key for article batches (operator owes)".
- **Cost if run:**
  - Writing: Anthropic Batch, Opus, measured about **$0.057 per article** (engine `docs/SPEC.md`), so about $0.17 for three.
  - Research: Perplexity Sonar plus DataForSEO for SERP, PAA and town lookups for Guiseley and Ilkley, estimated **$0.10 to $0.30** (unverified). The engine needs a `--dry-run` max-spend figure before any paid call.
- **Nothing was run, and no provider was called.** To proceed, Vince's GO is needed on: the spend cap, which engine copy to use, and the brief inputs.
- **Security note for Vince:** the stale engine checkout's `origin` URL embeds a GitHub token (not repeated here). It should be rotated or removed.

### Verification (after the final edits)
- `npm run build` (28 pages), `token-gate.mjs` PASS, `audit.mjs --selftest` PASS (incl. the round-3 cases), `audit.mjs` 0 fails / 0 warnings. The address (street, postcode) is not in `dist`, and 07706 215917 is absent.
- `check.mjs` local: 28 routes × 1440/390, the only fails were a 1px-high "See the Gallery" label on /home-3/ (fixed: descender lift). **Live** (`check.mjs <workers.dev>`): **28 routes × 2 widths, 0 fails**, 494 buttons measured, worst offset 1.5px; every Trustindex slot rendered its own widget; Formlane renders the five default fields on every page with a form.
- Live read-back (curl): every route 200 (404 for a missing URL); /home-2/ and /home-3/ still `noindex, nofollow`, not in the sitemap and linked from nowhere; 0 "Monday to Friday" on any page; day-by-day hours on every page; Quick Rundown on the article; the sectors card on Exterior and Commercial; no WhatsApp in the article quote card; `/fonts/outfit-latin.woff2` 200 `font/woff2`; preview host `X-Robots-Tag: noindex, nofollow`.
- Screenshots (before = live, round 2; after = local + live, 1440 and 390): `/tmp/tl-r3/before/`, `/tmp/tl-r3/after/`, `/tmp/tl-r3/live/` (full pages for all 28 routes).

### Gates added (and proven by breaking them)
- `audit.mjs` round-3 gates:
  - hours are one row per day matching nap.json, and no "Monday to Friday" anywhere;
  - the hero slimline follows the paragraph and sits before the buttons;
  - the quote slimline sits between the selling points and the form card;
  - no WhatsApp in the article quote card or the Home 3 form;
  - articles have a Quick Rundown, no paragraph with more than one internal link, no link-dump line, and breadcrumbs between reviews and the article;
  - service intro has an H2 and a photo, the cards have an H2, and the card count is even;
  - Home 2 and Home 3 structure.
- `--selftest` covers 10 broken synthetic cases, all caught. A mutated copy of the real `dist` with 8 breaks gave exactly those 8 categories of fail (10 lines) and nothing else.
- `check.mjs` rendered gates:
  - hero slimline geometry (between the paragraph and the buttons; gaps 16 and 24px);
  - quote slimline left of the card on desktop and above it on mobile, never inside it;
  - footer hours day by day;
  - Home 2 h1 in loaded Outfit, royal buttons, navy footer bar, white reviews background, equal resource-card heights, full-width tile photos.
- The rendered gates were run on a broken copy (`CHECK_ROUTES` limits the routes): 10 of 10 expected fails, nothing else.

### Not changed / for Vince
- The shared quote section still has a "WhatsApp Brandon" button beside Call (not flagged on the main pages). **NEEDS VINCE**: remove it everywhere? (R3-11)
- The Exterior Painting "how a job runs" step 1 still says "use the quote form (choose Exterior work)". The default form has no such choice since round 2. Out of scope this round (minimal-change law); a one-line fix on his word.
- The Commercial intro photo is `office-prepared-0172` (a prepared office) because the only finished office photos are already the hero and the first card.
- Chromium only. `astro check` not run (`@astrojs/check` not installed; no install approved).

## HOME-3 (Vince's 19 Nov 2026 order: Home 3 is the design; finish the site and get it live)
Brief: `TRUELINE-HOME3-REBUILD-20261119.md`. Decisions: DECISIONS H3-1 to H3-9. Version **2.0.0**.
Code commit `0b385e8` (pushed; remote SHA read back with `git ls-remote`, see the commit after this report).
Worker `site-truelinefinishes`, version **`7b41b9d4-5308-4ad9-8274-8f3188f9cf7c`** (100%). Rollback: `npx wrangler rollback 2bafda5d-4c81-487a-bf6e-5715f931414e` (round 3).
States, kept separate: **built + checked: PASS** · **deployed to the established Worker (workers.dev) + read back: PASS** · **real domain: BLOCKED (below)** · **operator visual acceptance: NOT RUN (Vince's)**.

### Reference (from provenance, not inferred)
/home-3/ as built on 5 Nov (`6be336e`, "the section flow of https://dom.themerex.net/", capture `/tmp/refs/dom.themerex.net.html`) and corrected in round 3 (`11ebe8c`, R3-9). The live /home-3/ was screenshotted at 1440 and 390 before it was retired (`/tmp/tl-h3/ref/`) and is the comparison standard.

### What changed
- **Whole site in the Home 3 design** (tokens.css / global.css defaults, not a per-page re-point): navy ink header, footer, heroes and bands (no #000000), mist surfaces, royal on light / chrome on dark, Lexend Deca headings in mixed case + Kumbh Sans body, pill buttons and pill form fields, the logo blended onto the navy, the deeper-navy legal bar.
- **One hero on every page** (Hero.astro): Home 3's centred photo hero; home has its three-photo slider (arrows, dots, pauses on hover/focus, off-screen and under reduced motion). The slimline stays between the paragraph and the buttons.
- **Homepage = Home 3**: the same sections, copy and photos in the same order (side by side, desktop and mobile: identical apart from the additions). Additions: **Watch Brandon at Work** (the two videos) after the preparation block, and **Where to Find Us** with Brandon's listing map (CID), kept from the regular home because round 2 fix 8 ordered it there.
- **Every other page** keeps its content, sections and order, restyled to Home 3's patterns: hub tiles, related-service cards, plus/minus FAQ rows, the resources row, the edge-to-edge photo grid (WorkGrid on About, Reviews, Services; "in pictures" on hubs), the pale quote band with the white form card. No WhatsApp button in any quote section (H3-5); WhatsApp stays in the floating mobile button, the footer and /contact/. Section and card headings in Title Case (H3-6).
- **Videos** (H3-7): `https://youtu.be/mNwdUtQedkc` (full house, 16:9) and `https://youtube.com/shorts/v3g1Kdja0gk` (kitchen Short, 9:16), home page only, side by side at one height on desktop, stacked on mobile; `youtube-nocookie.com/embed/<id>?rel=0`, `loading="lazy"`, titled, fullscreen allowed, no autoplay. No other video. Cookie Policy, Privacy and Terms mention them again.
- **Variants retired** (H3-8): /home-2/ and /home-3/ deleted (and the Outfit/Manrope fonts and the variant-only CSS). `worker/redirects.js` (wrangler `main` + assets binding; it runs only for paths with no file) answers **301** for /home-2, /home-2/, /home-3, /home-3/, /home-3/index.html → `/`, and /complaints, /complaints/ → `/complaints-procedure/` (closes the 5 Nov /complaints/ open item). Unknown paths still get the site's own 404 page with status 404.
- Deleted components no page used any more: Statement, TrustBadges, AboutBlock, OurWork, CtaBand.

### Verification
- `npm run build` (26 pages) · `token-gate.mjs` PASS (52 files) · `audit.mjs` **0 fails, 0 warnings** · `audit.mjs --selftest` PASS · `contrast.mjs` (15 routes × 1440/390) **0 fails**.
- `check.mjs` local: **26 routes × 2 widths, 0 fails**. **Live** (`check.mjs https://site-truelinefinishes.small-bird-3273.workers.dev`): **26 routes × 2 widths, 0 fails**, 392 buttons measured (worst offset 1.5px), every Trustindex slot rendered its own widget (52 page-widths logged), the Formlane form rendered the five default fields on every form page, the internal links all resolve, the five retired URLs answered 301 to the right target, and both videos loaded a player with no error inside their frames at both widths.
- New gates, each proven by breaking a copy of `dist` on purpose:
  - audit: Home 3 hero marker on every page; the two videos on / only, youtube-nocookie, lazy, titled, no autoplay, 16:9 + 9:16 together; no video elsewhere; a retired URL built or linked; WhatsApp in any quote section. 6 breaks → exactly those 6 (8 lines), nothing else.
  - check.mjs: Lexend Deca + Kumbh Sans in use AND loaded; no capitals transform on h1/h2; header and footer `rgb(14, 27, 42)`, legal bar `rgb(16, 35, 58)`; pill buttons; every line of the hero headline centred (±2px); video aspect ratios, side by side at one height on desktop and stacked inside the viewport on mobile; players load in-frame; live 301s. 6 breaks → 12 fails (both widths), nothing else; the centring gate was tightened to measure text lines after the first proof missed a left-aligned hero on mobile, then re-proven (desktop 418px, mobile 56px off).
- Live read-back (curl): every route 200, `/sitemap.xml` + `/sitemap-index.xml` 200, `/fonts/lexend-deca-latin.woff2` 200 `font/woff2`; the 301s above; `/no-such-page/` and `/home-4/` 404 with "Page not found"; home `<meta name="robots" content="index, follow">`, `data-hero-style="home-3"`, both video ids; the preview host still sends `X-Robots-Tag: noindex, nofollow`.
- `cookies.mjs` live (6 routes): no cookies on any domain, no first-party storage. Extra probe: scrolled to the videos, both players ready, not played: **0 cookies**.
- A rebuild from HEAD is byte-identical to the deployed `dist` except `/.well-known/security.txt`'s `Expires`, which rolls forward on every build.
- Screenshots: approved Home 3 `/tmp/tl-h3/ref/`, new site local `/tmp/tl-h3/local/` and **live `/tmp/tl-h3/live/`** (every route, 1440 and 390, full page), side-by-sides `/tmp/tl-h3/sbs_home_d*.png` (desktop) and `/tmp/tl-h3/sbs_home_m*.png` (mobile), the live video section `/tmp/tl-h3/live-videos-viewport.png`. Headless full-page captures paint cross-origin frames (map, videos) dark; the viewport capture shows both players.

### Real domain: BLOCKED (ownership/credentials boundary, nothing changed)
- `truelinefinishes.com` is registered at **GoDaddy** (expires 18 Feb 2027) on **GoDaddy nameservers** (`ns15/ns16.domaincontrol.com`). Apex and www serve GoDaddy's parked page (a script redirect to `/lander`) from 3.33.130.190 / 15.197.148.33.
- The Cloudflare account has **no truelinefinishes.com zone** (44 zones listed, none matching). No Worker custom domain exists for it. There are no GoDaddy credentials on this server. A Worker custom domain needs the zone active on Cloudflare, so the site cannot be attached without the nameserver change.
- **Live email on the domain** must survive the move: MX `1 smtp.google.com` (Google Workspace), TXT `google-site-verification=_6NSCL-lKYdlLUYbK9w52PmWerDatvVA-D5ClfVNRjM`, SPF `v=spf1 include:_spf.google.com include:dc-bdaca08905._spfm.truelinefinishes.com ~all` (the `_spfm` include is GoDaddy's and resolves to nothing), `_dmarc` `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;`, DKIM `google._domainkey` (TXT, copy it exactly from GoDaddy).
- **Go-live steps once Vince/Brandon authorise it:** (1) add the zone `truelinefinishes.com` to the Cloudflare account (Free plan), recreate the mail records above (drop the GoDaddy parking A records and `_domainconnect`; decide whether to keep the `_spfm` include); (2) at GoDaddy, change the nameservers to the two Cloudflare gives; (3) when the zone is active: Worker → Custom Domains → `www.truelinefinishes.com` on `site-truelinefinishes`; the apex as a proxied record with a Redirect Rule `https://truelinefinishes.com/*` → `https://www.truelinefinishes.com/${1}` 301, keeping the query string (the canonical host is www, D13); (4) read back: www 200 with `index, follow`, apex and http 301 to https://www, the five 301s, sitemap on www, and a Formlane form render on www (both hosts are already allowed in Formlane); then send mail to Brandon@truelinefinishes.com to confirm MX survived. No test lead without GO.

### Not changed / for Vince
- **Visual acceptance is Vince's**: the side-by-sides show the homepage is Home 3 section for section, plus the two additions he did not see on Home 3 (videos, Where to Find Us).
- Exterior Painting step 1 still says "(choose Exterior work)", a form choice that no longer exists (open since round 3; one-line fix on his word).
- The three articles are still hand-written, not SEO-engine output (R3-6; engine pass still gated). No SEO batch run, no D1 approval changed, no test lead sent, no client message.
- No VideoObject schema (YouTube upload dates were not fetched).
- Chromium only; `astro check` not run (`@astrojs/check` not installed; no install approved). No packages were installed.

---

## ROUND 4: the operator's acceptance review of the preview (19 Nov 2026)

Brief `/root/.hermes/cache/scratch/TRUELINE-OWNER-REVIEW-ROUND2-20261119.md`, from Vince's own
transcript (`/root/.hermes/attachments/Pasted content (8.8 KB)`), read line by line before anything
was touched. His verdict on the build was **"everything else on this website looks very good and I'm
very happy with it"**, so this is a correction pass on the points he named, not a redesign. Minimal
change: the Home 3 design, the gallery page, the reviews page, the company pages, the footer quick
contact and the approved legal text are untouched except where he asked. Per-point record and the
exact words behind each change: `DECISIONS.md` R4-1 … R4-20. Version 2.0.0 → **2.1.0**.

### His points, and what was done
1. **Card text at 12px** (service cards on the home page and the hubs, related services, resources
   teasers): new `--fs-card: 16px` token drives every card and teaser body; card titles up one step
   with them (home tiles 20 → 24px, related services 18 → 20px). The home tiles no longer hide their
   line on a phone: the grid drops to one tile per row so the name and the line are both readable.
   Measured on the rendered page at 1440 and 390: nothing under 16px, and `check.mjs` now fails if
   anything is.
2. **Five service cards in one row** → **three across, then two centred underneath at the same size**
   (six-column grid; tiles 4 and 5 start at columns 2 and 4). Tablet: two across, fifth centred.
   Phone: one per row.
3. **The services section twice on the home page** → one. The second card set ("For Homes and
   Business Premises, Inside and Out", five more links to the same five pages) is deleted, markup,
   CSS and data; its wording is folded into the surviving head and its View All Services button moved
   there. The home page now has exactly one services-links section, gated both ways.
4. **H1s and buttons a little larger**: inner-page H1 44 → 52px (44 at tablet, 36 on a phone); every
   button `--btn-h-lg` tall with a 17px label (was 48px/15px). The home H1 stays at 64px.
5. **Hero heights**: every inner-page hero is now the same **720px** on a desktop (they were 574-655
   and all different). The home hero is **690px** instead of 840, so the **"What customers say"**
   section comes up under it instead of a bare white strip. Gated: inner heroes 720 ± 2px, home hero
   never within 40px of the window height.
6. **The home hero carousel moves on its own and loops for ever.** The arrows, the dots and the code
   behind them are gone, so there is nothing for a visitor to operate and no control left to be
   unreachable; it still stops while off screen, and `prefers-reduced-motion` holds the first photo
   with no movement. No new images.
7. **Reviews button**: a right-aligned **"Read the Reviews"** pill beside the line under the
   "What customers say about us" heading, on every page except /reviews/ itself. The line already
   said the reviews come straight from TrueLine Finishes' **Google Business Profile**: "Trailhead and
   Google Play" in the transcript is speech-to-text noise, and neither name appears anywhere on the
   site. The reviews page itself is unchanged.
8. **"Further Reading" off the service pages**: the teaser that closed each hub is gone and
   `FurtherReading.astro` is deleted with its last caller. Articles keep their cards on /resources/,
   their own pages and the home resources row. Any page that grows one back fails the audit.
9. **Service-page CTA**: "Ready to talk it through?" is now a line with the **Quick Quote Online
   button** under it, scrolling to the same `#contact` form slot. Gated as a button, not a text link.
10. **Copy, brand before owner**: "What TrueLine Finishes Can Paint and Paper for You"; "Watch
    TrueLine Finishes at Work" with "TrueLine Finishes videos from their YouTube channel" (no count);
    "Photographs taken on TrueLine Finishes jobs" (no count); "Tell Us About the Job", whose lead now
    says a call is a direct line to Brandon; About: "Who Will Be Painting Your Home? Meet TrueLine
    Finishes" and "The TrueLine Finishes Standard"; home H1 "... by TrueLine Finishes". Brandon is
    still named as the owner who does every job. The surname is out of the edited marketing copy and
    stays in the structured data, /company-facts/ and the legal text, which he passed as correct.
11. **LMB credit**: identical wording, style and hover on every page; the keyword is a link **on the
    home page only** and plain text everywhere else (no href, tabindex or role), so the site makes
    exactly one outbound credit link. Gated both ways, in the HTML and in the browser.
12. **Half the gallery on the home page**: every second photo in each of the gallery page's groups
    (94 of its 188), in the gallery page's own treatment, which he called fantastic: square tiles with
    gaps, four across, three at tablet, two on a phone, lazy-loaded, same lightbox, See the Gallery
    kept. The six-photo block is unchanged on /about/, /reviews/ and /services/, because he reviewed
    it on /reviews/ and said not to change it there.
13. **Service-page galleries** in the same square, spaced treatment instead of edge-to-edge.
14. **The missing gap on /gallery/** before the Quick Quote section: the rule was `.gl:last-of-type`,
    which matched nothing (the last `<section>` on that page is the quote form), so the padding was
    zero. The last group now carries `gl--last` with a full section pad: **0 → 96px**.
15. **Legal pages interlinked in their content**: a "Where to Go Next" block at the end of Privacy,
    Terms, Cookie Policy, Complaints Procedure and Accessibility links the other four plus About,
    Contact and the home page. /company-facts/ and /find-us-online/ are left exactly as approved.
16. **No orphan pages**: a new site-level audit gate requires every built route to be linked from at
    least one other built page. The only exemptions are /thank-you/ (the form's own redirect target,
    noindex) and the 404 page, which nothing should link to. The site has no other orphan.
17. **WhatsApp icon** redrawn as the bubble with the bottom-left tail and the handset inside, on the
    set's own 24 grid and stroke weight. The footer line and the floating mobile button share one
    glyph, so they always match; the button stays mobile-only and opens wa.me/447949484274
    (07949 484274, never 07706 215917). **Hours checked, not changed**: they match
    `site-plan/nap.json` (the Google listing), 7am to 7pm Monday to Friday, 8am to 6pm Saturday and
    Sunday, printed one row per day.
18. **Commercial image captions** given the trade keyword as well as the room, truthfully, in
    `scripts/images.mjs` (the source of truth) and `src/data/images.json` together.

### Deliberately not done this round
- **Gallery tabs with a scrolling thumbnail sidebar (R4-19).** He asked for it as a preference, the
  brief made it conditional on not spoiling the gallery he already likes and not delaying the core
  correction, and he said the mobile layout must stay as it is. It is a new interaction needing its
  own keyboard, focus and deep-link work. Carried as the next optional enhancement; the gallery page
  is otherwise untouched.
- **The form, the reviews page and the company pages**, by instruction. The Formlane embed was
  inspected **read-only** at `api.formlane.uk/edge/config/f_5ELbk5JcKfFh2EEaclT6`: five fields in
  order (name, email, phone, postcode, short description), labels hidden with placeholders showing,
  button "Quick Quote Online", after-submit **redirect to `/thank-you/`** passing the first name.
  **No test lead was sent.** No registrar, DNS, mail or client contact was touched.

### Gates (all run; every new one proved by breaking a copy of `dist` on purpose)
- `npm run build` 26 pages · `token-gate.mjs` PASS (51 files) · `audit.mjs` **0 fails, 0 warnings** ·
  `audit.mjs --selftest` PASS (round-3 and round-4 gates, 15 broken cases caught) ·
  `contrast.mjs` **0 fails**.
- New audit gates, each fired by a deliberate break and silent on the clean build: Further Reading
  back on a hub; the steps CTA back to a text link; the reviews button removed; the LMB credit linked
  off the home page; the gallery's bottom padding removed; a legal page missing its About link; the
  duplicate services section back; hero slide controls back; the home gallery shrunk; and the orphan
  gate (proved by unlinking /accessibility/ across the whole build).
- `check.mjs` (Chromium, every route at 1440 and 390) carries new rendered gates: card body never
  under 16px, no manual hero controls, one services section on the home page, the reviews button
  present and a real button, the steps CTA a visible button, no Further Reading, real space before the
  gallery's quote section, inner heroes 720px, the home hero shorter than the window, the home gallery
  square and spaced, and the credit linked on the home page only.
- **Button centring gate corrected, not relaxed.** It measured the label's *ink* top, and round
  capitals and tall lowercase overshoot the cap line, so the reported offset grew with the type size
  and the larger buttons showed a false 2px error. It now measures the **metric** cap height ('H') and
  descender depth ('p'), which is the box `text-box: trim-both cap alphabetic` actually centres. The
  descender lift was re-tuned for the new size at the same time.

### Released and verified live (19 Nov 2026)
- Commit **`8167d29`**, pushed to `github.com/TheK-Dawg/site-truelinefinishes` `main`
  (`git ls-remote` returns the same SHA). Deployed through `scripts/deploy-guard.mjs` to the
  **existing** Worker `site-truelinefinishes`, **Version ID `f9884024-1b9e-43eb-a238-7ad8c40b4d71`**,
  https://site-truelinefinishes.small-bird-3273.workers.dev. No other Worker was touched.
- `check.mjs` **against the live URL**: **26 routes × 1440/390, 0 fails**; 456 buttons measured,
  worst offset **0.5px**; every Trustindex slot rendered its own widget; the Formlane form rendered
  its five fields on every form page; all 24 internal link targets resolve; the retired URLs answer
  301; both videos loaded a player with no error inside their frames at both widths.
- Served read-back (curl): every route 200, `/sitemap.xml` 200, `/no-such-page/` 404,
  /home-2/ and /home-3/ → 301 `/`, /complaints/ → 301 `/complaints-procedure/`; the preview host
  still sends `X-Robots-Tag: noindex, nofollow`. Home, a hub, /gallery/ and /privacy/ served bytes
  are **md5-identical** to the committed build.
- Served HTML spot checks: the LMB credit keyword is an `<a rel="nofollow noopener">` on `/` and
  `footer-credit__link--plain` on `/terms/` (0 localmapbooster hrefs there); 0 `further-reading`
  sections on a hub; `data-cta="reviews-page"` present on inner pages; 0 `data-slide-next` on the
  home page; **95** square gallery tiles on the home page; 7 `legal-related` links on
  /accessibility/.
- Computed live (Chromium, 1440): home hero **690px**, /interior-painting/ and /gallery/ heroes both
  **720px**; buttons **17px**; `.sv__body` **16px**, `.sv__title` 24px, `.rl__body` 16px,
  `.ap__body` 16px; the last gallery group's bottom padding **96px** (was 0).
- Carousel live: three photos, advancing on their own `0 → 1 → 2 → 0 → 1 → 2 → 0 → 1` over 48s
  (it loops), **0 controls** inside the hero, and under `prefers-reduced-motion: reduce` it stays on
  the first photo for the whole 7s window.
- Live orphan sweep over all 25 routes: the only route with no inbound link is **/thank-you/**, which
  is the form's own redirect target and noindex, as intended.
- `cookies.mjs` live (6 routes): **0 cookies, 0 first-party storage** on every route.

### Real domain: STILL BLOCKED at GoDaddy (nothing was changed)
Re-checked today, read-only: `truelinefinishes.com` still answers on GoDaddy nameservers
`ns15/ns16.domaincontrol.com`, the apex and www both resolve to GoDaddy parking
(3.33.130.190 / 15.197.148.33) and serve the `/lander` redirect page, and the Cloudflare account
still has **no zone** for `truelinefinishes.com` (zones API, `name=truelinefinishes.com` → 0
results). Live Google Workspace mail is on the domain (`MX 1 smtp.google.com`). A Worker custom
domain needs the zone active on Cloudflare, so the site cannot be attached without the nameserver
change at GoDaddy, which needs Vince's or Brandon's authority and access. **The preview URL is a
preview, not the real domain.** The go-live steps and the exact mail records to recreate are in the
HOME-3 section above and are unchanged.

## ROUND 5: the operator's second review of the preview (19 Nov 2026, brief `TRUELINE-OWNER-REVIEW-R5-20261119`)

Vince reviewed the round-4 preview and rejected five results. This is a correction release on the
same Worker preview: no DNS change, no mail change, no test lead, no installs, no paid API calls, no
image generation, no new template, no refactor beyond the five items. Round 4's other rulings stand.
Per-point dispositions and the rule conflicts are in `DECISIONS.md` (R5-1 to R5-7).

| | |
|---|---|
| Repo | github.com/TheK-Dawg/site-truelinefinishes, branch `main`, commit `8b5871b` (remote SHA read back with `git ls-remote`: `8b5871b4260b84f3a610beffa8b57aa015b859cb`) |
| Version | `package.json` 2.1.0 → **2.2.0** |
| Worker | `site-truelinefinishes`, deployed through `scripts/deploy-guard.mjs`; **Version ID `1a1d239a-b413-4597-b20e-909e08ab9d0b`** |
| Worker URL | https://site-truelinefinishes.small-bird-3273.workers.dev (still noindexed by `public/_headers`) |
| Real domain | **unchanged and still blocked** at GoDaddy. No DNS or mail record was touched this round |

### 1. Home gallery: 95 photographs → 20 distinct (R5-1)
`WorkGrid.astro`'s `full` mode no longer walks half the gallery collection. It renders `HOME_PICKS`,
a fixed list of **20 distinct photographs** in the gallery page's group order: 12 interiors (two
living rooms, a media wall, two bedrooms, three kitchens, a hallway, a staircase, a bathroom,
cloakroom panelling), 5 exteriors (mock-Tudor frontage, stone farmhouse, a navy front door, a sash
window in stone, painted railings), the wallpaper feature wall, and 2 business premises. Same square
spaced tiles, same lightbox, same "See the Gallery" button. None of the 20 repeats a photograph the
home page already uses in its hero carousel, CTA band, service tiles or preparation block.
The gallery page (all 194) and the reviews-page grid are untouched.
**Served proof:** `/` returns 20 `data-lightbox` tiles and 20 distinct `data-full` files; the
rendered check counted `tiles=20 distinct=20 visible=20` at 1440 and at 390.

### 2. One hero height for every page (R5-2)
Round 4 left the home hero at 690px against 720px on the inner pages; Vince called that a mismatch
and too small. There is now a single `--hero-h` custom property per breakpoint in `Hero.astro`,
used by the home hero and the inner-page (`compact`) hero alike: **780px desktop, 640px tablet,
540px phone** (a floor on a phone, so a long headline grows the hero instead of being clipped).
`.hero--compact` is a type variant only and sets no height of its own.
**Served proof** (`node scripts/hero-heights.mjs <url>`, all 24 hero routes):
desktop 1440 → **24/24 exactly 780px**; tablet 768 → **24/24 exactly 640px**; phone 390 → every
route at or above the 540px floor (540 to 657, content never clipped: the gate measures the hero
copy against the hero box). The carousel still auto-advances with no controls and
`prefers-reduced-motion` still holds the first photo.

### 3. H1s and copy, written through the `conversion-copywriter` skill (R5-3)
The skill at `/root/.claude/skills/conversion-copywriter/SKILL.md` was read and applied: intake,
fact harvest from the client's own statements, the zoom-in ladder on each abstraction, a named enemy
(the decorator who opens the paint on day one and leaves the cracks), four to six alternates per
load-bearing line, then Harry Dry's three-rule gate scored line by line. The run is in `copy-run/`
(`brief.json`, `copy.json`, `copy-deck.html`). The skill's own `scripts/render_deck.py` is **not
present in the installed copy**, so nothing was installed: the deck was rendered by a throwaway
Python-3-standard-library script kept outside the repo.

Every H1 shipped (served HTML):

| Route | H1 |
|---|---|
| `/` | Painter and Decorator in Baildon and Shipley |
| `/services/` | Painting and Decorating in Baildon and Shipley |
| `/painting-and-decorating/` | Painting and Decorating in Baildon, Ilkley and Otley |
| `/interior-painting/` | Interior Painting in Baildon, Guiseley and Ilkley |
| `/exterior-painting/` | Exterior Painting in Baildon, Shipley and Otley |
| `/wallpapering/` | Wallpapering in Baildon, Ilkley and Guiseley |
| `/commercial-painting-and-decorating/` | Commercial Painting and Decorating in Baildon and Leeds |
| `/about/` | About TrueLine Finishes, Painting and Decorating in Baildon |
| `/contact/` | Get a Free Painting and Decorating Quotation in Baildon |
| `/reviews/` | Painting and Decorating Reviews in Baildon and Shipley |
| `/gallery/` | Painting and Decorating Photographs, Job by Job |
| `/faq/` | Painting and Decorating Questions, Answered |
| `/resources/` | Painting and Decorating Resources, Town by Town |
| `/thank-you/` | Thanks. Your enquiry is in and TrueLine Finishes will be in touch. |
| legal set, `/company-facts/`, `/find-us-online/`, `/sitemap/`, `/404` | unchanged (approved wording) |

The town is **Baildon and Shipley** (`site-plan/nap.json`: base town Baildon, the address line reads
"Baildon, Shipley"); the transcript's "Baldon" is speech-to-text noise and appears nowhere. Every
town named in an H1 is checked against `site-plan/towns.json` by the audit, so no service town can be
invented. Subheads carry the proof the H1 no longer does: preparation (sanding, filling, caulking,
and a mist coat on new plaster), over eight years' experience, fully insured, free quotations. No
price, guarantee, accreditation, response time, rating or review count appears anywhere, because
none exists.

**Honest limit, recorded rather than hidden:** the keyword-plus-location H1s score 2 of 3 on the
skill's gate (a rival decorator could sign "Painting and Decorating in Baildon and Shipley"). That
trade is Vince's instruction for this round; the only-us burden moved to the subheads, the CTA band
line and the photographs. No customer review text could be mined, because this site may not write
reviews, ratings or counts and the real ones live inside the Google-fed Trustindex widgets.

### 4. The owner's name out of the marketing copy (R5-4)
`"Every card below is work Brandon carries out himself"` is **deleted**. Every other self-work proof
trope went with it, including the home CTA band (now "Sanding, filling and caulking come with every
job.") and the home USP box ("Brandon on Every Job" → "Preparation Included"). The sweep was done
across rendered pages, not one file: 181 name strings across pages, components, the five service
content modules, the general FAQ and the three published articles.

Where the name remains, and why:
- **Legal identification (deliberate, declared exception):** `/privacy/` (the named data controller),
  `/terms/` ("run by Brandon Dawson, trading as TrueLine Finishes") and `/company-facts/` (who runs
  the business). UK practice expects a sole trader to be identifiable to the customer and to a data
  subject, and the brief said not to change legal identity without reviewing the requirement.
- **Structured data:** the `founder` node on the business and the `author` node on articles. Those
  are identity statements, not marketing copy or metadata.
- **The real email address** `Brandon@truelinefinishes.com`, which is a fact.
- **One first-name mention in marketing copy**, in the `/contact/` quote-form lead explaining the
  direct line, which is the use Vince allowed.

**Served proof per route:** 0 occurrences of the full name and 0 of the first name on `/`,
`/services/`, all five hubs, `/about/`, `/reviews/`, `/gallery/`, `/faq/`, `/resources/`,
`/thank-you/`; 1 first name on `/contact/`; the legal-identification pages as listed. No owner name
in any H1, H2, H3, `<title>` or meta description on any route.

### 5. Services tile footer: a quote button, never a phone number (R5-5)
Component-level change in `ServicesGrid.astro`: the `CallButton` and the small inline "Quick Quote
Online" text link are both gone. The footer is one prominent **Quick Quote Online** button in the
site's primary pill style, through to that page's own Formlane section (`#contact`, or
`/contact/#contact` on a page with no form), with **View All Services** kept beside it on the home
page in the dark pill. The `showCall` and `moreLine` props were deleted with their callers, so no
page can put a phone number back under the tiles. The phone is untouched in the header, the hero,
`/contact/`, the footer and the mobile sticky bar.
**Served proof:** on `/`, `/services/` and `/resources/` the services section contains a `btn`-class
`services-quote` button reading "Quick Quote Online" and **no `tel:` href at all**; verified in the
served HTML and in the rendered run at 1440 and 390.

### Gates added, and proved by breaking them
- `scripts/audit.mjs` round-5 block: H1 service keyword + a town from `towns.json` (and the
  `/services/` and home rules), no question H1s, no self-work trope, no owner name in headings,
  titles or descriptions, a per-route name allowance, and the services-footer rule.
  `node scripts/audit.mjs --selftest` runs **16 deliberately broken cases** plus the good, legal and
  contact pages, and **4 home-gallery cases** (21 photographs, a repeat, a thinned set, a good 20).
- `scripts/audit.mjs` compiled-CSS hero policy: one `--hero-h`, hero height read from it,
  `.hero--compact` with no height of its own. Proved by giving `.hero--compact` its own height: the
  gate fired, and so did `hero-heights.mjs` (four different tablet heights reported).
- `scripts/hero-heights.mjs` (new): every hero route at 1440, 768 and 390, exact match at desktop and
  tablet, floor plus clipping check on a phone, and a "more than one height at this width" failure.
  It waits for `networkidle` and `document.fonts.ready` and takes two agreeing readings, because
  measuring a LIVE page at `load` reported heights from 487px to 1384px on pages that are all 640px
  (proved with a probe before trusting the gate).
- `scripts/check.mjs`: hero heights updated to the one policy, hero-content clipping, and the home
  gallery counted on the served page (tiles, distinct files, tiles actually rendering at that width).

### Checks run this round (results as recorded)
| Check | Result |
|---|---|
| `npm run build` | 26 pages, clean |
| `node scripts/token-gate.mjs` | PASS, 51 files, 0 violations |
| `node scripts/audit.mjs --selftest` | all four gate families behave: Trustindex 10 cases, copy bans 8 bad + 2 good, round-3/4 + home-gallery 19 broken cases, round-5 16 broken cases |
| `node scripts/audit.mjs` (dist) | **26 pages, 0 fails, 0 warnings** |
| `node scripts/hero-heights.mjs <live>` | **24 hero routes x 3 widths, 0 fails**: 780px on all 24 at 1440, 640px on all 24 at 768, at or above the 540px floor at 390 with no clipped content |
| `node scripts/check.mjs <live> --log` | **26 routes x 2 widths against the deployed Worker, 0 fails** (overflow, H1s, hero CTA above the fold, header/nav, sticky bar, Trustindex rendering and placement, button centring 412 buttons worst 0.2px, videos, redirects, home gallery `tiles=20 distinct=20 visible=20` at both widths) |
| `node scripts/cookies.mjs <live>` | 0 cookies and 0 first-party storage on every route, so the Cookie Policy still matches |
| Served-byte sweep (17 routes) | every H1 as listed, no self-work trope, no owner name outside the declared exceptions, services footer quote button with no `tel:` href, home gallery 20 tiles / 20 distinct files |
| Live redirects | `/home-2/` and `/home-3/` 301 to `/`, `/complaints/` 301 to `/complaints-procedure/`, unknown path 404, `x-robots-tag: noindex, nofollow` still on the preview |
| Screenshots | desktop 1440 and phone 390 of `/`, `/services/`, `/interior-painting/`, `/about/`, plus the services footer, the services tiles and the home gallery, in `/tmp/r5-shots/` |

Lazy-loaded tiles do not appear in a bare element screenshot; both the services tiles (5/5) and the
home gallery (20/20 at 1440 and at 390) were confirmed loaded by reading `img.complete` and
`naturalWidth` on the served page after scrolling.

### What was NOT done, and why
- **No DNS, nameserver or mail change**, no custom domain attached: the real domain is still on
  GoDaddy nameservers with live Google Workspace mail, exactly as recorded in the HOME-3 section.
  Nothing about it was touched this round.
- **No test lead** through the Formlane form, **no installs**, no paid API call, no image
  generation, no new template and no refactor beyond the five corrections.
- `astro check` was not run: `@astrojs/check` is not installed in this repo and the brief forbids
  installing anything. The gate set that did run is the one in `CLAUDE.md` (build, token gate,
  audit + selftest, hero heights, rendered check, cookies).
- **Round 4's deferred item (R4-19, gallery tabs with a thumbnail sidebar) is still deferred**: it
  was not part of this correction.
- One consequence worth flagging for the next review: because R5-5 is a component-level change, the
  Quick Quote Online button now also sits at the end of the services block on `/resources/`, which
  is directly above that page's quote form. That follows his instruction ("a component-level
  change, not just the service detail steps CTA"); say the word and it can be suppressed on that
  one page.

## ROUND 6: the operator's whole-site review, mobile first (25 Nov 2026, brief `TRUELINE-MOBILE-HERO-ARTICLE-READY-20261125`)

| | |
|---|---|
| Source commit | `020d3d790648168a2bb2a33c0f7fcde57225be81` on `main`, pushed to `TheK-Dawg/site-truelinefinishes` (was `14aad04`) |
| Version | `2.3.0` |
| Worker | `site-truelinefinishes`, deployed through `scripts/deploy-guard.mjs`; **Version ID `aeb76328-b0d9-4d19-a618-71822fe77bae`** |
| Preview URL | https://site-truelinefinishes.small-bird-3273.workers.dev (still noindexed by `public/_headers`) |
| **Real domain** | **https://www.truelinefinishes.com — LIVE and serving this build.** Apex 301s to www, HTTP 301s to HTTPS. This is new since round 5 |
| States | built + checked **PASS** · deployed to the established Worker + read back **PASS** · real domain served + read back **PASS** · operator visual acceptance **NOT RUN** (Vince's) |

### What he asked for, and what it is now

1. **Whole-site smoke and visual check** — run, below. No test lead was sent and no claim is made
   about Brandon's receipt of the operator's own test.
2. **Home hero bigger, ground darker so the Google strip reads** — R6-1, R6-2.
3. **Call CTA legible; mobile sticky bar pills saying Call Us with sheen on both** — R6-3, R6-4.
4. **The official WhatsApp mark, with motion** — R6-5.
5. **Resources path ready for the engine's first scheduled post** — R6-6 to R6-11, and the gate that
   is **not** passed, R6-10.

Full before/after table with his words: `DECISIONS.md`, "Operator round 6".

### The numbers behind the two contrast instructions

| Measured | Before | Now |
|---|---|---|
| Trustindex strip (white) over the brightest part of a hero photograph, top of hero | **3.35:1** (below AA) | **4.90:1** |
| the same, foot of hero | 4.59:1 | **6.92:1** |
| Call pill label over a pure-white photograph | effectively white on white | **5.61:1** (about 12:1 inside a hero, 18.9:1 over a dark photograph) |
| Call pill phone icon | chrome blue, **2.42:1** on white | white, same as the label |
| Button label | 17px medium | **18px semibold** |

**Declared non-change.** The planned brand chrome `#2CB0F8` was NOT re-hexed. Ink on chrome is
already 7.17:1, so deepening the blue would have *lowered* the label's contrast, and the plan records
that hex with its contrast pairs. What read as pale was the hero ground, which R6-2 fixes.

### Articles: what the fixture run found

The real `scripts/import-articles.mjs` and the real renderer were run against a throwaway batch of
three engine-shaped articles (4, 3 and 7 H2s; one deliberately rejected rank), then the batch was
deleted and `src/data/articles.json` restored — SHA-256 `4ff9fe79…a733` before and after, identical.

Four things would have gone wrong on the engine's first scheduled post:

1. **Off-topic photographs.** Category fallbacks were concatenated, so the live Ilkley interior
   article carried a gable wall and the front of a house. Fixed, and the honest budgets are now
   published: 187 / 147 / 31 / 6, and **0 for wallpapering**.
2. **A foreign CTA.** All **838** engine articles on this box end with a hard-coded CTA block
   carrying another client's palette, URL and telephone number as inline styles.
3. **No Quick Rundown.** The audit demands one; the importer never made one. **The first engine
   article would have failed `node scripts/audit.mjs` outright.**
4. **The orphan gate** flagged every review-status article, which is unlinked by design.

A fifth defect was found by the fixture itself: `.prose a` outranks `.btn-primary`, so the new
in-article CTA's pills first rendered at **1.45:1** and **1.53:1**. `scripts/contrast.mjs` fires on
both once the route is passed to it explicitly, and the article styles now hold the pills' colours.

### Checks (all re-runnable)

| Check | Result |
|---|---|
| `npm run build` | 26 pages |
| `node scripts/audit.mjs` | **26 pages, 0 fails, 0 warnings** (now including the round-6 article photo-pool and article-body gates) |
| `node scripts/token-gate.mjs` | **PASS, 51 files, 0 violations** |
| `node scripts/hero-heights.mjs` (local) | **24 routes x 3 widths, 0 fails** |
| `node scripts/contrast.mjs` | **0 fails** |
| `node scripts/check.mjs` (local) | **26 routes x 2 widths, 0 fails**, 412 buttons worst 0.5px |
| `node scripts/check.mjs https://site-truelinefinishes.small-bird-3273.workers.dev` | **26 routes x 2 widths, 0 fails**, 460 buttons worst 0.5px |
| `node scripts/check.mjs https://www.truelinefinishes.com` | **26 routes x 2 widths, 0 fails**, 460 buttons worst 0.5px |
| `node scripts/hero-heights.mjs https://www.truelinefinishes.com` | **24 routes x 3 widths, 0 fails** (home 840/720/720, every inner hero 780/640/540+) |
| sticky bar + WhatsApp, live, 390/360/320 | **0 problem route-widths**: both pills 9999px radius, 48px tall, both sheening with a 0.7s stagger, `tel:+447949484274` intact, `data-brand="official"` on the mark, hidden over hero/form/footer, no horizontal overflow, WhatsApp never overlapping the bar |
| reduced motion | every sheen and the WhatsApp bob stop; the probe sees them running when motion is allowed, so it is not a false pass |
| article assets, 1440 + 390 | every figure painted, every `/images/` request 200, no overflow |
| `node scripts/cookies.mjs https://www.truelinefinishes.com` | **zero cookies on every route**, as the Cookie Policy says. One first-party **sessionStorage** key, `lf_t`, set by the Formlane script — see the open item below |

**Gates proved by breaking them, before any clean pass was trusted:** `.hero--compact` given a height
of its own → 48 inner-page failures; the home re-point removed → 5 home failures; an off-topic figure
and a repeat planted in a built article → both caught by name; the in-article CTA colour rule removed
→ contrast fired at 1.45:1 and 1.53:1. The stale `--selftest` claim in `hero-heights.mjs`'s header
(a switch that was never written) was corrected rather than left standing.

### Served read-back

Compiled CSS on the live domain carries `--hero-h-home`, `.hero:not(.hero--compact){--hero-h:var(--hero-h-home)}`,
`--v-overlay-slide:linear-gradient(180deg,#0e1b2a9e 0%,#10233ab8 100%)` (0.62 / 0.72),
`.btn-call--dark{background:var(--glass-pill)…}`, `.btn-call--dark .icon{color:var(--text-inverse)}`,
`--whatsapp-fg:#fff`, `@keyframes wa-bob`, and
`@media (prefers-reduced-motion:reduce){….btn:after,.sb a:after{animation:none;display:none}…}`.
Served HTML carries `aria-label="Call TrueLine Finishes on 07949 484274"` on the sticky call button
with the label `Call Us`, and the official WhatsApp path (`data-brand="official"`, `M17.472 14.382…`).

### Real domain: it cut over during this round

The registrar now delegates `truelinefinishes.com` to `brianna.ns.cloudflare.com` and
`zac.ns.cloudflare.com` — confirmed at the `.com` parent (`a.gtld-servers.net`) and at 1.1.1.1,
8.8.8.8 and 9.9.9.9. The Cloudflare zone `895830f658c0ba796c06dcee75fbd39b` is active and full, apex
`A 192.0.2.1` proxied with `www` CNAME to the apex, and Google Workspace MX/SPF/DKIM/DMARC untouched.
Live: `https://www.truelinefinishes.com/` 200 with this build, apex 301 to www, `http://` 301 to
`https://`, `robots.txt` Allow with the sitemap, canonical on www, 24 URLs in `sitemap-0.xml` (every
public page), `/thank-you/` and `/404` noindex, 0 public pages wrongly noindexed, the three retired
URLs still 301, and the Formlane slot present on every page.

**One honest caveat about how that was measured.** This build host's own resolver repeatedly served a
stale GoDaddy parking answer (`3.33.130.190`, `15.197.148.33`), which redirects a browser to
GoDaddy's `/lander`; flushing fixed it for a few minutes at a time. The browser gates against the
real domain were therefore run with a **temporary** `/etc/hosts` pin to the Cloudflare edge
(`104.21.80.47`), removed immediately afterwards and `/etc/hosts` verified byte-identical to its
backup. That pin proves EDGE ROUTING; ordinary public DNS was proved separately and independently at
the `.com` parent and at three public resolvers. No DNS record was changed by this session.

### Open items after this round

1. **The engine's publication path is NOT proved end to end, and is not claimed to be.** Everything
   from the engine's artefacts onward is proved; the D1-to-repository-to-deploy half is not wired for
   this site. `worker-drip-worker` has no `truelinefinishes.com` registry entry, commits
   `src/content/resources/<slug>.md` for a collection this site does not have, reads R2
   `truelinefinishes/` (**zero objects**; TrueLine's photographs are under
   `customers/trueline-finishes/`) and writes `r2.dev` image URLs this site does not use. **And
   nothing rebuilds or redeploys this site on a push** — no CI workflow, and the Worker serves a
   pre-built `dist/`. Those are another repository's changes and were deliberately not made here.
   Full write-up and Kieran's pre-flight: `ARTICLE-PUBLICATION-CONTRACT.md`.
2. **Wallpapering has one photograph** and it is already that hub's hero, so a wallpapering article
   ships with no body figures. R2 was listed read-only and the 10 uncategorised `gallery/` objects
   were downloaded and inspected: another decorator's website screenshot, two logo wordmarks, two
   photographs with a person in them, a rotten-frame close-up and four near-duplicates of jobs
   already on the site. **None is a wallpapering photograph.** Commercial is thin at 6. Brandon needs
   to supply more; stock and generated imagery stay banned.
3. **Cookie Policy wording, one sentence.** The inventory is accurate on cookies (there are none),
   but the form service stores one first-party `sessionStorage` key, `lf_t`. The policy's "The quote
   form" section does not say so. Pre-existing, not a regression, and legal copy is the operator's,
   so it was not edited. Suggested addition, on his word: *"The form service also stores a single
   short-lived key in your browser's session storage while the form is open, so your enquiry can be
   sent; it is cleared when you close the tab."*
4. **`/cookie-policy/` still carries "Last updated: 19 November 2026"**, against the 30 Sep house law
   of no dates on any page. Pre-existing and part of the approved legal text; flagged, not changed.
5. **Round 4's deferred R4-19** (gallery tabs with a thumbnail sidebar) is still deferred.
6. `astro check` was not run: `@astrojs/check` is not installed here and the brief forbids installs.

### Not touched, by instruction

The Formlane form (no test lead), the four Trustindex widgets, the reviews and gallery pages, the
approved legal text, the photographs themselves, the towns, the plan and the seed. The three
hand-written articles keep their URLs, their `published` status and their copy; only their figures
changed, and only to remove the off-topic ones. No GoDaddy DNS write, no MX/SPF/DKIM/DMARC change, no
second Worker, no other client's repository, no install, no paid API call and no image generation.
