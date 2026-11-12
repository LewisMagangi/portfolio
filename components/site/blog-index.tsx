"use client"

import { ArrowRight } from "@phosphor-icons/react"
import Link from "next/link"
import { useState } from "react"

import { Shader } from "@/components/site/shader"
import type { PostSummary } from "@/lib/blog"
import { cn } from "@/lib/utils"

const SEC = "mx-auto box-border flex max-w-content flex-col px-8 py-24 max-sm:px-4 max-sm:py-16"

/** Blog board: topic chips, the newest post as a feature, then the rest as a list. */
export function BlogIndex({ title, lead, posts, topics }: { title: string; lead: string; posts: PostSummary[]; topics: { name: string; count: number }[] }) {
  const [cat, setCat] = useState("All")
  const shown = posts.filter((p) => cat === "All" || p.category === cat)
  const [feature, ...rest] = shown
  const chips = [{ name: "All", count: posts.length }, ...topics]

  return (
    <>
      <header>
        <section className={cn(SEC, "gap-6 pb-12 pt-24 max-sm:pb-10 max-sm:pt-12")}>
          <div className="flex max-w-[760px] flex-col gap-4">
            <h1 className="display m-0">{title}</h1>
            <p className="lead m-0 text-ink-muted">{lead}</p>
          </div>
          <div role="group" aria-label="Filter posts by topic" className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <button key={c.name} type="button" className="gb-chip max-md:min-h-11 max-md:px-4" aria-pressed={cat === c.name} onClick={() => setCat(c.name)}>
                {c.name} <span className="gb-chip-n">{c.count}</span>
              </button>
            ))}
          </div>
        </section>
      </header>

      <div className="border-t border-line">
        <section aria-label="Posts" className={cn(SEC, "gap-8")}>
          {feature ? (
            <Link
              href={`/blog/${feature.slug}`}
              className="group grid grid-cols-2 items-center gap-8 rounded-lg text-ink no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)] max-[820px]:grid-cols-1"
            >
              <div aria-hidden className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-lg border border-line bg-surface">
                <Shader shape="wave" type="8x8" size={3} speed={0} front="line-strong" opacity={0.8} />
                <span className="gb-blog-wave">
                  {Array.from({ length: 9 }, (_, i) => (
                    <i key={i} />
                  ))}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-ink-subtle">
                  <time dateTime={feature.dateTime}>{feature.date}</time>, {feature.read}, {feature.category}
                </span>
                <h2 className="heading m-0">{feature.title}</h2>
                <p className="lead m-0 text-ink-muted">{feature.excerpt}</p>
                <span className="inline-flex items-center gap-2 font-medium underline decoration-line-strong underline-offset-4 transition-[text-decoration-color] duration-fast group-hover:decoration-ink">
                  Read the post <ArrowRight size={16} aria-hidden />
                </span>
              </div>
            </Link>
          ) : (
            <div role="status" className="flex flex-col items-start gap-2 rounded-lg border border-dashed border-line-strong p-8">
              <strong>Nothing in {cat} yet.</strong>
              <span className="text-sm text-ink-muted">It’s on the list. Meanwhile, the posts under All cover web builds and accessibility.</span>
              <button type="button" className="gb-btn gb-btn-sm" onClick={() => setCat("All")}>
                Show all posts
              </button>
            </div>
          )}

          {rest.length > 0 && (
            <ol className="m-0 list-none p-0">
              {rest.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group grid grid-cols-[120px_minmax(0,1fr)_auto] items-baseline gap-6 border-t border-line py-5 text-ink no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] max-[820px]:grid-cols-1 max-[820px]:gap-1"
                  >
                    <time dateTime={p.dateTime} className="font-mono text-xs text-ink-subtle">
                      {p.date}
                    </time>
                    <span className="flex flex-col gap-1">
                      <strong className="text-lg font-medium underline-offset-4 group-hover:underline">{p.title}</strong>
                      <span className="text-sm text-ink-muted">{p.excerpt}</span>
                    </span>
                    <span className="font-mono text-xs text-ink-subtle">{p.read}</span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </>
  )
}
