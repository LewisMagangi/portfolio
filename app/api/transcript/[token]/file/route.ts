// The transcript PDF, served only through an approved, unexpired link. Never cached, never indexed.
import { NextResponse } from "next/server"

import { checkAccess, getTranscriptFile } from "@/lib/transcripts"

export const dynamic = "force-dynamic"

const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
}

export async function GET(_req: Request, { params }: { params: { token: string } }) {
  const access = await checkAccess(params.token)
  if (access.state !== "open") {
    return NextResponse.json({ error: "This link isn’t open." }, { status: access.state === "missing" ? 404 : 410, headers: PRIVATE_HEADERS })
  }
  const file = await getTranscriptFile()
  if (!file) return NextResponse.json({ error: "The transcript isn’t uploaded yet." }, { status: 404, headers: PRIVATE_HEADERS })

  return new NextResponse(Buffer.from(file.data), {
    headers: {
      ...PRIVATE_HEADERS,
      "Content-Type": "application/pdf",
      "Content-Length": String(file.size),
      "Content-Disposition": `inline; filename="Lewis_Magangi_BSc_transcript.pdf"`,
      "Content-Security-Policy": "frame-ancestors 'self'",
    },
  })
}
