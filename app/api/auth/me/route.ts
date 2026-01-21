// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // For now, return a mock authenticated user
  // In production, you'd check for JWT tokens, sessions, etc.
  const mockUser = {
    id: '1',
    name: 'Admin User',
    email: 'admin@portfolio.com',
    role: 'admin',
    avatar: null
  };

  return NextResponse.json({
    success: true,
    user: mockUser
  });
}