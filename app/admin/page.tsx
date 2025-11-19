'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TreePine, FolderTree, Package, TrendingUp, BookOpen, ArrowRight, HelpCircle, ShoppingBag } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'

interface Stats {
  categoriesCount: number
  productsCount: number
  inStockCount: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    categoriesCount: 0,
    productsCount: 0,
    inStockCount: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((products) => {
        if (Array.isArray(products)) {
          const inStock = products.filter((p: any) => p.inStock).length
          setStats({
            productsCount: products.length,
            inStockCount: inStock,
            categoriesCount: 0,
          })
        }
      })
      .catch(console.error)

    fetch('/api/categories')
      .then((res) => res.json())
      .then((categories) => {
        if (Array.isArray(categories)) {
          setStats((prev) => ({
            ...prev,
            categoriesCount: categories.length,
          }))
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Загрузка статистики...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <TreePine className="w-8 h-8 text-horror-glow" />
          <h1 className="horror-text text-3xl md:text-4xl text-horror-glow">
            Панель управления магазином
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Управляйте каталогом, товарами и настройками...
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full">
            <div className="flex items-center justify-between mb-4">
              <FolderTree className="w-16 h-16 text-horror-glow opacity-30" />
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Категорий</h3>
            <p className="text-4xl text-horror-glow font-bold mb-2">
              {stats.categoriesCount}
            </p>
            <p className="text-gray-500 text-sm">Основных разделов каталога</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-16 h-16 text-horror-glow opacity-30" />
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Всего товаров</h3>
            <p className="text-4xl text-horror-glow font-bold mb-2">
              {stats.productsCount}
            </p>
            <p className="text-gray-500 text-sm">Товаров в каталоге</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-16 h-16 text-horror-glow opacity-30" />
            </div>
            <h3 className="text-gray-400 text-sm mb-2">В наличии</h3>
            <p className="text-4xl text-horror-glow font-bold mb-2">
              {stats.inStockCount}
            </p>
            <p className="text-gray-500 text-sm">Доступно для покупки</p>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-horror-glow" />
          <h2 className="horror-text text-2xl text-horror-glow">
            Управление каталогом
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/categories">
            <Card hover className="group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-horror-glow/20 group-hover:bg-horror-glow/30 rounded-lg flex items-center justify-center transition-colors">
                    <FolderTree className="w-6 h-6 text-horror-glow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Категории и разделы
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Управление категориями товаров
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-horror-glow group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>

          <Link href="/admin/products">
            <Card hover className="group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-horror-glow/20 group-hover:bg-horror-glow/30 rounded-lg flex items-center justify-center transition-colors">
                    <Package className="w-6 h-6 text-horror-glow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Товары
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Управление товарами каталога
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-horror-glow group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>

          <Link href="/admin/orders">
            <Card hover className="group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-horror-glow/20 group-hover:bg-horror-glow/30 rounded-lg flex items-center justify-center transition-colors">
                    <ShoppingBag className="w-6 h-6 text-horror-glow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Заказы
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Просмотр и управление заказами
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-horror-glow group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Tips */}
      <Card>
        <div className="flex items-start gap-4">
          <HelpCircle className="w-6 h-6 text-horror-glow flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Подсказки</h3>
            <ol className="space-y-2 text-gray-400 list-decimal list-inside">
              <li>Создайте категории для организации товаров</li>
              <li>Добавьте товары в соответствующие категории</li>
              <li>Проверьте наличие товаров перед публикацией</li>
              <li>Проверьте сайт после внесения изменений</li>
            </ol>
          </div>
        </div>
      </Card>
    </div>
  )
}
