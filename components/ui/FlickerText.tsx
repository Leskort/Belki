'use client'

import { ReactNode } from 'react'

interface FlickerTextProps {
  children: ReactNode
  className?: string
}

export function FlickerText({ children, className = '' }: FlickerTextProps) {
  return (
    <span className={`flicker ${className}`}>
      {children}
    </span>
  )
}

