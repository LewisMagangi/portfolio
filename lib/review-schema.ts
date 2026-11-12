// The /review form's fields and rules (design/v8/boards/Review.dc.html), shared by the form and the server action.
import { z } from "zod"

export const RELATIONS = ["Client project", "Colleague", "Team I led", "Mentor or lecturer", "Other"] as const

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v || undefined)

export const reviewSchema = z.object({
  name: z.string().trim().min(2, "Add your name.").max(80),
  email: z.string().trim().email("Add an email I can reach you on.").max(160),
  role: z.string().trim().min(2, "Add your role.").max(80),
  org: optional(80),
  relation: z.enum(RELATIONS, { errorMap: () => ({ message: "Choose how we worked together." }) }),
  project: optional(80),
  review: z
    .string()
    .trim()
    .min(40, "Your review needs at least 40 characters.")
    .max(800, "Your review can be up to 800 characters."),
  link: optional(200).refine((v) => !v || /^https?:\/\/\S+\.\S+/.test(v), "Use a full link starting with https://"),
  consent: z.literal("on", { errorMap: () => ({ message: "Tick the box so I can publish your review." }) }),
})

export type ReviewInput = z.infer<typeof reviewSchema>
export type ReviewField = keyof ReviewInput

export type ReviewState =
  | { status: "idle" }
  | { status: "error"; message: string; fields: Partial<Record<ReviewField, string>> }
  | { status: "sent"; firstName: string }
