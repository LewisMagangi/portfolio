// Nightly at midnight EAT (21:00 UTC, see vercel.json): closes transcript links whose 60 days are up.
// Links are also checked on every visit, so this only tidies the status shown in the admin.
import { NextRequest, NextResponse } from "next/server"

import { expireTranscriptRequests } from "@/lib/transcripts"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const expired = await expireTranscriptRequests()
  return NextResponse.json({ expired })
}
