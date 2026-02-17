import sharp from 'sharp'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public', 'images')

// Profile photo: 400x400 for 2x retina at max 200px display
await sharp(join(PUBLIC, 'zach.png'))
  .resize(400, 400, { fit: 'cover', position: 'top' })
  .webp({ quality: 82 })
  .toFile(join(PUBLIC, 'zach.webp'))

// Logo: keep original dimensions, convert format only
await sharp(join(PUBLIC, 'logo.png'))
  .webp({ quality: 90 })
  .toFile(join(PUBLIC, 'logo.webp'))

console.log('Images optimized.')
