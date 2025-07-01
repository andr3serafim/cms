import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})
    
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = registerSchema.parse(body)

    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) {
      return NextResponse.json({ error: 'Usuário já existe.' }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    })

    return NextResponse.json({ message: 'Usuário criado com sucesso.', user: { id: user.id, name: user.name, email: user.email } }, { status: 201 })
  } catch (error: any) { /* eslint-disable-line */
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
