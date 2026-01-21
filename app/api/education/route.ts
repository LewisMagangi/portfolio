// app/api/education/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      include: {
        highlights: {
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

export async function POST(request: NextRequest) {
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

    if (!institution || !degree || !startDate) {
      return NextResponse.json(
        { success: false, error: 'Institution, degree, and start date are required' },
        { status: 400 }
      );
    }

    const education = await prisma.education.create({
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
      message: 'Education created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating education:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create education' },
      { status: 500 }
    );
  }
}
