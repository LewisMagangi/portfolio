"use server"

import { headers } from "next/headers"

import { firstName } from "@/lib/client-reviews"
import { contactSchema, type ContactField, type ContactState } from "@/lib/contact-schema"
import { sendAlert } from "@/lib/email"
import { prisma } from "@/lib/prisma"

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://lewismagangi.vercel.app"

/** Saves the message for Admin › Messages and emails Lewis, with the sender as reply-to. */
export async function sendMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Bots fill the hidden field; a person never sees it. Pretend it worked so they don't retry.
  if (String(form.get("website") ?? "")) return { status: "sent", firstName: "there" }

  const parsed = contactSchema.safeParse(Object.fromEntries(form))
  if (!parsed.success) {
    const fields: Partial<Record<ContactField, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField
      fields[key] ??= issue.message
    }
    return { status: "error", message: "A few fields need another look.", fields }
  }

  const { name, email, subject, message } = parsed.data
  const h = headers()
  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject ?? null,
        message,
        ipAddress: h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null,
        userAgent: h.get("user-agent") || null,
      },
    })
  } catch (err) {
    console.error("Could not save contact message", err)
    return {
      status: "error",
      message: "Your message didn’t send, and nothing was lost. Try again in a minute.",
      fields: {},
    }
  }

  // The message is saved either way; a failed alert only means Lewis sees it in the admin first.
  await sendAlert({
    replyTo: email,
    subject: `${subject ?? "New message"} from ${name}`,
    text: [`${name} <${email}>`, ...(subject ? [subject] : []), "", message, "", `${SITE}/admin/messages`].join("\n"),
  }).catch((err) => console.error("Could not send contact alert", err))

  return { status: "sent", firstName: firstName(name) }
}
