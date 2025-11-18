'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function LogoutButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 hover:text-horror-glow transition-colors"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      <LogOut className="w-4 h-4" />
      Выйти
    </Button>
  )
}


