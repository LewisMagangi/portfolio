// lib/auth.ts
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  cv: string | null;
}

export async function authenticateRequest(request: NextRequest): Promise<{
  authenticated: boolean;
  user: AuthUser | null;
  error?: string;
}> {
  try {
    // Check for authentication token
    const authToken = request.cookies.get('auth_token')?.value;
    const userIdCookie = request.cookies.get('user_id')?.value;

    if (!authToken || authToken !== 'authenticated') {
      return { authenticated: false, user: null, error: 'Unauthorized' };
    }

    // Try to get specific user by ID if available
    let user;
    if (userIdCookie) {
      user = await prisma.user.findUnique({
        where: { 
          id: userIdCookie,
          isActive: true
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          avatar: true,
          bio: true,
          location: true,
          website: true,
          github: true,
          linkedin: true,
          twitter: true,
          cv: true
        }
      });
    }

    // Fallback to first admin user if no specific user found
    if (!user) {
      user = await prisma.user.findFirst({
        where: {
          role: 'ADMIN',
          isActive: true
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          avatar: true,
          bio: true,
          location: true,
          website: true,
          github: true,
          linkedin: true,
          twitter: true,
          cv: true
        }
      });
    }

    if (!user) {
      return { authenticated: false, user: null, error: 'User not found' };
    }

    return { authenticated: true, user };
  } catch (error) {
    console.error('Error authenticating request:', error);
    return { authenticated: false, user: null, error: 'Internal server error' };
  }
}

export async function requireAdmin(request: NextRequest): Promise<{
  authorized: boolean;
  user: AuthUser | null;
  error?: string;
  statusCode?: number;
}> {
  const authResult = await authenticateRequest(request);

  if (!authResult.authenticated || !authResult.user) {
    return {
      authorized: false,
      user: null,
      error: authResult.error || 'Unauthorized',
      statusCode: 401
    };
  }

  if (authResult.user.role !== 'ADMIN') {
    return {
      authorized: false,
      user: authResult.user,
      error: 'Admin access required',
      statusCode: 403
    };
  }

  return { authorized: true, user: authResult.user };
}
