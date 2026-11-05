---
name: sitebuilder-ui-standards
description: Use when building/revising SiteBuilder sites — UI rules.
---

# SiteBuilder house UI standards (Vince, 10 Sep 2026 multiskim test build)

Apply to EVERY build; also promote into the boilerplate at the next batch retro.

## Buttons
- Title Case labels (capitalise first letter of each word).
- **Sheen animation runs CONTINUOUSLY, not hover-only** (Vince correction): a light sweep
  every ~4-6s on ALL buttons site-wide, subtle, staggered so buttons don't flash in sync,
  respecting prefers-reduced-motion. Hover keeps its own response on top.

## Links and cards
- Link anchors go on the title/CTA text only (e.g. "See Silicon Render"), NEVER the whole
  card/box. Applies to service cards, article cards, review displays.
- Buttons use "See X" phrasing, Title Cased.

## Layout laws
- **No half-width orphan text**: text must run full width OR have a designed right-hand
  companion (card, map, sticky rail). Vince hates half-width text ending mid-page with
  nothing on the right. Applies to resources page intros, article bodies, legal pages,
  about sections.
- Article/legal page layout: full-width body matching the site's left edge + right sticky
  rail with a CONTEXTUAL CTA ("Need plastering done in Bradford? Tell us what you need —")
  specific to the trade/article, not generic wording.
- Hero: content bottom-aligned with adjacent section boxes (e.g. Recent Projects card);
  keep paragraph→buttons spacing tight; review strip under buttons gets comfortable
  12-16px gap (not cramped, not a chasm).
- Service-page media: reduce oversized left images (square-ish) so no dead space on desktop;
  balance with more seed-fact content if needed.
- Bland full-colour sections (e.g. big flat green/navy band) need texture (noise/grain) or
  subtle scroll-triggered GSAP reveals.

## Card bottom links = REAL internal links (Vince, 6 Oct, Wey Valley ruling)
Every card (service cards, related-services, nav cards) follows the Related Services pattern: title + short excerpt + a bottom link that IS an `<a>` whose anchor text equals the card/service/page name (`<a class="sc-go" href="/services/<slug>">General Roof Repairs</a>`). NEVER render a dead `<span class="sc-go">Get X / See X / Explore X</span>` — a non-clickable element styled like a button reads as broken; Vince had them stripped homepage-first, then ruled this pattern site-wide. Whole cards are not links; titles may also link to the same target.

## Numbered service cards
- 5 per row × 2 rows when 10 services — no empty cells.
- Never repeat the service name twice on one card (number + one name only).

## Standard sections every site ships
- Review surfaces: see sitebuilder-review-placement skill (hero strip, form strip,
  bottom-left badge; real GBP data; plain-text display, NOT hyperlinks — Vince 11 Sep).
- Trust microcopy under every quote form: "Submitting this form is secure — we'll never
  share your details with anyone else."
- Thank-you page: noindex, conversion event, confirmation copy, buttons directly beneath
  the confirmation paragraph, linked back to home/services. Given no-phone sites:
  "Back to homepage" + "Explore our services" side by side.
- Related-articles section on every article page (graceful-empty ok, logic ships).
- About↔Contact↔Services↔Areas interlinking, all reachable from home.
- Email convention: info@<domain> as designated placeholder; mailbox created in Cloudflare
  at go-live (Vince's instruction — this is NOT inventing data).

## External forms (Vince, 11 Sep)
Vince builds forms in his own form builder tool and hands the artifact (embed/HTML/JSON)
to Zeus → Claude Code integrates it componentised into the target page, styled to the
site's tokens, rebuild/audit/redeploy per usual. LeadForm's dual-mode (supplied CRM script
↔ fallback) is the designed slot for external forms. No form-builder integration to build.

## Asset handoffs
Vince supplies logos himself (model-based logo generation was retired 11 Sep — quality
bar not met). When a logo file arrives: header slot + favicon size set + boilerplate
logo path, verify rendering at both desktop and mobile widths.

## Review widgets — Trustindex CDN (Vince placement law, 28 Sep)
Vince supplies per-site Trustindex loader scripts in four styles: LARGE section, slim WHITE
text (dark backgrounds), slim dark text (light backgrounds), left-corner badge. Placement:
- Slim white sits INSIDE the hero directly under the CTA buttons, REPLACING the old
  Google-review-link line — never added as a separate strip elsewhere on a whim.
- LARGE section renders under the header/hero on EVERY page (home, services hub, every service
  detail page, areas, about, contact, resources) — same component, sitewide consistency.
- Slim white ALSO in the footer on every page. Left-corner badge on EVERY page (site-wide, not
  homepage-only), hidden on mobile via CSS below the tablet breakpoint.
- Each script loads ONCE per page (defer async, CDN as given); reserve the widget's height so
  lazy-load doesn't shift layout; Trustindex widgets only initialise on first visitor
  interaction — an automated test must scroll/interact until they appear or it reports false
  height-0 failures.
- The count line uses the REAL Google 'G' logo (svg asset), never a generic letter. Ban the
  heading 'people rated our work' (static copy goes stale against live widgets).
- Keep the site's Review schema; widgets are display, not schema replacement.

## Service detail pages are CONVERSION pages, never articles (Vince, 28 Sep)
- NO 'On this page' table of contents, no article framing/eyebrow furniture. Shape: hero ->
  slim review widget -> LARGE reviews -> intro (MAX 2 short paragraphs) -> H2 sections as
  separated bands (max 2 stacked paragraphs before a subheading/list — no unbroken walls) ->
  gallery -> FAQ -> form. Exactly 3 'how a job runs' steps (merge the quick-quote-online step
  into site-visit/written-quote) and exactly ONE closing CTA (never two).
- Intro copy across all service pages follows the same cap; keep the named facts (owner, years,
  town, guarantee) inside the two paragraphs.

## Legal pages (terms/privacy) layout
No abandoned left column (half-width text with an empty right column is banned). Either single
full-width column or a real two-column: left = contents list, right = content + sticky contextual
CTA card. The Quick Quote form renders at the BOTTOM of legal pages too — every page carries the
form.

## Header (final nav law)
Nav order: Home, Services (dropdown listing hub + all services; hover desktop, tap-accordion
mobile, closes on Escape/outside click), Areas, About, Contact, Resources. FAQ page exists but
is OUT of the nav. NO 'Quick Quote Online' button in the header — the phone number sits there
c instead (call-first header; Quick Quote stays on hero/CTA buttons).

## Motion/layout incidentals (28 Sep corrections)
- Scroll-reveal blocks: a block taller than one screen must still fade in (trigger on a fraction
  of the block visible, not a fraction of the viewport) — tall text columns otherwise stay
  invisible on mobile.
- Call/phone sections on dark backgrounds: number text white/high-contrast (checked at WCAG,
  ~15:1), never dark-on-dark.

## These standards are becoming machine-checked (v2 programme)
The layout-law engine (SiteBuilder v2) converts this section into machine-checked spec
files with conditional logic — builds that violate a law fail audits with named errors.
Full programme: lmb-operations skill → references/v2-improvement-programme.md.

## SEO gate per build
sitemap.xml, llms.txt, unique titles/descriptions, canonicals, schema @graph (no fake
aggregateRating), robots.txt Disallow:/, noindex everywhere on staging. Report pass/fail.

## Colour changes
Accent swaps happen in BOTH seed.css (--seed-accent) AND the design.css hardcoded override
layer — seed alone is not enough (yellow→green→red→navy all caught this). Re-run tokens,
recalculate WCAG contrast for all pairings, prefer white text on dark accent fills.
Palette history multiskim: yellow #fff313 → green #16a34a → lighter-green → red #d12e2c →
navy #081e5b (final). Expect Vince to iterate colours live; make recolouring one command.

## Go-live is Vince's word alone (11 Sep)
When Vince says go live, ship — pending items (form endpoint, remaining photos) are recorded
in EVIDENCE.md, never blockers. Form fallback may reuse another build's shared endpoint
(Rigbys pattern) until Vince sorts routing. Verify live state server-side (CF 200, noindex
count 0, robots Allow) before reporting; DNS propagation on Vince's device can lag minutes —
point him at mobile data if he can't see it while server checks pass.

## Glasgow calibration laws (12 Sep, v2 test build — now in LAYOUT-LAWS.md upstream)
Ten R3 house laws + R4/R5 additions, all machine-promoted to plugin v2:
1. CTA above the fold, mobile first; ONE hero CTA only (no duplicate on the floating card).
2. Slimline review strip under the hero CTA + above the quote form + bottom-left badge —
   ALWAYS, every template. Gold-standard format: Google G logo + 'Excellent' + 5 stars +
   rating + review count (TrustIndex style). Real data when available; placeholder-marked
   slots otherwise; NEVER omit the band. Draft reviews: write realistic trade-specific
   review text spec-marked draft-pending (Vince: placeholders like '[real review pending]'
   are NOT acceptable — write actual reviews).
3. Hero video when a trade video exists (Wey-Valley pattern), else designed gradient/SVG
   scene; navy overlay over video; compositing isolation on the video wrapper
   (will-change/translateZ) — scroll-tearing bug class.
4. NO invented/model-generated icons (they look shit — Vince). Typographic treatments
   instead: numbered badges, yellow bars, brand-blue ticks. Real icons only from a real
   icon set (Lucide) when needed.
5. NO filename captions or alt-text rendered as visible overlay on images. Alt stays in
   alt attribute only.
6. Gallery on-page = visible GRID of thumbnails (normal grid flow), NEVER a swipe carousel
   or arrow buttons on the page. Lightbox on click = full-size + Quick Quote Online button
   CENTRED under the image + perfectly-centred X close. Mobile gallery starts centre-aligned.
7. NO coloured corner borders/accent corners on cards — even if the reference template has
   them.
8. Quick Quote buttons anchor-scroll to THE MIDDLE OF THE FORM (fields visible), never the
   section heading.
9. Form security line directly under every form (padlock glyph + "This form is secure...").
10. Hero H1s are PROBLEM-FIRST (question or pain statement), never self-congratulation
    ('Done properly.' constructions are banned — Claude overuses them).
11. No decorative side-lines/edge stripes near logo/header (AI-slop signature).
12. No eyebrow bars (vertical bar/line before eyebrow labels) — plain letter-spaced text.
    (Reverses an earlier bar-prefixed instruction — LAYOUT-LAWS conflict resolved.)
13. Service card links = keyword-rich service anchors ('Get Gutter Repairs in Glasgow'),
    NOT generic Quick Quote; card body text lengths uniform (audited).
14. Contextual in-copy links target PAGE TYPES that will exist (services/about/contact/
    areas/resources), sit in natural sentences, sensible anchors — audit-enforced
    (scripts/dev/check-links.mjs, promoted upstream).
15. Long scroll sections: sticky left column + Quick Quote button in that column
    (pillars, ledger patterns).
16. GBP map embed in the locations/where-we-work section: profile map when GBP exists,
    area map (base-town centroid) when not. Lazy-loaded, rounded to design tokens.
17. Articles section + About band on every homepage. Section order: areas → map/CTA →
    FAQ; never form directly above another form.
18. Scroll-artifact law: off-screen pausing of sheen loops/videos/marquees (wired into
    Base.astro + offscreen.ts upstream), zero negative margins on overlapping curves.
    Diagnostic question for ANY future artifact report: 'wheel or arrow keys?' —
    separates Lenis path from native scroll in one answer. Wheel-only artifact =
    compositor load; check for off-screen animations first.
19. Header CTA pill renders when phone is empty (no-phone mode) — no empty header row.
20. Review count changes live (85→86): use current count from the pull, not the brief.

## Page completeness + project pages (Vince, 6 Oct — Wey Valley projects review)
- **Every page carries the full set**: reviews strip near the top, a map embed, and a
  resources/articles section. A page missing any of these reads as unfinished to Vince —
  mirror how the site's service pages include each one.
- **Never stack two closing CTA blocks** (e.g. CtaBand directly above ContactSection) —
  the duplicated pitch reads as junk. One closing conversion path per page; drop the extra
  component on that page, never site-wide.
- **No filler sections that only link around** (a 'Want a job like one of these?' NextSteps
  block with no substance = 'this is shit'). If a section has no unique content, cut it.
- **No fake affordances**: a 'See The Photos' style label that looks like a button/link but
  does nothing. Links go on the actual title; either make it a link or remove the label.
- **Light galleries use a click-to-switch viewer, not stacked sections**: when a page has
  few images per item, Vince prefers a left-hand sidebar listing the items — clicking loads
  the item in the main pane (title changes, images show on the right). Implement with all
  panes server-rendered for SEO/crawlers, JS hiding non-active panes and updating the
  location hash (replaceState, no scroll jump); sidebar collapses to a chip row on mobile.

## Motion intensity tiers (proposed for v2 from the Astro design-system dump, 12 Sep)
subtle (solicitors/finance/healthcare) | premium (trades/construction/property — LMB default) |
cinematic (agencies/luxury/SaaS). SiteBuilder already runs GSAP+Lenis+Tailwind; ShadCN UI
NOT adopted (React-based, fights Astro-static architecture); Three.js only if 3D materially
improves (rare). Template-per-niche system planned: templates/<niche>/ with palette seeds,
component variants, genome entry — 'build me a plumber website' picks from the plumber family.
See sitebuilder-v2-policy for the pipeline and the taste-library/Clarity flywheel plan.
## Vince review laws, 30 Sep 2026 (Vision Plumbing pass 2 — binding, permanent)
- **Legal pages = article layout, 100%** (HARD RULE, ordered before and missed): privacy and
  terms render through the SAME component as resource articles (banner, Google strip, prose
  column + compact TOC + CTA rail, small breadcrumbs at the bottom, CTA band, quick quote form).
  Share the component; never re-implement it. No "last updated" date.
- **Cards**: never a whole-card link and never a stretched-link ::after overlay. The anchor is the
  card TITLE only. Decorative arrow buttons are removed (or become the one title anchor). Applies
  to every grid: services, related services, articles, homepage resources strip.
- **No left-border accents** on any section, card, quote or takeaways box. Strip inline
  border-left from engine body_html at render.
- **Never "guides"**: the hub, nav, search, footer, breadcrumbs, cards and llms files say
  "resources".
- **No dates anywhere** on any page (article cards, featured image meta, legal pages, copyright
  year). Reading time is fine. Schema dates may stay in JSON-LD.
- **Forms**: every field full-width stacked (never 50/50 rows), submit button full-width, the
  postcode placeholder is just "Postcode".
- **Articles**: breadcrumbs small and at the BOTTOM; compact TOC so the sidebar CTA stays visible;
  sidebar CTA = Get a Quick Quote + main number, both full-width, NO landline; no facts/takeaways
  box; no "More on <service>" link block (the body already links the service); an image above
  EVERY H2 from the article service's R2 folder (topped up with credited stock when the folder is
  short), seeded-random, never twice on a page, STOP at the FAQ (no images in/after it).
- **Service pages = landing pages**, never article-style: no sidebar list; alternating photo/copy
  rows like the homepage, trust/proof, gallery, form. Hero CTA pair identical to the resources hero.
- **Stats/info boxes** never duplicate a figure shown elsewhere on the page; info boxes = light
  panel colour + small icon + hover lift; stat/process rows fade in staggered, one after another.
- **One accent** across a process row (no shades per step). FAQ open-row number chip is white or
  the light panel colour, never the accent.
- **Header scroll**: the header never changes height/padding on scroll (that shifts the page and
  flickers at the threshold). Sticky at top:-<band> so the box sticks flush at 0; the scrolled
  state only adds shadow/squares the top corners.
- **Floating circular call button** bottom-right on every page (main number), above the mobile
  sticky bar.
- **Areas page**: full-width Google Map centred on the base town.
- **No HTML sitemap page**: XML sitemap only.
- **Real review sources beyond GBP**: when a client has a Trustpilot profile (even with an empty GBP), scrape it with the browser (curl gets 403; star rating = `img[src*="star"]` alt, "Rated 5 out of 5 stars"; scrape ?page=N until empty; dedupe by body) and wire the reviews strip/corner widget/homepage slider + a /reviews page from the REAL data — Trustpilot attribution + rel="nofollow noopener" on every link back, AggregateRating JSON-LD from the real aggregate. Full recipe: sitebuilder-v3-build-laws Reviews section.
