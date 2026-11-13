"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** The admin's text input, select and textarea style. */
export const control =
  "box-border min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus)]"

export function Field({ id, label, hint, optional, children }: { id: string; label: string; hint?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <em className="ml-1.5 font-normal not-italic text-ink-subtle">optional</em>}
      </label>
      {children}
      {hint && <span className="text-xs text-ink-subtle">{hint}</span>}
    </div>
  )
}

/** Gambit Switch. */
export function Toggle({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-line-strong transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40",
        checked ? "bg-ink" : "bg-surface-raised",
      )}
    >
      <span
        aria-hidden
        className={cn("block size-4 rounded-full transition-transform duration-200 motion-reduce:transition-none", checked ? "translate-x-[19px] bg-bg" : "translate-x-[3px] bg-ink-muted")}
      />
    </button>
  )
}
