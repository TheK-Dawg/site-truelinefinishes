# DECISIONS: TrueLine Finishes build (5 Nov 2026)

Every place a generic v4 law, the build brief and the approved plan pulled different ways, and
what was done. Precedence used: the operator's brief and the plan for this site > generic v4 law.

| # | Topic | Generic rule | This site | Why |
|---|---|---|---|---|
| D1 | Reviews | v4 REVIEWS LAW: write up to 10 real-looking reviews when none are supplied | No written reviews. Trustindex slot keyed on CID 8023434379390696838, TODO until the widget id is supplied; meanwhile the section links to the Google listing, no count, no rating | Plan standing prohibition 2 and site rules 8/24; brief: "do NOT invent a widget id" |
| D2 | "Free quote" ban | "free quote" banned | "free quotation" used (Brandon's advert word, the plan's CTA line); "free quote" still banned by the audit | Plan, Contact: the CTA is "Get a free quotation: call Brandon on 07949 484274 or use the quote form." |
| D3 | Form fields | Standard Name/Email/Phone/Postcode/Message | Brandon's 28 Oct list exactly (work dropdown, home owner or tenant, postcode, short description, name, phone, email) | Plan flag 11, re-confirmed by the operator |
| D4 | Form destination | Brief: admin@apexiamarketing.com | admin@apexaimarketing.com (the form already had it) | apexia… is the parked misspelt domain with no mail (Formlane DECISIONS, operator Round F, 5 Nov). The intent, agency inbox only, not Brandon's, is kept. Flagged in BUILD-REPORT |
| D5 | Form reuse | Brief: create via Formlane MCP | The website "TrueLine Finishes website" and the Live form "TrueLine Finishes — Quick Quote Online" already existed (made 15:21 UTC 5 Nov by an earlier run) with the exact fields, domains and destination; reused, not duplicated | One Quick quote online form per website (Formlane rule); a duplicate would split leads |
| D6 | Breadcrumbs | Breadcrumbs above the page title on service pages | None in heroes; articles carry breadcrumbs directly under the hero band; BreadcrumbList schema on hubs and articles | Brief: "No breadcrumbs in heroes"; plan, Layout: articles have "a header band; breadcrumbs" |
| D7 | Reviews placement | Review section directly under the hero on every page | Every page except home, where the plan's own order puts reviews after the coverage line | Plan, Layout gives the home order explicitly; it "decides order" |
| D8 | Standard pages | /services/, /areas/, /faq/ always exist | No /areas/ (plan: "No Areas page"), no /services/ or /faq/ (not in the plan's page list); Services nav opens the five hubs. /gallery/, /reviews/, /sitemap/, /thank-you/ and the legal set are built | Plan, Build scope + brief |
| D9 | Gallery on every page | Full gallery on every page | Home, About, Reviews carry the Our Work showcase; hubs carry "<hub> in pictures" (the plan's own block); /gallery/ has all 194 photos | Avoid two galleries on one hub page; plan names the hub block |
| D10 | Fonts | One font family | Two system stacks: serif for headings (capitals / small capitals), sans for body. No webfonts | Plan, Brand (type) + brief "NO webfonts" |
| D11 | Logo | Redraw if low-res | Not redrawn: the primary JPG is 1600 px wide with a true #000000 ground, sharp at every size used (max 280 px CSS / 560 px at 2x). Exports are crops of the original file only (`scripts/brand.mjs`); favicon = the logo's own T | Plan flag 10 ("if the files are not sharp enough") |
| D12 | Article generation | Plan-commissioned articles are a build deliverable | One engine-stub article (Painting and Decorating in Baildon), status `review`: noindex, out of the sitemap, unlinked | Brief: the engine runs after handoff; plan: test articles go to Brandon first |
| D13 | Canonical host | Apex or www | www.truelinefinishes.com (apex to 301 at launch) | Brandon's own "Www.truelinefinishes.com" |
| D14 | Map embed | Embedded Google map, auto-load | Contact page embeds the listing by CID, zoomed out (z=11) | Brief orders the CID map; zoom keeps the street out of focus since the address is never shown |
| D15 | Category archives | Article category archives at root | None: each hub is its articles' category page (further reading) | Plan: "a hub links down to its town articles" |
| D16 | Footer CTA / credit | No CTA in footer; no agency credit on client sites | Followed | v4 law |

## Operator overhaul, 5 Nov 2026 (brief: TRUELINE-OVERHAUL-BRIEF, verdict "really bad, complete overhaul")

The operator reviewed the workers.dev preview and ordered the home page and footer rebuilt on the
Buildings for Life structure exactly. His rulings override the plan's earlier home-page asks and
the decisions above where they conflict (D7, D8, D16 superseded as noted).

| # | Topic | Before | Now | Source |
|---|---|---|---|---|
| O1 | Logo | Logo in the header AND a large wordmark inside the hero | Header bar only (logo left, nav right, black bar); none in the hero | Operator: "logo above the header AND in the hero" |
| O2 | Hero video | Brandon's kitchen Short beside the headline (Brandon, 23 Oct) | No video in the hero. The Short moved to /about/, beside Brandon's story (VideoObject schema moved with it). House video unchanged on Painting and Decorating + Interior Painting | Operator override of Brandon's earlier ask |
| O3 | Hero form | Quote form inside the hero (plan, Layout) | BFL hero: photo + overlay, H1, lead, Quick Quote Online + Call, Google reviews line, three info cards. The Formlane form is its own section, LAST on the page; Quick Quote Online scrolls to it (`#contact`) | Operator override of the plan's hero-form line |
| O4 | Before-and-after slider | Home, three hubs and the gallery | Deleted everywhere (component removed). Gallery shows the finished "after" shots in their room/exterior groups; "before" shots not shown | Operator: "I never do before and after" |
| O5 | Underlined links | Card titles, tiles, prose, footer bar, articles | No underline anywhere, site-wide (compiled CSS gate + computed-style Playwright check). Links read by colour/weight, hover changes colour | Operator: "we don't underline links" |
| O6 | Home order | Plan order (tiles, slider, hubs, why, steps, work, coverage, reviews, charity, FAQ, CTA band, articles) | BFL order: hero → reviews (TrustIndex slot) → statement → trust badges → about block → services grid → our work → the three tiles (BFL craft row) → how a job runs → areas (map + places, no links: no Areas page) → resources preview → FAQ → quote form. "Why people choose us" became the statement slab + trust badges. CTA band dropped from home (never a CTA above the form). Supersedes D7: reviews now directly under the hero on home too | Operator brief |
| O7 | Reviews | Section after the coverage line on home | BFL position under the hero, full-width slot marked `data-trustindex-todo="TODO-TrustIndex-ID"` (+ HTML comment) until the operator supplies the widget id. Still no reviews, rating or count invented; links to the Google listing | Operator brief fix 7; D1 stands |
| O8 | Missing pages | No /faq/, no /services/ (D8) | /faq/ (the plan's own Q&A only: home questions + each hub's, de-duplicated) and /services/ (all five hubs) built; Services nav item now opens /services/, dropdown lists the five hubs + All services. Still no /areas/ or town pages (plan) | Operator brief fix 8; supersedes D8 for these two pages |
| O9 | Footer | Plan footer, no CTA, no agency credit (D16) | BFL footer: logo + question + Quick Quote Online; About Us (with the charity line), Our Services (5 + all), Company, Quick Contact (call, email, WhatsApp, hours; no address); bottom bar © year + legal links + "Painting and decorating websites by Local Map Booster" (one nofollow link on the keyword) | Operator brief fix 9 explicitly orders BFL's footer, the charity line and the LMB credit; supersedes D16 |
| O10 | Resources preview on home | Rendered nothing until an article is published | Always renders on home (BFL order); with nothing published it shows an honest "being written" line, never a link to an unpublished article | Operator brief fix 8 |
