"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { BookingWidget } from "@/components/gambit/booking-widget"
import { Icon } from "@/components/gambit/icon"
import { buttonVariants } from "@/components/ui/button"
import { CANCEL_REASONS, CHANGE_CUTOFF_HOURS, dateIn, hmIn, localLine, tzAbbr, type PublicBooking } from "@/lib/booking-shared"
import { cn } from "@/lib/utils"

type View = "view" | "reschedule" | "cancel" | "cancelled" | "moved"

// Book-Manage board headings.
const H: Record<View, [string, string]> = {
  view: ["Your call is booked.", "Everything you need is below. The same details are in your confirmation email."],
  reschedule: ["Move your call.", "Pick any open weekday time in the next four weeks. Your topic and notes carry over."],
  cancel: ["Cancel your call?", "No problem. You can book again any time."],
  cancelled: ["Call cancelled.", "Thanks for letting me know."],
  moved: ["Your call is moved.", "Here are the new details."],
}

const STATUS: Record<PublicBooking["status"], string> = {
  CONFIRMED: "Confirmed",
  RESCHEDULED: "Rescheduled",
  CANCELLED: "Cancelled",
  COMPLETED: "Held",
  NO_SHOW: "Missed",
}

export function ManageView({ token, initial }: { token: string; initial: PublicBooking }) {
  const [b, setB] = useState(initial)
  const [view, setView] = useState<View>(initial.status === "CANCELLED" ? "cancelled" : "view")
  const [reason, setReason] = useState("")
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState("")
  const [visitorTz, setVisitorTz] = useState<string | null>(null)
  const head = useRef<HTMLHeadingElement>(null)
  const first = useRef(true)

  useEffect(() => {
    try {
      setVisitorTz(Intl.DateTimeFormat().resolvedOptions().timeZone)
    } catch {
      setVisitorTz(null)
    }
  }, [])

  // After each change of view, move focus to the heading so the new state is announced.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    head.current?.focus()
    window.scrollTo({ top: 0 })
  }, [view])

  const at = new Date(b.startsAt)
  const tz = b.timezone
  const when = `${dateIn(at, tz, "medium")}, ${hmIn(at, tz)} ${tzAbbr(tz)}`
  const local = localLine(at, tz, visitorTz)
  const short = `${dateIn(at, tz)}, ${hmIn(at, tz)} ${tzAbbr(tz)}`

  const doCancel = async () => {
    setBusy(true)
    setErr("")
    try {
      const res = await fetch(`/api/bookings/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel", reason }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || "That didn’t go through. Try again.")
      setB(body.data)
      setView("cancelled")
    } catch (e) {
      setErr(e instanceof Error ? e.message : "That didn’t go through. Try again.")
    } finally {
      setBusy(false)
    }
  }

  const showSummary = view === "view" || view === "moved" || view === "cancelled"

  return (
    <div className="mx-auto box-border flex max-w-content flex-col gap-10 px-8 pb-32 pt-16 max-sm:px-4 max-sm:pt-10">
      <div className="flex max-w-[720px] flex-col gap-4">
        <span className="font-mono text-xs text-ink-subtle">Booking {b.ref}</span>
        <h1 ref={head} tabIndex={-1} className="display m-0 focus:outline-none">
          {H[view][0]}
        </h1>
        <p className="lead m-0 text-ink-muted">{H[view][1]}</p>
      </div>

      {view === "cancelled" && (
        <p role="status" className="m-0 flex max-w-[720px] items-start gap-3 rounded-md border border-line-strong bg-surface-raised p-4 text-sm">
          <Icon name="check" size={16} />
          <span>Your call is cancelled and the time is free again. A confirmation is on its way to {b.email}.</span>
        </p>
      )}
      {view === "moved" && (
        <p role="status" className="m-0 flex max-w-[720px] items-start gap-3 rounded-md border border-ink bg-surface-raised p-4 text-sm">
          <Icon name="check" size={16} />
          <span>
            Moved to <strong className="font-semibold">{short}</strong>. The calendar invite is updated; check your email.
          </span>
        </p>
      )}

      {showSummary && (
        <section aria-label="Your booking" className="flex max-w-[720px] flex-col gap-6 rounded-lg border border-line bg-surface p-7 max-sm:p-5">
          <div className="flex flex-wrap items-center gap-4">
            <Image src="/portrait/lewis-magangi-square.jpg" alt="" width={48} height={48} className="size-12 rounded-full border border-line object-cover" />
            <div className="flex min-w-0 flex-1 flex-col">
              <strong className="font-semibold">Free discovery call with Lewis Magangi</strong>
              <span className="text-sm text-ink-muted">{b.durationMin} minutes, online on Google Meet</span>
            </div>
            <span className={cn("gb-status", b.status === "CANCELLED" ? "gb-status-neutral" : "gb-status-success")}>{STATUS[b.status]}</span>
          </div>
          <dl className="m-0 grid grid-cols-[140px_1fr] gap-x-6 gap-y-3.5 text-sm max-sm:grid-cols-1 max-sm:gap-y-1">
            <dt className="text-ink-muted">When</dt>
            <dd className="m-0 max-sm:mb-2.5">
              {when}
              {local && <span className="text-ink-muted"> · {local}</span>}
            </dd>
            <dt className="text-ink-muted">Topic</dt>
            <dd className="m-0 max-sm:mb-2.5">{b.topic}</dd>
            {b.notes && (
              <>
                <dt className="text-ink-muted">Your notes</dt>
                <dd className="m-0 whitespace-pre-line max-sm:mb-2.5">{b.notes}</dd>
              </>
            )}
            {b.status !== "CANCELLED" && (
              <>
                <dt className="text-ink-muted">Meeting link</dt>
                <dd className="m-0">
                  {b.meetUrl ? (
                    <a href={b.meetUrl} target="_blank" rel="noopener noreferrer">
                      {b.meetUrl.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <span className="text-ink-muted">I’ll email the Google Meet link before the call.</span>
                  )}
                </dd>
              </>
            )}
          </dl>
          {b.status !== "CANCELLED" && (
            <>
              <div className="flex flex-wrap gap-2.5">
                <a href={`/api/bookings/${token}/ics`} download="discovery-call.ics" className={buttonVariants()}>
                  Add to my calendar
                </a>
                {b.canChange && (
                  <>
                    <button type="button" className={buttonVariants({ variant: "outline" })} onClick={() => setView("reschedule")}>
                      Reschedule
                    </button>
                    <button type="button" className={buttonVariants({ variant: "ghost" })} onClick={() => setView("cancel")}>
                      Cancel the call
                    </button>
                  </>
                )}
              </div>
              <span className="text-xs text-ink-subtle">
                {b.canChange
                  ? `You can reschedule or cancel up to ${CHANGE_CUTOFF_HOURS} hours before the call.`
                  : `It’s less than ${CHANGE_CUTOFF_HOURS} hours to the call, so it can’t be changed here. Reply to your confirmation email if something has come up.`}
              </span>
            </>
          )}
        </section>
      )}

      {view === "reschedule" && (
        <section aria-label="Pick a new time" className="flex flex-col gap-6">
          <h2 className="heading m-0">Pick a new time</h2>
          <BookingWidget
            mode={{
              kind: "reschedule",
              token,
              onMoved: (next) => {
                setB(next)
                setView("moved")
              },
            }}
          />
          <div>
            <button type="button" className={buttonVariants({ variant: "ghost" })} onClick={() => setView("view")}>
              Keep my current time
            </button>
          </div>
        </section>
      )}

      {view === "cancel" && (
        <section aria-labelledby="cx-h" className="flex max-w-[720px] flex-col gap-5 rounded-lg border border-line bg-surface p-7 max-sm:p-5">
          <h2 id="cx-h" className="title m-0">
            Cancel {short}?
          </h2>
          <p className="m-0 text-ink-muted">The time goes back on the calendar. Telling me why is optional and helps me plan.</p>
          <fieldset className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-2 border-0 p-0">
            <legend className="sr-only">Why are you cancelling?</legend>
            {CANCEL_REASONS.map((r) => (
              <label
                key={r}
                className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border border-line-strong px-3.5 text-sm has-[:checked]:border-ink has-[:checked]:bg-surface-raised has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--focus)]"
              >
                <input type="radio" name="why" value={r} checked={reason === r} onChange={() => setReason(r)} className="size-4 accent-[var(--ink)]" />
                {r}
              </label>
            ))}
          </fieldset>
          {err && (
            <p role="alert" className="m-0 text-sm text-danger">
              {err}
            </p>
          )}
          <div className="flex flex-wrap gap-2.5">
            <button type="button" className={buttonVariants()} disabled={busy} onClick={doCancel}>
              {busy ? "Cancelling" : "Cancel the call"}
            </button>
            <button type="button" className={buttonVariants({ variant: "ghost" })} onClick={() => setView("view")}>
              Keep it
            </button>
          </div>
        </section>
      )}

      {view === "cancelled" && (
        <div className="flex flex-wrap gap-2.5">
          <Link href="/book" className={buttonVariants()}>
            Book a new time
          </Link>
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Back to the site
          </Link>
        </div>
      )}
    </div>
  )
}
