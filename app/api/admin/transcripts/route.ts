// Admin › Transcripts: every request (never the link hashes) and the uploaded file's details.
import { NextRequest, NextResponse } from "next/server"

import { verifyAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getTranscriptFileInfo } from "@/lib/transcripts"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  const [requests, file] = await Promise.all([
    prisma.transcriptRequest.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true, name: true, email: true, organisation: true, reason: true, note: true, status: true,
        createdAt: true, decidedAt: true, approvedAt: true, expiresAt: true, lastViewedAt: true, viewCount: true,
      },
    }),
    getTranscriptFileInfo(),
  ])
  return NextResponse.json({ success: true, data: { requests, file } })
}
