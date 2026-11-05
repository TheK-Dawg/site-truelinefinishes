// Install the codex-cut logo family (_work/logo/out, from sheet.png via cut.py) over the
// placeholders in ../brand/ (repo of record) and public/brand/ (served), and build the
// 1200x630 OG image from the reversed logo on the brand green.
import sharp from 'sharp';
import { readdirSync, copyFileSync, mkdirSync, statSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const SRC = '/root/projects/lead-gen-websites/buildingsforlifeltd/_work/logo/out/';
const BRAND = '/root/projects/lead-gen-websites/buildingsforlifeltd/brand/';
const PUB = new URL('../public/brand/', import.meta.url).pathname;
for (const dest of [BRAND, PUB]) {
  rmSync(dest, { recursive: true, force: true }); // drop every placeholder file
  mkdirSync(join(dest, 'favicon'), { recursive: true });
  for (const f of readdirSync(SRC)) if (statSync(SRC + f).isFile()) copyFileSync(SRC + f, dest + f);
  for (const f of readdirSync(SRC + 'favicon')) copyFileSync(`${SRC}favicon/${f}`, `${dest}favicon/${f}`);
}
const logo = await sharp(SRC + 'logo-reversed.png').resize({ width: 760 }).toBuffer();
const og = await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#11281E' } })
  .composite([{ input: logo, gravity: 'center' }]).png().toBuffer();
for (const dest of [BRAND, PUB]) await sharp(og).toFile(dest + 'og-image.png');
console.log('installed:', readdirSync(PUB).join(' '), '| favicons:', readdirSync(PUB + 'favicon').length);
