// The /contact form's fields and rules (design/v8/boards/Contact.dc.html), shared by the form and the server action.
import { z } from "zod"

export const SUBJECTS = [
  "Hiring: AI/ML engineering",
  "Hiring: full stack",
  "Collaboration",
  "A game of chess",
  "Something else",
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Add your name.").max(80),
  email: z.string().trim().email("Add an email I can reply to.").max(160),
  subject: z
    .union([z.enum(SUBJECTS), z.literal("")])
    .optional()
    .transform((v) => v || undefined),
  message: z
    .string()
    .trim()
    .min(10, "Your message needs at least 10 characters.")
    .max(4000, "Your message can be up to 4,000 characters."),
})

export type ContactInput = z.infer<typeof contactSchema>
export type ContactField = keyof ContactInput

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message: string; fields: Partial<Record<ContactField, string>> }
  | { status: "sent"; firstName: string }
