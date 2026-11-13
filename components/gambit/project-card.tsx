import Link from "next/link"

import type { FeaturedCard } from "@/lib/content/work"

import { DeviceMockup } from "./device-mockup"

/** Gambit ProjectCard (bundle.js › ProjectCard): devices on top, then period, title, summary, tags and links. */
export function ProjectCard({ p }: { p: FeaturedCard }) {
  const host = p.liveUrl ? p.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : p.thumb
  const href = p.caseStudy === false ? p.liveUrl : `/work/${p.slug}`
  return (
    <article className="group/card relative grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-3 rounded-lg border border-line bg-surface p-6 text-ink transition-[box-shadow,transform] duration-fast ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {p.live && p.liveUrl && (
        <div className="-mx-6 -mt-6 rounded-t-lg border-b border-line bg-bg p-6">
          <DeviceMockup url={host} liveUrl={p.liveUrl} mock={p.mock} compact />
        </div>
      )}
      <div className="mt-3 flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="m-0 text-xl font-semibold tracking-[-0.01em]">
            <Link href={href ?? "/work"} className="text-ink no-underline hover:underline hover:underline-offset-4">
              {p.title}
            </Link>
          </h3>
          {p.award ? <span className="gb-tag gb-tag-award">{p.award}</span> : p.status && <span className="gb-tag">{p.status}</span>}
        </div>
        <span className="text-sm text-ink-muted">{p.period}</span>
      </div>
      <p className="m-0 text-ink-muted">{p.summary}</p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="gb-tag">
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 text-sm">
        {p.caseStudy !== false && (
          <Link href={`/work/${p.slug}`} className="gb-link">
            Case study
          </Link>
        )}
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
