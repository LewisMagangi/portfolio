// app/api/projects/route.ts
// API routes for managing projects

import { NextRequest, NextResponse } from 'next/server';
import { Prisma, ProjectStatus } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

// GET all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    const where: Prisma.ProjectWhereInput = {};

    if (featured === 'true') {
      where.featured = true;
    }

    if (status) {
      where.status = status as ProjectStatus;
    }

    const projects = await prisma.project.findMany({
      where,
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
        }
      },
      orderBy: [
        { featured: 'desc' },
        { orderIndex: 'asc' },
        { createdAt: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined
    });

    return NextResponse.json({
      success: true,
      posts: projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
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

    // Create project with related data
    const project = await prisma.project.create({
      data: {
        title,
        slug,
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
        highlights: true
      }
    });

    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}