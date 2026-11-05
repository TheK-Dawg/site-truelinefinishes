// PLACEHOLDER brand assets (the real logo round comes last, via codex + LOGO-PROMPT.md).
// Writes the brand asset family to ../brand/ (repo of record) and public/brand/ (served):
// logo-full, logo-reversed, logo-black, logo-white, logo-horizontal (+ -white), and
// favicons 512/256/128/64/32/16 x colour/dark/mono. Every file is marked PLACEHOLDER.
import sharp from 'sharp';
import { mkdirSync, copyFileSync, readdirSync } from 'node:fs';

const BRAND = '/root/projects/lead-gen-websites/buildingsforlifeltd/brand/';
const PUB = new URL('../public/brand/', import.meta.url).pathname;
mkdirSync(BRAND + 'favicon', { recursive: true });
mkdirSync(PUB + 'favicon', { recursive: true });

const C = { green: '#11281E', sand: '#F2C94C', white: '#FFFFFF', black: '#101010' };
const mark = (fg, accent) => `<g><path d="M6 30 L32 8 L58 30" fill="none" stroke="${fg}" stroke-width="5" stroke-linejoin="miter"/><rect x="14" y="30" width="36" height="26" fill="none" stroke="${fg}" stroke-width="5"/><path d="M14 39 H50 M14 47 H50 M26 30 V39 M38 39 V47 M26 47 V56" stroke="${accent}" stroke-width="3"/></g>`;
const word = (fg, sub, size = 30) => `<text x="0" y="${size}" font-family="Arial, sans-serif" font-weight="700" font-size="${size}" fill="${fg}">Buildings For Life</text><text x="0" y="${size + 22}" font-family="Arial, sans-serif" font-weight="600" font-size="13" letter-spacing="3" fill="${sub}">LTD · PLACEHOLDER</text>`;

const horizontal = (fg, accent, sub) => `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="80" viewBox="0 0 400 80"><g transform="translate(8 8)">${mark(fg, accent)}</g><g transform="translate(84 18)">${word(fg, sub)}</g></svg>`;
const full = (fg, accent, sub, bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">${bg ? `<rect width="600" height="420" fill="${bg}"/>` : ''}<g transform="translate(236 60) scale(2)">${mark(fg, accent)}</g><g transform="translate(150 250) scale(1.1)">${word(fg, sub, 36)}</g></svg>`;
const fav = (fg, accent, bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">${bg ? `<rect width="64" height="64" fill="${bg}"/>` : ''}<g transform="translate(0 2)">${mark(fg, accent)}</g></svg>`;

const out = async (name, svg, w) => {
  const png = sharp(Buffer.from(svg), { density: 300 }).resize({ width: w }).png();
  await png.toFile(BRAND + name);
  copyFileSync(BRAND + name, PUB + name);
};
await out('logo-full.png', full(C.green, C.sand, C.green), 1200);
await out('logo-reversed.png', full(C.white, C.sand, C.sand, C.green), 1200);
await out('logo-black.png', full(C.black, C.black, C.black), 1200);
await out('logo-white.png', full(C.white, C.white, C.white), 1200);
await out('logo-horizontal.png', horizontal(C.green, C.sand, C.green), 800);
await out('logo-horizontal-white.png', horizontal(C.white, C.sand, C.sand), 800);
for (const s of [512, 256, 128, 64, 32, 16]) {
  await out(`favicon/${s}-colour.png`, fav(C.white, C.sand, C.green), s);
  await out(`favicon/${s}-dark.png`, fav(C.green, C.sand, C.white), s);
  await out(`favicon/${s}-mono.png`, fav(C.black, C.black, null), s);
}
await out('favicon/180-colour.png', fav(C.white, C.sand, C.green), 180);
await out('og-image.png', `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${C.green}"/><g transform="translate(180 250) scale(1.6)">${mark(C.white, C.sand)}</g><g transform="translate(330 280) scale(1.5)">${word(C.white, C.sand, 40)}</g></svg>`, 1200);
console.log(readdirSync(BRAND).join(' '), readdirSync(BRAND + 'favicon').length, 'favicons');
