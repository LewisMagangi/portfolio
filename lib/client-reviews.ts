// Server only. Client reviews from /review: create them, and approve or decline them from Admin › References.
// A reviewer's words are stored and published exactly as sent. Nothing here edits name, role or content.
import { revalidatePath } from "next/cache"

import { sendAlert, sendMail } from "@/lib/email"
import { prisma } from "@/lib/prisma"
import type { ReviewInput } from "@/lib/review-schema"

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://lewismagangi.vercel.app"

export const firstName = (name: string) => name.trim().split(/\s+/)[0] || name

export async function createClientReview(input: ReviewInput) {
  const row = await prisma.testimonial.create({
    data: {
      source: "CLIENT_REVIEW",
      status: "PENDING",
      name: input.name,
      email: input.email,
      role: input.role,
      company: input.org ?? null,
      relation: input.relation,
      project: input.project ?? null,
      content: input.review,
      link: input.link ?? null,
      consentAt: new Date(),
    },
  })

  // No email here: Lewis gets one daily digest of the queue (sendReviewDigest, /api/cron/reviews).
  return row
}

export type ReviewDecision = "approve" | "decline" | "undo"

/**
 * Applies a decision from the queue. Approving appends the review to the end of the Home references
 * and thanks the reviewer; declining hides it and sends nothing; undo puts it back in the queue.
 */
export async function decideClientReview(id: string, decision: ReviewDecision) {
  const review = await prisma.testimonial.findFirst({ where: { id, source: "CLIENT_REVIEW" } })
  if (!review) return null

  if (decision === "approve") {
    if (review.status === "APPROVED") return review
    const last = await prisma.testimonial.aggregate({
      where: { source: "CLIENT_REVIEW", status: "APPROVED" },
      _max: { orderIndex: true },
    })
    const updated = await prisma.testimonial.update({
      where: { id },
      data: { status: "APPROVED", orderIndex: (last._max.orderIndex ?? -1) + 1 },
    })
    revalidatePath("/")
    if (review.email) {
      await sendMail({
        to: review.email,
        subject: "Your review is live",
        text: [
          `Hi ${firstName(review.name)},`,
          "",
          "Thank you for your review. It’s now on my site with the other references, exactly as you wrote it:",
          `${SITE}/#trust`,
          "",
          "If you ever want it taken down, reply to this email and I’ll remove it.",
          "",
          "Lewis",
        ].join("\n"),
      })
    }
    return updated
  }

  const updated = await prisma.testimonial.update({
    where: { id },
    data: { status: decision === "decline" ? "REJECTED" : "PENDING" },
  })
  if (review.status === "APPROVED") revalidatePath("/")
  return updated
}

const DAY = 24 * 60 * 60 * 1000

/**
 * The daily email to Lewis: every review still waiting in the queue, newest first, with the ones that
 * arrived in the last day marked new. It lists the whole queue, so a review can't fall between two runs,
 * and nothing is sent while the queue is empty.
 */
export async function sendReviewDigest(now = new Date()) {
  const waiting = await prisma.testimonial.findMany({
    where: { source: "CLIENT_REVIEW", status: "PENDING" },
    orderBy: { createdAt: "desc" },
  })
  if (!waiting.length) return { waiting: 0, fresh: 0, sent: false }

  const since = now.getTime() - DAY
  const fresh = waiting.filter((r) => r.createdAt.getTime() > since).length
  const count = (n: number) => `${n} review${n === 1 ? "" : "s"}`

  const blocks = waiting.map((r) =>
    [
      `${r.createdAt.getTime() > since ? "New: " : ""}${r.name}, ${[r.role, r.company].filter(Boolean).join(", ")}`,
      `${r.relation ?? "Relationship not given"}${r.project ? `, ${r.project}` : ""}`,
      ...(r.email ? [`Email: ${r.email}`] : []),
      ...(r.link ? [`Link: ${r.link}`] : []),
      "",
      r.content,
    ].join("\n"),
  )

  const sent = await sendAlert({
    subject: fresh
      ? `${count(fresh)} new, ${waiting.length} waiting for you`
      : `${count(waiting.length)} still waiting for you`,
    text: [
      `${count(waiting.length)} waiting in Admin › References${fresh ? `, ${fresh} new since yesterday` : ""}.`,
      "Confirm you worked together, then approve or decline:",
      `${SITE}/admin/testimonials`,
      "",
      blocks.join("\n\n---\n\n"),
    ].join("\n"),
  })
  return { waiting: waiting.length, fresh, sent }
}
