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

    // Allow setup if no admin exists OR if force parameter is provided in development
    const url = new URL(request.url);
    const force = url.searchParams.get('force') === 'true';

    if (existingAdmin && !force) {
      return NextResponse.json(
        { success: false, error: 'Admin user already exists' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: existingAdmin ? 'Setup available (force mode)' : 'Setup is available',
      existingAdmin: !!existingAdmin
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

    // Check for force parameter
    const url = new URL(request.url);
    const force = url.searchParams.get('force') === 'true';

    if (existingAdmin && !force) {
      return new Response(null, { status: 403 });
    }

    return new Response(null, { status: 200 });
  } catch {
    // If check fails, allow setup (better to allow than block)
    return new Response(null, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  console.log('Setup API called');
  try {
    console.log('Checking for existing admin...');
    // Check if any admin users already exist
    const existingAdmin = await prisma.user.findFirst({
      where: { role: UserRole.ADMIN }
    });

    console.log('Existing admin check result:', !!existingAdmin);

    // Check for force parameter
    const url = new URL(request.url);
    const force = url.searchParams.get('force') === 'true';

    if (existingAdmin && !force) {
      console.log('Admin already exists and force not enabled, returning 403');
      return NextResponse.json(
        {
          success: false,
          error: 'Admin user already exists. Setup is not allowed.'
        },
        { status: 403 }
      );
    }

    if (existingAdmin && force) {
      console.log('Admin exists but force enabled, will update existing admin');
    }

    const body = await request.json();
    const { name, email, password } = body;

    console.log('Received data:', { name, email, passwordLength: password?.length });

    // Validate required fields
    if (!name || !email || !password) {
      console.log('Missing required fields');
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
      console.log('Invalid email format');
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
      console.log('Password too short');
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 8 characters long'
        },
        { status: 400 }
      );
    }

    console.log('Hashing password...');
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let adminUser;

    if (existingAdmin && force) {
      console.log('Updating existing admin user...');
      // Update existing admin user
      adminUser = await prisma.user.update({
        where: { id: existingAdmin.id },
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
          createdAt: true,
          updatedAt: true
        }
      });
      console.log('Admin user updated successfully:', adminUser);
    } else {
      console.log('Creating new admin user...');
      // Create new admin user
      adminUser = await prisma.user.create({
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
      console.log('Admin user created successfully:', adminUser);
    }

    return NextResponse.json({
      success: true,
      message: existingAdmin && force ? 'Admin user updated successfully. You can now log in.' : 'Admin user created successfully. You can now log in.',
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