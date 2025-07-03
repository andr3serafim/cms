import { axios } from "@/lib/axios"
import { CreateUserType } from "@/types/user/create-user-type"
import toast from "react-hot-toast"

export async function userRegister(data: CreateUserType): Promise<boolean> {
    try {
        await axios.post('/user/register', {
            name: data.name,
            email: data.email,
            password: data.password,
        })
        toast.success('Cadastro realizado com sucesso')
        return true
    } catch (err: any) { /* eslint-disable-line */
        console.error('Erro na requisição:', err)
        const msg = err?.response?.data?.error || 'Erro ao realizar cadastro'
        toast.error(msg)
        return false
    }
}
