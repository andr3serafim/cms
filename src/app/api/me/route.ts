// (verifica token)

import { prisma } from '@/lib/prisma'
import { verifyJwt } from '@/lib/jwt'

import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest } from '@/lib/util/get-token-from-request'


// Recebe o objeto request como argumento
export async function GET(request: Request) {

  try {
    const token = getTokenFromRequest(request as NextRequest)

    if (!token) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    const decoded = verifyJwt(token)
    if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
      return NextResponse.json({ error: 'Token inválido.' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId as string },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) { /* eslint-disable-line */
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
