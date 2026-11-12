// POST { action: "approve" | "decline" | "revoke" | "reapprove" } from Admin › Transcripts.
import { NextRequest, NextResponse } from "next/server"

import { verifyAuth } from "@/lib/auth"
import { decideTranscriptRequest, type TranscriptAction } from "@/lib/transcripts"

const ACTIONS: TranscriptAction[] = ["approve", "decline", "revoke", "reapprove"]

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAuth(request)) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  const body = await request.json().catch(() => ({}))
  if (!ACTIONS.includes(body?.action)) return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 })
  try {
    const result = await decideTranscriptRequest(params.id, body.action)
    if (!result.ok) {
      return NextResponse.json({ success: false, error: result.error }, { status: result.error === "not_found" ? 404 : 409 })
    }
    const { status, expiresAt } = result.request
    return NextResponse.json({ success: true, data: { status, expiresAt, emailed: result.emailed } })
  } catch (err) {
    console.error("Transcript decision failed", err)
    return NextResponse.json({ success: false, error: "Could not update the request" }, { status: 500 })
  }
}
