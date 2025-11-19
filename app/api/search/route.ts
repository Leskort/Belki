import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - поиск товаров и категорий
export async function GET(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json({ products: [], categories: [] }, { status: 200 })
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '5')

    if (!query || query.length < 1) {
      return NextResponse.json({ products: [], categories: [] }, { status: 200 })
    }

    const searchQuery = query.toLowerCase().trim()

    // Поиск товаров
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      include: { category: true },
      take: limit,
      orderBy: { name: 'asc' },
    })

    // Поиск категорий
    const categories = await prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      take: limit,
      orderBy: { name: 'asc' },
    })

    // Подсчитываем общее количество результатов
    const [totalProducts, totalCategories] = await Promise.all([
      prisma.product.count({
        where: {
          OR: [
            { name: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
          ],
        },
      }),
      prisma.category.count({
        where: {
          OR: [
            { name: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
          ],
        },
      }),
    ])

    const totalResults = totalProducts + totalCategories

    return NextResponse.json({
      products,
      categories,
      total: totalResults,
      hasMore: totalResults > limit,
    })
  } catch (error: any) {
    console.error('Error searching:', error)
    return NextResponse.json(
      { products: [], categories: [], total: 0, hasMore: false },
      { status: 200 }
    )
  }
}

