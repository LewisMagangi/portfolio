"use client"

import { CaretDown } from "@phosphor-icons/react"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"

import { prefersReducedMotion } from "@/lib/dom"
import { cn } from "@/lib/utils"

type Item = { id: string; text: string }

/**
 * Gambit ArticleToc (bundle.js › ArticleToc): a 2px progress hairline across the top, and an "On this page"
 * list built from the article's h2s that marks the section being read. Under 960px the list folds behind a button.
 */
export function ArticleToc({ target, progress = true }: { target: string; progress?: boolean }) {
  const [items, setItems] = useState<Item[]>([])
  const [cur, setCur] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const bar = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = document.getElementById(target)
    if (!el) return
    const hs = Array.from(el.querySelectorAll<HTMLElement>("h2[id]"))
    setItems(hs.map((h) => ({ id: h.id, text: h.textContent ?? "" })))
    const q =
      bar.current && !prefersReducedMotion()
        ? gsap.quickTo(bar.current, "scaleX", {
            duration: 0.3,
            ease: "power2.out",
          })
        : null
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const line = window.innerHeight * 0.3
      const v = Math.max(0, Math.min(1, (line - r.top) / Math.max(1, r.height - window.innerHeight * 0.4)))
      if (bar.current) {
        if (q) q(v)
        else bar.current.style.transform = `scaleX(${v})`
      }
      let k: string | null = null
      for (const h of hs) if (h.getBoundingClientRect().top < line) k = h.id
      setCur(k)
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
  }, [target])

  return (
    <>
      {progress && (
        <div className="gb-readbar" aria-hidden>
          <i ref={bar} />
        </div>
      )}
      {items.length > 0 && (
        <nav className={cn("gb-toc", open && "is-open")} aria-label="On this page">
          <p>On this page</p>
          <button type="button" className="gb-toc-toggle" aria-expanded={open} aria-controls="gb-toc-list" onClick={() => setOpen(!open)}>
            <span>On this page</span>
            <span className="gb-toc-cur">{items.find((it) => it.id === cur)?.text ?? ""}</span>
            <CaretDown size={16} aria-hidden />
          </button>
          <ol id="gb-toc-list">
            {items.map((it) => (
              <li key={it.id}>
                <a href={`#${it.id}`} aria-current={cur === it.id ? "location" : undefined} onClick={() => setOpen(false)}>
                  {it.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  )
}
