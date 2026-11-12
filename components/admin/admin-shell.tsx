"use client"

import {
  ArrowSquareOut,
  Briefcase,
  ChartBar,
  FileText,
  Folder,
  GraduationCap,
  Handshake,
  Horse,
  LockSimple,
  PenNib,
  Quotes,
  SignOut,
  SquaresFour,
  Stack,
  Tray,
  User,
  type Icon,
} from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type Item = { label: string; href: string; icon: Icon; count?: "reviews" | "messages" | "transcripts" }

// The Gambit admin groups (AdminSidebar), limited to the admin pages that exist today.
const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: SquaresFour },
      { label: "Analytics", href: "/admin/analytics", icon: ChartBar },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Projects", href: "/admin/projects", icon: Folder },
      { label: "Services", href: "/admin/services", icon: Handshake },
      { label: "Blog", href: "/admin/blog", icon: PenNib },
      { label: "References", href: "/admin/testimonials", icon: Quotes, count: "reviews" },
      { label: "Experience", href: "/admin/experiences", icon: Briefcase },
      { label: "Education", href: "/admin/education", icon: GraduationCap },
      { label: "Skills", href: "/admin/skills", icon: Stack },
      { label: "Chess", href: "/admin/chess", icon: Horse },
    ],
  },
  {
    title: "Inbox",
    items: [
      { label: "Messages", href: "/admin/messages", icon: Tray, count: "messages" },
      { label: "Transcripts", href: "/admin/transcripts", icon: LockSimple, count: "transcripts" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Profile", href: "/admin/profile", icon: User },
      { label: "CV", href: "/admin/cv", icon: FileText },
    ],
  },
]

/** Admin pages call this after anything that changes a sidebar count. */
export const refreshAdminCounts = () => window.dispatchEvent(new Event("admin:counts"))

/** Pages that render without the shell. */
const BARE = ["/admin/login", "/admin/setup"]

async function count(url: string, pick: (data: unknown) => unknown[] = (d) => (Array.isArray(d) ? d : [])) {
  try {
    const res = await fetch(url)
    if (!res.ok) return 0
    const data = await res.json()
    return pick(data.data).length
  } catch {
    return 0
  }
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [counts, setCounts] = useState({ reviews: 0, messages: 0, transcripts: 0 })
  const [open, setOpen] = useState(false)
  const bare = BARE.some((p) => pathname.startsWith(p))

  // Waiting reviews and new messages, refreshed on each page change.
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const on = () => setTick((n) => n + 1)
    window.addEventListener("admin:counts", on)
    return () => window.removeEventListener("admin:counts", on)
  }, [])

  useEffect(() => {
    if (bare) return
    let live = true
    Promise.all([
      count("/api/testimonials?status=PENDING&source=CLIENT_REVIEW"),
      count("/api/contact?status=NEW"),
      count("/api/admin/transcripts", (d) =>
        ((d as { requests?: { status: string }[] })?.requests ?? []).filter((r) => r.status === "PENDING"),
      ),
    ]).then(([reviews, messages, transcripts]) => live && setCounts({ reviews, messages, transcripts }))
    return () => {
      live = false
    }
  }, [pathname, bare, tick])

  // Close the phone menu on each page change.
  useEffect(() => setOpen(false), [pathname])

  if (bare) return <>{children}</>

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href))

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {})
    window.location.href = "/admin/login"
  }

  return (
    // Dark until every admin page is restyled; the older pages still hard-code light text.
    <div data-theme="dark" className="flex min-h-screen bg-bg font-sans text-ink">
      <a href="#admin-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-skip focus:rounded-md focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>

      <button
        type="button"
        className="fixed left-4 top-4 z-nav hidden min-h-11 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm max-md:inline-flex"
        aria-expanded={open}
        aria-controls="admin-side"
        onClick={() => setOpen((o) => !o)}
      >
        <SquaresFour size={16} aria-hidden />
        Menu
      </button>

      <aside
        id="admin-side"
        aria-label="Admin"
        className={cn(
          "gb-side sticky top-0 h-screen overflow-y-auto",
          "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-nav max-md:shadow-2xl max-md:transition-transform max-md:duration-open max-md:ease-out",
          open ? "max-md:translate-x-0" : "max-md:-translate-x-full",
        )}
      >
        <div className="gb-side-brand">
          <span className="gb-mono">LM</span>
          <span>Admin</span>
          <small>CMS</small>
        </div>
        {GROUPS.map((g) => (
          <nav key={g.title} className="gb-side-group" aria-label={g.title}>
            <div className="gb-side-title">{g.title}</div>
            {g.items.map((it) => {
              const n = it.count ? counts[it.count] : 0
              return (
                <Link key={it.href} href={it.href} aria-current={isActive(it.href) ? "page" : undefined}>
                  <it.icon size={16} aria-hidden />
                  {it.label}
                  {n > 0 && (
                    <span className="gb-side-count" aria-label={`${n} new`}>
                      {n}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        ))}
        <div className="gb-side-foot">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ArrowSquareOut size={16} aria-hidden />
            View site
          </a>
          <button type="button" onClick={logout}>
            <SignOut size={16} aria-hidden />
            Log out
          </button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-[49] bg-black/50 md:hidden" aria-hidden onClick={() => setOpen(false)} />}

      <main id="admin-main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
        <div className="mx-auto box-border flex max-w-[1180px] flex-col gap-7 p-8 max-md:px-4 max-md:pt-20">{children}</div>
      </main>
    </div>
  )
}

/** Gambit PageHeader: crumb, title, description, and actions on the right. */
export function PageHeader({
  crumb,
  title,
  description,
  children,
}: {
  crumb?: string
  title: string
  description?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="gb-ph">
      <div>
        {crumb && <div className="gb-ph-crumb">{crumb}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children && <div className="gb-ph-actions">{children}</div>}
    </div>
  )
}
