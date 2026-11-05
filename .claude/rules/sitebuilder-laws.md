---
name: sitebuilder-laws
description: Use when building or revising any LMB SiteBuilder site.
---

# SiteBuilder v2 — Hard Laws & Calibration

## STANDARD LEAD FORM LAW (Vince, 27 Sep — replaces GBP Monster forms)
Every build ships the LocalImpact form EXACTLY as built there. Full spec:
`/root/business-operations/05-content-and-images/sitebuilder/STANDARD-LEAD-FORM-LAW.md`.
Reference impl: `/root/projects/lead-gen-websites/v3-fulltests/localimpact-v3`
(ProjectForm.astro, api/lead.ts, lib/lead-email.ts, emdash-seed/turnstile.mjs).
- Fields in order: Name, EMAIL SECOND, Phone, Message. No services select. Postcode only when the client needs it.
- Invisible Turnstile (non-interactive) + honeypot. NEVER show "verify you are human".
- POSTs to the site's own /api/lead; D1 write FIRST, then email (failures never lose a lead).
- Partial capture: abandoned email/name/phone saved to D1 only, no notification.
- Notify admin@localmapbooster.com ONLY by default; client email added later on Vince's say-so. Sender cms@<domain>.
- Subject: `New lead submission (Site Name)` — no "Quick Quote request", no lead number. Styled HTML email; labels Name/Email/Phone/Message; details block shows Source (utm_source) only — other UTMs stored in D1, never displayed. replyTo = lead's email.
- EMDASH: NOT part of builds yet (Vince testing). Forms/articles standard does not depend on it.

Everything below is LAW on every build. Full texts live in
`/root/plugin-sitebuilder-study/repo/skills/sitebuilder/rules/` (LAYOUT-LAWS,
AGENCY-CORE, SEO-STANDARD, MOTION-SYSTEM, HERO-PATTERNS, PARALLEL-BUILD) —
this file is the summary Vince's corrections map onto.

## Always-exist pages (LAW R10, no toggle)
/services/ hub · /areas/ hub · /resources/ hub (articles live here — never /blog) ·
/about/ · /contact/ · /thank-you/ · /404 · /terms/ · /privacy/

## Navigation
Home always in nav; logo always present, links home; proper links on mobile.

## Sticky CTA bar
- Appears ONLY after scrolling past the hero; MOBILE ONLY (never desktop)
- Hides ONLY on the real quote form — by form identity, not "a form exists"
  (postcode checkers etc. do NOT hide it)
- Phone button gets the accent colour when a phone exists
- Legal/utility pages skip it

## Zero overflow (hard)
Nothing may ever overflow the viewport at any width. Loop + audit-laws check
scrollWidth <= innerWidth at 1440/768/390 and every fixed/sticky bounding box.
Proven on the broken build first (7 blockers) before trusting a clean pass.

## Internal linking (anchor law — from claude-seo-engine)
- Link target must MATCH the anchor's meaning; anchor names what the target delivers
- Host sentence reads naturally and carries information — never exists to host a link
- "First mention only / never repeat a target" applies to SEO ARTICLES ONLY
  (6 Oct operator ruling). Normal pages have NO such rule: multiple links to the
  same target are fine (nav, footer, body, related cards); only one needs to be
  the follow link, the rest are navigational — no nofollow work requested.
  BFL shipped 19 dead related-card buttons from applying the article rule to
  normal pages. Card buttons ALWAYS link on every page type.
- ONE contextual contact link per page (CTA buttons handle conversion — not 20 links)
- terms/privacy linked only from contact+about; hubs link siblings + areas hub
- audit:contextual compares anchor vs target title/topic and FAILS mismatches

## Copy laws
- Page content: Opus at MEDIUM effort (Sonnet reverted — quality won)
- Word bands code-checked (audit:copy); prompts/ folder = hero, service card,
  review, section, FAQ, meta prompts sourced from seed.json + planner brief
- "free quote" BANNED — Quick Quote / Quick Quote Online only (overrides Kieran seeds)
- Reviews in spec SHIP; honesty = provenanced numbers, no hollow reviews

## Reviews & GBP
Reviews honesty ship-block REMOVED. If GBP cid exists: npm run gbp at kickoff —
reviews (DataForSEO) + photos (Zeus browser harvest) BEFORE build. SEO-engine
article generation is a SEPARATE LATER pass, never during the site build.

## Performance calibration (Glasgow v4, 13→18 pages)
- Full site ≈ 50-55 min clean (65 incl. interruptions); 3 page-group agents in parallel
- Concurrent review loop: 18 routes 1,104s → 296s (4 contexts, RAM-capped)
- OG image + favicon generated AT KICKOFF (scripts/og-favicon.mjs)
- Kickoff = recipe → taste → tokens; GBP pull consumed automatically

## Canonical host law (v4 D-137)
A site's canonical host may be apex OR www — never assume apex. The gate (CHK-CFI-003) detects the canonical host from served rel=canonical links + sitemap.xml: the NON-canonical host must 301 to the canonical one (path+query preserved), HTTP must 301 to HTTPS on the canonical host, and the canonical host must serve or redirect only to itself. A www-canonical site must never fail for being www-canonical. A site whose canonical links/sitemap name BOTH hosts fails (no single canonical host). A live site with a conflicting redirect convention is a LAW gap to fix in the audit first, not a site to flip — flipping a live zone's canonical host means rewriting canonicals/sitemap across all pages and is Vince-gated.

## Gate discipline (from claude-seo-engine hard-learnings)
Prove every gate by breaking it on purpose. A skipped test = failing test.
Zero findings on an untested gate = broken harness, not clean subject.

## SEO engine (ours)
TheK-Dawg/claude-seo-engine — context/ = standards, prompts/v2/ = versioned
writing prompts, briefs keyed on DOMAIN. Three sources at build: planner seed +
SEO engine + house prompts.