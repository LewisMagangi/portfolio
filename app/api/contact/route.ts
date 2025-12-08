// app/api/contact/route.ts
// Contact form API

import { NextRequest, NextResponse } from 'next/server';
import { Prisma, MessageStatus } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get IP and user agent for spam prevention
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        ipAddress,
        userAgent,
        status: MessageStatus.NEW
      }
    });

    // TODO: Send email notification
    // await sendEmailNotification(contactMessage);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: { id: contactMessage.id }
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status');

    const where: Prisma.ContactMessageWhereInput = statusParam
      ? { status: statusParam as MessageStatus }
      : {};

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}