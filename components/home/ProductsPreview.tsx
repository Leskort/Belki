'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  image?: string
  inStock: boolean
}

export function ProductsPreview() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    fetch('/api/products?limit=6')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400">Загрузка товаров из тёмного леса...</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group bg-dark-200 rounded-lg overflow-hidden border border-dark-300 hover:border-neon-50/50 transition-colors"
        >
          <Link href={`/catalog/${product.slug}`}>
            <div className="relative h-64 bg-dark-300 overflow-hidden">
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
                  <span className="text-gray-500">Нет изображения</span>
                </div>
              )}
              {!product.inStock && (
                <div className="absolute top-4 right-4 bg-neon-200 text-white px-3 py-1 rounded text-sm font-medium">
                  Нет в наличии
                </div>
              )}
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/catalog/${product.slug}`}>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-50 transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-neon-50 horror-text">
                {formatPrice(product.price)}
              </span>
              <button
                onClick={() =>
                  product.inStock &&
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    slug: product.slug,
                  })
                }
                disabled={!product.inStock}
                className="p-2 bg-neon-50 text-white rounded-lg hover:bg-neon-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed horror-glow"
                aria-label="Добавить в корзину"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}


