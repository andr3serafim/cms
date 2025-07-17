import { axios } from "@/lib/axios"

export async function deletePost(id: string): Promise<boolean> {
    try {
        await axios.delete(`/post/${id}`)
        return true
    } catch {
        return false
    }
}