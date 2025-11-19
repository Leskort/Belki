import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateOrderSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
})

// PATCH - обновить статус заказа
export async function PATCH(
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
    const data = updateOrderSchema.parse(body)

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status: data.status },
    })

    return NextResponse.json({
      success: true,
      order: {
        ...order,
        items: JSON.parse(order.items),
      },
    })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Неверные данные', details: error.errors },
        { status: 400 }
      )
    }
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Заказ не найден' },
        { status: 404 }
      )
    }
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении заказа' },
      { status: 500 }
    )
  }
}

