"use client"

import { ArrowDown, ArrowUp, PencilSimple, Trash } from "@phosphor-icons/react"
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react"

import { PageHeader } from "@/components/admin/admin-shell"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Level = "SHIPPED" | "TRAINED" | "LEARNING"
type Evidence = { label: string; href: string }
type Skill = { id: string; name: string; category: string; level: Level; how: string | null; evidence: unknown }
type Category = { value: string; label: string }
type Data = { skills: Skill[]; categories: Category[] }
type Editing = { id: string | null } | null

const LEVELS: { value: Level; label: string; meaning: string; dot: string }[] = [
  { value: "SHIPPED", label: "Shipped", meaning: "used in delivered work", dot: "shipped" },
  { value: "TRAINED", label: "Trained", meaning: "finished a certified course", dot: "trained" },
  { value: "LEARNING", label: "Learning", meaning: "in progress", dot: "learning" },
]
const levelOf = (l: Level) => LEVELS.find((x) => x.value === l) ?? LEVELS[0]

const control =
  "box-border min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus)]"

const evidenceOf = (v: unknown): Evidence[] =>
  Array.isArray(v) ? v.filter((e): e is Evidence => !!e && typeof e.label === "string" && typeof e.href === "string") : []

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

/** Admin › Skills: the skills on /skills. Levels are Shipped, Trained or Learning, and every skill links to its evidence. */
export default function AdminSkillsPage() {
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("all")
  const [editing, setEditing] = useState<Editing>(null)
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState("")
  const [notice, setNotice] = useState<{ text: string; tone?: "danger" } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/skills")
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error)
      setData(body.data)
      setError("")
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Couldn’t load skills.")
      setData({ skills: [], categories: [] })
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

  useEffect(() => {
    setFormError("")
    setConfirmDelete(false)
  }, [editing?.id])

  const skills = data?.skills ?? []
  const categories = data?.categories ?? []
  const onSite = (s: Skill) => categories.some((c) => c.value === s.category) && evidenceOf(s.evidence).length > 0
  const hidden = skills.filter((s) => !onSite(s))
  const cur = editing?.id ? skills.find((s) => s.id === editing.id) ?? null : null

  const post = async (payload: Record<string, unknown>, done: string) => {
    setBusy(true)
    try {
      const res = await fetch("/api/admin/skills", {
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
    const out = await post({ action: creating ? "create" : "update", id: editing.id, data: form }, "Saved. The Skills page shows it now.")
    if (out && creating) {
      const made = out.skills.find((s) => s.name === String(form.name).trim())
      setEditing({ id: made?.id ?? null })
    }
  }

  const remove = async () => {
    if (!editing?.id) return
    const out = await post({ action: "delete", id: editing.id }, "Deleted. It’s gone from the Skills page.")
    if (out) setEditing(null)
  }

  const shown = (filter === "all" ? categories : filter === "hidden" ? [] : categories.filter((c) => c.value === filter)).map((c) => ({
    ...c,
    rows: skills.filter((s) => s.category === c.value && onSite(s)),
  }))
  const showHidden = (filter === "all" || filter === "hidden") && hidden.length > 0

  const row = (s: Skill, i: number, all: Skill[], movable: boolean) => {
    const lv = levelOf(s.level)
    const ev = evidenceOf(s.evidence)
    return (
      <tr key={s.id} className={cn("border-b border-line last:border-b-0", editing?.id === s.id && "bg-surface-raised")}>
        <td className="max-w-[320px] px-4 py-3">
          <button
            type="button"
            className="cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-ink hover:underline"
            aria-pressed={editing?.id === s.id}
            onClick={() => setEditing({ id: s.id })}
          >
            {s.name}
          </button>
          <div className="truncate text-[13px] text-ink-muted">{s.how || (movable ? "" : "Add how you used it, and its evidence, to show it.")}</div>
        </td>
        <td className="px-4 py-3">
          <span className="flex items-center gap-2 font-mono text-xs text-ink-subtle">
            <span className="gb-level-dot" data-level={lv.dot} aria-hidden />
            {lv.label}
          </span>
        </td>
        <td className="max-w-[260px] truncate px-4 py-3 text-[13px] text-ink-muted">
          {ev.length ? ev.map((e) => e.label).join(", ") : <span className="text-danger">No evidence</span>}
        </td>
        <td className="px-2 py-3">
          <div className="flex justify-end gap-0.5">
            {movable && (
              <>
                <button type="button" className="gb-iconbtn" disabled={busy || i === 0} aria-label={`Move ${s.name} up`} onClick={() => post({ action: "move", id: s.id, dir: -1 }, "Moved.")}>
                  <ArrowUp size={16} aria-hidden />
                </button>
                <button type="button" className="gb-iconbtn" disabled={busy || i === all.length - 1} aria-label={`Move ${s.name} down`} onClick={() => post({ action: "move", id: s.id, dir: 1 }, "Moved.")}>
                  <ArrowDown size={16} aria-hidden />
                </button>
              </>
            )}
            <button type="button" className="gb-iconbtn" aria-label={`Edit ${s.name}`} onClick={() => setEditing({ id: s.id })}>
              <PencilSimple size={16} aria-hidden />
            </button>
          </div>
        </td>
      </tr>
    )
  }

  const head = (
    <thead>
      <tr className="text-left text-xs text-ink-subtle">
        {["Skill", "Level", "Evidence", ""].map((h, i) => (
          <th key={i} scope="col" className="border-b border-line px-4 py-2.5 font-medium">
            {h || <span className="sr-only">Actions</span>}
          </th>
        ))}
      </tr>
    </thead>
  )

  const curCategory = cur && categories.some((c) => c.value === cur.category) ? cur.category : categories[0]?.value
  const formKey = editing?.id ?? "new"

  return (
    <>
      <PageHeader crumb="Admin / Content" title="Skills" description="The skills on the Skills page. Each one has a level and links to the work or course that proves it.">
        <a href="/skills" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View on site
        </a>
        <button type="button" className={buttonVariants({ size: "sm" })} onClick={() => setEditing({ id: null })}>
          + New skill
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
        <section aria-label="Skills" className="flex min-w-0 flex-[3_1_520px] flex-col gap-3">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by group">
            <button type="button" className="gb-chip" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
              All, {skills.length}
            </button>
            {categories.map((c) => (
              <button key={c.value} type="button" className="gb-chip" aria-pressed={filter === c.value} onClick={() => setFilter(c.value)}>
                {c.label}
              </button>
            ))}
            {hidden.length > 0 && (
              <button type="button" className="gb-chip" aria-pressed={filter === "hidden"} onClick={() => setFilter("hidden")}>
                Not on the site, {hidden.length}
              </button>
            )}
          </div>

          {data === null ? (
            <p className="m-0 rounded-lg border border-line px-4 py-6 text-center text-sm text-ink-muted">Loading</p>
          ) : (
            <>
              {shown.map((g) => (
                <div key={g.value} className="flex flex-col gap-2">
                  <h2 className="m-0 flex items-baseline gap-2 text-sm font-medium">
                    {g.label}
                    <span className="font-mono text-xs tabular-nums text-ink-subtle">{g.rows.length}</span>
                  </h2>
                  <div className="overflow-x-auto rounded-lg border border-line">
                    <table className="w-full border-collapse text-sm">
                      {head}
                      <tbody>
                        {g.rows.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-4 py-4 text-ink-muted">
                              Nothing here, so the group stays off the page.
                            </td>
                          </tr>
                        ) : (
                          g.rows.map((s, i, all) => row(s, i, all, true))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {showHidden && (
                <div className="flex flex-col gap-2">
                  <h2 className="m-0 flex items-baseline gap-2 text-sm font-medium">
                    Not on the site
                    <span className="font-mono text-xs tabular-nums text-ink-subtle">{hidden.length}</span>
                  </h2>
                  <p className="m-0 text-xs text-ink-subtle">From the old skills list. Give one a group and evidence to show it, or delete it.</p>
                  <div className="overflow-x-auto rounded-lg border border-line">
                    <table className="w-full border-collapse text-sm">
                      {head}
                      <tbody>{hidden.map((s, i, all) => row(s, i, all, false))}</tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
          <p className="m-0 text-xs text-ink-subtle">The arrows set the order within a group. The group titles and notes come from the page copy.</p>
        </section>

        <aside className="flex min-w-0 flex-[1_1_340px] flex-col rounded-lg border border-line bg-surface p-5" aria-label="Editor">
          {!editing || (editing.id && !cur) ? (
            <p className="m-0 text-sm text-ink-muted">Pick a skill to edit it.</p>
          ) : (
            <form key={formKey} onSubmit={save} className="flex flex-col gap-4" noValidate>
              <h2 className="title m-0">{editing.id === null ? "New skill" : "Edit skill"}</h2>
              {formError && (
                <p role="alert" className="m-0 text-sm text-danger">
                  {formError}
                </p>
              )}

              <Field id="k-name" label="Name">
                <input id="k-name" name="name" required defaultValue={cur?.name} placeholder="Python and Django" className={control} />
              </Field>
              <Field id="k-how" label="How I used it" hint="One short line, for example Django 5, Django REST Framework">
                <input id="k-how" name="how" defaultValue={cur?.how ?? ""} className={control} />
              </Field>
              <Field id="k-cat" label="Group">
                <select id="k-cat" name="category" defaultValue={curCategory} className={control}>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>

              <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
                <legend className="mb-1.5 p-0 text-sm font-medium">Level</legend>
                {LEVELS.map((l) => (
                  <label key={l.value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-line px-3 has-[:checked]:border-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--focus)]">
                    <input type="radio" name="level" value={l.value} defaultChecked={(cur?.level ?? "SHIPPED") === l.value} className="sr-only" />
                    <span className="gb-level-dot" data-level={l.dot} aria-hidden />
                    <span className="text-sm">
                      {l.label}
                      <span className="text-ink-muted">: {l.meaning}</span>
                    </span>
                  </label>
                ))}
              </fieldset>

              <Field id="k-ev" label="Evidence" hint="One per line: label, a bar, then the link. For example Wamumbi | /work/wamumbi-charity-platform">
                <textarea
                  id="k-ev"
                  name="evidence"
                  rows={4}
                  required
                  defaultValue={evidenceOf(cur?.evidence).map((e) => `${e.label} | ${e.href}`).join("\n")}
                  className={cn(control, "resize-y font-mono text-sm")}
                />
              </Field>

              <div className="-mx-5 -mb-5 mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-line px-5 py-4">
                {editing.id && !confirmDelete ? (
                  <button type="button" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5")} onClick={() => setConfirmDelete(true)}>
                    <Trash size={16} aria-hidden />
                    Delete
                  </button>
                ) : editing.id && confirmDelete ? (
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-ink-muted">Remove it from the site?</span>
                    <button type="button" disabled={busy} className={buttonVariants({ variant: "destructive", size: "sm" })} onClick={remove}>
                      Delete
                    </button>
                    <button type="button" className={buttonVariants({ variant: "ghost", size: "sm" })} onClick={() => setConfirmDelete(false)}>
                      Keep
                    </button>
                  </span>
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
          )}
        </aside>
      </div>
    </>
  )
}
