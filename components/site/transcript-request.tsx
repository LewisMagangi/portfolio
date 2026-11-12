"use client"

import { Check, LockSimple } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { submitTranscriptRequest, type TranscriptField, type TranscriptState } from "@/app/(site)/education/transcript-actions"
import { buttonVariants } from "@/components/ui/button"
import { ACCESS_DAYS, REASONS } from "@/lib/transcript-shared"
import { cn } from "@/lib/utils"

const control =
  "box-border min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus)] aria-[invalid=true]:border-danger"
const card = "flex gap-4 rounded-lg border border-line bg-surface p-6 max-sm:p-5"

function Send() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className={cn(buttonVariants(), "disabled:opacity-60")}>
      {pending ? "Sending" : "Send request"}
    </button>
  )
}

const ORDER: TranscriptField[] = ["name", "email", "organisation", "reason", "agree"]

/** Ask to see the private transcript (Gambit AccessRequest): a closed card, then the form, then a confirmation. */
export function TranscriptRequest() {
  const [open, setOpen] = useState(false)
  const [state, action] = useFormState<TranscriptState, FormData>(submitTranscriptRequest, { status: "idle" })
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)
  const errors = state.status === "error" ? state.fields : {}

  // Focus follows the flow: the first field when the form opens, the first error after a failed send, the confirmation once sent.
  useEffect(() => {
    if (state.status === "sent") doneRef.current?.focus()
    else if (state.status === "error") {
      const first = ORDER.find((f) => state.fields[f])
      formRef.current?.querySelector<HTMLElement>(`[name="${first ?? "name"}"]`)?.focus()
    }
  }, [state])
  useEffect(() => {
    // Not the hidden anti-spam field, which comes first in the markup.
    if (open && state.status === "idle") formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus()
  }, [open, state.status])

  const a11y = (name: TranscriptField, id: string) => ({
    id,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-e` : undefined,
  })
  const err = (name: TranscriptField, id: string) =>
    errors[name] ? (
      <span id={`${id}-e`} className="text-xs text-danger">
        {errors[name]}
      </span>
    ) : null

  if (state.status === "sent") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className={cn(card, "gb-rise outline-none")}>
        <span className="grid size-10 flex-none place-items-center rounded-full border border-line-strong" aria-hidden>
          <Check size={20} />
        </span>
        <div className="flex flex-col gap-1">
          <h3 className="title m-0">Request sent.</h3>
          <p className="m-0 text-ink-muted">
            I review every request myself. If I approve it, you’ll get a private link at {state.email}. It works for {ACCESS_DAYS} days,
            then closes on its own.
          </p>
        </div>
      </div>
    )
  }

  if (!open) {
    return (
      <div className={cn(card, "flex-wrap items-center")}>
        <span className="grid size-10 flex-none place-items-center rounded-full border border-line-strong" aria-hidden>
          <LockSimple size={20} />
        </span>
        <div className="flex min-w-[min(100%,280px)] flex-1 flex-col gap-1">
          <h3 className="title m-0">Transcript on request</h3>
          <p className="m-0 text-ink-muted">
            My full academic transcript is private. Ask for it here; when I approve, you get a link that works for {ACCESS_DAYS} days.
          </p>
        </div>
        <button type="button" className={buttonVariants({ variant: "outline" })} onClick={() => setOpen(true)}>
          Request access
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} action={action} aria-labelledby="ar-h" className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-7 max-sm:p-5">
      <div className="flex flex-col gap-1">
        <h3 id="ar-h" className="title m-0">
          Request my transcript
        </h3>
        <p className="m-0 text-sm text-ink-muted">Takes a minute. Access lasts {ACCESS_DAYS} days from approval and can’t be passed on.</p>
      </div>
      {state.status === "error" && (
        <p role="alert" className="m-0 text-sm text-danger">
          {state.message}
        </p>
      )}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="ar-website">Website</label>
        <input id="ar-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ar-name" className="text-sm font-medium">
            Your name
          </label>
          <input {...a11y("name", "ar-name")} autoComplete="name" required maxLength={80} className={control} />
          {err("name", "ar-name")}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ar-email" className="text-sm font-medium">
            Work email
          </label>
          <input {...a11y("email", "ar-email")} type="email" autoComplete="email" spellCheck={false} required maxLength={160} className={control} />
          {err("email", "ar-email")}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ar-org" className="text-sm font-medium">
            Organisation
          </label>
          <input {...a11y("organisation", "ar-org")} autoComplete="organization" required maxLength={120} className={control} />
          {err("organisation", "ar-org")}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ar-reason" className="text-sm font-medium">
            Why you need it
          </label>
          <select {...a11y("reason", "ar-reason")} required defaultValue="" className={control}>
            <option value="">Choose one</option>
            {REASONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          {err("reason", "ar-reason")}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="ar-note" className="text-sm font-medium">
          Anything else <em className="ml-1 font-normal not-italic text-ink-subtle">optional</em>
        </label>
        <textarea id="ar-note" name="note" rows={3} maxLength={600} className={cn(control, "resize-y")} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-sm text-ink-muted">
          <input
            type="checkbox"
            name="agree"
            required
            aria-invalid={errors.agree ? true : undefined}
            aria-describedby={errors.agree ? "ar-agree-e" : undefined}
            className="m-0 size-5 flex-none accent-[var(--ink)]"
          />
          <span>I’ll use it only to assess Lewis and won’t share it.</span>
        </label>
        {errors.agree && (
          <span id="ar-agree-e" className="pl-8 text-xs text-danger">
            {errors.agree}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <Send />
        <button type="button" className={buttonVariants({ variant: "ghost" })} onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  )
}
