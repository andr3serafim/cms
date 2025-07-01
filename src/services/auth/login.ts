import { axios } from "@/lib/axios"
import { LoginCredentials } from "@/types/user/login-credentials"
import toast from "react-hot-toast"

export async function authLogin(data: LoginCredentials): Promise<boolean> {
  try {
    await axios.post('/auth/login', {
      email: data.email,
      password: data.password,
    })

    toast.success('Login realizado com sucesso')
    return true
  } catch (err: any) { /* eslint-disable-line */
    console.error('Erro na autenticação:', err)

    const msg = err?.response?.data?.error || 'Erro ao realizar login'
    toast.error(msg)

    return false
  }
}
