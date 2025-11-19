'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  image?: string
  inStock: boolean
  description?: string
  category?: {
    name: string
    slug: string
  }
}

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { items, addItem, updateQuantity, removeItem } = useCart()
  const cartItem = items.find(item => item.id === product.id)
  const quantity = cartItem?.quantity || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden shadow-2xl shadow-black/50 hover:border-horror-glow/50 transition-all duration-300"
    >
      <Link href={`/catalog/${product.slug}`}>
        <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
          {product.image ? (
            <>
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-horror-glow/0 group-hover:from-horror-glow/20 transition-all duration-300" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-dark-200">
              <span className="text-gray-500">Нет изображения</span>
            </div>
          )}
          
          {/* Бейдж наличия */}
          <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full backdrop-blur-md border ${
            product.inStock
              ? 'bg-horror-glow/20 border-horror-glow/50 text-horror-glow'
              : 'bg-horror-red/20 border-horror-red/50 text-horror-red'
          } text-xs font-medium flex items-center gap-1 sm:gap-1.5`}>
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              product.inStock ? 'bg-horror-glow' : 'bg-horror-red'
            } shadow-lg ${product.inStock ? 'shadow-horror-glow/50' : 'shadow-horror-red/50'}`} />
            <span className="hidden sm:inline">{product.inStock ? 'В наличии' : 'Нет в наличии'}</span>
            <span className="sm:hidden">{product.inStock ? '✓' : '✗'}</span>
          </div>
        </div>
      </Link>

      <div className="p-2 sm:p-4 space-y-1 sm:space-y-2">
        <Link href={`/catalog/${product.slug}`}>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-horror-glow transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-xs text-gray-400 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {product.category && (
          <p className="text-xs text-horror-glow font-medium hidden sm:block">
            {product.category.name.toUpperCase()}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <div>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-horror-red">
              {formatPrice(product.price)}
            </p>
            <p className="text-xs text-gray-500 hidden sm:block">за единицу</p>
          </div>
          
          {/* Кнопка корзины */}
          {product.inStock && (
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4">
              {quantity > 0 ? (
                <div className="flex items-center gap-1 sm:gap-2 bg-horror-glow/20 backdrop-blur-md border border-horror-glow/50 rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      if (quantity === 1) {
                        removeItem(product.id)
                      } else {
                        updateQuantity(product.id, quantity - 1)
                      }
                    }}
                    className="p-0.5 sm:p-1 hover:bg-horror-glow/30 rounded transition-colors"
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-horror-glow" />
                  </button>
                  <span className="text-horror-glow font-bold min-w-[16px] sm:min-w-[20px] text-center text-xs sm:text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      updateQuantity(product.id, quantity + 1)
                    }}
                    className="p-0.5 sm:p-1 hover:bg-horror-glow/30 rounded transition-colors"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-horror-glow" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      slug: product.slug,
                    })
                  }}
                  className="p-2 sm:p-3 bg-horror-glow/20 backdrop-blur-md border border-horror-glow/50 rounded-lg hover:bg-horror-glow/30 transition-colors"
                  aria-label="Добавить в корзину"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-horror-glow" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

