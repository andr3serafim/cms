'use client'

import { useHydration } from '@/hooks/use-hydratation';
import { useAuthStore } from '@/store/use-auth-store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Dashboard() {
  const { isAuthenticated, loading, fetchUser, user } = useAuthStore()
  const route = useRouter();
  const hydrated = useHydration();

  useEffect(() => {
    // Buscar dados do usuário quando o componente montar
    if (hydrated && !isAuthenticated && !loading) {
      fetchUser();
    }
  }, [hydrated, isAuthenticated, loading, fetchUser]);

  useEffect(() => {
    // Só redirecionar se já tentou buscar o usuário e realmente não está autenticado
    if (hydrated && !loading && !isAuthenticated) {
      route.push('/login');
    }
  }, [hydrated, loading, isAuthenticated, route]);

  // Mostrar loading enquanto não hidratou ou está carregando
  if (!hydrated || loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Se não está autenticado, não renderizar nada (vai redirecionar)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-xl'>Dashboard</h1>
      <p>Bem-vindo ao painel, <span className='text-sky-500'>{user?.name}!</span></p>
    </div>
  )
}