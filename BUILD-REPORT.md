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
