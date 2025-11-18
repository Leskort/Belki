# Исправление ошибки подключения к базе данных в Netlify

## Проблема

Ошибка: `the URL must start with the protocol postgresql:// or postgres://`

Это означает, что переменная `DATABASE_URL` в Netlify не содержит правильный PostgreSQL connection string.

## Решение

### Вариант 1: Использовать NETLIFY_DATABASE_URL (рекомендуется)

Если вы используете Neon через Netlify, переменная `NETLIFY_DATABASE_URL` уже создана автоматически и содержит правильный connection string.

**Код уже обновлен** - он автоматически использует `NETLIFY_DATABASE_URL`, если `DATABASE_URL` не установлен.

Просто убедитесь, что:
1. В Netlify есть переменная `NETLIFY_DATABASE_URL` (создается автоматически Neon)
2. Пересоберите сайт после обновления кода

### Вариант 2: Обновить DATABASE_URL вручную

1. Зайдите в Netlify: **Site settings** → **Environment variables**
2. Найдите переменную `DATABASE_URL`
3. Убедитесь, что значение начинается с `postgresql://` или `postgres://`
4. Если нет - обновите значение:
   - Скопируйте значение из `NETLIFY_DATABASE_URL` (нажмите на глаз, чтобы увидеть)
   - Или используйте ваш connection string от Neon в формате:
     ```
     postgresql://user:password@host/database?sslmode=require
     ```

### Вариант 3: Удалить неправильный DATABASE_URL

Если `DATABASE_URL` содержит неправильное значение:

1. В Netlify: **Site settings** → **Environment variables**
2. Найдите `DATABASE_URL`
3. Нажмите на три точки (Options) → **Delete**
4. Код автоматически будет использовать `NETLIFY_DATABASE_URL`

## Проверка

После обновления:

1. Пересоберите сайт в Netlify: **Deploys** → **Trigger deploy** → **Deploy site**
2. Проверьте логи сборки - не должно быть ошибок о DATABASE_URL
3. Попробуйте зайти на сайт и проверить работу

## Формат connection string

Правильный формат для Neon PostgreSQL:
```
postgresql://user:password@host/database?sslmode=require
```

Или с дополнительными параметрами:
```
postgresql://user:password@host/database?channel_binding=require&sslmode=require
```

## Важные переменные в Netlify

Убедитесь, что установлены:

- ✅ `NETLIFY_DATABASE_URL` (создается автоматически Neon) - **используется автоматически**
- ✅ `NEXTAUTH_SECRET` - секретный ключ (минимум 32 символа)
- ✅ `NEXTAUTH_URL` - URL вашего сайта (например: `https://elkii.netlify.app`)

## После исправления

После того как connection string будет правильным:

1. Выполните миграции локально:
   ```bash
   export DATABASE_URL="ваш-postgresql-connection-string"
   npm run db:migrate:deploy
   ```

2. Заполните базу данных:
   ```bash
   npm run db:seed
   ```

3. Попробуйте войти в админку:
   - URL: `https://elkii.netlify.app/admin/login`
   - Email: `admin@elki.by`
   - Пароль: `admin123`

