import { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma, isDatabaseAvailable } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// ДЕФОЛТНЫЙ СЕКРЕТ (замени на свой для продакшена!)
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'elki-horror-shop-secret-key-change-in-production-min-32-chars'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const dbAvailable = await isDatabaseAvailable()
          
          if (!dbAvailable) {
            console.log('⚠️ База данных недоступна')
            return null
          }

          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const email = credentials.email.trim().toLowerCase()
          const user = await prisma.user.findUnique({
            where: { email }
          })

          if (!user) {
            return null
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)

          if (!isValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('Error in authorize:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  secret: NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== 'admin') {
    throw new Error('Forbidden')
  }
  return user
}


