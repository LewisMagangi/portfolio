"use server"

import { createClientReview, firstName } from "@/lib/client-reviews"
import { reviewSchema, type ReviewField, type ReviewState } from "@/lib/review-schema"

/** Saves a review as PENDING and emails Lewis. It stays hidden until he approves it in Admin › References. */
export async function submitReview(_prev: ReviewState, form: FormData): Promise<ReviewState> {
  // Bots fill the hidden field; a person never sees it. Pretend it worked so they don't retry.
  if (String(form.get("website") ?? "")) return { status: "sent", firstName: "you" }

  const parsed = reviewSchema.safeParse(Object.fromEntries(form))
  if (!parsed.success) {
    const fields: Partial<Record<ReviewField, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ReviewField
      fields[key] ??= issue.message
    }
    return { status: "error", message: "A few fields need another look.", fields }
  }

  try {
    await createClientReview(parsed.data)
  } catch (err) {
    console.error("Could not save review", err)
    return {
      status: "error",
      message: "Your review didn’t send, and nothing was lost. Try again in a minute.",
      fields: {},
    }
  }
  return { status: "sent", firstName: firstName(parsed.data.name) }
}
