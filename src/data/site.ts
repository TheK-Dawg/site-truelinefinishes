/**
 * Business facts, services, towns, images and nav for TrueLine Finishes.
 * Everything here traces to the approved plan (site-plan/SITE-PLAN.md, fingerprint
 * 7495853204d1a803) and its machine truth: site-plan/seed.json + site-plan/nap.json.
 * The address is NEVER rendered and never goes in schema (nap.json addressDisplay: "no").
 */
import seed from '../../site-plan/seed.json';
import { hours as napHours } from '../../site-plan/nap.json'; // the hours only: nap.json also holds the never-shown address
import imagesData from './images.json';

export const business = {
  name: 'TrueLine Finishes',
  owner: 'Brandon Dawson',
  ownerFirst: 'Brandon',
  url: 'https://www.truelinefinishes.com',
  phone: '07949 484274',
  phoneHref: 'tel:+447949484274',
  phoneE164: '+447949484274',
  whatsappHref: 'https://wa.me/447949484274',
  email: 'Brandon@truelinefinishes.com',
  youtube: 'https://www.youtube.com/@TruelineFinishes',
  gbp: {
    cid: '8023434379390696838',
    mapsUrl: 'https://maps.app.goo.gl/47CXTvHKMybPQHkR9',
    cidUrl: 'https://maps.google.com/?cid=8023434379390696838',
  },
};

/**
 * Opening hours, exactly as the Google listing (nap.json hours), ONE ENTRY PER DAY: shown day by day,
 * Monday to Sunday, never as "Monday to Friday" (operator round 3, 6 Nov 2026). Rendered by
 * Hours.astro. Opening hours, not a promise of when work is done.
 */
export const hours = Object.entries(napHours as Record<string, string>).map(([day, t]) => ({ day, time: t.replace(/^(\w+)-(\w+)$/, '$1 to $2') }));
if (hours.length !== 7 || hours[0].day !== 'Monday' || hours[6].day !== 'Sunday') throw new Error('nap.json hours must list Monday to Sunday, one entry per day');
export const hoursSchema = [
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '19:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '08:00', closes: '18:00' },
];

/** The CTA line, the plan's own words (Contact, calls to action). */
export const ctaLine = 'Get a free quotation: call Brandon on 07949 484274 or use the quote form.';

/** Usable claims only (nap.json usps, all affirmed). */
export const usps = {
  years: "Over eight years' experience",
  brandon: 'Brandon Dawson, the owner, carries out the work and oversees every job, and a call is a direct line to Brandon',
  insured: 'Fully insured, friendly and reliable',
  free: 'Free quotations',
  care: 'We take pride in attention to detail, lasting finishes and treating your property with care',
  scope: 'Painting and decorating for homes and businesses, from individual rooms to full property redecorations',
  prep: 'Careful surface preparation on every job: sanding, filling and caulking come with everything',
};
export const charityLine = "Proud to support A Child's Wish, a children's charity.";

/**
 * TRUSTINDEX WIDGETS (operator, 6 Nov 2026: brief TRUELINE-TRUSTINDEX-FOUR-WIDGETS). The four
 * TrueLine loaders Vince supplied, each keyed on Brandon's Google listing (CID 8023434379390696838).
 * One role, one id: never swap them, never borrow another site's id. The widgets show Google's own
 * live rating, count and reviews; the site never writes, counts or rates anything itself.
 *  - corner:     floating badge, bottom-left, on every page, desktop only (hidden below 1024px).
 *  - main:       the reviews SECTION directly under the hero on every page except /reviews/.
 *  - reviewPage: the grid widget, in /reviews/'s review section instead of main.
 *  - slimline:   in every hero and again in the quote-form section (white text on dark grounds).
 * Embed shape as supplied: <script defer async src="URL"></script>, the loader replaces its own
 * script tag with the widget, so the same loader can sit in two places on one page.
 */
export const trustindex = {
  corner: { id: '750bdd38520519524a16f32074e', src: 'https://cdn.trustindex.io/loader.js?750bdd38520519524a16f32074e' },
  main: { id: '980be2f8585419540236d6075d0', src: 'https://cdn.trustindex.io/loader.js?980be2f8585419540236d6075d0' },
  reviewPage: { id: '77dcbf385600195a22468d47c59', src: 'https://cdn.trustindex.io/loader.js?77dcbf385600195a22468d47c59' },
  slimline: { id: 'c4b35ec858641953835667d83d1', src: 'https://cdn.trustindex.io/loader.js?c4b35ec858641953835667d83d1' },
} as const;
export type TrustindexRole = keyof typeof trustindex;

/**
 * Brandon's two YouTube videos (plan, Video). NOT EMBEDDED ANYWHERE (operator round 2, 5 Nov 2026,
 * fix 13: every hand-placed YouTube embed came off; the operator will supply auto-updating
 * widgets). Kept, with their captions, for that later use. The channel stays in schema sameAs.
 */
export const videos = {
  kitchen: { id: 'v3g1Kdja0gk', url: 'https://youtube.com/shorts/v3g1Kdja0gk', caption: 'Full kitchen renovation', portrait: true },
  house: { id: 'mNwdUtQedkc', url: 'https://youtu.be/mNwdUtQedkc', caption: 'Full house painting and decorating', portrait: false },
};

export type Img = { key: string; cat: string; src: string; sm: string; width: number; height: number; alt: string; messageId: string; r2: string; sha256: string };
export const images = imagesData as Img[];
const byKey = new Map(images.map((i) => [i.key, i]));
export const image = (key: string): Img => {
  const i = byKey.get(key);
  if (!i) throw new Error(`unknown image: ${key}`);
  return i;
};

/** The five hubs, in the plan's order (services-override pin). Names are used word for word. */
export const services = [
  { slug: 'painting-and-decorating', name: 'Painting and Decorating', icon: 'roller', img: 'victorian-hallway-0065', short: 'The whole trade, inside and out, for homes and businesses: from one room to a full property redecoration.' },
  { slug: 'interior-painting', name: 'Interior Painting', icon: 'brush', img: 'green-bedroom-0136', short: 'Walls, ceilings, every room, stairs and landings, and all the woodwork, with full preparation first.' },
  { slug: 'exterior-painting', name: 'Exterior Painting', icon: 'house', img: 'semi-detached-after-0125', short: 'Masonry paint on render, brick and stone, plus windows, doors, exterior woodwork and oil varnishing.' },
  { slug: 'wallpapering', name: 'Wallpapering', icon: 'roll', img: 'leaf-pattern-feature-wall-0026', short: 'Wallpaper hung on a feature wall or through a whole room, on walls prepared properly first.' },
  { slug: 'commercial-painting-and-decorating', name: 'Commercial Painting and Decorating', icon: 'office', img: 'office-navy-feature-wall-0178', short: 'The same careful work for offices, restaurants, schools, hotels, spas, leisure centres and local businesses.' },
].map((s) => ({ ...s, image: image(s.img) }));
export type Service = (typeof services)[number];

/** The publish queue: seed.json towns[], in order (116 towns, two batches). */
export const towns = (seed.towns as { town: string; publishOrder: number; distanceMiles: number }[]).map((t) => ({ name: t.town, order: t.publishOrder, miles: t.distanceMiles }));
/** Brandon's close-to-home list, for the one coverage line (plan, Layout). */
export const mainPlaces = ['Baildon', 'Guiseley', 'Menston', 'Ilkley', 'Shipley', 'Otley', 'Horsforth', 'Bingley'];

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/', drop: true },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'About', href: '/about/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Contact', href: '/contact/' },
];

export const seo = {
  title: 'Painting and Decorating in Baildon, Shipley and Ilkley | TrueLine Finishes',
  description: 'Painting and decorating for homes and businesses across Baildon, Guiseley, Ilkley, Otley and Shipley. Over eight years’ experience, fully insured, free quotations.',
};
