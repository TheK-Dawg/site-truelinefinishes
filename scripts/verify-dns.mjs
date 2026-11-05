// DNS CUTOVER CHECK — compares the Cloudflare zone for this site against the
// LIVE authoritative DNS (IONOS), so switching the nameservers cannot silently
// drop the client's mailbox, and checks the website is the production Worker.
// Run it before the cutover, and again after.
//
//   CLOUDFLARE_API_TOKEN=… [LIVE_NS=…] node scripts/verify-dns.mjs [domain] [worker]
//
// LIVE_NS names the IONOS server holding the client's records. Set it when the
// zone's original_name_servers are not IONOS: buildingsforlife.com was already
// delegated to another Cloudflare pair when its zone was made (27 Oct), and IONOS
// still answers for it on ns1067.ui-dns.de.
//
// The one rule that matters most: the apex MX must still point at the client's
// mail host. Cloudflare Email Routing would replace it and break their email.
import { execFileSync } from 'node:child_process';
const DOMAIN = process.argv[2] ?? 'buildingsforlife.com';
const WORKER = process.argv[3] ?? 'site-buildingsforlifeltd';
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const cf = async (path) => {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, { headers: { authorization: `Bearer ${TOKEN}` } });
  const body = await res.json();
  if (!body.success) throw new Error(JSON.stringify(body.errors));
  return body.result;
};
const dig = (name, type, server) =>
  execFileSync('dig', ['+short', type, name, `@${server}`], { encoding: 'utf8' })
    .split('\n').map((s) => s.trim().replace(/\.$/, '')).filter(Boolean).sort();

const fails = [];
const log = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); if (!ok) fails.push(msg); };

const zone = (await cf(`/zones?name=${DOMAIN}`))[0];
if (!zone) { console.log(`FAIL  ${DOMAIN} is not a zone in this account`); process.exit(1); }
console.log(`zone ${zone.id}  status=${zone.status}  cutover: ${zone.original_name_servers?.join(', ')} -> ${zone.name_servers?.join(', ')}\n`);

const live = process.env.LIVE_NS ?? zone.original_name_servers?.[0] ?? '1.1.1.1';
const records = await cf(`/zones/${zone.id}/dns_records?per_page=100`);
const inZone = (type, name) => records.filter((r) => r.type === type && r.name === name)
  .map((r) => (type === 'MX' ? `${r.priority} ${r.content}` : r.content).replace(/\.$/, '')).sort();

// Mail records, record for record. The IONOS DKIM selectors are listed because
// scans miss them (IONOS refuses AXFR). s42582890 is this IONOS contract's own
// selector, found 27 Oct on buildingsforlife.com.
for (const [type, host] of [['MX', DOMAIN], ['CNAME', `autodiscover.${DOMAIN}`], ['CNAME', `_dmarc.${DOMAIN}`],
  ['CNAME', `s1-ionos._domainkey.${DOMAIN}`], ['CNAME', `s2-ionos._domainkey.${DOMAIN}`],
  ['CNAME', `s42582890._domainkey.${DOMAIN}`]]) {
  const want = dig(host, type, live);
  const got = inZone(type, host);
  if (!want.length && !got.length) continue;
  log(JSON.stringify(want) === JSON.stringify(got), `${type} ${host}: live [${want.join(' | ')}] vs zone [${got.join(' | ')}]`);
}

// The website is the production Worker: apex and www are its Custom Domains (their
// proxied AAAA 100:: records are Cloudflare's own), nothing else answers for
// either host, and www 301s to the apex.
const domains = await cf(`/accounts/${zone.account.id}/workers/domains?zone_id=${zone.id}`);
for (const host of [DOMAIN, `www.${DOMAIN}`]) {
  const d = domains.find((x) => x.hostname === host);
  log(d?.service === WORKER, `${host} is a Custom Domain of ${WORKER} (${d ? d.service : 'not attached'})`);
  const other = records.filter((r) => ['A', 'AAAA', 'CNAME'].includes(r.type) && r.name === host && !r.meta?.origin_worker_id);
  log(!other.length, `${host} has no address records besides the Custom Domain's (${other.map((r) => `${r.type} ${r.content}`).join(', ') || 'none'})`);
}
const redirect = await cf(`/zones/${zone.id}/rulesets/phases/http_request_dynamic_redirect/entrypoint`).catch(() => ({ rules: [] }));
const www = redirect.rules.find((r) => r.enabled && r.expression.includes(`"www.${DOMAIN}"`))?.action_parameters?.from_value;
log(www?.status_code === 301 && www.target_url?.expression?.includes(`"https://${DOMAIN}"`) && www.preserve_query_string,
  `www.${DOMAIN} 301s to https://${DOMAIN}, query kept (zone Redirect Rule ${www ? 'found' : 'missing'})`);

// SPF must keep the client's mail host AND authorise Cloudflare Email Sending.
const liveSpf = dig(DOMAIN, 'TXT', live).find((t) => t.includes('v=spf1')) ?? '';
const zoneSpf = inZone('TXT', DOMAIN).find((t) => t.includes('v=spf1')) ?? '';
const liveIncludes = [...liveSpf.matchAll(/include:([^\s"]+)/g)].map((m) => m[1]);
log(liveIncludes.every((i) => zoneSpf.includes(i)), `SPF keeps every live include (${liveIncludes.join(', ') || 'none'}) -> zone: ${zoneSpf || '(none)'}`);
log(zoneSpf.includes('_spf.mx.cloudflare.net'), 'SPF authorises Cloudflare Email Sending (_spf.mx.cloudflare.net)');

// The client's mailbox must not be taken over by Email Routing.
const routing = await cf(`/zones/${zone.id}/email/routing`).catch(() => ({}));
const cfMx = inZone('MX', DOMAIN).filter((m) => m.includes('mx.cloudflare.net'));
log(!cfMx.length, `apex MX is the client's mail host, not Cloudflare Email Routing (${cfMx.length} Cloudflare MX records)`);
log(routing?.enabled !== true, `Email Routing is off on this zone (enabled=${routing?.enabled}) — enabling it would break mail@${DOMAIN}`);

console.log(fails.length ? `\nDNS: FAIL (${fails.length})` : '\nDNS: PASS');
process.exit(fails.length ? 1 : 0);
