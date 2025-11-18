import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - получить все товары или по slug
export async function GET(request: NextRequest) {
  try {
    // Проверяем доступность базы данных
    if (!prisma) {
      console.warn('Prisma client not initialized - DATABASE_URL not set')
      return NextResponse.json([], { status: 200 })
    }

    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')
    const limit = searchParams.get('limit')
    const category = searchParams.get('category')

    if (slug) {
      const product = await prisma.product.findMany({
        where: { slug },
        include: { category: true },
      })
      return NextResponse.json(product)
    }

    const where: any = {}
    if (category) {
      where.category = { slug: category }
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      take: limit ? parseInt(limit) : undefined,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(products)
  } catch (error: any) {
    console.error('Error fetching products:', error)
    // Возвращаем пустой массив вместо ошибки, чтобы приложение не падало
    // В продакшене это позволит сайту работать даже если БД временно недоступна
    return NextResponse.json([], { status: 200 })
  }
}

// POST - создать товар (только для админа)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, price, image, images, inStock, categoryId } = body

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        image,
        images: images ? JSON.stringify(images) : undefined,
        inStock: inStock !== undefined ? inStock : true,
        categoryId,
      },
      include: { category: true },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Ошибка при создании товара', details: error.message },
      { status: 500 }
    )
  }
}


