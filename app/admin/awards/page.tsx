"use client"

import { ArrowDown, ArrowUp, MagnifyingGlass, PencilSimple, Trash } from "@phosphor-icons/react"
import { useCallback, useEffect, useState, type FormEvent } from "react"

import { PageHeader } from "@/components/admin/admin-shell"
import { Field, Toggle, control } from "@/components/admin/fields"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Award = {
  id: string
  rank: string
  title: string
  event: string
  year: string
  tone: "RANKING" | "QUIET"
  href: string | null
  proofUrl: string | null
  featured: boolean
}
type Link = { href: string; label: string }
type Data = { awards: Award[]; links: Link[] }
type Editing = { id: string | null } | null

/** Admin › Awards (Admin-Awards board): the rankings and honours on Home. */
export default function AdminAwardsPage() {
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<"all" | "home" | "hidden">("all")
  const [query, setQuery] = useState("")
  const [editing, setEditing] = useState<Editing>(null)
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState("")
  const [notice, setNotice] = useState<{ text: string; tone?: "danger" } | null>(null)
  const [deleting, setDeleting] = useState<Award | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/awards")
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error)
      setData(body.data)
      setError("")
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Couldn’t load awards.")
      setData({ awards: [], links: [] })
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

  const awards = data?.awards ?? []
  const links = data?.links ?? []
  const onHome = awards.filter((a) => a.featured)
  const cur = editing?.id ? awards.find((a) => a.id === editing.id) ?? null : null

  const q = query.trim().toLowerCase()
  const shown = awards.filter(
    (a) =>
      (filter === "all" || (filter === "home" ? a.featured : !a.featured)) &&
      (!q || `${a.rank} ${a.title} ${a.event} ${a.year}`.toLowerCase().includes(q)),
  )
  const canMove = filter === "all" && !q

  const post = async (payload: Record<string, unknown>, done: string) => {
    setBusy(true)
    try {
      const res = await fetch("/api/admin/awards", {
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
      form.featured ? "Saved. Home shows it now." : "Saved. It stays off Home until you switch it on.",
    )
    if (out && creating) {
      const made = [...out.awards].reverse().find((a) => a.title === String(form.title).trim())
      setEditing({ id: made?.id ?? null })
    }
  }

  const remove = async () => {
    if (!deleting) return
    const out = await post({ action: "delete", id: deleting.id }, `Deleted “${deleting.title}”. It’s gone from Home.`)
    if (out) {
      if (editing?.id === deleting.id) setEditing(null)
      setDeleting(null)
    }
  }

  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: `All, ${awards.length}` },
    { id: "home", label: `On Home, ${onHome.length}` },
    { id: "hidden", label: `Hidden, ${awards.length - onHome.length}` },
  ]

  return (
    <>
      <PageHeader crumb="Admin / Content" title="Awards" description="Rankings and honours shown on Home. Each links to the work behind it.">
        <a href="/#awards" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View on site
        </a>
        <button type="button" className={buttonVariants({ size: "sm" })} onClick={() => setEditing({ id: null })}>
          + New award
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
        <section aria-label="Awards" className="flex min-w-0 flex-[3_1_520px] flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter awards">
              {filters.map((f) => (
                <button key={f.id} type="button" className="gb-chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
            <label className="relative flex min-w-[200px] flex-1 items-center sm:max-w-[260px]">
              <span className="sr-only">Search awards</span>
              <MagnifyingGlass size={16} aria-hidden className="pointer-events-none absolute left-3 text-ink-subtle" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search awards" className={cn(control, "min-h-10 py-2 pl-9 text-sm")} />
            </label>
          </div>

          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-subtle">
                  {["Rank", "Award", "Year", "On Home", ""].map((h, i) => (
                    <th key={i} scope="col" className={cn("border-b border-line px-4 py-2.5 font-medium", i === 0 && "w-[90px]")}>
                      {h || <span className="sr-only">Actions</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data === null ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-ink-muted">
                      Loading
                    </td>
                  </tr>
                ) : shown.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-ink-muted">
                      {q ? `Nothing matches “${query.trim()}”.` : filter === "hidden" ? "Every award is on Home." : "No awards yet."}
                    </td>
                  </tr>
                ) : (
                  shown.map((a, i) => (
                    <tr key={a.id} className={cn("border-b border-line last:border-b-0", editing?.id === a.id && "bg-surface-raised")}>
                      <td className={cn("px-4 py-3 text-lg font-medium tabular-nums", a.tone === "RANKING" ? "text-[var(--award)]" : "text-ink")}>{a.rank}</td>
                      <td className="max-w-[360px] px-4 py-3">
                        <button
                          type="button"
                          className="cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-ink hover:underline"
                          aria-pressed={editing?.id === a.id}
                          onClick={() => setEditing({ id: a.id })}
                        >
                          {a.title}
                        </button>
                        <div className="truncate text-[13px] text-ink-muted">{a.event}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-muted">{a.year}</td>
                      <td className="px-4 py-3">
                        <Toggle
                          checked={a.featured}
                          disabled={busy}
                          label={`Show ${a.title} on Home`}
                          onChange={(v) => post({ action: "feature", id: a.id, featured: v }, v ? "On Home now." : "Off Home.")}
                        />
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex justify-end gap-0.5">
                          {canMove && (
                            <>
                              <button type="button" className="gb-iconbtn" disabled={busy || i === 0} aria-label={`Move ${a.title} up`} onClick={() => post({ action: "move", id: a.id, dir: -1 }, "Moved.")}>
                                <ArrowUp size={16} aria-hidden />
                              </button>
                              <button
                                type="button"
                                className="gb-iconbtn"
                                disabled={busy || i === shown.length - 1}
                                aria-label={`Move ${a.title} down`}
                                onClick={() => post({ action: "move", id: a.id, dir: 1 }, "Moved.")}
                              >
                                <ArrowDown size={16} aria-hidden />
                              </button>
                            </>
                          )}
                          <button type="button" className="gb-iconbtn" aria-label={`Edit ${a.title}`} onClick={() => setEditing({ id: a.id })}>
                            <PencilSimple size={16} aria-hidden />
                          </button>
                          <button type="button" className="gb-iconbtn" aria-label={`Delete ${a.title}`} onClick={() => setDeleting(a)}>
                            <Trash size={16} aria-hidden />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p className="m-0 text-xs text-ink-subtle">The arrows set the order on Home.</p>
        </section>

        {editing && !(editing.id && !cur) && (
          <aside className="flex min-w-0 flex-[1_1_340px] flex-col rounded-lg border border-line bg-surface p-5" aria-label="Editor">
            <form key={editing.id ?? "new"} onSubmit={save} className="flex flex-col gap-4" noValidate>
              <h2 className="title m-0">{editing.id === null ? "New award" : "Edit award"}</h2>
              {formError && (
                <p role="alert" className="m-0 text-sm text-danger">
                  {formError}
                </p>
              )}

              <Field id="a-rank" label="Rank or result" hint="Short: #3, 7/9, Best, Scholar. Shown in amber unless set to quiet.">
                <input id="a-rank" name="rank" required maxLength={12} defaultValue={cur?.rank} className={control} />
              </Field>
              <Field id="a-title" label="Title">
                <input id="a-title" name="title" required defaultValue={cur?.title} className={control} />
              </Field>
              <Field id="a-event" label="Event">
                <input id="a-event" name="event" required defaultValue={cur?.event} className={control} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field id="a-year" label="Year">
                  <input id="a-year" name="year" required inputMode="numeric" maxLength={4} defaultValue={cur?.year ?? String(new Date().getFullYear())} className={control} />
                </Field>
                <Field id="a-tone" label="Tone">
                  <select id="a-tone" name="tone" defaultValue={cur?.tone ?? "RANKING"} className={control}>
                    <option value="RANKING">Ranking</option>
                    <option value="QUIET">Quiet (no placing)</option>
                  </select>
                </Field>
              </div>
              <Field id="a-href" label="Links to">
                <select id="a-href" name="href" defaultValue={cur?.href ?? ""} className={control}>
                  {links.map((l) => (
                    <option key={l.href} value={l.href}>
                      {l.label}
                    </option>
                  ))}
                  <option value="">None</option>
                </select>
              </Field>
              <Field id="a-proof" label="Proof" optional hint="Certificate or letter link">
                <input id="a-proof" name="proofUrl" type="url" defaultValue={cur?.proofUrl ?? ""} placeholder="https://" className={control} />
              </Field>
              <label className="flex min-h-11 items-center gap-3 text-sm">
                <input type="checkbox" name="featured" defaultChecked={cur?.featured ?? true} className="m-0 size-5 flex-none accent-[var(--ink)]" />
                Show on Home
              </label>

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
          <DialogDescription className="m-0 text-sm text-ink-muted">It will be removed from Home. This can’t be undone.</DialogDescription>
          <DialogFooter className="gap-2">
            <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => setDeleting(null)}>
              Keep it
            </button>
            <button type="button" disabled={busy} className={buttonVariants({ variant: "destructive", size: "sm" })} onClick={remove}>
              Delete award
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
