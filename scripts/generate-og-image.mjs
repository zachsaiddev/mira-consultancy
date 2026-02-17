import sharp from 'sharp'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC = join(ROOT, 'public', 'images')
const APP = join(ROOT, 'app')

const WIDTH = 1200
const HEIGHT = 630

// Read logo PNG for compositing
const logoBuffer = await sharp(join(PUBLIC, 'logo.png'))
  .resize(120, null, { fit: 'inside' })
  .png()
  .toBuffer()

const logoMeta = await sharp(logoBuffer).metadata()
const logoWidth = logoMeta.width ?? 120
const logoHeight = logoMeta.height ?? 80

// Center logo horizontally, position in upper-third
const logoLeft = Math.round((WIDTH - logoWidth) / 2)
const logoTop = Math.round(HEIGHT * 0.25)

// SVG text overlay
const textSvg = `<svg width="${WIDTH}" height="${HEIGHT}">
  <text x="600" y="380" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#a3a3a3">
    Custom applications, AI agents, and workflow automation
  </text>
  <text x="600" y="420" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#a3a3a3">
    built with precision for businesses that need to move fast.
  </text>
</svg>`

await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: { r: 10, g: 12, b: 20, alpha: 1 },
  },
})
  .composite([
    {
      input: logoBuffer,
      top: logoTop,
      left: logoLeft,
    },
    {
      input: Buffer.from(textSvg),
      top: 0,
      left: 0,
    },
  ])
  .png()
  .toFile(join(APP, 'opengraph-image.png'))

console.log('OG image generated at app/opengraph-image.png (1200x630)')
