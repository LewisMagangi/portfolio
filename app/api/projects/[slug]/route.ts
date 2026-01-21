// app/api/projects/[slug]/route.ts
// Single project operations

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
      include: {
        technologies: {
          include: {
            technology: true
          }
        },
        highlights: {
          orderBy: { orderIndex: 'asc' }
        },
        images: {
          orderBy: { orderIndex: 'asc' }
        },
        creator: {
          select: {
            name: true,
            avatar: true
          }
        }
      }
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const {
      title,
      slug: newSlug,
      description,
      detailedDescription,
      thumbnail,
      githubUrl,
      liveUrl,
      status,
      featured,
      technologies,
      highlights,
      startDate,
      endDate
    } = body;

    // First, delete existing technologies and highlights
    await prisma.projectTechnology.deleteMany({
      where: { project: { slug: params.slug } }
    });
    await prisma.projectHighlight.deleteMany({
      where: { project: { slug: params.slug } }
    });

    // Update project with new data
    const project = await prisma.project.update({
      where: { slug: params.slug },
      data: {
        title,
        slug: newSlug,
        description,
        detailedDescription,
        thumbnail,
        githubUrl,
        liveUrl,
        status: status || 'ACTIVE',
        featured: featured || false,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        technologies: {
          create: technologies?.map((techId: string) => ({
            technologyId: techId
          })) || []
        },
        highlights: {
          create: highlights?.map((text: string, index: number) => ({
            highlight: text,
            orderIndex: index
          })) || []
        }
      },
      include: {
        technologies: {
          include: {
            technology: true
          }
        },
        highlights: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.project.delete({
      where: { slug: params.slug }
    });

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}