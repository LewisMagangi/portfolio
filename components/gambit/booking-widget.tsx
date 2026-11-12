"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react"

import { buttonVariants } from "@/components/ui/button"
import { TOPICS, cityOf, dateIn, tzOffset, type Availability, type Day, type PublicBooking, type Slot } from "@/lib/booking-shared"
import { cn } from "@/lib/utils"

import { Icon } from "./icon"

const WD = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

type Mode = { kind: "book" } | { kind: "reschedule"; token: string; onMoved: (b: PublicBooking) => void }
type Details = { name: string; email: string; company: string; topic: string; notes: string }

const visitorTz = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  } catch {
    return ""
  }
}

/** "Thu 5 Nov" for a "2026-11-05" date string. */
const fmtYmd = (ymd: string) => dateIn(new Date(`${ymd}T12:00:00Z`), "UTC")

/**
 * Gambit BookingWidget (bundle.js › BookingWidget), on live availability: pick a date, a time, then your details.
 * The server re-checks the slot; if someone took it first, the widget returns to the times with your details kept.
 */
export function BookingWidget({ mode = { kind: "book" }, title = "Free discovery call" }: { mode?: Mode; title?: string }) {
  const [avail, setAvail] = useState<Availability | null>(null)
  const [loadError, setLoadError] = useState("")
  const [step, setStep] = useState(1)
  const [month, setMonth] = useState(0)
  const [date, setDate] = useState<string | null>(null)
  const [slot, setSlot] = useState<Slot | null>(null)
  const [d, setD] = useState<Details>({ name: "", email: "", company: "", topic: TOPICS[0], notes: "" })
  const [errors, setErrors] = useState<Partial<Record<keyof Details | "form", string>>>({})
  const [taken, setTaken] = useState("")
  const [busy, setBusy] = useState(false)
  const [booked, setBooked] = useState<(PublicBooking & { token: string }) | null>(null)
  const [tz, setTz] = useState("")
  const bodyRef = useRef<HTMLDivElement>(null)
  const reschedule = mode.kind === "reschedule"
  const token = mode.kind === "reschedule" ? mode.token : ""

  const load = useCallback(async () => {
    try {
      const q = token ? `?except=${encodeURIComponent(token)}` : ""
      const res = await fetch(`/api/bookings/availability${q}`, { cache: "no-store" })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error)
      setAvail(body.data)
      setLoadError("")
    } catch (e) {
      setLoadError(e instanceof Error && e.message ? e.message : "Times couldn’t load. Refresh to try again.")
    }
  }, [token])

  useEffect(() => {
    setTz(visitorTz())
    load()
  }, [load])

  // Move focus to the new step's heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (step > 1) bodyRef.current?.querySelector<HTMLElement>("h3")?.focus()
  }, [step])

  const days = useMemo(() => new Map((avail?.days ?? []).map((x) => [x.date, x])), [avail])
  const openDay = (x?: Day) => !!x && x.slots.some((s) => s.free)

  if (loadError) {
    return (
      <div className="gb-book">
        <div className="gb-book-main" role="alert">
          <p className="m-0 text-sm text-danger">{loadError}</p>
          <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={load}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  const tzName = avail?.timezone ?? "Africa/Nairobi"
  const abbr = avail?.tzLabel.split(" ")[0] ?? "EAT"
  const duration = avail?.durationMin ?? 30
  const today = avail?.today ?? new Date().toISOString().slice(0, 10)
  const [ty, tm] = today.split("-").map(Number)
  const base = new Date(Date.UTC(ty, tm - 1 + month, 1))
  const lastDay = avail?.days.at(-1)?.date ?? today
  const first = (base.getUTCDay() + 6) % 7
  const daysInMonth = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth() + 1, 0)).getUTCDate()
  const ymd = (n: number) => `${base.getUTCFullYear()}-${String(base.getUTCMonth() + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`
  const nextMonthStart = ymd(daysInMonth) < lastDay
  const sameClock = !tz || (slot ? tzOffset(new Date(slot.startsAt), tz) === tzOffset(new Date(slot.startsAt), tzName) : true)
  const localTime = (s: Slot) =>
    tz && tzOffset(new Date(s.startsAt), tz) !== tzOffset(new Date(s.startsAt), tzName)
      ? new Intl.DateTimeFormat([], { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(new Date(s.startsAt))
      : null

  const pickedDay = date ? days.get(date) : undefined

  const submit = async (e?: FormEvent) => {
    e?.preventDefault()
    if (!slot) return
    if (!reschedule) {
      const er: typeof errors = {}
      if (!d.name.trim()) er.name = "Enter your name."
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) er.email = "Enter an email address like you@company.com."
      if (Object.keys(er).length) {
        setErrors(er)
        document.getElementById(er.name ? "bk-name" : "bk-email")?.focus()
        return
      }
    }
    setBusy(true)
    setErrors({})
    try {
      const res = reschedule
        ? await fetch(`/api/bookings/${mode.token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "reschedule", startsAt: slot.startsAt }),
          })
        : await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...d, startsAt: slot.startsAt, visitorTz: tz, website: (document.getElementById("bk-website") as HTMLInputElement | null)?.value }),
          })
      const body = await res.json().catch(() => ({}))
      if (res.status === 409 || body.code === "taken") {
        setTaken(`${fmtYmd(date!)}, ${slot.time} was just taken.`)
        setSlot(null)
        setStep(2)
        await load()
        return
      }
      if (!res.ok) throw new Error(body.error || "That didn’t book. Try again in a moment.")
      if (mode.kind === "reschedule") mode.onMoved(body.data)
      else {
        setBooked(body.data)
        setStep(4)
      }
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "That didn’t book. Try again in a moment." })
    } finally {
      setBusy(false)
    }
  }

  const steps = reschedule ? ["Date", "Time", "Confirm"] : ["Date", "Time", "Details", "Booked"]

  const summary = (
    <aside className="gb-book-sum">
      <div className="gb-book-host">
        <Image src="/portrait/lewis-magangi-square.jpg" alt="" width={40} height={40} />
        <div>
          <strong>Lewis Magangi</strong>
          <span>Software engineer in Nairobi</span>
        </div>
      </div>
      <h2 className="gb-book-title">{title}</h2>
      <ul className="gb-book-facts">
        <li>
          <Icon name="clock" size={15} />
          {duration} minutes
        </li>
        <li>
          <Icon name="video" size={15} />
          Online, on Google Meet
        </li>
        <li>
          <Icon name="globe" size={15} />
          Times in {avail?.tzLabel ?? "EAT (UTC+3)"}
        </li>
      </ul>
      <p className="gb-book-note">Tell me what you’re building or hiring for. You’ll leave with a clear next step, whether or not we work together.</p>
      {date && (
        <div className="gb-book-pick">
          <span>Your pick</span>
          <strong>
            {fmtYmd(date)}
            {slot ? ` at ${slot.time} ${abbr}` : ""}
          </strong>
        </div>
      )}
    </aside>
  )

  let body
  if (!avail) {
    body = (
      <div className="gb-book-step" aria-busy>
        <p className="gb-book-hint">Loading open times</p>
      </div>
    )
  } else if (!avail.open || avail.days.every((x) => !openDay(x))) {
    body = (
      <div className="gb-book-step" role="status">
        <h3 className="gb-book-h">{avail.open ? "Every time in the next four weeks is taken." : "Bookings are paused for now."}</h3>
        <p className="m-0 text-sm text-ink-muted">
          <Link href="/contact">Send a message</Link> instead and I’ll reply within two working days.
        </p>
      </div>
    )
  } else if (step === 1) {
    body = (
      <div className="gb-book-step">
        <div className="gb-cal-head">
          <h3 className="gb-book-h" tabIndex={-1}>
            {MONTHS[base.getUTCMonth()]} {base.getUTCFullYear()}
          </h3>
          <div>
            <button type="button" className="gb-iconbtn" aria-label="Previous month" disabled={month === 0} onClick={() => setMonth(month - 1)}>
              <Icon name="left" size={18} />
            </button>
            <button type="button" className="gb-iconbtn" aria-label="Next month" disabled={!nextMonthStart} onClick={() => setMonth(month + 1)}>
              <Icon name="right" size={18} />
            </button>
          </div>
        </div>
        <div className="gb-cal" role="group" aria-label="Choose a date">
          {WD.map((w) => (
            <div key={w} className="gb-cal-wd" aria-hidden>
              {w}
            </div>
          ))}
          {Array.from({ length: first }, (_, i) => (
            <div key={`x${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const key = ymd(i + 1)
            const ok = openDay(days.get(key))
            const sel = date === key
            return (
              <button
                key={key}
                type="button"
                className={cn("gb-cal-day", ok && "is-open", sel && "is-sel", key === today && "is-today")}
                disabled={!ok}
                aria-pressed={sel}
                aria-label={`${fmtYmd(key)}${ok ? "" : ", unavailable"}`}
                onClick={() => {
                  setDate(key)
                  setSlot(null)
                  setTaken("")
                  setStep(2)
                }}
              >
                {i + 1}
              </button>
            )
          })}
        </div>
        <p className="gb-book-hint">Weekdays over the next four weeks. Pick an open date to see times.</p>
      </div>
    )
  } else if (step === 2 && date) {
    body = (
      <div className="gb-book-step">
        <div className="gb-cal-head">
          <h3 className="gb-book-h" tabIndex={-1}>
            {fmtYmd(date)}
          </h3>
          <button type="button" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5")} onClick={() => setStep(1)}>
            <Icon name="left" size={14} />
            Change date
          </button>
        </div>
        {taken && (
          <p role="alert" className="m-0 flex items-start gap-3 rounded-md border border-award bg-award-soft px-4 py-3 text-sm">
            <Icon name="clock" size={16} />
            <span>
              <strong className="font-medium">{taken}</strong> Someone booked it while you were choosing. {reschedule ? "Pick another time below." : "Your details are saved; pick another time below."}
            </span>
          </p>
        )}
        <div className="gb-slots" role="group" aria-label="Choose a time">
          {(pickedDay?.slots ?? []).map((s) => {
            const lt = localTime(s)
            return (
              <button key={s.startsAt} type="button" className={cn("gb-slot", slot?.startsAt === s.startsAt && "is-sel")} disabled={!s.free} aria-pressed={slot?.startsAt === s.startsAt} onClick={() => setSlot(s)}>
                <strong>
                  {s.time} {abbr}
                </strong>
                <span>{!s.free ? "Booked" : lt ? `${lt} your time` : `${duration} min`}</span>
              </button>
            )
          })}
        </div>
        <div className="gb-book-actions">
          <button type="button" className={cn(buttonVariants(), "gap-1.5 disabled:opacity-45")} disabled={!slot} onClick={() => slot && setStep(3)}>
            Continue
            <Icon name="arrow" size={15} />
          </button>
        </div>
        {tz && <p className="gb-book-hint">Your time zone: {tz}.</p>}
      </div>
    )
  } else if (step === 3 && date && slot) {
    body = reschedule ? (
      <div className="gb-book-step">
        <div className="gb-cal-head">
          <h3 className="gb-book-h" tabIndex={-1}>
            Move to {fmtYmd(date)} at {slot.time} {abbr}?
          </h3>
          <button type="button" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5")} onClick={() => setStep(2)}>
            <Icon name="left" size={14} />
            Change time
          </button>
        </div>
        {!sameClock && <p className="m-0 text-sm text-ink-muted">That’s {localTime(slot)} in {cityOf(tz)}.</p>}
        {errors.form && (
          <p role="alert" className="m-0 text-sm text-danger">
            {errors.form}
          </p>
        )}
        <div className="gb-book-actions">
          <button type="button" className={cn(buttonVariants(), "gap-1.5")} disabled={busy} onClick={() => submit()}>
            <Icon name="calendar" size={15} />
            {busy ? "Moving" : "Move my call"}
          </button>
        </div>
      </div>
    ) : (
      <form className="gb-book-step gb-book-form" onSubmit={submit} noValidate>
        <div className="gb-cal-head">
          <h3 className="gb-book-h" tabIndex={-1}>
            {fmtYmd(date)} at {slot.time} {abbr}
          </h3>
          <button type="button" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5")} onClick={() => setStep(2)}>
            <Icon name="left" size={14} />
            Change time
          </button>
        </div>
        <div className="gb-book-row">
          <div className={cn("gb-field", errors.name && "gb-field-error")}>
            <label className="gb-field-label" htmlFor="bk-name">
              Your name
            </label>
            <input
              id="bk-name"
              value={d.name}
              onChange={(e) => setD({ ...d, name: e.target.value })}
              autoComplete="name"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "bk-name-err" : undefined}
            />
            {errors.name && (
              <span id="bk-name-err" className="gb-field-err">
                {errors.name}
              </span>
            )}
          </div>
          <div className={cn("gb-field", errors.email && "gb-field-error")}>
            <label className="gb-field-label" htmlFor="bk-email">
              Email
            </label>
            <input
              id="bk-email"
              type="email"
              value={d.email}
              onChange={(e) => setD({ ...d, email: e.target.value })}
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "bk-email-err" : undefined}
            />
            {errors.email && (
              <span id="bk-email-err" className="gb-field-err">
                {errors.email}
              </span>
            )}
          </div>
        </div>
        <div className="gb-book-row">
          <div className="gb-field">
            <label className="gb-field-label" htmlFor="bk-co">
              Company<em>optional</em>
            </label>
            <input id="bk-co" value={d.company} onChange={(e) => setD({ ...d, company: e.target.value })} autoComplete="organization" />
          </div>
          <div className="gb-field">
            <label className="gb-field-label" htmlFor="bk-topic">
              What’s it about?
            </label>
            <select id="bk-topic" value={d.topic} onChange={(e) => setD({ ...d, topic: e.target.value })}>
              {TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="gb-field">
          <label className="gb-field-label" htmlFor="bk-notes">
            Anything I should read first?<em>optional</em>
          </label>
          <textarea id="bk-notes" rows={3} value={d.notes} placeholder="A link, a job description, or a line about the problem." onChange={(e) => setD({ ...d, notes: e.target.value })} />
        </div>
        <input id="bk-website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />
        {errors.form && (
          <p role="alert" className="m-0 text-sm text-danger">
            {errors.form}
          </p>
        )}
        <div className="gb-book-actions">
          <button type="submit" className={cn(buttonVariants(), "gap-1.5")} disabled={busy}>
            <Icon name="calendar" size={15} />
            {busy ? "Booking" : "Book the call"}
          </button>
        </div>
      </form>
    )
  } else if (step === 4 && booked && date && slot) {
    body = (
      <div className="gb-book-step gb-book-done" role="status">
        <span className="gb-book-check" aria-hidden>
          <Icon name="check" size={22} />
        </span>
        <h3 className="gb-book-h" tabIndex={-1}>
          You’re booked for {fmtYmd(date)} at {slot.time} {abbr}.
        </h3>
        <p>
          A confirmation with the Google Meet link and a calendar invite is on its way to {booked.email}. If something comes up, the email has a link to move or cancel the
          call.
        </p>
        <div className="gb-book-actions">
          <a href={`/api/bookings/${booked.token}/ics`} download="discovery-call.ics" className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}>
            <Icon name="calendar" size={15} />
            Add to my calendar
          </a>
          <Link href={`/book/manage/${booked.token}`} className={buttonVariants({ variant: "ghost" })}>
            See your booking
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="gb-book">
      {summary}
      <div className="gb-book-main" ref={bodyRef}>
        <ol className="gb-book-steps" aria-label="Booking progress">
          {steps.map((t, i) => {
            const n = i + 1
            return (
              <li key={t} className={cn(n === step && "is-now", n < step && "is-done")} aria-current={n === step ? "step" : undefined}>
                <span aria-hidden={n < step ? true : undefined}>{n < step ? "✓" : n}</span>
                <i className="gb-step-t">{t}</i>
              </li>
            )
          })}
        </ol>
        {body}
      </div>
    </div>
  )
}
