// Daily at 07:00 EAT (04:00 UTC, see vercel.json): one email to Lewis listing the client reviews waiting for him.
import { NextRequest, NextResponse } from "next/server"

import { sendReviewDigest } from "@/lib/client-reviews"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.json(await sendReviewDigest())
}
