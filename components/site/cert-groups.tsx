"use client"

import { useState } from "react"

import type { CertGroup } from "@/lib/content/certificates"

/** "What each one taught": track filters, then the certificate cards (Gambit CertCard) by group. */
export function CertGroups({ groups }: { groups: CertGroup[] }) {
  const [active, setActive] = useState("all")
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const filters = [{ id: "all", label: `All, ${total}` }, ...groups.map((g) => ({ id: g.id, label: g.name }))]

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="heading m-0">What each one taught.</h2>
        <div role="group" aria-label="Filter by track" className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button key={f.id} type="button" className="gb-chip" aria-pressed={active === f.id} onClick={() => setActive(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {groups
        .filter((g) => active === "all" || active === g.id)
        .map((g) => (
          <section key={g.id} aria-labelledby={`cg-${g.id}`} className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4">
              <h3 id={`cg-${g.id}`} className="title m-0">
                {g.name}
              </h3>
              <span className="font-mono text-xs text-ink-subtle">
                {g.items.length} {g.items.length === 1 ? "certificate" : "certificates"}
              </span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
              {g.items.map((c) => (
                <article key={c.title} className="grid grid-cols-[40px_1fr] items-start gap-x-4 gap-y-3 rounded-lg border border-line bg-surface p-5">
                  <div aria-hidden className="grid size-10 place-items-center rounded-md border border-line bg-surface-raised font-mono text-xs font-semibold text-ink-muted">
                    {c.mark}
                  </div>
                  <div>
                    <div className="text-xs text-ink-muted">{c.issuer}</div>
                    <h4 className="m-0 text-sm font-semibold leading-5">{c.title}</h4>
                  </div>
                  {c.note && <div className="col-start-2 font-mono text-xs text-ink">{c.note}</div>}
                  <ul aria-label="What I learned" className="gb-cert-learned col-start-2">
                    {c.learned.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div className="col-start-2 flex items-center justify-between font-mono text-xs text-ink-subtle">
                    <span>
                      {c.date}
                      {c.length ? `, ${c.length}` : ""}
                    </span>
                    {c.verify && (
                      <a href={c.verify} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-sans text-xs text-ink no-underline hover:underline md:min-h-6">
                        Verify ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
    </>
  )
}
