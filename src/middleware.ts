import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJwtEdge } from './lib/jwt-edge-runtime'

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('token')?.value || null;

    // Rotas protegidas
    const protectedRoutes = [
        '/dashboard',
        '/admin',
    ]
    const path = request.nextUrl.pathname;
    const isPrivateRoute = protectedRoutes.some(route => path.startsWith(route));

    // Se a rota for privada, verificar o token
    // Se não tiver token, redirecionar para a página de login
    if (isPrivateRoute) {
        const isValid = token ? await verifyJwtEdge(token) : false;
        if (!token || !isValid) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    
    // Se estiver autenticado, não aceitar acesso a rotas de login
    const isValid = token ? await verifyJwtEdge(token) : false;
    if (token && isValid) {
        if (path === '/login' || path === '/register') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

// Define onde o middleware será aplicado

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}

// O middleware será aplicado a todas as rotas que começam com /dashboard, /admin ou /painel