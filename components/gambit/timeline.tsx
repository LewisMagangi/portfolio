"use client"

import gsap from "gsap"
import Link from "next/link"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"

import { buttonVariants } from "@/components/ui/button"
import { keepDates, prefersReducedMotion } from "@/lib/dom"
import { cn } from "@/lib/utils"

import { TaskView, TaskViewIcon } from "./task-view"

// Event-time clock (kept outside the component so render stays pure).
const now = () => Date.now()

export type TimelineItemData = {
  /** Anchor id; Home links to /career#<id> */
  id?: string
  year?: string
  date: string
  title: string
  kind: string
  kindLabel?: string
  tone?: "neutral" | "active" | "award"
  key?: boolean
  mark?: string
  markLabel?: string
  org?: string
  detail?: string
  chips?: string[]
  href?: string
  linkLabel?: string
}

/**
 * Every move in order. One move is open at a time. With `scrollSpy`, the move at the reading line opens and the
 * rail fills continuously with scroll (GSAP quickTo, no scroll interception). Marks are true circles.
 * With `controls`, a sticky bar adds kind filters, the move count and Task view (every move at once).
 */
export function Timeline({
  items,
  initial,
  scrollSpy = false,
  controls = false,
  taskTitle,
}: {
  items: TimelineItemData[]
  initial?: number
  scrollSpy?: boolean
  controls?: boolean
  taskTitle?: string
}) {
  const [active, setActive] = useState(initial ?? items.length - 1)
  const [filter, setFilter] = useState("All")
  const [taskOpen, setTaskOpen] = useState(false)
  const taskBtnRef = useRef<HTMLButtonElement>(null)
  const kinds = Array.from(new Set(items.map((it) => it.kind)))
  const visible = items.map((it, i) => ({ it, i })).filter((x) => filter === "All" || x.it.kind === filter)
  const vIdx = visible.map((x) => x.i)
  const pos = vIdx.indexOf(active)
  const listRef = useRef<HTMLOListElement>(null)
  const trackRef = useRef<HTMLLIElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const clickedAt = useRef(0)

  const go = (i: number) => {
    clickedAt.current = now()
    setActive(i)
  }

  // A link to /career#<id> opens that move, and the scroll spy holds off while the page settles on it.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const i = id ? items.findIndex((it) => it.id === id) : -1
      if (i < 0) return
      setFilter("All")
      clickedAt.current = now() + 800
      setActive(i)
      // Centre it on the reading line, where the scroll spy looks, once its panel has opened.
      window.setTimeout(() => {
        listRef.current?.querySelector<HTMLElement>(`[data-i="${i}"]`)?.scrollIntoView({ block: "center" })
      }, 350)
    }
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [items])

  // Scroll spy: the move crossing the reading line (about 45% down) opens, unless one was just clicked.
  useEffect(() => {
    const list = listRef.current
    if (!scrollSpy || !list || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      (entries) => {
        if (now() - clickedAt.current < 1200) return
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const i = Number(e.target.getAttribute("data-i"))
          if (!Number.isNaN(i)) setActive(i)
        }
      },
      { rootMargin: "-42% 0px -52% 0px" },
    )
    list.querySelectorAll(".gb-tline-item").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [scrollSpy, filter])

  // The rail: follows the reading line with scroll spy, otherwise eases to the open move.
  useEffect(() => {
    const list = listRef.current
    const track = trackRef.current
    const fill = fillRef.current
    if (!list || !track || !fill) return
    const ease = prefersReducedMotion() ? null : gsap.quickTo(fill, "scaleY", { duration: 0.6, ease: "power3.out" })
    let raf = 0
    let top = 0
    let len = 1
    const dots = () => Array.from(list.querySelectorAll<HTMLElement>(".gb-tline-item .gb-tline-dot"))

    const measure = () => {
      const d = dots()
      if (!d.length) return
      const lr = list.getBoundingClientRect()
      const a = d[0].getBoundingClientRect()
      const z = d[d.length - 1].getBoundingClientRect()
      top = a.top + a.height / 2 - lr.top
      len = Math.max(1, z.top + z.height / 2 - lr.top - top)
      track.style.left = `${a.left + a.width / 2 - lr.left}px`
      track.style.top = `${top}px`
      track.style.height = `${len}px`
    }
    const update = () => {
      raf = 0
      measure()
      const lr = list.getBoundingClientRect()
      let target: number
      if (scrollSpy && !taskOpen) {
        target = window.innerHeight * 0.45 - lr.top - top
      } else {
        const cur = list.querySelector<HTMLElement>(".gb-tline-item.is-active .gb-tline-dot")
        const r = cur?.getBoundingClientRect()
        target = r ? r.top + r.height / 2 - lr.top - top : 0
      }
      const v = Math.max(0, Math.min(1, target / len))
      if (ease) ease(v)
      else fill.style.transform = `scaleY(${v})`
      dots().forEach((d) => {
        const r = d.getBoundingClientRect()
        const y = r.top + r.height / 2 - lr.top - top
        d.closest(".gb-tline-item")?.classList.toggle("is-lit", y <= target + 1)
      })
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    const t = window.setTimeout(update, 320) // after the opening panel settles
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    const ro = new ResizeObserver(on)
    ro.observe(list)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
      gsap.killTweensOf(fill)
    }
  }, [active, scrollSpy, filter, taskOpen])

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
    e.preventDefault()
    const k = Math.max(0, pos)
    const next = vIdx[Math.max(0, Math.min(vIdx.length - 1, k + (e.key === "ArrowDown" ? 1 : -1)))]
    go(next)
    listRef.current?.querySelector<HTMLElement>(`[data-i="${next}"] .gb-tline-head`)?.focus()
  }

  // Picking a card in Task view opens that move here, with every kind showing, and brings it into view.
  const pick = (i: number) => {
    setFilter("All")
    go(i)
    window.setTimeout(() => {
      const el = listRef.current?.querySelector<HTMLElement>(`[data-i="${i}"]`)
      el?.scrollIntoView({ block: "center", behavior: prefersReducedMotion() ? "auto" : "smooth" })
      el?.querySelector<HTMLElement>(".gb-tline-head")?.focus({ preventScroll: true })
    }, 60)
  }

  // Show each year once, on the first visible move of that year.
  const yearLabels = visible.map((x, j) => (x.it.year && x.it.year !== visible[j - 1]?.it.year ? x.it.year : null))
  return (
    <div className="gb-tline">
      {controls && (
        <div className="gb-tline-bar">
          <div className="gb-tline-filters" role="group" aria-label="Filter moves">
            {["All", ...kinds].map((k) => (
              <button key={k} type="button" className="gb-chip" aria-pressed={filter === k} onClick={() => setFilter(k)}>
                {k}
                <span className="gb-chip-n">{k === "All" ? items.length : items.filter((x) => x.kind === k).length}</span>
              </button>
            ))}
          </div>
          <div className="gb-tline-play">
            <span className="gb-tline-count" aria-live="polite">
              {pos >= 0 ? `Move ${pos + 1} of ${vIdx.length}` : `${vIdx.length} moves`}
            </span>
            <button
              ref={taskBtnRef}
              type="button"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gb-tline-tv max-md:min-h-11")}
              aria-haspopup="dialog"
              onClick={() => setTaskOpen(true)}
            >
              <TaskViewIcon />
              Task view
            </button>
          </div>
        </div>
      )}
      {controls && (
        <TaskView open={taskOpen} onOpenChange={setTaskOpen} items={items} active={active} title={taskTitle} onPick={pick} returnFocus={() => taskBtnRef.current} />
      )}
      <ol className="gb-tline-list" ref={listRef} onKeyDown={onKey}>
        <li className="gb-tline-track" aria-hidden ref={trackRef}>
          <span className="gb-tline-fill" ref={fillRef} />
        </li>
        {visible.map(({ it, i }, j) => {
          const on = i === active
          const year = yearLabels[j]
          const pid = `tl-panel-${i}`
          return (
            <li
              key={i}
              data-i={i}
              id={it.id}
              className={cn("gb-tline-item", on && "is-active", it.key && "is-key", j === visible.length - 1 && "is-last")}
            >
              <div className="gb-tline-when">
                {year && <span className="gb-tline-year">{year}</span>}
                <span>{keepDates(it.date)}</span>
              </div>
              <div className="gb-tline-rail">
                <button
                  type="button"
                  className="gb-tline-dot"
                  tabIndex={-1}
                  aria-hidden
                  title={it.markLabel || it.title}
                  onClick={() => go(i)}
                />
              </div>
              <div className="gb-tline-body">
                <button
                  type="button"
                  className="gb-tline-head"
                  aria-expanded={on}
                  aria-controls={pid}
                  onClick={() => go(i)}
                >
                  <span className="gb-tline-title">
                    {it.title}
                    {it.mark && (
                      <span className="gb-tline-mark" title={it.markLabel || "Key moment"}>
                        {it.mark}
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "gb-tag",
                      it.tone === "award" && "gb-tag-award",
                      it.tone === "active" && "gb-tag-active",
                    )}
                  >
                    {it.kindLabel || it.kind}
                  </span>
                </button>
                <div className="gb-tline-panel" id={pid} role="region" aria-label={it.title}>
                  <div className="gb-tline-panel-in">
                    {it.org && <div className="gb-tline-org">{it.org}</div>}
                    {it.detail && <p className="gb-tline-detail">{it.detail}</p>}
                    {it.chips && it.chips.length > 0 && (
                      <ul className="gb-cert-learned">
                        {it.chips.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    )}
                    {it.href && (
                      <Link className="gb-tline-link" href={it.href} tabIndex={on ? undefined : -1}>
                        {it.linkLabel || "Read more"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
