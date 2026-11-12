// GET ?email=&t=: the link in the confirmation email. Adds the subscriber, then returns to /blog.
import { NextRequest, NextResponse } from "next/server"

import { confirm, normalise, verify } from "@/lib/newsletter"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const email = normalise(url.searchParams.get("email") ?? "")
  const token = url.searchParams.get("t") ?? ""
  const back = new URL("/blog", url)
  try {
    if (!email || !verify("confirm", email, token)) {
      back.searchParams.set("subscribed", "invalid")
      return NextResponse.redirect(back)
    }
    await confirm(email)
    back.searchParams.set("subscribed", "yes")
  } catch (e) {
    console.error("[newsletter] confirm failed", e)
    back.searchParams.set("subscribed", "error")
  }
  return NextResponse.redirect(back)
}
