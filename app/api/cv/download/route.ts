// app/api/cv/download/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get the admin user (assuming there's only one admin)
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
      select: { id: true, name: true, cv: true },
    });

    if (!adminUser?.cv) {
      return NextResponse.json(
        { success: false, message: 'CV not available' },
        { status: 404 }
      );
    }

    // Track the download
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await prisma.download.create({
      data: {
        fileType: 'CV',
        ipAddress,
        userAgent,
      },
    });

    // Read and serve the CV file
    const filepath = join(process.cwd(), 'public', adminUser.cv);
    const fileBuffer = await readFile(filepath);

    // Return file with appropriate headers
    const filename = `${adminUser.name.replace(/\s+/g, '_')}_CV.pdf`;
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error downloading CV:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}