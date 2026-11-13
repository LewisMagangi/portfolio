"use client"

import { ArrowRight } from "@phosphor-icons/react"
import Link from "next/link"
import { useState } from "react"

import { ProjectCard } from "@/components/gambit/project-card"
import { ARCHIVE, FEATURED, FILTERS, type Filter } from "@/lib/content/work"

const TOTAL = FEATURED.length + ARCHIVE.length

/** Work board: stack filter chips, the featured cards, then the archive rows. */
export function WorkIndex() {
  const [active, setActive] = useState<Filter>("All")
  const keep = (x: { filters: Filter[] }) => active === "All" || x.filters.includes(active)
  const featured = FEATURED.filter(keep)
  const archive = ARCHIVE.filter(keep)
  const count = (f: Filter) => (f === "All" ? TOTAL : [...FEATURED, ...ARCHIVE].filter((x) => x.filters.includes(f)).length)

  return (
    <>
      <div role="group" aria-label="Filter by stack" className="-mt-[22px] flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button key={f} type="button" className="gb-chip max-md:min-h-11 max-md:px-4" aria-pressed={active === f} onClick={() => setActive(f)}>
            {f} <span className="gb-chip-n">{count(f)}</span>
          </button>
        ))}
      </div>

      <p aria-live="polite" className="m-0 -mt-4 text-sm text-ink-subtle">
        Showing {featured.length + archive.length} of {TOTAL} projects
      </p>

      {featured.length > 0 && (
        <section aria-labelledby="featured-h">
          <h2 id="featured-h" className="title m-0 mb-6">
            Running now
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-6">
            {featured.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      {archive.length > 0 && (
        <section aria-labelledby="more-h" className="flex flex-col gap-3">
          <h2 id="more-h" className="title m-0">
            Built before, not deployed now
          </h2>
          <ul className="m-0 list-none overflow-hidden rounded-lg border border-line bg-surface p-0">
            {archive.map((m, i) => (
              <li key={m.slug}>
                <Link
                  href={`/work/${m.slug}`}
                  className={`grid grid-cols-[110px_minmax(0,1fr)_minmax(0,1.6fr)_auto] items-baseline gap-6 px-6 py-5 text-ink no-underline transition-colors duration-fast hover:bg-surface-raised focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--focus)] max-[820px]:grid-cols-[1fr_auto] max-[820px]:gap-x-4 max-[820px]:gap-y-1 ${i > 0 ? "border-t border-line" : ""}`}
                >
                  <span className="font-mono text-xs text-ink-subtle max-[820px]:col-span-2">{m.year}</span>
                  <span className="flex flex-col items-start gap-1">
                    <strong className="font-semibold">{m.title}</strong>
                    {m.award && <span className="gb-tag gb-tag-award">{m.award}</span>}
                  </span>
                  <span className="text-sm text-ink-muted max-[820px]:order-last max-[820px]:col-span-2">{m.line}</span>
                  <ArrowRight size={16} aria-hidden className="text-ink-subtle" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
