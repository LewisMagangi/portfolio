// Server only. Discovery call bookings: availability, booking, moving and cancelling, the calendar invite,
// and the emails (Email-Booking board). Times are stored in UTC and shown in the settings' time zone (EAT).
import { randomBytes } from "crypto"

import {
  CHANGE_CUTOFF_HOURS,
  TOPICS,
  dateIn,
  hmIn,
  localLine,
  tzAbbr,
  ymdIn,
  zonedToUtc,
  type Availability,
  type Day,
  type PublicBooking,
  tzOffset,
} from "@/lib/booking-shared"
import { sendAlert, sendMail } from "@/lib/email"
import type { Booking, BookingSettings } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://lewismagangi.vercel.app"
const ACTIVE = ["CONFIRMED", "RESCHEDULED"] as const

export type Hours = { day: number; on: boolean; from: string; to: string }[]

// Admin-Bookings board defaults: weekdays 09:00 to 17:30, Friday to 13:00, weekends off.
export const DEFAULT_HOURS: Hours = [
  { day: 0, on: true, from: "09:00", to: "17:30" },
  { day: 1, on: true, from: "09:00", to: "17:30" },
  { day: 2, on: true, from: "09:00", to: "17:30" },
  { day: 3, on: true, from: "09:00", to: "17:30" },
  { day: 4, on: true, from: "09:00", to: "13:00" },
  { day: 5, on: false, from: "10:00", to: "12:00" },
  { day: 6, on: false, from: "10:00", to: "12:00" },
]

export async function getSettings(): Promise<BookingSettings> {
  return prisma.bookingSettings.upsert({ where: { id: "default" }, create: { id: "default", hours: DEFAULT_HOURS }, update: {} })
}

export function hoursOf(s: BookingSettings): Hours {
  const h = s.hours as unknown
  return Array.isArray(h) && h.length === 7 ? (h as Hours) : DEFAULT_HOURS
}

const toMin = (hm: string) => Number(hm.slice(0, 2)) * 60 + Number(hm.slice(3, 5))
const toHm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`

/** Monday first: 0 is Monday, 6 is Sunday. */
const weekdayOf = (ymd: string) => (new Date(`${ymd}T12:00:00Z`).getUTCDay() + 6) % 7
const addDays = (ymd: string, n: number) => {
  const d = new Date(`${ymd}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

type Busy = { start: number; end: number }

async function busyBetween(from: Date, to: Date, bufferMin: number, exceptId?: string): Promise<Busy[]> {
  const pad = bufferMin * 60000
  const [bookings, blocks] = await Promise.all([
    prisma.booking.findMany({
      where: {
        status: { in: [...ACTIVE] },
        startsAt: { gte: new Date(from.getTime() - 4 * 3600000), lte: to },
        ...(exceptId ? { id: { not: exceptId } } : {}),
      },
      select: { startsAt: true, durationMin: true },
    }),
    prisma.blockedTime.findMany({ where: { endsAt: { gte: from }, startsAt: { lte: to } }, select: { startsAt: true, endsAt: true } }),
  ])
  return [
    // A booking also holds the buffer either side of it.
    ...bookings.map((b) => ({ start: b.startsAt.getTime() - pad, end: b.startsAt.getTime() + b.durationMin * 60000 + pad })),
    ...blocks.map((b) => ({ start: b.startsAt.getTime(), end: b.endsAt.getTime() })),
  ]
}

/** Open weekdays from tomorrow to the horizon, each with its slots; a slot taken or too soon is marked not free. */
export async function getAvailability(opts: { exceptId?: string } = {}): Promise<Availability> {
  const s = await getSettings()
  const tz = s.timezone
  const now = new Date()
  const today = ymdIn(now, tz)
  const hours = hoursOf(s)
  const step = s.durationMin + s.bufferMin
  const earliest = now.getTime() + s.noticeHours * 3600000

  const dates = Array.from({ length: s.horizonDays }, (_, i) => addDays(today, i + 1))
  const rangeEnd = zonedToUtc(addDays(today, s.horizonDays + 1), "00:00", tz)
  // Each booking holds its buffer either side, so a slot only has to stay clear of these spans.
  const busy = await busyBetween(now, rangeEnd, s.bufferMin, opts.exceptId)

  const days: Day[] = []
  for (const date of dates) {
    const h = hours[weekdayOf(date)]
    if (!h?.on) continue
    const slots = []
    for (let m = toMin(h.from); m + s.durationMin <= toMin(h.to); m += step) {
      const time = toHm(m)
      const start = zonedToUtc(date, time, tz).getTime()
      const end = start + s.durationMin * 60000
      const clash = busy.some((b) => start < b.end && b.start < end)
      slots.push({ time, startsAt: new Date(start).toISOString(), free: s.open && start >= earliest && !clash })
    }
    if (slots.length) days.push({ date, slots })
  }
  return { open: s.open, timezone: tz, tzLabel: `${tzAbbr(tz)} (UTC${offsetLabel(tz)})`, durationMin: s.durationMin, horizonDays: s.horizonDays, today, days }
}

function offsetLabel(tz: string) {
  const mins = tzOffset(new Date(), tz)
  const a = Math.abs(mins)
  return `${mins < 0 ? "−" : "+"}${Math.floor(a / 60)}${a % 60 ? `:${String(a % 60).padStart(2, "0")}` : ""}`
}

/** True when `startsAt` is one of the free slots right now. */
async function isFree(startsAt: Date, exceptId?: string) {
  const a = await getAvailability({ exceptId })
  const iso = startsAt.toISOString()
  return a.days.some((d) => d.slots.some((x) => x.startsAt === iso && x.free))
}

const newRef = () => {
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  return "LM-" + Array.from(randomBytes(6), (b) => abc[b % abc.length]).join("")
}

export type BookingInput = {
  name: string
  email: string
  company?: string
  topic: string
  notes?: string
  startsAt: string
  visitorTz?: string
}

export class BookingError extends Error {
  constructor(
    public code: "invalid" | "taken" | "closed" | "too-late" | "not-found",
    message: string,
  ) {
    super(message)
  }
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "")
const validTz = (tz: string) => {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz })
    return true
  } catch {
    return false
  }
}

export function parseInput(body: Record<string, unknown>): BookingInput {
  const name = clean(body.name, 120)
  const email = clean(body.email, 254).toLowerCase()
  const topic = clean(body.topic, 80)
  const startsAt = clean(body.startsAt, 40)
  if (!name) throw new BookingError("invalid", "Enter your name.")
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new BookingError("invalid", "Enter an email address like you@company.com.")
  if (!(TOPICS as readonly string[]).includes(topic)) throw new BookingError("invalid", "Pick what the call is about.")
  if (Number.isNaN(Date.parse(startsAt))) throw new BookingError("invalid", "Pick a time.")
  const tz = clean(body.visitorTz, 64)
  return { name, email, topic, startsAt, company: clean(body.company, 120) || undefined, notes: clean(body.notes, 2000) || undefined, visitorTz: tz && validTz(tz) ? tz : undefined }
}

const isTaken = (e: unknown) => !!e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2002"

export async function createBooking(input: BookingInput) {
  const s = await getSettings()
  if (!s.open) throw new BookingError("closed", "Bookings are paused for now. Send a message instead and I’ll reply within two working days.")
  const startsAt = new Date(input.startsAt)
  if (!(await isFree(startsAt))) throw new BookingError("taken", "That time just went. Pick another and your details stay as you entered them.")
  let booking: Booking
  try {
    booking = await prisma.booking.create({
      data: {
        ref: newRef(),
        token: randomBytes(24).toString("base64url"),
        name: input.name,
        email: input.email,
        company: input.company,
        topic: input.topic,
        notes: input.notes,
        visitorTz: input.visitorTz,
        startsAt,
        durationMin: s.durationMin,
        slotKey: startsAt.toISOString(),
      },
    })
  } catch (e) {
    if (isTaken(e)) throw new BookingError("taken", "That time just went. Pick another and your details stay as you entered them.")
    throw e
  }
  await Promise.all([sendConfirmation(booking, s), s.notify ? notifyLewis(booking, s, "booked") : Promise.resolve(true)])
  return booking
}

export const canChange = (b: Pick<Booking, "status" | "startsAt">) =>
  (ACTIVE as readonly string[]).includes(b.status) && b.startsAt.getTime() - Date.now() > CHANGE_CUTOFF_HOURS * 3600000

export async function getByToken(token: string) {
  if (!token || token.length < 20) return null
  return prisma.booking.findUnique({ where: { token } })
}

export async function toPublic(b: Booking): Promise<PublicBooking> {
  const s = await getSettings()
  return {
    ref: b.ref,
    name: b.name,
    email: b.email,
    company: b.company,
    topic: b.topic,
    notes: b.notes,
    startsAt: b.startsAt.toISOString(),
    durationMin: b.durationMin,
    status: b.status,
    meetUrl: s.meetUrl,
    canChange: canChange(b),
    timezone: s.timezone,
  }
}

export async function reschedule(token: string, startsAtIso: string) {
  const b = await getByToken(token)
  if (!b) throw new BookingError("not-found", "That booking link doesn’t work.")
  if (!canChange(b)) throw new BookingError("too-late", `Calls can be moved up to ${CHANGE_CUTOFF_HOURS} hours before they start.`)
  const startsAt = new Date(startsAtIso)
  if (Number.isNaN(startsAt.getTime()) || !(await isFree(startsAt, b.id))) throw new BookingError("taken", "That time just went. Pick another.")
  let next: Booking
  try {
    next = await prisma.booking.update({
      where: { id: b.id },
      data: { startsAt, slotKey: startsAt.toISOString(), status: "RESCHEDULED", rescheduledAt: new Date(), reminderSentAt: null },
    })
  } catch (e) {
    if (isTaken(e)) throw new BookingError("taken", "That time just went. Pick another.")
    throw e
  }
  const s = await getSettings()
  await Promise.all([sendMoved(next, s, b.startsAt), s.notify ? notifyLewis(next, s, "moved", b.startsAt) : Promise.resolve(true)])
  return next
}

export async function cancel(token: string, reason?: string, opts: { byAdmin?: boolean } = {}) {
  const b = await getByToken(token)
  if (!b) throw new BookingError("not-found", "That booking link doesn’t work.")
  if (!opts.byAdmin && !canChange(b)) throw new BookingError("too-late", `Calls can be cancelled up to ${CHANGE_CUTOFF_HOURS} hours before they start.`)
  const next = await prisma.booking.update({
    where: { id: b.id },
    data: { status: "CANCELLED", slotKey: null, cancelledAt: new Date(), cancelReason: reason?.slice(0, 200) || null },
  })
  const s = await getSettings()
  await Promise.all([sendCancelled(next, s, !!opts.byAdmin), s.notify && !opts.byAdmin ? notifyLewis(next, s, "cancelled") : Promise.resolve(true)])
  return next
}

// ---------- Calendar invite ----------

const icsTime = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
const icsText = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (m) => `\\${m}`)

export function buildIcs(b: Booking, s: BookingSettings, method: "REQUEST" | "CANCEL" = "REQUEST") {
  const end = new Date(b.startsAt.getTime() + b.durationMin * 60000)
  const organiser = process.env.SMTP_USER || "noreply@lewismagangi.vercel.app"
  const desc = [`Topic: ${b.topic}`, s.meetUrl ? `Google Meet: ${s.meetUrl}` : "", `Reschedule or cancel: ${manageUrl(b)}`].filter(Boolean).join("\n")
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lewis Magangi//Bookings//EN",
    `METHOD:${method}`,
    "BEGIN:VEVENT",
    `UID:${b.id}@lewismagangi`,
    `SEQUENCE:${Math.floor(b.updatedAt.getTime() / 1000)}`,
    `DTSTAMP:${icsTime(new Date())}`,
    `DTSTART:${icsTime(b.startsAt)}`,
    `DTEND:${icsTime(end)}`,
    `SUMMARY:${icsText("Discovery call with Lewis Magangi")}`,
    `DESCRIPTION:${icsText(desc)}`,
    s.meetUrl ? `LOCATION:${icsText(s.meetUrl)}` : "",
    `ORGANIZER;CN=Lewis Magangi:mailto:${organiser}`,
    `ATTENDEE;CN=${icsText(b.name)};RSVP=FALSE:mailto:${b.email}`,
    method === "CANCEL" ? "STATUS:CANCELLED" : "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n")
}

// ---------- Emails (Email-Booking board) ----------

export const manageUrl = (b: Pick<Booking, "token">) => `${SITE}/book/manage/${b.token}`
const first = (name: string) => name.split(/\s+/)[0]

function whenLines(b: Booking, s: BookingSettings) {
  const tz = s.timezone
  const end = new Date(b.startsAt.getTime() + b.durationMin * 60000)
  const local = localLine(b.startsAt, tz, b.visitorTz)
  return {
    long: `${dateIn(b.startsAt, tz, "long")}, ${hmIn(b.startsAt, tz)} to ${hmIn(end, tz)} ${tzAbbr(tz)}${local ? `\n      ${local}` : ""}`,
    short: `${dateIn(b.startsAt, tz)} at ${hmIn(b.startsAt, tz)} ${tzAbbr(tz)}`,
    shortLocal: `${dateIn(b.startsAt, tz)}, ${hmIn(b.startsAt, tz)} ${tzAbbr(tz)}${local ? ` (${local})` : ""}`,
  }
}

const meetLine = (s: BookingSettings) => (s.meetUrl ? `Google Meet: ${s.meetUrl}` : "Google Meet: I’ll send the link before the call.")
const foot = (b: Booking) => `\n\n\nLewis Magangi, software engineer, Nairobi, Kenya\n${SITE}\nYou got this because you booked a call on my site. Booking ${b.ref}.`

function sendConfirmation(b: Booking, s: BookingSettings) {
  const w = whenLines(b, s)
  return sendMail({
    to: b.email,
    subject: `Confirmed: free discovery call, ${w.short}`,
    text: [
      `You’re booked, ${first(b.name)}.`,
      "",
      "Thanks for booking a call. Here are the details; the calendar invite is attached.",
      "",
      `When:  ${w.long}`,
      `Where: ${meetLine(s)}`,
      `Topic: ${b.topic}`,
      "",
      "If there’s anything I should read beforehand, reply to this email with a link.",
      "",
      `Need a different time? Reschedule or cancel, up to ${CHANGE_CUTOFF_HOURS} hours before: ${manageUrl(b)}`,
      "",
      "Talk soon,",
      "Lewis",
    ].join("\n") + foot(b),
    ics: { filename: "discovery-call.ics", content: buildIcs(b, s) },
  })
}

function sendMoved(b: Booking, s: BookingSettings, was: Date) {
  const w = whenLines(b, s)
  return sendMail({
    to: b.email,
    subject: `Moved: free discovery call, now ${w.short}`,
    text: [
      `Your call is moved, ${first(b.name)}.`,
      "",
      `It was ${dateIn(was, s.timezone)} at ${hmIn(was, s.timezone)} ${tzAbbr(s.timezone)}. The new details are below, and the attached invite updates your calendar.`,
      "",
      `When:  ${w.long}`,
      `Where: ${meetLine(s)}`,
      "",
      `Reschedule or cancel: ${manageUrl(b)}`,
      "",
      "Lewis",
    ].join("\n") + foot(b),
    ics: { filename: "discovery-call.ics", content: buildIcs(b, s) },
  })
}

function sendCancelled(b: Booking, s: BookingSettings, byAdmin: boolean) {
  const w = whenLines(b, s)
  return sendMail({
    to: b.email,
    subject: `Cancelled: discovery call, ${w.short}`,
    text: [
      `Hi ${first(b.name)},`,
      "",
      byAdmin
        ? `I’ve had to cancel our call on ${w.short}. Sorry for the change. Pick another time here: ${SITE}/book`
        : `Your call on ${w.short} is cancelled and the time is free again. Book again any time: ${SITE}/book`,
      "",
      "Lewis",
    ].join("\n") + foot(b),
    ics: { filename: "discovery-call.ics", content: buildIcs(b, s, "CANCEL"), method: "CANCEL" },
  })
}

function notifyLewis(b: Booking, s: BookingSettings, what: "booked" | "moved" | "cancelled", was?: Date) {
  const w = whenLines(b, s)
  const who = `${b.name} (${b.email}${b.company ? `, ${b.company}` : ""})`
  const subject =
    what === "booked"
      ? `New booking: ${b.name}, ${dateIn(b.startsAt, s.timezone)} ${hmIn(b.startsAt, s.timezone)}`
      : what === "moved"
        ? `Moved: ${b.name}, now ${dateIn(b.startsAt, s.timezone)} ${hmIn(b.startsAt, s.timezone)}`
        : `Cancelled: ${b.name}, ${dateIn(b.startsAt, s.timezone)} ${hmIn(b.startsAt, s.timezone)}`
  const line =
    what === "booked"
      ? `${who} booked a call about ${b.topic.toLowerCase()}.`
      : what === "moved"
        ? `${who} moved their call from ${was ? `${dateIn(was, s.timezone)} ${hmIn(was, s.timezone)}` : "its old time"} to ${w.short}.`
        : `${who} cancelled their call on ${w.short}.${b.cancelReason ? ` Reason: ${b.cancelReason}.` : ""}`
  return sendAlert({
    subject,
    text: [line, b.notes && what === "booked" ? `\n“${b.notes}”` : "", "", `Open in admin: ${SITE}/admin/bookings`].join("\n"),
    replyTo: b.email,
  })
}

/** Daily (see vercel.json): emails everyone whose call is tomorrow, once. */
export async function sendReminders() {
  const s = await getSettings()
  const tz = s.timezone
  const tomorrow = ymdIn(new Date(Date.now() + 24 * 3600000), tz)
  const from = zonedToUtc(tomorrow, "00:00", tz)
  const to = zonedToUtc(addDays(tomorrow, 1), "00:00", tz)
  const due = await prisma.booking.findMany({ where: { status: { in: [...ACTIVE] }, reminderSentAt: null, startsAt: { gte: from, lt: to } } })
  let sent = 0
  for (const b of due) {
    const w = whenLines(b, s)
    const ok = await sendMail({
      to: b.email,
      subject: `Tomorrow at ${hmIn(b.startsAt, tz)} ${tzAbbr(tz)}: our call`,
      text: [`See you tomorrow, ${first(b.name)}.`, "", `When:  ${w.shortLocal}`, `Where: ${meetLine(s)}`, "", `Reschedule or cancel: ${manageUrl(b)}`].join("\n") + `\n\n\nBooking ${b.ref}`,
    })
    if (ok) {
      sent++
      await prisma.booking.update({ where: { id: b.id }, data: { reminderSentAt: new Date() } })
    }
  }
  return { due: due.length, sent }
}

/** Looks up upcoming bookings for an email and sends their manage links (Book page › "Already booked?"). */
export async function resendLinks(email: string) {
  const list = await prisma.booking.findMany({ where: { email: email.toLowerCase(), status: { in: [...ACTIVE] }, startsAt: { gt: new Date() } }, orderBy: { startsAt: "asc" } })
  if (list.length === 0) return
  const s = await getSettings()
  await sendMail({
    to: email,
    subject: "Your booking links",
    text: ["Here are the links to move or cancel your upcoming calls:", "", ...list.map((b) => `${whenLines(b, s).short}: ${manageUrl(b)}`), "", "Lewis"].join("\n"),
  })
}

