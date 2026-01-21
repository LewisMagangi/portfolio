// app/api/testimonials/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { TestimonialStatus } from '@/lib/generated/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');

    const where: { status?: TestimonialStatus; featured?: boolean } = {};

    if (status) {
      where.status = status as TestimonialStatus;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    requireAuth(request);

    const body = await request.json();
    const {
      name,
      role,
      company,
      content,
      avatar,
      rating,
      featured,
      status
    } = body;

    if (!name || !role || !content) {
      return NextResponse.json(
        { success: false, error: 'Name, role, and content are required' },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        company,
        content,
        avatar,
        rating: rating || 5,
        featured: featured || false,
        status: (status as TestimonialStatus) || 'PENDING'
      }
    });

    return NextResponse.json({
      success: true,
      data: testimonial,
      message: 'Testimonial created successfully'
    }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
