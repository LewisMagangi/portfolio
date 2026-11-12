"use client"

import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react"

import { PageHeader, refreshAdminCounts } from "@/components/admin/admin-shell"
import { buttonVariants } from "@/components/ui/button"
import { WEEKDAYS, dateIn, hmIn, tzAbbr } from "@/lib/booking-shared"
import { cn } from "@/lib/utils"

type Status = "CONFIRMED" | "RESCHEDULED" | "CANCELLED" | "COMPLETED" | "NO_SHOW"
type Booking = {
  id: string
  ref: string
  name: string
  email: string
  company: string | null
  topic: string
  notes: string | null
  startsAt: string
  durationMin: number
  status: Status
  cancelReason: string | null
  createdAt: string
}
type Block = { id: string; startsAt: string; endsAt: string; note: string | null }
type Hours = { day: number; on: boolean; from: string; to: string }[]
type Settings = {
  open: boolean
  timezone: string
  durationMin: number
  bufferMin: number
  noticeHours: number
  meetUrl: string | null
  notify: boolean
  hours: Hours
}
type Data = { bookings: Booking[]; upcoming: Booking[]; blocks: Block[]; settings: Settings; kpis: { upcoming: number; next: string | null; thisMonth: number; noShows: number } }

const FILTERS = ["All", "Upcoming", "Past", "Cancelled"] as const
const BADGE: Record<Status, { label: string; tone: string }> = {
  CONFIRMED: { label: "Confirmed", tone: "gb-status-success" },
  RESCHEDULED: { label: "Rescheduled", tone: "gb-status-success" },
  CANCELLED: { label: "Cancelled", tone: "gb-status-neutral" },
  COMPLETED: { label: "Held", tone: "gb-status-neutral" },
  NO_SHOW: { label: "No show", tone: "gb-status-warn" },
}
const TZS = ["Africa/Nairobi", "UTC", "Europe/London", "America/New_York"]
const control =
  "box-border min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2 font-sans text-base text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus)] disabled:opacity-45"

function Card({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="flex flex-col gap-3.5 rounded-lg border border-line bg-surface p-5" aria-label={title}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="title m-0">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  )
}

function Toggle({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-line-strong transition-colors duration-200 disabled:opacity-60",
        checked ? "bg-ink" : "bg-surface-raised",
      )}
    >
      <span aria-hidden className={cn("block size-4 rounded-full transition-transform duration-200 motion-reduce:transition-none", checked ? "translate-x-[19px] bg-bg" : "translate-x-[3px] bg-ink-muted")} />
    </button>
  )
}

/** Admin › Bookings (Admin-Bookings board): calls booked from the site, and what the booking page offers. */
export default function AdminBookingsPage() {
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Upcoming")
  const [q, setQ] = useState("")
  const [open, setOpen] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<{ text: string; tone?: "danger" } | null>(null)
  const [draft, setDraft] = useState<Settings | null>(null)
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/bookings")
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error)
      setData(body.data)
      setDraft(body.data.settings)
      setError("")
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Couldn’t load bookings.")
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!notice) return
    const t = setTimeout(() => setNotice(null), 6000)
    return () => clearTimeout(t)
  }, [notice])

  const post = async (payload: Record<string, unknown>, done: string) => {
    setBusy(true)
    try {
      const res = await fetch("/api/admin/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || "That didn’t save. Try again.")
      setData(body.data)
      if (payload.action === "settings" || payload.action === "open") setDraft(body.data.settings)
      setNotice({ text: done })
      refreshAdminCounts()
      return true
    } catch (e) {
      setNotice({ text: e instanceof Error ? e.message : "That didn’t save. Try again.", tone: "danger" })
      return false
    } finally {
      setBusy(false)
    }
  }

  const tz = data?.settings.timezone ?? "Africa/Nairobi"
  const when = (iso: string) => `${dateIn(new Date(iso), tz)} · ${hmIn(new Date(iso), tz)}`
  const now = Date.now()

  const rows = useMemo(() => {
    const all = data?.bookings ?? []
    const term = q.trim().toLowerCase()
    return all
      .filter((b) => {
        const t = new Date(b.startsAt).getTime()
        if (filter === "Upcoming") return t > now && (b.status === "CONFIRMED" || b.status === "RESCHEDULED")
        if (filter === "Past") return t <= now && b.status !== "CANCELLED"
        if (filter === "Cancelled") return b.status === "CANCELLED"
        return true
      })
      .filter((b) => !term || [b.name, b.email, b.company ?? ""].some((x) => x.toLowerCase().includes(term)))
      .sort((a, b) => (filter === "Upcoming" ? a.startsAt.localeCompare(b.startsAt) : b.startsAt.localeCompare(a.startsAt)))
  }, [data, filter, q, now])

  const block = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = Object.fromEntries(new FormData(form))
    if (await post({ action: "block", data: f }, "Blocked. Those times are off the booking page.")) form.reset()
  }

  const setDay = (i: number, patch: Partial<Hours[number]>) => draft && setDraft({ ...draft, hours: draft.hours.map((h, k) => (k === i ? { ...h, ...patch } : h)) })

  return (
    <>
      <PageHeader crumb="Admin / Inbox" title="Bookings" description="Discovery calls booked from the site. Availability below sets which slots visitors see.">
        <a href="/book" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View booking page
        </a>
        <a href="#block-time" className={buttonVariants({ size: "sm" })}>
          + Block time
        </a>
      </PageHeader>

      {error && (
        <p role="alert" className="m-0 text-sm text-danger">
          {error}
        </p>
      )}
      <p aria-live="polite" className={cn("m-0 min-h-5 text-sm", notice?.tone === "danger" ? "text-danger" : "text-ink-muted")}>
        {notice?.text}
      </p>

      {data && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {[
            { l: "Upcoming", v: data.kpis.upcoming, s: data.kpis.next ? `Next: ${when(data.kpis.next).replace(" · ", ", ")} ${tzAbbr(tz)}` : "Nothing booked yet" },
            { l: "This month", v: data.kpis.thisMonth, s: "Calls held so far" },
            { l: "No shows", v: data.kpis.noShows, s: "Last 90 days" },
            { l: "Booking page", v: data.settings.open ? "Open" : "Paused", s: data.settings.open ? "Taking bookings" : "Visitors are sent to Contact" },
          ].map((k) => (
            <div key={k.l} className="flex flex-col gap-1.5 rounded-lg border border-line bg-surface p-5">
              <span className="text-[13px] font-medium text-ink-muted">{k.l}</span>
              <span className="text-2xl font-semibold tabular-nums">{k.v}</span>
              <span className="text-xs text-ink-subtle">{k.s}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-start gap-6">
        <section aria-label="Bookings" className="flex min-w-0 flex-[3_1_560px] flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter">
              {FILTERS.map((f) => (
                <button key={f} type="button" className="gb-chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
            <label className="sr-only" htmlFor="bk-search">
              Search bookings
            </label>
            <input
              id="bk-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email or company"
              className={cn(control, "w-[280px] max-w-full")}
            />
          </div>
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-subtle">
                  {["Visitor", "Topic", `When (${tzAbbr(tz)})`, "Status"].map((h) => (
                    <th key={h} scope="col" className="border-b border-line px-4 py-2.5 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!data ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-ink-muted">
                      {error ? "Nothing to show." : "Loading"}
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-ink-muted">
                      {filter === "Upcoming" ? "No calls booked yet. They appear here as people book." : "Nothing here."}
                    </td>
                  </tr>
                ) : (
                  rows.flatMap((b) => {
                    const past = new Date(b.startsAt).getTime() <= now
                    const active = b.status === "CONFIRMED" || b.status === "RESCHEDULED"
                    const isOpen = open === b.id
                    return [
                      <tr key={b.id} className={cn("border-b border-line", isOpen && "bg-surface-raised")}>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setOpen(isOpen ? null : b.id)}
                            className="cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-ink hover:underline"
                          >
                            {b.name}
                          </button>
                          <div className="text-[13px] text-ink-muted">
                            {b.email}
                            {b.company ? `, ${b.company}` : ""}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-ink-muted">{b.topic}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs uppercase text-ink-subtle">{when(b.startsAt)}</td>
                        <td className="px-4 py-3">
                          <span className={cn("gb-status", BADGE[b.status].tone)}>{BADGE[b.status].label}</span>
                        </td>
                      </tr>,
                      isOpen && (
                        <tr key={`${b.id}-x`} className="border-b border-line bg-surface-raised">
                          <td colSpan={4} className="px-4 pb-4">
                            <div className="flex flex-col gap-3">
                              <p className="m-0 font-mono text-xs text-ink-subtle">
                                {b.ref} · booked {dateIn(new Date(b.createdAt), tz, "medium")}
                              </p>
                              {b.notes && <p className="m-0 whitespace-pre-line">“{b.notes}”</p>}
                              {b.cancelReason && <p className="m-0 text-ink-muted">Reason given: {b.cancelReason}</p>}
                              <div className="flex flex-wrap gap-2">
                                <a href={`mailto:${b.email}?subject=${encodeURIComponent("Our call")}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                                  Email them
                                </a>
                                {active && past && (
                                  <>
                                    <button type="button" disabled={busy} className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => post({ action: "status", id: b.id, data: { status: "COMPLETED" } }, "Marked as held.")}>
                                      Mark held
                                    </button>
                                    <button type="button" disabled={busy} className={buttonVariants({ variant: "ghost", size: "sm" })} onClick={() => post({ action: "status", id: b.id, data: { status: "NO_SHOW" } }, "Marked as a no show.")}>
                                      No show
                                    </button>
                                  </>
                                )}
                                {(b.status === "COMPLETED" || b.status === "NO_SHOW") && (
                                  <button type="button" disabled={busy} className={buttonVariants({ variant: "ghost", size: "sm" })} onClick={() => post({ action: "status", id: b.id, data: { status: "CONFIRMED" } }, "Mark undone.")}>
                                    Undo mark
                                  </button>
                                )}
                                {active && !past && confirmCancel !== b.id && (
                                  <button type="button" className={buttonVariants({ variant: "ghost", size: "sm" })} onClick={() => setConfirmCancel(b.id)}>
                                    Cancel the call
                                  </button>
                                )}
                                {confirmCancel === b.id && (
                                  <span className="flex flex-wrap items-center gap-2">
                                    <span className="text-ink-muted">Cancel and email {b.name.split(" ")[0]}?</span>
                                    <button
                                      type="button"
                                      disabled={busy}
                                      className={buttonVariants({ variant: "destructive", size: "sm" })}
                                      onClick={async () => {
                                        if (await post({ action: "cancel", id: b.id }, `Cancelled. ${b.name.split(" ")[0]} has been emailed.`)) setConfirmCancel(null)
                                      }}
                                    >
                                      Cancel it
                                    </button>
                                    <button type="button" className={buttonVariants({ variant: "ghost", size: "sm" })} onClick={() => setConfirmCancel(null)}>
                                      Keep
                                    </button>
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ),
                    ]
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="flex min-w-0 flex-[1_1_340px] flex-col gap-4">
          <Card title="Next up">
            {data && data.upcoming.length > 0 ? (
              <ul className="m-0 list-none p-0">
                {data.upcoming.slice(0, 3).map((n) => (
                  <li key={n.id} className="grid grid-cols-[64px_1fr] items-center gap-3 border-t border-line py-3">
                    <time dateTime={n.startsAt} className="font-mono text-xs leading-4 text-ink-subtle">
                      {dateIn(new Date(n.startsAt), tz).split(" ").slice(0, 2).join(" ")}
                      <br />
                      {hmIn(new Date(n.startsAt), tz)}
                    </time>
                    <span className="flex flex-col">
                      <strong className="text-sm font-medium">{n.name}</strong>
                      <span className="text-[13px] text-ink-muted">{n.topic}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="m-0 text-sm text-ink-muted">Nothing booked yet.</p>
            )}
            {data?.settings.meetUrl && (
              <a href={data.settings.meetUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                Open Google Meet
              </a>
            )}
          </Card>

          {draft && (
            <Card
              title="Availability"
              aside={
                <span className="flex items-center gap-2 text-sm">
                  Accepting bookings
                  <Toggle checked={draft.open} disabled={busy} label="Accepting bookings" onChange={(v) => post({ action: "open", data: { open: v } }, v ? "Bookings are open." : "Bookings are paused. The page points visitors to Contact.")} />
                </span>
              }
            >
              <div>
                <div className="grid grid-cols-[1fr_92px_92px] gap-2.5 pb-2 text-[13px] font-medium text-ink-muted">
                  <span>Day</span>
                  <span>From</span>
                  <span>To</span>
                </div>
                {draft.hours.map((h, i) => (
                  <div key={i} className="grid grid-cols-[1fr_92px_92px] items-center gap-2.5 border-t border-line py-2">
                    <span className="flex items-center gap-2.5 text-sm">
                      <Toggle checked={h.on} label={`Open on ${WEEKDAYS[i]}`} onChange={(v) => setDay(i, { on: v })} />
                      {WEEKDAYS[i]}
                    </span>
                    <input type="time" value={h.from} disabled={!h.on} aria-label={`${WEEKDAYS[i]} start time`} onChange={(e) => setDay(i, { from: e.target.value })} className={cn(control, "min-h-9 px-2 font-mono text-[13px]")} />
                    <input type="time" value={h.to} disabled={!h.on} aria-label={`${WEEKDAYS[i]} end time`} onChange={(e) => setDay(i, { to: e.target.value })} className={cn(control, "min-h-9 px-2 font-mono text-[13px]")} />
                  </div>
                ))}
              </div>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Timezone
                <select value={draft.timezone} onChange={(e) => setDraft({ ...draft, timezone: e.target.value })} className={control}>
                  {TZS.map((t) => (
                    <option key={t} value={t}>
                      {t === "Africa/Nairobi" ? "Africa/Nairobi (EAT, UTC+3)" : t}
                    </option>
                  ))}
                </select>
              </label>
            </Card>
          )}

          {draft && (
            <Card title="Call settings">
              {(
                [
                  ["Call length", "durationMin", [15, 30, 45], (n: number) => `${n} minutes`],
                  ["Buffer between calls", "bufferMin", [0, 10, 15, 30], (n: number) => (n ? `${n} minutes` : "None")],
                  ["Minimum notice", "noticeHours", [2, 12, 24, 48], (n: number) => `${n} hours`],
                ] as const
              ).map(([label, key, opts, fmt]) => (
                <label key={key} className="flex flex-col gap-1.5 text-sm font-medium">
                  {label}
                  <select value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: Number(e.target.value) })} className={control}>
                    {opts.map((n) => (
                      <option key={n} value={n}>
                        {fmt(n)}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Meeting link
                <input
                  type="url"
                  value={draft.meetUrl ?? ""}
                  placeholder="https://meet.google.com/abc-defg-hij"
                  onChange={(e) => setDraft({ ...draft, meetUrl: e.target.value })}
                  className={control}
                />
                <span className="text-xs font-normal text-ink-subtle">Sent with every booking. Leave empty to send the link yourself before each call.</span>
              </label>
              <span className="flex items-center justify-between gap-3 text-sm">
                Email me when someone books
                <Toggle checked={draft.notify} label="Email me when someone books" onChange={(v) => setDraft({ ...draft, notify: v })} />
              </span>
              <button type="button" disabled={busy} className={cn(buttonVariants({ size: "sm" }), "self-start")} onClick={() => post({ action: "settings", data: draft }, "Saved. The booking page uses these now.")}>
                {busy ? "Saving" : "Save settings"}
              </button>
            </Card>
          )}

          <section id="block-time" className="scroll-mt-24">
            <Card title="Block time">
              <form onSubmit={block} className="flex flex-col gap-3">
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Date
                  <input name="date" type="date" required className={control} />
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    From
                    <input name="from" type="time" required defaultValue="09:00" className={control} />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    To
                    <input name="to" type="time" required defaultValue="17:30" className={control} />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Note <span className="sr-only">(optional)</span>
                  <input name="note" placeholder="Optional, only you see it" className={control} />
                </label>
                <button type="submit" disabled={busy} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "self-start")}>
                  Block these times
                </button>
              </form>
              {data && data.blocks.length > 0 && (
                <ul className="m-0 list-none p-0">
                  {data.blocks.map((x) => (
                    <li key={x.id} className="flex items-center justify-between gap-3 border-t border-line py-2.5 text-sm">
                      <span>
                        {dateIn(new Date(x.startsAt), tz)}, {hmIn(new Date(x.startsAt), tz)} to {hmIn(new Date(x.endsAt), tz)}
                        {x.note && <span className="text-ink-muted"> · {x.note}</span>}
                      </span>
                      <button type="button" disabled={busy} className={buttonVariants({ variant: "ghost", size: "sm" })} onClick={() => post({ action: "unblock", id: x.id }, "Unblocked.")}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </section>
        </aside>
      </div>
    </>
  )
}
