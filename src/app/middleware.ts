import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = [
    '/rota-privada',
    '/outra-rota-privada'
];

export default function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value;

    const isPrivateRoute = privateRoutes.some(route => path.startsWith(route));

    if (isPrivateRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (path === '/login' && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
