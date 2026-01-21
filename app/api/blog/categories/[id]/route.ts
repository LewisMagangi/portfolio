// app/api/blog/categories/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.blogCategory.findUnique({
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

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
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
    const { name, slug, description } = body;

    // Check for existing category with same name/slug
    if (name || slug) {
      const existing = await prisma.blogCategory.findFirst({
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
          { success: false, error: 'Category with this name or slug already exists' },
          { status: 400 }
        );
      }
    }

    const category = await prisma.blogCategory.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description
      }
    });

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category updated successfully'
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blogCategory.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
