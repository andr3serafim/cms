// app/api/auth/login/route.ts
import { prisma } from '@/lib/prisma'
import { signJwt } from '@/lib/jwt' // Assumindo que você tem essa função
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs' // ou bcrypt

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 })
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })
    }

    // Gerar token
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
    console.error('Erro no login:', error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}