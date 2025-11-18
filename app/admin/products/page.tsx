'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Package } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  image?: string
  inStock: boolean
  category: {
    name: string
  }
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      fetchProducts()
    } catch (error) {
      alert('Ошибка при удалении товара')
    }
  }

  if (loading) {
    return <div className="text-gray-400">Загрузка...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold horror-text">Товары</h1>
        <Link href="/admin/products/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Добавить товар
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-dark-200 rounded-lg border border-dark-300">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <p className="text-gray-400 mb-4">Товары не найдены</p>
          <Link href="/admin/products/new">
            <Button variant="primary">Добавить первый товар</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-dark-200 rounded-lg border border-dark-300 overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-300">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Изображение
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Название
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Категория
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Цена
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  В наличии
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-300">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-dark-300/50">
                  <td className="px-6 py-4">
                    {product.image ? (
                      <div className="relative w-16 h-16">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-dark-300 rounded flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{product.name}</div>
                    <div className="text-sm text-gray-400">{product.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {product.category.name}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        product.inStock
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {product.inStock ? 'Да' : 'Нет'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/${product.id}`}>
                        <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


