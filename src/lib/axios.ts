import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY
    }
})

export { axiosInstance as axios }