// app/api/skills/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SkillCategory } from '@/lib/generated/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where = category ? { category: category as SkillCategory } : {};

    const skills = await prisma.skill.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { orderIndex: 'asc' }
      ]
    });

    // Group by category
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);

    return NextResponse.json({
      success: true,
      data: grouped
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const skill = await prisma.skill.create({
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
      message: 'Skill created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Skill ID is required' },
        { status: 400 }
      );
    }

    await prisma.skill.delete({
      where: { id }
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