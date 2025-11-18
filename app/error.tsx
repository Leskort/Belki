'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-50">
      <div className="text-center space-y-6 p-8">
        <AlertTriangle className="w-16 h-16 mx-auto text-neon-50 horror-glow" />
        <h1 className="text-4xl font-bold horror-text">
          Что-то пошло не так...
        </h1>
        <p className="text-gray-400 text-lg">
          Тёмные силы вмешались в работу магазина
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-neon-50 text-white rounded-lg hover:bg-neon-100 transition-colors horror-glow"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-dark-200 text-white rounded-lg hover:bg-dark-300 transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  )
}


