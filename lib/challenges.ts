// Server only. The platforms on the Chess page and in Off the clock on Home, edited in Admin › Challenges.
// Falls back to the launch list in lib/content/home.ts while the table is empty or not pushed yet.
import type { Challenge as ChallengeItem } from "@/components/gambit/challenge-board"
import type { IconName } from "@/components/gambit/icon"
import { OFF } from "@/lib/content/home"
import type { Challenge } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"

/** The platforms the site knows; the first four load a live rating where the platform shares one. */
export const PLATFORMS: { value: string; label: string; group: "chess" | "coding"; live: boolean }[] = [
  { value: "lichess", label: "Lichess", group: "chess", live: true },
  { value: "chesscom", label: "Chess.com", group: "chess", live: true },
  { value: "leetcode", label: "LeetCode", group: "coding", live: false },
  { value: "codewars", label: "Codewars", group: "coding", live: true },
  { value: "other", label: "Other", group: "coding", live: false },
]
export const ICONS: { value: IconName; label: string }[] = [
  { value: "knight", label: "Knight" },
  { value: "crown", label: "Crown" },
  { value: "code", label: "Code" },
  { value: "puzzle", label: "Puzzle" },
]

const LAUNCH: ChallengeItem[] = OFF.challenges.map((c) => ({ ...c }))

const toItem = (c: Challenge): ChallengeItem => ({
  platform: c.platform,
  icon: (ICONS.some((i) => i.value === c.icon) ? c.icon : "code") as IconName,
  label: c.label,
  handle: c.handle,
  invite: c.invite,
  cta: c.cta,
  href: c.href,
  ...(c.live ? {} : { live: false }),
})

/** Every platform for the Chess page, and the ones switched on for Home, in the admin's order. */
export async function getChallenges(): Promise<{ all: ChallengeItem[]; home: ChallengeItem[] }> {
  try {
    const rows = await prisma.challenge.findMany({ orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }] })
    if (rows.length === 0) return { all: LAUNCH, home: LAUNCH }
    return { all: rows.map(toItem), home: rows.filter((r) => r.featured).map(toItem) }
  } catch {
    // No database, or the challenges table isn't pushed yet.
    return { all: LAUNCH, home: LAUNCH }
  }
}

/** Admin › Challenges starts from what the site shows: an empty table takes the launch list. */
export async function seedChallengesIfEmpty() {
  if ((await prisma.challenge.count()) > 0) return
  await prisma.challenge.createMany({
    data: OFF.challenges.map((c, i) => ({ ...c, live: true, featured: true, orderIndex: i })),
  })
}
