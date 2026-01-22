// app/api/auth/setup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@/lib/generated/prisma';

export async function GET(request: NextRequest) {
  try {
    // Check if any admin users already exist
    const existingAdmin = await prisma.user.findFirst({
      where: { role: UserRole.ADMIN }
    });

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: 'Admin user already exists' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Setup is available'
    });
  } catch (error) {
    console.error('Error checking admin existence:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function HEAD(request: NextRequest) {
  try {
    // Check if any admin users already exist
    const existingAdmin = await prisma.user.findFirst({
      where: { role: UserRole.ADMIN }
    });

    if (existingAdmin) {
      return new Response(null, { status: 403 });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    // If check fails, allow setup (better to allow than block)
    return new Response(null, { status: 200 });
  }
}
  try {
    // Check if any admin users already exist
    const existingAdmin = await prisma.user.findFirst({
      where: { role: UserRole.ADMIN }
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Admin user already exists. Setup is not allowed.'
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name, email, and password are required'
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format'
        },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 8 characters long'
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.ADMIN,
        isActive: true,
        emailVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully. You can now log in.',
      user: adminUser
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create admin user'
      },
      { status: 500 }
    );
  }
}