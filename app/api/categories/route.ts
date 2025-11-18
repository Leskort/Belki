import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - получить все категории
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(categories)
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    // Возвращаем пустой массив вместо ошибки
    return NextResponse.json([], { status: 200 })
  }
}

// POST - создать категорию (только для админа)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, image, parentId } = body

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        parentId: parentId || null,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Ошибка при создании категории', details: error.message },
      { status: 500 }
    )
  }
}


