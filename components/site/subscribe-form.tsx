"use client"

import { Check } from "@phosphor-icons/react"
import { useEffect, useRef, useState, type FormEvent } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

// What the confirm and unsubscribe links report back through ?subscribed=.
const RETURNS: Record<string, { ok: boolean; text: string }> = {
  yes: { ok: true, text: "You’re subscribed. The next post arrives by email." },
  no: { ok: true, text: "You’re unsubscribed. Nothing more will arrive." },
  invalid: { ok: false, text: "That link didn’t work. It may have been cut short; subscribe again below." },
  error: { ok: false, text: "That didn’t go through. Try the link again in a few minutes." },
}

/** Blog board: "Get new posts by email". Double opt in, so the done state says to check the inbox. */
export function SubscribeForm() {
  const [err, setErr] = useState("")
  const [sent, setSent] = useState("")
  const [busy, setBusy] = useState(false)
  const [back, setBack] = useState<(typeof RETURNS)[string] | null>(null)
  const done = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("subscribed")
    if (v && RETURNS[v]) setBack(RETURNS[v])
  }, [])

  useEffect(() => {
    if (sent) done.current?.focus()
  }, [sent])

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const v = String(form.get("email") ?? "").trim()
    if (!EMAIL_RE.test(v)) {
      setErr(v ? "That email looks incomplete. Try name@company.com." : "Add your email to subscribe.")
      input.current?.focus()
      return
    }
    setBusy(true)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v, website: form.get("website") }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error)
      setErr("")
      setSent(v)
    } catch (e) {
      setErr(e instanceof Error && e.message ? e.message : "That didn’t go through. Try again.")
      input.current?.focus()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {back && (
        <p role="status" className={cn("m-0 text-sm", back.ok ? "text-ink" : "text-danger")}>
          {back.text}
        </p>
      )}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[680px] flex-col gap-2">
          <h2 id="sub-h" className="title m-0">
            Get new posts by email
          </h2>
          <p className="m-0 text-ink-muted">One email per post, nothing else. Unsubscribe from any email.</p>
        </div>
        {sent ? (
          <div
            ref={done}
            role="status"
            tabIndex={-1}
            className="flex max-w-[420px] items-start gap-3 rounded-[12px] border border-line p-4 text-sm text-ink-muted focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
          >
            <Check size={18} className="mt-px flex-none text-success" aria-hidden />
            <span>
              <strong className="font-medium text-ink">Subscribed.</strong> Check {sent} for a confirmation link. Nothing arrives until you click it.
            </span>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-wrap items-end gap-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="sub-email" className="text-sm font-medium">
                Email
              </label>
              <input
                ref={input}
                id="sub-email"
                type="email"
                name="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="you@company.com"
                aria-invalid={err ? true : undefined}
                aria-describedby={err ? "sub-err" : undefined}
                className="box-border min-h-11 w-[280px] max-w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus)] aria-[invalid]:border-danger"
              />
            </div>
            {/* Left empty by people; bots fill it. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-px w-px opacity-0" />
            <button type="submit" disabled={busy} className={cn(buttonVariants({ variant: "outline" }), "disabled:opacity-60")}>
              {busy ? "Subscribing" : "Subscribe"}
            </button>
            {err && (
              <span id="sub-err" role="alert" className="basis-full text-sm text-danger">
                {err}
              </span>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
