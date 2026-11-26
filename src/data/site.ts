/**
 * Business facts, services, towns, images and nav for TrueLine Finishes.
 * Everything here traces to the approved plan (site-plan/SITE-PLAN.md, fingerprint
 * 7495853204d1a803) and its machine truth: site-plan/seed.json + site-plan/nap.json.
 * The address is NEVER rendered and never goes in schema (nap.json addressDisplay: "no").
 */
import seed from '../../site-plan/seed.json';
import { hours as napHours } from '../../site-plan/nap.json'; // the hours only: nap.json also holds the never-shown address
import imagesData from './images.json';
import stockData from './stock-images.json';
import fencingData from './fencing-images.json';

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
export const ctaLine = 'Get a free quotation: call 07949 484274 or use the quote form.';

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
 * Brandon's two YouTube videos (plan, Video), exactly the two links he sent. EMBEDDED ON THE HOME PAGE
 * ONLY (operator, 19 Nov 2026: "include the two Brandon YouTube links as normal responsive video
 * embeds ... the full video for the homepage, and the short should sit appropriately with it"),
 * through Videos.astro on youtube-nocookie.com. Supersedes R2-13 for these two. No other video.
 */
export const videos = {
  kitchen: { id: 'v3g1Kdja0gk', url: 'https://youtube.com/shorts/v3g1Kdja0gk', caption: 'Full kitchen renovation', portrait: true },
  house: { id: 'mNwdUtQedkc', url: 'https://youtu.be/mNwdUtQedkc', caption: 'Full house painting and decorating', portrait: false },
};

export type Img = { key: string; cat: string; src: string; sm: string; width: number; height: number; alt: string; messageId: string; r2: string; sha256: string };
export const images = imagesData as Img[];
/**
 * STOCK photographs (Brandon's request, 25 Nov 2026: "just stock images for now" for fencing, until he
 * sends his own). NONE IS IN USE since 26 Nov 2026: his own fencing photographs replaced them (below),
 * so stock-images.json is empty; the plumbing stays for any future credited stock. Free-licence Wikimedia Commons files with download receipts; see
 * scripts/stock-images.mjs. They are NOT in `images` above, so the gallery, the home picks and the
 * article pools never show one as a TrueLine job; `image()` resolves them by key for the Fencing tile
 * and the fencing page only, and every one is credited on /image-credits/.
 */
export type StockImg = { key: string; cat: 'stock'; stock: true; src: string; sm: string; width: number; height: number; alt: string; title: string; author: string; licence: string; licenceUrl: string; sourcePage: string; sourceFile: string; via: string; sha256: string; modified: string; licenceTemplate?: string | null };
export const stockImages = stockData as StockImg[];
/**
 * FENCING photographs SUPPLIED BY THE CLIENT (Brandon's WhatsApp album of 25 Nov 2026; operator
 * correction 26 Nov 2026, DECISIONS C1-C6). They replaced the credited stock band and the stock
 * Fencing tile photograph. Kept OUTSIDE `images` (scripts/fencing-images.mjs) so the gallery, the home
 * picks and the article pools never show one; `image()` resolves them for the Fencing tile and the
 * fencing page only, where they are described as photographs supplied by TrueLine Finishes.
 */
export const fencingImages = fencingData as (Img & { supplied: string; original: string; modified: string })[];
const byKey = new Map<string, Img>([...images.map((i) => [i.key, i] as const), ...stockImages.map((i) => [i.key, i as unknown as Img] as const), ...fencingImages.map((i) => [i.key, i] as const)]);
export const isStock = (key: string) => stockImages.some((i) => i.key === key);
export const image = (key: string): Img => {
  const i = byKey.get(key);
  if (!i) throw new Error(`unknown image: ${key}`);
  return i;
};

/**
 * THE SIX HUBS, in the plan's order (services-override pin). Names are used word for word.
 * FENCING is hub 6, added by the plan on 25 Nov 2026 (site-plan commit 542315e, D-2026-11-25-01):
 * Brandon asked for it twice on WhatsApp and the operator confirmed his scope ("he does all the
 * main types of UK fencing"). It is NOT a sixth top-level nav entry: the owner's 25 Nov nav of five
 * stands, and Fencing is reached from the Services dropdown, the services tiles, the services hub,
 * the footer and the related-services cards.
 */
export const services = [
  { slug: 'painting-and-decorating', name: 'Painting and Decorating', icon: 'roller', img: 'victorian-hallway-0065', short: 'The whole trade, inside and out, for homes and businesses: from one room to a full property redecoration.' },
  { slug: 'interior-painting', name: 'Interior Painting', icon: 'brush', img: 'green-bedroom-0136', short: 'Walls, ceilings, every room, stairs and landings, and all the woodwork, with full preparation first.' },
  { slug: 'exterior-painting', name: 'Exterior Painting', icon: 'house', img: 'semi-detached-after-0125', short: 'Masonry paint on render, brick and stone, plus windows, doors, exterior woodwork and oil varnishing.' },
  { slug: 'wallpapering', name: 'Wallpapering', icon: 'roll', img: 'leaf-pattern-feature-wall-0026', short: 'Wallpaper hung on a feature wall or through a whole room, on walls prepared properly first.' },
  { slug: 'commercial-painting-and-decorating', name: 'Commercial Painting and Decorating', icon: 'office', img: 'office-navy-feature-wall-0178', short: 'The same careful work for offices, restaurants, schools, hotels, spas, leisure centres and local businesses.' },
  { slug: 'fencing', name: 'Fencing', icon: 'wall', img: 'slotted-panels-concrete-posts', short: 'Garden fencing put up and repaired: panel, close board, composite, and trellis fencing and toppers.' },
].map((s) => ({ ...s, image: image(s.img) }));
export type Service = (typeof services)[number];

/** The publish queue: seed.json towns[], in order (116 towns, two batches). */
export const towns = (seed.towns as { town: string; publishOrder: number; distanceMiles: number }[]).map((t) => ({ name: t.town, order: t.publishOrder, miles: t.distanceMiles }));
/**
 * THE AREA, as the plan now frames it (D-2026-11-25-02, 25 Nov 2026): the home page and every hub
 * page lead on the broad region and still name real towns within it as supporting detail. Brandon's
 * own words through the operator: "could we change baildon and Shipley to Painting and decorating
 * in west/North Yorkshire". Individual SEO articles are UNCHANGED: each still names one town only.
 */
export const region = 'West and North Yorkshire';
/** Real pinned towns named in support of the region (all from the plan's 116, plan Layout). */
export const mainPlaces = ['Baildon', 'Guiseley', 'Menston', 'Ilkley', 'Shipley', 'Otley', 'Horsforth', 'Bingley', 'Leeds', 'Bradford', 'Harrogate'];

/**
 * THE TOP NAV: FIVE ENTRIES, EXACTLY, IN THIS ORDER (the site owner, 25 Nov 2026: "the header should
 * only contain Home, Services, About, Resources, Contact - Gallery and Reviews don't need to be in
 * there"). Both pages stay and stay reachable: the footer's Company column links them on every page,
 * every page but /reviews/ carries the Read the Reviews button, the home page carries See the
 * Gallery, and both are in /sitemap/ and the XML sitemap. One list, so the desktop bar and the
 * mobile menu can never drift apart.
 */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/', drop: true },
  { label: 'About', href: '/about/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Contact', href: '/contact/' },
];

export const seo = {
  title: 'Painting and Decorating in West and North Yorkshire | TrueLine Finishes',
  description: 'Painting and decorating for homes and businesses across West and North Yorkshire, from Baildon, Shipley and Ilkley to Leeds, Bradford and Harrogate. Free quotations.',
};
