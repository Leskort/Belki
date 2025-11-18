import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const orderSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(1),
  address: z.string().min(1),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      image: z.string().optional(),
    })
  ),
})

// POST - создать заказ
export async function POST(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'База данных не настроена. Пожалуйста, обратитесь к администратору.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const data = orderSchema.parse(body)

    // Вычисляем общую сумму
    const total = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    // Создаем заказ
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        address: data.address,
        total,
        items: JSON.stringify(data.items),
        status: 'pending',
      },
    })

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        message:
          'Заказ успешно создан! Мы свяжемся с вами в ближайшее время.',
      },
      { status: 201 }
    )
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Неверные данные', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Ошибка при создании заказа' },
      { status: 500 }
    )
  }
}

// GET - получить все заказы (только для админа)
export async function GET(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json([], { status: 200 })
    }

    // В реальном проекте здесь должна быть проверка админа
    // const admin = await requireAdmin()

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const ordersWithParsedItems = orders.map((order) => ({
      ...order,
      items: JSON.parse(order.items),
    }))

    return NextResponse.json(ordersWithParsedItems)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении заказов' },
      { status: 500 }
    )
  }
}


