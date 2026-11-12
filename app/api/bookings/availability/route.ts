// GET: the open slots for the booking widget (Book page, and the manage page with ?except=<token> when moving).
import { NextRequest, NextResponse } from "next/server"

import { getAvailability, getByToken } from "@/lib/bookings"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const t = request.nextUrl.searchParams.get("except")
    const own = t ? await getByToken(t) : null
    return NextResponse.json({ success: true, data: await getAvailability({ exceptId: own?.id }) })
  } catch (e) {
    console.error("[bookings] availability failed", e)
    return NextResponse.json({ success: false, error: "Times couldn’t load. Refresh to try again." }, { status: 500 })
  }
}
