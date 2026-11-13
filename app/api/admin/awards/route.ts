// Admin › Awards: the rankings and honours on Home.
// GET lists them (bringing in the launch list first if the table is empty). POST takes one action at a time.
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { verifyAuth } from "@/lib/auth"
import { seedAwardsIfEmpty } from "@/lib/awards"
import { AWARD_LINKS } from "@/lib/content/awards"
import type { AwardTone } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status })
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")

class Invalid extends Error {}

const ORDER = [{ orderIndex: "asc" as const }, { createdAt: "asc" as const }]
const list = async () => ({ awards: await prisma.award.findMany({ orderBy: ORDER }), links: AWARD_LINKS })

function awardData(d: Record<string, unknown>) {
  const rank = str(d.rank)
  if (!rank) throw new Invalid("Add the rank or result, like #3, 7/9 or Best.")
  if (rank.length > 12) throw new Invalid("Keep the rank short, 12 characters at most, like #3 or Scholar.")
  const title = str(d.title)
  if (!title) throw new Invalid("An award needs a title.")
  const event = str(d.event)
  if (!event) throw new Invalid("Add the event, like Enactus Kenya National Expo, Ngong Hotel.")
  const year = str(d.year)
  if (!/^\d{4}$/.test(year)) throw new Invalid("The year is four digits, like 2025.")
  const tone = (str(d.tone) || "RANKING") as AwardTone
  if (tone !== "RANKING" && tone !== "QUIET") throw new Invalid("Pick a tone: Ranking or Quiet.")

  // Links go to a page on this site; the label follows the kind of page.
  const href = str(d.href) || null
  const target = href ? AWARD_LINKS.find((l) => l.href === href) : null
  if (href && !target) throw new Invalid("Pick where the award links from the list.")
  const proofUrl = str(d.proofUrl) || null
  if (proofUrl && !/^https?:\/\/\S+$/.test(proofUrl)) throw new Invalid("The proof link is a full address starting with https://")

  return {
    rank,
    title,
    event,
    year,
    tone,
    href,
    linkLabel: target?.linkLabel ?? null,
    proofUrl,
    featured: d.featured === true || d.featured === "on" || d.featured === "true",
  }
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  try {
    await seedAwardsIfEmpty()
    return NextResponse.json({ success: true, data: await list() })
  } catch {
    return fail("Couldn’t read awards. The database may need the awards table (npm run db:push).", 500)
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  const body = (await request.json().catch(() => ({}))) as {
    action?: "create" | "update" | "delete" | "move" | "feature"
    id?: string
    dir?: -1 | 1
    featured?: boolean
    data?: Record<string, unknown>
  }
  const { action, id, data = {} } = body

  try {
    if (action === "create") {
      const last = await prisma.award.aggregate({ _max: { orderIndex: true } })
      await prisma.award.create({ data: { ...awardData(data), orderIndex: (last._max.orderIndex ?? -1) + 1 } })
    } else if (action === "update" && id) {
      await prisma.award.update({ where: { id }, data: awardData(data) })
    } else if (action === "feature" && id) {
      await prisma.award.update({ where: { id }, data: { featured: !!body.featured } })
    } else if (action === "delete" && id) {
      await prisma.award.delete({ where: { id } })
    } else if (action === "move" && id) {
      const ids = (await prisma.award.findMany({ orderBy: ORDER, select: { id: true } })).map((r) => r.id)
      const i = ids.indexOf(id)
      const j = i + (body.dir === -1 ? -1 : 1)
      if (i >= 0 && j >= 0 && j < ids.length) {
        ;[ids[i], ids[j]] = [ids[j], ids[i]]
        await prisma.$transaction(ids.map((rid, k) => prisma.award.update({ where: { id: rid }, data: { orderIndex: k } })))
      }
    } else return fail("Unknown action.")
  } catch (e) {
    if (e instanceof Invalid) return fail(e.message)
    if (e && typeof e === "object" && "code" in e && e.code === "P2025") return fail("That award is gone. Reload the page.", 404)
    return fail("That didn’t save. Try again.", 500)
  }

  revalidatePath("/")
  return NextResponse.json({ success: true, data: await list() })
}
