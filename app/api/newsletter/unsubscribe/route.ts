// GET ?email=&t=: the unsubscribe link for post emails (lib/newsletter.ts › linkFor("unsubscribe", email)).
import { NextRequest, NextResponse } from "next/server"

import { normalise, unsubscribe, verify } from "@/lib/newsletter"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const email = normalise(url.searchParams.get("email") ?? "")
  const token = url.searchParams.get("t") ?? ""
  const back = new URL("/blog", url)
  try {
    if (!email || !verify("unsubscribe", email, token)) {
      back.searchParams.set("subscribed", "invalid")
      return NextResponse.redirect(back)
    }
    await unsubscribe(email)
    back.searchParams.set("subscribed", "no")
  } catch (e) {
    console.error("[newsletter] unsubscribe failed", e)
    back.searchParams.set("subscribed", "error")
  }
  return NextResponse.redirect(back)
}
