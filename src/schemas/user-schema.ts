// Exemplo de schema usando Zod para validação de dados de usuário (Apagar)

import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  age: z.number().optional(),
});

// Tipo gerado automaticamente a partir do schema
export type User = z.infer<typeof userSchema>;
