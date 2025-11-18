import { prisma } from '@/lib/prisma'
import { Package, FolderTree, ShoppingBag, Users } from 'lucide-react'
import Link from 'next/link'

// Делаем страницу динамической, чтобы не обращаться к БД во время сборки
export const dynamic = 'force-dynamic'

async function getStats() {
  const [productsCount, categoriesCount, ordersCount, usersCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.user.count(),
    ])

  return { productsCount, categoriesCount, ordersCount, usersCount }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    {
      title: 'Товары',
      value: stats.productsCount,
      icon: Package,
      href: '/admin/products',
      color: 'text-blue-400',
    },
    {
      title: 'Категории',
      value: stats.categoriesCount,
      icon: FolderTree,
      href: '/admin/categories',
      color: 'text-green-400',
    },
    {
      title: 'Заказы',
      value: stats.ordersCount,
      icon: ShoppingBag,
      href: '/admin/orders',
      color: 'text-yellow-400',
    },
    {
      title: 'Пользователи',
      value: stats.usersCount,
      icon: Users,
      href: '#',
      color: 'text-purple-400',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 horror-text">Панель управления</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          const CardContent = (
            <div className="bg-dark-200 rounded-lg p-6 border border-dark-300 hover:border-blood-50/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-gray-400 text-sm mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          )

          if (stat.href === '#') {
            return <div key={stat.title}>{CardContent}</div>
          }

          return (
            <Link key={stat.title} href={stat.href}>
              {CardContent}
            </Link>
          )
        })}
      </div>
    </div>
  )
}


