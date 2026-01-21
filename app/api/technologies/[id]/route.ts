// app/api/technologies/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TechCategory } from '@/lib/generated/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const technology = await prisma.technology.findUnique({
      where: { id: params.id },
      include: {
        projects: {
          include: {
            project: {
              select: {
                id: true,
                title: true,
                slug: true
              }
            }
          }
        }
      }
    });

    if (!technology) {
      return NextResponse.json(
        { success: false, error: 'Technology not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: technology
    });
  } catch (error) {
    console.error('Error fetching technology:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch technology' },
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
    const { name, category, icon, color } = body;

    // Check if another technology with the same name exists
    if (name) {
      const existing = await prisma.technology.findFirst({
        where: {
          name,
          NOT: { id: params.id }
        }
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Technology with this name already exists' },
          { status: 400 }
        );
      }
    }

    const technology = await prisma.technology.update({
      where: { id: params.id },
      data: {
        name,
        category: category as TechCategory,
        icon,
        color
      }
    });

    return NextResponse.json({
      success: true,
      data: technology,
      message: 'Technology updated successfully'
    });
  } catch (error) {
    console.error('Error updating technology:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update technology' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.technology.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Technology deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting technology:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete technology' },
      { status: 500 }
    );
  }
}
