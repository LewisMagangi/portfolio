// app/api/blog/tags/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tags = await prisma.blogTag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: tags
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check for existing tag
    const existing = await prisma.blogTag.findFirst({
      where: {
        OR: [{ name }, { slug }]
      }
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Tag with this name or slug already exists' },
        { status: 400 }
      );
    }

    const tag = await prisma.blogTag.create({
      data: {
        name,
        slug
      }
    });

    return NextResponse.json({
      success: true,
      data: tag,
      message: 'Tag created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create tag' },
      { status: 500 }
    );
  }
}
