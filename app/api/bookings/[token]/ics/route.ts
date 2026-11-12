// GET: the calendar file for a booking ("Add to my calendar").
import { NextRequest, NextResponse } from "next/server"

import { buildIcs, getByToken, getSettings } from "@/lib/bookings"

export const dynamic = "force-dynamic"

export async function GET(_: NextRequest, { params }: { params: { token: string } }) {
  const b = await getByToken(params.token)
  if (!b) return new NextResponse("Not found", { status: 404 })
  const ics = buildIcs(b, await getSettings(), b.status === "CANCELLED" ? "CANCEL" : "REQUEST")
  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="discovery-call.ics"',
      "Cache-Control": "no-store",
    },
  })
}
