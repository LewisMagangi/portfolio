// POST { email }: emails the manage links for that address's upcoming calls. Always answers the same way,
// so it can't be used to find out who has booked.
import { NextRequest, NextResponse } from "next/server"

import { resendLinks } from "@/lib/bookings"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { email?: unknown }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Enter the email you booked with." }, { status: 400 })
  }
  try {
    await resendLinks(email)
  } catch (e) {
    console.error("[bookings] resend failed", e)
  }
  return NextResponse.json({ success: true })
}
