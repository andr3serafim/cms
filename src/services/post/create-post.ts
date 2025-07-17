import { axios } from "@/lib/axios"
import { CreatePostType } from "@/types/post/create-post-type"

export async function createPost(data: CreatePostType): Promise<boolean> {
    try {
        await axios.post('/post', {
            title: data.title,
            content: data.content,
        })
        return true
    } catch (err: any) { /* eslint-disable-line */
        console.error('Erro na requisição:', err)
        return false
    }
}
