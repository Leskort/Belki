'use client'

import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  total: number
  status: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  createdAt: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-400'
      case 'shipped':
        return 'bg-purple-500/20 text-purple-400'
      case 'delivered':
        return 'bg-green-500/20 text-green-400'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  if (loading) {
    return <div className="text-gray-400">Загрузка...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 horror-text">Заказы</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-dark-200 rounded-lg border border-dark-300">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <p className="text-gray-400">Заказы не найдены</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-dark-200 rounded-lg p-6 border border-dark-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Заказ #{order.id.slice(0, 8)}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleString('ru-RU')}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Клиент</p>
                  <p className="text-white">{order.customerName}</p>
                  <p className="text-gray-300 text-sm">{order.customerEmail}</p>
                  <p className="text-gray-300 text-sm">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Адрес доставки</p>
                  <p className="text-white">{order.address}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Товары:</p>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm bg-dark-300 rounded p-2"
                    >
                      <span className="text-gray-300">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-dark-300">
                <span className="text-lg font-bold text-white">Итого:</span>
                <span className="text-xl font-bold text-blood-50 horror-text">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


