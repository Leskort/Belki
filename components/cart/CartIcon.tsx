'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { CartModal } from './CartModal'
import { useState } from 'react'

export function CartIcon() {
  const { itemCount } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-300 hover:text-blood-50 transition-colors"
        aria-label="Корзина"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blood-50 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center horror-glow">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </button>
      <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}


