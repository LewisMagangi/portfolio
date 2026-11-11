"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { prefersReducedMotion } from "@/lib/dom"

/**
 * Marks `[data-reveal]` sections `.is-in` as they enter the viewport. The CSS in globals.css does the rest:
 * headings, then body, then list items, on the Tilda curve. Nothing hides when motion is reduced or JS is off.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") return
    const root = document.documentElement
    root.classList.add("gb-reveal-on")

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    )
    const scan = () => document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      root.classList.remove("gb-reveal-on")
    }
  }, [pathname])

  return null
}
