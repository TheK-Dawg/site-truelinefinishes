import type { LeadEnv } from './leads/config';

/**
 * Shared helpers for the lead endpoint: env shape, JSON responses, request
 * metadata, same-origin check and Turnstile verification.
 * The lead itself (store, email, retries) is handled by worker/leads/.
 * Pattern follows the standard lead form law reference build
 * (v3-fulltests/dh-v3-test/worker/lib.ts).
 */
export interface Env extends LeadEnv {
  ASSETS: Fetcher;
  /** Turnstile widget for this site. wrangler secret put TURNSTILE_SITEKEY / TURNSTILE_SECRET. */
  TURNSTILE_SITEKEY: string;
  TURNSTILE_SECRET: string;
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/** Trimmed string, capped so a bot cannot stuff the payload. */
export const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^[+()\d\s-]{7,20}$/;

export function meta(req: Request) {
  const cf = (req as Request & { cf?: { country?: string } }).cf;
  return {
    ip: req.headers.get('cf-connecting-ip') || '',
    country: cf?.country || '',
    ua: str(req.headers.get('user-agent'), 300),
  };
}

/** Same-site check: rejects cross-origin posts from other sites. */
export function sameOrigin(req: Request) {
  const origin = req.headers.get('origin');
  return !origin || origin === new URL(req.url).origin;
}

/** Cloudflare Turnstile siteverify. Never throws: a network fault is a failed verdict. */
export async function verifyTurnstile(secret: string, token: string, ip: string) {
  if (!secret) return { ok: false, verdict: 'no-secret-configured' };
  if (!token) return { ok: false, verdict: 'missing-token' };
  try {
    const body = new FormData();
    body.append('secret', secret);
    body.append('response', token);
    if (ip) body.append('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const out = (await res.json()) as { success: boolean; hostname?: string; 'error-codes'?: string[] };
    return {
      ok: !!out.success,
      verdict: out.success ? `ok:${out.hostname || ''}` : (out['error-codes'] || ['failed']).join(','),
    };
  } catch (e) {
    return { ok: false, verdict: `siteverify-error:${(e as Error).message}`.slice(0, 200) };
  }
}
