'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { TreePine, Menu, X, Search, Phone, MapPin, ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CartIcon } from '@/components/cart/CartIcon'
import { CallbackModal } from './CallbackModal'
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

interface SearchResult {
  id: string
  name: string
  slug: string
  type: 'product' | 'category'
  category?: {
    name: string
    slug: string
  }
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [callbackModalOpen, setCallbackModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [hasMoreResults, setHasMoreResults] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Поиск с автодополнением
  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      // Очищаем предыдущий таймаут
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }

      // Дебаунс для поиска
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}&limit=5`)
          const data = await response.json()

          const results: SearchResult[] = [
            ...(data.products || []).map((p: any) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              type: 'product' as const,
              category: p.category,
            })),
            ...(data.categories || []).map((c: any) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              type: 'category' as const,
            })),
          ]

          setSearchResults(results.slice(0, 5))
          setHasMoreResults(data.hasMore || false)
          setShowResults(results.length > 0 || data.hasMore)
        } catch (error) {
          console.error('Search error:', error)
          setSearchResults([])
          setShowResults(false)
        }
      }, 300)

      return () => {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current)
        }
      }
    } else {
      setSearchResults([])
      setShowResults(false)
      setHasMoreResults(false)
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalog/all?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowSearch(false)
      setShowResults(false)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'product') {
      router.push(`/catalog/${result.slug}`)
    } else {
      router.push(`/catalog/${result.slug}`)
    }
    setSearchQuery('')
    setShowSearch(false)
    setShowResults(false)
  }

  const handleViewAll = () => {
    if (searchQuery.trim()) {
      router.push(`/catalog/all?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowSearch(false)
      setShowResults(false)
    }
  }

  // Закрытие поиска при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showSearch && !target.closest('.search-dropdown') && !target.closest('button[aria-label="Поиск"]')) {
        setShowSearch(false)
        setSearchQuery('')
        setShowResults(false)
      }
    }

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSearch])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-100/95 backdrop-blur-md border-b border-dark-300/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo с светящейся елкой */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Эффект свечения с анимацией */}
              <div className="absolute inset-0 bg-white/30 blur-xl rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-white/20 blur-lg rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <TreePine className="relative w-10 h-10 text-white group-hover:text-gray-100 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] filter" />
            </div>
            <span className="text-2xl font-bold horror-text bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-gray-200 group-hover:to-white transition-all duration-300">
              ЁЛКИ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm lg:text-base font-medium horror-text transition-all duration-300 relative group/link whitespace-nowrap',
                  pathname === link.href
                    ? 'text-neon-50'
                    : 'text-white hover:text-neon-50'
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

          {/* Right Side: Search, Phone, Social, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Search - Desktop и Tablet */}
            <div className="relative hidden md:block">
              {/* Кнопка поиска - всегда видна и не сдвигается */}
              <button
                onClick={() => setShowSearch(true)}
                className={`p-2 text-white hover:text-neon-50 transition-all rounded-lg hover:bg-white/10 flex items-center gap-1 lg:gap-2 group ${
                  showSearch ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                aria-label="Поиск"
              >
                <Search className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline text-sm">Поиск</span>
              </button>

              {/* Поиск в абсолютной позиции - не влияет на layout */}
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-0 top-full mt-2 w-[320px] md:w-[360px] lg:w-[420px] z-[100] search-dropdown"
                >
                  <form onSubmit={handleSearch} className="relative">
                    <div className="relative">
                      {/* Glass effect поиск */}
                      <div className="relative backdrop-blur-xl bg-dark-200/95 border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                        <div className="flex items-center">
                          <div className="pl-4 pr-2">
                            <Search className="w-5 h-5 text-gray-300" />
                          </div>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value)
                              setShowResults(true)
                            }}
                            onFocus={() => setShowResults(searchResults.length > 0 || hasMoreResults)}
                            placeholder="Поиск товаров и категорий..."
                            autoFocus
                            className="flex-1 py-3 pr-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setShowSearch(false)
                              setSearchQuery('')
                              setShowResults(false)
                            }}
                            className="p-2 mr-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                            aria-label="Закрыть поиск"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Выпадающий список результатов с glass effect */}
                      {showResults && (searchResults.length > 0 || hasMoreResults) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 mt-3 backdrop-blur-xl bg-dark-200/95 border border-white/20 rounded-xl shadow-2xl z-[100] max-h-96 overflow-hidden search-dropdown"
                        >
                          <div className="overflow-y-auto max-h-96">
                            {searchResults.length > 0 && (
                              <div>
                                <div className="px-4 py-3 border-b border-white/10">
                                  <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                                    Результаты поиска
                                  </div>
                                </div>
                                <div className="py-2">
                                  {searchResults.map((result) => (
                                    <button
                                      key={`${result.type}-${result.id}`}
                                      type="button"
                                      onClick={() => handleResultClick(result)}
                                      className="w-full text-left px-4 py-3 hover:bg-white/5 transition-all flex items-start gap-3 group"
                                    >
                                      <div className="flex-1 min-w-0">
                                        <div className="text-white font-medium group-hover:text-neon-50 transition-colors truncate text-sm">
                                          {result.name}
                                        </div>
                                        {result.type === 'product' && result.category && (
                                          <div className="text-xs text-gray-400 mt-1">
                                            {result.category.name}
                                          </div>
                                        )}
                                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                                            result.type === 'product' ? 'bg-neon-50' : 'bg-blue-400'
                                          }`} />
                                          {result.type === 'product' ? 'Товар' : 'Категория'}
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            {hasMoreResults && (
                              <button
                                type="button"
                                onClick={handleViewAll}
                                className="w-full text-left px-4 py-3 hover:bg-white/5 transition-all border-t border-white/10 text-neon-50 font-medium flex items-center justify-between group"
                              >
                                <span className="text-sm">Показать все результаты</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Phone Number */}
            <div className="hidden md:flex flex-col items-end">
              <a
                href="tel:+375447788813"
                className="text-white text-xs lg:text-sm font-medium hover:text-neon-50 transition-colors"
              >
                +375 (44) 778-88-13
              </a>
              <button
                onClick={() => setCallbackModalOpen(true)}
                className="text-xs text-gray-400 hover:text-neon-50 transition-colors mt-0.5"
              >
                Заказать звонок
              </button>
            </div>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 md:p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 group/insta"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover/insta:scale-110" />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 md:p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 group/tg"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover/tg:scale-110" />
            </a>

            <CartIcon />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-neon-50 transition-colors rounded-lg hover:bg-white/10"
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
              {/* Mobile Search */}
              <div className="px-2 relative search-dropdown">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setShowResults(true)
                      }}
                      onFocus={() => setShowResults(searchResults.length > 0 || hasMoreResults)}
                      placeholder="Поиск..."
                      className="w-full pl-10 pr-4 py-2 bg-dark-200 border border-dark-300 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-50 transition-colors"
                    />
                  </div>
                </form>
                {/* Выпадающий список результатов для мобильных */}
                {showResults && (searchResults.length > 0 || hasMoreResults) && (
                  <div className="absolute top-full left-2 right-2 mt-2 bg-dark-200 border border-dark-300 rounded-lg shadow-xl z-[100] max-h-80 overflow-y-auto search-dropdown">
                    {searchResults.length > 0 && (
                      <div className="py-2">
                        {searchResults.map((result) => (
                          <button
                            key={`${result.type}-${result.id}`}
                            type="button"
                            onClick={() => {
                              handleResultClick(result)
                              setMobileMenuOpen(false)
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-dark-300 transition-colors flex items-center gap-2"
                          >
                            <div className="flex-1">
                              <div className="text-white font-medium">{result.name}</div>
                              {result.type === 'product' && result.category && (
                                <div className="text-xs text-gray-400">{result.category.name}</div>
                              )}
                              <div className="text-xs text-gray-500 mt-1">
                                {result.type === 'product' ? 'Товар' : 'Категория'}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {hasMoreResults && (
                      <button
                        type="button"
                        onClick={() => {
                          handleViewAll()
                          setMobileMenuOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-dark-300 transition-colors border-t border-dark-300 text-neon-50 font-medium"
                      >
                        Показать все результаты →
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-base font-medium horror-text transition-colors hover:text-neon-50 px-2 py-2 rounded-lg hover:bg-white/5',
                    pathname === link.href
                      ? 'text-neon-50 bg-white/10'
                      : 'text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Контакты - заголовок */}
              <div className="px-2 pt-4 border-t border-dark-300/50">
                <h3 className="text-base font-bold horror-text text-neon-50 mb-3">Контакты</h3>
                
                {/* Mobile Phone */}
                <div className="px-2 py-2">
                  <a
                    href="tel:+375447788813"
                    className="text-white text-base font-medium hover:text-neon-50 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    +375 (44) 778-88-13
                  </a>
                  <button
                    onClick={() => {
                      setCallbackModalOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    className="text-sm text-gray-400 hover:text-neon-50 transition-colors mt-1 ml-7"
                  >
                    Заказать звонок
                  </button>
                </div>

                {/* Mobile Address */}
                <div className="px-2 py-2">
                  <div className="text-white text-base font-medium flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <div>г Минск</div>
                      <div className="text-sm text-gray-300">Сурганова 50, ТЦ Рига</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links в мобильном меню */}
              <div className="flex items-center space-x-4 pt-2 border-t border-dark-300/50 px-2">
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

      {/* Callback Modal */}
      <CallbackModal isOpen={callbackModalOpen} onClose={() => setCallbackModalOpen(false)} />
    </nav>
  )
}


