'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  _count: {
    products: number
  }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return

    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      fetchCategories()
    } catch (error) {
      alert('Ошибка при удалении категории')
    }
  }

  if (loading) {
    return <div className="text-gray-400">Загрузка...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold horror-text">Категории</h1>
        <Link href="/admin/categories/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Добавить категорию
          </Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 bg-dark-200 rounded-lg border border-dark-300">
          <FolderTree className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <p className="text-gray-400 mb-4">Категории не найдены</p>
          <Link href="/admin/categories/new">
            <Button variant="primary">Добавить первую категорию</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-dark-200 rounded-lg p-6 border border-dark-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400">{category.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/categories/${category.id}`}>
                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {category.description && (
                <p className="text-gray-300 text-sm mb-4">
                  {category.description}
                </p>
              )}
              <div className="text-sm text-gray-400">
                Товаров: {category._count.products}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


