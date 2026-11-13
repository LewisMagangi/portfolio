"use client"

import Link from "next/link"
import { useEffect, useRef, type ReactNode } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { buttonVariants } from "@/components/ui/button"
import { SUBJECTS, type ContactField, type ContactState } from "@/lib/contact-schema"
import { cn } from "@/lib/utils"

import { sendMessage } from "./actions"

const control =
  "box-border min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus)] aria-[invalid=true]:border-danger"

const ORDER: ContactField[] = ["name", "email", "subject", "message"]

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <em className="ml-1.5 font-normal not-italic text-ink-subtle">optional</em>}
      </label>
      {children}
      {error && (
        <span id={`${id}-msg`} className="text-xs text-danger">
          {error}
        </span>
      )}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={cn(buttonVariants(), "disabled:opacity-60")}>
      {pending ? "Sending" : "Send message"}
    </button>
  )
}

export function ContactForm() {
  const [state, action] = useFormState<ContactState, FormData>(sendMessage, { status: "idle" })
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  const errors = state.status === "error" ? state.fields : {}
  const a11y = (name: ContactField, id: string) => ({
    id,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-msg` : undefined,
  })

  useEffect(() => {
    if (state.status === "sent") doneRef.current?.focus()
    if (state.status === "error") {
      const first = ORDER.find((f) => state.fields[f])
      const el = first ? formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`) : null
      el?.focus()
    }
  }, [state])

  const card = "flex min-w-0 flex-[1_1_440px] flex-col self-start rounded-lg border border-line bg-surface p-8 max-sm:p-5"

  if (state.status === "sent") {
    return (
      <div className={cn(card, "gb-rise gap-4")} role="status">
        <span className="gb-pill self-start">
          <span className="gb-pill-dot" aria-hidden />
          Sent
        </span>
        <h2 ref={doneRef} tabIndex={-1} className="heading m-0 outline-none">
          Thanks, {state.firstName}.
        </h2>
        <p className="m-0 text-ink-muted">Your message is in my inbox. I reply within two working days.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/book" className={buttonVariants({ variant: "outline" })}>
            Book a free discovery call
          </Link>
          <Link href="/work">See the work</Link>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} action={action} aria-label="Send a message" className={cn(card, "gap-[18px]")}>
      {state.status === "error" && (
        <p role="alert" className="m-0 text-sm text-danger">
          {state.message}
        </p>
      )}

      {/* Hidden from people; bots that fill it are dropped. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="ct-website">Website</label>
        <input id="ct-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Field id="ct-name" label="Name" error={errors.name}>
          <input {...a11y("name", "ct-name")} autoComplete="name" required maxLength={80} placeholder="Ada Lovelace" className={control} />
        </Field>
        <Field id="ct-email" label="Email" error={errors.email}>
          <input
            {...a11y("email", "ct-email")}
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            placeholder="you@company.com"
            className={control}
          />
        </Field>
      </div>
      <Field id="ct-subject" label="Subject" optional error={errors.subject}>
        <select {...a11y("subject", "ct-subject")} defaultValue="" className={control}>
          <option value="">Choose one</option>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>
      <Field id="ct-message" label="Message" error={errors.message}>
        <textarea
          {...a11y("message", "ct-message")}
          required
          rows={6}
          minLength={10}
          maxLength={4000}
          placeholder="What are we building?"
          className={cn(control, "min-h-36 resize-y")}
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-ink-subtle">Lands in my inbox, never shared</span>
        <SubmitButton />
      </div>
    </form>
  )
}
