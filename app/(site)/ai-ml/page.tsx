import { Check } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import Link from "next/link"

import { StatusBadge } from "@/components/admin/status-badge"
import { BANNER, BOOKS, INTRO, TRACKS } from "@/lib/content/ai-ml"

export const metadata: Metadata = {
  title: "AI and ML",
  description: INTRO.lead,
}

export default function AiMlPage() {
  return (
    <div className="mx-auto box-border flex max-w-content flex-col gap-12 px-[clamp(16px,4vw,32px)] pb-24 pt-[72px]">
      <div className="flex flex-col gap-[18px]">
        <h1 className="display m-0 max-w-[760px]">{INTRO.title}</h1>
        <p className="lead m-0 max-w-[640px] text-ink-muted">{INTRO.lead}</p>
      </div>

      <section aria-label="Latest track" data-reveal="" className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-line bg-surface px-7 py-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink-subtle">{BANNER.eyebrow}</span>
          <strong className="title">{BANNER.title}</strong>
        </div>
        <span className="gb-pill">
          <span className="gb-pill-dot" aria-hidden />
          {BANNER.status}
        </span>
        <p className="m-0 basis-full text-sm text-ink-muted">
          My longest track yet: twelve courses and 43 hours over six weeks, from 1 October to 9 November 2026. It covers supervised learning,
          MLOps, data pipelines and quality, monitoring, Docker and CI/CD for machine learning. Every course has its own certificate on the{" "}
          <Link href="/education#programmes">Education page</Link>.
        </p>
      </section>

      <section aria-label="Tracks" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-6">
        {TRACKS.map((t) => (
          <article key={t.title} data-reveal="" className="flex flex-col gap-[18px] rounded-lg border border-line bg-surface p-7">
            <div className="flex justify-between gap-3 font-mono text-xs text-ink-subtle">
              <span>{t.issuer}</span>
              <span>{t.meta}</span>
            </div>
            <h2 className="title m-0">{t.title}</h2>
            <p className="m-0 text-sm text-ink-muted">{t.summary}</p>
            <ul className="m-0 flex list-none flex-col p-0">
              {t.skills.map((s) => (
                <li key={s.h} className="grid grid-cols-[20px_minmax(0,1fr)] gap-2.5 border-t border-line py-2.5 text-sm">
                  <Check size={14} className="mt-[3px] text-ink" aria-hidden />
                  <span>
                    <strong className="font-semibold">{s.h}</strong>
                    <span className="text-ink-muted">: {s.t}</span>
                  </span>
                </li>
              ))}
            </ul>
            {t.verify && (
              <a href={t.verify} target="_blank" rel="noopener noreferrer" className="mt-auto self-start text-sm">
                View certificate ↗
              </a>
            )}
          </article>
        ))}
      </section>

      <section aria-labelledby="books-h" data-reveal="" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="books-h" className="heading m-0">
            Reading for AI and ML
          </h2>
          <Link href="/reading" className="text-sm">
            The whole shelf
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {BOOKS.map((b) => (
            <div key={b.title} className="flex flex-col items-start gap-2 rounded-lg border border-line bg-surface p-5">
              <StatusBadge status="IN_PROGRESS" label={b.label} />
              <strong className="font-medium">{b.title}</strong>
              <span className="text-sm text-ink-muted">{b.note}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
