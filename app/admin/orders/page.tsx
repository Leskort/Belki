'use client'

import { useEffect, useState } from 'react'
import { ShoppingBag, RefreshCw } from 'lucide-react'
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

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    fetchOrders()
    
    // Автообновление каждые 30 секунд
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchOrders()
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

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

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        fetchOrders()
      } else {
        alert('Ошибка при обновлении статуса')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Ошибка при обновлении статуса')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      case 'shipped':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50'
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Ожидает',
      confirmed: 'Подтвержден',
      shipped: 'Отправлен',
      delivered: 'Доставлен',
      cancelled: 'Отменен',
    }
    return labels[status] || status
  }

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter)

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  }

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 mx-auto mb-4 text-gray-400 animate-spin" />
          <p className="text-gray-400">Загрузка заказов...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold horror-text">Заказы</h1>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <span>Автообновление</span>
          </label>
          <button
            onClick={fetchOrders}
            className="p-2 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors"
            aria-label="Обновить"
          >
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Фильтры по статусу */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === status
                ? 'bg-neon-50 text-white horror-glow'
                : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
            }`}
          >
            {status === 'all' ? 'Все' : getStatusLabel(status)} ({statusCounts[status]})
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-dark-200 rounded-lg border border-dark-300">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <p className="text-gray-400">Заказы не найдены</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
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
                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className={`px-3 py-1 rounded text-sm font-medium border ${getStatusColor(
                      order.status
                    )} bg-transparent cursor-pointer`}
                  >
                    <option value="pending">Ожидает</option>
                    <option value="confirmed">Подтвержден</option>
                    <option value="shipped">Отправлен</option>
                    <option value="delivered">Доставлен</option>
                    <option value="cancelled">Отменен</option>
                  </select>
                </div>
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
                <span className="text-xl font-bold text-neon-50 horror-text">
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


