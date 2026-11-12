import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { DeviceMockup } from "@/components/gambit/device-mockup"
import { ReferenceCard } from "@/components/gambit/reference-card"
import { VideoEmbed } from "@/components/gambit/video-embed"
import { buttonVariants } from "@/components/ui/button"
import { PROJECTS, projectBySlug } from "@/lib/content/work"
import { BOOK_HREF } from "@/lib/site"

type Props = { params: { slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const p = projectBySlug(params.slug)
  if (!p) return { title: "Project not found" }
  return { title: p.title, description: p.lead }
}

const SEC = "mx-auto box-border max-w-content px-8 max-sm:px-4"
const sideH = "m-0 text-sm font-medium text-ink-subtle"

export default function ProjectPage({ params }: Props) {
  const p = projectBySlug(params.slug)
  if (!p) notFound()
  const i = PROJECTS.indexOf(p)
  const prev = PROJECTS[(i + PROJECTS.length - 1) % PROJECTS.length]
  const next = PROJECTS[(i + 1) % PROJECTS.length]

  return (
    <>
      <div className={`${SEC} flex flex-col gap-6 pt-14`}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/work" className="gb-crumb max-md:inline-flex max-md:min-h-11 max-md:items-center">
            Work
          </Link>
          <span aria-hidden>/</span>
          <span>{p.title}</span>
        </nav>
        <div className="flex flex-wrap gap-2">
          {p.award && <span className="gb-tag gb-tag-award">{p.award}</span>}
          <span className="gb-tag">{p.kind}</span>
          <span className="gb-tag">{p.period}</span>
        </div>
        <h1 className="display m-0 max-w-[820px]">{p.h1}</h1>
        <p className="lead m-0 max-w-[700px] text-ink-muted">{p.lead}</p>
        <dl className="m-0 mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] overflow-hidden rounded-lg border border-line bg-surface">
          {p.facts.map((f) => (
            <div key={f.k} className="-ml-px flex flex-col gap-1.5 border-l border-line px-6 py-5">
              <dt className="text-sm font-medium text-ink-subtle">{f.k}</dt>
              <dd className="m-0 text-sm">{f.v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 max-w-[920px]">
          <DeviceMockup url={p.shot} liveUrl={p.liveUrl} mock={p.mock} caption={p.mockCaption} />
        </div>
        {p.video && (
          <div className="mt-4 max-w-[920px]">
            <VideoEmbed embedSrc={p.video.embed} href={p.video.href} title={p.video.title} caption={p.video.caption} />
          </div>
        )}
        {p.praise && (
          <div className="mt-4 grid max-w-[920px]">
            <ReferenceCard reference={{ ...p.praise, mark: "IA" }} />
          </div>
        )}
      </div>

      <div className={`${SEC} flex flex-wrap items-start gap-16 py-20 max-sm:py-14`}>
        <article className="flex min-w-0 flex-[999_1_560px] flex-col gap-14">
          <section data-reveal="" aria-labelledby="problem-h" className="flex flex-col gap-3.5">
            <h2 id="problem-h" className="title m-0">
              The problem
            </h2>
            <p className="m-0 max-w-[680px] text-ink-muted">{p.problem}</p>
          </section>

          <section data-reveal="" aria-labelledby="did-h" className="flex flex-col gap-1">
            <h2 id="did-h" className="title m-0">
              What I did
            </h2>
            <ol className="m-0 mt-3 list-none p-0">
              {p.did.map((d, n) => (
                <li key={d.h} className="grid grid-cols-[40px_1fr] gap-3 border-t border-line py-4">
                  <span className="pt-0.5 font-mono text-xs text-ink-subtle">{n + 1}.</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="m-0 text-base font-semibold">{d.h}</h3>
                    <span className="text-sm text-ink-muted">{d.t}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section data-reveal="" aria-labelledby="arch-h" className="flex flex-col gap-4">
            <h2 id="arch-h" className="title m-0">
              Architecture
            </h2>
            <ol className="m-0 flex list-none flex-wrap items-stretch gap-y-3 p-0">
              {p.arch.map((a, n) => (
                <li key={a.t} className="flex flex-[1_1_150px] items-center">
                  <div
                    className={`box-border flex min-h-[76px] flex-1 flex-col gap-1 rounded-md border bg-surface p-3.5 ${n === 1 ? "border-ink" : "border-line-strong"}`}
                  >
                    <span className="text-sm font-semibold">{a.t}</span>
                    <span className="font-mono text-xs text-ink-subtle">{a.s}</span>
                  </div>
                  <span aria-hidden className="w-6 text-center font-mono text-ink-subtle">
                    {n < p.arch.length - 1 ? "→" : ""}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section data-reveal="" aria-labelledby="outcome-h" className="flex flex-col gap-4">
            <h2 id="outcome-h" className="title m-0">
              Outcome
            </h2>
            <dl className="m-0 flex flex-wrap gap-y-4 rounded-lg border border-line bg-surface py-6">
              {p.stats.map((s) => (
                <div key={s.l} className="-ml-px grid flex-[1_1_200px] gap-1 border-l border-line px-6">
                  <dt className="order-2 text-xs text-ink-muted">{s.l}</dt>
                  <dd className="order-1 m-0 text-2xl font-medium tabular-nums tracking-[-0.02em]">{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="m-0 max-w-[680px] text-ink-muted">{p.outcome}</p>
          </section>
        </article>

        <aside className="sticky top-24 flex min-w-0 flex-[1_1_280px] flex-col gap-4 max-[900px]:static">
          <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6">
            <h2 className={sideH}>Stack</h2>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="gb-tag">
                  {t}
                </span>
              ))}
            </div>
            {p.links.length > 0 && (
              <>
                <h2 className={sideH}>Links</h2>
                <ul className="m-0 flex list-none flex-col p-0">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="gb-link text-sm">
                        {l.label} <span aria-hidden>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <Link href={BOOK_HREF} className={buttonVariants()}>
            Book a call about this
          </Link>
        </aside>
      </div>

      <nav aria-label="More projects" className={`${SEC} pb-16`}>
        <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-6">
          <Link href={`/work/${prev.slug}`} className="group flex flex-col gap-1 text-ink no-underline">
            <span className="text-xs text-ink-muted">Previous project</span>
            <strong className="font-semibold group-hover:underline">{prev.title}</strong>
          </Link>
          <Link href={`/work/${next.slug}`} className="group flex flex-col items-end gap-1 text-right text-ink no-underline">
            <span className="text-xs text-ink-muted">Next project</span>
            <strong className="font-semibold group-hover:underline">{next.title}</strong>
          </Link>
        </div>
      </nav>
    </>
  )
}
