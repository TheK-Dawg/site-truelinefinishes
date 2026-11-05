/**
 * /.well-known/security.txt (RFC 9116) — where security researchers report issues.
 * Contact comes from src/data/site.ts; Expires is rolled forward a year on every build.
 */
import type { APIRoute } from 'astro';
import { business } from '../../data/site';

export const GET: APIRoute = ({ site }) => {
  const origin = site!.toString().replace(/\/$/, '');
  const expires = new Date(Date.now() + 365 * 864e5).toISOString().replace(/\.\d{3}Z$/, 'Z');

  const lines = [
    `Contact: mailto:${business.email}`,
    `Expires: ${expires}`,
    'Preferred-Languages: en',
    `Canonical: ${origin}/.well-known/security.txt`,
  ];
  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
