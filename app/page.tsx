'use client'

import Link from 'next/link'
import { TreePine, ArrowRight, Skull, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductsPreview } from '@/components/home/ProductsPreview'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section с полноэкранным видео */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ marginTop: '-80px', paddingTop: '80px' }}>
        {/* Fullscreen Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              minHeight: '100vh',
            }}
          >
            <source src="/videos/forest-background.mp4" type="video/mp4" />
            {/* Fallback для браузеров без поддержки видео */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-100 to-dark-50" />
          </video>
          {/* Overlay для затемнения и размытия */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 horror-text text-neon-50">
              ЖИВЫЕ ЁЛКИ
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-white mb-6 font-medium">
              Которые помнят каждую зиму
            </p>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Каждая ёлка в нашем каталоге прошла через тёмные леса и готова стать частью вашего дома
            </p>
            
            {/* CTA Button */}
            <div className="mb-16">
              <Link href="/catalog">
                <Button variant="primary" className="text-lg px-8 py-4 flex items-center gap-2 mx-auto">
                  ВЫБРАТЬ ЁЛКУ
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
            </div>
            
            {/* Features Icons */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-neon-50/20 border-2 border-neon-50 flex items-center justify-center mb-3 neon-glow">
                  <Skull className="w-8 h-8 text-neon-50" />
                </div>
                <span className="text-neon-50 font-semibold text-lg">Уникальные</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-neon-50/20 border-2 border-neon-50 flex items-center justify-center mb-3 neon-glow">
                  <TreePine className="w-8 h-8 text-neon-50" />
                </div>
                <span className="text-neon-50 font-semibold text-lg">Живые</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-neon-50/20 border-2 border-neon-50 flex items-center justify-center mb-3 neon-glow">
                  <Sparkles className="w-8 h-8 text-neon-50" />
                </div>
                <span className="text-neon-50 font-semibold text-lg">Запоминающиеся</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="relative py-16 px-4 bg-dark-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 horror-text text-neon-50">
              НАШИ ЁЛКИ
            </h2>
            <p className="text-gray-400 text-lg">
              Выберите ёлку из нашей коллекции
            </p>
          </div>
          <ProductsPreview />
          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button variant="primary" className="flex items-center gap-2 mx-auto">
                СМОТРЕТЬ ВСЕ ТОВАРЫ
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-dark-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center horror-text text-neon-50">
            Почему наши ёлки особенные?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center p-8 bg-dark-200 rounded-lg border border-dark-300 hover:border-neon-50/50 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-4 text-neon-50">
                Тёмное происхождение
              </h3>
              <p className="text-gray-400 text-lg">
                Каждая ёлка выросла в самых тёмных лесах
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-8 bg-dark-200 rounded-lg border border-dark-300 hover:border-neon-50/50 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-4 text-neon-50">
                Живая энергия
              </h3>
              <p className="text-gray-400 text-lg">
                Они помнят каждую зиму и готовы поделиться историей
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-8 bg-dark-200 rounded-lg border border-dark-300 hover:border-neon-50/50 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-4 text-neon-50">
                Уникальный характер
              </h3>
              <p className="text-gray-400 text-lg">
                Ни одна ёлка не похожа на другую
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

