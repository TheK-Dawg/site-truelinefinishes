// STOCK IMAGES (Brandon's request, 25 Nov 2026 WhatsApp; operator GO 26 Nov 2026).
// Brandon asked for "stock images for now" on the fencing page and the Fencing service tile until he
// sends his own. The pictures he forwarded on WhatsApp carry no origin, author or licence, so they are
// NOT published. These are free-licence Wikimedia Commons equivalents, each with a download receipt in
// stock-src/fencing-receipts.json (source page, file URL, author, licence, Commons SHA-1 matched against
// the downloaded bytes, SHA-256). They are kept OUT of src/data/images.json on purpose: that file is
// Brandon's own job photographs, and the gallery, the home picks and the article pools read it. A stock
// photograph must never be shown as a TrueLine job.
// Usage: node scripts/stock-images.mjs /path/to/originals   (the folder the receipts' `local` names sit in)
// Output: public/images/stock/fencing/<key>.webp (max 1600 px long edge, never upscaled) + <key>-sm.webp
// (720 px), and src/data/stock-images.json. Every derivative is a resized copy: under CC BY-SA it is
// shared under the same licence, credited on /image-credits/ and under the fencing pictures band (the
// one public-domain file is credited too, as a courtesy).
// Never a photograph showing decking, murals or any other not-offered service (audit.mjs line 16): a
// lattice-over-decking file was tried and dropped for exactly that reason.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const SRC = process.argv[2];
if (!SRC) throw new Error('usage: node scripts/stock-images.mjs <originals dir>');
const receipts = JSON.parse(fs.readFileSync(new URL('../stock-src/fencing-receipts.json', import.meta.url), 'utf8'));
const OUT = new URL('../public/images/stock/fencing/', import.meta.url).pathname;
const DATA = new URL('../src/data/stock-images.json', import.meta.url).pathname;

// key + alt per Commons title. Alt text describes only what the photograph shows.
const PICK = {
  'File:New garden fence - geograph.org.uk - 5300956.jpg': ['concrete-post-panel-fence', 'Timber fence panels slotted between concrete posts, sitting on concrete gravel boards along a grass verge'],
  'File:Privacy fence topped with lattice.jpg': ['lattice-topped-fence', 'Timber board fence topped with a lattice trellis panel, with shrubs planted along its foot'],
  'File:New owners, new fence - geograph.org.uk - 2977885.jpg': ['close-board-fence-path', 'Close board timber fence running along a path beside a stream'],
  'File:A new garden fence - geograph.org.uk - 6782678.jpg': ['lap-panel-garden-fence', 'New timber lap panel garden fence beside a footpath'],
  'File:Garden fencing on Hill Road - geograph.org.uk - 7927643.jpg': ['panel-garden-fencing-roadside', 'Timber panel garden fencing along a raised grass bank beside a road'],
  'File:Fence panels on footpath leading to Hogwood Road - geograph.org.uk - 2160226.jpg': ['panel-fence-footpath', 'Line of timber fence panels on posts beside a woodland footpath'],
};
// Display order on /fencing/: the slotted concrete-post fence first (Brandon's new first section).
const ORDER = Object.values(PICK).map(([k]) => k);

fs.mkdirSync(OUT, { recursive: true });
const out = [];
for (const r of receipts) {
  const pick = PICK[r.title];
  if (!pick) throw new Error(`receipt with no key: ${r.title}`);
  if (!r.sha1Match) throw new Error(`${r.title}: downloaded bytes do not match the Commons SHA-1`);
  const file = path.join(SRC, path.basename(r.local));
  const buf = fs.readFileSync(file);
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  if (sha256 !== r.sha256) throw new Error(`${r.title}: original changed since the receipt (sha256)`);
  const [key, alt] = pick;
  const big = await sharp(buf).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT, `${key}.webp`));
  await sharp(buf).rotate().resize({ width: 720, height: 720, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT, `${key}-sm.webp`));
  out.push({
    key, cat: 'stock', stock: true, alt,
    src: `/images/stock/fencing/${key}.webp`, sm: `/images/stock/fencing/${key}-sm.webp`,
    width: big.width, height: big.height,
    title: r.title.replace(/^File:/, '').replace(/\.[a-z]+$/i, ''),
    author: r.artist, licence: r.licence, licenceUrl: r.licenceUrl, sourcePage: r.page, sourceFile: r.file,
    via: r.credit === 'Own work' ? 'Wikimedia Commons' : `${r.credit}, via Wikimedia Commons`,
    licenceTemplate: r.licenceTemplate || null,
    sha256: r.sha256, modified: 'resized and converted to WebP',
  });
}
out.sort((a, b) => ORDER.indexOf(a.key) - ORDER.indexOf(b.key));
fs.writeFileSync(DATA, JSON.stringify(out, null, 1) + '\n');
console.log(`${out.length} stock images -> ${OUT}`);
