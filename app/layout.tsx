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
  metadataBase: new URL('https://zachsaiddev.github.io'),
  title: 'Mira Consultancy — Custom Software for Growing Businesses',
  description:
    'Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.',
  openGraph: {
    title: 'Mira Consultancy — Custom Software for Growing Businesses',
    description:
      'Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.',
    url: 'https://zachsaiddev.github.io/mira-consultancy',
    siteName: 'Mira Consultancy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mira Consultancy — Custom Software for Growing Businesses',
    description:
      'Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} dark`}>
      <body className="bg-background text-text-primary font-sans antialiased">
        <BackgroundGradient />
        {children}
      </body>
    </html>
  )
}
