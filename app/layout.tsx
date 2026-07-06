import type { Metadata, Viewport } from 'next'
import '../src/index.css'
import '../src/App.css'

export const metadata: Metadata = {
  title: 'Trucking The Seven Seas',
  description:
    'Trucking The Seven Seas gives drivers transparent pay breakdowns, trucking resources, videos, and consultation booking.',
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
