// app/api/education/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const education = await prisma.education.findUnique({
      where: { id: params.id },
      include: {
        highlights: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!education) {
      return NextResponse.json(
        { success: false, error: 'Education not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: education
    });
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch education' },
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
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      isCurrent,
      grade,
      description,
      highlights
    } = body;

    // Delete existing highlights
    await prisma.educationHighlight.deleteMany({
      where: { educationId: params.id }
    });

    const education = await prisma.education.update({
      where: { id: params.id },
      data: {
        institution,
        degree,
        fieldOfStudy,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        isCurrent: isCurrent || false,
        grade,
        description,
        highlights: {
          create: highlights?.map((text: string, index: number) => ({
            highlight: text,
            orderIndex: index
          })) || []
        }
      },
      include: {
        highlights: true
      }
    });

    return NextResponse.json({
      success: true,
      data: education,
      message: 'Education updated successfully'
    });
  } catch (error) {
    console.error('Error updating education:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update education' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.education.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Education deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting education:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete education' },
      { status: 500 }
    );
  }
}
