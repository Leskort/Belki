import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Исключаем страницу логина из проверки
        if (req.nextUrl.pathname === '/admin/login') {
          return true
        }
        // Проверяем доступ к админ-панели
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin'
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}


