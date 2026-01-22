// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@/lib/generated/prisma';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is admin route
  if (pathname.startsWith('/admin')) {
    // Allow access to setup page if no admin users exist
    if (pathname === '/admin/setup') {
      try {
        const adminCount = await prisma.user.count({
          where: { role: UserRole.ADMIN }
        });
        if (adminCount === 0) {
          // No admin exists, allow access to setup
          return NextResponse.next();
        }
      } catch (error) {
        // If database check fails, allow access to setup for safety
        console.warn('Database check failed in middleware, allowing setup access');
        return NextResponse.next();
      }
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
        const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
        jwt.verify(token, secret);
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