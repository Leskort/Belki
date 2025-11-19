'use client'

import { useEffect } from 'react'

export function SafariFullscreen() {
  useEffect(() => {
    // Скрытие панели Safari при загрузке и прокрутке
    const hideSafariUI = () => {
      // Устанавливаем минимальную высоту viewport
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      
      // Принудительно скрываем панель Safari
      window.scrollTo(0, 1)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)
    }

    // Выполняем при загрузке
    hideSafariUI()

    // Выполняем при изменении размера окна (поворот экрана)
    window.addEventListener('resize', hideSafariUI)
    window.addEventListener('orientationchange', hideSafariUI)

    // Скрываем панель при прокрутке вниз
    let lastScrollTop = 0
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      if (scrollTop > lastScrollTop && scrollTop > 50) {
        // Прокрутка вниз - скрываем панель
        document.body.style.paddingBottom = '0'
      } else {
        // Прокрутка вверх - показываем панель (опционально)
        document.body.style.paddingBottom = 'env(safe-area-inset-bottom)'
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', hideSafariUI)
      window.removeEventListener('orientationchange', hideSafariUI)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}

