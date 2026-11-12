// Server only. Blog subscriptions with double opt in, and no extra table: the confirmation and unsubscribe
// links carry an HMAC of the address, so nothing is stored until the reader clicks the link we emailed.
import { createHmac, timingSafeEqual } from "crypto"

import { sendMail } from "@/lib/email"
import { prisma } from "@/lib/prisma"

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://lewismagangi.vercel.app"
export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

type Purpose = "confirm" | "unsubscribe"

function secret() {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error("JWT_SECRET is not set")
  return s
}

const sign = (purpose: Purpose, email: string) => createHmac("sha256", secret()).update(`newsletter:${purpose}:${email}`).digest("base64url")

export function verify(purpose: Purpose, email: string, token: string) {
  const a = Buffer.from(sign(purpose, email))
  const b = Buffer.from(token)
  return a.length === b.length && timingSafeEqual(a, b)
}

export const normalise = (email: string) => email.trim().toLowerCase()

export const linkFor = (purpose: Purpose, email: string) =>
  `${SITE}/api/newsletter/${purpose}?email=${encodeURIComponent(email)}&t=${sign(purpose, email)}`

/** Sends the confirmation link. Returns false when the email couldn't go out. */
export async function sendConfirmation(email: string) {
  return sendMail({
    to: email,
    subject: "Confirm your subscription to Lewis Magangi’s blog",
    text: [
      "Hi,",
      "",
      "Someone, hopefully you, asked to get new posts from lewismagangi.vercel.app by email.",
      "Confirm with this link and you’ll get one email per post, nothing else:",
      "",
      linkFor("confirm", email),
      "",
      "If this wasn’t you, ignore this email and nothing will arrive.",
      "",
      "Lewis",
    ].join("\n"),
  })
}

export async function confirm(email: string) {
  await prisma.newsletterSubscriber.upsert({
    where: { email },
    create: { email },
    update: { status: "ACTIVE", unsubscribedAt: null },
  })
}

export async function unsubscribe(email: string) {
  await prisma.newsletterSubscriber.updateMany({ where: { email }, data: { status: "UNSUBSCRIBED", unsubscribedAt: new Date() } })
}
