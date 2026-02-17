import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const config: NextConfig = {
  output: 'export',
  basePath: isProd ? '/mira-consultancy' : '',
  images: {
    unoptimized: true,
  },
}

export default config
