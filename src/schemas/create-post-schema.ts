import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "O Título deve conter no mínimo 3 caracteres."),
  content: z.string().min(10, "O conteúdo deve conter no mínimo 10 caracteres."),
})