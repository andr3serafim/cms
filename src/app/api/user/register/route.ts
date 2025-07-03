import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const userExists = await prisma.user.findUnique({ where: { email: data.email } })

    if (userExists) {
      return NextResponse.json({ error: 'Usuário já existe.' }, { status: 400 })
    }

    const hashedPassword = await hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'USER',
      },
    })

    return NextResponse.json({ message: 'Usuário criado com sucesso.', user: { id: user.id, name: user.name, email: user.email } }, { status: 201 })

  } catch (error: any) { /* eslint-disable-line */

    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
