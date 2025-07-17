import { verifyJwt } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function getAuthUser() {
    const token = (await cookies()).get('token')?.value
    console.log('teste', token);

    if (!token) return null
    const payload = verifyJwt(token)
    return payload;
}
