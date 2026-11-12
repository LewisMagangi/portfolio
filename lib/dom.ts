// Small browser helpers shared by the Gambit components (ported from bundle.js).

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

/** Mouse and trackpad only: the custom cursor never runs on touch. */
export function canHover(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches
  } catch {
    return false
  }
}

export function lockScroll(on: boolean): void {
  const root = document.documentElement
  if (on) {
    root.dataset.gbLock = root.style.overflow || ""
    root.style.overflow = "hidden"
  } else {
    root.style.overflow = root.dataset.gbLock || ""
    delete root.dataset.gbLock
  }
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/** Keep Tab inside `root` while a sheet or dialog is open. */
export function trapTab(e: KeyboardEvent, root: Element | null): void {
  if (e.key !== "Tab" || !root) return
  const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null,
  )
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

/** "6 May to 6 Aug 2024": a day never wraps away from its month, nor a month from its year. */
export function keepDates(text: string): string {
  return text
    .replace(/(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, "$1 $2")
    .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})/g, "$1 $2")
}
