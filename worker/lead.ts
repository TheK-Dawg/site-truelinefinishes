/**
 * /api/lead: the site's own lead endpoint. The form posts to the site's own
 * origin, and this Worker owns the whole enquiry: checks, storage, email and
 * retries (worker/leads/, the site lead kit). See HANDOVER-FORMS.md.
 *
 * GET  hands the form its Turnstile sitekey.
 * POST runs the bot checks, saves the lead in this site's D1 (LEADS), emails
 * every recipient through this Worker's send_email binding (LEAD_MAIL) and
 * then posts a record-only copy to Olympus in the background. Olympus being
 * down never blocks or fails the lead email (fleet order, 27 Oct 2026).
 *
 * Turnstile is verified here, before anything is stored or sent.
 */
import { type Env, json, verifyTurnstile } from './lib';
import { handleLeadPost } from './leads/handler';

export async function handleLead(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  if (req.method === 'GET') return json({ sitekey: env.TURNSTILE_SITEKEY || '' });
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
  return handleLeadPost(req, env, {
    verifyTurnstile: (token, ip) => verifyTurnstile(env.TURNSTILE_SECRET, token, ip),
    waitUntil: (p) => ctx.waitUntil(p),
  });
}
