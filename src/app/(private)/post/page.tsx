'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { GetPostType } from '@/types/post/post-type'
import { getPosts } from '@/services/post/get-post'
import { deletePost } from '@/services/post/delete-post'

export default function PostListPage() {
    const router = useRouter()
    const [posts, setPosts] = useState<GetPostType[]>([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 5

    useEffect(() => {
        fetchPosts()
    }, [search, page])

    const fetchPosts = async () => {
        try {
            const res = await getPosts();
                setPosts(res?.data.posts)
                setTotal(res?.data.total)
        } catch (err) {
            console.log(err);
            toast.error('Erro ao buscar posts')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir?')) return

        try {
            const res = await deletePost(id);
            if (res) {
                toast.success('Post excluído com sucesso')
                fetchPosts()
            }
        } catch {
            toast.error('Erro ao excluir post')
        }
    }

    const totalPages = Math.ceil(total / limit)

    return (
        <div className="max-w-4xl w-full mx-auto py-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Postagens</h1>
                <button
                    onClick={() => router.push('/post/create')}
                    className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-700"
                >
                    Nova postagem
                </button>
            </div>

            <input
                type="text"
                placeholder="Buscar por título..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
            />

            <table className="w-full text-left border">
                <thead>
                    <tr className="dark:bg-gray-100 text-gray-800">
                        <th className="p-2">Título</th>
                        <th className="p-2">Autor</th>
                        <th className="p-2">Criado em</th>
                        <th className="p-2 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center p-4">
                                Nenhum post encontrado.
                            </td>
                        </tr>
                    ) : (
                        posts.map((post) => (
                            <tr key={post.id} className="border-t">
                                <td className="p-2">{post.title}</td>
                                <td className="p-2">{post.author?.name}</td>
                                <td className="p-2">{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td className="p-2 text-right space-x-2">
                                    <button
                                        onClick={() => router.push(`/posts/edit/${post.id}`)}
                                        className="text-lime-500"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-600"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-lime-500 text-white' : ''
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
