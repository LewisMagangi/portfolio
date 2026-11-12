"use client"

import { CalendarBlank, CaretRight } from "@phosphor-icons/react"
import gsap from "gsap"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { lockScroll, prefersReducedMotion, trapTab } from "@/lib/dom"
import { BOOK_HREF, NAV } from "@/lib/site"
import { cn } from "@/lib/utils"

import { ThemeToggle } from "./theme-toggle"

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Lewis Magangi, home"
      className={cn("flex items-center gap-2.5 text-sm font-semibold text-ink no-underline", className)}
    >
      <span className="grid size-7 place-items-center rounded-sm border border-line-strong font-mono text-xs font-semibold">
        LM
      </span>
      <span className="whitespace-nowrap max-[360px]:hidden">Lewis Magangi</span>
    </Link>
  )
}

function MenuGlyph({ open }: { open: boolean }) {
  const line = "absolute inset-x-0 h-[1.5px] rounded-sm bg-current transition-[transform,top] duration-open ease-out"
  return (
    <span aria-hidden className="relative block h-3 w-[18px]">
      <i className={cn(line, open ? "top-[5.25px] rotate-45" : "top-0.5")} />
      <i className={cn(line, open ? "top-[5.25px] -rotate-45" : "top-[9px]")} />
    </span>
  )
}

/** Exactly Work, Services, Career and Chess, plus Book. A floating pill on desktop; a bar and a sheet under 820px. */
export function SiteNav({ ctaLabel = "Book a call" }: { ctaLabel?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  // Close the sheet on navigation, including back and forward (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const sheet = sheetRef.current
    if (!open || !sheet) return
    lockScroll(true)

    const items = sheet.querySelectorAll("[data-sheet-item]")
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        sheet,
        { clipPath: "inset(0 0 100% 0 round 24px)" },
        { clipPath: "inset(0 0 0% 0 round 24px)", duration: 0.5, ease: "expo.out" },
      )
      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: Math.min(0.06, 0.4 / Math.max(items.length, 1)),
          delay: 0.08,
        },
      )
    }
    sheet.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        menuBtnRef.current?.focus()
      } else {
        trapTab(e, sheet.parentElement)
      }
    }
    const onResize = () => {
      if (window.innerWidth > 820) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
      gsap.killTweensOf([sheet, items])
      lockScroll(false)
    }
  }, [open])

  return (
    <>
      <a
        href="#content"
        className="absolute -top-16 left-4 z-skip rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-[top] duration-fast ease-out focus:top-2"
      >
        Skip to content
      </a>

      <header className="pointer-events-none sticky top-3 z-[52] px-4 max-md:top-2 max-md:px-2">
        <nav
          aria-label="Main"
          className={cn(
            "pointer-events-auto mx-auto flex h-14 max-w-[880px] items-center gap-4 rounded-full border border-line pl-4 pr-2",
            "bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-[16px] backdrop-saturate-[1.6]",
            "max-md:gap-2 max-md:pl-2 max-md:pr-1.5 max-md:bg-[color-mix(in_srgb,var(--bg)_78%,transparent)]",
          )}
        >
          <Brand />

          <div className="flex flex-1 justify-center gap-1 max-md:hidden">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium leading-5 text-ink-muted no-underline",
                  "transition-colors duration-fast ease-out hover:bg-surface-raised hover:text-ink",
                  "aria-[current=page]:bg-surface-raised aria-[current=page]:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 max-md:ml-auto max-md:gap-1">
            <ThemeToggle className="max-md:hidden" />
            <Link
              href={BOOK_HREF}
              data-nav-book
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-full max-md:h-10 max-md:min-h-10 max-md:px-3.5",
              )}
            >
              <CalendarBlank size={15} aria-hidden />
              <span className="max-md:hidden">{ctaLabel}</span>
              <span className="md:hidden">Book</span>
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              aria-expanded={open}
              aria-controls="site-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="hidden size-11 place-items-center rounded-full text-ink transition-colors duration-fast ease-out hover:bg-surface-raised max-md:inline-grid"
            >
              <MenuGlyph open={open} />
            </button>
          </div>
        </nav>

        {open && (
          <div
            id="site-sheet"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="pointer-events-auto fixed inset-x-2 bottom-2 top-[72px] z-[51] flex flex-col justify-between gap-6 overflow-y-auto overscroll-contain rounded-2xl border border-line bg-bg px-2 pb-4 pt-2 md:hidden"
          >
            <ol className="m-0 list-none p-0">
              {NAV.map((item, i) => (
                <li key={item.href} data-sheet-item className={cn(i > 0 && "border-t border-line")}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="group grid grid-cols-[28px_minmax(0,1fr)_20px] items-center gap-3 rounded-2xl px-3 py-4 text-ink no-underline hover:bg-surface focus-visible:bg-surface focus-visible:outline-offset-[-2px]"
                  >
                    <span aria-hidden className="font-mono text-xs text-ink-subtle group-aria-[current=page]:text-ink">
                      {i + 1}.
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <strong className="text-2xl font-medium leading-8 tracking-[-0.01em]">{item.label}</strong>
                      <span className="text-sm leading-5 text-ink-muted">{item.note}</span>
                    </span>
                    <CaretRight size={18} aria-hidden className="text-ink-subtle" />
                  </Link>
                </li>
              ))}
            </ol>
            <div data-sheet-item className="flex flex-col gap-4 px-1">
              <Link
                href={BOOK_HREF}
                onClick={() => setOpen(false)}
                className={cn(buttonVariants(), "min-h-12 justify-center rounded-full")}
              >
                <CalendarBlank size={16} aria-hidden />
                Book a free discovery call
              </Link>
              <div className="flex items-center justify-between px-2 text-sm text-ink-muted">
                <span>Theme</span>
                <ThemeToggle large />
              </div>
            </div>
          </div>
        )}
      </header>

      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-nav bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] backdrop-blur-[6px] md:hidden"
        />
      )}
    </>
  )
}
