/**
 * Site lead kit: configuration. Everything a handover changes lives in wrangler.jsonc
 * `vars` (plain values) or Worker secrets (names only here). No account-wide token is used:
 * mail goes out through this Worker's own `send_email` binding, locked to LEAD_FROM.
 */
export interface LeadEnv {
  /** D1 database owned by this site: leads, outbox, rejections (migrations/). */
  LEADS: D1Database;
  /** Cloudflare Email Service binding, restricted to LEAD_FROM (allowed_sender_addresses). */
  LEAD_MAIL: { send(message: unknown): Promise<{ messageId?: string }> };
  /** Canonical origin, e.g. https://buildingsforlife.com. Its host names the site everywhere. */
  SITE_ORIGIN: string;
  /** The client's own inbox(es), comma separated, in send order. */
  LEAD_TO: string;
  /** Agency copy while LMB operates the site. Set to "" on handover. */
  LEAD_ADMIN_COPY?: string;
  /** Sender: leads@<site domain>; the domain must be onboarded to Email Sending. */
  LEAD_FROM: string;
  /** Business name shown in the subject, sign-off and From display name. */
  LEAD_BUSINESS: string;
  /** Opening line of the lead email, e.g. "Hey team". */
  LEAD_GREETING?: string;
  /** "deliver" (default) or "hold": what to do with borderline (40-59) spam scores. */
  LEAD_HOLD_POLICY?: string;
  /** Optional secondary recording copy (Olympus). Empty = recording off. */
  OLYMPUS_RECORD_URL?: string;
  /** Secret: this site's derived Olympus recording key. Only used for the copy, never for mail. */
  OLYMPUS_SITE_KEY?: string;
}

export interface LeadConfig {
  host: string;
  recipients: string[];
  from: string;
  business: string;
  greeting: string;
  holdPolicy: 'deliver' | 'hold';
  recordUrl: string;
  recordKey: string;
}

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function emailList(value: unknown): string[] {
  return [...new Set(String(value || '').split(/[,;\s]+/).map((v) => v.trim().toLowerCase()).filter((v) => EMAIL.test(v)))];
}

export function leadConfig(env: LeadEnv): LeadConfig {
  const host = new URL(env.SITE_ORIGIN).host.replace(/^www\./, '');
  return {
    host,
    recipients: emailList(`${env.LEAD_TO || ''},${env.LEAD_ADMIN_COPY || ''}`),
    from: String(env.LEAD_FROM || `leads@${host}`).trim().toLowerCase(),
    business: String(env.LEAD_BUSINESS || host).trim(),
    greeting: String(env.LEAD_GREETING || 'Hey team').trim(),
    holdPolicy: env.LEAD_HOLD_POLICY === 'hold' ? 'hold' : 'deliver',
    recordUrl: String(env.OLYMPUS_RECORD_URL || '').trim(),
    recordKey: String(env.OLYMPUS_SITE_KEY || '').trim(),
  };
}
