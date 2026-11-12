"use client"

import { useEffect, useState } from "react"

import { prefersReducedMotion } from "@/lib/dom"

import { Icon } from "./icon"

function offsets(el: HTMLElement) {
  const base = el.getBoundingClientRect().left - el.scrollLeft
  return Array.from(el.children).map((c) => c.getBoundingClientRect().left - base)
}

function nearest(el: HTMLElement) {
  const o = offsets(el)
  const x = el.scrollLeft
  let best = 0
  o.forEach((v, i) => {
    if (Math.abs(v - o[0] - x) < Math.abs(o[best] - o[0] - x)) best = i
  })
  return best
}

function scrollToSlide(el: HTMLElement, i: number) {
  const o = offsets(el)
  if (!o.length) return false
  const k = Math.max(0, Math.min(o.length - 1, i))
  const max = el.scrollWidth - el.clientWidth
  const left = Math.min(max, Math.max(0, o[k] - o[0]))
  if (Math.abs(left - el.scrollLeft) < 2) return false
  el.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" })
  return true
}

/**
 * Dots, count and hint for a scroll-snap track (`id={target}`). The track also takes mouse drag and arrow keys.
 * The one sanctioned scroll exception: a vertical wheel steps one slide, and hands back to the page at either end.
 */
export function CarouselControls({
  target,
  label = "Slides",
  itemLabel = "slide",
}: {
  target: string
  label?: string
  itemLabel?: string
}) {
  const [state, setState] = useState({ k: 0, n: 1 })

  useEffect(() => {
    const el = document.getElementById(target)
    if (!el) return
    el.classList.add("gb-carousel-mouse")
    el.setAttribute("data-carousel-track", "")

    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      const n = el.children.length || 1
      setState({ k: el.scrollLeft > max - 4 ? n - 1 : nearest(el), n })
    }

    let lock = 0
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) return // trackpads and shift+wheel scroll natively
      const max = el.scrollWidth - el.clientWidth
      const dir = e.deltaY > 0 ? 1 : -1
      if ((dir > 0 && el.scrollLeft >= max - 4) || (dir < 0 && el.scrollLeft <= 4)) return
      const now = Date.now()
      if (now < lock) {
        e.preventDefault()
        return
      }
      if (scrollToSlide(el, nearest(el) + dir)) {
        e.preventDefault()
        lock = now + 320
      }
    }

    let drag: { x: number; left: number; moved: boolean } | null = null
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return
      drag = { x: e.clientX, left: el.scrollLeft, moved: false }
    }
    const onMove = (e: PointerEvent) => {
      if (!drag) return
      const dx = e.clientX - drag.x
      if (!drag.moved && Math.abs(dx) > 5) {
        drag.moved = true
        el.classList.add("is-dragging")
        try {
          el.setPointerCapture(e.pointerId)
        } catch {
          /* pointer already released */
        }
      }
      if (drag.moved) el.scrollLeft = drag.left - dx
    }
    const onUp = (e: PointerEvent) => {
      if (!drag) return
      const { moved, left: start } = drag
      const dx = e.clientX - drag.x
      drag = null
      if (!moved) return
      const o = offsets(el).map((v, _i, a) => v - a[0])
      let k = nearest(el)
      if (Math.abs(dx) > 60) {
        let from = 0
        o.forEach((v, i) => {
          if (Math.abs(v - start) < Math.abs(o[from] - start)) from = i
        })
        k = Math.max(0, Math.min(o.length - 1, from + (dx < 0 ? 1 : -1)))
      }
      if (!scrollToSlide(el, k)) el.scrollTo({ left: Math.min(el.scrollWidth - el.clientWidth, o[k] || 0) })
      window.setTimeout(() => el.classList.remove("is-dragging"), prefersReducedMotion() ? 0 : 480)
      // Swallow the click that ends a drag so a card link under the pointer does not fire.
      const stop = (c: Event) => {
        c.preventDefault()
        c.stopPropagation()
      }
      el.addEventListener("click", stop, true)
      window.setTimeout(() => el.removeEventListener("click", stop, true), 0)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.target !== el) return
      const map: Record<string, number> = {
        ArrowRight: nearest(el) + 1,
        ArrowLeft: nearest(el) - 1,
        Home: 0,
        End: el.children.length - 1,
      }
      if (e.key in map) {
        e.preventDefault()
        scrollToSlide(el, map[e.key])
      }
    }

    update()
    const mo = new MutationObserver(update)
    mo.observe(el, { childList: true })
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
    el.addEventListener("pointercancel", onUp)
    el.addEventListener("keydown", onKey)
    return () => {
      mo.disconnect()
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      el.removeEventListener("pointercancel", onUp)
      el.removeEventListener("keydown", onKey)
      el.classList.remove("gb-carousel-mouse")
    }
  }, [target])

  const current = Math.min(state.k, state.n - 1)
  return (
    <div className="gb-carousel-ctl">
      <div className="gb-carousel-dots" role="group" aria-label={`${label}: jump to`}>
        {Array.from({ length: state.n }, (_, i) => (
          <button
            key={i}
            type="button"
            className="gb-carousel-dot"
            aria-label={`Show ${itemLabel} ${i + 1} of ${state.n}`}
            aria-current={i === current ? "true" : undefined}
            onClick={() => {
              const el = document.getElementById(target)
              if (el) scrollToSlide(el, i)
            }}
          />
        ))}
      </div>
      <span className="gb-carousel-count" aria-live="polite">
        {current + 1} / {state.n}
      </span>
      <span className="gb-carousel-hint">
        <Icon name="mouse" size={14} />
        Scroll or drag
      </span>
    </div>
  )
}
