// POST { email }: emails a confirmation link. Nothing is stored until it is clicked (lib/newsletter.ts).
import { NextRequest, NextResponse } from "next/server"

import { EMAIL_RE, normalise, sendConfirmation } from "@/lib/newsletter"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { email?: unknown; website?: unknown }
  // A hidden field people never fill in; bots often do. Pretend it worked.
  if (typeof body.website === "string" && body.website) return NextResponse.json({ success: true })
  const email = typeof body.email === "string" ? normalise(body.email) : ""
  if (!email) return NextResponse.json({ success: false, error: "Add your email to subscribe." }, { status: 400 })
  if (!EMAIL_RE.test(email) || email.length > 254)
    return NextResponse.json({ success: false, error: "That email looks incomplete. Try name@company.com." }, { status: 400 })
  try {
    if (await sendConfirmation(email)) return NextResponse.json({ success: true })
  } catch (e) {
    console.error("[newsletter] confirmation failed", e)
  }
  return NextResponse.json(
    { success: false, error: "The confirmation email didn’t send. Try again in a few minutes." },
    { status: 502 },
  )
}
