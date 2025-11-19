'use client'

import { useEffect } from 'react'

export function SafariFullscreen() {
  useEffect(() => {
    // Проверяем, что это iOS Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    
    if (!isIOS || !isSafari) {
      return
    }

    // Функция для скрытия панели Safari только при загрузке
    const hideSafariUI = () => {
      // Устанавливаем правильную высоту viewport
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      
      // Принудительно скрываем панель Safari при загрузке
      // Прокручиваем немного вниз, чтобы скрыть панель
      window.scrollTo(0, 1)
      
      // Сразу возвращаемся наверх, но панель уже скрыта
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }

    // Выполняем только при загрузке
    hideSafariUI()

    // Выполняем после полной загрузки страницы
    if (document.readyState === 'complete') {
      hideSafariUI()
    } else {
      window.addEventListener('load', hideSafariUI)
    }

    // Выполняем при изменении размера окна (поворот экрана)
    const handleResize = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('load', hideSafariUI)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return null
}

