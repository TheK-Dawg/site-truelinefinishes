# Enquiry form: how it works, and how to hand it over

This site owns its enquiry form end to end. Nothing in the submit, save or email path
depends on Local Map Booster's Olympus dashboard. Olympus only receives a copy afterwards,
for LMB's records. You can turn that copy off without affecting anything else.

## 1. What happens when someone sends the form

| Step | Where | Notes |
|---|---|---|
| Form | `src/components/QuoteForm.astro` | Fields: name, email, phone, postcode, message, plus hidden service, page URL, referrer, UTM tags and a per-form `submission_id`. |
| Endpoint | `POST /api/lead`, same origin | `worker/lead.ts` → `worker/leads/handler.ts`. A GET returns the Turnstile sitekey. |
| Checks | `worker/leads/handler.ts` | Same-origin, the `_company` honeypot, required fields, Turnstile, max 8 per IP per 10 minutes, English-only message (`worker/leads/lang-guard.js`), spam score (`worker/leads/spam.ts`). |
| Save | D1 database `site-buildingsforlifeltd-leads`, binding `LEADS` | The lead and one outbox row per recipient are written in one transaction. The visitor sees success only after this, or, if the database is down, only after at least one recipient has accepted the email. |
| Email | Cloudflare Email Sending, binding `LEAD_MAIL` | One message per recipient, from `leads@buildingsforlife.com`, Reply-To the visitor. Subject: `New lead inquiry · <name> · Buildings For Life Ltd`. |
| Retry | Cron `*/5 * * * *` → `drainOutbox` (`worker/leads/outbox.ts`) | Backoff 1m, 5m, 15m, 1h, 3h, 6h, 12h, 24h, then the row is marked `dead` and kept. |
| Record copy | `POST` to `OLYMPUS_RECORD_URL`, signed with `OLYMPUS_SITE_KEY` | Sent only from the background or the cron, never on the submit path. Idempotent on the lead id. |

Spam scores of 60 or more are saved but never emailed. Scores of 40–59 follow
`LEAD_HOLD_POLICY`: `deliver` (the default here) emails them; `hold` saves them unsent.
Non-English messages and rate-limited submissions are refused, and a row without contact
details is written to `rejections`.

## 2. Configuration (`wrangler.jsonc`)

| Name | Kind | Value now | Change it when |
|---|---|---|---|
| `LEAD_TO` | var | `mail@buildingsforlifeltd.com` | The client's inbox changes. Comma-separate several addresses. |
| `LEAD_ADMIN_COPY` | var | `admin@apexaimarketing.com` | **Set to `""` on handover.** |
| `LEAD_FROM` | var | `leads@buildingsforlife.com` | Must be on a domain onboarded to Email Sending. Keep it in step with `allowed_sender_addresses`. |
| `LEAD_BUSINESS`, `LEAD_GREETING` | var | `Buildings For Life Ltd`, `Hey team` | Wording only. |
| `LEAD_HOLD_POLICY` | var | `deliver` | See section 1. |
| `OLYMPUS_RECORD_URL` | var | Olympus `/ingest/site-lead` | **Set to `""` on handover** to stop the copy. |
| `TURNSTILE_SITEKEY`, `TURNSTILE_SECRET` | secret | (set) | The Turnstile widget moves to a new account. |
| `OLYMPUS_SITE_KEY` | secret | (set) | **Delete on handover.** It can only record leads for this one domain in Olympus. |
| `LEADS` | D1 binding | `site-buildingsforlifeltd-leads` | Account move (section 5). |
| `LEAD_MAIL` | send_email binding | sender restricted to `leads@buildingsforlife.com` | Sender address change. |

No Cloudflare API token is used by the site or stored in this repo, the Worker or the browser.

## 3. Domain prerequisites (these are not automatic)

- **Email Sending must be onboarded** for buildingsforlife.com: Cloudflare dashboard →
  Compute & AI → Email Service → Onboard Domain. This adds `cf-bounce` records and
  SPF/DKIM for sending. It was onboarded on 27 Oct 2026.
- **Email Routing stays off.** The domain's inbound mail (MX) is hosted at IONOS. Turning on
  Email Routing would take over the MX records and break inbound mail. Routing is not needed:
  Email Sending sends to any recipient on Workers Paid.
- **Workers Paid plan.** Sending to arbitrary recipients needs it. D1 and cron triggers are
  included.
- The Worker's Custom Domains and the www → apex redirect were attached by API, not in
  `wrangler.jsonc`, so a deploy never touches DNS.

## 4. Inspecting and retrying

```bash
# Recent leads and their delivery state
npx wrangler d1 execute site-buildingsforlifeltd-leads --remote --command \
  "SELECT id, created_at, status, spam_score FROM leads ORDER BY created_at DESC LIMIT 20"
# Anything not delivered
npx wrangler d1 execute site-buildingsforlifeltd-leads --remote --command \
  "SELECT lead_id, kind, target, state, attempts, last_error FROM outbox WHERE state != 'sent'"
# Retry dead rows on the next cron run (about 5 minutes)
npx wrangler d1 execute site-buildingsforlifeltd-leads --remote --command \
  "UPDATE outbox SET state='pending', attempts=0, next_at=0 WHERE state='dead'"
# Refused submissions
npx wrangler d1 execute site-buildingsforlifeltd-leads --remote --command \
  "SELECT created_at, reason, detail FROM rejections ORDER BY created_at DESC LIMIT 20"
```

Worker logs (`npx wrangler tail`) show lead ids and error codes only, never contact details.
Delivery is at least once: if a Worker dies mid-send, the row's 2-minute lease expires and it
is sent again, so a rare duplicate email is possible. A lost one is not.

## 5. Handing the site to the client's own Cloudflare account

1. The client creates a Cloudflare account on **Workers Paid** and adds buildingsforlife.com
   as a zone. Copy every DNS record across first, including the IONOS MX, SPF, `_dmarc`,
   `autodiscover`, and the DKIM CNAMEs `s1-ionos._domainkey`, `s2-ionos._domainkey` and any
   `s<digits>._domainkey`. Then change the nameservers at the registrar.
2. In the client's account, onboard buildingsforlife.com to **Email Sending**. Do not
   enable Email Routing.
3. Create the D1 database and apply the schema:
   `npx wrangler d1 create <name>`, put the new id in `wrangler.jsonc`, then
   `npx wrangler d1 migrations apply <name> --remote`. To keep old leads, export the
   database with `npx wrangler d1 export site-buildingsforlifeltd-leads --remote --output leads.sql`
   and import it into the new one.
4. In `wrangler.jsonc`, set `LEAD_ADMIN_COPY` to `""` and `OLYMPUS_RECORD_URL` to `""`.
5. Create a Turnstile widget in the client's account for the domain, then
   `npx wrangler secret put TURNSTILE_SITEKEY` and `TURNSTILE_SECRET`. Do not set
   `OLYMPUS_SITE_KEY`.
6. `npm ci && npm run test:leads && npm run build && npx wrangler deploy` (wrangler 4 is
   needed for `allowed_sender_addresses`). Attach the apex and www Custom Domains to the
   Worker in the dashboard.
7. Send one real enquiry from the live site and confirm it arrives. Then remove the old
   Worker, D1 database and secrets from LMB's account. LMB should also rotate or delete the
   site's Olympus key: deleting `OLYMPUS_SITE_KEY` here is enough, because the key works for
   nothing else.

## 6. Tests

`npm run test:leads` runs the real handler and outbox against SQLite with the migration
applied, a mock Email Sending binding and a mock Olympus. Nothing is sent. It covers:
the exact email wording, Olympus being down (email unaffected, copy recorded later, no
duplicates), partial and permanent email failures, idempotent resubmission, the send lease,
spam, refusals, the database being down, handover mode (no admin copy, no record) and the
cron entry point.
