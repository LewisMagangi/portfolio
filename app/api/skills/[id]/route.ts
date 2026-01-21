// app/api/skills/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SkillCategory } from '@/lib/generated/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id: params.id }
    });

    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: skill
    });
  } catch (error) {
    console.error('Error fetching skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skill' },
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
      name,
      category,
      proficiencyLevel,
      yearsOfExperience,
      icon,
      orderIndex
    } = body;

    // Check if another skill with the same name exists
    if (name) {
      const existing = await prisma.skill.findFirst({
        where: {
          name,
          NOT: { id: params.id }
        }
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Skill with this name already exists' },
          { status: 400 }
        );
      }
    }

    const skill = await prisma.skill.update({
      where: { id: params.id },
      data: {
        name,
        category: category as SkillCategory,
        proficiencyLevel: proficiencyLevel || 3,
        yearsOfExperience: yearsOfExperience || null,
        icon,
        orderIndex: orderIndex || 0
      }
    });

    return NextResponse.json({
      success: true,
      data: skill,
      message: 'Skill updated successfully'
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.skill.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}
