# REV3 REPORT — Buildings For Life (operator review 5 Oct 2026)

Against `../REV3-BRIEF.md`. Every numbered item was built, then verified against the BUILT
output in `dist/` — copy greps for 4/5/6, measured 360x780 and 1440x900 Chromium probes for
1/2/3/8/9, and a live field diff against the engine's own config for 7.

**Result: 9 of 9 items PASS. Nothing deployed** (Zeus deploys). The logo was not touched.

Reproduce the whole thing:

```
npm run build && node scripts/token-gate.mjs && npm run check && node scripts/verify-rev3.mjs
```

`scripts/verify-rev3.mjs` is new and holds one check per brief item
(`node scripts/verify-rev3.mjs 2 8` runs just those).

| Gate | Result |
|---|---|
| `npm run build` | PASS — 24 pages |
| `node scripts/token-gate.mjs` | PASS — 45 files, 0 violations |
| `npm run check` (24 routes x 1440 and 360) | PASS |
| `node scripts/verify-rev3.mjs` | PASS — 9 items |

One commit per numbered section, pushed to `origin/main`:

```
70339c5  REV3 item 1: kill service-page text walls, split bands with photographs
210f2a3  REV3 item 2: wide full-width areas map, town list under it
9cb1c0b  REV3 item 3: Our Work moves above the map/areas section
eed3ee9  REV3 item 4: related-service cards link on the button, anchor = service name
5facbe6  REV3 item 5: "guides" is banned, the section is Resources everywhere
294f3a8  REV3 item 6: one review component, one slimline strip, no clashing numbers
1f995ee  REV3 item 7: the quote form is now the standard Cloudflare form
feb414d  REV3 item 8: sticky bar reads Quick Quote + a yellow number-only call button
b12ee54  REV3 item 9: white centred slimline review strip under the mobile header
```

---

## 1. Service-page text walls — PASS

**Was:** each plan section rendered as a full-width band of authored HTML: four or five
paragraphs, an H3 or two and a list. On a phone that is a screen and a half of solid text per
section, with no photograph between the intro image and the process steps.

**Now:** a service page is a landing page. `ServiceContent.sections` changed from
`{ h2, html }` to `{ h2, lead, points[], image }`, and `ServiceBody.astro` renders each one as
a SPLIT BAND — photograph on one side, H2 + a short lead + ticked points on the other, sides
swapping band to band, panel background still alternating. At 900px and below the band stacks
image first, then the copy, every time, so a phone scroll reads image, text, image, text.

All 10 service content files were rewritten: 68 bands, no invented facts — every point is
compressed from the copy that was already there. The contextual in-body links were kept, so
`ServicePage.astro` now collects them from `lead` + `points` instead of `html`.

**Check (measured, 360x780, all 10 service pages):**

| | result |
|---|---|
| intro paragraphs before the first band | ≤ 2 on every page |
| bands with exactly one photograph | 68 of 68 |
| bands with more than one paragraph of prose | 0 |
| band lead length | 21–49 words (limit 50) |
| points over 16 words | 0 |
| image above text at 360px | 68 of 68 |
| longest stretch of the service body with no photograph | **907–1040px** (limit 1560 = two screens) |

```
PASS  /builders/ 6 bands, leads 26-32 words, max imageless run in the bands 968px
PASS  /house-extensions/ 8 bands, leads 25-38 words, max imageless run in the bands 979px
PASS  /brickwork/ 6 bands, leads 25-37 words, max imageless run in the bands 907px
PASS  /loft-conversions/ 7 bands, leads 23-35 words, max imageless run in the bands 948px
PASS  /structural-and-groundworks/ 8 bands, leads 30-40 words, max imageless run in the bands 997px
PASS  /renovation-and-refurbishment/ 7 bands, leads 29-47 words, max imageless run in the bands 968px
PASS  /patios-and-garden-walls/ 6 bands, leads 26-44 words, max imageless run in the bands 1034px
PASS  /landscaping/ 6 bands, leads 29-41 words, max imageless run in the bands 988px
PASS  /carpentry/ 7 bands, leads 27-49 words, max imageless run in the bands 994px
PASS  /basement-conversions/ 7 bands, leads 21-45 words, max imageless run in the bands 1040px
```

---

## 2. Areas we serve layout — PASS

**Was:** a 6fr/5fr split — copy and town list on the left, a small squarish map on the right.
The same component, so the All Areas Served page had the same problem.

**Now:** one column. Eyebrow, heading and copy run the full container width; the Google
Business Profile map is a full-width wide band under them; the town list sits UNDER the map
with an `areas we cover` link beside it (keyword anchor, not "the areas page"). `/areas/`
renders no self-link. `MapEmbed`'s min-height dropped from 360px to 240px so it cannot fight a
shorter container.

**Check (measured, / and /builders/ and /areas/, at 360 and 1440):**

```
PASS  /builders/ @360  map 328x240 full-width, list under map, link areas we cover
PASS  /builders/ @1440 map 1200x360 full-width, list under map, link areas we cover
PASS  /          @360  map 328x240 full-width, list under map, link areas we cover
PASS  /          @1440 map 1200x360 full-width, list under map, link areas we cover
PASS  /areas/    @360  map 328x240 full-width, list under map, link (none, areas page)
PASS  /areas/    @1440 map 1200x360 full-width, list under map, link (none, areas page)
```

Each line asserts: map width == the container's content width, map wider than tall, heading and
body width == the container's content width, list top below map bottom, and the areas link
present everywhere except on `/areas/` itself.

---

## 3. Our Work section order — PASS

**Was:** service pages ran steps → areas + map → related services → articles → gallery.

**Now:** the gallery sits directly after the process steps and above the map. The component
itself is untouched, as instructed. The home page already had this order and was left alone.

**Check:** position of the section markers in the built HTML — `data-section="gallery"` must
come before `data-section="areas"` on every page carrying both. 11 of 11 pages (10 service
pages + home) pass, e.g. `/builders/ gallery@62023 areas@74845`.

---

## 4. Related-services card links — PASS

**Was:** the card TITLE carried the link, and the anchor ledger allows one follow link per
target per page, so on most pages only one card (usually renovation) was a link at all.

**Now:** the title is plain text and each card carries a BUTTON whose anchor text is the exact
service name — "Loft Conversions", "Renovation & Refurbishment", never "Learn more". Where the
page body already links that target contextually, the button renders as plain text, which keeps
one follow link per target per page exactly as the brief requires.

**Check (all 10 service pages):** 3 cards each; 0 linked titles; every button's text equals its
card title; every linked button's href equals that service's slug.

```
PASS  /house-extensions/ 3 cards, buttons [Loft Conversions -> /loft-conversions/ |
      Structural & Groundworks (plain: linked in body) | Brickwork (plain: linked in body)]
```

---

## 5. "Guides" ban — PASS

Removed from: the `/resources/` page title, meta description, eyebrow, H1, breadcrumb and
schema name; the articles-preview eyebrow, default heading and button (the button anchor is now
the keyword `Resources`, not "All guides"); the service-page articles heading; the article page
eyebrow, breadcrumb, table-of-contents summary and "More resources" aside; and the `llms.txt`
section heading and link.

**Check (grep over the built output):** all 56 built `.html`, `.txt`, `.md`, `.xml`, `.js` and
`.css` files scanned — **0 occurrences of "guide"**, case-insensitive, including the generated
markdown twins and `llms-full.txt`. The SEO engine's article bodies never contained the word,
so nothing of the engine's was edited.

---

## 6. Reviews consistency — PASS

**Root cause found while probing, worth reading:** the TrustIndex slim loader renders its
widget ONCE per page, in the first slot it reaches, and a second copy of the same loader script
*hides* the widget it finds already rendered. The site included the same slim loader in the
hero and in the footer, so **the footer strip was rendering blank on every page**. That is why
the only visible slimline number was the static one, and why the counts disagreed.

**a.** `TiSlim` is now the slimline everywhere — hero, quote form and footer. The loader is
injected once, into the first slim slot in the document, and the rendered widget is copied into
the others (markers stripped so TrustIndex's own housekeeping leaves the copies alone). The
quote form's static `ReviewStrip` is gone, replaced by the same slimline.

**b.** The "Average rating 5.0 / 5 on Google" line is gone from `Reviews.astro`, along with the
score block it sat in.

**c.** `Reviews.astro` takes no props at all now, so the section renders byte-identical on every
page type. The per-page headings and `ServiceContent.reviewsHeading` were removed.
`ReviewStrip` (the fallback for an empty slot) no longer prints any count or average, so nothing
on the site can disagree with the widget.

**Checks:**

```
PASS  "average rating" lines in built output: 0
PASS  hard-coded "<n> from <n> Google reviews" count lines: 0
PASS  footer slimline strip present on all 8 page types
PASS  slimline widget srcs in use: 1 (cdn.trustindex.io/loader.js?7c36aed8213c396b301612d316d)
PASS  reviews-section HTML across 8 page types: 1 distinct
      (/=75eb9a0dda13 /services/=75eb9a0dda13 /areas/=75eb9a0dda13 /about/=75eb9a0dda13
       /contact/=75eb9a0dda13 /resources/=75eb9a0dda13 /builders/=75eb9a0dda13
       /builders-hedge-end/=75eb9a0dda13)
PASS  /builders/ live widgets: slim-hero="5.0 6 reviews" slim-form="5.0 6 reviews"
      slim-footer="5.0 6 reviews" | big widget 6 reviews
PASS  /          live widgets: slim-hero="5.0 6 reviews" slim-form="5.0 6 reviews"
      slim-footer="5.0 6 reviews" | big widget 6 reviews
```

The last two lines are a real page load with the real TrustIndex CDN, not a grep: all three slim
strips render, all say the same thing, and it matches the large widget's six reviews.

---

## 7. Quote form — PASS

**Config was read before the form was written.** `GET
olympus.small-bird-3273.workers.dev/forms/site/buildingsforlifeltd.com` returns form
`bfl-cf-v1`, status `live`, network "Client website", approved domains
`buildingsforlifeltd.com`, `www.buildingsforlifeltd.com` and the workers.dev test host, with
`oly_form_fields` field_keys **name, email, phone, postcode, message** — all required — and
`worker.js` treats **`_company`** (or `company_website`) as the honeypot.

**Fixed:**

- Field order is now name / email / phone / postcode / message (email second, per the law).
- **The visible service select is gone**, with no "choose the option" step. The page's service
  rides along as a hidden input, and the page URL goes up as `_page_url`, so the lead keeps its
  context without the visitor picking from a list.
- **Honeypot renamed `company` → `_company`.** The old name is not one the engine reads, so the
  honeypot was doing nothing at all and every bot submission was being accepted.
- `_page_url` and `_referrer` hidden fields added — the engine's own attribution fields.
- Posts `FormData` to the cf_form submit endpoint, with inline email and phone validation and a
  retry message on failure instead of a silently dropped lead.
- Placeholders inside the inputs, no external labels, full width, stacked, postcode required.

**Check:**

```
PASS  fields [name, email, phone, postcode, message] vs config [name, email, phone, postcode,
      message], honeypot _company, hidden [service, _page_url, _referrer], selects 0,
      submit "Quick Quote Online"
```

plus, in the same probe: every visible field has placeholder text, no field has an external
`<label for>`, all are `required`, all are ≥ 80% of the card width, and the endpoint equals
`/forms/bfl-cf-v1/submit`.

**Two things for the operator (see "Flagged" below): no Turnstile, and `service` is not stored.**

---

## 8. Mobile sticky bar — PASS

**Was:** yellow "Quick Quote Online" + a glass outline button reading "Call" with a phone icon,
8px apart.

**Now:** "Quick Quote" on white, and the call button in the yellow brand colour showing the
phone number alone, 16px apart. The word "Call" is gone from the button and from its accessible
name, which is now the number itself. Still mobile only, still hidden over the hero and over
the quote form.

**Check (measured):**

```
PASS  @360  "Quick Quote" | "07853 945013" -> tel:+447853945013,
      call bg rgb(242, 201, 76) vs quote bg rgb(255, 255, 255), gap 16px
      @1440 display none
```

`rgb(242, 201, 76)` is `--brand-primary`, the yellow. The two backgrounds are asserted to
differ, the gap to be > 4px, the call text to match `^0\d[\d ]+$` (a phone number and nothing
else), and the bar to compute to `display: none` at 1440.

---

## 9. Mobile slimline reviews under the header — PASS

New `HeaderReviews.astro` inside the fixed header, phone widths only: a white 32px band, text
centred, carrying the TrustIndex slim DARK widget (`slots.trustindexSlimDark`) so it reads on
white while showing the same six reviews as the slim white strips elsewhere.

Header height is now `--header-row-h` (72px, 64px on phones) plus `--header-strip-h` (32px on
mobile, 0 at desktop), with `--header-h` as the total, so hero padding, the mobile menu overlay
and every `scroll-margin-top` clear the strip automatically. Its slot is named
`dark-slim-header`, deliberately not `slim-*`, so TiSlim's white-widget mirror never touches it.

**Check (measured):**

```
PASS  /         strip 360x32 at y=64 (header row ends 64), bg rgb(255,255,255), align center
PASS  /builders/ strip 360x32 at y=64 (header row ends 64), bg rgb(255,255,255), align center
PASS  /areas/   strip 360x32 at y=64 (header row ends 64), bg rgb(255,255,255), align center
PASS  @1440 header review strip display none height 0 (must not render at desktop)
PASS  /builders/ @360 live header strip "5.0 6 reviews" (28px, centred true)
      vs slimline "5.0 6 reviews"
```

The strip's top is asserted to be within 2px of the header row's bottom, i.e. directly under it.

### Follow-up (operator, same day): one review line in the first screen on mobile

The hero slimline (the one under the CTA buttons, from pass 2) is now **desktop only**, so on a
phone the review line appears once — in the white strip under the header. Desktop is unchanged.

It is collapsed (`height: 0; overflow: hidden`), **not** `display: none`, and that is
deliberate: measured here, TrustIndex only ever renders a widget whose box is laid out in the
first screen, and it does not render it later even when you scroll to it. The hero slot is the
loader host that TiSlim copies into the quote-form and footer strips, so taking it out of layout
left all three slim strips blank on mobile. Collapsed and clipped, it hosts the loader,
contributes nothing visible and costs no space.

**Check (measured, live widgets, 360x780, scrolled to the top):** visible review lines counted
with an IntersectionObserver, whose `intersectionRect` accounts for the clipping, so the host
widget correctly counts as zero.

```
PASS  /          @360 first screen shows [dark-slim-header], hero slimline 0px tall,
      rendered [dark-slim-header, slim-hero, slim-form, slim-footer]
PASS  /builders/ @360 first screen shows [dark-slim-header], hero slimline 0px tall,
      rendered [dark-slim-header, slim-hero, reviews, slim-form, slim-footer]
PASS  /areas/    @360 first screen shows [dark-slim-header], hero slimline 0px tall,
      rendered [dark-slim-header, slim-hero, reviews, slim-form, slim-footer]
PASS  @1440 hero slimline still shown (32px tall, display block, slot slim-hero)
```

---

## 10. Notes (no action taken, as instructed)

- **Logo:** untouched. `public/brand/logo-horizontal-white.png` still ships in the header and
  footer, waiting on the client's real logo.
- **"As seen on BBC":** left in place — the hero card and the footer line both still say
  *Featured on BBC Building Dream Homes*. `slots.bbcVideoUrl` is still empty, so the badge is
  plain text; set that slot and every badge becomes a link to the footage.

---

## Flagged for the operator

1. **~~No Turnstile on the quote form~~ — DONE.** The site has its own Worker and `/api/lead`
   route with invisible Turnstile. See the section below.
2. **~~The hidden `service` field is sent but not stored~~ — DONE.** A `service` field row was
   added to this token's `oly_form_fields` config. See the section below.
3. **~~No end-to-end submit test was run~~ — DONE.** Leads were submitted end to end and read
   back out of D1, then deleted. See the section below.
4. **Lead email cannot be delivered until buildingsforlifeltd.com is onboarded in Email
   Sending.** Not a route problem and not a site-code problem. The zone now exists and mirrors
   the live IONOS DNS; what remains is a nameserver switch and one dashboard click, both in the
   section below. Capture is fine; delivery is blocked. **Operator.**
4. **`npm run gate` is broken, and was before this pass.** It runs
   `token-gate.mjs && linkcheck.mjs`, and `scripts/linkcheck.mjs` does not exist in this repo —
   the gate exits MODULE_NOT_FOUND before the link check ever runs. The token gate was run
   directly instead (`node scripts/token-gate.mjs`, PASS). Either restore `linkcheck.mjs` or
   drop it from the script.
5. **The contact page keeps its own map**, which is a wide band already (full width, 420px
   tall). Item 2 was scoped to the areas section and the All Areas Served page, so the contact
   map was left as it is.
6. **~~Mobile shows the review line twice in the first screen~~ — DONE.** The hero slimline is
   now desktop only; on a phone the line appears once, under the header. See the follow-up at
   the end of item 9.
7. **~~The LARGE reviews widget does not render on the home page at 360px~~ — FIXED.** See
   below.

---

## Flag 7, fixed: the large reviews widget on the home page at 360px

**Was:** the reviews widget is lazy, and TrustIndex only renders a widget whose box is laid out
in the FIRST SCREEN at load — it never renders it afterwards, not even when you scroll to it. On
a phone the home hero is tall enough to push the reviews section out of the first screen, so the
widget never appeared at all on `/` at 360px. The section showed its reserved 440px of empty
space and nothing else. (Reproduced against commit `fcdfcb0`, so it predated this pass;
`/builders/` and `/areas/` were fine, because their inner hero is shorter.)

**Now:** the same trick that fixed the footer slimline. The loader runs from `.rv__host`, a box
pinned to the top of the viewport (`position: fixed; top: 0`) and clipped to nothing
(`height: 0; overflow: hidden`), so its box is always in the first screen whatever the page.
When the widget renders there it is **moved** into the section — moved, not copied, so the
slider keeps the event handlers TrustIndex bound to it — and the host is left empty.

**Check (measured, live widgets, both viewports):**

```
PASS  /builders/ @1440 live: slim-hero (6 reviews) slim-form (6 reviews) slim-footer (6 reviews)
      | large widget rendered, 6 review cards
PASS  /          @1440 live: ... | large widget rendered, 6 review cards
PASS  /builders/ @360  live: ... | large widget rendered, 6 review cards
PASS  /          @360  live: ... | large widget rendered, 6 review cards
PASS  / @1440 the moved slider still advances on its own next control
      (first card x 128 -> -168)
```

Each line also asserts the widget is no longer sitting in its loader host, and the last one
clicks TrustIndex's own next arrow to prove the moved node is still the live, interactive
slider rather than a dead copy. The item 9 mobile probe now lists `reviews` among the rendered
widgets on `/`, `/builders/` and `/areas/` at 360px.

---

## Flags 1 and 2, fixed: real Turnstile, and the service field stores

### What the lead path looks like now

```
visitor  ->  POST (same origin) /api/lead on the site's own Worker
                 honeypot _company  ->  202, dropped
                 field validation   ->  400
                 cross-origin post  ->  403
                 Turnstile siteverify (TURNSTILE_SECRET)  ->  403 on any bad verdict
             ->  POST the verified lead to the site's cf_form on Olympus (bfl-cf-v1)
                 D1 lead row first, spam score, route ladder, delivery ledger
```

The Worker is a shim, not a second lead store: the Cloudflare LeadForm stays the system of
record, so `form_type` cf_form, `source_type`, came-from-a-form and the emailed-to destination
are all still recorded by the engine exactly as the lead form law requires. Turnstile is
verified at the edge because the engine runs none of its own, so spam is refused **before** it
can reach the lead list at all.

New files: `worker/index.ts` (route, else assets), `worker/lib.ts` (env, helpers, siteverify),
`worker/lead.ts` (GET sitekey, POST the lead). `wrangler.jsonc` gains `main`, the `ASSETS`
binding, and `FORM_ENDPOINT` / `SITE_ORIGIN` vars. `wrangler deploy --dry-run` compiles clean.

### Turnstile

- Widget created on the account: sitekey `0x4AAAAAAFORbhYcgEFeeLSB`, name
  "buildingsforlifeltd.com lead form", **mode non-interactive**, domains
  `buildingsforlifeltd.com`, `www.buildingsforlifeltd.com` and the workers.dev test host.
- Rendered with `appearance: 'interaction-only'`, so no visitor ever sees "verify you are
  human" (conversion law). The script is only fetched once someone touches the form, and the
  **sitekey is fetched from `/api/lead`**, never baked into the page.
- `TURNSTILE_SITEKEY` and `TURNSTILE_SECRET` are set as secrets on the live Worker
  (`wrangler secret list` shows both). They are in `.dev.vars` locally for `wrangler dev`, and
  `.dev.vars` is gitignored — the secret appears in no tracked file.

### The service field

Added to the live config, additive and non-breaking (`required = 0`, so it can never block a
submission):

| field_key | field_type | label | required | sort_order | enabled |
|---|---|---|---|---|---|
| service | hidden | Service | 0 | 5 | 1 |

`hidden` renders as `<input type="hidden">` in the engine's own embed too, so no visible
"Service" box appears anywhere.

### Checks (live)

`node scripts/verify-lead.mjs [baseUrl]` runs real POSTs against the endpoint. Against the
Worker with the REAL keys:

```
PASS  GET /api/lead hands the form a Turnstile sitekey (0x4AAAAAAFORbhYcgEFeeLSB)
PASS  no Turnstile token -> 403 missing-token
PASS  bogus token -> 403 invalid-input-response
PASS  honeypot filled -> 202 (accepted and dropped, so a bot learns nothing)
PASS  invalid postcode / email / phone / name / message -> 400 with the field named
PASS  cross-origin post -> 403 forbidden
PASS  PUT /api/lead -> 405
```

The `invalid-input-response` verdict is the proof that the configured secret is a real,
recognised Turnstile secret: an unknown secret returns `invalid-input-secret` instead.
A headless browser cannot solve a real Turnstile challenge, so the pass path was driven with
Cloudflare's official always-pass **test** keys (in `.dev.vars` only, never on the Worker):
the browser filled the form, got a token, and landed on `/thank-you/`.

Read back out of Olympus D1 afterwards — this is the lead that submission created:

```
submission     submission_c75ca738-f7c7-4f16-87d5-20ba7ce21919
lead           lead_997a06e8-36d9-4074-8ba1-61018ec1a9ec
answers keys   name, email, phone, postcode, message, SERVICE, _attribution
service value  "Builders"            <- flag 2, storing
source_type    Client website
source_site    buildingsforlifeltd.com
notes          "Came from: form (cf_form). page_url: … · ip: … · user_agent: …"
delivery       channel email -> admin@apexaimarketing.com (the route on this form)
```

Item 7 of the suite also now asserts that the engine config carries the hidden `service` key,
that the page posts to `/api/lead`, that there is exactly one Turnstile mount, and that none of
the 24 shipped `.html`/`.js` files contains the form host, the form token or the sitekey.

**The test leads are gone.** All three verification leads were deleted from D1, with their
submission and delivery rows: `lead_997a06e8…` (browser end-to-end), `lead_7d67bd05…`
(endpoint probe) and `lead_3c93338d…` (the route check below). The only lead left on
`buildingsforlifeltd.com` is Zeus's own `TEST — Zeus form check` from 1 Oct, which is not mine
to remove.

### The email route: the destination was never the problem

My first report said the lead email was failing because `admin@apexaimarketing.com` is an
unverified Email Routing destination. **That diagnosis was wrong**, and the fix that follows
from it does not work. Here is what the evidence actually shows.

Pointing the route at the verified `admin@localmapbooster.com` and sending a labelled test
lead gives the *identical* error:

```
FAILED | email -> admin@localmapbooster.com
  Email Sending delivered no recipients — admin@localmapbooster.com:
  email.sending.error.email.invalid
```

And the delivery ledger shows `admin@apexaimarketing.com` — the "unverified" address —
receiving perfectly well from other sites on the same day:

```
2026-10-04 23:17  admin@apexaimarketing.com   sent   from leads@sparkcleanprofessional.com
2026-10-04 13:15  admin@apexaimarketing.com   sent   from leads@multiskimplastering.co.uk
2026-10-05 12:08  admin@apexaimarketing.com   FAILED from leads@buildingsforlifeltd.com
```

The variable is the **sender**, not the recipient. That is the 4 Oct email-sending migration law
working as written: on an onboarded sending domain the Email Service delivers to ANY recipient,
verified or not.

**Root cause:** `leads@buildingsforlifeltd.com` cannot send, because
**buildingsforlifeltd.com is not a zone in the Cloudflare account at all**:

```
buildingsforlifeltd.com     zone: NOT IN ACCOUNT
multiskimplastering.co.uk   zone: active      (leads deliver)
sparkcleanprofessional.com  zone: active      (leads deliver)
```

Olympus derives the From address from the lead's source site (`from = leads@<host>`), so until
the domain is in the account and onboarded in Email Sending, no recipient can receive from this
site. No route change can fix that, which is why the route was put back to the law-correct
value rather than left pointing somewhere that fixes nothing:

| | before | now |
|---|---|---|
| tradie | Vince (test route) | Buildings For Life (admin copy) |
| email | admin@apexaimarketing.com | admin@apexaimarketing.com |

(Unchanged address, per the 4 Oct ruling that admin copies go to apex ONLY; only the label was
corrected, since it was not really Vince's test route.)

### The zone: created, mirrored, and deliberately NOT given Email Routing

**Step 1 is done.** `buildingsforlifeltd.com` is now a zone in the account:

```
zone    c003126755805765b7f98e62cb65c4ed   status: pending
cutover ns1067.ui-dns.de, ns1074.ui-dns.biz, ns1078.ui-dns.com, ns1079.ui-dns.org
     -> brianna.ns.cloudflare.com, zac.ns.cloudflare.com
```

Nothing changed for the live site or the client's email: a pending zone is inert until the
nameservers are switched at the registrar.

**This is a live client domain, not an empty one.** It runs on IONOS today — the website on
`217.160.0.97` and, more importantly, **the client's own mailbox**: `mail@buildingsforlifeltd.com`
is the address printed on every page of the site, and its MX points at `mx00/mx01.ionos.co.uk`.
So the zone was built as a faithful mirror of what is live, record for record, and the apex SPF
was extended rather than replaced:

| record | value | why |
|---|---|---|
| A @ | 217.160.0.97 | mirrors IONOS (the site still lives there) |
| AAAA @ | 2001:8d8:100f:f000::200 | mirrors IONOS |
| MX @ | 10 mx00.ionos.co.uk, 10 mx01.ionos.co.uk | **the client's mailbox** |
| TXT @ | `v=spf1 include:_spf-eu.ionos.com include:_spf.mx.cloudflare.net ~all` | IONOS kept, Cloudflare added |
| CNAME _dmarc | dmarc.ionos.co.uk | mirrors IONOS |
| CNAME autodiscover | adsredir.ionos.info | mirrors IONOS (Outlook) |

`node scripts/verify-dns.mjs` (new) diffs the zone against the live authoritative nameservers
and is the check to re-run at cutover:

```
PASS  A / AAAA / MX / CNAME autodiscover / CNAME _dmarc all match live
PASS  SPF keeps every live include (_spf-eu.ionos.com)
PASS  SPF authorises Cloudflare Email Sending (_spf.mx.cloudflare.net)
PASS  apex MX is the client's mail host, not Cloudflare Email Routing
PASS  Email Routing is off on this zone — enabling it would break mail@buildingsforlifeltd.com
```

**I did not set up Email Routing, the apex MX swap, or the `leads@` mailbox route, and they are
not needed.** Cloudflare Email Routing takes over inbound mail for the whole zone: enabling it
rewrites the apex MX to `route1/2/3.mx.cloudflare.net`, which on this domain would stop
`mail@buildingsforlifeltd.com` receiving anything the moment the nameservers moved. Email
Routing also only forwards — it has no mailboxes — so the client would not get their inbox back.

The migration law's step 2 (`leads@<domain>` mailbox route) comes from
`multiskimplastering.co.uk`, a lead-gen domain with no client mailbox to lose. The other
onboarded site settles it:

```
sparkcleanprofessional.com   apex MX: none   Email Routing: disabled
                             cf-bounce MX + cf-bounce DKIM + cf-bounce SPF only
   -> 2026-10-04 23:17  admin@apexaimarketing.com  SENT  from leads@sparkcleanprofessional.com
```

Outbound Email Sending works off the `cf-bounce` subdomain alone. The apex MX is not part of it.

### What the operator must do in the dashboard

1. **Point the nameservers at Cloudflare** at the registrar (IONOS):
   `brianna.ns.cloudflare.com` and `zac.ns.cloudflare.com`. The zone already mirrors every live
   record, so the site and the client's email keep working across the switch — re-run
   `node scripts/verify-dns.mjs` afterwards to confirm.
2. **Onboard the domain for Email Sending** — the one dashboard-only step, no API exists:
   **Compute & AI > Email Service > Email Sending > Onboard Domain > buildingsforlifeltd.com >
   Done.** It writes the `cf-bounce` MX, SPF and DKIM records into the zone (5-15 minutes).
3. **If that flow offers to enable Email Routing, decline it.** It is not needed for sending and
   it would take the apex MX off IONOS.
4. **Send one labelled test lead** and confirm the delivery row reads `sent` rather than
   `failed`.

Optional, unrelated to this fix: `admin@apexaimarketing.com` is still an unverified Email
Routing *destination* on the account. That only matters for Olympus's legacy `send_email`
fallback path; Email Sending delivers to it regardless, as the ledger above shows.

If a real `leads@buildingsforlifeltd.com` inbox is wanted for replies, create it as a mailbox or
alias **at IONOS**, where the rest of the domain's mail already lives. The lead emails set
`reply_to` to the enquirer's own address, so replies do not depend on it.

Nothing is lost in the meantime: every lead is written to D1 first and retained, and the
delivery ledger records the attempt and the reason. It is delivery that is blocked, not capture.

---

## Files changed

| File | Item |
|---|---|
| `src/data/services/types.ts` + all 10 service content files | 1, 6c |
| `src/components/ServiceBody.astro` | 1 |
| `src/components/ServicePage.astro` | 1, 3, 5, 6c |
| `src/components/Areas.astro`, `src/components/MapEmbed.astro` | 2 |
| `src/components/RelatedServices.astro` | 4 |
| `src/components/ArticlesPreview.astro`, `src/components/ArticlePage.astro`, `src/pages/resources/index.astro`, `src/pages/llms.txt.ts` | 5 |
| `src/components/Reviews.astro`, `src/components/ReviewStrip.astro`, `src/components/TiSlim.astro` | 6 |
| `src/components/Hero.astro`, `src/components/PageHero.astro`, `src/components/TiSlim.astro` | 9 follow-up |
| `src/components/Reviews.astro` | flag 7 fix |
| `worker/index.ts`, `worker/lib.ts`, `worker/lead.ts` (new), `wrangler.jsonc`, `.gitignore`, `src/components/QuoteForm.astro` | flag 1 fix |
| `scripts/verify-lead.mjs` (new), `scripts/verify-rev3.mjs` | flags 1 and 2 verification |
| `scripts/verify-dns.mjs` (new) | zone/cutover check (no site code) |
| `src/pages/{about,contact,faq}.astro`, `src/pages/{areas,services,resources}/index.astro` | 6c |
| `src/components/QuoteForm.astro`, `src/layouts/Base.astro` | 7 |
| `src/components/StickyCtaBar.astro` | 8 |
| `src/components/HeaderReviews.astro` (new), `src/components/Header.astro`, `src/styles/tokens.css` | 9 |
| `scripts/verify-rev3.mjs`, `scripts/rev3-service-names.json` (new) | verification |
