// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
      },
      { status: 401 }
    );
  }

  const token = authHeader.slice(7).trim();

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return NextResponse.json(
      {
        success: false,
        error: 'Server configuration error',
      },
      { status: 500 }
    );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

    const user = {
      id: (decoded.sub as string) || (decoded.id as string) || '',
      name: (decoded.name as string) || '',
      email: (decoded.email as string) || '',
      role: (decoded.role as string) || 'user',
      avatar: decoded.avatar ?? null,
    };

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid or expired token',
      },
      { status: 401 }
    );
  }
}