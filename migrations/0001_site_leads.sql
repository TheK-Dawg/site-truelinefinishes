-- Site lead kit: this site's own durable lead store and outbox (D1, binding LEADS).
-- Apply: npx wrangler d1 migrations apply <database_name> --remote
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,                       -- site lead id, also the idempotency key sent to Olympus
  idem_key TEXT NOT NULL UNIQUE,             -- form submission id (or content hash): repeats are not re-sent
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL CHECK (status IN ('pending','sent','partial','failed','spam','held')),
  fields_json TEXT NOT NULL,                 -- the visitor's answers
  attribution_json TEXT NOT NULL,            -- page, referrer, ip, user agent, utm (server-side)
  ip TEXT,                                   -- for the per-IP submit limit
  spam_score INTEGER NOT NULL DEFAULT 0,
  spam_reasons TEXT,
  reply_to TEXT,
  subject TEXT NOT NULL,                     -- composed once; every retry sends the same message
  body TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS leads_ip_created ON leads(ip, created_at);

-- One row per email recipient ('email') and one for the Olympus recording copy ('record').
CREATE TABLE IF NOT EXISTS outbox (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id),
  kind TEXT NOT NULL CHECK (kind IN ('email','record')),
  target TEXT NOT NULL,                      -- recipient address, or 'olympus'
  state TEXT NOT NULL CHECK (state IN ('pending','sending','sent','dead')),
  attempts INTEGER NOT NULL DEFAULT 0,
  next_at INTEGER NOT NULL DEFAULT 0,        -- unix ms: not before
  lease_until INTEGER NOT NULL DEFAULT 0,    -- unix ms: a 'sending' claim expires here
  provider_id TEXT,                          -- Email Service messageId / Olympus lead id
  last_error TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (lead_id, kind, target)
);
CREATE INDEX IF NOT EXISTS outbox_due ON outbox(state, next_at);

-- Refused submissions (non-English, rate limit). No contact details kept.
CREATE TABLE IF NOT EXISTS rejections (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  reason TEXT NOT NULL,
  detail TEXT,
  page_url TEXT
);
