// POST: books a call. The slot is re-checked on the server; a clash returns 409 with code "taken".
import { NextRequest, NextResponse } from "next/server"

import { BookingError, createBooking, parseInput, toPublic } from "@/lib/bookings"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
  // A field people never see; bots fill it in. Pretend it worked.
  if (typeof body.website === "string" && body.website) return NextResponse.json({ success: true, data: null })
  try {
    const booking = await createBooking(parseInput(body))
    return NextResponse.json({ success: true, data: { ...(await toPublic(booking)), token: booking.token } })
  } catch (e) {
    if (e instanceof BookingError) {
      const status = e.code === "taken" ? 409 : e.code === "closed" ? 403 : 400
      return NextResponse.json({ success: false, code: e.code, error: e.message }, { status })
    }
    console.error("[bookings] create failed", e)
    return NextResponse.json({ success: false, error: "That didn’t book. Try again in a moment." }, { status: 500 })
  }
}
