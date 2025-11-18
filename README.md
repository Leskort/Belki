# ЁЛКИ - Магазин живых ёлок

Интернет-магазин живых ёлок на Next.js 14 с хоррор-дизайном и облачной базой данных Neon (PostgreSQL). Проект готов к продакшену на Netlify.

## Технологический стек

- **Next.js 14** (App Router) с TypeScript
- **Tailwind CSS 3.4** для стилей
- **Prisma ORM** с Neon (PostgreSQL в облаке)
- **NextAuth.js** для аутентификации
- **Framer Motion** для анимаций
- **React Hook Form + Zod** для валидации
- **Lucide React** для иконок

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка базы данных Neon

1. Зайдите на [https://neon.tech](https://neon.tech) или используйте Neon через Netlify
2. Создайте аккаунт (можно через GitHub)
3. Создайте новый проект и базу данных
4. Скопируйте Connection String из панели управления Neon
5. Connection string будет выглядеть как: `postgresql://user:password@host/database?sslmode=require`

### 3. Настройка переменных окружения

Установите `DATABASE_URL` в переменных окружения:

**Локально (создайте файл `.env.local`):**
```bash
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

**На Netlify:**
1. Site settings → Environment variables
2. Добавьте переменную `DATABASE_URL` с вашим connection string от Neon

### 4. Выполнение миграций

```bash
# Выполни миграции
npm run db:migrate

# Заполни базу данных
npm run db:seed
```

### 5. Запуск проекта

```bash
# Режим разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен-версии
npm start
```

## Доступ к админ-панели

- **URL**: `/admin/login` или `/login`
- **Email**: `admin@elki.by`
- **Пароль**: `admin123`

⚠️ **ВАЖНО**: Смените пароль после первого входа!

## Деплой на Netlify

1. Загрузите код на GitHub
2. Подключите репозиторий к Netlify
3. Netlify автоматически соберёт проект
4. После деплоя сайт будет работать с базой данных Turso!

### Опционально: Переменные окружения в Netlify

Если хотите переопределить connection string через env (более безопасно):

1. В Netlify: Site settings → Environment variables
2. Добавьте:
   - `DATABASE_URL` = ваш PostgreSQL connection string от Neon
   - `NEXTAUTH_SECRET` = сгенерируйте случайную строку (минимум 32 символа)
   - `NEXTAUTH_URL` = URL вашего сайта на Netlify

## Структура проекта

```
elki-horror-shop/
├── app/                    # Next.js App Router страницы
│   ├── admin/             # Админ-панель
│   ├── api/               # API routes
│   ├── catalog/           # Каталог товаров
│   └── ...
├── components/            # React компоненты
├── contexts/               # React контексты
├── lib/                   # Утилиты и конфигурация
├── prisma/                # Prisma схема и миграции
└── public/                # Статические файлы
```

## Скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm run start` - запуск продакшен-версии
- `npm run db:migrate` - выполнение миграций
- `npm run db:seed` - заполнение базы данных
- `npm run db:studio` - открыть Prisma Studio

## Особенности

- ✅ База данных работает в облаке (Neon PostgreSQL)
- ✅ Connection string настраивается через переменные окружения
- ✅ Готовность к продакшену на Netlify
- ✅ Админ-панель для управления товарами и заказами
- ✅ Хоррор-дизайн с анимациями
- ✅ Корзина с сохранением в localStorage
- ✅ Оформление заказов с сохранением в БД

## Лицензия

MIT


