'use client'; // Importante para usar Zustand no App Router

import { useGlobalStore } from '@/store/useGlobalStore';

export default function Home() {
  const { isAuthenticated, userName, login, logout } = useGlobalStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bem-vindo ao Meu App!</h1>

      {isAuthenticated ? (
        <>
          <p>Olá, {userName}!</p>
          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => login('Usuário Exemplo')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      )}
    </div>
  );
}
