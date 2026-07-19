import type { Metadata } from 'next'
import './globals.css'
import { Nav } from './nav'

export const metadata: Metadata = {
  title: 'Next.js SPA patterns',
  description:
    'Runnable demos for the Next.js Single-Page Applications guide: seeding client data libraries from Server Components, and more.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
