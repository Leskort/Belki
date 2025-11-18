import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// DATABASE_URL должен быть установлен через переменные окружения
// В Netlify: Site settings → Environment variables → Add variable
// Значение: libsql://your-db-name.turso.io?authToken=your-token

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


