// Pete's own project photographs (pulled from his old Google Sites portfolio,
// services and home pages, 24 Sep 2026) -> resized WebP slots in public/images/work/.
// Duplicates across his old pages are dropped. The old logo, the bathroom photo
// (bathrooms are an excluded service) and the photo of two people are not used.
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';

const SRC = '/root/projects/lead-gen-websites/buildingsforlifeltd/_work/gsites/raw/';
const OUT = new URL('../public/images/work/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

export const slots = [
  ['page-home-05.jpg', 'rear-extension-glazing', 'Large brick house with a wide glazed rear extension opening onto the lawn'],
  ['page-portfolio-08.png', 'new-build-brickwork', 'Detached new build in grey and red brick with the roof on and groundworks still open'],
  ['page-portfolio-09.png', 'brick-porch', 'Brick-built porch with a tiled hipped roof and a white front door'],
  ['page-portfolio-07.png', 'timber-clad-renovation', 'House renovation with timber cladding above rendered walls and new windows'],
  ['page-portfolio-19.jpg', 'tudor-house-renovation', 'Tudor-style house under renovation with scaffolding and large new glazing'],
  ['page-portfolio-11.jpg', 'garden-wall-piers', 'New red brick garden wall with piers running along a driveway'],
  ['page-portfolio-06.jpg', 'porcelain-patio', 'Pale porcelain patio laid with a drainage channel along the edge'],
  ['page-portfolio-16.jpg', 'patio-slabs', 'Large-format grey paving slabs laid tight along the back of a house'],
  ['page-portfolio-10.png', 'oak-and-brick-well', 'Round brick well with an oak frame and shingled timber roof'],
  ['page-portfolio-21.jpg', 'groundworks-drainage', 'Excavated trench with a drainage pipe beneath a timber lintel'],
  ['page-portfolio-17.jpg', 'structural-opening', 'Old brick wall opened up for structural work'],
  ['page-portfolio-12.png', 'loft-insulation', 'Insulation boards fitted between new roof rafters during a loft build'],
  ['page-portfolio-13.png', 'extension-groundworks', 'Extension footprint being dug out beside a semi-detached house with a mini digger'],
  ['page-portfolio-14.jpg', 'paving-preparation', 'Sharp sand bed and block paving edging being set out with a spirit level'],
  ['page-portfolio-15.jpg', 'brick-wall-pointing', 'New brick wall with fresh mortar joints along a side return'],
  ['page-about-us-03.jpg', 'brick-detail', 'Close view of a handmade-style red brick being checked against a finished wall'],
  ['page-portfolio-18.jpg', 'paving-delivery', 'Pallets of grey paving slabs stacked on site ready to lay'],
];

const manifest = [];
for (const [file, slug, alt] of slots) {
  const img = sharp(SRC + file).rotate();
  const meta = await img.metadata();
  // The new-build photo carries a black strip down its right edge in the source.
  if (slug === 'new-build-brickwork') img.extract({ left: 0, top: 0, width: meta.width - 20, height: meta.height });
  const info = await img.resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}${slug}.webp`);
  manifest.push({ slug, src: `/images/work/${slug}.webp`, alt, width: info.width, height: info.height, from: file, original: `${meta.width}x${meta.height}` });
  console.log(slug, `${meta.width}x${meta.height}`, '->', `${info.width}x${info.height}`, Math.round(info.size / 1024) + 'KB');
}
writeFileSync(new URL('../src/data/work-images.json', import.meta.url), JSON.stringify(manifest, null, 1));
