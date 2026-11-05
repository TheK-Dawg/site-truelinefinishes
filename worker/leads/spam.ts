/**
 * Spam score, bundled in the site (ported from the Olympus scorer of 1 Oct 2026, content and
 * contact signals only). The Olympus "saved spam signature" lookup is not here: it needs the
 * Olympus database, and the submit path must not.
 * >= 60 spam (stored, never emailed); 40-59 borderline (LEAD_HOLD_POLICY); < 40 clean.
 */
export const SPAM_THRESHOLD = 60;
export const HOLD_THRESHOLD = 40;

const SPAM_URL = /\bhttps?:\/\/\S+|\bwww\.\S+|\b[a-z0-9-]+\.(?:ph|ru|xyz|top|click|link|info|biz|io|me|ly|gl|cc)\/\S*/giu;
const SPAM_HOSTS = /telegra\.ph|t\.me\/|bit\.ly|tinyurl|goo\.gl|cutt\.ly|rb\.gy|is\.gd/iu;
const SPAM_WORDS = /\b(telegra(?:ph|\.ph|m)|crypto|bitcoin|btc|forex|casino|viagra|cialis|rolls[-\s]?royce|lamborghini|lottery|prize|winner|giveaway|investment opportunity|seo services?|backlinks?|guest post|page one of google|whatsapp me|earn \$?\d)/iu;
const SPAM_MONEY = /(?:[$€]\s?\d[\d,.]*\s?(?:k|m)?\b|\b\d[\d,.]*\s?(?:usd|eur|dollars?|euros?|btc)\b)/iu;
const GBP_MONEY = /£\s?\d[\d,.]*|\b\d[\d,.]*\s?(?:gbp|pounds?)\b/iu;

export interface SpamResult { score: number; reasons: string[]; verdict: 'clean' | 'hold' | 'spam' }

export function scoreSpam(input: { name?: string; phone?: string; postcode?: string; message?: string }): SpamResult {
  const reasons: string[] = [];
  let score = 0;
  const add = (points: number, reason: string) => { score += points; reasons.push(reason); };
  const text = String(input.message || '');
  const name = String(input.name || '');
  const urls = [...text.matchAll(SPAM_URL)].map((m) => m[0].toLowerCase().replace(/^https?:\/\//, '').replace(/[).,!?]+$/, ''));
  if (/[Ѐ-ӿ]/u.test(`${name} ${text}`)) add(60, 'Cyrillic text');
  if (urls.length) add(40, `link in message (${urls[0].slice(0, 60)})`);
  if (SPAM_HOSTS.test(text)) add(30, 'link-shortener / Telegraph host');
  const word = text.match(SPAM_WORDS);
  if (word) add(25, `spam wording ("${word[0]}")`);
  const money = text.match(SPAM_MONEY);
  if (money) add(30, `money ask (${money[0].trim()})`);
  else if (urls.length && GBP_MONEY.test(text)) add(10, 'money amount alongside a link');
  const digits = String(input.phone || '').replace(/\D/g, '');
  if (input.phone && !/^(?:0\d{9,10}|44\d{9,10})$/.test(digits)) add(15, 'phone is not a UK number');
  const pc = String(input.postcode || '').trim();
  if (pc && !/^[a-z]{1,2}\d[a-z\d]?(?:\s*\d[a-z]{2})?$/i.test(pc)) add(15, 'postcode is not a UK postcode');
  if (/\b[A-Z][a-z]+[A-Z][a-z]+\b/.test(name) && !/\b(?:Mc|Mac|O')/.test(name)) add(10, 'run-together name');
  if (text && text === text.toUpperCase() && /[A-Z]{12}/.test(text)) add(10, 'all-caps message');
  score = Math.min(100, score);
  return { score, reasons, verdict: score >= SPAM_THRESHOLD ? 'spam' : score >= HOLD_THRESHOLD ? 'hold' : 'clean' };
}
