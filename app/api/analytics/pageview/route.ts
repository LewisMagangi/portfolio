// app/api/analytics/pageview/route.ts
// Analytics tracking

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pagePath, referrer, sessionId } = body;

    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await prisma.pageView.create({
      data: {
        pagePath,
        referrer,
        ipAddress,
        userAgent,
        sessionId
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Page view tracked'
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track page view' },
      { status: 500 }
    );
  }
}