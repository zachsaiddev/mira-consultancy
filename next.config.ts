import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const basePath = isProd ? '/mira-consultancy' : ''

const config: NextConfig = {
  output: 'export',
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default config
