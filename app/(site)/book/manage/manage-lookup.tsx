"use client"

import { useState, type FormEvent } from "react"

import { Icon } from "@/components/gambit/icon"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Resends the manage links for an email. The answer is the same whether or not that address has booked. */
export function ManageLookup() {
  const [sent, setSent] = useState("")
  const [err, setErr] = useState("")
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Enter the email you booked with.")
      return
    }
    setBusy(true)
    try {
      const res = await fetch("/api/bookings/links", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error)
      setErr("")
      setSent(email)
    } catch (e) {
      setErr(e instanceof Error && e.message ? e.message : "That didn’t go through. Try again.")
    } finally {
      setBusy(false)
    }
  }

  if (sent)
    return (
      <p role="status" className="m-0 flex items-start gap-3 rounded-md border border-line p-4 text-sm text-ink-muted">
        <Icon name="check" size={16} />
        <span>
          If {sent} has an upcoming call, the link is on its way. Nothing there in a few minutes? Check spam, or <a href="/contact">send a message</a>.
        </span>
      </p>
    )

  return (
    <form onSubmit={submit} noValidate className="flex flex-wrap items-end gap-2">
      <div className={cn("gb-field w-[320px] max-w-full", err && "gb-field-error")}>
        <label className="gb-field-label" htmlFor="ml-email">
          Email
        </label>
        <input id="ml-email" name="email" type="email" autoComplete="email" spellCheck={false} aria-invalid={!!err} aria-describedby={err ? "ml-err" : undefined} />
      </div>
      <button type="submit" disabled={busy} className={buttonVariants({ variant: "outline" })}>
        {busy ? "Sending" : "Send my link"}
      </button>
      {err && (
        <span id="ml-err" role="alert" className="gb-field-err basis-full">
          {err}
        </span>
      )}
    </form>
  )
}
