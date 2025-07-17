'use client'

import InputDefault from "@/app/elements/input/input-default";
import InputPassword from "@/app/elements/input/input-password";
import InputPasswordConfirm from "@/app/elements/input/input-password-confirm";
import { registerSchema } from "@/schemas/register-schema";
import { userRegister } from "@/services/user/register";
import { FaUser } from "react-icons/fa";
import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function ZodIntegrationExample() {
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const valuePassword = watch('password') || '';

  async function onSubmit(formData: RegisterFormData) {

    // formData é passado sem confirmPassword na requisição
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
    try {
      const registerSuccess = await userRegister(payload);

      if (registerSuccess) {
        route.push('/login');
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Mapeia erros do Zod para o estado
        const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};

        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof RegisterFormData;
            fieldErrors[field] = err.message;
          }
        });
      }
    }
  };

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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Cadastro</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Crie sua conta para acessar a plataforma</p>
            </div>

            {/* Main form container */}
            <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-8 relative">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-2xl pointer-events-none"></div>

                <div className="relative z-10">
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col gap-6 w-full'
                        autoComplete="off"
                    >
                        <div className="space-y-5">
                            {/* Nome */}
                            <InputDefault
                                className='border border-lime-200 bg-white/70 shadow px-4 py-2 focus:border-lime-400 focus:ring-2 focus:ring-lime-300 transition-all'
                                labelStyle='dark:text-gray-800 font-medium'
                                type="text"
                                label="Nome"
                                placeholder="Seu nome completo"
                                {...register('name')}
                                zodMessage={errors.name?.message}
                                required
                                icon={<FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" size={12} />}
                            />

                            {/* Email */}
                            <InputDefault
                                className='border border-lime-200 bg-white/70 shadow px-4 py-2 focus:border-lime-400 focus:ring-2 focus:ring-lime-300 transition-all'
                                labelStyle='dark:text-gray-800 font-medium'
                                type="email"
                                label="Email"
                                placeholder="seu@email.com"
                                {...register('email')}
                                zodMessage={errors.email?.message}
                                required
                                icon={<FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" size={12} />}
                            />

                            {/* Senha com validação visual */}
                            <InputPassword
                                className='border border-lime-200 bg-white/70 shadow px-4 py-2 focus:border-lime-400 focus:ring-2 focus:ring-lime-300 transition-all'
                                labelStyle='dark:text-gray-800 font-medium'
                                label="Senha"
                                placeholder="Digite uma senha forte"
                                {...register('password')}
                                zodMessage={errors.password?.message}
                                showValidation={true}
                                validationRules={{
                                    minLength: 8,
                                    requireUpperCase: true,
                                    requireNumber: true,
                                    requireSpecialChar: true
                                }}
                                required
                            />

                            <InputPasswordConfirm
                                className='border border-lime-200 bg-white/70 shadow px-4 py-2 focus:border-lime-400 focus:ring-2 focus:ring-lime-300 transition-all'
                                labelStyle='dark:text-gray-800 font-medium'
                                label="Confirmar Senha"
                                placeholder="Confirme sua senha"
                                {...register('confirmPassword')}
                                originalPassword={valuePassword}
                                enableMatchValidation={!errors.confirmPassword}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className='w-full py-3 px-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-gray-900/25'
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Cadastrando...
                                </div>
                            ) : 'Cadastrar'}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className='text-sm text-gray-600 my-4'>Já tem conta?</p>
                        <a 
                            href="/login"
                            className="w-full bg-gradient-to-r from-lime-500 to-lime-600 text-white py-3 px-6 rounded-xl font-medium hover:from-lime-600 hover:to-lime-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-lime-500/25 inline-block text-center"
                        >
                            Fazer login
                        </a>
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
);


};
