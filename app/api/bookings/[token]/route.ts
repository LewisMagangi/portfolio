// The manage link. GET shows the booking; POST { action: "reschedule", startsAt } or { action: "cancel", reason }.
// The token is the secret: whoever holds the link from the confirmation email can change the booking.
import { NextRequest, NextResponse } from "next/server"

import { BookingError, cancel, getByToken, reschedule, toPublic } from "@/lib/bookings"

export const dynamic = "force-dynamic"

type Ctx = { params: { token: string } }

export async function GET(_: NextRequest, { params }: Ctx) {
  const b = await getByToken(params.token)
  if (!b) return NextResponse.json({ success: false, error: "That booking link doesn’t work." }, { status: 404 })
  return NextResponse.json({ success: true, data: await toPublic(b) })
}

export async function POST(request: NextRequest, { params }: Ctx) {
  const body = (await request.json().catch(() => ({}))) as { action?: string; startsAt?: string; reason?: string }
  try {
    const b =
      body.action === "reschedule"
        ? await reschedule(params.token, String(body.startsAt ?? ""))
        : body.action === "cancel"
          ? await cancel(params.token, typeof body.reason === "string" ? body.reason : undefined)
          : null
    if (!b) return NextResponse.json({ success: false, error: "Unknown action." }, { status: 400 })
    return NextResponse.json({ success: true, data: await toPublic(b) })
  } catch (e) {
    if (e instanceof BookingError) {
      const status = e.code === "taken" ? 409 : e.code === "not-found" ? 404 : 400
      return NextResponse.json({ success: false, code: e.code, error: e.message }, { status })
    }
    console.error("[bookings] change failed", e)
    return NextResponse.json({ success: false, error: "That didn’t save. Try again in a moment." }, { status: 500 })
  }
}
