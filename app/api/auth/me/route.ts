// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Check for authentication token
    const authToken = request.cookies.get('auth_token')?.value;

    if (!authToken || authToken !== 'authenticated') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // In a real implementation with proper sessions, you'd look up the user
    // For now, we'll fetch the first admin user as a simple approach
    const user = await prisma.user.findFirst({
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

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}