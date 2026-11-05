/**
 * Business facts, services, towns, reviews and nav. Everything here traces to
 * site-plan/nap.json + seed.json (plan = law) or inputs/reviews/reviews.json.
 */
import reviewsSource from '../../../inputs/reviews/reviews.json';
import work from './work-images.json';

export const business = {
  name: 'Buildings For Life Ltd',
  short: 'Buildings For Life',
  owner: 'Pete Bartlett',
  url: 'https://buildingsforlife.com',
  phone: '07853 945013',
  phoneHref: 'tel:+447853945013',
  email: 'mail@buildingsforlifeltd.com',
  baseTown: 'Hedge End',
  city: 'Southampton',
  region: 'Hampshire',
  postcodeArea: 'SO30',
  companyNumber: '16770499',
  geo: { lat: 50.91234, lng: -1.30076 },
  hours: 'Monday to Friday 8:00 to 17:00',
};

/** Affirmed USPs only (nap.json usps, operator-confirmed 23 Sep 2026). */
export const facts = {
  years: '40+',
  yearsLine: 'Over 40 years in the building trade, starting as a bricklayer',
  stone: '15 years on high-end and natural stone work',
  guarantee: '10-year warranty on new builds',
  family: 'Family-run company',
  bbc: 'Featured on BBC Building Dream Homes',
};

/**
 * OPERATOR SLOTS (walkthrough 25 Sep). Empty until the operator supplies them;
 * each component falls back to the current build while its slot is empty.
 *  - bbcVideoUrl: the BBC Building Dream Homes YouTube URL (or an on-page #anchor).
 *    Set it and every "As seen on BBC" badge becomes a link to it.
 *  - trustindexReviews: TrustIndex loader src for the LARGE reviews widget
 *    (https://cdn.trustindex.io/loader.js?<id>). Replaces the review cards.
 *  - trustindexStrip: SLIM white-text widget (TiSlim), in every hero under the
 *    CTA buttons and in the footer (revision pass 2).
 *  - trustindexSlimDark: SLIM dark-text widget for light sections. Not placed
 *    since pass 2 (operator: slim strips in the hero and footer only); kept
 *    for reference.
 *  - trustindexCorner: floating left-corner widget, every page (Base), hidden
 *    below 1024px (global.css), where the sticky call bar takes the bottom edge.
 *  The four TrustIndex widgets were supplied 28 Sep.
 *  - heroVideo: background video for the home hero. NOT built yet (A2); the
 *    hero keeps its photo until the operator decides.
 *  - gbpEmbedSrc: the iframe src from Pete's Business Profile (Google Maps >
 *    Share > Embed a map, the https://www.google.com/maps/embed?pb=... URL).
 *    Until set, the map embeds the listing by its business name + locality.
 */
export const slots = {
  bbcVideoUrl: '',
  trustindexReviews: 'https://cdn.trustindex.io/loader.js?ebd6155824da39453e862aab14c',
  trustindexStrip: 'https://cdn.trustindex.io/loader.js?7c36aed8213c396b301612d316d',
  trustindexSlimDark: 'https://cdn.trustindex.io/loader.js?f76b912820b139618806e76e1f6',
  trustindexCorner: 'https://cdn.trustindex.io/loader.js?1ce57018217f3951c1461d6be75',
  heroVideo: '',
  gbpEmbedSrc: '',
};
/** The Business Profile as Google lists it (walkthrough 25 Sep, E2). */
export const gbpQuery = 'Buildings For Life Limited, Hedge End, Southampton';

/**
 * IMAGE BASE (walkthrough 25 Sep, G1). '' = the Worker's own static assets
 * (public/images/work/, the current state: nothing is on R2 yet). Once the
 * photos are uploaded to R2 under site-images/<bfl-key>/work/<slug>.webp, set
 * this to the public R2 URL of that folder minus "/work"
 * (e.g. https://<r2-public-host>/site-images/<bfl-key>) and every photo
 * reference switches over in one build.
 */
const IMAGE_BASE = '';

type Img = { slug: string; src: string; alt: string; width: number; height: number };
const withBase = (i: Img): Img => (IMAGE_BASE ? { ...i, src: IMAGE_BASE + i.src.replace(/^\/images/, '') } : i);
const workAll = (work as Img[]).map(withBase);
const img = (slug: string): Img => {
  const i = workAll.find((w) => w.slug === slug);
  if (!i) throw new Error(`work image missing: ${slug}`);
  return i;
};
export const workImages = workAll;
export const image = img;

export interface Service {
  name: string; // exact plan title = card anchor text
  slug: string; // plan hub slug
  primary: string; // plan primary phrase
  short: string; // card blurb
  img: Img;
  img2: Img;
  icon: string; // icon key (Icon.astro)
}

/** Display order leads with the core trade; slugs/names exactly as seed.json hubs. */
export const services: Service[] = [
  { name: 'Builders', slug: 'builders', primary: 'builder', icon: 'house', img: img('new-build-brickwork'), img2: img('tudor-house-renovation'), short: 'New builds and full home builds from excavation to handover, run by one family firm with its own tradespeople on site every day.' },
  { name: 'House Extensions', slug: 'house-extensions', primary: 'house extension', icon: 'extension', img: img('extension-groundworks'), img2: img('rear-extension-glazing'), short: 'Single and two storey extensions, rear, side and wraparound, built to tie into the original house so the join is hard to find.' },
  { name: 'Brickwork', slug: 'brickwork', primary: 'brickwork', icon: 'bricks', img: img('brick-detail'), img2: img('brick-wall-pointing'), short: 'The trade Pete started in over 40 years ago: new walls, matching old brick, piers, arches, repointing and natural stone.' },
  { name: 'Loft Conversions', slug: 'loft-conversions', primary: 'loft conversion', icon: 'loft', img: img('loft-insulation'), img2: img('timber-clad-renovation'), short: 'Dormer, hip-to-gable and roof-light loft conversions that turn an unused roof space into a proper room with stairs to match.' },
  { name: 'Structural & Groundworks', slug: 'structural-and-groundworks', primary: 'groundwork', icon: 'foundation', img: img('groundworks-drainage'), img2: img('structural-opening'), short: 'Foundations, drainage, slabs, steel beams and opening up walls: the work underneath every extension and new build.' },
  { name: 'Renovation & Refurbishment', slug: 'renovation-and-refurbishment', primary: 'home renovation', icon: 'renovate', img: img('timber-clad-renovation'), img2: img('tudor-house-renovation'), short: 'Whole-house renovations, reconfigured layouts, kitchens and joinery, from period cottages to post-war semis.' },
  { name: 'Patios & Garden Walls', slug: 'patios-and-garden-walls', primary: 'garden wall', icon: 'wall', img: img('garden-wall-piers'), img2: img('patio-slabs'), short: 'Porcelain and stone patios on a properly dug base, and brick or stone garden walls with piers and copings that stay straight.' },
  { name: 'Landscaping', slug: 'landscaping', primary: 'landscaping', icon: 'landscape', img: img('paving-preparation'), img2: img('porcelain-patio'), short: 'Hard landscaping done in-house: site preparation, levels, drainage, retaining walls, paths and paved areas.' },
  { name: 'Carpentry', slug: 'carpentry', primary: 'carpentry', icon: 'saw', img: img('oak-and-brick-well'), img2: img('timber-clad-renovation'), short: 'Structural timber, roofs, stud walls, fitted furniture, kitchens, doors and joinery, fitted by the same team doing the build.' },
  { name: 'Basement Conversions', slug: 'basement-conversions', primary: 'basement conversion', icon: 'basement', img: img('structural-opening'), img2: img('groundworks-drainage'), short: 'Turning a cellar or dug-out space under the house into a dry, usable room, with the structure and waterproofing done properly.' },
];
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export interface Town { name: string; slug: string; distance: number; population: number; built: boolean }

/**
 * 36 red-line towns in plan publish order (seed.json towns[], operator approved 24 Sep).
 * AREAS LAW (operator walkthrough 25 Sep, E1): ONE "Areas We Serve" page listing the
 * towns, NO individual town pages. BUILT stays empty, so areas/[town].astro builds
 * nothing and no town is linked anywhere. (The six town pages from 24 Sep are retired;
 * src/pages/areas/[town].astro and src/data/towns/ can be deleted outright.)
 */
const BUILT = new Set<string>([]);
const rawTowns: [string, number, number][] = [
  ['Hedge End', 0, 17978], ['Bishops Waltham', 4.8, 6275], ['Botley', 1.4, 3000], ['Upham', 5.6, 800],
  ['West End', 1.7, 4227], ['Warsash', 7.5, 6500], ['Hamble-le-Rice', 6.5, 3939], ['Chandlers Ford', 6.5, 25000],
  ['Romsey', 10.2, 17161], ['Winchester', 10.6, 46074], ['Chilworth', 6.3, 1204], ['Southampton', 4.5, 269781],
  ['Fair Oak', 3.5, 10212], ['Bursledon', 1.9, 1500], ['Curdridge', 2.5, 951], ['Netley', 3.5, 6338],
  ['Bishopstoke', 3.9, 17667], ['Eastleigh', 4.3, 54225], ['Swanmore', 5.5, 2683], ['Hythe', 5.7, 20526],
  ['Shedfield', 6.5, 1500], ['Marchwood', 6.9, 6141], ['Swanwick', 7, 7000], ['Whiteley', 7, 6500],
  ['Rownhams', 7.5, 4000], ['North Baddesley', 7.7, 6823], ['Sarisbury', 7.8, 5000], ['Compton', 7.9, 1500],
  ['Holbury', 8, 3500], ['Totton', 8.5, 34169], ['Locks Heath', 8.5, 8000], ['Dibden', 8.5, 5500],
  ['Titchfield', 9.5, 7280], ['New Alresford', 12.5, 5431], ['Cheriton', 11.5, 1900], ['Kings Worthy', 12.2, 4388],
];
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const towns: Town[] = rawTowns.map(([name, distance, population]) => ({ name, slug: slugify(name), distance, population, built: BUILT.has(name) }));
export const builtTowns = towns.filter((t) => t.built);

/** REAL Google reviews (DataForSEO pull -> inputs/reviews/reviews.json). Newest first. */
export interface Review { name: string; text: string; rating: number; when: string; url: string }
export const reviews: Review[] = (reviewsSource.items as any[])
  .filter((r) => r.review_text && r.rating?.value)
  .map((r) => ({ name: r.profile_name as string, text: (r.review_text as string).replace(/\s*\n\s*/g, ' ').replace(/\.(?=[A-Z])/g, '. ').trim(), rating: r.rating.value as number, when: r.timestamp as string, url: r.review_url as string }))
  .sort((a, b) => b.when.localeCompare(a.when));
export const reviewStats = {
  count: reviews.length,
  average: (reviews.reduce((n, r) => n + r.rating, 0) / Math.max(1, reviews.length)).toFixed(1),
};

/** Final nav (pass 2): FAQ left the nav (page stays, linked from the footer and home). */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Areas', href: '/areas/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Resources', href: '/resources/' },
];

export const seo = {
  title: 'Builders in Hedge End & Southampton | Buildings For Life Ltd',
  description: 'Family-run builders in Hedge End with 40+ years in the trade: extensions, new builds, brickwork, lofts and natural stone, with a 10-year warranty on new builds.',
};
