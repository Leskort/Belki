'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function LogoutButton() {
  return (
    <Button
      variant="secondary"
      className="w-full flex items-center gap-2"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      <LogOut className="w-4 h-4" />
      Выйти
    </Button>
  )
}


