import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/Navbar'
import { SafariFullscreen } from '@/components/SafariFullscreen'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'ЁЛКИ - Магазин живых ёлок',
  description: 'Свежесрезанные ёлки из тёмных лесов. Хоррор-атмосфера для вашего праздника.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ЁЛКИ',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <SafariFullscreen />
        <Providers>
          <div className="min-h-screen bg-dark-50 text-white" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
            <Navbar />
            <main>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}


