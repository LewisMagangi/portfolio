"use client"

import Link from "next/link"
import { useEffect, useRef, type ReactNode } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { buttonVariants } from "@/components/ui/button"
import { RELATIONS, type ReviewField, type ReviewState } from "@/lib/review-schema"
import { cn } from "@/lib/utils"

import { submitReview } from "./actions"

const control =
  "box-border min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus)] aria-[invalid=true]:border-danger"

const ORDER: ReviewField[] = ["name", "email", "role", "org", "relation", "project", "review", "link", "consent"]

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <em className="ml-1.5 font-normal not-italic text-ink-subtle">optional</em>}
      </label>
      {children}
      {error ? (
        <span id={`${id}-msg`} className="text-xs text-danger">
          {error}
        </span>
      ) : hint ? (
        <span id={`${id}-msg`} className="text-xs text-ink-subtle">
          {hint}
        </span>
      ) : null}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={cn(buttonVariants(), "disabled:opacity-60")}>
      {pending ? "Sending" : "Send my review"}
    </button>
  )
}

export function ReviewForm() {
  const [state, action] = useFormState<ReviewState, FormData>(submitReview, { status: "idle" })
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  const errors = state.status === "error" ? state.fields : {}
  const a11y = (name: ReviewField, id: string, hasHint = false) => ({
    id,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] || hasHint ? `${id}-msg` : undefined,
  })

  useEffect(() => {
    if (state.status === "sent") doneRef.current?.focus()
    if (state.status === "error") {
      const first = ORDER.find((f) => state.fields[f])
      const el = first ? formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`) : null
      el?.focus()
    }
  }, [state])

  if (state.status === "sent") {
    return (
      <div className="gb-rise flex flex-col gap-4 rounded-lg border border-line bg-surface p-8" role="status">
        <span className="gb-pill">
          <span className="gb-pill-dot" aria-hidden />
          Received
        </span>
        <h2 ref={doneRef} tabIndex={-1} className="heading m-0 outline-none">
          Thank you, {state.firstName}.
        </h2>
        <p className="m-0 text-ink-muted">
          Your review is with me. Once I’ve confirmed we worked together it appears on Home, and you’ll get an email.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/#trust" className={buttonVariants({ variant: "outline" })}>
            Back to the references
          </Link>
          <Link href="/work">See the work</Link>
        </div>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      action={action}
      aria-label="Your review"
      className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-7 max-sm:p-5"
    >
      {state.status === "error" && (
        <p role="alert" className="m-0 text-sm text-danger">
          {state.message}
        </p>
      )}

      {/* Hidden from people; bots that fill it are dropped. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="rv-website">Website</label>
        <input id="rv-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Field id="rv-name" label="Your name" error={errors.name}>
          <input {...a11y("name", "rv-name")} autoComplete="name" required maxLength={80} className={control} />
        </Field>
        <Field id="rv-email" label="Email" hint="Only for confirming. Never shown." error={errors.email}>
          <input {...a11y("email", "rv-email", true)} type="email" autoComplete="email" required maxLength={160} className={control} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Field id="rv-role" label="Your role" error={errors.role}>
          <input {...a11y("role", "rv-role")} autoComplete="organization-title" required maxLength={80} placeholder="Founder" className={control} />
        </Field>
        <Field id="rv-org" label="Organisation" optional error={errors.org}>
          <input {...a11y("org", "rv-org")} autoComplete="organization" maxLength={80} className={control} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Field id="rv-rel" label="How we worked together" error={errors.relation}>
          <select {...a11y("relation", "rv-rel")} required defaultValue="" className={control}>
            <option value="">Choose one</option>
            {RELATIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field id="rv-proj" label="Project" optional error={errors.project}>
          <input {...a11y("project", "rv-proj")} maxLength={80} placeholder="Wamumbi" className={control} />
        </Field>
      </div>
      <Field id="rv-text" label="Your review" hint="40 to 800 characters. Plain words work best." error={errors.review}>
        <textarea
          {...a11y("review", "rv-text", true)}
          required
          minLength={40}
          maxLength={800}
          placeholder="What was the problem, what did I do, and what changed?"
          className={cn(control, "min-h-40 resize-y")}
        />
      </Field>
      <Field
        id="rv-link"
        label="LinkedIn or website"
        optional
        hint="Shown under your name so readers can see you’re real."
        error={errors.link}
      >
        <input {...a11y("link", "rv-link", true)} type="url" maxLength={200} placeholder="https://" className={control} />
      </Field>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-sm text-ink-muted">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "rv-consent-msg" : undefined}
            className="m-0 size-5 flex-none accent-[var(--ink)]"
          />
          <span>I agree to my name, role and review appearing on this site. I can ask for it to come down at any time.</span>
        </label>
        {errors.consent && (
          <span id="rv-consent-msg" className="pl-8 text-xs text-danger">
            {errors.consent}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <SubmitButton />
        <span className="text-sm text-ink-subtle">Reviewed by hand, usually within two days.</span>
      </div>
    </form>
  )
}
