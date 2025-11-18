'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { slugify } from '@/lib/utils'
import { categorySchema, type CategoryFormData } from '@/lib/validations/category'
import Image from 'next/image'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string | null
  parent?: Category | null
  children?: Category[]
  _count?: {
    products: number
  }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  
  // Form state
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    image: '',
    parentId: null,
  })
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      if (Array.isArray(data)) setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: slugify(name),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError('')

    try {
      const validated = categorySchema.parse(formData)
      
      // Проверка: нельзя выбрать саму себя как родителя
      if (editingCategory && validated.parentId === editingCategory.id) {
        throw new Error('Категория не может быть родителем самой себя')
      }

      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : '/api/categories'
      const method = editingCategory ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Ошибка при сохранении')
      }

      setShowForm(false)
      setEditingCategory(null)
      resetForm()
      fetchCategories()
    } catch (error: any) {
      setFormError(error.message || 'Ошибка при сохранении категории')
    } finally {
      setFormLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '',
      parentId: null,
    })
    setFormError('')
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image: category.image || '',
      parentId: category.parentId || null,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию? Все товары в ней также будут удалены.')) return

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Ошибка при удалении')
      fetchCategories()
    } catch (error) {
      alert('Ошибка при удалении категории')
    }
  }

  const getCategoryPath = (category: Category): string => {
    const path: string[] = []
    let current: Category | undefined = category
    
    while (current) {
      path.unshift(current.name)
      current = categories.find(c => c.id === current?.parentId) || undefined
    }
    
    return path.join(' > ')
  }

  // Фильтруем категории для выбора родителя (исключаем редактируемую)
  const availableParents = categories.filter(
    (cat) => !editingCategory || cat.id !== editingCategory.id
  )

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Загрузка...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderTree className="w-8 h-8 text-horror-glow" />
          <h1 className="horror-text text-3xl md:text-4xl text-horror-glow">
            КАТАЛОГИ
          </h1>
        </div>
        <Button
          variant="horror"
          onClick={() => {
            resetForm()
            setEditingCategory(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Добавить
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingCategory ? 'Редактировать категорию' : 'Новая категория'}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Название категории *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  disabled={formLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL-адрес (Slug) *
                </label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  disabled={formLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Описание категории
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                disabled={formLoading}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Изображение категории (URL)
                </label>
                <Input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  disabled={formLoading}
                />
                {formData.image && (
                  <div className="mt-2 relative w-32 h-32 border border-white/20 rounded">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      unoptimized
                      className="object-cover rounded"
                      onError={() => setFormData({ ...formData, image: '' })}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Родительская категория
                </label>
                <Select
                  value={formData.parentId || ''}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value || null })}
                  disabled={formLoading}
                >
                  <option value="">Без родителя</option>
                  {availableParents.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {formError && (
              <div className="horror-border border-horror-red p-3 rounded-lg bg-horror-red/10">
                <p className="text-horror-red text-sm">{formError}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="horror"
                disabled={formLoading}
              >
                {formLoading ? 'Сохранение...' : 'Сохранить'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowForm(false)
                  setEditingCategory(null)
                  resetForm()
                }}
                disabled={formLoading}
              >
                Отмена
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Categories List */}
      {categories.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <FolderTree className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400 mb-4">Категории не найдены</p>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} hover>
              <div className="space-y-4">
                {category.image && (
                  <div className="relative w-24 h-24 mx-auto horror-border rounded overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-xl text-horror-glow font-bold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    /{category.slug}
                  </p>
                  {category.description && (
                    <p className="text-gray-400 text-sm mb-4">
                      {category.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-sm text-gray-400">
                  {category.parent && (
                    <p>
                      <span className="text-gray-500">Родитель:</span>{' '}
                      {category.parent.name}
                    </p>
                  )}
                  {category.children && category.children.length > 0 && (
                    <p>
                      <span className="text-gray-500">Подкатегорий:</span>{' '}
                      {category.children.length}
                    </p>
                  )}
                  {category._count && (
                    <p>
                      <span className="text-gray-500">Товаров:</span>{' '}
                      {category._count.products}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(category)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                    className="text-horror-red hover:text-horror-red"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
