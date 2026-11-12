"use client"

import { ArrowDown, ArrowUp, PencilSimple, Trash } from "@phosphor-icons/react"
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react"

import { PageHeader } from "@/components/admin/admin-shell"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Service = { id: string; title: string; body: string; icon: string; points: string[]; showOnHome: boolean }
type Tier = {
  id: string
  name: string
  price: string
  base: string | null
  for: string
  includes: string[]
  badge: string | null
  showOnHome: boolean
  highlight: boolean
}
type Kind = "service" | "tier"
type Editing = { kind: Kind; id: string | null } | null

const ICONS = ["code", "brain", "database", "shield", "globe", "puzzle", "trophy", "crown", "knight"]
const FILTERS = ["All", "Services", "Tiers"] as const
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
        "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-line-strong transition-colors duration-200 disabled:opacity-60",
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

/** Admin › Services (Admin-Services board): the four services and the price tiers on Home and the Services page. */
export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[] | null>(null)
  const [tiers, setTiers] = useState<Tier[]>([])
  const [error, setError] = useState("")
  const [filter, setFilter] = useState(0)
  const [editing, setEditing] = useState<Editing>(null)
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState("")
  const [notice, setNotice] = useState<{ text: string; tone?: "danger" } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  // Switches in the editor are controlled; text fields read from the form on save.
  const [flags, setFlags] = useState({ showOnHome: true, highlight: false })

  const apply = (data: { services: Service[]; tiers: Tier[] }) => {
    setServices(data.services)
    setTiers(data.tiers)
  }

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/services")
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error)
      apply(body.data)
      setError("")
      setEditing((e) => e ?? (body.data.tiers[1] ? { kind: "tier", id: body.data.tiers[1].id } : null))
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Couldn’t load services.")
      setServices([])
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

  const cur =
    editing?.id == null ? null : editing.kind === "service" ? services?.find((s) => s.id === editing.id) ?? null : tiers.find((t) => t.id === editing.id) ?? null

  useEffect(() => {
    setFormError("")
    setConfirmDelete(false)
    setFlags({
      showOnHome: cur ? cur.showOnHome : true,
      highlight: cur && "highlight" in cur ? cur.highlight : false,
    })
    // Reset only when the selection changes, not on every list refresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing?.kind, editing?.id])

  const post = async (payload: Record<string, unknown>, done: string) => {
    setBusy(true)
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || "That didn’t save. Try again.")
      apply(body.data)
      setNotice({ text: done })
      return body.data as { services: Service[]; tiers: Tier[] }
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
    const data = { ...Object.fromEntries(new FormData(e.currentTarget)), ...flags }
    const creating = editing.id === null
    const out = await post(
      { action: creating ? "create" : "update", kind: editing.kind, id: editing.id, data },
      "Saved. Home and the Services page show it now.",
    )
    if (out && creating) {
      const list = editing.kind === "service" ? out.services : out.tiers
      setEditing({ kind: editing.kind, id: list[list.length - 1]?.id ?? null })
    }
  }

  const remove = async () => {
    if (!editing?.id) return
    const out = await post({ action: "delete", kind: editing.kind, id: editing.id }, "Deleted. It’s gone from the site.")
    if (out) setEditing(null)
  }

  const quickHome = (kind: Kind, row: Service | Tier, value: boolean) => {
    const data =
      kind === "service"
        ? { ...(row as Service), points: (row as Service).points, showOnHome: value }
        : { ...(row as Tier), base: (row as Tier).base ?? "", showOnHome: value }
    return post({ action: "update", kind, id: row.id, data }, value ? "Shown on Home." : "Hidden from Home. It stays on the Services page.")
  }

  type Row = { kind: Kind; id: string; name: string; line: string; price: string; home: boolean; row: Service | Tier; first: boolean; last: boolean }
  const rows: Row[] = [
    ...(services ?? []).map((s, i, a) => ({ kind: "service" as const, id: s.id, name: s.title, line: s.body, price: "", home: s.showOnHome, row: s, first: i === 0, last: i === a.length - 1 })),
    ...tiers.map((t, i, a) => ({
      kind: "tier" as const,
      id: t.id,
      name: t.name,
      line: t.base ? `${t.base} plus ${t.includes.join(", ").toLowerCase()}` : t.includes.join(", "),
      price: t.price,
      home: t.showOnHome,
      row: t,
      first: i === 0,
      last: i === a.length - 1,
    })),
  ].filter((r) => filter === 0 || (filter === 1 ? r.kind === "service" : r.kind === "tier"))

  const tier = editing?.kind === "tier" ? (cur as Tier | null) : null
  const svc = editing?.kind === "service" ? (cur as Service | null) : null
  const formKey = `${editing?.kind}-${editing?.id ?? "new"}`

  return (
    <>
      <PageHeader
        crumb="Admin / Content"
        title="Services and pricing"
        description="The four services and three price tiers on Home and the Services page. Prices are typical, per project."
      >
        <a href="/services" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View on site
        </a>
        <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => setEditing({ kind: "service", id: null })}>
          + New service
        </button>
        <button type="button" className={buttonVariants({ size: "sm" })} onClick={() => setEditing({ kind: "tier", id: null })}>
          + New tier
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
        <section aria-labelledby="svc-list" className="flex min-w-0 flex-[3_1_520px] flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="svc-list" className="title m-0">
              On the site
            </h2>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter">
              {FILTERS.map((label, i) => (
                <button key={label} type="button" className="gb-chip" aria-pressed={filter === i} onClick={() => setFilter(i)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-subtle">
                  {["Name", "Type", "Price", "On Home", ""].map((h, i) => (
                    <th key={i} scope="col" className="border-b border-line px-4 py-2.5 font-medium">
                      {h || <span className="sr-only">Actions</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services === null ? (
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
                  rows.map((r) => (
                    <tr key={r.id} className={cn("border-b border-line last:border-b-0", editing?.id === r.id && "bg-surface-raised")}>
                      <td className="max-w-[320px] px-4 py-3">
                        <button
                          type="button"
                          className="cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-ink hover:underline"
                          aria-pressed={editing?.id === r.id}
                          onClick={() => setEditing({ kind: r.kind, id: r.id })}
                        >
                          {r.name}
                        </button>
                        <div className="truncate text-[13px] text-ink-muted">{r.line}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-subtle">{r.kind === "service" ? "Service" : "Tier"}</td>
                      <td className="px-4 py-3 font-mono text-xs tabular-nums text-ink-subtle">{r.price}</td>
                      <td className="px-4 py-3">
                        <Toggle checked={r.home} disabled={busy} label={`Show ${r.name} on Home`} onChange={(v) => quickHome(r.kind, r.row, v)} />
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex justify-end gap-0.5">
                          <button type="button" className="gb-iconbtn" disabled={busy || r.first} aria-label={`Move ${r.name} up`} onClick={() => post({ action: "move", kind: r.kind, id: r.id, dir: -1 }, "Moved.")}>
                            <ArrowUp size={16} aria-hidden />
                          </button>
                          <button type="button" className="gb-iconbtn" disabled={busy || r.last} aria-label={`Move ${r.name} down`} onClick={() => post({ action: "move", kind: r.kind, id: r.id, dir: 1 }, "Moved.")}>
                            <ArrowDown size={16} aria-hidden />
                          </button>
                          <button type="button" className="gb-iconbtn" aria-label={`Edit ${r.name}`} onClick={() => setEditing({ kind: r.kind, id: r.id })}>
                            <PencilSimple size={16} aria-hidden />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p className="m-0 text-xs text-ink-subtle">The arrows set the order on the site. Hidden from Home still shows on the Services page.</p>
        </section>

        <aside className="flex min-w-0 flex-[1_1_340px] flex-col rounded-lg border border-line bg-surface p-5" aria-label="Editor">
          {!editing || (editing.id && !cur) ? (
            <p className="m-0 text-sm text-ink-muted">Pick a service or tier to edit it.</p>
          ) : (
            <form key={formKey} onSubmit={save} className="flex flex-col gap-4" noValidate>
              <h2 className="title m-0">
                {editing.id === null ? (editing.kind === "tier" ? "New tier" : "New service") : editing.kind === "tier" ? "Edit tier" : "Edit service"}
              </h2>
              {formError && (
                <p role="alert" className="m-0 text-sm text-danger">
                  {formError}
                </p>
              )}

              {editing.kind === "tier" ? (
                <>
                  <Field id="t-name" label="Name">
                    <input id="t-name" name="name" required defaultValue={tier?.name} className={control} />
                  </Field>
                  <Field id="t-price" label="Typical price" hint="US dollars, per project">
                    <input id="t-price" name="price" required defaultValue={tier?.price} placeholder="$900" className={control} />
                  </Field>
                  <Field id="t-base" label="Builds on">
                    <select id="t-base" name="base" defaultValue={tier?.base ?? "None"} className={control}>
                      <option>None</option>
                      {tiers
                        .filter((t) => t.id !== tier?.id)
                        .map((t) => (
                          <option key={t.id}>{t.name}</option>
                        ))}
                    </select>
                  </Field>
                  <Field id="t-for" label="Who it is for">
                    <input id="t-for" name="for" required defaultValue={tier?.for} className={control} />
                  </Field>
                  <Field id="t-inc" label="Includes" hint="One item per line">
                    <textarea id="t-inc" name="includes" rows={4} defaultValue={tier?.includes.join("\n")} className={cn(control, "resize-y")} />
                  </Field>
                  <Field id="t-badge" label="Badge" hint="Optional, for example Most chosen. Leave empty unless it is true.">
                    <input id="t-badge" name="badge" defaultValue={tier?.badge ?? ""} className={control} />
                  </Field>
                </>
              ) : (
                <>
                  <Field id="s-title" label="Name">
                    <input id="s-title" name="title" required defaultValue={svc?.title} className={control} />
                  </Field>
                  <Field id="s-body" label="Description">
                    <textarea id="s-body" name="body" required rows={3} defaultValue={svc?.body} className={cn(control, "resize-y")} />
                  </Field>
                  <Field id="s-points" label="Tags" hint="One per line, for example Next.js">
                    <textarea id="s-points" name="points" rows={4} defaultValue={svc?.points.join("\n")} className={cn(control, "resize-y")} />
                  </Field>
                  <Field id="s-icon" label="Icon">
                    <select id="s-icon" name="icon" defaultValue={svc?.icon ?? "code"} className={control}>
                      {ICONS.map((i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </Field>
                </>
              )}

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm">Show on Home</span>
                <Toggle checked={flags.showOnHome} label="Show on Home" onChange={(v) => setFlags((f) => ({ ...f, showOnHome: v }))} />
              </div>
              {editing.kind === "tier" && (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm">Highlight this tier</span>
                  <Toggle checked={flags.highlight} label="Highlight this tier" onChange={(v) => setFlags((f) => ({ ...f, highlight: v }))} />
                </div>
              )}

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
