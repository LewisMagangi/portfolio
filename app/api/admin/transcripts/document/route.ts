// Upload or replace the transcript PDF (multipart, field "file"). Stored privately in the database.
import { NextRequest, NextResponse } from "next/server"

import { verifyAuth } from "@/lib/auth"
import { MAX_TRANSCRIPT_BYTES, saveTranscriptFile } from "@/lib/transcripts"

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  const form = await request.formData().catch(() => null)
  const file = form?.get("file")
  if (!(file instanceof File)) return NextResponse.json({ success: false, error: "Choose a PDF to upload." }, { status: 400 })
  if (file.size > MAX_TRANSCRIPT_BYTES) return NextResponse.json({ success: false, error: "The PDF must be under 4 MB." }, { status: 413 })

  const bytes = await file.arrayBuffer()
  // Check the file really is a PDF, not just named like one.
  if (new TextDecoder().decode(bytes.slice(0, 5)) !== "%PDF-") {
    return NextResponse.json({ success: false, error: "That file isn’t a PDF." }, { status: 415 })
  }
  const saved = await saveTranscriptFile(file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120) || "transcript.pdf", bytes)
  return NextResponse.json({ success: true, data: saved })
}
