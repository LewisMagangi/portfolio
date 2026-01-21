// app/api/experiences/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EmploymentType } from '@/lib/generated/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const experience = await prisma.experience.findUnique({
      where: { id: params.id },
      include: {
        achievements: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!experience) {
      return NextResponse.json(
        { success: false, error: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: experience
    });
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experience' },
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

    // Delete existing achievements
    await prisma.experienceAchievement.deleteMany({
      where: { experienceId: params.id }
    });

    const experience = await prisma.experience.update({
      where: { id: params.id },
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
      message: 'Experience updated successfully'
    });
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.experience.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}
