// Deploy guard (v4 worker-naming law): refuses unless wrangler.jsonc names THIS site's own worker,
// site-truelinefinishes, and declares no D1/routes that could touch another site or DNS.
import { readFileSync } from 'node:fs';
const cfg = JSON.parse(readFileSync('wrangler.jsonc', 'utf8').replace(/^\s*\/\/.*$/gm, ''));
const ok = cfg.name === 'site-truelinefinishes' && !cfg.routes && !cfg.route && !cfg.d1_databases;
console.log(ok ? `deploy-guard: OK, worker ${cfg.name}` : `deploy-guard: REFUSED, wrangler.jsonc names ${cfg.name}`);
if (!ok) process.exit(1);
