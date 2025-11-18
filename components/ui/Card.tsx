import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-horror-dark/80 via-horror-dark/60 to-horror-darker/80 backdrop-blur-xl rounded-lg p-6 border border-white/10',
        hover && 'hover:border-horror-glow/50 transition-all duration-300 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}


