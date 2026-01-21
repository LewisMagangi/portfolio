// app/api/blog/tags/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tag = await prisma.blogTag.findUnique({
      where: { id: params.id },
      include: {
        posts: {
          include: {
            post: {
              select: {
                id: true,
                title: true,
                slug: true,
                status: true
              }
            }
          }
        }
      }
    });

    if (!tag) {
      return NextResponse.json(
        { success: false, error: 'Tag not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: tag
    });
  } catch (error) {
    console.error('Error fetching tag:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tag' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, slug } = body;

    // Check for existing tag with same name/slug
    if (name || slug) {
      const existing = await prisma.blogTag.findFirst({
        where: {
          OR: [
            name ? { name } : {},
            slug ? { slug } : {}
          ],
          NOT: { id: params.id }
        }
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Tag with this name or slug already exists' },
          { status: 400 }
        );
      }
    }

    const tag = await prisma.blogTag.update({
      where: { id: params.id },
      data: {
        name,
        slug
      }
    });

    return NextResponse.json({
      success: true,
      data: tag,
      message: 'Tag updated successfully'
    });
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update tag' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blogTag.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Tag deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete tag' },
      { status: 500 }
    );
  }
}
