// src/app/api/temp/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST() {
  const email = 'contato.andremoreira@gmail.com'

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 })
    }

    await prisma.account.deleteMany({
      where: { userId: user.id },
    })

    await prisma.session.deleteMany({
      where: { userId: user.id },
    })

    await prisma.user.delete({
      where: { id: user.id },
    })

    return NextResponse.json({ message: 'Usuário deletado com sucesso.' }, { status: 200 })
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    return NextResponse.json({ error: 'Erro ao deletar usuário.' }, { status: 500 })
  }
}
