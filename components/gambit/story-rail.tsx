"use client"

import gsap from "gsap"
import Link from "next/link"
import { useEffect, useRef, useState, type Ref } from "react"

import { buttonVariants } from "@/components/ui/button"
import { prefersReducedMotion } from "@/lib/dom"
import { BOOK_HREF } from "@/lib/site"
import { cn } from "@/lib/utils"

/** A 36×18 battery whose cell fills from the left with a faint ink wash and turns solid at 100%. */
export function Battery({ value, fillRef, className }: { value: number; fillRef?: Ref<HTMLSpanElement>; className?: string }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <span className={cn("gb-batt", v >= 100 && "is-full", className)} role="img" aria-label={`${v} percent read`}>
      <span className="gb-batt-cell">
        <span
          ref={fillRef}
          className="gb-batt-fill"
          style={fillRef ? undefined : { transform: `scaleX(${v / 100})` }}
        />
        <span className="gb-batt-num" aria-hidden>
          {v}%
        </span>
      </span>
      <span className="gb-batt-nub" aria-hidden />
    </span>
  )
}

type Section = { id: string; label: string }

/**
 * The reading battery. From 1280px a hairline left of the 1080px column fills with scroll progress, with a battery
 * at its foot. At 820px and below the battery sits in a bottom book bar with the current section. No pill, no move
 * labels, no dots (v8.1).
 */
export function StoryRail({
  items,
  after,
  bookHref = BOOK_HREF,
  ctaLabel = "Book a free call",
}: {
  items: Section[]
  /** id of the hero; the rail appears once it has scrolled away */
  after?: string
  bookHref?: string
  ctaLabel?: string
}) {
  const [current, setCurrent] = useState(-1)
  const [shown, setShown] = useState(false)
  const [pct, setPct] = useState(0)
  const lineRef = useRef<HTMLSpanElement>(null)
  const cellRef = useRef<HTMLSpanElement>(null)
  const cell2Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const smooth = !prefersReducedMotion()
    const targets: [HTMLElement | null, "scaleY" | "scaleX"][] = [
      [lineRef.current, "scaleY"],
      [cellRef.current, "scaleX"],
      [cell2Ref.current, "scaleX"],
    ]
    const setters = targets.map(([el, prop]) =>
      el && smooth ? gsap.quickTo(el, prop, { duration: 0.6, ease: "power3.out" }) : null,
    )

    let raf = 0
    const tick = () => {
      raf = 0
      const y = window.innerHeight * (window.innerWidth < 820 ? 0.6 : 0.4)
      let k = -1
      items.forEach((it, i) => {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= y) k = i
      })
      setCurrent(k)
      const hero = after ? document.getElementById(after) : null
      setShown(hero ? hero.getBoundingClientRect().bottom < 80 : k >= 0)
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const f = Math.min(1, Math.max(0, window.scrollY / max))
      setPct(Math.round(f * 100))
      targets.forEach(([el, prop], i) => {
        if (!el) return
        const set = setters[i]
        if (set) set(f)
        else el.style.transform = `${prop}(${f})`
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
      gsap.killTweensOf(targets.map(([el]) => el).filter(Boolean))
    }
  }, [items, after])

  const now = items[current]
  return (
    <>
      <div className={cn("gb-rail-line", shown && "is-shown")} aria-hidden>
        <span className="gb-rail-track">
          <span ref={lineRef} className="gb-rail-fill" />
        </span>
        <Battery value={pct} fillRef={cellRef} />
      </div>
      <div className={cn("gb-bookbar", shown && "is-shown")} data-bookbar>
        <span className="gb-bookbar-now">
          <Battery value={pct} fillRef={cell2Ref} />
          {now && (
            <span className="gb-bookbar-label" aria-hidden>
              {now.label}
            </span>
          )}
        </span>
        <Link href={bookHref} className={cn(buttonVariants({ size: "sm" }), "min-h-11 flex-none rounded-full")}>
          {ctaLabel}
        </Link>
      </div>
    </>
  )
}
