// Worker entry. Static pages are served from ./dist by the assets binding before
// this runs; only paths with no asset (the /api/lead route, 404s) reach it.
// The cron trigger retries any lead email or recording copy still in the outbox.
import type { Env } from './lib';
import { json } from './lib';
import { handleLead } from './lead';
import { drainOutbox, leadConfig } from './leads/handler';

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(req.url);
    try {
      if (pathname === '/api/lead' || pathname === '/api/lead/') return await handleLead(req, env, ctx);
    } catch (e) {
      console.error('api error', pathname, (e as Error).message);
      return json({ ok: false, error: 'server' }, 500);
    }
    return env.ASSETS.fetch(req);
  },
  async scheduled(_event: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(drainOutbox(env, leadConfig(env)).then((tally) => {
      if (Object.keys(tally).length) console.log('lead outbox', JSON.stringify(tally));
    }));
  },
} satisfies ExportedHandler<Env>;
