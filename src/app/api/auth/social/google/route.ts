import { prisma } from '@/lib/prisma'
import { signJwt } from '@/lib/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client()

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { idToken } = body

  if (!idToken) {
    return NextResponse.json({ error: 'ID Token ausente' }, { status: 400 })
  }

  try {
    // 1. Verifica e extrai dados do token do Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    if (!payload || !payload.email || !payload.sub) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 400 })
    }

    const { email, name, picture, sub: providerAccountId, email_verified } = payload

    // 2. Verifica se já existe uma conta com esse provider
    let account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: 'google',
          providerAccountId,
        },
      },
      include: { user: true },
    })

    // 3. Se não houver conta, cria usuário e conta
    let user = account?.user

    if (!user) {
      // Verifica se já existe um usuário com esse email
      const foundUser = await prisma.user.findUnique({ where: { email } })

      if (!foundUser) {
        user = await prisma.user.create({
          data: {
            name: name || 'Usuário Google',
            email,
            image: picture,
            emailVerified: email_verified ? new Date() : null,
            role: 'USER',
          },
        })
      } else {
        user = foundUser
      }

      account = await prisma.account.create({
        data: {
          provider: 'google',
          providerAccountId,
          type: 'oauth',
          userId: user.id,
          id_token: idToken,
        },
        include: { user: true },
      })
    }

    // 4. Gera JWT e define cookie HttpOnly

    const token = signJwt({ userId: user.id })

    // Criar resposta com cookie
    const response = NextResponse.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      }
    })

    // Definir cookie httpOnly
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hora
    })

    return response
  } catch (error) {
    console.error('Erro ao autenticar com Google:', error)
    return NextResponse.json({ error: 'Erro ao autenticar com Google' }, { status: 500 })

  }
}
