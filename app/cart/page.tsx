'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items,
        }),
      })

      if (response.ok) {
        clearCart()
        router.push('/cart?success=true')
      } else {
        alert('Ошибка при создании заказа')
      }
    } catch (error) {
      alert('Ошибка при создании заказа')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-500" />
          <h1 className="text-3xl font-bold mb-4 horror-text">
            Корзина пуста
          </h1>
          <p className="text-gray-400 mb-8">
            Тёмные леса ждут вашего выбора...
          </p>
          <Button variant="primary" onClick={() => router.push('/catalog')}>
            Перейти в каталог
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 horror-text">Корзина</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-dark-200 rounded-lg p-6 border border-dark-300 flex gap-4"
              >
                {item.image && (
                  <div className="relative w-24 h-24 flex-shrink-0">
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
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-neon-50 font-bold mb-4">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-neon-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-neon-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-neon-50 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-neon-50 horror-text">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Form */}
          <div className="lg:col-span-1">
            <div className="bg-dark-200 rounded-lg p-6 border border-dark-300 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Оформление заказа
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg text-white focus:outline-none focus:border-neon-50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.customerEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, customerEmail: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg text-white focus:outline-none focus:border-neon-50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, customerPhone: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg text-white focus:outline-none focus:border-neon-50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Адрес доставки
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg text-white focus:outline-none focus:border-neon-50 transition-colors resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-dark-300">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-white">Итого:</span>
                    <span className="text-2xl font-bold text-neon-50 horror-text">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Оформление...' : 'Оформить заказ'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


