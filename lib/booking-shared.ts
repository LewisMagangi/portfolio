// Booking types and helpers safe for the browser and the server (no database here).

export const TOPICS = [
  "Hiring for an engineering role",
  "A project or freelance work",
  "AI or ML engineering",
  "Security review",
  "Mentoring or a chat",
  "Something else",
] as const

export const CANCEL_REASONS = ["The time no longer works", "The role or project changed", "I found what I needed", "Something else"] as const

/** A visitor can move or cancel up to this long before the call. */
export const CHANGE_CUTOFF_HOURS = 2

export type Slot = { time: string; startsAt: string; free: boolean }
export type Day = { date: string; slots: Slot[] }
export type Availability = {
  open: boolean
  timezone: string
  tzLabel: string
  durationMin: number
  horizonDays: number
  today: string
  days: Day[]
}

export type PublicBooking = {
  ref: string
  name: string
  email: string
  company: string | null
  topic: string
  notes: string | null
  startsAt: string
  durationMin: number
  status: "CONFIRMED" | "RESCHEDULED" | "CANCELLED" | "COMPLETED" | "NO_SHOW"
  meetUrl: string | null
  canChange: boolean
  timezone: string
}

export const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

/** Offset of `tz` from UTC at `date`, in minutes (EAT is +180). */
export function tzOffset(date: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date)
  const n = (t: string) => Number(parts.find((p) => p.type === t)?.value)
  const asUtc = Date.UTC(n("year"), n("month") - 1, n("day"), n("hour"), n("minute"), n("second"))
  return Math.round((asUtc - date.getTime()) / 60000)
}

/** "2026-11-16" + "09:30" in `tz` → the UTC instant. */
export function zonedToUtc(ymd: string, hm: string, tz: string) {
  const [y, m, d] = ymd.split("-").map(Number)
  const [hh, mm] = hm.split(":").map(Number)
  const guess = Date.UTC(y, m - 1, d, hh, mm)
  const first = guess - tzOffset(new Date(guess), tz) * 60000
  // Re-check once in case the offset changes across that instant (not in EAT, but in zones with daylight saving).
  return new Date(guess - tzOffset(new Date(first), tz) * 60000)
}

/** The calendar date ("2026-11-16") of an instant in `tz`. */
export function ymdIn(date: Date, tz: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(date)
}

/** "09:30" for an instant in `tz`. */
export function hmIn(date: Date, tz: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date)
}

/** "Thu 5 Nov" (short) or "Thursday 5 November 2026" (long) for an instant in `tz`. */
export function dateIn(date: Date, tz: string, style: "short" | "long" | "medium" = "short") {
  const opts: Intl.DateTimeFormatOptions =
    style === "long"
      ? { weekday: "long", day: "numeric", month: "long", year: "numeric" }
      : style === "medium"
        ? { weekday: "short", day: "numeric", month: "short", year: "numeric" }
        : { weekday: "short", day: "numeric", month: "short" }
  return new Intl.DateTimeFormat("en-GB", { timeZone: tz, ...opts }).format(date).replace(/,/g, "")
}

/** "EAT" for Africa/Nairobi; otherwise the short zone name the browser gives. */
export function tzAbbr(tz: string, at = new Date()) {
  if (tz === "Africa/Nairobi") return "EAT"
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: tz, timeZoneName: "short" }).formatToParts(at)
  return p.find((x) => x.type === "timeZoneName")?.value ?? tz
}

/** "London" from "Europe/London". */
export const cityOf = (tz: string) => tz.split("/").pop()?.replace(/_/g, " ") ?? tz

/** The visitor's time for an instant, or null when it's the same clock as `tz`. */
export function localLine(startsAt: Date, tz: string, visitorTz?: string | null) {
  if (!visitorTz || tzOffset(startsAt, visitorTz) === tzOffset(startsAt, tz)) return null
  return `${hmIn(startsAt, visitorTz)} in ${cityOf(visitorTz)}`
}
