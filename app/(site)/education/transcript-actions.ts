"use server"

import { z } from "zod"

import { createTranscriptRequest, REASONS } from "@/lib/transcripts"

export type TranscriptField = "name" | "email" | "organisation" | "reason" | "agree"
export type TranscriptState =
  | { status: "idle" }
  | { status: "error"; message: string; fields: Partial<Record<TranscriptField, string>> }
  | { status: "sent"; email: string }

const schema = z.object({
  name: z.string().trim().min(2, "Add your name.").max(80),
  email: z.string().trim().email("Use a work email like name@company.com.").max(160),
  organisation: z.string().trim().min(2, "Add your organisation.").max(120),
  reason: z.enum(REASONS, { errorMap: () => ({ message: "Choose why you need it." }) }),
  note: z.string().trim().max(600).optional(),
  agree: z.literal("on", { errorMap: () => ({ message: "Confirm how you’ll use it." }) }),
})

/** Saves a transcript request as PENDING and emails Lewis. Nothing is shared until he approves it. */
export async function submitTranscriptRequest(_prev: TranscriptState, form: FormData): Promise<TranscriptState> {
  if (String(form.get("website") ?? "")) return { status: "sent", email: "your email" }

  const parsed = schema.safeParse(Object.fromEntries(form))
  if (!parsed.success) {
    const fields: Partial<Record<TranscriptField, string>> = {}
    for (const issue of parsed.error.issues) fields[issue.path[0] as TranscriptField] ??= issue.message
    return { status: "error", message: "A few fields need another look.", fields }
  }
  try {
    const { agree: _agree, ...data } = parsed.data
    await createTranscriptRequest(data)
  } catch (err) {
    console.error("Could not save transcript request", err)
    return { status: "error", message: "Your request didn’t send, and nothing was lost. Try again in a minute.", fields: {} }
  }
  return { status: "sent", email: parsed.data.email }
}
