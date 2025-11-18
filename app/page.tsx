'use client'

import Link from 'next/link'
import { TreePine, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductsPreview } from '@/components/home/ProductsPreview'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100 to-dark-50 opacity-50" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TreePine className="w-24 h-24 mx-auto mb-6 text-forest-50 forest-glow" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 horror-text">
              ЁЛКИ
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Свежесрезанные ёлки из тёмных лесов
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
              Каждая ёлка хранит секреты многих зим. Выберите ту, что создаст
              неповторимую атмосферу вашего праздника.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/catalog">
                <Button variant="primary" className="flex items-center gap-2">
                  Смотреть каталог
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline">О нас</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 horror-text">
              Популярные товары
            </h2>
            <p className="text-gray-400 text-lg">
              Выберите ёлку из нашей коллекции
            </p>
          </div>
          <ProductsPreview />
          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button variant="outline" className="flex items-center gap-2 mx-auto">
                Смотреть все товары
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-dark-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-dark-200 rounded-lg border border-dark-300">
              <TreePine className="w-12 h-12 mx-auto mb-4 text-forest-50" />
              <h3 className="text-xl font-bold mb-2 text-white">
                Свежие ёлки
              </h3>
              <p className="text-gray-400">
                Прямо из тёмных лесов, свежесрезанные и полные жизни
              </p>
            </div>
            <div className="text-center p-6 bg-dark-200 rounded-lg border border-dark-300">
              <TreePine className="w-12 h-12 mx-auto mb-4 text-forest-50" />
              <h3 className="text-xl font-bold mb-2 text-white">
                Быстрая доставка
              </h3>
              <p className="text-gray-400">
                Доставим вашу ёлку в кратчайшие сроки
              </p>
            </div>
            <div className="text-center p-6 bg-dark-200 rounded-lg border border-dark-300">
              <TreePine className="w-12 h-12 mx-auto mb-4 text-forest-50" />
              <h3 className="text-xl font-bold mb-2 text-white">
                Установка и утилизация
              </h3>
              <p className="text-gray-400">
                Полный спектр услуг для вашего удобства
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

