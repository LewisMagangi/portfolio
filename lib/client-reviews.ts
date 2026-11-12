// Server only. Client reviews from /review: create them, and approve or decline them from Admin › References.
// A reviewer's words are stored and published exactly as sent. Nothing here edits name, role or content.
import { revalidatePath } from "next/cache"

import { adminAddress, sendMail } from "@/lib/email"
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

  // Sent straight away; a daily digest is still undecided (design/v8/HANDOFF.md, "Not decided yet").
  await sendMail({
    to: adminAddress(),
    replyTo: input.email,
    subject: `New review from ${input.name}`,
    text: [
      `${input.name}, ${[input.role, input.org].filter(Boolean).join(", ")}`,
      `${input.relation}${input.project ? `, ${input.project}` : ""}`,
      ...(input.link ? [`Link: ${input.link}`] : []),
      "",
      input.review,
      "",
      `Confirm you worked together, then approve or decline: ${SITE}/admin/testimonials`,
    ].join("\n"),
  })

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
