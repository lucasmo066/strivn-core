import sharp from 'sharp';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';

// Export the approved artwork without redrawing its arrow or letterforms.
const pack = 'public/assets/strivn_brand_assets_pack';
const source = 'brand/source/strivn-slim-arrow-black.png';
const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
function bounds(start, end) {
  let left = info.width, top = info.height, right = 0, bottom = 0;
  for (let y = 0; y < info.height; y++) for (let x = start; x < end; x++) {
    if (data[(y * info.width + x) * 4 + 3] < 128) continue;
    left = Math.min(left, x); top = Math.min(top, y);
    right = Math.max(right, x); bottom = Math.max(bottom, y);
  }
  return { left: left - 3, top: top - 3, width: right - left + 7, height: bottom - top + 7 };
}
const regions = { full_logo: bounds(0, info.width), cube_mark: bounds(0, 700), wordmark: bounds(700, info.width) };
await mkdir(pack, { recursive: true });
const exports = [];
for (const [name, region] of Object.entries(regions)) {
  for (const tone of ['black', 'white']) {
    const image = sharp(source).extract(region).linear([0, 0, 0], Array(3).fill(tone === 'black' ? 0 : 255));
    const file = `${pack}/strivn_${name}_${tone}_transparent.png`;
    await image.clone().png().toFile(file); exports.push(file);
    if (name === 'full_logo') {
      const opaque = `${pack}/strivn_full_logo_${tone}_on_${tone === 'black' ? 'white' : 'black'}.png`;
      await sharp(file).flatten({ background: tone === 'black' ? '#ffffff' : '#000000' }).png().toFile(opaque);
      exports.push(opaque);
    }
    if (name === 'wordmark') {
      const alias = `${pack}/strivn_wordmark_${tone}.png`;
      await copyFile(file, alias); exports.push(alias);
    }
  }
}
async function icon(size, tone, opaque = false) {
  const inset = size <= 32 ? 1 : Math.max(1, Math.round(size * .025));
  const cube = await sharp(`${pack}/strivn_cube_mark_${tone}_transparent.png`).resize(size - inset * 2, size - inset * 2, { fit: 'inside' }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: opaque ? '#ffffff' : { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: cube, gravity: 'centre' }]).png().toBuffer();
}
await mkdir('public/assets/favicons', { recursive: true });
for (const [theme, tone] of [['light', 'black'], ['dark', 'white']]) {
  for (const size of [16, 32, 48, 64, 192, 512]) {
    const file = `public/assets/favicons/strivn-${theme}-${size}.png`;
    await writeFile(file, await icon(size, tone)); exports.push(file);
  }
  const file = `public/favicon-${theme}.png`;
  await writeFile(file, await icon(64, tone)); exports.push(file);
}
await writeFile('public/apple-touch-icon.png', await icon(180, 'black')); exports.push('public/apple-touch-icon.png');
// Preserve transparent backgrounds in every fallback ICO frame too.
const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map(size => icon(size, 'black')));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2); header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, i) => {
  const entry = 6 + i * 16;
  header[entry] = sizes[i]; header[entry + 1] = sizes[i];
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...frames])); exports.push('public/favicon.ico');
const lockup = await sharp(`${pack}/strivn_full_logo_black_transparent.png`).png().toBuffer();
const { width, height } = regions.full_logo;
await writeFile('public/assets/logos/strivn-logo-lockup.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><title>Strivn</title><image width="${width}" height="${height}" href="data:image/png;base64,${lockup.toString('base64')}"/></svg>`);
exports.push('public/assets/logos/strivn-logo-lockup.svg');
await mkdir('output/strivn-brand-package', { recursive: true });
await writeFile('output/strivn-brand-package/asset-manifest.json', JSON.stringify({ regions, files: exports }, null, 2));
console.log(JSON.stringify({ regions, exported: exports.length }, null, 2));
