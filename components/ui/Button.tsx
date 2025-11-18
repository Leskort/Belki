import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'horror'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-neon-50 text-dark-50 hover:bg-neon-100 neon-glow font-bold',
    secondary: 'bg-dark-200 text-white hover:bg-dark-300',
    outline: 'border border-neon-50 text-neon-50 hover:bg-neon-50/10',
    horror: 'bg-gradient-to-r from-horror-red to-horror-blood hover:from-horror-blood hover:to-horror-red text-white font-bold shadow-lg shadow-horror-red/50',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-all',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}


