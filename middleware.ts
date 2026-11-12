// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Writes anyone may make: the contact form, blog subscriptions (which only send a confirmation email),
// analytics beacons, signing in and out, and first time setup
// (setup and init check for themselves that no admin exists yet, or that the init key matches).
const PUBLIC_WRITES = [
  /^\/api\/contact\/?$/,
  /^\/api\/newsletter\/?$/,
  /^\/api\/analytics\//,
  /^\/api\/auth\/(login|logout|setup)\/?$/,
  /^\/api\/admin\/init\/?$/,
];
const READ_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

async function hasValidSession(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    );
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Every API write needs a signed in admin unless it is on the public list. Route handlers that check
  // for themselves keep doing so; this catches the ones that never did.
  if (pathname.startsWith('/api/')) {
    if (READ_METHODS.has(request.method) || PUBLIC_WRITES.some((r) => r.test(pathname))) {
      return NextResponse.next();
    }
    if (!(await hasValidSession(request))) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

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
  matcher: ['/admin/:path*', '/api/:path*'],
};