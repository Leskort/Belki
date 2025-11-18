import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-dark-200 rounded-lg p-6 border border-dark-300',
        className
      )}
    >
      {children}
    </div>
  )
}


