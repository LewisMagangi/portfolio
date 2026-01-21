// app/api/contact/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MessageStatus } from '@/lib/generated/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id: params.id }
    });

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch message' },
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
    const { status, replied } = body;

    const updateData: { status?: MessageStatus; replied?: boolean; repliedAt?: Date | null } = {};

    if (status) {
      updateData.status = status as MessageStatus;
    }

    if (replied !== undefined) {
      updateData.replied = replied;
      if (replied) {
        updateData.repliedAt = new Date();
      } else {
        updateData.repliedAt = null;
      }
    }

    const message = await prisma.contactMessage.update({
      where: { id: params.id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: message,
      message: 'Message updated successfully'
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contactMessage.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
