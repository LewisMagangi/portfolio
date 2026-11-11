"use client"

import { Fragment, useEffect, useRef } from "react"

import { prefersReducedMotion } from "@/lib/dom"
import { cn } from "@/lib/utils"

/**
 * One statement, lit word by word as each word crosses a reading line 62% down the viewport. " / " separates lines.
 * Full colour at once under reduced motion; the sentence is in the markup either way.
 */
export function TaglineReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const lines = text.split(/\n|\s\/\s/)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = Array.from(el.querySelectorAll<HTMLElement>(".gb-tagline-w"))
    if (prefersReducedMotion()) {
      words.forEach((w) => w.classList.add("is-lit"))
      return
    }
    el.classList.add("is-armed")
    let raf = 0
    const tick = () => {
      raf = 0
      const line = window.innerHeight * 0.62
      words.forEach((w) => {
        const r = w.getBoundingClientRect()
        w.classList.toggle("is-lit", r.top + r.height / 2 < line)
      })
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [text])

  return (
    <p ref={ref} className={cn("gb-tagline", className)}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden>
        {lines.map((l, li) => (
          <span key={li} className="gb-tagline-line">
            {l
              .split(/\s+/)
              .filter(Boolean)
              .map((w, wi) => (
                <Fragment key={wi}>
                  <span className="gb-tagline-w">{w}</span>{" "}
                </Fragment>
              ))}
          </span>
        ))}
      </span>
    </p>
  )
}
