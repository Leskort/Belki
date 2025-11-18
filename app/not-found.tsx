import Link from 'next/link'
import { TreePine } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-50">
      <div className="text-center space-y-6 p-8">
        <TreePine className="w-24 h-24 mx-auto text-forest-50 forest-glow" />
        <h1 className="text-6xl font-bold horror-text">404</h1>
        <h2 className="text-3xl font-bold text-white">
          Страница потерялась в тёмном лесу
        </h2>
        <p className="text-gray-400 text-lg">
          Этой страницы не существует в нашем магазине
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-blood-50 text-white rounded-lg hover:bg-blood-100 transition-colors horror-glow"
        >
          Вернуться в магазин
        </Link>
      </div>
    </div>
  )
}


