import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/services/auth/get-auth-user'
import { updateSchema } from '@/schemas/update-post-schema'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 })
  return NextResponse.json({ post })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const user = getAuthUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const body = await req.json()

  const parse = updateSchema.safeParse(body)
  if (!parse.success) {
    return NextResponse.json({ error: 'Dados inválidos', details: parse.error.flatten() }, { status: 400 })
  }

  const { title, content } = parse.data

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const updated = await prisma.post.update({
    where: { id: params.id },
    data: { title, content, slug },
  })

  return NextResponse.json({ post: updated })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const user = getAuthUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  await prisma.post.delete({ where: { id: params.id } })

  return NextResponse.json({ message: 'Post deletado com sucesso' })
}
