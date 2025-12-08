// app/api/experiences/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EmploymentType } from '@/lib/generated/prisma';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      include: {
        achievements: {
          orderBy: { orderIndex: 'asc' }
        }
      },
      orderBy: [
        { isCurrent: 'desc' },
        { startDate: 'desc' }
      ]
    });

    return NextResponse.json({
      success: true,
      data: experiences
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      company,
      role,
      location,
      employmentType,
      startDate,
      endDate,
      isCurrent,
      description,
      achievements
    } = body;

    const experience = await prisma.experience.create({
      data: {
        company,
        role,
        location,
        employmentType: employmentType as EmploymentType,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        isCurrent: isCurrent || false,
        description,
        achievements: {
          create: achievements?.map((text: string, index: number) => ({
            achievement: text,
            orderIndex: index
          })) || []
        }
      },
      include: {
        achievements: true
      }
    });

    return NextResponse.json({
      success: true,
      data: experience,
      message: 'Experience created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}