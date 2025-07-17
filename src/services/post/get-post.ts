import { axios } from "@/lib/axios"

export async function getPosts(page = 1, limit = 10, search = "") {
    try {
        const res = await axios.get('/post', {
            params: { page, limit, search },
        })
        return res;
    } catch (err) {
        console.log(err);
    }
}
