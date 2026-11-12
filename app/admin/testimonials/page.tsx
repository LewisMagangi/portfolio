"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { PencilSimple, Trash, X } from "@phosphor-icons/react"
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react"

import { PageHeader, refreshAdminCounts } from "@/components/admin/admin-shell"
import { ReviewQueue } from "@/components/admin/review-queue"
import { StatusBadge } from "@/components/admin/status-badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Status = "PENDING" | "APPROVED" | "REJECTED"
type Testimonial = {
  id: string
  name: string
  role: string
  company?: string | null
  relation?: string | null
  content: string
  quote?: string | null
  letterUrl?: string | null
  status: Status
  source: "LETTER" | "CLIENT_REVIEW"
  createdAt: string
}

const FILTERS = [
  { key: "all", label: "All", test: () => true },
  { key: "published", label: "Published", test: (t: Testimonial) => t.status === "APPROVED" },
  { key: "pending", label: "Waiting", test: (t: Testimonial) => t.status === "PENDING" },
  { key: "declined", label: "Declined", test: (t: Testimonial) => t.status === "REJECTED" },
  { key: "client", label: "Client reviews", test: (t: Testimonial) => t.source === "CLIENT_REVIEW" },
] as const

const STATUS_LABEL: Record<Status, string> = { APPROVED: "Published", PENDING: "Waiting", REJECTED: "Declined" }

const control =
  "box-border min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus)]"

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && <span className="text-xs text-ink-subtle">{hint}</span>}
    </div>
  )
}

/** The edit panel for a referee letter. Client reviews never open here: their words are never changed. */
function LetterDialog({
  item,
  open,
  onOpenChange,
  onSaved,
}: {
  item: Testimonial | null
  open: boolean
  onOpenChange: (o: boolean) => void
  onSaved: () => void
}) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setSaving(true)
    setError("")
    try {
      const res = await fetch(item ? `/api/testimonials/${item.id}` : "/api/testimonials", {
        method: item ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          role: f.role,
          company: f.company || null,
          relation: f.relation || null,
          quote: f.quote || null,
          content: f.content,
          letterUrl: f.letterUrl || null,
          status: f.status,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      onSaved()
      onOpenChange(false)
    } catch {
      setError("Couldn’t save. Check the required fields and try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[90] bg-black/60" />
        <DialogPrimitive.Content
          data-theme="dark"
          className="fixed inset-y-0 right-0 z-[91] flex w-[min(460px,100%)] flex-col overflow-y-auto border-l border-line bg-surface font-sans text-ink shadow-2xl outline-none"
        >
          <form onSubmit={save} className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <DialogPrimitive.Title className="title m-0">{item ? "Edit reference" : "New reference"}</DialogPrimitive.Title>
                <DialogPrimitive.Description className="m-0 mt-1 text-sm text-ink-muted">
                  A referee letter. Quote it word for word.
                </DialogPrimitive.Description>
              </div>
              <DialogPrimitive.Close className="gb-iconbtn" aria-label="Close">
                <X size={18} aria-hidden />
              </DialogPrimitive.Close>
            </div>
            {error && (
              <p role="alert" className="m-0 text-sm text-danger">
                {error}
              </p>
            )}
            <Field id="ref-name" label="Name">
              <input id="ref-name" name="name" required defaultValue={item?.name} className={control} />
            </Field>
            <Field id="ref-role" label="Role">
              <input id="ref-role" name="role" required defaultValue={item?.role} className={control} />
            </Field>
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              <Field id="ref-company" label="Organisation">
                <input id="ref-company" name="company" defaultValue={item?.company ?? ""} className={control} />
              </Field>
              <Field id="ref-relation" label="Relationship" hint="How they know you">
                <input id="ref-relation" name="relation" defaultValue={item?.relation ?? ""} className={control} />
              </Field>
            </div>
            <Field id="ref-quote" label="Quote" hint="One or two sentences, word for word from the letter.">
              <textarea id="ref-quote" name="quote" rows={3} defaultValue={item?.quote ?? ""} className={cn(control, "resize-y")} />
            </Field>
            <Field id="ref-content" label="Full message" hint="Opens in place under “Read the full message”.">
              <textarea id="ref-content" name="content" required rows={6} defaultValue={item?.content} className={cn(control, "resize-y")} />
            </Field>
            <Field id="ref-letter" label="Letter link">
              <input id="ref-letter" name="letterUrl" type="url" placeholder="https://" defaultValue={item?.letterUrl ?? ""} className={control} />
            </Field>
            <Field id="ref-status" label="Status">
              <select id="ref-status" name="status" defaultValue={item?.status ?? "APPROVED"} className={control}>
                <option value="APPROVED">Published</option>
                <option value="PENDING">Draft</option>
              </select>
            </Field>
            <div className="-mx-6 -mb-6 mt-auto flex justify-end gap-2 border-t border-line bg-surface px-6 py-4">
              <DialogPrimitive.Close className={buttonVariants({ variant: "outline", size: "sm" })}>Cancel</DialogPrimitive.Close>
              <button type="submit" disabled={saving} className={cn(buttonVariants({ size: "sm" }), "disabled:opacity-60")}>
                {saving ? "Saving" : "Save"}
              </button>
            </div>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

/** Admin › References (Admin-References board): the client reviews queue, then every reference. */
export default function AdminReferencesPage() {
  const [items, setItems] = useState<Testimonial[] | null>(null)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all")
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [notice, setNotice] = useState("")
  const [version, setVersion] = useState(0)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials")
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()
      setItems(data.data)
      setError("")
    } catch {
      setError("Couldn’t load the references.")
      setItems([])
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const remove = async (t: Testimonial) => {
    setConfirmDelete(null)
    const res = await fetch(`/api/testimonials/${t.id}`, { method: "DELETE" }).catch(() => null)
    setNotice(res?.ok ? `Deleted the reference from ${t.name}.` : `Couldn’t delete the reference from ${t.name}.`)
    await load()
    setVersion((v) => v + 1)
    refreshAdminCounts()
  }

  const active = FILTERS.find((f) => f.key === filter)!
  const rows = (items ?? []).filter(active.test)

  return (
    <>
      <PageHeader
        crumb="Admin / Content"
        title="References"
        description="Referee letters and client reviews. Reviews sent from the site wait here until you confirm you worked together. Published ones show on Home in this order."
      >
        <a href="/#trust" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View on site
        </a>
        <button
          type="button"
          className={buttonVariants({ size: "sm" })}
          onClick={() => {
            setEditing(null)
            setDialogOpen(true)
          }}
        >
          New reference
        </button>
      </PageHeader>

      <ReviewQueue onChange={load} version={version} />

      <section aria-labelledby="refs-h" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="refs-h" className="title m-0">
            Every reference
          </h2>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter references">
            {FILTERS.map((f) => (
              <button key={f.key} type="button" className="gb-chip" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}
                <span className="gb-chip-n">{(items ?? []).filter(f.test).length}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {notice}
        </p>
        {error && (
          <p role="alert" className="m-0 text-sm text-danger">
            {error}
          </p>
        )}

        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs text-ink-subtle">
                {["Referee", "Relationship", "Source", "Status", ""].map((h, i) => (
                  <th key={i} scope="col" className="border-b border-line px-4 py-2.5 font-medium">
                    {h || <span className="sr-only">Actions</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items === null ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ink-muted">
                    Loading
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ink-muted">
                    Nothing here yet.
                  </td>
                </tr>
              ) : (
                rows.map((t) => (
                  <tr key={t.id} className="border-b border-line align-top last:border-b-0">
                    <td className="px-4 py-3">
                      <div className="font-medium">{t.name}</div>
                      <div className="text-[13px] text-ink-muted">{[t.role, t.company].filter(Boolean).join(", ")}</div>
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{t.relation || "Not set"}</td>
                    <td className="px-4 py-3 text-ink-muted">{t.source === "CLIENT_REVIEW" ? "Client review" : "Letter"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={t.status} label={STATUS_LABEL[t.status]} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {confirmDelete === t.id ? (
                          <>
                            <button type="button" className={buttonVariants({ variant: "destructive", size: "sm" })} onClick={() => remove(t)}>
                              Delete for good
                            </button>
                            <button type="button" className={buttonVariants({ variant: "ghost", size: "sm" })} onClick={() => setConfirmDelete(null)}>
                              Keep
                            </button>
                          </>
                        ) : (
                          <>
                            {t.source === "LETTER" ? (
                              <button
                                type="button"
                                className="gb-iconbtn"
                                aria-label={`Edit ${t.name}`}
                                onClick={() => {
                                  setEditing(t)
                                  setDialogOpen(true)
                                }}
                              >
                                <PencilSimple size={16} aria-hidden />
                              </button>
                            ) : (
                              <span className="px-2 text-xs text-ink-subtle" title="A reviewer’s words are never edited">
                                Not editable
                              </span>
                            )}
                            <button type="button" className="gb-iconbtn" aria-label={`Delete ${t.name}`} onClick={() => setConfirmDelete(t.id)}>
                              <Trash size={16} aria-hidden />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <LetterDialog key={editing?.id ?? "new"} item={editing} open={dialogOpen} onOpenChange={setDialogOpen} onSaved={load} />
    </>
  )
}
