import axios from "axios";
// import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    // baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
    headers: {
        'Content-Type': 'application/json',
        // 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY
    }
})

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const status = error.response?.status
//         if (status === 401) {

            
//             // Não exibe toast se estiver em rota pública
//             // const isPublicRoute = typeof window !== 'undefined' &&
//             //     ['/login', '/register', '/'].some((path) => window.location.pathname.startsWith(path));
//             //     if (!isPublicRoute) {
//             //         toast.error('Sessão expirada. Faça login novamente.');
//             //     }
//             // }

//             // if (status === 403) {
//             //     toast.error('Acesso negado. Você não tem permissão para acessar este recurso.')
//             // }

//             // if (status === 500) {
//             //     toast.error('Erro interno do servidor. Tente novamente mais tarde.')
//             // }

//             // if (error.response?.data?.error) {
//             //     toast.error(error.response.data.error)
//             // } else {
//             //     toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.')
//             // }

//             console.error('Erro na requisição:', error)
//             return Promise.reject(error)
//         }
//     }
// )

export { axiosInstance as axios };
