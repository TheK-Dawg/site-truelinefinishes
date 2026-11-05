/**
 * The lead email, worded exactly as the Olympus route copy it replaces (subject
 * "New lead inquiry · <name> · <business>", greeting, labelled fields, reply line, sign-off,
 * then "Where this lead came from" with page, referrer, IP, user agent and UTM). Composed once
 * when the lead is stored, so every retry sends the identical message.
 */
import type { LeadConfig } from './config';

export type Fields = Record<string, string>;
export type Attribution = Record<string, string>;

const titleCase = (key: string) => key.replaceAll('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const oneLine = (v: string) => String(v || '').replace(/[\r\n]+/g, ' ').trim();

export function composeLeadEmail(cfg: LeadConfig, fields: Fields, attribution: Attribution) {
  const who = oneLine(fields.name || fields.full_name || '') || 'New enquiry';
  const subject = `New lead inquiry · ${who} · ${cfg.business || cfg.host}`;
  const lines = Object.entries(fields).filter(([, v]) => v).map(([k, v]) => `${titleCase(k)}: ${v}`);
  const replyLine = fields.email ? '\n\nReply to this email to respond to the customer directly.' : '';
  const trail = Object.entries(attribution).filter(([, v]) => v).map(([k, v]) => `${k}: ${oneLine(v)}`).join(' · ');
  const text = `${cfg.greeting},\n\nA new enquiry has come in through your website (${cfg.host}).\n\n${lines.join('\n')}${replyLine}\n\n— ${cfg.business}`
    + (trail ? `\n\nWhere this lead came from:\nCame from: form (cf_form). ${trail}` : '');
  return { subject, text };
}
