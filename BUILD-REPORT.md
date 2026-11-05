# BUILD REPORT: Buildings For Life Ltd (buildingsforlifeltd.com), v3 client build

Test URL (noindex): https://site-buildingsforlifeltd-v3-test.small-bird-3273.workers.dev
Working dir: `buildingsforlifeltd/site` · plan: `site-plan/site-plan/` (APPROVED-BY-OPERATOR 0f047e057635b6a4)
Template: Electrix capture (`inputs/capture-electrix/`) · tokens: Astryx pattern (`src/styles/tokens.css`)
Decisions and every rule conflict: `DECISIONS.md`. Nothing committed (awaiting Zeus).

## Phase 1: site (green, deployed)
- `npm run build`: 30 pages (27 site + 3 engine articles). Deployed to the test URL; every route 200, unbuilt towns 404, `noindex, nofollow` on every page, `robots.txt` Disallow all, sitemap 28 URLs (thank-you/404 excluded).
- Gates (all PASS): `scripts/token-gate.mjs` (no raw colour outside tokens.css, px on scale, one font, 43 files, 0 violations); `scripts/audit.mjs` (1 H1, canonical, JSON-LD parses, banned copy incl. em dashes/free quote/bespoke/£/%/30 years, ANCHOR-LAW one link per target, card single-link, no broken links, no unbuilt-town links); `scripts/check.mjs` Playwright at 1440x900 and 360x780 on every route (no overflow, hero CTA above fold, alt text, mobile header = burger only, menu inside viewport, sticky bar hidden at top/shown mid/hidden over form, mobile Quick Quote lands the form fields).
- Schema: LocalBusiness/HomeAndConstructionBusiness/GeneralContractor graph (NAP, 36 areaServed, OfferCatalog), Service + FAQPage + BreadcrumbList on hubs/towns, Article + FAQPage on articles, CollectionPage/AboutPage/ContactPage. validator.schema.org: 0 errors, 0 warnings (home, brickwork, winchester, faq).
- Pages: `/` · `/services/` + 10 hubs at plan slugs · `/areas/` + 6 town pages (Hedge End, Southampton, Winchester, Bishops Waltham, Botley, West End; 30 other towns plain text) · `/about/` `/contact/` `/faq/` `/resources/` `/privacy/` `/terms/` `/thank-you/` `/404`.
- Reviews: the 4 real Google reviews (5.0) from `inputs/reviews/reviews.json`, verbatim, "Google review". Our Work: select-a-project gallery of 17 of Pete's own site photos. BBC badge in the trust strip, hero cards, about and footer.

## Phase 2: SEO engine (client set up, 3 seed articles accepted and wired; D1 canonical rows gated)
- Client folder `claude-seo-engine/clients/buildingsforlifeltd.com/` built from the plan by `_work/engine/build-client.mjs` (intake row, declared hubs, notes, keyword CSV, 6 engine-shape blueprints, Hedge End town research, PAA), then the engine's own steps: hub-check, onboardClient, compile-client-notes, phrasing stamp, onboard-run (all 5 validators PASS: CTA contract, trust anchor, hooks, 360 unique slugs, titles <= 60). One-line engine data change: BFL added to `anchor-pools.json` construction.clients.
- Articles: ranks 1-3 of the matrix (House Extensions, Builders, Loft Conversions in Hedge End; blueprinted hubs only, operator correction 4) via `gt-test-sample-write.mjs` prep -> in-session JSON authored from the engine's composed brief (the engine's in-session path; no ANTHROPIC_API_KEY on this box for the batch path) -> `--stage write` = `core/pipeline.mjs::writeOneArticle`. All 3 ACCEPTED, export not blocked, 0 failures, 0 legal findings; one link per target.
- Site: `scripts/import-articles.mjs` imports the accepted artefacts; pages at the engine URLs; title-only cards on home, hubs and /resources/.
- Staging schedule: `_work/engine/STAGING-SCHEDULE.md`. `article_parameters` rows written (run `seed-staging`). Canonical `articles` rows NOT written: live D1 lacks the `faq_questions` column, a GATED engine migration. Needs operator approval.

## Phase 3: logo (codex, done, deployed)
- Prompt: `inputs/LOGO-PROMPT.md` filled for Buildings For Life Ltd / building+construction (bricklaying + natural stone) / trustworthy, craftsman, enduring / white + deep builder green #1F4332 with sandstone #F2C94C accent / house built from brick and stone courses -> `_work/logo/LOGO-PROMPT-FILLED.md`.
- `codex exec` (built-in image_gen) produced 3 sheets; attempt 3 chosen (name spelled right in all 5 lockups). Codex cut it with `_work/logo/cut.py`: logo-full, -reversed, -black, -white, -horizontal, -horizontal-white (for the dark header), -mark, favicons 512/256/128/64/32/16 x colour/dark/mono + 180. Every file RGBA with alpha-0 corners, checkerboard proofs in `_work/logo/proofs/`, report `_work/logo/REPORT.md`.
- Installed over the placeholders in `brand/` and `site/public/brand/` (`scripts/brand-install.mjs`, also builds og-image.png). Header/footer use logo-horizontal-white.
- Caveats (codex report): the sheet was generated on coloured panels, not transparent (keyed out); lockups differ slightly in brick detail; horizontal lettering has faint generation texture; favicons are upscaled from ~130px source. A vector redraw is recommended before print use.

## Open items for Zeus / operator
1. Approve (or not) the two gated D1 migrations, then re-run the seed write to land the staging rows.
2. accentHex `#2C5440` in the engine brief is provisional (Kieran's call, D-2026-08-19-11).
3. Town pages vs the "one areas page" AREAS LAW used on DH/plumbham (see DECISIONS).
4. Form endpoint not wired; privacy/terms defaults need Pete's confirmation; photos are low-res originals (ask Pete for full-size files).
5. Process statements written in service copy ("changes priced in writing", "provisional sums", building control booked) should be confirmed with Pete.
