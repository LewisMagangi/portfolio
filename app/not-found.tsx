import type { Metadata } from "next"
import Link from "next/link"

import { Shader } from "@/components/site/shader"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = { title: "Page not found" }

// Copy from design/v8/boards/Not-Found.dc.html. The Chess line follows v8: the annotated game was removed
// (HANDOFF › Chess), so it uses the nav's current note instead.
const PAGES = [
  { t: "Work", s: "Case studies and projects", href: "/work" },
  { t: "Career", s: "2020 to now", href: "/career" },
  { t: "Services", s: "What I build and what it costs", href: "/services" },
  { t: "Chess", s: "Results, the game, a challenge", href: "/chess" },
  { t: "Book a call", s: "Free, 30 minutes", href: "/book" },
]

export default function NotFound() {
  return (
    <div className="gb-motion">
      <SiteNav />
      <main id="content" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden border-b border-line">
          <Shader shape="ripple" type="8x8" size={3} speed={0.12} front="line-strong" fade="right" opacity={0.5} />
          <div className="relative mx-auto flex max-w-content flex-wrap items-center gap-16 px-8 py-32 max-md:px-4 max-md:py-20">
            <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-5">
              <span className="font-mono text-sm text-ink-subtle">404</span>
              <h1 className="display-xl m-0 max-w-[640px]">Illegal move.</h1>
              <p className="lead m-0 max-w-[520px] text-ink-muted">
                There’s no page at this address. It may have moved, or the link has a typo. Here’s where you can go
                from here.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/" className={buttonVariants()}>
                  Back to home
                </Link>
                <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
                  Report a broken link
                </Link>
              </div>
            </div>
            <nav aria-label="Popular pages" className="min-w-0 flex-[1_1_320px]">
              {PAGES.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex min-h-14 items-center justify-between gap-4 border-t border-line px-1 text-ink no-underline transition-colors duration-fast ease-out hover:bg-surface-raised"
                >
                  <strong className="font-semibold">{p.t}</strong>
                  <span className="text-sm text-ink-muted">{p.s}</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
