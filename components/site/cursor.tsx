"use client"

import gsap from "gsap"
import { useEffect } from "react"

import { canHover, prefersReducedMotion } from "@/lib/dom"

type Mode = "" | "native" | "link" | "label"

function modeFor(target: EventTarget | null): [Mode, string] {
  const t = target as Element | null
  if (!t || !t.closest) return ["", ""]
  if (t.closest("input, textarea, select, [contenteditable=''], [contenteditable='true'], iframe")) return ["native", ""]
  const labelled = t.closest("[data-cursor]")
  if (labelled) return ["label", labelled.getAttribute("data-cursor") || ""]
  if (t.closest("[data-carousel-track]")) return t.closest("a, button") ? ["link", ""] : ["label", "Drag"]
  if (t.closest("a[href], button:not([disabled]), summary, [role='button'], label")) return ["link", ""]
  return ["", ""]
}

/**
 * A small board square that follows the pointer and turns onto its diagonal over anything usable.
 * Mouse and trackpad only, never under reduced motion; text fields and iframes keep the native cursor.
 */
export function Cursor() {
  useEffect(() => {
    if (!canHover() || prefersReducedMotion() || document.querySelector(".gb-cursor")) return

    const root = document.createElement("div")
    root.className = "gb-cursor"
    root.setAttribute("aria-hidden", "true")
    root.innerHTML =
      '<span class="gb-cursor-pos gb-cursor-pos-ring"><span class="gb-cursor-ring"><span class="gb-cursor-label"></span></span></span>' +
      '<span class="gb-cursor-pos gb-cursor-pos-dot"><span class="gb-cursor-dot"></span></span>'
    document.body.appendChild(root)
    const html = document.documentElement
    html.classList.add("gb-cursor-on")

    const ringPos = root.querySelector<HTMLElement>(".gb-cursor-pos-ring")!
    const dotPos = root.querySelector<HTMLElement>(".gb-cursor-pos-dot")!
    const label = root.querySelector<HTMLElement>(".gb-cursor-label")!
    const dotX = gsap.quickTo(dotPos, "x", { duration: 0.12, ease: "power3.out" })
    const dotY = gsap.quickTo(dotPos, "y", { duration: 0.12, ease: "power3.out" })
    const ringX = gsap.quickTo(ringPos, "x", { duration: 0.5, ease: "power3.out" })
    const ringY = gsap.quickTo(ringPos, "y", { duration: 0.5, ease: "power3.out" })
    let idle = 0

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      const [mode, text] = modeFor(e.target)
      const down = root.classList.contains("is-down")
      root.className = "gb-cursor is-on" + (mode ? " is-" + mode : "") + (down ? " is-down" : "")
      if (label.textContent !== text) label.textContent = text
      window.clearTimeout(idle)
      idle = window.setTimeout(() => root.classList.add("is-idle"), 1800)
    }
    const down = () => root.classList.add("is-down")
    const up = () => root.classList.remove("is-down")
    const leave = () => {
      root.classList.remove("is-on", "is-down")
      window.clearTimeout(idle)
    }
    // Leaving the page or entering an iframe: the frame keeps its own native cursor, so ours steps aside.
    const out = (e: PointerEvent) => {
      const to = e.relatedTarget as Element | null
      if (!to || to.tagName === "IFRAME") leave()
    }

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerdown", down, { passive: true })
    window.addEventListener("pointerup", up, { passive: true })
    document.addEventListener("pointerleave", leave)
    document.addEventListener("pointerout", out, { passive: true })
    window.addEventListener("blur", leave)

    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerdown", down)
      window.removeEventListener("pointerup", up)
      document.removeEventListener("pointerleave", leave)
      document.removeEventListener("pointerout", out)
      window.removeEventListener("blur", leave)
      window.clearTimeout(idle)
      gsap.killTweensOf([dotPos, ringPos])
      html.classList.remove("gb-cursor-on")
      root.remove()
    }
  }, [])

  return null
}
