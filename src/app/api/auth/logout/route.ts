// app/api/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logout realizado com sucesso' })
    
    // Remover o cookie
    response.cookies.set({
      name: 'token',
      value: '',
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Remove o cookie
    })

    return response
  } catch (error) {
    console.error('Erro no logout:', error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}