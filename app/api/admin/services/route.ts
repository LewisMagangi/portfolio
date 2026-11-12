// Admin › Services: the services and price tiers on Home and the Services page.
// GET lists both (filling empty tables from the launch copy first). POST takes one action at a time.
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { ICONS } from "@/components/gambit/icon"
import { verifyAuth } from "@/lib/auth"
import type { Prisma } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"
import { seedServicesIfEmpty } from "@/lib/services"

export const dynamic = "force-dynamic"

type Kind = "service" | "tier"
const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status })

async function list() {
  const [services, tiers] = await Promise.all([
    prisma.service.findMany({ orderBy: { orderIndex: "asc" } }),
    prisma.priceTier.findMany({ orderBy: { orderIndex: "asc" } }),
  ])
  return { services, tiers }
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")
const lines = (v: unknown) =>
  (Array.isArray(v) ? v : String(v ?? "").split("\n")).map((x) => String(x).trim()).filter(Boolean)

function serviceData(d: Record<string, unknown>) {
  const title = str(d.title)
  const body = str(d.body)
  if (!title || !body) throw new Error("A service needs a name and a description.")
  const icon = str(d.icon)
  return {
    title,
    body,
    icon: icon in ICONS ? icon : "code",
    points: lines(d.points),
    showOnHome: d.showOnHome !== false,
  }
}

function tierData(d: Record<string, unknown>) {
  const name = str(d.name)
  const price = str(d.price)
  const forLine = str(d.for)
  if (!name || !price || !forLine) throw new Error("A tier needs a name, a typical price and who it is for.")
  const base = str(d.base)
  return {
    name,
    price,
    base: base && base !== "None" && base !== name ? base : null,
    for: forLine,
    includes: lines(d.includes),
    badge: str(d.badge) || null,
    showOnHome: d.showOnHome !== false,
    highlight: d.highlight === true,
  }
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  try {
    await seedServicesIfEmpty()
    return NextResponse.json({ success: true, data: await list() })
  } catch {
    return fail("Couldn’t read services. The database may need the new services and price_tiers tables (npm run db:push).", 500)
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  const body = (await request.json().catch(() => ({}))) as {
    action?: "create" | "update" | "delete" | "move"
    kind?: Kind
    id?: string
    dir?: -1 | 1
    data?: Record<string, unknown>
  }
  const { action, kind, id, data = {} } = body
  if (kind !== "service" && kind !== "tier") return fail("Unknown kind.")

  try {
    if (kind === "service") {
      if (action === "create") {
        const last = await prisma.service.aggregate({ _max: { orderIndex: true } })
        await prisma.service.create({ data: { ...serviceData(data), orderIndex: (last._max.orderIndex ?? -1) + 1 } })
      } else if (action === "update" && id) {
        await prisma.service.update({ where: { id }, data: serviceData(data) })
      } else if (action === "delete" && id) {
        await prisma.service.delete({ where: { id } })
      } else if (action === "move" && id) {
        const all = await prisma.service.findMany({ orderBy: { orderIndex: "asc" }, select: { id: true } })
        await reorder(all.map((r) => r.id), id, body.dir === -1 ? -1 : 1, (rid, i) => prisma.service.update({ where: { id: rid }, data: { orderIndex: i } }))
      } else return fail("Unknown action.")
    } else {
      if (action === "create") {
        const last = await prisma.priceTier.aggregate({ _max: { orderIndex: true } })
        await prisma.priceTier.create({ data: { ...tierData(data), orderIndex: (last._max.orderIndex ?? -1) + 1 } })
      } else if (action === "update" && id) {
        const before = await prisma.priceTier.findUnique({ where: { id }, select: { name: true } })
        const next = tierData(data)
        await prisma.$transaction([
          prisma.priceTier.update({ where: { id }, data: next }),
          // A renamed tier keeps the tiers that build on it pointing at it.
          ...(before && before.name !== next.name
            ? [prisma.priceTier.updateMany({ where: { base: before.name }, data: { base: next.name } })]
            : []),
        ])
      } else if (action === "delete" && id) {
        const gone = await prisma.priceTier.delete({ where: { id } })
        await prisma.priceTier.updateMany({ where: { base: gone.name }, data: { base: null } })
      } else if (action === "move" && id) {
        const all = await prisma.priceTier.findMany({ orderBy: { orderIndex: "asc" }, select: { id: true } })
        await reorder(all.map((r) => r.id), id, body.dir === -1 ? -1 : 1, (rid, i) => prisma.priceTier.update({ where: { id: rid }, data: { orderIndex: i } }))
      } else return fail("Unknown action.")
    }
  } catch (e) {
    if (e instanceof Error && /needs/.test(e.message)) return fail(e.message)
    if (e && typeof e === "object" && "code" in e && e.code === "P2002") return fail("There is already a tier with that name.")
    return fail("That didn’t save. Try again.", 500)
  }

  revalidatePath("/")
  revalidatePath("/services")
  return NextResponse.json({ success: true, data: await list() })
}

async function reorder(ids: string[], id: string, dir: -1 | 1, write: (id: string, i: number) => Prisma.PrismaPromise<unknown>) {
  const i = ids.indexOf(id)
  const j = i + dir
  if (i < 0 || j < 0 || j >= ids.length) return
  ;[ids[i], ids[j]] = [ids[j], ids[i]]
  await prisma.$transaction(ids.map((rid, k) => write(rid, k)))
}
