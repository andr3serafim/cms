'use client'

import { useHydration } from '@/hooks/use-hydratation';
import { authLogin } from '@/services/auth/login';
import { useAuthStore } from '@/store/use-auth-store';
import { LoginCredentials } from '@/types/user/login-credentials';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

export default function Login() {
    const [form, setForm] = useState<LoginCredentials>({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const { fetchUser } = useAuthStore();

    const hydrated = useHydration();
    const route = useRouter();

    if (!hydrated) return null;

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);
            
            // Fazer login
            const loginSuccess = await authLogin(form);
            
            if (loginSuccess) {
                // Buscar dados do usuário após login bem-sucedido
                await fetchUser();
                
                // Limpar formulário
                setForm({ email: '', password: '' });
                
                // Redirecionar para dashboard
                route.push('/dashboard');
            }
        } catch (err) {
            console.log('Erro no login:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>

            {isLoading && (
                <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            <div className='max-w-sm w-full'>
                <h1 className='text-xl text-center mb-2'>Login</h1>
                <form className='flex flex-col gap-2' onSubmit={handleLogin}>
                    <input
                        className='px-2 py-1 border border-gray-300 rounded-sm'
                        type="email"
                        placeholder="E-mail"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                    />
                    <input
                        className='px-2 py-1 border border-gray-300 rounded-sm'
                        type="password"
                        placeholder="Senha"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    <button 
                        type='submit' 
                        disabled={isLoading}
                        className='px-2 py-1 border border-gray-700 rounded-sm hover:bg-gray-800 transition-all duration-300 mt-5 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
                <p className='flex text-sm py-3 w-full justify-center'>Não tem conta?</p>
                <button 
                    className='px-2 py-1 border border-gray-700 rounded-sm w-full hover:bg-gray-800 transition-all duration-300' 
                    onClick={() => route.push('/register')}
                    disabled={isLoading}
                >
                    Cadastre-se
                </button>
            </div>
        </div>
    );
}