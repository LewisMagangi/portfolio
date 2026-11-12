import { CalendarBlank } from "@phosphor-icons/react/dist/ssr/CalendarBlank"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { BOOK_HREF, FOOTER, FOOTER_BLURB, LEGAL } from "@/lib/site"
import { cn } from "@/lib/utils"

import { Brand } from "./site-nav"

const linkClass =
  "inline-flex min-h-6 items-center text-sm text-ink-muted no-underline transition-colors duration-fast ease-out hover:text-ink max-md:min-h-11"

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-content grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] gap-8 px-8 pb-12 pt-16 max-lg:grid-cols-3 max-sm:grid-cols-2 max-md:px-4">
        <div className="flex flex-col items-start gap-4 max-lg:col-span-full">
          <Brand />
          <p className="m-0 max-w-[320px] text-sm text-ink-muted">{FOOTER_BLURB}</p>
          <Link href={BOOK_HREF} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            <CalendarBlank size={15} aria-hidden />
            Book a free discovery call
          </Link>
        </div>
        {FOOTER.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="mb-3 mt-0 text-xs font-medium text-ink-subtle">{col.title}</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0 max-md:gap-0">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-content flex-wrap justify-between gap-x-6 gap-y-3 border-t border-line px-8 pb-8 pt-4 text-xs text-ink-subtle max-md:px-4 max-md:[body:has([data-bookbar])_&]:pb-24">
        <span>© 2026 Lewis Magangi, Nairobi, Kenya</span>
        <span className="inline-flex flex-wrap gap-6">
          {LEGAL.map((l) => (
            <Link key={l.label} href={l.href} className={cn(linkClass, "text-xs text-ink-subtle")}>
              {l.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  )
}
