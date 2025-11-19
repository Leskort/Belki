'use client'

import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Предотвращаем скролл body когда модальное окно открыто
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted) return null

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[9999] backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 md:w-[28rem] bg-dark-100 z-[9999] shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold horror-text">Корзина</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-neon-50 transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items */}
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg mb-4">
                    Корзина пуста
                  </p>
                  <p className="text-gray-500 text-sm">
                    Тёмные леса ждут вашего выбора...
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-dark-200 rounded-lg"
                      >
                        {item.image && (
                          <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              unoptimized
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium text-white mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 text-gray-400 hover:text-neon-50 transition-colors"
                            aria-label="Уменьшить"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 text-gray-400 hover:text-neon-50 transition-colors"
                            aria-label="Увеличить"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-gray-400 hover:text-neon-50 transition-colors ml-2"
                            aria-label="Удалить"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-dark-300 pt-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-white">Итого:</span>
                      <span className="text-xl font-bold text-neon-50 horror-text">
                        {formatPrice(total)}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        href="/cart"
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-neon-50 text-white rounded-lg hover:bg-neon-100 transition-colors text-center font-medium horror-glow"
                      >
                        Оформить заказ
                      </Link>
                      <button
                        onClick={clearCart}
                        className="px-4 py-3 bg-dark-200 text-gray-300 rounded-lg hover:bg-dark-300 transition-colors"
                      >
                        Очистить
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}


