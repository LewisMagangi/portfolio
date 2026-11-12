// app/api/testimonials/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, verifyAuth } from '@/lib/auth';
import { decideClientReview } from '@/lib/client-reviews';
import { PUBLIC_TESTIMONIAL_FIELDS } from '@/lib/testimonial-fields';
import { TestimonialStatus } from '@/lib/generated/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = Boolean(verifyAuth(request));
    const testimonial = isAdmin
      ? await prisma.testimonial.findUnique({ where: { id: params.id } })
      : await prisma.testimonial.findFirst({
          where: { id: params.id, status: 'APPROVED' },
          select: PUBLIC_TESTIMONIAL_FIELDS
        });

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonial' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    requireAuth(request);

    const body = await request.json();
    const existing = await prisma.testimonial.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    // A client review is published exactly as the reviewer wrote it: only its status and placement change,
    // and a status change goes through the same path as the review queue (ordering, thank you email).
    if (existing.source === 'CLIENT_REVIEW') {
      const words = ['name', 'role', 'company', 'content', 'quote'] as const;
      if (words.some((k) => k in body && body[k] !== existing[k])) {
        return NextResponse.json(
          { success: false, error: "A client review can't be edited. Approve, decline or delete it instead." },
          { status: 400 }
        );
      }
      const decision = { APPROVED: 'approve', REJECTED: 'decline', PENDING: 'undo' } as const;
      if (body.status && body.status !== existing.status && body.status in decision) {
        await decideClientReview(params.id, decision[body.status as TestimonialStatus]);
      }
      const testimonial = await prisma.testimonial.update({
        where: { id: params.id },
        data: {
          ...(typeof body.featured === 'boolean' ? { featured: body.featured } : {}),
          ...(Number.isInteger(body.orderIndex) ? { orderIndex: body.orderIndex } : {})
        }
      });
      return NextResponse.json({ success: true, data: testimonial, message: 'Testimonial updated successfully' });
    }

    // Letters: update only the fields that were sent, so a status change keeps the rest.
    const { name, role, company, content, avatar, rating, featured, status } = body;
    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        name,
        role,
        company,
        content,
        avatar,
        rating,
        featured,
        status: status as TestimonialStatus | undefined
      }
    });

    return NextResponse.json({
      success: true,
      data: testimonial,
      message: 'Testimonial updated successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    requireAuth(request);

    await prisma.testimonial.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
