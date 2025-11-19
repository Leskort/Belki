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

    // Функция для скрытия панели Safari
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

    // Функция для предотвращения появления панели при скролле
    const preventSafariUI = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      // Если пользователь прокрутил вверх слишком близко к верху,
      // немного прокручиваем вниз, чтобы панель не появлялась
      if (scrollTop < 10) {
        window.scrollTo(0, 10)
      }
    }

    // Выполняем сразу при загрузке
    hideSafariUI()

    // Выполняем после полной загрузки страницы
    if (document.readyState === 'complete') {
      hideSafariUI()
    } else {
      window.addEventListener('load', hideSafariUI)
    }

    // Предотвращаем появление панели при скролле
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        preventSafariUI()
      }, 50)
    }

    // Выполняем при изменении размера окна (поворот экрана)
    const handleResize = () => {
      hideSafariUI()
    }

    // Выполняем при изменении ориентации
    const handleOrientationChange = () => {
      setTimeout(() => {
        hideSafariUI()
      }, 500)
    }

    // Добавляем обработчики событий
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)

    // Дополнительно: периодически проверяем и скрываем панель
    const intervalId = setInterval(() => {
      if (window.pageYOffset < 10) {
        window.scrollTo(0, 1)
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 50)
      }
    }, 1000)

    return () => {
      window.removeEventListener('load', hideSafariUI)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
      clearInterval(intervalId)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}

