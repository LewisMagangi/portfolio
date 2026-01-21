// app/api/analytics/download/route.ts
// Download tracking

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileType, userAgent: clientUserAgent } = body;

    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const userAgent = request.headers.get('user-agent') || clientUserAgent || 'unknown';

    await prisma.download.create({
      data: {
        fileType: fileType as 'RESUME' | 'CV' | 'PORTFOLIO' | 'OTHER',
        ipAddress,
        userAgent
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Download tracked'
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to track download'
    }, { status: 500 });
  }
}