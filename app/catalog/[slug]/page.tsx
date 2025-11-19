'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  price: number
  image?: string
  images?: string
  inStock: boolean
  category: {
    id: string
    name: string
    slug: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}

export default function CatalogSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isCategory, setIsCategory] = useState<boolean | null>(null)
  const { addItem } = useCart()

  useEffect(() => {
    if (!slug) return

    // Сначала проверяем, является ли это категорией
    Promise.all([
      fetch('/api/categories').then(res => res.json()),
      fetch('/api/products').then(res => res.json())
    ])
      .then(([categories, allProducts]) => {
        const foundCategory = Array.isArray(categories) 
          ? categories.find((c: Category) => c.slug === slug)
          : null
        
        if (foundCategory) {
          // Это категория - показываем товары категории
          setCategory(foundCategory)
          setIsCategory(true)
          const categoryProducts = Array.isArray(allProducts)
            ? allProducts.filter((p: Product) => p.category.slug === slug)
            : []
          setProducts(categoryProducts)
        } else {
          // Это товар - показываем товар
          const foundProduct = Array.isArray(allProducts)
            ? allProducts.find((p: Product) => p.slug === slug)
            : null
          if (foundProduct) {
            setProduct(foundProduct)
            setIsCategory(false)
          }
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28">
        <p className="text-gray-400">Загрузка...</p>
      </div>
    )
  }

  // Если это категория - показываем товары категории
  if (isCategory === true && category) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-50 transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад в каталог
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 horror-text">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-gray-400 text-lg">
                {category.description}
              </p>
            )}
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 mt-8">
              <p className="text-gray-400 text-lg">
                Товары не найдены в этой категории
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={`/catalog/${product.slug}`} className="block">
                    <div className="bg-dark-200 rounded-lg overflow-hidden border border-dark-300 hover:border-neon-50/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-50/20">
                      {/* Фотография */}
                      <div className="relative h-48 sm:h-56 md:h-64 bg-dark-300 overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-500 text-sm">Нет изображения</span>
                          </div>
                        )}
                      </div>
                      {/* Название */}
                      <div className="p-4">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-neon-50 transition-colors text-center">
                          {product.name}
                        </h3>
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

  // Если это товар - показываем страницу товара
  if (isCategory === false && product) {
    const images = product.images
    ? (JSON.parse(product.images) as string[])
    : product.image
    ? [product.image]
    : []

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-50 transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад в каталог
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square bg-dark-200 rounded-lg overflow-hidden border border-dark-300">
              {images[0] ? (
                <Image
                  src={images[0]}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500">Нет изображения</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1, 5).map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-dark-200 rounded-lg overflow-hidden border border-dark-300"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 2}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Категория и название */}
            <div>
              <span className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">
                {product.category.name}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 horror-text text-white">
                {product.name}
              </h1>
            </div>

            {/* Блок с ценой и наличием */}
            <div className="bg-dark-200 rounded-lg p-6 border border-dark-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm text-gray-400 block mb-1">Цена</span>
                  <div className="text-3xl sm:text-4xl font-bold text-neon-50 horror-text">
                    {formatPrice(product.price)}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    product.inStock
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                      : 'bg-red-500/20 border border-red-500/50 text-red-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      product.inStock ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <span className="text-sm font-medium">
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Кнопка добавления в корзину */}
              {product.inStock ? (
                <button
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      slug: product.slug,
                    })
                  }
                  className="w-full px-6 py-4 bg-neon-50 text-white rounded-lg hover:bg-neon-100 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 horror-glow shadow-lg shadow-neon-50/30 hover:shadow-neon-50/50"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Добавить в корзину
                </button>
              ) : (
                <div className="w-full px-6 py-4 bg-dark-300 text-gray-400 rounded-lg text-center font-medium text-lg border border-dark-400">
                  Товар временно недоступен
                </div>
              )}
            </div>

            {/* Описание товара */}
            {product.description && (
              <div className="bg-dark-200 rounded-lg p-6 border border-dark-300">
                <h2 className="text-xl font-bold mb-4 text-white border-b border-dark-300 pb-3">
                  Описание товара
                </h2>
                <p className="text-gray-300 leading-relaxed text-base">
                  {product.description}
                </p>
              </div>
            )}

            {/* Дополнительная информация */}
            <div className="bg-dark-200 rounded-lg p-6 border border-dark-300">
              <h2 className="text-xl font-bold mb-4 text-white border-b border-dark-300 pb-3">
                Информация о товаре
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Категория:</span>
                  <span className="text-white font-medium">{product.category.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Артикул:</span>
                  <span className="text-white font-medium">#{product.id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Наличие:</span>
                  <span className={`font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                    {product.inStock ? 'Есть в наличии' : 'Нет в наличии'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    )
  }

  // Если ничего не найдено
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28">
      <div className="text-center">
        <p className="text-gray-400 text-lg mb-4">
          Категория или товар не найдены в тёмном лесу...
        </p>
        <Link href="/catalog">
          <Button variant="outline">Вернуться в каталог</Button>
        </Link>
      </div>
    </div>
  )
}


