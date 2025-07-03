// schemas/auth.ts
import { z } from 'zod';

export const passwordValidationSchema = z.string()
  .min(8, "Mínimo de 8 caracteres")
  .max(20, "Máximo de 20 caracteres")
  .regex(/[A-Z]/, "Pelo menos uma letra maiúscula")
  .regex(/\d/, "Pelo menos um número")
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/, "Pelo menos um caractere especial");

export const registerSchema = z.object({
  name: z.string().min(3, "Informe seu nome completo").max(50, "Informe seu nome completo"),
  email: z.string().email("Informe um email válido"),
  password: passwordValidationSchema,
  confirmPassword: z.string(),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      path: ["confirmPassword"],
      code: z.ZodIssueCode.custom,
      message: "Senhas não conferem"
    });
  }
});
