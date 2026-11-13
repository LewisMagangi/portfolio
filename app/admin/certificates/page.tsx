"use client"

import { ArrowDown, ArrowUp, MagnifyingGlass, PencilSimple, Trash } from "@phosphor-icons/react"
import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react"

import { PageHeader } from "@/components/admin/admin-shell"
import { StatusBadge } from "@/components/admin/status-badge"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Category = "AI_DATA" | "SOFTWARE" | "PROFESSIONAL" | "OTHER"
type Status = "VERIFIED" | "IN_PROGRESS"
type Cert = {
  id: string
  title: string
  fullTitle: string | null
  issuer: string
  org: string | null
  mark: string | null
  category: Category
  status: Status
  date: string
  length: string | null
  note: string | null
  tag: string | null
  learned: string[]
  verifyUrl: string | null
  image: string | null
  imageWidth: number | null
  imageHeight: number | null
  alt: string | null
  featured: boolean
}
type Data = { certificates: Cert[]; categories: { value: Category; label: string }[] }
type Editing = { id: string | null } | null

const control =
  "box-border min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus)]"

function Field({ id, label, hint, optional, children }: { id: string; label: string; hint?: string; optional?: boolean; children: ReactNode }) {
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

const ORDER: Category[] = ["AI_DATA", "SOFTWARE", "PROFESSIONAL", "OTHER"]

/** Admin › Certificates (Admin-Certificates board): the certificates on the Certificates page and in the Home carousel. */
export default function AdminCertificatesPage() {
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<"all" | Category | "progress">("all")
  const [query, setQuery] = useState("")
  const [editing, setEditing] = useState<Editing>(null)
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState("")
  const [notice, setNotice] = useState<{ text: string; tone?: "danger" } | null>(null)
  const [deleting, setDeleting] = useState<Cert | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/certificates")
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error)
      setData(body.data)
      setError("")
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Couldn’t load certificates.")
      setData({ certificates: [], categories: [] })
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

  useEffect(() => setFormError(""), [editing?.id])

  const certs = useMemo(
    () => [...(data?.certificates ?? [])].sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category)),
    [data],
  )
  const categories = data?.categories ?? []
  const labelOf = (c: Category) => categories.find((x) => x.value === c)?.label ?? c
  const inProgress = certs.filter((c) => c.status === "IN_PROGRESS")
  const professional = certs.filter((c) => c.category !== "OTHER" && c.status === "VERIFIED").length
  const others = certs.filter((c) => c.category === "OTHER" && c.status === "VERIFIED").length
  const cur = editing?.id ? certs.find((c) => c.id === editing.id) ?? null : null

  const q = query.trim().toLowerCase()
  const shown = certs.filter(
    (c) =>
      (filter === "all" || (filter === "progress" ? c.status === "IN_PROGRESS" : c.category === filter)) &&
      (!q || `${c.title} ${c.issuer} ${c.org ?? ""}`.toLowerCase().includes(q)),
  )
  // The arrows only make sense on the full, unsearched list of a group.
  const canMove = !q && filter !== "progress"

  const post = async (payload: Record<string, unknown>, done: string) => {
    setBusy(true)
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || "That didn’t save. Try again.")
      setData(body.data)
      setNotice({ text: done })
      return body.data as Data
    } catch (e) {
      const msg = e instanceof Error ? e.message : "That didn’t save. Try again."
      if (payload.action === "create" || payload.action === "update") setFormError(msg)
      else setNotice({ text: msg, tone: "danger" })
      return null
    } finally {
      setBusy(false)
    }
  }

  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editing) return
    const form = Object.fromEntries(new FormData(e.currentTarget))
    const creating = editing.id === null
    const out = await post(
      { action: creating ? "create" : "update", id: editing.id, data: form },
      form.status === "IN_PROGRESS" ? "Saved. It stays off the site until it’s verified." : "Saved. The Certificates page shows it now.",
    )
    if (out && creating) {
      const made = out.certificates.find((c) => c.title === String(form.title).trim() && c.category === form.category)
      setEditing({ id: made?.id ?? null })
    }
  }

  const remove = async () => {
    if (!deleting) return
    const out = await post({ action: "delete", id: deleting.id }, `Deleted “${deleting.title}”. It’s gone from the site.`)
    if (out) {
      if (editing?.id === deleting.id) setEditing(null)
      setDeleting(null)
    }
  }

  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: `All, ${certs.length}` },
    ...categories.map((c) => ({ id: c.value, label: c.label })),
    ...(inProgress.length ? [{ id: "progress" as const, label: `In progress, ${inProgress.length}` }] : []),
  ]

  const formKey = editing?.id ?? "new"
  const curCategory = cur?.category ?? (filter !== "all" && filter !== "progress" ? filter : "AI_DATA")

  return (
    <>
      <PageHeader
        crumb="Admin / Content"
        title="Certificates"
        description={
          data
            ? `${professional} professional, ${others} other${inProgress.length ? `, ${inProgress.length} in progress` : ""}. Shown on the Certificates page and in the Home carousel.`
            : "Shown on the Certificates page and in the Home carousel."
        }
      >
        <a href="/certificates" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View on site
        </a>
        <button type="button" className={buttonVariants({ size: "sm" })} onClick={() => setEditing({ id: null })}>
          + Add certificate
        </button>
      </PageHeader>

      {error && (
        <p role="alert" className="m-0 text-sm text-danger">
          {error}
        </p>
      )}
      <p aria-live="polite" className={cn("m-0 min-h-5 text-sm", notice?.tone === "danger" ? "text-danger" : "text-ink-muted")}>
        {notice?.text}
      </p>

      <div className="flex flex-wrap items-start gap-6">
        <section aria-label="Certificates" className="flex min-w-0 flex-[3_1_560px] flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by group">
              {filters.map((f) => (
                <button key={f.id} type="button" className="gb-chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
            <label className="relative flex min-w-[220px] flex-1 items-center sm:max-w-[280px]">
              <span className="sr-only">Search title or issuer</span>
              <MagnifyingGlass size={16} aria-hidden className="pointer-events-none absolute left-3 text-ink-subtle" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or issuer" className={cn(control, "min-h-10 py-2 pl-9 text-sm")} />
            </label>
          </div>

          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-subtle">
                  {["Certificate", "Status", "On home", "Issued", "Length", ""].map((h, i) => (
                    <th key={i} scope="col" className="border-b border-line px-4 py-2.5 font-medium">
                      {h || <span className="sr-only">Actions</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data === null ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-ink-muted">
                      Loading
                    </td>
                  </tr>
                ) : shown.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-ink-muted">
                      {q ? `Nothing matches “${query.trim()}”.` : "No certificates here yet."}
                    </td>
                  </tr>
                ) : (
                  shown.map((c, i) => {
                    const prev = shown[i - 1]
                    const next = shown[i + 1]
                    const groupStart = filter === "all" && !q && prev?.category !== c.category
                    return [
                      groupStart && (
                        <tr key={`${c.category}-h`} className="bg-surface">
                          <th colSpan={6} scope="colgroup" className="border-b border-line px-4 py-2 text-left text-xs font-medium text-ink-muted">
                            {labelOf(c.category)}
                          </th>
                        </tr>
                      ),
                      <tr key={c.id} className={cn("border-b border-line last:border-b-0", editing?.id === c.id && "bg-surface-raised")}>
                        <td className="max-w-[340px] px-4 py-3">
                          <button
                            type="button"
                            className="cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-ink hover:underline"
                            aria-pressed={editing?.id === c.id}
                            onClick={() => setEditing({ id: c.id })}
                          >
                            {c.title}
                          </button>
                          <div className="truncate text-[13px] text-ink-muted">{c.issuer}</div>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={c.status} tone={c.status === "VERIFIED" ? "success" : "warn"} />
                        </td>
                        <td className="px-4 py-3">
                          <Toggle
                            checked={c.featured}
                            disabled={busy || !c.image}
                            label={`Show ${c.title} in the Home carousel`}
                            onChange={(v) => post({ action: "feature", id: c.id, featured: v }, v ? "In the carousel now." : "Out of the carousel.")}
                          />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-muted">{c.date}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-muted">{c.length || "None"}</td>
                        <td className="px-2 py-3">
                          <div className="flex justify-end gap-0.5">
                            {canMove && (
                              <>
                                <button
                                  type="button"
                                  className="gb-iconbtn"
                                  disabled={busy || prev?.category !== c.category}
                                  aria-label={`Move ${c.title} up`}
                                  onClick={() => post({ action: "move", id: c.id, dir: -1 }, "Moved.")}
                                >
                                  <ArrowUp size={16} aria-hidden />
                                </button>
                                <button
                                  type="button"
                                  className="gb-iconbtn"
                                  disabled={busy || next?.category !== c.category}
                                  aria-label={`Move ${c.title} down`}
                                  onClick={() => post({ action: "move", id: c.id, dir: 1 }, "Moved.")}
                                >
                                  <ArrowDown size={16} aria-hidden />
                                </button>
                              </>
                            )}
                            <button type="button" className="gb-iconbtn" aria-label={`Edit ${c.title}`} onClick={() => setEditing({ id: c.id })}>
                              <PencilSimple size={16} aria-hidden />
                            </button>
                            <button type="button" className="gb-iconbtn" aria-label={`Delete ${c.title}`} onClick={() => setDeleting(c)}>
                              <Trash size={16} aria-hidden />
                            </button>
                          </div>
                        </td>
                      </tr>,
                    ]
                  })
                )}
              </tbody>
            </table>
          </div>
          <p className="m-0 text-xs text-ink-subtle">
            Each group lists newest first; the arrows set that order. The carousel runs newest first by date. Certificates in progress stay off the site.
          </p>
        </section>

        {editing && !(editing.id && !cur) && (
          <aside className="flex min-w-0 flex-[1_1_360px] flex-col rounded-lg border border-line bg-surface p-5" aria-label="Editor">
            <form key={formKey} onSubmit={save} className="flex flex-col gap-4" noValidate>
              <h2 className="title m-0">{editing.id === null ? "New certificate" : "Edit certificate"}</h2>
              {formError && (
                <p role="alert" className="m-0 text-sm text-danger">
                  {formError}
                </p>
              )}

              <Field id="c-title" label="Title">
                <input id="c-title" name="title" required defaultValue={cur?.title} placeholder="Founder Academy" className={control} />
              </Field>
              <Field id="c-issuer" label="Issuer" hint="As the card shows it, for example DataCamp, career track">
                <input id="c-issuer" name="issuer" required defaultValue={cur?.issuer} className={control} />
              </Field>
              <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                <Field id="c-cat" label="Group">
                  <select id="c-cat" name="category" defaultValue={curCategory} className={control}>
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="c-status" label="Status">
                  <select id="c-status" name="status" defaultValue={cur?.status ?? "VERIFIED"} className={control}>
                    <option value="VERIFIED">Verified</option>
                    <option value="IN_PROGRESS">In progress (hidden)</option>
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                <Field id="c-date" label="Issued" hint="Nov 2026, or a range">
                  <input id="c-date" name="date" required defaultValue={cur?.date} className={control} />
                </Field>
                <Field id="c-length" label="Length" optional hint="43 HR, 12 WK">
                  <input id="c-length" name="length" defaultValue={cur?.length ?? ""} className={control} />
                </Field>
              </div>
              <Field id="c-verify" label="Verify link" optional>
                <input id="c-verify" name="verifyUrl" type="url" defaultValue={cur?.verifyUrl ?? ""} placeholder="https://" className={control} />
              </Field>

              <fieldset className="m-0 flex flex-col gap-4 border-0 border-t border-line p-0 pt-4">
                <legend className="float-left mb-1 p-0 text-sm font-medium">On the card</legend>
                <div className="grid grid-cols-[96px_1fr] gap-3">
                  <Field id="c-mark" label="Mark" optional>
                    <input id="c-mark" name="mark" maxLength={4} defaultValue={cur?.mark ?? ""} placeholder="DC" className={cn(control, "font-mono")} />
                  </Field>
                  <Field id="c-note" label="Note" optional>
                    <input id="c-note" name="note" defaultValue={cur?.note ?? ""} placeholder="Capstone: Project Nexus" className={control} />
                  </Field>
                </div>
                <Field id="c-learned" label="What it taught" optional hint="One per line. Other certificates don’t show this.">
                  <textarea id="c-learned" name="learned" rows={4} defaultValue={cur?.learned.join("\n") ?? ""} className={cn(control, "resize-y text-sm")} />
                </Field>
              </fieldset>

              <fieldset className="m-0 flex flex-col gap-4 border-0 border-t border-line p-0 pt-4">
                <legend className="float-left mb-1 p-0 text-sm font-medium">The image</legend>
                <Field id="c-image" label="Image" optional hint="A path in public, like /certificates/founder-academy.jpg">
                  <input id="c-image" name="image" defaultValue={cur?.image ?? ""} className={cn(control, "font-mono text-sm")} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field id="c-w" label="Width" optional>
                    <input id="c-w" name="imageWidth" inputMode="numeric" defaultValue={cur?.imageWidth ?? ""} placeholder="1100" className={control} />
                  </Field>
                  <Field id="c-h" label="Height" optional>
                    <input id="c-h" name="imageHeight" inputMode="numeric" defaultValue={cur?.imageHeight ?? ""} placeholder="635" className={control} />
                  </Field>
                </div>
                <label className="flex min-h-11 items-center gap-3 text-sm">
                  <input type="checkbox" name="featured" defaultChecked={cur?.featured ?? false} className="m-0 size-5 flex-none accent-[var(--ink)]" />
                  Show it in the carousel on Home and Certificates
                </label>
                <Field id="c-full" label="Carousel title" optional hint="Only if it differs from the title, like ProDev Backend, Professional Diploma">
                  <input id="c-full" name="fullTitle" defaultValue={cur?.fullTitle ?? ""} className={control} />
                </Field>
                <Field id="c-org" label="Carousel issuer" optional hint="Short, like DataCamp">
                  <input id="c-org" name="org" defaultValue={cur?.org ?? ""} className={control} />
                </Field>
              </fieldset>

              <fieldset className="m-0 flex flex-col gap-4 border-0 border-t border-line p-0 pt-4">
                <legend className="float-left mb-1 p-0 text-sm font-medium">Other certificates only</legend>
                <Field id="c-tag" label="Tag" optional hint="A short result, like Board 3, 3 of 5">
                  <input id="c-tag" name="tag" defaultValue={cur?.tag ?? ""} className={control} />
                </Field>
                <Field id="c-alt" label="Image description" optional hint="For screen readers. Left empty, it names the issuer and title.">
                  <input id="c-alt" name="alt" defaultValue={cur?.alt ?? ""} className={control} />
                </Field>
              </fieldset>

              <div className="-mx-5 -mb-5 mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-line px-5 py-4">
                {cur ? (
                  <button type="button" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5")} onClick={() => setDeleting(cur)}>
                    <Trash size={16} aria-hidden />
                    Delete
                  </button>
                ) : (
                  <span />
                )}
                <span className="flex gap-2">
                  <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => setEditing(null)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={busy} className={cn(buttonVariants({ size: "sm" }), "disabled:opacity-60")}>
                    {busy ? "Saving" : "Save"}
                  </button>
                </span>
              </div>
            </form>
          </aside>
        )}
      </div>

      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent showCloseButton={false} className="border-line bg-surface text-ink">
          <DialogTitle className="title m-0">Delete “{deleting?.title}”?</DialogTitle>
          <DialogDescription className="m-0 text-sm text-ink-muted">
            It will be removed from the Certificates page and the Home carousel. This can’t be undone.
          </DialogDescription>
          <DialogFooter className="gap-2">
            <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => setDeleting(null)}>
              Keep it
            </button>
            <button type="button" disabled={busy} className={buttonVariants({ variant: "destructive", size: "sm" })} onClick={remove}>
              Delete certificate
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
