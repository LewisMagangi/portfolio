"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type Pending = {
  id: string
  name: string
  role: string
  company?: string | null
  email?: string | null
  relation?: string | null
  project?: string | null
  link?: string | null
  content: string
  consentAt?: string | null
  createdAt: string
}

type Decision = "approve" | "decline"
type ItemState = { decision: Decision; committed: boolean; error?: string }

/** How long Undo stays open before the decision is sent (and, on approval, the thank you email goes out). */
const UNDO_MS = 8000

const TIME = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi" })
const DAY = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Nairobi" })
const dayKey = (d: Date) => DAY.format(d)

function sentLine(iso: string) {
  const d = new Date(iso)
  const today = new Date()
  const yesterday = new Date(today.getTime() - 86_400_000)
  const day = dayKey(d) === dayKey(today) ? "today" : dayKey(d) === dayKey(yesterday) ? "yesterday" : `on ${DAY.format(d)}`
  return `Sent ${day}, ${TIME.format(d)}`
}

const btn =
  "inline-flex min-h-10 items-center justify-center rounded-md border border-line-strong bg-transparent px-4 text-sm font-medium text-ink no-underline transition-[background-color,transform] duration-fast ease-tilda hover:bg-surface-raised active:scale-[0.98] max-md:min-h-11"
const btnPrimary = "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover"

function send(id: string, action: Decision | "undo", keepalive = false) {
  return fetch(`/api/testimonials/${id}/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
    keepalive,
  })
}

/**
 * "Reviews waiting for you" (Admin-References board). Approve publishes the review at the end of the Home
 * references and thanks the reviewer; Decline hides it and sends nothing. Either can be undone for a few
 * seconds before it is sent. There is no edit: a reviewer's words are never changed.
 */
export function ReviewQueue({ onChange }: { onChange?: () => void }) {
  const [items, setItems] = useState<Pending[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [states, setStates] = useState<Record<string, ItemState>>({})
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const queued = useRef(new Map<string, Decision>())

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials?status=PENDING&source=CLIENT_REVIEW")
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()
      setItems((data.data as Pending[]).sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
      setLoadError(false)
    } catch {
      setLoadError(true)
      setItems([])
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const commit = useCallback(
    async (id: string) => {
      const decision = queued.current.get(id)
      timers.current.delete(id)
      if (!decision) return
      queued.current.delete(id)
      try {
        const res = await send(id, decision)
        if (!res.ok) throw new Error(String(res.status))
        setStates((s) => ({ ...s, [id]: { decision, committed: true } }))
        onChange?.()
      } catch {
        setStates((s) => ({ ...s, [id]: { decision, committed: false, error: "That didn’t go through. Try again." } }))
      }
    },
    [onChange],
  )

  // Leaving the page sends anything still waiting out its undo window.
  useEffect(() => {
    const t = timers.current
    const q = queued.current
    const flush = () => {
      q.forEach((decision, id) => send(id, decision, true))
      q.clear()
      t.forEach(clearTimeout)
      t.clear()
    }
    window.addEventListener("pagehide", flush)
    return () => {
      window.removeEventListener("pagehide", flush)
      flush()
    }
  }, [])

  const decide = (id: string, decision: Decision) => {
    queued.current.set(id, decision)
    setStates((s) => ({ ...s, [id]: { decision, committed: false } }))
    timers.current.set(
      id,
      setTimeout(() => commit(id), UNDO_MS),
    )
  }

  const undo = (id: string) => {
    clearTimeout(timers.current.get(id))
    timers.current.delete(id)
    queued.current.delete(id)
    setStates((s) => {
      const next = { ...s }
      delete next[id]
      return next
    })
  }

  const waiting = items ? items.filter((r) => !states[r.id] || states[r.id].error).length : 0
  const pendingLine = items === null
    ? "Loading"
    : waiting
      ? `${waiting} ${waiting === 1 ? "review" : "reviews"} to confirm. Check you worked together, then approve. You never edit their words.`
      : "All caught up."

  return (
    <section aria-labelledby="rq-h" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="rq-h" className="title m-0">
          Reviews waiting for you
        </h2>
        <span className="text-[13px] text-ink-subtle" aria-live="polite">
          {pendingLine}
        </span>
      </div>

      {loadError && (
        <p role="alert" className="m-0 text-sm text-danger">
          Couldn’t load the queue.{" "}
          <button type="button" onClick={load} className="cursor-pointer border-0 bg-transparent p-0 text-ink underline underline-offset-[3px]">
            Try again
          </button>
        </p>
      )}

      {items?.length === 0 && !loadError && (
        <div className="rounded-lg border border-dashed border-line-strong p-6 text-center text-sm text-ink-muted">
          Nothing waiting. New reviews from the site land here, and you get an email.
        </div>
      )}

      {items?.map((r) => {
        const st = states[r.id]
        const done = st && !st.error
        const first = r.name.split(/\s+/)[0]
        const facts = [
          r.relation,
          r.project,
          r.email,
          r.link || "No link given",
          r.consentAt ? "Consent to publish given" : null,
        ].filter(Boolean) as string[]
        return (
          <article
            key={r.id}
            aria-label={`Review from ${r.name}`}
            className={cn(
              "gb-rise-sm grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-4 rounded-lg border border-line bg-surface p-5 max-md:grid-cols-1",
              done && "border-dashed bg-transparent",
            )}
          >
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <strong className="font-semibold">{r.name}</strong>
                <span className="text-[13px] text-ink-muted">{[r.role, r.company].filter(Boolean).join(", ")}</span>
                <span className="font-mono text-xs text-ink-subtle">{sentLine(r.createdAt)}</span>
              </div>
              <p className="mb-0 mt-2 max-w-[68ch] whitespace-pre-line text-[15px] leading-6">“{r.content}”</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {facts.map((f) => (
                  <span key={f} className="rounded-sm bg-surface-raised px-2 py-1 text-xs text-ink-muted">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex min-w-40 flex-col items-stretch gap-2 max-md:flex-row max-md:flex-wrap">
              {done ? (
                <>
                  <span role="status" className="max-w-[220px] text-sm text-ink-muted max-md:max-w-none">
                    {st.decision === "approve"
                      ? `Published on Home, at the end of the references. ${first} gets a thank you email.`
                      : "Declined. It stays hidden, and nothing is sent."}
                  </span>
                  {!st.committed && (
                    <button type="button" className={btn} onClick={() => undo(r.id)}>
                      Undo
                    </button>
                  )}
                </>
              ) : (
                <>
                  {st?.error && (
                    <span role="alert" className="text-sm text-danger">
                      {st.error}
                    </span>
                  )}
                  <button type="button" className={cn(btn, btnPrimary)} onClick={() => decide(r.id, "approve")}>
                    Approve and publish
                  </button>
                  <button type="button" className={btn} onClick={() => decide(r.id, "decline")}>
                    Decline
                  </button>
                  {r.email && (
                    <a className={btn} href={`mailto:${r.email}?subject=${encodeURIComponent("Your review")}`}>
                      Email them
                    </a>
                  )}
                </>
              )}
            </div>
          </article>
        )
      })}
    </section>
  )
}
