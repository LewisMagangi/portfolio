// Server only: imported from server components (uses Prisma).
import type { Reference } from "@/lib/content/home"
import { prisma } from "@/lib/prisma"

const MONTH = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "Africa/Nairobi" })

/**
 * Client reviews Lewis has approved in Admin › References, oldest first, shaped as reference cards.
 * The reviewer's words are shown exactly as submitted. Returns [] if the database is unreachable,
 * so the page still renders with the reference letters.
 */
export async function getApprovedClientReviews(): Promise<Reference[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { source: "CLIENT_REVIEW", status: "APPROVED" },
      orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
      select: { name: true, role: true, company: true, relation: true, project: true, content: true, quote: true, createdAt: true },
    })
    return rows.map((r) => ({
      relation: [r.relation, r.project].filter(Boolean).join(", ") || "Client review",
      date: MONTH.format(r.createdAt),
      name: r.name,
      role: [r.role, r.company].filter(Boolean).join(", "),
      quote: r.quote || r.content,
      ...(r.quote ? { full: r.content, moreLabel: `Read ${r.name.split(" ")[0]}’s full review` } : {}),
    }))
  } catch (err) {
    console.error("Could not load client reviews", err)
    return []
  }
}
