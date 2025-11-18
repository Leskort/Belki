import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - получить товар по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'База данных не настроена' },
        { status: 503 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Товар не найден' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении товара' },
      { status: 500 }
    )
  }
}

// PUT - обновить товар (только для админа)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'База данных не настроена' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, slug, description, price, image, images, inStock, categoryId } = body

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description,
        price: price ? parseFloat(price) : undefined,
        image,
        images: images ? JSON.stringify(images) : undefined,
        inStock,
        categoryId,
      },
      include: { category: true },
    })

    return NextResponse.json(product)
  } catch (error: any) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении товара', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE - удалить товар (только для админа)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'База данных не настроена' },
        { status: 503 }
      )
    }

    await prisma.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Ошибка при удалении товара' },
      { status: 500 }
    )
  }
}


