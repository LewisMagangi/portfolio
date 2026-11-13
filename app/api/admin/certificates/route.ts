// Admin › Certificates: the certificates on /certificates and in the Home carousel.
// GET lists them (bringing in the launch list first if the table is empty). POST takes one action at a time.
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { verifyAuth } from "@/lib/auth"
import { CATEGORIES, seedCertificatesIfEmpty } from "@/lib/certificates"
import type { CertificateCategory, CertificateStatus } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status })
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")
const opt = (v: unknown) => str(v) || null

class Invalid extends Error {}

const ORDER = [{ orderIndex: "asc" as const }, { createdAt: "asc" as const }]
const list = async () => ({ certificates: await prisma.certificate.findMany({ orderBy: ORDER }), categories: CATEGORIES })

const STATUSES: CertificateStatus[] = ["VERIFIED", "IN_PROGRESS"]

function size(v: unknown, label: string) {
  const s = str(v)
  if (!s) return null
  const n = Number(s)
  if (!Number.isInteger(n) || n < 1 || n > 10000) throw new Invalid(`The image ${label} is a whole number of pixels, like 1100.`)
  return n
}

function certData(d: Record<string, unknown>) {
  const title = str(d.title)
  if (!title) throw new Invalid("A certificate needs a title.")
  const issuer = str(d.issuer)
  if (!issuer) throw new Invalid("Add the issuer as the card shows it, for example DataCamp, career track.")
  const category = str(d.category) as CertificateCategory
  if (!CATEGORIES.some((c) => c.value === category)) throw new Invalid("Pick where it shows on the Certificates page.")
  const status = (str(d.status) || "VERIFIED") as CertificateStatus
  if (!STATUSES.includes(status)) throw new Invalid("Pick a status: Verified or In progress.")
  const date = str(d.date)
  if (!date) throw new Invalid("Add the date as the site shows it, for example Nov 2026.")

  const verifyUrl = opt(d.verifyUrl)
  if (verifyUrl && !/^https?:\/\/\S+$/.test(verifyUrl)) throw new Invalid("The verify link is a full address starting with https://")
  const image = opt(d.image)
  if (image && !/^(\/\S+|https?:\/\/\S+)$/.test(image)) throw new Invalid("The image is a path on this site, like /certificates/founder-academy.jpg, or a full https:// address.")
  const featured = d.featured === true || d.featured === "on" || d.featured === "true"
  if (featured && !image) throw new Invalid("Add an image to show it in the carousel.")

  return {
    title,
    fullTitle: opt(d.fullTitle),
    issuer,
    org: opt(d.org),
    mark: opt(d.mark),
    category,
    status,
    date,
    length: opt(d.length),
    note: opt(d.note),
    tag: opt(d.tag),
    learned: String(d.learned ?? "")
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean),
    verifyUrl,
    image,
    imageWidth: size(d.imageWidth, "width"),
    imageHeight: size(d.imageHeight, "height"),
    alt: opt(d.alt),
    featured,
  }
}

const nextIndex = async (category: CertificateCategory) =>
  ((await prisma.certificate.aggregate({ where: { category }, _max: { orderIndex: true } }))._max.orderIndex ?? -1) + 1

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  try {
    await seedCertificatesIfEmpty()
    return NextResponse.json({ success: true, data: await list() })
  } catch {
    return fail("Couldn’t read certificates. The database may need the certificates table (npm run db:push).", 500)
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
      const next = certData(data)
      // New certificates go to the top of their group: the page lists newest first.
      await prisma.$transaction([
        prisma.certificate.updateMany({ where: { category: next.category }, data: { orderIndex: { increment: 1 } } }),
        prisma.certificate.create({ data: { ...next, orderIndex: 0 } }),
      ])
    } else if (action === "update" && id) {
      const next = certData(data)
      const before = await prisma.certificate.findUnique({ where: { id }, select: { category: true } })
      if (!before) return fail("That certificate is gone. Reload the page.", 404)
      const order = before.category !== next.category ? { orderIndex: await nextIndex(next.category) } : {}
      await prisma.certificate.update({ where: { id }, data: { ...next, ...order } })
    } else if (action === "feature" && id) {
      const row = await prisma.certificate.findUnique({ where: { id }, select: { image: true } })
      if (!row) return fail("That certificate is gone. Reload the page.", 404)
      if (body.featured && !row.image) return fail("Add an image first, then show it in the carousel.")
      await prisma.certificate.update({ where: { id }, data: { featured: !!body.featured } })
    } else if (action === "delete" && id) {
      await prisma.certificate.delete({ where: { id } })
    } else if (action === "move" && id) {
      const row = await prisma.certificate.findUnique({ where: { id }, select: { category: true } })
      if (row) {
        // Order is per group, so the arrows swap within the group only.
        const ids = (await prisma.certificate.findMany({ where: { category: row.category }, orderBy: ORDER, select: { id: true } })).map((r) => r.id)
        const i = ids.indexOf(id)
        const j = i + (body.dir === -1 ? -1 : 1)
        if (i >= 0 && j >= 0 && j < ids.length) {
          ;[ids[i], ids[j]] = [ids[j], ids[i]]
          await prisma.$transaction(ids.map((rid, k) => prisma.certificate.update({ where: { id: rid }, data: { orderIndex: k } })))
        }
      }
    } else return fail("Unknown action.")
  } catch (e) {
    if (e instanceof Invalid) return fail(e.message)
    return fail("That didn’t save. Try again.", 500)
  }

  revalidatePath("/certificates")
  revalidatePath("/")
  return NextResponse.json({ success: true, data: await list() })
}
