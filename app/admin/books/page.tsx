"use client"

import { ArrowDown, ArrowUp, MagnifyingGlass, PencilSimple, Trash } from "@phosphor-icons/react"
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react"

import { PageHeader } from "@/components/admin/admin-shell"
import { Field, Toggle, control } from "@/components/admin/fields"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Shelf = "READING" | "UP_NEXT" | "FINISHED" | "WANT"
type Book = {
  id: string
  title: string
  author: string | null
  shelf: Shelf
  genre: string | null
  position: string | null
  note: string | null
  progress: number | null
  featured: boolean
}
type Data = { books: Book[]; shelves: { value: Shelf; label: string }[] }
type Editing = { id: string | null } | null

const ORDER: Shelf[] = ["READING", "UP_NEXT", "FINISHED", "WANT"]

/** Admin › Books (Admin-Books board): the shelf on the Reading page, and Reading now on Home. */
export default function AdminBooksPage() {
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<"all" | Shelf>("all")
  const [query, setQuery] = useState("")
  const [editing, setEditing] = useState<Editing>(null)
  const [shelfDraft, setShelfDraft] = useState<Shelf>("READING")
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState("")
  const [notice, setNotice] = useState<{ text: string; tone?: "danger" } | null>(null)
  const [deleting, setDeleting] = useState<Book | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/books")
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error)
      setData(body.data)
      setError("")
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Couldn’t load books.")
      setData({ books: [], shelves: [] })
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

  const books = useMemo(() => [...(data?.books ?? [])].sort((a, b) => ORDER.indexOf(a.shelf) - ORDER.indexOf(b.shelf)), [data])
  const shelves = data?.shelves ?? []
  const labelOf = (s: Shelf) => shelves.find((x) => x.value === s)?.label ?? s
  const genres = useMemo(() => Array.from(new Set(books.map((b) => b.genre).filter((g): g is string => !!g))).sort(), [books])
  const cur = editing?.id ? books.find((b) => b.id === editing.id) ?? null : null

  useEffect(() => {
    setFormError("")
    setShelfDraft(cur?.shelf ?? (filter !== "all" ? filter : "READING"))
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset when a different book opens
  }, [editing?.id])

  const q = query.trim().toLowerCase()
  const shown = books.filter((b) => (filter === "all" || b.shelf === filter) && (!q || `${b.title} ${b.author ?? ""} ${b.genre ?? ""}`.toLowerCase().includes(q)))
  const canMove = !q

  const post = async (payload: Record<string, unknown>, done: string) => {
    setBusy(true)
    try {
      const res = await fetch("/api/admin/books", {
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
    const out = await post({ action: creating ? "create" : "update", id: editing.id, data: form }, "Saved. The Reading page shows it now.")
    if (out && creating) {
      const made = out.books.find((b) => b.title === String(form.title).trim() && b.shelf === form.shelf)
      setEditing({ id: made?.id ?? null })
    }
  }

  const remove = async () => {
    if (!deleting) return
    const out = await post({ action: "delete", id: deleting.id }, `Deleted “${deleting.title}”.`)
    if (out) {
      if (editing?.id === deleting.id) setEditing(null)
      setDeleting(null)
    }
  }

  const count = (s: Shelf) => books.filter((b) => b.shelf === s).length
  const filters: { id: typeof filter; label: string }[] = [{ id: "all", label: `All, ${books.length}` }, ...shelves.map((s) => ({ id: s.value, label: `${s.label}, ${count(s.value)}` }))]

  return (
    <>
      <PageHeader crumb="Admin / Content" title="Books" description="The reading shelf: reading now, up next, finished and want to read. Genre groups the want to read list.">
        <a href="/reading" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View on site
        </a>
        <button type="button" className={buttonVariants({ size: "sm" })} onClick={() => setEditing({ id: null })}>
          + New book
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
        <section aria-label="Books" className="flex min-w-0 flex-[3_1_560px] flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by shelf">
              {filters.map((f) => (
                <button key={f.id} type="button" className="gb-chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
            <label className="relative flex min-w-[200px] flex-1 items-center sm:max-w-[260px]">
              <span className="sr-only">Search books</span>
              <MagnifyingGlass size={16} aria-hidden className="pointer-events-none absolute left-3 text-ink-subtle" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search books" className={cn(control, "min-h-10 py-2 pl-9 text-sm")} />
            </label>
          </div>

          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-subtle">
                  {["Book", "Where I am", "On Home", ""].map((h, i) => (
                    <th key={i} scope="col" className="border-b border-line px-4 py-2.5 font-medium">
                      {h || <span className="sr-only">Actions</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data === null ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-ink-muted">
                      Loading
                    </td>
                  </tr>
                ) : shown.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-ink-muted">
                      {q ? `Nothing matches “${query.trim()}”.` : "No books on this shelf yet."}
                    </td>
                  </tr>
                ) : (
                  shown.map((b, i) => {
                    const prev = shown[i - 1]
                    const next = shown[i + 1]
                    const groupStart = filter === "all" && !q && prev?.shelf !== b.shelf
                    const where = b.shelf === "READING" ? [b.progress != null ? `${b.progress}%` : "", b.position].filter(Boolean).join(", ") : b.shelf === "WANT" ? b.genre : b.note
                    return [
                      groupStart && (
                        <tr key={`${b.shelf}-h`} className="bg-surface">
                          <th colSpan={4} scope="colgroup" className="border-b border-line px-4 py-2 text-left text-xs font-medium text-ink-muted">
                            {labelOf(b.shelf)}
                          </th>
                        </tr>
                      ),
                      <tr key={b.id} className={cn("border-b border-line last:border-b-0", editing?.id === b.id && "bg-surface-raised")}>
                        <td className="max-w-[340px] px-4 py-3">
                          <button
                            type="button"
                            className="cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-ink hover:underline"
                            aria-pressed={editing?.id === b.id}
                            onClick={() => setEditing({ id: b.id })}
                          >
                            {b.title}
                          </button>
                          <div className="truncate text-[13px] text-ink-muted">{b.author}</div>
                        </td>
                        <td className="max-w-[240px] truncate px-4 py-3 text-[13px] text-ink-muted">{where}</td>
                        <td className="px-4 py-3">
                          {b.shelf === "READING" ? (
                            <Toggle checked={b.featured} disabled={busy} label={`Show ${b.title} on Home`} onChange={(v) => post({ action: "feature", id: b.id, featured: v }, v ? "On Home now." : "Off Home.")} />
                          ) : (
                            <span className="text-xs text-ink-subtle">Reading now only</span>
                          )}
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex justify-end gap-0.5">
                            {canMove && (
                              <>
                                <button type="button" className="gb-iconbtn" disabled={busy || prev?.shelf !== b.shelf} aria-label={`Move ${b.title} up`} onClick={() => post({ action: "move", id: b.id, dir: -1 }, "Moved.")}>
                                  <ArrowUp size={16} aria-hidden />
                                </button>
                                <button type="button" className="gb-iconbtn" disabled={busy || next?.shelf !== b.shelf} aria-label={`Move ${b.title} down`} onClick={() => post({ action: "move", id: b.id, dir: 1 }, "Moved.")}>
                                  <ArrowDown size={16} aria-hidden />
                                </button>
                              </>
                            )}
                            <button type="button" className="gb-iconbtn" aria-label={`Edit ${b.title}`} onClick={() => setEditing({ id: b.id })}>
                              <PencilSimple size={16} aria-hidden />
                            </button>
                            <button type="button" className="gb-iconbtn" aria-label={`Delete ${b.title}`} onClick={() => setDeleting(b)}>
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
          <p className="m-0 text-xs text-ink-subtle">Reading now shows on Home, in this order. New books go to the top of their shelf.</p>
        </section>

        {editing && !(editing.id && !cur) && (
          <aside className="flex min-w-0 flex-[1_1_340px] flex-col rounded-lg border border-line bg-surface p-5" aria-label="Editor">
            <form key={editing.id ?? "new"} onSubmit={save} className="flex flex-col gap-4" noValidate>
              <h2 className="title m-0">{editing.id === null ? "New book" : "Edit book"}</h2>
              {formError && (
                <p role="alert" className="m-0 text-sm text-danger">
                  {formError}
                </p>
              )}

              <Field id="b-title" label="Title">
                <input id="b-title" name="title" required defaultValue={cur?.title} className={control} />
              </Field>
              <Field id="b-author" label="Author" optional>
                <input id="b-author" name="author" defaultValue={cur?.author ?? ""} className={control} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field id="b-shelf" label="Shelf">
                  <select id="b-shelf" name="shelf" value={shelfDraft} onChange={(e) => setShelfDraft(e.target.value as Shelf)} className={control}>
                    {shelves.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="b-genre" label="Genre" optional>
                  <input id="b-genre" name="genre" list="b-genres" defaultValue={cur?.genre ?? ""} className={control} />
                  <datalist id="b-genres">
                    {genres.map((g) => (
                      <option key={g} value={g} />
                    ))}
                  </datalist>
                </Field>
              </div>
              {shelfDraft === "READING" && (
                <div className="grid grid-cols-[minmax(0,1fr)_128px] gap-3">
                  <Field id="b-pos" label="Where I am" optional>
                    <input id="b-pos" name="position" defaultValue={cur?.position ?? ""} placeholder="Chapter 10, batch processing" className={control} />
                  </Field>
                  <Field id="b-pct" label="Progress" optional hint="Percent">
                    <input id="b-pct" name="progress" inputMode="numeric" defaultValue={cur?.progress ?? ""} className={control} />
                  </Field>
                </div>
              )}
              {(shelfDraft === "READING" || shelfDraft === "UP_NEXT") && (
                <Field id="b-note" label="Note" optional hint={shelfDraft === "READING" ? "Shown after where you are, on the Reading page only" : "Why it’s next, like After Designing Data‑Intensive Applications"}>
                  <textarea id="b-note" name="note" rows={2} defaultValue={cur?.note ?? ""} className={cn(control, "resize-y")} />
                </Field>
              )}
              {shelfDraft === "READING" && (
                <label className="flex min-h-11 items-center gap-3 text-sm">
                  <input type="checkbox" name="featured" defaultChecked={cur?.featured ?? false} className="m-0 size-5 flex-none accent-[var(--ink)]" />
                  Show on Home
                </label>
              )}

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
          <DialogDescription className="m-0 text-sm text-ink-muted">It will be removed from the Reading page{deleting?.featured ? " and Home" : ""}. This can’t be undone.</DialogDescription>
          <DialogFooter className="gap-2">
            <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => setDeleting(null)}>
              Keep it
            </button>
            <button type="button" disabled={busy} className={buttonVariants({ variant: "destructive", size: "sm" })} onClick={remove}>
              Delete book
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
