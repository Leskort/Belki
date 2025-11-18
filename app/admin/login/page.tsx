'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { TreePine } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { GlowEffect } from '@/components/ui/GlowEffect'
import { FlickerText } from '@/components/ui/FlickerText'
import { motion } from 'framer-motion'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Неверный email или пароль')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('Произошла ошибка при входе')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center scary-bg">
      <GlowEffect className="w-full max-w-md mx-4">
        <Card className="horror-border p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 text-horror-glow mx-auto mb-4"
            >
              <TreePine className="w-full h-full" />
            </motion.div>
            <h1 className="horror-text text-3xl text-horror-glow mb-4">
              <FlickerText>ВХОД В АДМИНКУ</FlickerText>
            </h1>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@elki.by"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Пароль
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="horror-border border-horror-red p-3 rounded-lg bg-horror-red/10">
                <p className="text-horror-red text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="horror"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Вход...' : 'ВОЙТИ'}
            </Button>
          </form>
        </Card>
      </GlowEffect>
    </div>
  )
}

