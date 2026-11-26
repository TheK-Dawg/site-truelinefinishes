// FENCING PHOTOGRAPHS SUPPLIED BY THE CLIENT (Brandon's WhatsApp album, 25 Nov 2026 20:00:38-40 UTC;
// operator correction 26 Nov 2026, DECISIONS C1-C6: "he provided his own images today for fencing ...
// the other images need to be replaced with these new ones"). These SEVEN replace the credited
// Wikimedia stock band and the stock Fencing tile photograph. The eighth image in that album
// (OlR3DQluRIGmXQ-hcCf1wAAAOw) is a screenshot of the old Fencing tile: a reference only, never
// published.
// They are kept in src/data/fencing-images.json, OUTSIDE images.json, so the gallery, the home picks and
// the article pools never pick one up; the site describes them as photographs supplied by TrueLine
// Finishes, never as a claim that each pictured fence is a TrueLine job.
// Usage: node scripts/fencing-images.mjs <originals dir>  (holds trueline-<messageId>.jpeg as downloaded)
// Each original's SHA-256 is checked before anything is written. Output: public/images/fencing/<key>.webp
// (1600 px long edge, never upscaled) + <key>-sm.webp (720 px). The originals are also kept in R2 at
// site-images/customers/trueline-finishes/fencing/<key>.jpeg (the `r2` field).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const SRC = process.argv[2];
if (!SRC) throw new Error('usage: node scripts/fencing-images.mjs <originals dir>');
const OUT = new URL('../public/images/fencing/', import.meta.url).pathname;
const DATA = new URL('../src/data/fencing-images.json', import.meta.url).pathname;

// [messageId, key, crop (left, top, width, height) or null, alt]
// Crops: the slotted-panel photograph is a screenshot with white side margins; the curved trellis
// photograph is framed to the fence (decking is not an offered service, so it is cropped away).
const PICK = [
  ['OuQPModJ9F9ExQ-hZyf1wAAAOw', 'slotted-panels-concrete-posts', { left: 14, top: 0, width: 1178, height: 990 }, 'Timber fence panels slotted between concrete posts, sitting on concrete kickboards along a concrete path'],
  ['Oh2864kD7woTBQ-hVmf1wAAAOw', 'timber-panels-concrete-posts-garden', null, 'Timber fence panels between concrete posts on concrete gravel boards along a garden lawn'],
  ['OrzcmOI56AchAg-hW6f1wAAAOw', 'lattice-top-panels-beside-house', null, 'Horizontal slatted timber fence panels with lattice trellis tops between concrete posts beside a house'],
  ['OqlYw9wt6E8gnA-hVmf1wAAAOw', 'lattice-top-fence-planted-border', null, 'Timber board fence with a lattice trellis top behind a newly planted border'],
  ['Otw_wN7Ee.GoUg-hXWf1wAAAOw', 'composite-fence-panels', null, 'Dark grey composite fence panels between white concrete posts'],
  ['OvdRkMNv_V7zeQ-hROf1wAAAOw', 'timber-panels-concrete-kickboards', null, 'Timber fence panels on concrete posts and concrete kickboards along the back of a garden'],
  ['Ogywyda8.voxJw-hRWf1wAAAOw', 'curved-trellis-fence-panels', { left: 30, top: 70, width: 530, height: 345 }, 'Curved-top diagonal trellis fence panels between square timber posts, with a field beyond'],
];
const SHA = JSON.parse(fs.readFileSync(new URL('../client-src/fencing-originals.json', import.meta.url), 'utf8'));

fs.mkdirSync(OUT, { recursive: true });
const out = [];
for (const [messageId, key, crop, alt] of PICK) {
  const file = path.join(SRC, `trueline-${messageId}.jpeg`);
  const buf = fs.readFileSync(file);
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  if (SHA[messageId] !== sha256) throw new Error(`${messageId}: original does not match its recorded SHA-256`);
  const base = () => (crop ? sharp(buf).rotate().extract(crop) : sharp(buf).rotate());
  const big = await base().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(OUT, `${key}.webp`));
  await base().resize({ width: 720, height: 720, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT, `${key}-sm.webp`));
  out.push({
    key, cat: 'fencing', alt,
    src: `/images/fencing/${key}.webp`, sm: `/images/fencing/${key}-sm.webp`,
    width: big.width, height: big.height,
    messageId, r2: `customers/trueline-finishes/fencing/${key}.jpeg`, sha256,
    supplied: 'client-supplied by TrueLine Finishes (Brandon), WhatsApp album 25 Nov 2026 20:00 UTC',
    original: `trueline-${messageId}.jpeg`,
    modified: crop ? `cropped (${crop.left},${crop.top} ${crop.width}x${crop.height}), resized and converted to WebP` : 'resized and converted to WebP',
  });
}
fs.writeFileSync(DATA, JSON.stringify(out, null, 1) + '\n');
console.log(`${out.length} client fencing photographs -> ${OUT}`);
