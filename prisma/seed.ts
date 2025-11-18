import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Начало заполнения базы данных...')

  // Создаем админа
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@elki.by' },
    update: {},
    create: {
      email: 'admin@elki.by',
      password: hashedPassword,
      name: 'Администратор',
      role: 'admin',
    },
  })

  console.log('✅ Админ создан:', admin.email)
  console.log('📧 Email: admin@elki.by')
  console.log('🔑 Пароль: admin123')

  // Создаем категории
  const category1 = await prisma.category.upsert({
    where: { slug: 'zhivye-elki' },
    update: {},
    create: {
      name: 'Живые ёлки',
      slug: 'zhivye-elki',
      description: 'Свежесрезанные ёлки из тёмных лесов',
      image: 'https://images.unsplash.com/photo-1482517967863-000e7e6c0e1b?w=800',
    },
  })

  const category2 = await prisma.category.upsert({
    where: { slug: 'iskusstvennye-elki' },
    update: {},
    create: {
      name: 'Искусственные ёлки',
      slug: 'iskusstvennye-elki',
      description: 'Ёлки, которые помнят каждую зиму',
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800',
    },
  })

  const category3 = await prisma.category.upsert({
    where: { slug: 'uslugi' },
    update: {},
    create: {
      name: 'Услуги',
      slug: 'uslugi',
      description: 'Дополнительные услуги для вашей ёлки',
      image: 'https://images.unsplash.com/photo-1452860606245-08c2d5c4b18a?w=800',
    },
  })

  console.log('✅ Категории созданы')

  // Создаем товары
  const products = [
    {
      name: 'Ёлка из Тёмного Леса',
      slug: 'elka-iz-temnogo-lesa',
      description: 'Эта ёлка выросла в самом тёмном лесу и помнит каждую зиму. Идеальна для тех, кто ценит атмосферу.',
      price: 150.00,
      image: 'https://images.unsplash.com/photo-1482517967863-000e7e6c0e1b?w=800',
      images: JSON.stringify(['https://images.unsplash.com/photo-1482517967863-000e7e6c0e1b?w=800']),
      inStock: true,
      categoryId: category1.id,
    },
    {
      name: 'Ёлка Призрачного Леса',
      slug: 'elka-prizrachnogo-lesa',
      description: 'Загадочная ёлка с уникальным характером. Каждая ветка рассказывает свою историю.',
      price: 200.00,
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800',
      images: JSON.stringify(['https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800']),
      inStock: true,
      categoryId: category1.id,
    },
    {
      name: 'Ёлка Забытого Леса',
      slug: 'elka-zabytogo-lesa',
      description: 'Редкая находка из забытого леса. Эта ёлка хранит секреты многих зим.',
      price: 250.00,
      image: 'https://images.unsplash.com/photo-1452860606245-08c2d5c4b18a?w=800',
      images: JSON.stringify(['https://images.unsplash.com/photo-1452860606245-08c2d5c4b18a?w=800']),
      inStock: true,
      categoryId: category1.id,
    },
    {
      name: 'Искусственная Ёлка Тьмы',
      slug: 'iskusstvennaya-elka-tmy',
      description: 'Искусственная ёлка, которая выглядит как настоящая. Не требует ухода, но создаёт атмосферу.',
      price: 180.00,
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800',
      images: JSON.stringify(['https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800']),
      inStock: true,
      categoryId: category2.id,
    },
    {
      name: 'Искусственная Ёлка Вечности',
      slug: 'iskusstvennaya-elka-vechnosti',
      description: 'Ёлка, которая будет с вами вечно. Качественная и надёжная.',
      price: 220.00,
      image: 'https://images.unsplash.com/photo-1452860606245-08c2d5c4b18a?w=800',
      images: JSON.stringify(['https://images.unsplash.com/photo-1452860606245-08c2d5c4b18a?w=800']),
      inStock: true,
      categoryId: category2.id,
    },
    {
      name: 'Установка ёлки',
      slug: 'ustanovka-elki',
      description: 'Профессиональная установка вашей ёлки. Наши специалисты сделают всё быстро и качественно.',
      price: 50.00,
      image: 'https://images.unsplash.com/photo-1452860606245-08c2d5c4b18a?w=800',
      images: JSON.stringify(['https://images.unsplash.com/photo-1452860606245-08c2d5c4b18a?w=800']),
      inStock: true,
      categoryId: category3.id,
    },
    {
      name: 'Утилизация ёлки',
      slug: 'utilizatsiya-elki',
      description: 'Экологичная утилизация вашей ёлки после праздников. Заботимся о природе.',
      price: 30.00,
      image: 'https://images.unsplash.com/photo-1452860606245-08c2d5c4b18a?w=800',
      images: JSON.stringify(['https://images.unsplash.com/photo-1452860606245-08c2d5c4b18a?w=800']),
      inStock: true,
      categoryId: category3.id,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('✅ Товары созданы')
  console.log('🎉 База данных успешно заполнена!')
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении базы данных:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


