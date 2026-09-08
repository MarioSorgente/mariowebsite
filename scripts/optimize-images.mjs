/**
 * One-off image optimizer.
 *
 * Resizes each source to the largest size it actually renders at, then writes a
 * WebP beside it. Sources were exported at full resolution: several were 1024px
 * or wider while displaying at a third of that, which is where most of the page
 * weight came from.
 *
 * This is not part of the build. Run it by hand after adding or replacing an
 * image, then commit the .webp output and point the reference at it:
 *
 *   node scripts/optimize-images.mjs
 *
 * It needs `sharp`, which currently resolves through node_modules as a
 * transitive dependency rather than a declared one. If a future install drops
 * it, `npm i -D sharp` before running.
 *
 * Widths below are 2x the largest CSS size each image is painted at, so the
 * result still looks sharp on a high-density screen.
 */

import { readFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** [source, target width, why that width] */
const TARGETS = [
  // Case study heroes and screenshots. Imported as ES modules, so the originals
  // stay in the repo harmlessly: Vite only bundles what something imports.
  ['pics/datamask-logo.png', 800, 'card 420px, hero figure 560px'],
  ['pics/devdok.png', 800, 'card 420px, hero figure 560px'],
  ['pics/landing.png', 1400, 'hero figure and two-column image grid'],
  ['pics/signin.png', 1400, 'two-column image grid'],
  ['pics/firebase.png', 1400, 'two-column image grid'],
  ['pics/designpage.png', 1400, 'two-column image grid'],
  ['pics/dashboard.png', 1400, 'two-column image grid'],
  ['pics/canvas.png', 1400, 'two-column image grid'],
  ['pics/editablestep.png', 1400, 'two-column image grid'],
  ['pics/designguidance.png', 1400, 'two-column image grid'],
  ['pics/masterpromptgen.png', 1400, 'two-column image grid'],
  ['pics/gradersgeneration.png', 1400, 'two-column image grid'],
  ['pics/evalsreview.png', 1400, 'two-column image grid'],
  ['pics/reflectionloop.png', 1400, 'two-column image grid'],

  // Everything under public/ is copied to dist verbatim, so the originals have
  // to go once the references move. Delete them after checking the output.
  ['public/images/zero2hero-lockup.png', 400, 'nav lockup, 34px tall'],
  ['public/images/zero2hero-logo.png', 520, 'footer signature, up to 260px'],
  ['public/images/zero2hero-mark.png', 96, 'icon, 34 to 48px'],
  ['public/images/mario-sorgente.jpg', 260, 'portrait, up to 124px'],
  ['public/images/capability-1.jpg', 900, 'service card'],
  ['public/images/capability-2.jpg', 900, 'service card'],
  ['public/images/capability-3.jpg', 900, 'service card'],
  ['public/images/capability-4.jpg', 900, 'service card'],
  ['public/images/research-1.jpg', 900, 'venture card'],
  ['public/images/research-2.jpg', 900, 'venture card'],
  ['public/images/research-3.jpg', 900, 'venture card'],
  ['public/images/research-4.jpg', 900, 'venture card'],
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

let before = 0;
let after = 0;

for (const [rel, width, why] of TARGETS) {
  const src = path.join(root, rel);
  const out = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  let input;
  try {
    input = await readFile(src);
  } catch {
    console.log(`skip   ${rel} (not found)`);
    continue;
  }

  const image = sharp(input);
  const meta = await image.metadata();
  // Never upscale: a source narrower than the target keeps its own width.
  const target = Math.min(width, meta.width ?? width);

  const buffer = await image
    .resize({ width: target, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  await writeFile(out, buffer);

  const from = (await stat(src)).size;
  before += from;
  after += buffer.length;

  const saved = (100 * (1 - buffer.length / from)).toFixed(0);
  console.log(
    `${path.basename(out).padEnd(30)} ${meta.width}px -> ${target}px  ` +
      `${kb(from).padStart(9)} -> ${kb(buffer.length).padStart(9)}  (-${saved}%)  ${why}`
  );
}

console.log(
  `\ntotal ${kb(before)} -> ${kb(after)}  ` +
    `(-${(100 * (1 - after / before)).toFixed(0)}%, saved ${kb(before - after)})`
);
