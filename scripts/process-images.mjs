/**
 * Builds every image the site uses from source-assets/ (run: npm run images).
 *
 *  - Authentic Insinööritoimisto KJ Oy photos (instokj.fi). The originals were published bleached
 *    (light-grey background treatment); levels are restored here – tonal correction only, no
 *    retouching of content.
 *  - Illustrative Pexels photos (free licence, docs/ASSET_PROVENANCE.md), converted to the same
 *    monochrome treatment. Every one is labelled "Kuvituskuva" on the site.
 *  - FINAS accreditation mark (company's own T359 symbol, unaltered, only resized)
 *  - Favicons from the original KJ monogram, Open Graph share image (1200 × 630)
 *
 * Output manifest (sizes for width/height attributes): src/data/photos.generated.json
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const OUT = 'public/images'
const logo = JSON.parse(await fs.readFile('src/components/brand/logo.json', 'utf8'))

/** name → source, widths, tonal treatment */
const photos = {
  // Authentic (instokj.fi)
  laboratorio: { file: 'source-assets/original/img_lab2_bw.jpg', widths: [640, 1024], levels: [150, 255], gamma: 1.15 },
  kosteusmittari: { file: 'source-assets/original/img_measure1_bw.jpg', widths: [640, 1024, 1264], levels: [70, 255], gamma: 1.6 },
  juvonen: { file: 'source-assets/original/santeri_b.jpg', widths: [283] },
  // Illustrative stock (Pexels)
  hirsipaaty: { file: 'source-assets/stock/p4969981.jpg', widths: [640, 1024, 1600, 2400] },
  talvitie: { file: 'source-assets/stock/p10784638.jpg', widths: [640, 1024, 1600] },
  betonikaytava: { file: 'source-assets/stock/p29278168.jpg', widths: [640, 1024, 1600] },
  valu: { file: 'source-assets/stock/p26107201.jpg', widths: [640, 1024, 1600] },
  kattotuolit: { file: 'source-assets/stock/p8491084.jpg', widths: [640, 1024, 1600, 2400] },
  lattiakaivo: { file: 'source-assets/stock/p5768318.jpg', widths: [640, 1024, 1600] },
  puutalo: { file: 'source-assets/stock/p210538.jpg', widths: [640, 1024, 1600] },
  talo: { file: 'source-assets/stock/p7031408.jpg', widths: [640, 1024, 1600, 2400] },
  suunnitelmat: { file: 'source-assets/stock/p8482551.jpg', widths: [640, 1024, 1600, 2400] },
}

await fs.mkdir(OUT, { recursive: true })

const treat = (src, cfg) => {
  let img = sharp(src).rotate().greyscale()
  if (cfg.levels) {
    const [lo, hi] = cfg.levels
    const a = 255 / (hi - lo)
    img = img.linear(a, -lo * a)
  }
  if (cfg.gamma) img = img.gamma(cfg.gamma, 1.0)
  return img
}

const manifest = {}
for (const [name, cfg] of Object.entries(photos)) {
  const meta = await sharp(cfg.file).metadata()
  const ratio = meta.height / meta.width
  const widths = cfg.widths.filter((w) => w <= meta.width)
  const base = await treat(cfg.file, cfg).toBuffer()
  for (const w of widths) {
    const img = sharp(base).resize({ width: w, withoutEnlargement: true })
    await img.clone().webp({ quality: 76, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.webp`))
    await img.clone().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(path.join(OUT, `${name}-${w}.jpg`))
  }
  manifest[name] = { width: widths.at(-1), height: Math.round(widths.at(-1) * ratio), widths }
}
await fs.writeFile('src/data/photos.generated.json', JSON.stringify(manifest, null, 2) + '\n')

/* ---------- FINAS accreditation mark (unaltered artwork, resized) ---------- */
await sharp('source-assets/original/T359.png').resize({ width: 480 }).png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT, 'finas-t359.png'))

/* ---------- Icons: original KJ monogram, white on graphite ---------- */
const [vx, vy, vw] = logo.viewBox.split(' ').map(Number)
// Monogram bbox in path units: x 189.8–618.9, y 197.8–803.5 (centre 404.3 / 500.6); ground line y ≈ 619.5.
const ms = 0.135
const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="24" fill="#141516"/>
  <rect x="14" y="${(60 + (619.5 - 500.6) * ms - 2.5).toFixed(2)}" width="92" height="5" fill="#f46b36"/>
  <g transform="translate(${(60 - 404.3 * ms).toFixed(2)} ${(60 - 500.6 * ms).toFixed(2)}) scale(${ms})">
    <path d="${logo.monogram}" fill="#ffffff"/>
  </g>
</svg>`
await sharp(Buffer.from(iconSvg(32))).resize(32, 32).png().toFile('public/favicon-32.png')
await sharp(Buffer.from(iconSvg(180))).resize(180, 180).png().toFile('public/apple-touch-icon.png')
await sharp(Buffer.from(iconSvg(192))).resize(192, 192).png().toFile('public/icon-192.png')
await fs.writeFile('public/favicon.svg', iconSvg(32))

/* ---------- Open Graph image 1200 × 630 ---------- */
const grid = []
for (let x = 0; x <= 640; x += 32) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="#ffffff" stroke-opacity="${x % 160 === 0 ? 0.09 : 0.04}"/>`)
for (let y = 0; y <= 630; y += 32) grid.push(`<line x1="0" y1="${y}" x2="640" y2="${y}" stroke="#ffffff" stroke-opacity="${y % 160 === 0 ? 0.09 : 0.04}"/>`)
const photo = await sharp(await treat('source-assets/original/img_lab2_bw.jpg', photos.laboratorio).toBuffer())
  .resize(560, 630, { fit: 'cover', position: 'centre' })
  .toBuffer()
const s = 150 / vw
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#141516"/>
  ${grid.join('')}
  <g transform="translate(60 60) scale(${s}) translate(${-vx} ${-vy})">
    <path d="${logo.ring}" fill="#ffffff" fill-rule="evenodd"/>
    <path d="${logo.monogram}" fill="#ffffff"/>
  </g>
  <text x="62" y="290" font-family="Courier New, monospace" font-size="20" letter-spacing="3" fill="#f46b36">FINAS T359 · SFS-EN ISO/IEC 17025</text>
  <text x="60" y="360" font-family="Arial, sans-serif" font-weight="700" font-size="44" fill="#f2f1ec">Kuntotarkastukset,</text>
  <text x="60" y="414" font-family="Arial, sans-serif" font-weight="700" font-size="44" fill="#f2f1ec">mittaukset ja</text>
  <text x="60" y="468" font-family="Arial, sans-serif" font-weight="700" font-size="44" fill="#f2f1ec">betonilaboratorio.</text>
  <text x="60" y="548" font-family="Arial, sans-serif" font-size="24" fill="#c9c6bc">Insinööritoimisto KJ Oy · Joensuu · 044 972 7738</text>
  <text x="60" y="590" font-family="Arial, sans-serif" font-size="16" fill="#8d8f92">Konseptidemo – Hades Design</text>
</svg>`
await sharp(Buffer.from(ogSvg))
  .composite([{ input: photo, left: 640, top: 0 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(OUT, 'og-instokj.jpg'))

console.log(`Processed ${Object.keys(photos).length} photos, FINAS mark, icons and OG image.`)
