// Daily at 06:00 EAT (03:00 UTC, see vercel.json): emails a reminder to everyone whose call is tomorrow.
import { NextRequest, NextResponse } from "next/server"

import { sendReminders } from "@/lib/bookings"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.json(await sendReminders())
}
