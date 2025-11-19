'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'
import { Plus, Minus, Trash2, ShoppingCart, Search, Printer, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
  })

  // Фильтрация товаров по поисковому запросу
  const filteredItems = searchQuery
    ? items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items

  // Вычисляем общий вес (примерно, можно добавить поле weight в товары)
  const totalWeight = items.reduce((sum, item) => sum + (item.quantity * 0.3), 0)

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
      <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-neon-50 transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span>Корзина</span>
          </div>
          
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 text-gray-500" />
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 horror-text text-horror-glow">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-400 mb-4">
          <Link href="/" className="hover:text-neon-50 transition-colors">Главная</Link>
          <span className="mx-2">/</span>
          <span>Корзина</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold horror-text text-horror-glow">
            Моя корзина
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="p-2 text-gray-400 hover:text-neon-50 transition-colors"
              aria-label="Печать"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                if (confirm('Вы уверены, что хотите очистить корзину?')) {
                  clearCart()
                }
              }}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              aria-label="Очистить корзину"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Найти в корзине..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-dark-200 border border-dark-300 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <p className="text-gray-300">
            В корзине {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {filteredItems.length === 0 ? (
              <div className="bg-dark-200 rounded-lg p-8 border border-dark-300 text-center">
                <p className="text-gray-400">Товары не найдены</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-dark-200 rounded-lg p-4 sm:p-6 border border-dark-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image */}
                    {item.image && (
                      <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    
                    {/* Product Info */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          Цена за 1 шт {formatPrice(item.price)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 border border-dark-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-gray-400 hover:text-neon-50 transition-colors"
                              aria-label="Уменьшить"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center text-white font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-gray-400 hover:text-neon-50 transition-colors"
                              aria-label="Увеличить"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            aria-label="Удалить"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total Price */}
                      <div className="text-right sm:text-left">
                        <p className="text-lg sm:text-xl font-bold text-neon-50 horror-text">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-dark-200 rounded-lg p-6 border border-dark-300 sticky top-24 space-y-6">
              {/* Coupon Code */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Введите код купона для скидки
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Код купона"
                    className="flex-1 px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-50 transition-colors"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Здесь можно добавить логику применения купона
                      alert('Функция применения купона будет добавлена')
                    }}
                  >
                    Применить
                  </Button>
                </div>
              </div>

              {/* Order Total */}
              <div className="pt-4 border-t border-dark-300 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Итого:</span>
                  <span className="text-2xl font-bold text-neon-50 horror-text">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Общий вес:</span>
                  <span>{totalWeight.toFixed(1)} кг</span>
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-dark-300">
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

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full bg-neon-50 hover:bg-neon-100 text-white font-bold py-4 text-lg"
                  disabled={loading}
                >
                  {loading ? 'Оформление...' : 'Оформить заказ'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


