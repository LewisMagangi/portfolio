// Admin › Skills: the skills on /skills, with level, how each was used and its evidence links.
// GET lists them (bringing in the launch list first if nothing has evidence yet). POST takes one action at a time.
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { verifyAuth } from "@/lib/auth"
import type { SkillCategory, SkillLevel } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"
import { CATEGORIES, asEvidence, seedSkillsIfEmpty } from "@/lib/skills"

export const dynamic = "force-dynamic"

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status })
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")

// The groups come along so the editor names them as the site does.
const list = async () => ({
  skills: await prisma.skill.findMany({ orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }] }),
  categories: CATEGORIES,
})

const LEVELS: SkillLevel[] = ["SHIPPED", "TRAINED", "LEARNING"]

/** Evidence comes in as lines of "Label | href". */
function parseEvidence(v: unknown) {
  if (Array.isArray(v)) return asEvidence(v)
  const out: { label: string; href: string }[] = []
  for (const line of String(v ?? "").split("\n")) {
    if (!line.trim()) continue
    const [label, href] = line.split("|").map((x) => x.trim())
    if (!label || !href) throw new Error(`Each evidence line needs a label and a link, like “Wamumbi | /work/wamumbi-charity-platform”. Check “${line.trim()}”.`)
    if (!/^(\/|https?:\/\/)/.test(href)) throw new Error(`Evidence links start with / for a page on this site, or https://. Check “${href}”.`)
    out.push({ label, href })
  }
  return out
}

function skillData(d: Record<string, unknown>) {
  const name = str(d.name)
  if (!name) throw new Error("A skill needs a name.")
  const category = str(d.category) as SkillCategory
  if (!CATEGORIES.some((c) => c.value === category)) throw new Error("Pick the group this skill shows under.")
  const level = str(d.level) as SkillLevel
  if (!LEVELS.includes(level)) throw new Error("Pick a level: Shipped, Trained or Learning.")
  const evidence = parseEvidence(d.evidence)
  if (evidence.length === 0) throw new Error("Every skill on the site links to its evidence. Add at least one project or course.")
  return { name, category, level, how: str(d.how) || null, evidence }
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  try {
    await seedSkillsIfEmpty()
    return NextResponse.json({ success: true, data: await list() })
  } catch {
    return fail("Couldn’t read skills. The database may need the v8 skill columns (npm run db:push).", 500)
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  const body = (await request.json().catch(() => ({}))) as {
    action?: "create" | "update" | "delete" | "move"
    id?: string
    dir?: -1 | 1
    data?: Record<string, unknown>
  }
  const { action, id, data = {} } = body

  try {
    if (action === "create") {
      const next = skillData(data)
      const last = await prisma.skill.aggregate({ where: { category: next.category }, _max: { orderIndex: true } })
      await prisma.skill.create({ data: { ...next, orderIndex: (last._max.orderIndex ?? -1) + 1 } })
    } else if (action === "update" && id) {
      const next = skillData(data)
      const before = await prisma.skill.findUnique({ where: { id }, select: { category: true } })
      // Moving to another group puts it at the end of that group.
      const order =
        before && before.category !== next.category
          ? { orderIndex: ((await prisma.skill.aggregate({ where: { category: next.category }, _max: { orderIndex: true } }))._max.orderIndex ?? -1) + 1 }
          : {}
      await prisma.skill.update({ where: { id }, data: { ...next, ...order } })
    } else if (action === "delete" && id) {
      await prisma.skill.delete({ where: { id } })
    } else if (action === "move" && id) {
      const row = await prisma.skill.findUnique({ where: { id }, select: { category: true } })
      if (row) {
        // Order is per group, so arrows swap within the group only.
        const ids = (
          await prisma.skill.findMany({ where: { category: row.category }, orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }], select: { id: true } })
        ).map((r) => r.id)
        const i = ids.indexOf(id)
        const j = i + (body.dir === -1 ? -1 : 1)
        if (i >= 0 && j >= 0 && j < ids.length) {
          ;[ids[i], ids[j]] = [ids[j], ids[i]]
          await prisma.$transaction(ids.map((rid, k) => prisma.skill.update({ where: { id: rid }, data: { orderIndex: k } })))
        }
      }
    } else return fail("Unknown action.")
  } catch (e) {
    if (e instanceof Error && /needs|Pick|Every skill|Each evidence|Evidence links/.test(e.message)) return fail(e.message)
    if (e && typeof e === "object" && "code" in e && e.code === "P2002") return fail("There is already a skill with that name.")
    return fail("That didn’t save. Try again.", 500)
  }

  revalidatePath("/skills")
  return NextResponse.json({ success: true, data: await list() })
}
