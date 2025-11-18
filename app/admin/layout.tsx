import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { LogoutButton } from '@/components/admin/LogoutButton'
import Link from 'next/link'
import { TreePine, Package, FolderTree, ShoppingBag } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user || user.role !== 'admin') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-dark-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-dark-100 border-r border-dark-300 min-h-screen p-6">
          <div className="mb-8">
            <Link href="/admin" className="flex items-center gap-2">
              <TreePine className="w-8 h-8 text-forest-50" />
              <span className="text-xl font-bold horror-text">Админ-панель</span>
            </Link>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-dark-200 hover:text-white transition-colors"
            >
              <TreePine className="w-5 h-5" />
              <span>Главная</span>
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-dark-200 hover:text-white transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Товары</span>
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-dark-200 hover:text-white transition-colors"
            >
              <FolderTree className="w-5 h-5" />
              <span>Категории</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-dark-200 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Заказы</span>
            </Link>
          </nav>

          <div className="mt-8 pt-8 border-t border-dark-300">
            <LogoutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}


