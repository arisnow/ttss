import type { Metadata, Viewport } from 'next'
import '../src/index.css'
import '../src/App.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ttss-murex.vercel.app'),
  title: 'Trucking The Seven Seas',
  description:
    'Trucking The Seven Seas gives drivers transparent pay breakdowns, trucking resources, videos, and consultation booking.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Trucking The Seven Seas',
    title: 'Trucking The Seven Seas',
    description:
      'Transparent trucking pay breakdowns, public spreadsheets, owner-operator tools, and straight-answer trucking guidance.',
    images: [
      {
        url: '/ttss-logo-mark.png',
        width: 512,
        height: 512,
        alt: 'Trucking The Seven Seas logo mark',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Trucking The Seven Seas',
    description:
      'Transparent trucking pay breakdowns, public spreadsheets, owner-operator tools, and straight-answer trucking guidance.',
    images: ['/ttss-logo-mark.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/ttss-logo-mark.png', type: 'image/png' },
    ],
    apple: '/ttss-logo-mark.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
