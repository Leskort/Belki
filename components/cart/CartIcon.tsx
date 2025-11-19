'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export function CartIcon() {
  const { itemCount } = useCart()

  return (
    <Link
      href="/cart"
      className="relative p-2 text-gray-300 hover:text-neon-50 transition-colors"
      aria-label="Корзина"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-neon-50 text-dark-50 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center neon-glow">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  )
}


