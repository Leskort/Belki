'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TreePine, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { CartIcon } from '@/components/cart/CartIcon'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О нас' },
  { href: '/services', label: 'Услуги' },
  { href: '/payment-delivery', label: 'Оплата и доставка' },
  { href: '/contacts', label: 'Контакты' },
]

// Instagram иконка с оригинальным градиентом
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        fill="url(#instagram-gradient)"
      />
    </svg>
  )
}

// Telegram иконка с оригинальным цветом
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.169 1.858-.896 6.728-.896 6.728-.447 2.24-1.313 2.65-2.61 1.65l-3.6-2.65-1.74-1.6c-.192-.192-.134-.384.134-.448l2.87-.96 5.63-2.54c.24-.192.048-.384-.192-.24l-6.97 4.4-2.87.96c-.24.192-.48.192-.672-.048l-2.4-2.25-5.15-1.6c-.24-.192-.24-.48.048-.576l6.4-2.4 15.1-5.76c.24-.192.48-.048.576.192l-1.44 3.6z"
        fill="#0088cc"
      />
    </svg>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-100/95 backdrop-blur-md border-b border-dark-300/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo с светящейся елкой */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Эффект свечения с анимацией */}
              <div className="absolute inset-0 bg-forest-50/40 blur-xl rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-forest-50/20 blur-lg rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <TreePine className="relative w-10 h-10 text-forest-50 group-hover:text-forest-100 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(13,40,24,0.9)] filter" />
            </div>
            <span className="text-2xl font-bold horror-text bg-gradient-to-r from-forest-50 to-forest-100 bg-clip-text text-transparent group-hover:from-forest-100 group-hover:to-forest-50 transition-all duration-300">
              ЁЛКИ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-all duration-300 relative group/link',
                  pathname === link.href
                    ? 'text-neon-50 horror-text'
                    : 'text-gray-300 hover:text-neon-50'
                )}
              >
                {link.label}
                {/* Подчеркивание при наведении */}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 w-0 h-0.5 bg-neon-50 transition-all duration-300 group-hover/link:w-full',
                    pathname === link.href && 'w-full'
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Social Icons and Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 group/insta"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-6 h-6 transition-transform duration-300 group-hover/insta:scale-110" />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 group/tg"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-6 h-6 transition-transform duration-300 group-hover/tg:scale-110" />
            </a>

            <CartIcon />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-neon-50 transition-colors rounded-lg hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-300/50">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-neon-50 px-2 py-2 rounded-lg hover:bg-white/5',
                    pathname === link.href
                      ? 'text-neon-50 horror-text bg-white/10'
                      : 'text-gray-300'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {/* Social links в мобильном меню */}
              <div className="flex items-center space-x-4 pt-2 border-t border-dark-300/50">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-6 h-6" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


