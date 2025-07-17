'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CreatePostType } from '@/types/post/create-post-type'
import { createPostSchema } from '@/schemas/create-post-schema'
import InputDefault from '@/app/elements/input/input-default'
import { createPost } from '@/services/post/create-post'

export default function CreatePostPage() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreatePostType>({
        resolver: zodResolver(createPostSchema),
    })

    const onSubmit = async (data: CreatePostType) => {
        try {
            const res = await createPost(data)
            if (res) {
                toast.success('Post criado com sucesso!')
                reset()
            }
        } catch (err) {
            console.log(err);
            toast.error('Erro ao criar post')
        }
    }

    return (
        <div className="max-w-xl mx-start py-8">
            <h1 className="text-3xl font-bold mb-4">Criar postagem</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <InputDefault
                    type='text'
                    label='Título'
                    placeholder='Título'
                    zodMessage={errors.title?.message}
                    {...register('title')}
                    width='w-full'
                    backgroundColor='dark:bg-neutral-700 bg-white dark:text-neutral-100'
                />
                <div>
                    <label className="text-sm block mb-2">Conteúdo</label>
                    <textarea
                        placeholder='Conteúdo do post'
                        {...register('content')}
                        className="w-full px-3 py-2 border rounded h-40 dark:bg-neutral-700 bg-white dark:text-neutral-100 text-sm"
                    />
                    {errors.content && <p className="text-red-400 font-sans text-xs">* {errors.content.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-lime-500 text-white py-2 px-4 rounded hover:bg-lime-700 transition"
                >
                    {isSubmitting ?
                        <div className="flex justify-center gap-4">
                            <div className="w-6 h-6 border-[3px] border-t-transparent rounded-full animate-spin"></div>
                            <span>Publicando</span>
                        </div> : <span>Publicar</span>}

                </button>
            </form>
        </div>
    )
}
