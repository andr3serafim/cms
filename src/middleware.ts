import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJwtEdge } from './lib/jwt-edge-runtime'

export async function middleware(request: NextRequest) {

    // Obtém o token do cookie
    const token = request.cookies.get('token')?.value || null;

    // Rotas protegidas (privadas)
    const protectedRoutes = [
        '/dashboard',
        '/post',
        '/admin',
        '/settings',
    ]
    const path = request.nextUrl.pathname;
    const isPrivateRoute = protectedRoutes.some(route => path.startsWith(route));

    if (path === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Se a rota for privada, validar o token
    if (isPrivateRoute) {
        const isValid = token ? await verifyJwtEdge(token) : false;
        if (!token || !isValid) {
            // Se o token não for válido, redirecionar para login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Se estiver autenticado e tentando acessar a página de login ou registro
    const isValid = token ? await verifyJwtEdge(token) : false;
    if (token && isValid) {
        if (path === '/login' || path === '/register') {
            // Se o usuário já estiver autenticado, redirecionar para o dashboard
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // Se o token estiver expirado ou não for encontrado, e a rota for pública, continuar normalmente
    return NextResponse.next()
}

// Define onde o middleware será aplicado
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/post/:path*',
        '/admin/:path*',
        '/settings/:path*',
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)', // Exclui arquivos estáticos e outros
    ],
}
