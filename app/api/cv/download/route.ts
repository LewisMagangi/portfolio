// app/api/cv/download/route.ts
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET() {
  try {
    // Direct file path - no database needed
    const cvPath = join(process.cwd(), 'public', 'Lewis_Magangi_CV.pdf');
    
    // Check if file exists
    if (!existsSync(cvPath)) {
      return NextResponse.json(
        { success: false, message: 'CV not available. Please add your CV as public/Lewis_Magangi_CV.pdf' },
        { status: 404 }
      );
    }

    // Read and serve the CV file
    const fileBuffer = await readFile(cvPath);

    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Lewis_Magangi_CV.pdf"`,
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error downloading CV:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to download CV' },
      { status: 500 }
    );
  }
}