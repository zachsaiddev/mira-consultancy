import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mira Consultancy',
  description: 'Technology consultancy specialising in custom applications, AI agents, and workflow automation.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
