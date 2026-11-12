"use client"

import { Briefcase, FolderSimplePlus, PenNib, Quotes, UploadSimple, type Icon } from "@phosphor-icons/react"
import Link from "next/link"
import { useEffect, useState, type ReactNode } from "react"

import { PageHeader } from "@/components/admin/admin-shell"
import { StatusBadge } from "@/components/admin/status-badge"
import { buttonVariants } from "@/components/ui/button"

type Message = { id: string; name: string; subject?: string | null; status: string; createdAt: string }
type Draft = { id: string; slug: string; title: string; status: string; updatedAt?: string; createdAt: string }
type Data = {
  name: string
  projects: number
  featured: number
  posts: number
  drafts: Draft[]
  messages: Message[]
  newMessages: number
  reviews: number
}

const QUICK: { icon: Icon; label: string; href: string }[] = [
  { icon: FolderSimplePlus, label: "New project", href: "/admin/projects/new" },
  { icon: PenNib, label: "New blog post", href: "/admin/blog/new" },
  { icon: Quotes, label: "Review the references", href: "/admin/testimonials" },
  { icon: Briefcase, label: "Add experience", href: "/admin/experiences/new" },
  { icon: UploadSimple, label: "Upload CV", href: "/admin/cv" },
]

const EAT_HOUR = new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Africa/Nairobi" })
const DAY = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Nairobi" })

function greeting(name: string) {
  const h = Number(EAT_HOUR.format(new Date()))
  const part = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"
  return name ? `${part}, ${name.split(/\s+/)[0]}` : part
}

function when(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  return days <= 0 ? "Today" : days === 1 ? "Yesterday" : days < 7 ? `${days} days ago` : DAY.format(new Date(iso))
}

async function json(url: string) {
  try {
    const res = await fetch(url)
    return res.ok ? await res.json() : null
  } catch {
    return null
  }
}

function Kpi({ label, value, sub, href }: { label: string; value: ReactNode; sub: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-5 text-ink no-underline transition-colors duration-fast ease-out hover:border-line-strong"
    >
      <span className="label text-ink-subtle">{label}</span>
      <span className="font-mono text-[32px] font-medium leading-[38px] tabular-nums">{value}</span>
      <span className="text-[13px] text-ink-muted">{sub}</span>
    </Link>
  )
}

function Table({ head, children, empty }: { head: string[]; children: ReactNode; empty: string | null }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-left text-xs text-ink-subtle">
            {head.map((h) => (
              <th key={h} scope="col" className="border-b border-line px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {empty ? (
            <tr>
              <td colSpan={head.length} className="px-4 py-6 text-center text-ink-muted">
                {empty}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  )
}

/** Admin dashboard (Admin-Dashboard board): what changed, and the next things to do. */
export default function AdminDashboard() {
  const [d, setD] = useState<Data | null>(null)

  useEffect(() => {
    Promise.all([
      json("/api/auth/me"),
      json("/api/projects"),
      json("/api/blog/posts?status=PUBLISHED&limit=1"),
      json("/api/blog/posts?status=DRAFT&limit=5"),
      json("/api/contact"),
      json("/api/testimonials?status=PENDING&source=CLIENT_REVIEW"),
    ]).then(([me, projects, posts, drafts, contact, reviews]) => {
      const msgs: Message[] = contact?.data ?? []
      setD({
        name: me?.user?.name ?? "",
        projects: projects?.count ?? 0,
        featured: (projects?.data ?? []).filter((p: { featured?: boolean }) => p.featured).length,
        posts: posts?.pagination?.total ?? 0,
        drafts: drafts?.data ?? [],
        messages: msgs.slice(0, 3),
        newMessages: msgs.filter((m) => m.status === "NEW").length,
        reviews: reviews?.data?.length ?? 0,
      })
    })
  }, [])

  const v = (n: number | undefined) => (d ? n : "–")

  return (
    <>
      <PageHeader crumb="Admin / Overview" title={d ? greeting(d.name) : "Dashboard"} description="Here’s what changed since you last logged in.">
        <a href="/" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View site
        </a>
        <Link href="/admin/projects/new" className={buttonVariants({ size: "sm" })}>
          New project
        </Link>
      </PageHeader>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4" aria-busy={!d}>
        <Kpi label="Projects" value={v(d?.projects)} sub={d ? `${d.featured} featured on the site` : "Loading"} href="/admin/projects" />
        <Kpi label="Blog posts" value={v(d?.posts)} sub={d ? `${d.drafts.length} in draft` : "Loading"} href="/admin/blog" />
        <Kpi label="New messages" value={v(d?.newMessages)} sub="Unread in the inbox" href="/admin/messages" />
        <Kpi label="Reviews waiting" value={v(d?.reviews)} sub="Client reviews to confirm" href="/admin/testimonials" />
      </div>

      <div className="flex flex-wrap items-start gap-6">
        <section className="flex min-w-0 flex-[3_1_520px] flex-col gap-3" aria-labelledby="dash-msgs">
          <div className="flex items-baseline justify-between">
            <h2 id="dash-msgs" className="title m-0">
              Latest messages
            </h2>
            <Link href="/admin/messages" className="text-[13px] text-ink-muted no-underline hover:text-ink">
              Open inbox
            </Link>
          </div>
          <Table head={["From", "Status", "Received"]} empty={!d ? "Loading" : d.messages.length ? null : "No messages yet."}>
            {d?.messages.map((m) => (
              <tr key={m.id} className="border-b border-line last:border-b-0">
                <td className="px-4 py-3">
                  <Link href="/admin/messages" className="font-medium text-ink no-underline hover:underline">
                    {m.name}
                  </Link>
                  {m.subject && <div className="text-[13px] text-ink-muted">{m.subject}</div>}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={m.status} />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-ink-subtle">{when(m.createdAt)}</td>
              </tr>
            ))}
          </Table>

          <h2 className="title mb-0 mt-4">Drafts</h2>
          <Table head={["Title", "Status", "Edited"]} empty={!d ? "Loading" : d.drafts.length ? null : "No drafts."}>
            {d?.drafts.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-b-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/blog/${p.slug}`} className="font-medium text-ink no-underline hover:underline">
                    {p.title}
                  </Link>
                  <div className="text-[13px] text-ink-muted">Blog post</div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-ink-subtle">{when(p.updatedAt ?? p.createdAt)}</td>
              </tr>
            ))}
          </Table>
        </section>

        <aside className="flex min-w-0 flex-[1_1_280px] flex-col gap-4">
          <div className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-5">
            <span className="label mb-1.5 text-ink-subtle">Quick actions</span>
            {QUICK.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="flex min-h-10 items-center gap-2.5 rounded-md px-2 text-sm text-ink-muted no-underline transition-colors duration-fast ease-out hover:bg-surface-raised hover:text-ink max-md:min-h-11"
              >
                <q.icon size={16} aria-hidden />
                {q.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-start gap-2.5 rounded-lg border border-line bg-surface p-5">
            <span className="label text-ink-subtle">CV</span>
            <strong className="font-mono text-[13px] font-medium">Lewis_Magangi_CV.pdf</strong>
            <Link href="/admin/cv" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Replace CV
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}
