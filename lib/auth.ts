// lib/auth.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

export function verifyAuth(request: NextRequest): AuthUser | null {
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return null;
    }

    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const decoded = jwt.verify(token, secret) as AuthUser;
    
    return decoded;
  } catch (error) {
    return null;
  }
}

export function requireAuth(request: NextRequest): AuthUser {
  const user = verifyAuth(request);
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}
