// TOKEN LAW GATE (inputs/TOKENS.md ENFORCEMENT). Fails the build on:
//  - raw colour (hex, rgb/rgba/hsl) in any style outside src/styles/tokens.css
//  - px values off the scale (space + radius + hairline/glyph geometry)
//  - font-size not read from a token; any font-family other than the token
//  - banned webfonts anywhere in src/
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../src/', import.meta.url).pathname;
const ALLOWED_PX = new Set([0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120]);
// Layout-layer breakpoint scale (custom properties cannot be used in @media), mirrored in tokens.css.
const BREAKPOINTS = new Set([400, 520, 640, 760, 900, 1023, 1024, 1100, 1180]);
const files = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.(astro|css)$/.test(f) && files.push(p); } };
walk(root);

const fails = [];
for (const file of files) {
  const rel = relative(root, file);
  const src = readFileSync(file, 'utf8');
  if (/\b(Inter|Geist|Hanken|Roboto Flex|Poppins|Montserrat)\b['"]/.test(src) || /fontsource|fonts\.googleapis/.test(src)) fails.push(`${rel}: banned webfont reference`);
  if (rel === 'styles/tokens.css') continue;
  const css = file.endsWith('.css') ? src : [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
  const lines = css.split('\n');
  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    const code = line.replace(/\/\*.*?\*\//g, '');
    if (/#[0-9a-fA-F]{3,8}\b/.test(code)) fails.push(`${at}: raw hex -> ${code.trim()}`);
    if (/\b(rgba?|hsla?)\(/.test(code)) fails.push(`${at}: raw colour function -> ${code.trim()}`);
    if (/font-family\s*:/.test(code) && !/font-family\s*:\s*(inherit|var\(--font-family\))/.test(code)) fails.push(`${at}: font-family outside token -> ${code.trim()}`);
    if (/font-size\s*:/.test(code) && !/font-size\s*:\s*(var\(--fs-|calc\(var\(--fs-|inherit)/.test(code)) fails.push(`${at}: font-size not a token -> ${code.trim()}`);
    const media = code.match(/@media[^{]*/)?.[0] ?? '';
    for (const m of media.matchAll(/(\d+)px/g)) if (!BREAKPOINTS.has(Number(m[1]))) fails.push(`${at}: off-scale breakpoint ${m[0]}`);
    for (const m of code.replace(media, '').matchAll(/(-?\d*\.?\d+)px\b/g)) {
      const v = Math.abs(Number(m[1]));
      if (!ALLOWED_PX.has(v)) fails.push(`${at}: off-scale ${m[0]} -> ${code.trim()}`);
    }
  });
}
if (fails.length) { console.log(`TOKEN GATE: FAIL (${fails.length})`); console.log(fails.join('\n')); process.exit(1); }
console.log(`TOKEN GATE: PASS (${files.length} files, 0 violations)`);
