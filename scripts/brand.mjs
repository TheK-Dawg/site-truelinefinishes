// BRAND: exports of Brandon's own primary logo (brand-src/trueline-finishes-logo-blue.jpg, WhatsApp 26 Oct 2026,
// sha256 212858040c248a99...). Crops only: no redraw, no recolour. The ground is pure #000000, so the
// exports sit seamlessly on the site's black header, footer and hero bands (plan: black only).
// The favicon is the logo's own taller "T", cropped from the same file, on its black ground.
import sharp from 'sharp';
import fs from 'node:fs';
const SRC = new URL('../brand-src/trueline-finishes-logo-blue.jpg', import.meta.url).pathname;
const OUT = new URL('../public/brand/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
// content bbox measured: x 60-1551, y 93-462; keep a small black margin
const logo = sharp(SRC).extract({ left: 44, top: 78, width: 1524, height: 400 });
await logo.clone().resize({ width: 960 }).webp({ quality: 90 }).toFile(OUT + 'logo.webp');
await logo.clone().resize({ width: 960 }).png({ compressionLevel: 9 }).toFile(OUT + 'logo.png');
// the T: x ~70-340, y 93-350
const t = () => sharp(SRC).extract({ left: 54, top: 88, width: 262, height: 262 });
for (const s of [16, 32, 48, 180, 192, 512]) await t().resize(s, s).png().toFile(OUT + `icon-${s}.png`);
await t().resize(32, 32).png().toFile(OUT + '../favicon.png');
fs.copyFileSync(OUT + 'icon-32.png', new URL('../public/favicon.ico', import.meta.url).pathname); // PNG-in-ICO is accepted by browsers
// OG: logo centred on black, 1200x630
const og = await sharp(SRC).extract({ left: 44, top: 78, width: 1524, height: 400 }).resize({ width: 1000 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#000000' } }).composite([{ input: og, gravity: 'center' }]).png().toFile(OUT + 'og-image.png');
console.log('brand: logo, icons 16-512, favicon, og-image');
