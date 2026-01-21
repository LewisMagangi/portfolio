// app/api/admin/cv/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const authResponse = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    if (!authResponse.ok) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const authData = await authResponse.json();
    const user = authData.user;

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get current CV path
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { cv: true },
    });

    if (!currentUser?.cv) {
      return NextResponse.json(
        { success: false, message: 'No CV file found' },
        { status: 404 }
      );
    }

    // Delete file from filesystem
    try {
      const filepath = join(process.cwd(), 'public', currentUser.cv);
      await unlink(filepath);
    } catch (fileError) {
      console.warn('Error deleting file from filesystem:', fileError);
      // Continue with database update even if file deletion fails
    }

    // Update user CV path in database
    await prisma.user.update({
      where: { id: user.id },
      data: { cv: null },
    });

    return NextResponse.json({
      success: true,
      message: 'CV deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting CV:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}