'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Package, Search, List, Grid3x3, Eye, ImageIcon, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { formatPrice, slugify } from '@/lib/utils'
import { productSchema, type ProductFormData } from '@/lib/validations/product'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  price: number
  image?: string
  inStock: boolean
  category: {
    id: string
    name: string
    slug: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
}

type ViewMode = 'table' | 'grid'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStock, setSelectedStock] = useState<string>('all')
  
  // Form state
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    description: '',
    price: 0,
    image: '',
    inStock: true,
    categoryId: '',
  })
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ])
      
      const productsData = await productsRes.json()
      const categoriesData = await categoriesRes.json()
      
      if (Array.isArray(productsData)) setProducts(productsData)
      if (Array.isArray(categoriesData)) setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching data:', error)
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
      const validated = productSchema.parse(formData)
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'

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
      setEditingProduct(null)
      resetForm()
      fetchData()
    } catch (error: any) {
      setFormError(error.message || 'Ошибка при сохранении товара')
    } finally {
      setFormLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: 0,
      image: '',
      inStock: true,
      categoryId: '',
    })
    setFormError('')
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price,
      image: product.image || '',
      inStock: product.inStock,
      categoryId: product.category.id,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Ошибка при удалении')
      fetchData()
    } catch (error) {
      alert('Ошибка при удалении товара')
    }
  }

  // Filtering
  const filteredProducts = products.filter((product) => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedCategory !== 'all' && product.category.slug !== selectedCategory) {
      return false
    }
    if (selectedStock === 'inStock' && !product.inStock) return false
    if (selectedStock === 'outOfStock' && product.inStock) return false
    return true
  })

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
          <Package className="w-8 h-8 text-horror-glow" />
          <h1 className="horror-text text-3xl md:text-4xl text-horror-glow">
            ТОВАРЫ
          </h1>
        </div>
        <Button
          variant="horror"
          onClick={() => {
            resetForm()
            setEditingProduct(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Добавить
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск по названию товара..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Категория
              </label>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Все категории</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Наличие
              </label>
              <Select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
              >
                <option value="all">Все товары</option>
                <option value="inStock">В наличии</option>
                <option value="outOfStock">Нет в наличии</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Вид
              </label>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'table' ? 'horror' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="flex-1"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'horror' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-gray-300 text-sm">
              Найдено товаров: {filteredProducts.length} из {products.length}
            </p>
          </div>
        </div>
      </Card>

      {/* Form */}
      {showForm && (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingProduct ? 'Редактировать товар' : 'Новый товар'}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Название товара *
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
                Описание товара
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                disabled={formLoading}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Цена (BYN) *
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                  disabled={formLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Категория *
                </label>
                <Select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                  disabled={formLoading}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Фотография товара (URL)
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

            <div className="horror-border p-4 rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  disabled={formLoading}
                  className="w-4 h-4"
                />
                <span className="text-gray-300">Товар в наличии</span>
              </label>
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
                  setEditingProduct(null)
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

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400 mb-4">Товары не найдены</p>
          </div>
        </Card>
      ) : viewMode === 'table' ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Фото</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Название</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Категория</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Цена</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Наличие</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-white/5 hover:bg-horror-dark/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      {product.image ? (
                        <div className="relative w-16 h-16">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            unoptimized
                            className="object-cover rounded"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-dark-200 rounded flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{product.name}</div>
                      {product.description && (
                        <div className="text-sm text-gray-400 line-clamp-1">
                          {product.description}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {product.category.name}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          product.inStock
                            ? 'bg-horror-glow/20 text-horror-glow border border-horror-glow/50'
                            : 'bg-horror-red/20 text-horror-red border border-horror-red/50'
                        }`}
                      >
                        {product.inStock ? 'В наличии' : 'Нет в наличии'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/catalog/${product.slug}`}>
                          <button className="p-2 text-gray-400 hover:text-horror-glow transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-horror-red transition-colors"
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
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} hover>
              <div className="space-y-4">
                <div className="relative h-48 bg-dark-200 rounded overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-500" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        product.inStock
                          ? 'bg-horror-glow/20 text-horror-glow border border-horror-glow/50'
                          : 'bg-horror-red/20 text-horror-red border border-horror-red/50'
                      }`}
                    >
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                      {product.description}
                    </p>
                  )}
                  <p className="text-xs text-horror-glow mb-2">
                    {product.category.name.toUpperCase()}
                  </p>
                  <p className="text-2xl font-bold text-horror-red">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <Link href={`/catalog/${product.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Посмотреть
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
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
