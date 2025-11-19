'use client'

import Link from 'next/link'
import { TreePine, ArrowRight, Star, Sparkles, ChevronDown, ArrowUpDown, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductsPreview } from '@/components/home/ProductsPreview'
import { Button } from '@/components/ui/Button'
import { FlickerText } from '@/components/ui/FlickerText'
import { useEffect, useRef, useState } from 'react'

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    // Принудительно запускаем видео при загрузке страницы
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error)
        setVideoError(true)
      })
    }

    // Параллакс эффект - слежение за курсором
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Fullscreen Background Video */}
      {!videoError && (
        <div className="fixed inset-0 w-full h-full z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          >
            <source src="/videos/forest-background.mp4" type="video/mp4" />
            <source src="/videos/horror-background.mp4" type="video/mp4" />
          </video>
          {/* Overlay для затемнения */}
          <div className="absolute inset-0 bg-gradient-to-b from-horror-dark/80 via-horror-dark/60 to-horror-darker/80" />
        </div>
      )}

      {/* Параллакс эффект - градиентное свечение */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden z-10 -mt-16 sm:-mt-20 pt-24 sm:pt-28 md:pt-20 md:items-center md:justify-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-20 text-center flex-1 flex flex-col justify-between md:justify-center md:space-y-6">
          {/* Верхняя часть: текст */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 md:space-y-6"
          >
            {/* Main Title */}
            <h1 className="horror-text text-4xl sm:text-5xl md:text-7xl lg:text-9xl mb-4 sm:mb-6 text-horror-glow">
              <FlickerText>ЖИВЫЕ ЁЛКИ</FlickerText>
            </h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 text-gray-300"
            >
              Которые помнят каждую зиму
            </motion.p>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 md:mb-12 text-gray-400 max-w-2xl mx-auto px-2"
            >
              Каждая ёлка в нашем каталоге прошла через тёмные леса и готова стать частью вашего дома
            </motion.p>
          </motion.div>
          
          {/* Нижняя часть: иконки и кнопка (на мобильных) */}
          <div className="flex flex-col justify-end md:block md:space-y-6 mt-4 sm:mt-6 md:mt-0">
            {/* Feature Icons */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-3"
                >
                  <Star className="w-full h-full fill-white" />
                </motion.div>
                <span className="text-xs sm:text-sm text-gray-300">Уникальные</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-3"
                >
                  <TreePine className="w-full h-full" />
                </motion.div>
                <span className="text-xs sm:text-sm text-gray-300">Живые</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-3"
                >
                  <Sparkles className="w-full h-full" />
                </motion.div>
                <span className="text-xs sm:text-sm text-gray-300">Запоминающиеся</span>
              </motion.div>
            </div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="pb-8 sm:pb-12 md:pb-0 md:mt-8 md:mt-12"
            >
              <Link href="/catalog">
                <Button variant="primary" className="text-lg px-8 py-4 flex items-center gap-2 mx-auto bg-gradient-to-r from-horror-red to-horror-blood hover:from-horror-blood hover:to-horror-red shadow-lg shadow-horror-red/50">
                  ВЫБРАТЬ ЁЛКУ
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="relative py-16 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="horror-text text-4xl md:text-5xl font-bold mb-4 text-white horror-border inline-block px-8 py-4">
              НАШИ ЁЛКИ
            </h2>
            <p className="text-gray-300 text-lg mt-4">
              Выберите ёлку из нашей коллекции
            </p>
          </div>
          <ProductsPreview />
          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button variant="primary" className="flex items-center gap-2 mx-auto bg-gradient-to-r from-horror-red to-horror-blood hover:from-horror-blood hover:to-horror-red shadow-lg shadow-horror-red/50">
                СМОТРЕТЬ ВСЕ ТОВАРЫ
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="horror-border p-6 sm:p-12 text-center">
            <h2 className="horror-text text-3xl sm:text-4xl md:text-5xl mb-6 text-horror-glow">
              Почему наши ёлки особенные?
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-xl text-horror-glow mb-2 font-bold">
                  Тёмное происхождение
                </h3>
                <p className="text-gray-400">
                  Каждая ёлка выросла в самых тёмных лесах
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <h3 className="text-xl text-horror-glow mb-2 font-bold">
                  Живая энергия
                </h3>
                <p className="text-gray-400">
                  Они помнят каждую зиму и готовы поделиться историей
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <h3 className="text-xl text-horror-glow mb-2 font-bold">
                  Уникальный характер
                </h3>
                <p className="text-gray-400">
                  Ни одна ёлка не похожа на другую
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative horror-border-t mt-20 backdrop-blur-sm bg-horror-dark/30 py-8 z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            © 2024 Ёлки из Тьмы. Все права защищены.
          </p>
          <p className="text-gray-500 text-sm">
            Цены в белорусских рублях (BYN)
          </p>
        </div>
      </footer>
    </div>
  )
}
