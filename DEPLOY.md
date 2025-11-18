# Инструкция по деплою на Netlify

## Шаг 1: Подготовка базы данных Turso

1. Зайдите на [https://turso.tech](https://turso.tech)
2. Создайте аккаунт (можно через GitHub)
3. Создайте базу данных (например, `elki-db`)
4. Скопируйте Connection String (например: `libsql://elki-db-username.aws-us-east-1.turso.io`)
5. Создайте токен доступа: Settings → Tokens → Create Token
6. Скопируйте токен (показывается только один раз!)
7. Сформируйте полный connection string: `libsql://elki-db-username.aws-us-east-1.turso.io?authToken=ваш-токен`

## Шаг 2: Обновление connection string

Откройте `lib/prisma.ts` и замените:

```typescript
const DEFAULT_DATABASE_URL = 'libsql://elki-db-YOUR-USERNAME.aws-us-east-1.turso.io?authToken=YOUR-AUTH-TOKEN'
```

На свой connection string:

```typescript
const DEFAULT_DATABASE_URL = 'libsql://elki-db-username.aws-us-east-1.turso.io?authToken=ваш-токен'
```

## Шаг 3: Локальная настройка (опционально)

Для локальной разработки создайте `.env.local`:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"
```

Затем выполните:

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

## Шаг 4: Деплой на Netlify

### Вариант 1: Через GitHub

1. Загрузите код на GitHub
2. Зайдите на [https://app.netlify.com](https://app.netlify.com)
3. Нажмите "Add new site" → "Import an existing project"
4. Выберите ваш GitHub репозиторий
5. Настройки сборки:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Нажмите "Deploy site"

### Вариант 2: Через Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Шаг 5: Настройка переменных окружения (рекомендуется)

В Netlify: Site settings → Environment variables → Add variable

Добавьте:

- `DATABASE_URL` = ваш connection string с токеном
- `NEXTAUTH_SECRET` = сгенерируйте случайную строку (минимум 32 символа)
- `NEXTAUTH_URL` = URL вашего сайта на Netlify (например, `https://your-site.netlify.app`)

## Шаг 6: Выполнение миграций на продакшене

После первого деплоя выполните миграции:

```bash
# Локально с указанием production DATABASE_URL
DATABASE_URL="ваш-production-connection-string" npm run db:migrate:deploy

# Или через Netlify CLI
netlify functions:invoke --name db-migrate
```

Или выполните seed:

```bash
DATABASE_URL="ваш-production-connection-string" npm run db:seed
```

## Шаг 7: Проверка

1. Откройте ваш сайт на Netlify
2. Проверьте главную страницу
3. Зайдите в админ-панель: `/admin/login`
4. Email: `admin@elki.by`, Пароль: `admin123`
5. Проверьте создание заказа

## Важные моменты

- ✅ База данных работает в облаке (Turso)
- ✅ Connection string можно встроить в код или использовать env переменные
- ✅ Все заказы сохраняются в БД
- ✅ Админ-панель для управления товарами и просмотра заказов
- ⚠️ Смените пароль админа после первого входа!

## Troubleshooting

### Ошибка подключения к базе данных

- Проверьте connection string в `lib/prisma.ts` или в переменных окружения
- Убедитесь, что токен Turso действителен
- Проверьте, что база данных создана в Turso

### Ошибка сборки на Netlify

- Убедитесь, что `package.json` содержит все зависимости
- Проверьте, что `netlify.toml` настроен правильно
- Посмотрите логи сборки в Netlify

### Ошибка аутентификации

- Проверьте `NEXTAUTH_SECRET` в переменных окружения
- Убедитесь, что `NEXTAUTH_URL` указан правильно


