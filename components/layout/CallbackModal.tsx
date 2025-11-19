'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface CallbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Предотвращаем скролл body когда модальное окно открыто
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Здесь можно добавить отправку данных на сервер
    // Например, через API endpoint
    try {
      // await fetch('/api/callback', { method: 'POST', body: JSON.stringify(formData) })
      await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация запроса
      alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
      setFormData({ name: '', phone: '' })
      onClose()
    } catch (error) {
      alert('Ошибка при отправке заявки. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[9999] backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-dark-200 rounded-lg border border-dark-300 shadow-2xl w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-300">
                <h2 className="text-2xl font-bold text-white">Заказать звонок</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-neon-50 transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-50 transition-colors"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ваш телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-50 transition-colors"
                    placeholder="+375 (XX) XXX-XX-XX"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-neon-50 text-white rounded-lg hover:bg-neon-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Отправка...' : 'Заказать звонок'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ name: '', phone: '' })
                      onClose()
                    }}
                    className="px-4 py-3 bg-dark-300 text-gray-300 rounded-lg hover:bg-dark-400 transition-colors font-medium"
                  >
                    Сбросить
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

