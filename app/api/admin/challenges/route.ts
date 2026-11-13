// Admin › Challenges: the platforms on the Chess page and in Off the clock on Home.
// GET lists them (bringing in the launch list first if the table is empty). POST takes one action at a time.
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { verifyAuth } from "@/lib/auth"
import { ICONS, PLATFORMS, seedChallengesIfEmpty } from "@/lib/challenges"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status })
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")
const on = (v: unknown) => v === true || v === "on" || v === "true"

class Invalid extends Error {}

const ORDER = [{ orderIndex: "asc" as const }, { createdAt: "asc" as const }]
const list = async () => ({ challenges: await prisma.challenge.findMany({ orderBy: ORDER }), platforms: PLATFORMS, icons: ICONS })

function challengeData(d: Record<string, unknown>) {
  const platform = str(d.platform)
  if (!PLATFORMS.some((p) => p.value === platform)) throw new Invalid("Pick the platform.")
  const label = str(d.label)
  if (!label) throw new Invalid("Add the name shown on the card, like Codewars.")
  const handle = str(d.handle)
  if (!handle) throw new Invalid("Add your handle on that platform.")
  const invite = str(d.invite)
  if (!invite) throw new Invalid("Add a one line invitation, like Race me on a kata.")
  const cta = str(d.cta)
  if (!cta) throw new Invalid("Add the button label, like See my profile.")
  const href = str(d.href)
  if (!/^https:\/\/\S+$/.test(href)) throw new Invalid("The link is a full address starting with https://")
  const icon = str(d.icon)
  if (!ICONS.some((i) => i.value === icon)) throw new Invalid("Pick an icon.")
  return { platform, label, handle, invite, cta, href, icon, live: on(d.live), featured: on(d.featured) }
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  try {
    await seedChallengesIfEmpty()
    return NextResponse.json({ success: true, data: await list() })
  } catch {
    return fail("Couldn’t read challenges. The database may need the challenges table (npm run db:push).", 500)
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
      const last = await prisma.challenge.aggregate({ _max: { orderIndex: true } })
      await prisma.challenge.create({ data: { ...challengeData(data), orderIndex: (last._max.orderIndex ?? -1) + 1 } })
    } else if (action === "update" && id) {
      await prisma.challenge.update({ where: { id }, data: challengeData(data) })
    } else if (action === "feature" && id) {
      await prisma.challenge.update({ where: { id }, data: { featured: !!body.featured } })
    } else if (action === "delete" && id) {
      await prisma.challenge.delete({ where: { id } })
    } else if (action === "move" && id) {
      const ids = (await prisma.challenge.findMany({ orderBy: ORDER, select: { id: true } })).map((r) => r.id)
      const i = ids.indexOf(id)
      const j = i + (body.dir === -1 ? -1 : 1)
      if (i >= 0 && j >= 0 && j < ids.length) {
        ;[ids[i], ids[j]] = [ids[j], ids[i]]
        await prisma.$transaction(ids.map((rid, k) => prisma.challenge.update({ where: { id: rid }, data: { orderIndex: k } })))
      }
    } else return fail("Unknown action.")
  } catch (e) {
    if (e instanceof Invalid) return fail(e.message)
    if (e && typeof e === "object" && "code" in e && e.code === "P2025") return fail("That platform is gone. Reload the page.", 404)
    return fail("That didn’t save. Try again.", 500)
  }

  revalidatePath("/chess")
  revalidatePath("/")
  return NextResponse.json({ success: true, data: await list() })
}
