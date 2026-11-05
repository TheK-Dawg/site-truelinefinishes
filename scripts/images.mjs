// IMAGES: Brandon's own job photos, from the R2 copies only (site-images/customers/trueline-finishes/<category>/),
// downloaded and MD5-checked against R2 into a local folder first (the R2 manifest records every object's
// message id and SHA-256). Writes public/images/<category>/<name>.webp (1600 px long edge) plus a 720 px
// card size, and src/data/images.json (provenance kept: R2 key, Whapi message id, SHA-256).
// Usage: node scripts/images.mjs /root/work/tl-media
// Never generated imagery (D-146). Excluded at categorisation: the other decorator's website screenshot,
// the logos, photos showing people, and the magazine cover / printed advert.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2] || '/root/work/tl-media';
const manifest = JSON.parse(fs.readFileSync(path.join(SRC, 'r2-categories.json'), 'utf8'));
const OUT = new URL('../public/images/', import.meta.url).pathname;
const DATA = new URL('../src/data/images.json', import.meta.url).pathname;

// What each descriptive R2 name shows (alt text). Describes the photo only: no customer, place or project story.
const ALT = {
  'bathroom-after': 'Bathroom after decorating, walls painted sage green with white woodwork',
  'bathroom-before': 'Bathroom before decorating, bare plaster walls',
  'bedroom-after': 'Bedroom after decorating, smooth painted walls and ceiling',
  'bedroom-before': 'Bedroom before decorating, walls filled and patched ready for paint',
  'gable-wall-after': 'Gable wall after painting, clean white masonry paint',
  'gable-wall-before': 'Gable wall before painting, stained and weathered render',
  'semi-detached-after': 'Semi-detached house after painting, brickwork in dark grey masonry paint',
  'semi-detached-before': 'Semi-detached house before painting, tired painted brickwork',
  'bathroom-finished': 'Finished bathroom with freshly painted walls and ceiling',
  'bathroom-prepared': 'Bathroom walls prepared and filled before painting',
  'bay-window-living-room': 'Living room with a bay window after redecorating',
  'bedroom-arched-alcove': 'Bedroom with a painted arched alcove',
  'bedroom-filled': 'Bedroom walls filled and sanded before painting',
  'bedroom-fresh-walls': 'Bedroom with freshly painted walls',
  'bedroom-green-dado': 'Bedroom painted green below a dado rail',
  'bedroom-panelling-prepared': 'Bedroom wall panelling prepared for painting',
  'black-kitchen-island': 'Kitchen with a black painted island',
  'cloakroom-finished': 'Finished cloakroom after decorating',
  'cloakroom-green-panelling': 'Cloakroom with green painted wall panelling',
  'cloakroom-prepared': 'Cloakroom prepared for decorating',
  'cream-room': 'Room decorated in cream with white woodwork',
  'green-bathroom': 'Bathroom painted green',
  'green-bedroom': 'Bedroom decorated in deep green',
  'grey-bedroom': 'Bedroom decorated in grey',
  'grey-living-room': 'Living room decorated in grey',
  'hallway-green-panelling': 'Hallway with green painted panelling',
  'hallway-white-staircase': 'Hallway with a white painted staircase',
  'hallway-wooden-staircase': 'Hallway with a wooden staircase and painted walls',
  'kitchen-diner-protected': 'Kitchen-diner being decorated, floor and units protected',
  'kitchen-hall-tiled-floor': 'Kitchen and hallway with a tiled floor after decorating',
  'landing-white-spindles': 'Landing with white painted spindles',
  'landing-wood-spindles': 'Landing with wooden spindles and painted walls',
  'living-room-prepared': 'Living room prepared for painting',
  'living-room-sheeted': 'Living room sheeted and protected during decorating',
  'lounge-alcoves-prepared': 'Lounge alcoves prepared for painting',
  'lounge-dark-arched-alcove': 'Lounge with a dark painted arched alcove',
  'lounge-navy-feature-wall': 'Lounge with a navy feature wall',
  'media-wall-finished': 'Painted media wall, finished',
  'media-wall-prepared': 'Media wall prepared for painting',
  'navy-kitchen': 'Kitchen with navy painted walls',
  'open-plan-kitchen-diner': 'Open-plan kitchen-diner after decorating',
  'painted-kitchen': 'Kitchen after painting',
  'pantry-cupboard': 'Painted pantry cupboard',
  'room-before-patched': 'Room before decorating, walls patched and filled',
  'room-dust-sheets': 'Room under dust sheets during decorating',
  'sage-kitchen': 'Kitchen painted sage green',
  'skirting-detail': 'Close-up of freshly painted skirting board',
  'stairs-filled': 'Staircase filled and sanded before painting',
  'stairs-prepared': 'Staircase prepared for painting',
  'victorian-hallway': 'Hallway with Victorian floor tiles and a black dado line',
  'wardrobe-feature': 'Painted fitted wardrobe as a bedroom feature',
  'white-kitchen': 'White kitchen after decorating',
  'white-staircase-spindles': 'White staircase with painted spindles',
  'detached-house-garage': 'Detached house and garage after exterior painting',
  'gable-ladder': 'Ladder against a gable wall during exterior painting',
  'mock-tudor-house': 'Mock-Tudor house exterior after painting',
  'mullion-windows': 'Stone mullion windows with painted frames',
  'navy-front-door-stone': 'Navy painted front door in a stone house',
  'painted-brick-side-before': 'Side wall of painted brick before repainting',
  'painted-railings': 'Freshly painted railings',
  'painted-step-door': 'Painted front step and door',
  'porch-door': 'Painted porch door',
  'rendered-house-scaffold': 'Rendered house under scaffold for exterior painting',
  'sage-front-door': 'Sage green painted front door',
  'stone-farmhouse': 'Stone farmhouse with painted windows and doors',
  'stone-terrace-ladder': 'Stone terrace during exterior painting',
  'stone-terrace-sage-door': 'Stone terrace with a sage green front door',
  'stone-terrace-sash-windows': 'Stone terrace with painted sash windows',
  'white-render-wall': 'Render wall painted white',
  'white-sash-window-stone': 'White painted sash window in a stone wall',
  'white-side-wall': 'Side wall painted white',
  'window-prepared': 'Window frame prepared for painting',
  'leaf-pattern-feature-wall': 'Lounge feature wall hung with leaf-pattern wallpaper',
  'exhibition-stand-burgundy': 'Exhibition stand walls painted burgundy',
  'office-navy-feature-wall': 'Office with a navy feature wall being painted',
  'office-prepared': 'Office prepared for decorating',
};

const out = [];
for (const m of manifest) {
  if (m.cat === 'logo' || !m.messageId) continue;
  const base = m.file.replace(/\.jpg$/, '');
  const stem = base.replace(/-\d+$/, '');
  const alt = ALT[stem];
  if (!alt) throw new Error(`no alt text for ${m.file}`);
  const src = path.join(SRC, 'r2', m.cat, m.file);
  const dir = path.join(OUT, m.cat);
  fs.mkdirSync(dir, { recursive: true });
  const big = path.join(dir, `${base}.webp`);
  const sm = path.join(dir, `${base}-sm.webp`);
  const img = sharp(src).rotate();
  const meta = await img.metadata();
  if (!fs.existsSync(big)) await sharp(src).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(big);
  if (!fs.existsSync(sm)) await sharp(src).rotate().resize({ width: 720, height: 720, fit: 'inside', withoutEnlargement: true }).webp({ quality: 76 }).toFile(sm);
  const bm = await sharp(big).metadata();
  out.push({ key: base, cat: m.cat, src: `/images/${m.cat}/${base}.webp`, sm: `/images/${m.cat}/${base}-sm.webp`, width: bm.width, height: bm.height, alt, messageId: m.messageId, r2: m.r2, sha256: m.sha256 });
  void meta;
}
out.sort((a, b) => a.key.localeCompare(b.key));
fs.writeFileSync(DATA, `${JSON.stringify(out, null, 1)}\n`);
console.log(`images: ${out.length} written`, Object.entries(out.reduce((a, i) => ((a[i.cat] = (a[i.cat] || 0) + 1), a), {})));
