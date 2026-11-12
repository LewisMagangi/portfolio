// Admin › Bookings. GET lists bookings, blocked time, settings and the numbers at the top.
// POST takes one action: settings, block, unblock, status (held or missed) or cancel (emails the visitor).
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { verifyAuth } from "@/lib/auth"
import { BookingError, cancel, getSettings, hoursOf, type Hours } from "@/lib/bookings"
import { zonedToUtc } from "@/lib/booking-shared"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status })
const ACTIVE = ["CONFIRMED", "RESCHEDULED"] as const

async function list() {
  const now = new Date()
  const ninety = new Date(now.getTime() - 90 * 86400000)
  const [bookings, blocks, settings] = await Promise.all([
    prisma.booking.findMany({ orderBy: { startsAt: "desc" }, take: 500, omit: { token: true } }),
    prisma.blockedTime.findMany({ where: { endsAt: { gte: now } }, orderBy: { startsAt: "asc" } }),
    getSettings(),
  ])
  const upcoming = bookings.filter((b) => (ACTIVE as readonly string[]).includes(b.status) && b.startsAt > now).reverse()
  const tz = settings.timezone
  const monthStart = zonedToUtc(new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit" }).format(now) + "-01", "00:00", tz)
  return {
    bookings,
    upcoming,
    blocks,
    settings: { ...settings, hours: hoursOf(settings) },
    kpis: {
      upcoming: upcoming.length,
      next: upcoming[0]?.startsAt ?? null,
      thisMonth: bookings.filter((b) => b.startsAt >= monthStart && b.startsAt <= now && b.status !== "CANCELLED" && b.status !== "NO_SHOW").length,
      noShows: bookings.filter((b) => b.status === "NO_SHOW" && b.startsAt >= ninety).length,
    },
  }
}

const HM = /^([01]\d|2[0-3]):[0-5]\d$/

function parseSettings(d: Record<string, unknown>) {
  const num = (v: unknown, allowed: number[], fallback: number) => (allowed.includes(Number(v)) ? Number(v) : fallback)
  const hours = Array.isArray(d.hours) ? (d.hours as Hours) : null
  if (!hours || hours.length !== 7) throw new Error("Set hours for all seven days.")
  for (const h of hours) {
    if (!HM.test(h.from) || !HM.test(h.to)) throw new Error("Use times like 09:00.")
    if (h.on && h.from >= h.to) throw new Error("Each day’s start time must be before its end time.")
  }
  const tz = typeof d.timezone === "string" ? d.timezone : "Africa/Nairobi"
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz })
  } catch {
    throw new Error("That time zone isn’t recognised.")
  }
  const meet = typeof d.meetUrl === "string" ? d.meetUrl.trim() : ""
  if (meet && !/^https:\/\/meet\.google\.com\/[a-z0-9-]+$/i.test(meet) && !/^https:\/\//.test(meet)) throw new Error("The meeting link should start with https://.")
  return {
    open: d.open !== false,
    timezone: tz,
    durationMin: num(d.durationMin, [15, 30, 45], 30),
    bufferMin: num(d.bufferMin, [0, 10, 15, 30], 15),
    noticeHours: num(d.noticeHours, [2, 12, 24, 48], 12),
    notify: d.notify !== false,
    meetUrl: meet || null,
    hours: hours.map((h, i) => ({ day: i, on: !!h.on, from: h.from, to: h.to })),
  }
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  try {
    return NextResponse.json({ success: true, data: await list() })
  } catch (e) {
    console.error("[admin bookings] list failed", e)
    return fail("Couldn’t read bookings. The database may need the bookings tables (npm run db:push).", 500)
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) return fail("Unauthorized", 401)
  const body = (await request.json().catch(() => ({}))) as { action?: string; id?: string; data?: Record<string, unknown> }
  const { action, id, data = {} } = body
  try {
    if (action === "settings") {
      await getSettings()
      await prisma.bookingSettings.update({ where: { id: "default" }, data: parseSettings(data) })
    } else if (action === "open") {
      await getSettings()
      await prisma.bookingSettings.update({ where: { id: "default" }, data: { open: data.open !== false } })
    } else if (action === "block") {
      const s = await getSettings()
      const date = String(data.date ?? "")
      const from = String(data.from ?? "")
      const to = String(data.to ?? "")
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !HM.test(from) || !HM.test(to) || from >= to) throw new Error("Pick a date, and a start time before the end time.")
      await prisma.blockedTime.create({
        data: { startsAt: zonedToUtc(date, from, s.timezone), endsAt: zonedToUtc(date, to, s.timezone), note: String(data.note ?? "").trim().slice(0, 120) || null },
      })
    } else if (action === "unblock" && id) {
      await prisma.blockedTime.delete({ where: { id } })
    } else if (action === "status" && id) {
      const status = data.status === "NO_SHOW" ? "NO_SHOW" : data.status === "COMPLETED" ? "COMPLETED" : data.status === "CONFIRMED" ? "CONFIRMED" : null
      if (!status) throw new Error("Unknown status.")
      const b = await prisma.booking.findUniqueOrThrow({ where: { id } })
      if (b.status === "CANCELLED") throw new Error("A cancelled call can’t be marked.")
      if (status !== "CONFIRMED" && b.startsAt > new Date()) throw new Error("Mark a call held or missed once its time has passed.")
      await prisma.booking.update({ where: { id }, data: { status } })
    } else if (action === "cancel" && id) {
      const b = await prisma.booking.findUniqueOrThrow({ where: { id }, select: { token: true } })
      await cancel(b.token, typeof data.reason === "string" ? data.reason : undefined, { byAdmin: true })
    } else return fail("Unknown action.")
  } catch (e) {
    if (e instanceof BookingError) return fail(e.message)
    if (e instanceof Error && !("code" in e)) return fail(e.message)
    console.error("[admin bookings] action failed", e)
    return fail("That didn’t save. Try again.", 500)
  }
  revalidatePath("/book")
  return NextResponse.json({ success: true, data: await list() })
}
