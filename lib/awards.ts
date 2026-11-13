// Server only. The awards on Home, edited in Admin › Awards.
// Falls back to the launch list in lib/content/awards.ts while the table is empty or not pushed yet.
import { AWARDS, type AwardData } from "@/lib/content/awards"
import type { Award } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"

export const toAwardData = (a: Award): AwardData => ({
  rank: a.rank,
  title: a.title,
  event: a.event,
  year: a.year,
  tone: a.tone === "QUIET" ? "quiet" : "ranking",
  ...(a.href ? { href: a.href, linkLabel: a.linkLabel || "See the work" } : {}),
  ...(a.proofUrl ? { proofUrl: a.proofUrl } : {}),
})

/** The awards shown on Home, in the order set in the admin. */
export async function getAwards(): Promise<AwardData[]> {
  try {
    const rows = await prisma.award.findMany({ orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }] })
    // Never edited yet: show the launch list. Once there are rows, Home shows only those switched on.
    return rows.length === 0 ? AWARDS : rows.filter((r) => r.featured).map(toAwardData)
  } catch {
    // No database, or the awards table isn't pushed yet.
    return AWARDS
  }
}

/** Admin › Awards starts from what Home shows: an empty table takes the launch list. */
export async function seedAwardsIfEmpty() {
  if ((await prisma.award.count()) > 0) return
  await prisma.award.createMany({
    data: AWARDS.map((a, i) => ({
      rank: a.rank,
      title: a.title,
      event: a.event,
      year: a.year,
      tone: a.tone === "quiet" ? ("QUIET" as const) : ("RANKING" as const),
      href: a.href ?? null,
      linkLabel: a.linkLabel ?? null,
      proofUrl: a.proofUrl ?? null,
      featured: true,
      orderIndex: i,
    })),
  })
}
