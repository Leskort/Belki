'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}

export default function CatalogPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch categories')
        return res.json()
      })
      .then((data) => {
        setCategories(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
        setCategories([])
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28">
        <p className="text-gray-400">Загрузка категорий...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 horror-text">
            Каталог товаров
          </h1>
          <p className="text-gray-400 text-lg">
            Выберите категорию из нашего ассортимента
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12 mt-8">
            <p className="text-gray-400 text-lg">
              Категории не найдены
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 mt-8">
            {/* Категория "Все" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="group"
            >
              <Link href="/catalog/all" className="block">
                <div className="bg-dark-200 rounded-lg overflow-hidden border border-dark-300 hover:border-neon-50/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-50/20">
                  {/* Фотография категории */}
                  <div className="relative h-40 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br from-neon-50/20 via-neon-50/10 to-dark-300 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-neon-50 text-2xl sm:text-4xl md:text-5xl font-bold">ВСЕ</span>
                    </div>
                  </div>
                  {/* Название категории */}
                  <div className="p-3 sm:p-4 md:p-6">
                    <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:text-neon-50 transition-colors text-center">
                      Все товары
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 text-center">
                      Весь ассортимент товаров
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/catalog/${category.slug}`} className="block">
                  <div className="bg-dark-200 rounded-lg overflow-hidden border border-dark-300 hover:border-neon-50/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-50/20">
                    {/* Фотография категории */}
                    <div className="relative h-40 sm:h-64 md:h-72 lg:h-80 bg-dark-300 overflow-hidden">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-500 text-xs sm:text-sm">Нет изображения</span>
                        </div>
                      )}
                    </div>
                    {/* Название категории */}
                    <div className="p-3 sm:p-4 md:p-6">
                      <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:text-neon-50 transition-colors text-center">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 text-center line-clamp-2">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


