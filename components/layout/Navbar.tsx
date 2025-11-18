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

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-100/95 backdrop-blur-sm border-b border-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <TreePine className="w-8 h-8 text-forest-50 group-hover:text-forest-100 transition-colors forest-glow" />
            <span className="text-xl font-bold horror-text">ЁЛКИ</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-neon-50',
                  pathname === link.href
                    ? 'text-neon-50 horror-text'
                    : 'text-gray-300'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <CartIcon />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-neon-50 transition-colors"
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
          <div className="md:hidden py-4 border-t border-dark-300">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-neon-50 px-2 py-1',
                    pathname === link.href
                      ? 'text-neon-50 horror-text'
                      : 'text-gray-300'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


