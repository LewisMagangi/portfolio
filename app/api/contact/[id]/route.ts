// app/api/contact/[id]/route.ts
// Admin only: reading, updating and deleting a message all need a signed in admin.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';
import { MessageStatus } from '@/lib/generated/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

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
    if (!verifyAuth(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

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
    if (!verifyAuth(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

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
