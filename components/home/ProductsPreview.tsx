'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowUpDown, X, ArrowUp, ArrowDown } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  image?: string
  inStock: boolean
  description?: string
  category?: {
    id: string
    name: string
    slug: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
  _count?: {
    products: number
  }
}

type SortOption = 'popular' | 'name' | 'price'
type SortDirection = 'asc' | 'desc'

export function ProductsPreview() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  useEffect(() => {
    Promise.all([
      fetch('/api/products')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch products')
          return res.json()
        })
        .then((data) => Array.isArray(data) ? data : []),
      fetch('/api/categories')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch categories')
          return res.json()
        })
        .then((data) => Array.isArray(data) ? data : []),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData.filter((p: Product) => p.inStock))
        setCategories(categoriesData)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setProducts([])
        setCategories([])
        setLoading(false)
      })
  }, [])

  // Фильтрация и сортировка
  const filteredProducts = products.filter((product) => {
    if (!selectedCategory) return true
    return product.category?.slug === selectedCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    }
    if (sortBy === 'price') {
      return sortDirection === 'asc' ? a.price - b.price : b.price - a.price
    }
    // popular - по умолчанию, без сортировки
    return 0
  })

  const displayedProducts = sortedProducts.slice(0, 8)

  // Подсчет товаров по категориям
  const getCategoryCount = (categorySlug: string | null) => {
    if (!categorySlug) return products.length
    return products.filter((p) => p.category?.slug === categorySlug).length
  }

  const hasActiveFilters = selectedCategory !== null || sortBy !== 'popular'

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400">Загрузка товаров из тёмного леса...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400 mb-4">Товары временно недоступны</p>
        <p className="text-gray-500 text-sm">
          База данных не подключена или товары ещё не добавлены
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Фильтры и сортировка */}
      <div className="bg-gradient-to-br from-horror-dark/80 via-horror-dark/60 to-horror-darker/80 backdrop-blur-xl border border-white/10 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
          {/* Категории */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <ChevronDown className="w-5 h-5 text-horror-glow" />
              <span className="text-horror-glow font-medium">Категории</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-horror-glow/30 to-horror-glow/20 text-horror-glow border-2 border-horror-glow'
                    : 'bg-horror-dark/50 text-gray-300 border-2 border-white/10 hover:border-horror-glow/30'
                }`}
              >
                ВСЕ ({getCategoryCount(null)})
              </motion.button>
              {categories.map((category) => {
                const count = getCategoryCount(category.slug)
                if (count === 0) return null
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.slug
                        ? 'bg-gradient-to-r from-horror-glow/30 to-horror-glow/20 text-horror-glow border-2 border-horror-glow'
                        : 'bg-horror-dark/50 text-gray-300 border-2 border-white/10 hover:border-horror-glow/30'
                    }`}
                  >
                    {category.name.toUpperCase()} ({count})
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Сортировка */}
          <div className="flex-1 sm:flex-initial">
            <div className="flex items-center gap-2 mb-3">
              <ArrowUpDown className="w-5 h-5 text-horror-glow" />
              <span className="text-horror-glow font-medium">Сортировка:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (sortBy === 'popular') {
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                  } else {
                    setSortBy('popular')
                    setSortDirection('asc')
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                  sortBy === 'popular'
                    ? 'bg-gradient-to-r from-horror-glow/30 to-horror-glow/20 text-horror-glow border-2 border-horror-glow'
                    : 'bg-horror-dark/50 text-gray-300 border-2 border-white/10 hover:border-horror-glow/30'
                }`}
              >
                Популярные {sortBy === 'popular' && (sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />)}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (sortBy === 'name') {
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                  } else {
                    setSortBy('name')
                    setSortDirection('asc')
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                  sortBy === 'name'
                    ? 'bg-gradient-to-r from-horror-glow/30 to-horror-glow/20 text-horror-glow border-2 border-horror-glow'
                    : 'bg-horror-dark/50 text-gray-300 border-2 border-white/10 hover:border-horror-glow/30'
                }`}
              >
                По названию {sortBy === 'name' && (sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />)}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (sortBy === 'price') {
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                  } else {
                    setSortBy('price')
                    setSortDirection('asc')
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                  sortBy === 'price'
                    ? 'bg-gradient-to-r from-horror-glow/30 to-horror-glow/20 text-horror-glow border-2 border-horror-glow'
                    : 'bg-horror-dark/50 text-gray-300 border-2 border-white/10 hover:border-horror-glow/30'
                }`}
              >
                По цене {sortBy === 'price' && (sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />)}
              </motion.button>
              {hasActiveFilters && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(null)
                    setSortBy('popular')
                    setSortDirection('asc')
                  }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-horror-red/20 text-horror-red border-2 border-horror-red/50 hover:bg-horror-red/30 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Сбросить
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Счетчик товаров */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-gray-300 text-sm">
            Показано: {displayedProducts.length} товаров
          </p>
        </div>
      </div>

      {/* Сетка товаров */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {displayedProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  )
}
