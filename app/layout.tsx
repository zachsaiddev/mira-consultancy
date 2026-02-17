import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { BackgroundGradient } from '@/components/ui'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://buildwithmira.co.uk'),
  title: 'Build with Mira — Solutions Architecture & Implementation Consulting',
  description:
    'Solutions architecture, platform development, and implementation consulting for businesses that have outgrown their spreadsheets.',
  openGraph: {
    title: 'Build with Mira — Solutions Architecture & Implementation Consulting',
    description:
      'Solutions architecture, platform development, and implementation consulting for businesses that have outgrown their spreadsheets.',
    url: 'https://buildwithmira.co.uk',
    siteName: 'Build with Mira',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build with Mira — Solutions Architecture & Implementation Consulting',
    description:
      'Solutions architecture, platform development, and implementation consulting for businesses that have outgrown their spreadsheets.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
      </head>
      <body className="bg-background text-text-primary font-sans antialiased">
        <BackgroundGradient />
        {children}
      </body>
    </html>
  )
}
