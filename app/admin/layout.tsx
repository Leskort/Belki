import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { LogoutButton } from '@/components/admin/LogoutButton'
import Link from 'next/link'
import { TreePine } from 'lucide-react'
import { headers } from 'next/headers'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Получаем текущий путь из заголовка, установленного middleware
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  
  // Исключаем страницу логина из проверки авторизации
  // Если мы на странице логина, просто возвращаем children без проверки
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Проверяем сессию для всех остальных страниц админки
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== 'admin') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen scary-bg">
      {/* Header */}
      <header className="horror-border-b backdrop-blur-md bg-horror-dark/95 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-2">
              <TreePine className="w-6 h-6 text-horror-glow" />
              <span className="horror-text text-2xl text-horror-glow">АДМИН ПАНЕЛЬ</span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-horror-glow transition-colors"
              >
                На сайт
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
