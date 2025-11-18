import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// DATABASE_URL должен быть установлен через переменные окружения
// В Netlify: Site settings → Environment variables → Add variable
// Для Neon: postgresql://user:password@host/database?sslmode=require
// Или используйте Neon connection string из панели управления
// Также поддерживается NETLIFY_DATABASE_URL (автоматически создается Neon)

// Если DATABASE_URL не установлен, но есть NETLIFY_DATABASE_URL, используем его
if (!process.env.DATABASE_URL && process.env.NETLIFY_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.NETLIFY_DATABASE_URL
}

// Проверяем, что connection string правильный
if (process.env.DATABASE_URL) {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
    console.error('⚠️ DATABASE_URL должен начинаться с postgresql:// или postgres://')
    console.error('Текущее значение начинается с:', dbUrl.substring(0, 30) + '...')
    console.error('Если вы используете Neon через Netlify, убедитесь, что NETLIFY_DATABASE_URL установлен')
  }
}

// Создаём Prisma Client только если DATABASE_URL установлен
// Если нет - будет использован fallback в API routes
let prismaInstance: PrismaClient | null = null

if (process.env.DATABASE_URL) {
  try {
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance
    }
  } catch (error) {
    console.error('Failed to initialize Prisma Client:', error)
    prismaInstance = null
  }
}

// Экспортируем prisma, но он может быть null если DATABASE_URL не установлен
export const prisma = prismaInstance

// Функция для проверки доступности базы данных
export async function isDatabaseAvailable(): Promise<boolean> {
  if (!prisma) {
    return false
  }
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection error:', error)
    return false
  }
}


