import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// ДЕФОЛТНЫЙ CONNECTION STRING ДЛЯ TURSO (встроен в код!)
// Замени на свой connection string после создания базы на turso.tech
const DEFAULT_DATABASE_URL = process.env.DATABASE_URL || 
  'libsql://elki-db-leskort.aws-us-east-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjM0NzgzMzEsImlkIjoiYjRlZmE0MzEtNjliMy00ZWQ1LWI3YWYtN2I4ZTJiNzNjMWEzIiwicmlkIjoiYjFmMjNhZmQtNzY0ZS00OGI0LWJhMWUtN2NiNWRhYTdmNzc3In0.c1yeI6t5pJyjMztKh_lpl-aRa7pCmBVKbaLiwR4nluwmFbzRuAAZ8bmRPRBtpMJqqNVL2GckbVlf0xpqWmisAg'

// Устанавливаем DATABASE_URL если его нет
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = DEFAULT_DATABASE_URL
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Функция для проверки доступности базы данных
export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection error:', error)
    return false
  }
}


