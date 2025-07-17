import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/services/auth/get-auth-user'
import { createPostSchema } from '@/schemas/create-post-schema'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const user = await getAuthUser()

    if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const body = await req.json()

    const parse = createPostSchema.safeParse(body)
    if (!parse.success) {
        return NextResponse.json({ error: 'Dados inválidos', details: parse.error.flatten() }, { status: 400 })
    }

    const { title, content } = parse.data

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    const post = await prisma.post.create({
        data: {
            title,
            content,
            slug,
            authorId: user.userId,
        },
    })

    return NextResponse.json({ post }, { status: 201 })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '5')
  const search = searchParams.get('search') || ''

  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: search,
        mode: 'insensitive',
      },
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      author: { select: { name: true } },
    },
  })

  const total = await prisma.post.count({
    where: {
      title: {
        contains: search,
        mode: 'insensitive',
      },
    },
  })

  return NextResponse.json({ posts, total })
}