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
