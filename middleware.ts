// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is admin route
  if (pathname.startsWith('/admin')) {
    // Allow access to setup page (setup page will handle its own security)
    if (pathname === '/admin/setup') {
      return NextResponse.next();
    }

    // Get token from cookie
    const token = request.cookies.get('auth_token')?.value;

    // If no token and not on login page, redirect to login
    if (!token && pathname !== '/admin/login') {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify JWT token
    if (token && pathname !== '/admin/login') {
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || 'your-secret-key-change-in-production'
        );
        const { payload } = await jwtVerify(token, secret);
      } catch (error) {
        // Invalid or expired token - clear cookie and redirect to login
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('auth_token');
        return response;
      }
    }

    // If has valid token and on login page, redirect to dashboard
    if (token && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};