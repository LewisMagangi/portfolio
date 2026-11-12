import Link from "next/link"

import type { FeaturedCard } from "@/lib/content/work"

import { DeviceMockup } from "./device-mockup"

/** Gambit ProjectCard (bundle.js › ProjectCard): devices on top, then period, title, summary, tags and links. */
export function ProjectCard({ p }: { p: FeaturedCard }) {
  const host = p.liveUrl ? p.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : p.thumb
  return (
    <article className="group/card relative grid content-start gap-3 rounded-lg border border-line bg-surface p-6 text-ink transition-[box-shadow,transform] duration-fast ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="-mx-6 -mt-6 rounded-t-lg border-b border-line bg-bg px-6 pt-6">
        <DeviceMockup url={host} liveUrl={p.live ? p.liveUrl : undefined} mock={p.mock} compact />
      </div>
      <div className="mt-3 flex justify-between gap-3 font-mono text-xs tracking-[0.04em] text-ink-subtle">
        <span>{p.period}</span>
        {p.award ? <span className="gb-tag gb-tag-award">{p.award}</span> : <span>{p.status}</span>}
      </div>
      <h3 className="m-0 text-xl font-semibold tracking-[-0.01em]">
        <Link href={`/work/${p.slug}`} className="text-ink no-underline hover:underline hover:underline-offset-4">
          {p.title}
        </Link>
      </h3>
      <p className="m-0 text-ink-muted">{p.summary}</p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="gb-tag">
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 text-sm">
        <Link href={`/work/${p.slug}`} className="gb-link">
          Case study
        </Link>
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="gb-link">
            Live ↗
          </a>
        )}
        {p.repoUrl && (
          <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="gb-link">
            Code ↗
          </a>
        )}
      </div>
    </article>
  )
}
