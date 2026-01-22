// app/api/admin/init/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Only allow in development or with a special header for security
    const isDevelopment = process.env.NODE_ENV === 'development';
    const initKey = request.headers.get('x-admin-init-key');

    // In production, require a special key for security
    if (!isDevelopment && initKey !== process.env.ADMIN_INIT_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      // Update existing user
      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          name: name || existingUser.name,
          role: 'ADMIN',
          isActive: true,
          emailVerified: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Admin user updated successfully',
        user: { email, name: name || existingUser.name, role: 'ADMIN' }
      });
    } else {
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || 'Admin User',
          role: 'ADMIN',
          isActive: true,
          emailVerified: true,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Admin user created successfully',
        user: newUser
      });
    }
  } catch (error) {
    console.error('Admin init error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check if admin exists
export async function GET() {
  try {
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    });

    return NextResponse.json({
      success: true,
      adminExists: adminCount > 0,
      adminCount
    });
  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}