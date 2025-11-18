import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-neon-50 text-dark-50 hover:bg-neon-100 neon-glow font-bold',
    secondary: 'bg-dark-200 text-white hover:bg-dark-300',
    outline: 'border border-neon-50 text-neon-50 hover:bg-neon-50/10',
  }

  return (
    <button
      className={cn(
        'px-6 py-3 rounded-lg font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}


