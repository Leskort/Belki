'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlowEffectProps {
  children: ReactNode
  className?: string
}

export function GlowEffect({ children, className = '' }: GlowEffectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 bg-horror-glow/10 blur-xl rounded-lg" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}

