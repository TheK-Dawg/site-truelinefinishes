---
name: sitebuilder-content-laws
version: 1.0
author: zeus
license: internal
metadata:
  hermes:
    tags: [sitebuilder, content, internal-linking]
    related_skills: [sitebuild-orchestration]
description: Use when building, auditing or fixing LMB site content.
---

# SiteBuilder content laws — linking, wording, CTA, component consistency

## When to Use
- Building, reviewing, or content-fixing any LMB SiteBuilder site.
- Running a fleet-wide content/linking audit across the live sites.
- Wiring smoke-test checks for content violations.

Always-on laws for every LMB sitebuilder build, review and fix. Distilled from an
operator fleet audit of all 19 live sites (142 failed site/check combinations); build
briefs cite these alongside the v3 law files.

## Internal linking
- An anchor is ALWAYS a full meaningful phrase. Never "the", "in", "our", "a", "on",
  "to", "here" — and never a link whose meaningful words sit outside the anchor
  ("the full set lives in our guides" with the link on "our" = defect). Audit check:
  extract every <a> anchor; flag any matching ^(the|in|our|a|on|to|here|at)\b.
- "Areas We Cover" itself is NOT an anchor. The only acceptable areas-link form is a
  full call-to-action phrase ("View all areas we cover"). Bare heading-phrase links and
  links spread across surrounding stop words are defects.
- NEVER the word "directory" for services. It is a list of our services.
- The word "Guides" is banned sitewide (sections/cards/labels say "Resources") — already
  law; the fleet audit proved it still ships on ~16 of 19 sites, so grep every fix pass.

## CTA & form
- CTA/form copy on a page talks about THAT page's service — verify on TWO service pages
  per site (radiators copy on a pipe-flushing page is the proven defect class).
- The CTA/form section NEVER mentions the contact page ("the same form sits on our
  contact page" = defect; the CTA's only job is its own form).
- Meta-referencing copy ("anything not covered on this page…") is banned except the
  allowed contact-adjacent form ("Answered on the contact page").
- Lead forms carry NO service/topic dropdown (hidden pre-filled service input is fine);
  standard fields come from the form-engine repo; per-site divergence is a defect.

## Component consistency (one component, whole site)
- Gallery: the FULL previous-work set on EVERY page — never a 4-image subset with "the
  full set is on the home page" copy. Adding images adds them to the one shared component.
- Areas map + areas list: identical on every page; a page that prunes areas is a defect.
- Reviews section sits directly under the hero on EVERY page — template default
  placement is overridden, ours always moves up.
- Header Services nav item opens a dropdown listing individual services on every site.

## Page shape
- Service pages are NOT articles: no prose wall, no TOC, no sidebar link lists. Shape is
  2–3 alternating left-image/text, right-image/text rows, then the standard sections.
- About and Contact pages are NOT article walls — flag copy volume and structure.
- Articles: sidebar + CTA are sticky and follow scroll; body typography uniform (visible
  size/font mismatch between intro and body = defect); reader questions/FAQs live in
  their own section at the bottom.

## Audit check behaviour (operator rulings — override old check definitions)
- ABSENCE IS NEVER FAILURE: a check that demands X must PASS when X is absent by design —
  no phone → phone/tel checks are N/A; no WhatsApp near the form = the rule satisfied;
  no search feature = search checks N/A; Google Maps embed iframe in initial HTML is fine.
  A check must never fail for the very absence it demands.
- ZERO ASSERTIONS = NOT_RUN, never a FAIL or major issue. Failing a check for something the
  audit never looked at is banned outright.
- OPERATOR-SUPPLIED STATEMENTS ARE USABLE FACTS. Claims sourced from what the operator said
  (years in business, response time, 24/7) never fail a fact-backing check — that check only
  applies to invented/unbacked claim classes.
- Breadcrumbs are required on service pages, NOT on 404 (not indexed, adds nothing).
- Title length is a guide, never a failure: a 62-char indexed title stays as-is (60 is a
  recommendation; Google truncation is acceptable and re-writing indexed titles is worse).
- NAP check = match the client's Google Business Profile, not footer self-consistency.
- Form-section id is `contact-form` (or quote-scoped), never bare `contact` — a real contact
  page may need that id. Quote-path anchors resolve to the form section even under slightly
  different naming (resolve before failing).
- Form endpoint: sites POST to the fleet-standard olympus workers.dev `/forms/<slug>/submit`
  intake. That host appearing in a form action is NOT a defect — verify against a newer
  correct site before 'fixing' anything that looks fleet-standard.
- A smoke-check that contradicts itself (reports 0 quote forms while also finding a form
  endpoint) has a broken DETECTOR: fix the selector and re-run — never trust or massage the
  outcome of a self-contradicting check.
- Audit output must be operator-readable: no unexplained jargon (bare status codes, internal
  service ids) — explain in plain terms or drop the line. 307s are followed and the
  destination judged; a 404 on a genuinely non-required page is not a defect.

Fleet-wide audit procedure: see references/fleet-content-audit.md
Operator ruling law (full rulings on the audit ruleset): brain repo
`zeus-brain-2/10-laws/sitebuilder-AUDIT-RULINGS-LAW.md` — cite by PATH in audit/fix briefs.
