// Server only. The private BSc transcript: requests, decisions, the 60 day link, and the stored file.
// The link token is random and only ever sent in the approval email; the database keeps its sha256.
import { createHash, randomBytes } from "node:crypto"

import { sendAlert, sendMail } from "@/lib/email"
import type { TranscriptStatus } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"
import { ACCESS_DAYS } from "@/lib/transcript-shared"

export { ACCESS_DAYS, REASONS } from "@/lib/transcript-shared"

export const TRANSCRIPT_KEY = "bsc-transcript"
export const MAX_TRANSCRIPT_BYTES = 4 * 1024 * 1024

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://lewismagangi.vercel.app"
const DAY_MS = 86_400_000
const LONG_DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Nairobi" })

export const formatDate = (d: Date) => LONG_DATE.format(d)
const hash = (token: string) => createHash("sha256").update(token).digest("hex")
const firstName = (name: string) => name.trim().split(/\s+/)[0] || name

export type TranscriptInput = { name: string; email: string; organisation: string; reason: string; note?: string }

export async function createTranscriptRequest(input: TranscriptInput) {
  const row = await prisma.transcriptRequest.create({
    data: { ...input, note: input.note || null, consentAt: new Date() },
  })
  await sendAlert({
    replyTo: input.email,
    subject: `Transcript request from ${input.name}, ${input.organisation}`,
    text: [
      `${input.name}, ${input.organisation}`,
      `Email: ${input.email}`,
      `Why: ${input.reason}`,
      ...(input.note ? ["", input.note] : []),
      "",
      `Approve or decline: ${SITE}/admin/transcripts`,
    ].join("\n"),
  })
  return row
}

export type TranscriptAction = "approve" | "decline" | "revoke" | "reapprove"

const ALLOWED: Record<TranscriptStatus, TranscriptAction[]> = {
  PENDING: ["approve", "decline"],
  APPROVED: ["revoke"],
  EXPIRED: ["reapprove"],
  REVOKED: ["reapprove"],
  DECLINED: [],
}

export const actionsFor = (status: TranscriptStatus) => ALLOWED[status]

/** Applies an admin decision. Approving (or approving again) issues a fresh link and emails it. */
export async function decideTranscriptRequest(id: string, action: TranscriptAction) {
  const req = await prisma.transcriptRequest.findUnique({ where: { id } })
  if (!req) return { ok: false as const, error: "not_found" }
  if (!ALLOWED[req.status].includes(action)) return { ok: false as const, error: "not_allowed" }
  const now = new Date()

  if (action === "approve" || action === "reapprove") {
    const token = randomBytes(32).toString("base64url")
    const expiresAt = new Date(now.getTime() + ACCESS_DAYS * DAY_MS)
    const updated = await prisma.transcriptRequest.update({
      where: { id },
      data: { status: "APPROVED", tokenHash: hash(token), approvedAt: now, decidedAt: now, expiresAt },
    })
    const sent = await sendMail({
      to: req.email,
      subject: "Your access to Lewis Magangi’s transcript",
      text: [
        `Hi ${firstName(req.name)},`,
        "",
        "I’ve approved your request. This private link opens my BSc transcript:",
        `${SITE}/transcript/${token}`,
        "",
        `It works until ${formatDate(expiresAt)}, then closes on its own. Please don’t pass it on.`,
        "",
        "Lewis",
      ].join("\n"),
    })
    return { ok: true as const, request: updated, emailed: sent }
  }

  if (action === "decline") {
    const updated = await prisma.transcriptRequest.update({ where: { id }, data: { status: "DECLINED", decidedAt: now } })
    const sent = await sendMail({
      to: req.email,
      subject: "Your transcript request",
      text: [
        `Hi ${firstName(req.name)},`,
        "",
        "Thank you for asking. I can’t share my transcript for this request. If anything changes, you’re welcome to ask again.",
        "",
        "Lewis",
      ].join("\n"),
    })
    return { ok: true as const, request: updated, emailed: sent }
  }

  // Revoke: the link stops working at once. Its hash stays, so an old link explains that it closed.
  const updated = await prisma.transcriptRequest.update({
    where: { id },
    data: { status: "REVOKED", decidedAt: now, expiresAt: now },
  })
  return { ok: true as const, request: updated, emailed: false }
}

export type Access =
  | { state: "open"; request: { name: string; organisation: string; expiresAt: Date; daysLeft: number }; hasFile: boolean }
  | { state: "closed"; closedOn: Date | null; reason: "expired" | "revoked" }
  | { state: "missing" }

/** Looks a link up. Expiry is enforced here on every visit; the nightly job only tidies the status. */
export async function checkAccess(token: string, { recordView = false } = {}): Promise<Access> {
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) return { state: "missing" }
  const req = await prisma.transcriptRequest.findUnique({ where: { tokenHash: hash(token) } })
  if (!req) return { state: "missing" }
  const now = new Date()
  if (req.status === "REVOKED") return { state: "closed", closedOn: req.decidedAt, reason: "revoked" }
  if (req.status !== "APPROVED" || !req.expiresAt || req.expiresAt <= now) {
    return { state: "closed", closedOn: req.expiresAt, reason: "expired" }
  }
  if (recordView) {
    await prisma.transcriptRequest.update({ where: { id: req.id }, data: { viewCount: { increment: 1 }, lastViewedAt: now } })
  }
  const doc = await prisma.privateDocument.findUnique({ where: { key: TRANSCRIPT_KEY }, select: { key: true } })
  return {
    state: "open",
    request: {
      name: req.name,
      organisation: req.organisation,
      expiresAt: req.expiresAt,
      daysLeft: Math.max(1, Math.ceil((req.expiresAt.getTime() - now.getTime()) / DAY_MS)),
    },
    hasFile: Boolean(doc),
  }
}

/** Closes every approved request whose 60 days are up. Run nightly at midnight EAT. */
export async function expireTranscriptRequests() {
  const { count } = await prisma.transcriptRequest.updateMany({
    where: { status: "APPROVED", expiresAt: { lte: new Date() } },
    data: { status: "EXPIRED" },
  })
  return count
}

export async function getTranscriptFile() {
  return prisma.privateDocument.findUnique({ where: { key: TRANSCRIPT_KEY } })
}

export async function getTranscriptFileInfo() {
  return prisma.privateDocument.findUnique({
    where: { key: TRANSCRIPT_KEY },
    select: { filename: true, size: true, updatedAt: true },
  })
}

export async function saveTranscriptFile(filename: string, file: ArrayBuffer) {
  const data = new Uint8Array(file)
  return prisma.privateDocument.upsert({
    where: { key: TRANSCRIPT_KEY },
    create: { key: TRANSCRIPT_KEY, filename, mimeType: "application/pdf", size: data.length, data },
    update: { filename, mimeType: "application/pdf", size: data.length, data },
    select: { filename: true, size: true, updatedAt: true },
  })
}
