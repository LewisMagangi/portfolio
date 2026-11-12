"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import gsap from "gsap"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"

import { buttonVariants } from "@/components/ui/button"
import { keepDates, prefersReducedMotion } from "@/lib/dom"
import { cn } from "@/lib/utils"

import { Icon } from "./icon"
import type { TimelineItemData } from "./timeline"

/** The Task view mark from the Gambit bundle: a card with two shadow cards behind it. */
export function TaskViewIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x={4.5} y={6.5} width={10} height={11} rx={1.8} />
      <path d="M17.5 8.5v7" />
      <path d="M20.5 10v4" />
      <path d="M7 4h5" />
    </svg>
  )
}

/**
 * Every move at once, as cards grouped by year (Gambit TaskView). Pick a card to open that move on the timeline.
 * "Play through" walks the cards in order. Arrow keys move across the grid; Esc closes and returns focus.
 */
export function TaskView({
  open,
  onOpenChange,
  items,
  active,
  title = "Every move, in order",
  onPick,
  returnFocus,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: TimelineItemData[]
  active: number
  title?: string
  onPick: (i: number) => void
  /** Where focus goes when the dialog closes without a pick (the button that opened it). */
  returnFocus?: () => HTMLElement | null
}) {
  const picked = useRef(false)
  const [hi, setHi] = useState(active)
  const [playing, setPlaying] = useState(false)
  const [year, setYear] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const years = Array.from(new Set(items.map((it) => it.year).filter(Boolean))) as string[]

  // Opening: start from the open move, centre it, and bring the cards in.
  useEffect(() => {
    if (!open) return
    setHi(active)
    setPlaying(false)
    setYear(items[active]?.year ?? null)
    const raf = requestAnimationFrame(() => {
      const el = rootRef.current
      if (!el) return
      const cur = el.querySelector<HTMLElement>(`.gb-tv-card[data-i="${active}"]`)
      cur?.scrollIntoView({ block: "center" })
      cur?.focus({ preventScroll: true })
      if (prefersReducedMotion()) return
      const cards = el.querySelectorAll(".gb-tv-card")
      gsap
        .timeline()
        .fromTo(el.querySelector(".gb-tv-head"), { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.05)
        .fromTo(
          cards,
          { y: 18, scale: 0.96, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power3.out", stagger: { each: Math.min(0.03, 0.4 / Math.max(cards.length, 1)) } },
          0.08,
        )
        .fromTo(el.querySelector(".gb-tv-years"), { x: 12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.15)
    })
    return () => cancelAnimationFrame(raf)
  }, [open, active, items])

  // The year rail follows the reader's scrolling inside the dialog.
  useEffect(() => {
    const root = scrollRef.current
    if (!open || !root) return
    let settled = false
    const t = window.setTimeout(() => (settled = true), 700)
    const io = new IntersectionObserver(
      (entries) => {
        if (!settled) return
        for (const e of entries) if (e.isIntersecting) setYear(e.target.getAttribute("data-year"))
      },
      { root, rootMargin: "-20% 0px -70% 0px" },
    )
    root.querySelectorAll(".gb-tv-year").forEach((s) => io.observe(s))
    return () => {
      window.clearTimeout(t)
      io.disconnect()
    }
  }, [open])

  // Play through: one card at a time, then stop on the last.
  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(
      () => {
        if (hi >= items.length - 1) {
          setPlaying(false)
          return
        }
        const n = hi + 1
        setHi(n)
        setYear(items[n]?.year ?? null)
        rootRef.current
          ?.querySelector(`.gb-tv-card[data-i="${n}"]`)
          ?.scrollIntoView({ block: "nearest", behavior: prefersReducedMotion() ? "auto" : "smooth" })
      },
      prefersReducedMotion() ? 900 : 1200,
    )
    return () => window.clearTimeout(t)
  }, [playing, hi, items])

  const jump = (y: string) => {
    const s = rootRef.current?.querySelector<HTMLElement>(`.gb-tv-year[data-year="${y}"]`)
    if (s && scrollRef.current) scrollRef.current.scrollTo({ top: s.offsetTop - 8, behavior: prefersReducedMotion() ? "auto" : "smooth" })
    setYear(y)
  }

  const onGridKey = (e: KeyboardEvent) => {
    const a = document.activeElement as HTMLElement | null
    if (!a?.classList.contains("gb-tv-card")) return
    const all = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(".gb-tv-card") ?? [])
    const k = all.indexOf(a)
    const grid = a.closest(".gb-tv-grid")
    const cols = grid ? Math.max(1, Math.round(grid.getBoundingClientRect().width / a.getBoundingClientRect().width)) : 1
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key]
    if (step == null) return
    e.preventDefault()
    all[Math.max(0, Math.min(all.length - 1, k + step))]?.focus()
  }

  const shown = year || items[hi]?.year || years[0]

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="gb-tv-backdrop" />
        <DialogPrimitive.Content
          ref={rootRef}
          className="gb-tv"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => {
            // A pick focuses the chosen move on the timeline; otherwise focus goes back to the opener.
            e.preventDefault()
            if (!picked.current) returnFocus?.()?.focus()
            picked.current = false
          }}
          onKeyDown={onGridKey}
        >
          <div className="gb-tv-in">
            <header className="gb-tv-head">
              <div>
                <DialogPrimitive.Title asChild>
                  <h2>{title}</h2>
                </DialogPrimitive.Title>
                <DialogPrimitive.Description asChild>
                  <p>
                    {items.length} moves, {years[0]} to now. Pick one to open it.
                  </p>
                </DialogPrimitive.Description>
              </div>
              <div className="gb-tv-actions">
                <button
                  type="button"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                  aria-pressed={playing}
                  onClick={() => {
                    if (!playing && hi >= items.length - 1) setHi(0)
                    setPlaying(!playing)
                  }}
                >
                  <Icon name={playing ? "pause" : "play"} size={14} />
                  {playing ? "Pause" : "Play through"}
                </button>
                <DialogPrimitive.Close className="gb-iconbtn" aria-label="Close task view">
                  <Icon name="x" size={18} />
                </DialogPrimitive.Close>
              </div>
            </header>
            <div className="gb-tv-body">
              <div className="gb-tv-scroll" ref={scrollRef}>
                {years.map((y) => (
                  <section key={y} className="gb-tv-year" data-year={y} aria-label={y}>
                    <h3>{y}</h3>
                    <ul className="gb-tv-grid">
                      {items.map((it, i) =>
                        it.year !== y ? null : (
                          <li key={i}>
                            <button
                              type="button"
                              data-i={i}
                              className={cn("gb-tv-card", i === hi && "is-hi", it.key && "is-key")}
                              onClick={() => {
                                setPlaying(false)
                                picked.current = true
                                onPick(i)
                                onOpenChange(false)
                              }}
                              onFocus={() => {
                                if (!playing) setHi(i)
                              }}
                            >
                              <span className="gb-tv-chrome" aria-hidden>
                                <i />
                                <i />
                                <i />
                                <b>{it.kindLabel || it.kind}</b>
                              </span>
                              <span className="gb-tv-card-body">
                                <strong>
                                  {it.title}
                                  {it.mark && <em title={it.markLabel}> {it.mark}</em>}
                                </strong>
                                <span className="gb-tv-date">{keepDates(it.date)}</span>
                                {it.detail && <span className="gb-tv-detail">{it.detail}</span>}
                              </span>
                            </button>
                          </li>
                        ),
                      )}
                    </ul>
                  </section>
                ))}
              </div>
              <nav className="gb-tv-years" aria-label="Jump to a year">
                <ol>
                  {years.map((y) => (
                    <li key={y}>
                      <button type="button" aria-current={y === shown ? "true" : undefined} onClick={() => jump(y)}>
                        {y}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
