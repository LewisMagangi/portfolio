// Server only. The shelf on /reading and the "Reading now" list on Home, edited in Admin › Books.
// Falls back to lib/content/reading.ts (and the Home list in lib/content/home.ts) while the table is empty
// or not pushed yet.
import { OFF } from "@/lib/content/home"
import { FINISHED, INTRO, NEXT, READING, WANT, type Book as ShelfBook, type BookGroup } from "@/lib/content/reading"
import type { Book, BookShelf } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"

export type HomeBook = { title: string; where: string }
export type ShelfView = { lead: string; reading: ShelfBook[]; next: ShelfBook[]; read: ShelfBook[]; wishlist: BookGroup[]; home: HomeBook[] }

export const SHELVES: { value: BookShelf; label: string }[] = [
  { value: "READING", label: "Reading now" },
  { value: "UP_NEXT", label: "Up next" },
  { value: "FINISHED", label: "Finished" },
  { value: "WANT", label: "Want to read" },
]

const FALLBACK: ShelfView = {
  lead: INTRO.lead,
  reading: READING,
  next: NEXT,
  read: FINISHED,
  wishlist: WANT,
  home: OFF.reading.map((b) => ({ title: b.title, where: b.where })),
}

const WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"]
const word = (n: number, lower = false) => {
  const w = WORDS[n] ?? String(n)
  return lower ? w.toLowerCase() : w
}

/** The intro counts the shelves: "Fifteen finished, nine in progress, two next." */
function leadFor(finished: number, reading: number, next: number) {
  return INTRO.lead.replace(/\w+ finished, \w+ in progress, \w+ next\./, `${word(finished)} finished, ${word(reading, true)} in progress, ${word(next, true)} next.`)
}

/** On /reading a book in progress shows where I am, then any note after it. */
const whereOf = (b: Book) => {
  if (!b.position) return b.note ?? undefined
  if (!b.note) return b.position
  return /[.!?]$/.test(b.position) ? `${b.position} ${b.note}` : `${b.position}. ${b.note}`
}

const strip = <T extends object>(o: T) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null)) as T

/** Rows sorted by orderIndex, as the shelves. */
export function buildShelf(rows: Book[]): ShelfView {
  const on = (s: BookShelf) => rows.filter((r) => r.shelf === s)
  const reading = on("READING").map((b) => strip({ title: b.title, author: b.author ?? undefined, pct: b.progress ?? undefined, where: whereOf(b) }))
  const next = on("UP_NEXT").map((b) => strip({ title: b.title, author: b.author ?? undefined, note: b.note ?? undefined }))
  const read = on("FINISHED").map((b) => strip({ title: b.title, author: b.author ?? undefined }))
  const want = on("WANT")
  const genres = Array.from(new Set(want.map((b) => b.genre || "Other")))
  const wishlist = genres.map((name) => ({
    name,
    books: want.filter((b) => (b.genre || "Other") === name).map((b) => strip({ title: b.title, author: b.author ?? undefined })),
  }))
  const home = on("READING")
    .filter((b) => b.featured)
    .map((b) => ({ title: b.title, where: b.position || b.note || "" }))
  return { lead: leadFor(read.length, reading.length, next.length), reading, next, read, wishlist, home }
}

export async function getShelf(): Promise<ShelfView> {
  try {
    const rows = await prisma.book.findMany({ orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }] })
    return rows.length === 0 ? FALLBACK : buildShelf(rows)
  } catch {
    // No database, or the books table isn't pushed yet.
    return FALLBACK
  }
}

/**
 * The launch shelf as rows. A book on Home keeps Home's shorter line as where I am, and the rest of the
 * Reading page line becomes its note, so both pages read as they do today.
 */
export function launchBooks() {
  const home = new Map(OFF.reading.map((b) => [b.title, b.where]))
  const reading = READING.map((b, i) => {
    const short = home.get(b.title)
    const split = short && b.where?.startsWith(`${short}. `) ? { position: short, note: b.where.slice(short.length + 2) } : { position: b.where ?? null, note: null }
    return { title: b.title, author: b.author ?? null, shelf: "READING" as const, progress: b.pct ?? null, ...split, featured: home.has(b.title), orderIndex: i }
  })
  const next = NEXT.map((b, i) => ({ title: b.title, author: b.author ?? null, shelf: "UP_NEXT" as const, note: b.note ?? null, featured: false, orderIndex: i }))
  const finished = FINISHED.map((b, i) => ({ title: b.title, author: b.author ?? null, shelf: "FINISHED" as const, featured: false, orderIndex: i }))
  let k = 0
  const want = WANT.flatMap((g) => g.books.map((b) => ({ title: b.title, author: b.author ?? null, shelf: "WANT" as const, genre: g.name, featured: false, orderIndex: k++ })))
  return [...reading, ...next, ...finished, ...want]
}

/** Admin › Books starts from what the site shows: an empty table takes the launch shelf. */
export async function seedBooksIfEmpty() {
  if ((await prisma.book.count()) > 0) return
  await prisma.book.createMany({ data: launchBooks() })
}
