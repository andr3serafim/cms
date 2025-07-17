

import axios from "axios";
// import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_TESTE,
    headers: {
        'Content-Type': 'application/json',
    }
})

export { axiosInstance as axiosApiTeste };
