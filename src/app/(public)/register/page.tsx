'use client'

import InputDefault from "@/app/elements/input/input-default";
import InputPassword from "@/app/elements/input/input-password";
import InputPasswordConfirm from "@/app/elements/input/input-password-confirm";
import { registerSchema } from "@/schemas/register-schema";
import { userRegister } from "@/services/user/register";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function ZodIntegrationExample() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    setIsSubmitting(true)
    try {
      const request = await userRegister(payload);

      if (request) {
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
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md w-full mx-auto p-5">
      <h2 className="text-3xl font-bold mb-6">Cadastro</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full h-auto ">
        {/* Nome */}
        <InputDefault
          type="text"
          label="Nome"
          placeholder="Digite seu email"
          {...register('name')}
          zodMessage={errors.email?.message}
          required
          icon={<FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />} />

        {/* Email */}
        <InputDefault
          type="email"
          label="Email"
          placeholder="Digite seu email"
          {...register('email')}
          zodMessage={errors.email?.message}
          required
          icon={<FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />} />

        {/* Senha com validação visual */}
        <InputPassword
          label="Senha"
          placeholder="Digite sua senha"
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
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          {...register('confirmPassword')}
          originalPassword={valuePassword}
          enableMatchValidation={!errors.confirmPassword}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );

};
