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

export default function ProductPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    if (!slug) return

    fetch(`/api/products?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setProduct(data[0])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Загрузка товара...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">
            Товар не найден в тёмном лесу...
          </p>
          <Link href="/catalog">
            <Button variant="outline">Вернуться в каталог</Button>
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images
    ? (JSON.parse(product.images) as string[])
    : product.image
    ? [product.image]
    : []

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-50 transition-colors mb-8"
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
            <div>
              <span className="text-sm text-gray-500 mb-2 block">
                {product.category.name}
              </span>
              <h1 className="text-4xl font-bold mb-4 horror-text">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-neon-50 horror-text mb-6">
                {formatPrice(product.price)}
              </div>
            </div>

            {product.description && (
              <div>
                <h2 className="text-xl font-bold mb-3 text-white">
                  Описание
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="pt-6 border-t border-dark-300">
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
                  className="w-full px-6 py-4 bg-neon-50 text-white rounded-lg hover:bg-neon-100 transition-colors font-medium flex items-center justify-center gap-2 horror-glow"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Добавить в корзину
                </button>
              ) : (
                <div className="w-full px-6 py-4 bg-dark-200 text-gray-400 rounded-lg text-center font-medium">
                  Нет в наличии
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


