# ЁЛКИ - Магазин живых ёлок

Интернет-магазин живых ёлок на Next.js 14 с хоррор-дизайном и облачной базой данных Turso. Проект готов к продакшену на Netlify.

## Технологический стек

- **Next.js 14** (App Router) с TypeScript
- **Tailwind CSS 3.4** для стилей
- **Prisma ORM** с Turso (SQLite в облаке)
- **NextAuth.js** для аутентификации
- **Framer Motion** для анимаций
- **React Hook Form + Zod** для валидации
- **Lucide React** для иконок

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка базы данных Turso

1. Зайдите на [https://turso.tech](https://turso.tech)
2. Создайте аккаунт (можно через GitHub)
3. Создайте базу данных (например, `elki-db`)
4. Скопируйте Connection String
5. Создайте токен доступа: Settings → Tokens → Create Token
6. Скопируйте токен (показывается только один раз!)

### 3. Обновление connection string

Откройте `lib/prisma.ts` и замените:

```typescript
const DEFAULT_DATABASE_URL = 'libsql://elki-db-YOUR-USERNAME.aws-us-east-1.turso.io?authToken=YOUR-AUTH-TOKEN'
```

На свой connection string с токеном:

```typescript
const DEFAULT_DATABASE_URL = 'libsql://elki-db-username.aws-us-east-1.turso.io?authToken=тут-твой-токен'
```

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
   - `DATABASE_URL` = ваш connection string с токеном
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

- ✅ База данных работает в облаке (Turso)
- ✅ Connection string встроен в код (можно переопределить через env)
- ✅ Готовность к продакшену на Netlify
- ✅ Админ-панель для управления товарами и заказами
- ✅ Хоррор-дизайн с анимациями
- ✅ Корзина с сохранением в localStorage
- ✅ Оформление заказов с сохранением в БД

## Лицензия

MIT


