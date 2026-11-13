// Admin › Books: the shelf on /reading and "Reading now" on Home.
// GET lists them (bringing in the launch shelf first if the table is empty). POST takes one action at a time.
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { verifyAuth } from "@/lib/auth"
import { SHELVES, seedBooksIfEmpty } from "@/lib/books"
import type { BookShelf } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status })
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")
const opt = (v: unknown) => str(v) || null

class Invalid extends Error {}

const ORDER = [{ orderIndex: "asc" as const }, { createdAt: "asc" as const }]
const list = async () => ({ books: await prisma.book.findMany({ orderBy: ORDER }), shelves: SHELVES })

function bookData(d: Record<string, unknown>) {
  const title = str(d.title)
  if (!title) throw new Invalid("A book needs a title.")
  const shelf = str(d.shelf) as BookShelf
  if (!SHELVES.some((s) => s.value === shelf)) throw new Invalid("Pick a shelf.")
  const p = str(d.progress)
  let progress: number | null = null
  if (p) {
    progress = Number(p.replace(/%$/, ""))
    if (!Number.isInteger(progress) || progress < 0 || progress > 100) throw new Invalid("Progress is a whole percent from 0 to 100, or leave it empty.")
  }
  const featured = d.featured === true || d.featured === "on" || d.featured === "true"
  return {
    title,
    author: opt(d.author),
    shelf,
    genre: opt(d.genre),
    position: opt(d.position),
    note: opt(d.note),
    progress: shelf === "READING" ? progress : null,
    // Only books in progress show on Home.
    featured: shelf === "READING" && featured,
  }
}

// New books, and books moved to another shelf, go to the top of that shelf.
const toTop = (shelf: BookShelf) => prisma.book.updateMany({ where: { shelf }, data: { orderIndex: { increment: 1 } } })

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  try {
    await seedBooksIfEmpty()
    return NextResponse.json({ success: true, data: await list() })
  } catch {
    return fail("Couldn’t read books. The database may need the books table (npm run db:push).", 500)
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
      const next = bookData(data)
      await prisma.$transaction([toTop(next.shelf), prisma.book.create({ data: { ...next, orderIndex: 0 } })])
    } else if (action === "update" && id) {
      const next = bookData(data)
      const before = await prisma.book.findUnique({ where: { id }, select: { shelf: true } })
      if (!before) return fail("That book is gone. Reload the page.", 404)
      if (before.shelf !== next.shelf) {
        await prisma.$transaction([toTop(next.shelf), prisma.book.update({ where: { id }, data: { ...next, orderIndex: 0 } })])
      } else {
        await prisma.book.update({ where: { id }, data: next })
      }
    } else if (action === "feature" && id) {
      const row = await prisma.book.findUnique({ where: { id }, select: { shelf: true } })
      if (!row) return fail("That book is gone. Reload the page.", 404)
      if (body.featured && row.shelf !== "READING") return fail("Only books you’re reading now show on Home.")
      await prisma.book.update({ where: { id }, data: { featured: !!body.featured } })
    } else if (action === "delete" && id) {
      await prisma.book.delete({ where: { id } })
    } else if (action === "move" && id) {
      const row = await prisma.book.findUnique({ where: { id }, select: { shelf: true } })
      if (row) {
        const ids = (await prisma.book.findMany({ where: { shelf: row.shelf }, orderBy: ORDER, select: { id: true } })).map((r) => r.id)
        const i = ids.indexOf(id)
        const j = i + (body.dir === -1 ? -1 : 1)
        if (i >= 0 && j >= 0 && j < ids.length) {
          ;[ids[i], ids[j]] = [ids[j], ids[i]]
          await prisma.$transaction(ids.map((rid, k) => prisma.book.update({ where: { id: rid }, data: { orderIndex: k } })))
        }
      }
    } else return fail("Unknown action.")
  } catch (e) {
    if (e instanceof Invalid) return fail(e.message)
    return fail("That didn’t save. Try again.", 500)
  }

  revalidatePath("/reading")
  revalidatePath("/")
  return NextResponse.json({ success: true, data: await list() })
}
