'use client'

import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { axios } from '@/lib/axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/use-auth-store'

export default function Page() {

    const router = useRouter()

    return (
        <div>
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    try {
                        const idToken = credentialResponse.credential
                        const res = await axios.post('/auth/social/google', { idToken })
                        if (res.data.user) {
                            useAuthStore.getState().setUser(res.data.user)
                            toast.success('Login com Google realizado!')
                            router.push('/dashboard')
                        }
                    } catch (err) {
                        toast.error('Erro no login com Google' + err)
                    }
                }}
                onError={() => {
                    toast.error('Erro ao autenticar com Google')
                }}
            />
        </div>
    )
}
