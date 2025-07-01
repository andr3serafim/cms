'use client'

import { useAuthStore } from '@/store/use-auth-store'
import { useEffect } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((state) => state.fetchUser)

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return <>{children}</>
}

// O que acontece ->

// Quando a página for carregada:

// O AuthProvider será executado no cliente.
// Ele vai chamar fetchUser() via Zustand.
// O Zustand acessa /api/me e atualiza user + isAuthenticated.
// Agora sua aplicação já sabe se o usuário está logado, logo ao iniciar.