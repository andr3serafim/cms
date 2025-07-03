'use client'

import InputDefault from '@/app/elements/input/input-default';
import InputPassword from '@/app/elements/input/input-password';
import { useHydration } from '@/hooks/use-hydratation';
import { authLogin } from '@/services/auth/login';
import { useAuthStore } from '@/store/use-auth-store';
import { LoginCredentials } from '@/types/user/login-credentials';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { FaUser } from 'react-icons/fa';

export default function Login() {
    const [form, setForm] = useState<LoginCredentials>({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { fetchUser } = useAuthStore();
    const hydrated = useHydration();
    const route = useRouter();

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
        <div className='w-full h-screen flex flex-col justify-center items-center'>

            {isSubmitting && (
                <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            <div className='flex flex-col items-center max-w-sm w-full'>
                <h2 className="text-3xl font-bold mb-6">Entrar</h2>
                <form className='flex flex-col gap-3 w-full' onSubmit={handleLogin}>
                    <InputDefault
                        type="email"
                        label="Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="Digite seu email"
                        required
                        icon={<FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />} />
                    <InputPassword
                        label='Senha'
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='py-2 px-4 border border-gray-700 rounded-sm hover:bg-gray-800 transition-all duration-300 mt-5 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
                <p className='flex text-sm py-3 w-full justify-center'>Não tem conta?</p>
                <button
                    onClick={() => route.push('/register')}
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                >
                    Crie sua conta
                </button>
            </div>
        </div>
    );
}
