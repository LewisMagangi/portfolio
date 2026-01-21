// app/api/technologies/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TechCategory } from '@/lib/generated/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where = category ? { category: category as TechCategory } : {};

    const technologies = await prisma.technology.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    });

    return NextResponse.json({
      success: true,
      data: technologies
    });
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch technologies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, icon, color } = body;

    if (!name || !category) {
      return NextResponse.json(
        { success: false, error: 'Name and category are required' },
        { status: 400 }
      );
    }

    // Check if technology already exists
    const existing = await prisma.technology.findUnique({
      where: { name }
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Technology with this name already exists' },
        { status: 400 }
      );
    }

    const technology = await prisma.technology.create({
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
      message: 'Technology created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating technology:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create technology' },
      { status: 500 }
    );
  }
}
