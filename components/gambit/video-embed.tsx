"use client"

import { ArrowUpRight, Play } from "@phosphor-icons/react"
import { useState } from "react"

import { Shader } from "@/components/site/shader"

/**
 * Gambit VideoEmbed (bundle.js › VideoEmbed): a dither poster with a play button. The iframe loads only when
 * pressed, so the page never pulls in the player until someone asks for it.
 */
export function VideoEmbed({ embedSrc, href, title, caption }: { embedSrc: string; href?: string; title: string; caption?: string }) {
  const [on, setOn] = useState(false)
  return (
    <figure className="m-0 flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-surface">
        {on ? (
          <iframe src={embedSrc} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="absolute inset-0 size-full border-0" />
        ) : (
          <button
            type="button"
            onClick={() => setOn(true)}
            className="group absolute inset-0 grid w-full cursor-pointer place-items-center border-0 bg-transparent p-0 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--focus)]"
          >
            <Shader shape="ripple" type="8x8" size={2} speed={0.15} front="line" className="absolute inset-0" />
            <span
              aria-hidden
              className="relative grid size-16 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-fast ease-out group-hover:scale-[1.06] group-active:scale-[0.97] motion-reduce:transition-none"
            >
              <Play size={22} weight="fill" />
            </span>
            <span className="absolute inset-x-4 bottom-4 text-left text-sm font-medium">{title}</span>
            <span className="sr-only">Play the video</span>
          </button>
        )}
      </div>
      {(caption || href) && (
        <figcaption className="flex flex-wrap justify-between gap-4 text-sm text-ink-muted">
          <span>{caption}</span>
          {href && (
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink underline decoration-line-strong underline-offset-[3px]">
              Open in Google Vids
              <ArrowUpRight size={14} aria-hidden />
            </a>
          )}
        </figcaption>
      )}
    </figure>
  )
}
