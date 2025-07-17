import { cookies } from 'next/headers'

export async function setTokenCookie(token: string) {
  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60, // 1 hour
    sameSite: 'lax',
  })
}
