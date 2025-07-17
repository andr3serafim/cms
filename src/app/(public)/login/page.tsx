'use client'

import InputDefault from '@/app/elements/input/input-default';
import InputPassword from '@/app/elements/input/input-password';
import { useHydration } from '@/hooks/use-hydratation';
import { axios } from '@/lib/axios';
import { authLogin } from '@/services/auth/login';
import { useAuthStore } from '@/store/use-auth-store';
import { LoginCredentials } from '@/types/user/login-credentials';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { signIn } from "next-auth/react"

export default function Login() {
    const [form, setForm] = useState<LoginCredentials>({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { fetchUser, logout } = useAuthStore();
    const hydrated = useHydration();
    const route = useRouter();

    useEffect(() => {
        if (!hydrated) return;
        const checkAuth = async () => {
            try {
                await axios.get('/me') // Tenta buscar o usuário
            } catch {
                // Falhou = token expirou ou inválido
                logout()
            }
        }
        checkAuth()
    }, [hydrated])

    if (!hydrated) return null;

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        try {
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
            setIsSubmitting(false);
        }
    }

    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden'>

            {isSubmitting && (
                <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
                    <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin drop-shadow-lg" />
                </div>
            )}

            <div className='flex flex-col items-center max-w-md w-full relative z-10'>
                {/* Logo/Brand area */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Login</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Entre na sua conta para continuar</p>
                </div>

                {/* Main form container */}
                <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-8 relative">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-2xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <form className='flex flex-col gap-6 w-full' onSubmit={handleLogin}>
                            <div className="space-y-5">
                                <InputDefault
                                    className='border border-lime-200 bg-white/70 shadow px-4 py-2 focus:border-lime-400 focus:ring-2 focus:ring-lime-300 transition-all'
                                    labelStyle='dark:text-gray-800 font-medium'
                                    type="email"
                                    label="Email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    placeholder="Digite seu email"
                                    required
                                    icon={<FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" size={12} />}
                                />
                                <InputPassword
                                    className='border border-lime-200 bg-white/70 shadow px-4 py-2 focus:border-lime-400 focus:ring-2 focus:ring-lime-300 transition-all'
                                    labelStyle='dark:text-gray-800 font-medium'
                                    label='Senha'
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    required
                                />
                            </div>

                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='w-full py-3 px-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-gray-900/25'
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Entrando...
                                    </div>
                                ) : 'Entrar com Email'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white/80 text-gray-500 rounded-full">ou</span>
                            </div>
                        </div>

                        {/* Google Sign In Button */}
                        <button
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Entrar com Google
                        </button>

                        <div className="text-center">
                            <p className='text-sm text-gray-600 my-4'>Não tem conta?</p>
                            <button
                                onClick={() => route.push('/register')}
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-lime-500 to-lime-600 text-white py-3 px-6 rounded-xl font-medium hover:from-lime-600 hover:to-lime-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-lime-500/25"
                            >
                                Crie sua conta
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                {/* <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        Ao continuar, você aceita nossos termos de serviço
                    </p>
                </div> */}
            </div>
        </div>
    )
};