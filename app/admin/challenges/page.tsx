"use client"

import { ArrowDown, ArrowUp, PencilSimple, Trash } from "@phosphor-icons/react"
import { useCallback, useEffect, useState, type FormEvent } from "react"

import { PageHeader } from "@/components/admin/admin-shell"
import { Field, Toggle, control } from "@/components/admin/fields"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Challenge = {
  id: string
  platform: string
  label: string
  handle: string
  invite: string
  cta: string
  href: string
  icon: string
  live: boolean
  featured: boolean
}
type Platform = { value: string; label: string; group: "chess" | "coding"; live: boolean }
type Data = { challenges: Challenge[]; platforms: Platform[]; icons: { value: string; label: string }[] }
type Editing = { id: string | null } | null

/** Admin › Challenges (Admin-Challenges board): the platforms on the Chess page and in Off the clock on Home. */
export default function AdminChallengesPage() {
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<"all" | "chess" | "coding">("all")
  const [editing, setEditing] = useState<Editing>(null)
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState("")
  const [notice, setNotice] = useState<{ text: string; tone?: "danger" } | null>(null)
  const [deleting, setDeleting] = useState<Challenge | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/challenges")
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error)
      setData(body.data)
      setError("")
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Couldn’t load challenges.")
      setData({ challenges: [], platforms: [], icons: [] })
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

  const items = data?.challenges ?? []
  const platforms = data?.platforms ?? []
  const icons = data?.icons ?? []
  const platformOf = (v: string) => platforms.find((p) => p.value === v)
  const groupOf = (c: Challenge) => platformOf(c.platform)?.group ?? "coding"
  const cur = editing?.id ? items.find((c) => c.id === editing.id) ?? null : null
  const shown = items.filter((c) => filter === "all" || groupOf(c) === filter)

  const liveText = (c: Challenge) => (!platformOf(c.platform)?.live ? "None" : c.live ? "Public API" : "Off")

  const post = async (payload: Record<string, unknown>, done: string) => {
    setBusy(true)
    try {
      const res = await fetch("/api/admin/challenges", {
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
    const out = await post({ action: creating ? "create" : "update", id: editing.id, data: form }, "Saved. The Chess page shows it now.")
    if (out && creating) {
      const made = [...out.challenges].reverse().find((c) => c.label === String(form.label).trim())
      setEditing({ id: made?.id ?? null })
    }
  }

  const remove = async () => {
    if (!deleting) return
    const out = await post({ action: "delete", id: deleting.id }, `Deleted ${deleting.label}.`)
    if (out) {
      if (editing?.id === deleting.id) setEditing(null)
      setDeleting(null)
    }
  }

  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: `All, ${items.length}` },
    { id: "chess", label: "Chess" },
    { id: "coding", label: "Coding" },
  ]

  return (
    <>
      <PageHeader crumb="Admin / Content" title="Challenges" description="The platforms in the Off the clock section and on the Chess page. Live ratings load from public APIs where they exist.">
        <a href="/chess" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View on site
        </a>
        <button type="button" className={buttonVariants({ size: "sm" })} onClick={() => setEditing({ id: null })}>
          + New platform
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
        <section aria-label="Challenges" className="flex min-w-0 flex-[3_1_520px] flex-col gap-3">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter platforms">
            {filters.map((f) => (
              <button key={f.id} type="button" className="gb-chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[580px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-subtle">
                  {["Platform", "Handle", "Live rating", "On Home", ""].map((h, i) => (
                    <th key={i} scope="col" className="border-b border-line px-4 py-2.5 font-medium">
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
                      No platforms here yet.
                    </td>
                  </tr>
                ) : (
                  shown.map((c, i) => (
                    <tr key={c.id} className={cn("border-b border-line last:border-b-0", editing?.id === c.id && "bg-surface-raised")}>
                      <td className="max-w-[320px] px-4 py-3">
                        <button
                          type="button"
                          className="cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-ink hover:underline"
                          aria-pressed={editing?.id === c.id}
                          onClick={() => setEditing({ id: c.id })}
                        >
                          {c.label}
                        </button>
                        <div className="truncate text-[13px] text-ink-muted">{c.invite}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-muted" translate="no">
                        {c.handle}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-ink-muted">{liveText(c)}</td>
                      <td className="px-4 py-3">
                        <Toggle checked={c.featured} disabled={busy} label={`Show ${c.label} on Home`} onChange={(v) => post({ action: "feature", id: c.id, featured: v }, v ? "On Home now." : "Off Home. The Chess page still shows it.")} />
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex justify-end gap-0.5">
                          {filter === "all" && (
                            <>
                              <button type="button" className="gb-iconbtn" disabled={busy || i === 0} aria-label={`Move ${c.label} up`} onClick={() => post({ action: "move", id: c.id, dir: -1 }, "Moved.")}>
                                <ArrowUp size={16} aria-hidden />
                              </button>
                              <button type="button" className="gb-iconbtn" disabled={busy || i === shown.length - 1} aria-label={`Move ${c.label} down`} onClick={() => post({ action: "move", id: c.id, dir: 1 }, "Moved.")}>
                                <ArrowDown size={16} aria-hidden />
                              </button>
                            </>
                          )}
                          <button type="button" className="gb-iconbtn" aria-label={`Edit ${c.label}`} onClick={() => setEditing({ id: c.id })}>
                            <PencilSimple size={16} aria-hidden />
                          </button>
                          <button type="button" className="gb-iconbtn" aria-label={`Delete ${c.label}`} onClick={() => setDeleting(c)}>
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
          <p className="m-0 text-xs text-ink-subtle">The arrows set the order on the site. The Chess page shows every platform; Home shows the ones switched on.</p>
        </section>

        {editing && !(editing.id && !cur) && (
          <aside className="flex min-w-0 flex-[1_1_340px] flex-col rounded-lg border border-line bg-surface p-5" aria-label="Editor">
            <form key={editing.id ?? "new"} onSubmit={save} className="flex flex-col gap-4" noValidate>
              <h2 className="title m-0">{editing.id === null ? "New platform" : "Edit platform"}</h2>
              {formError && (
                <p role="alert" className="m-0 text-sm text-danger">
                  {formError}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Field id="h-platform" label="Platform" hint="Picks the live rating">
                  <select id="h-platform" name="platform" defaultValue={cur?.platform ?? "other"} className={control}>
                    {platforms.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="h-label" label="Name on the card">
                  <input id="h-label" name="label" required defaultValue={cur?.label} className={control} />
                </Field>
              </div>
              <Field id="h-handle" label="Handle">
                <input id="h-handle" name="handle" required defaultValue={cur?.handle} className={cn(control, "font-mono text-sm")} />
              </Field>
              <Field id="h-invite" label="Invitation">
                <input id="h-invite" name="invite" required defaultValue={cur?.invite} placeholder="Race me on a kata." className={control} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field id="h-cta" label="Button label">
                  <input id="h-cta" name="cta" required defaultValue={cur?.cta ?? "See my profile"} className={control} />
                </Field>
                <Field id="h-icon" label="Icon">
                  <select id="h-icon" name="icon" defaultValue={cur?.icon ?? "code"} className={control}>
                    {icons.map((i) => (
                      <option key={i.value} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field id="h-href" label="Link">
                <input id="h-href" name="href" type="url" required defaultValue={cur?.href} placeholder="https://" className={control} />
              </Field>
              <label className="flex min-h-11 items-center gap-3 text-sm">
                <input type="checkbox" name="live" defaultChecked={cur?.live ?? true} className="m-0 size-5 flex-none accent-[var(--ink)]" />
                Load live rating
                <span className="text-xs text-ink-subtle">Lichess, Chess.com and Codewars share one</span>
              </label>
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
          <DialogTitle className="title m-0">Delete {deleting?.label}?</DialogTitle>
          <DialogDescription className="m-0 text-sm text-ink-muted">It will be removed from the Chess page and Home. This can’t be undone.</DialogDescription>
          <DialogFooter className="gap-2">
            <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => setDeleting(null)}>
              Keep it
            </button>
            <button type="button" disabled={busy} className={buttonVariants({ variant: "destructive", size: "sm" })} onClick={remove}>
              Delete platform
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
