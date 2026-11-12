"use client"

import { FilePdf, UploadSimple } from "@phosphor-icons/react"
import { useCallback, useEffect, useRef, useState } from "react"

import { PageHeader, refreshAdminCounts } from "@/components/admin/admin-shell"
import { StatusBadge } from "@/components/admin/status-badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Status = "PENDING" | "APPROVED" | "EXPIRED" | "REVOKED" | "DECLINED"
type Request = {
  id: string
  name: string
  email: string
  organisation: string
  reason: string
  note?: string | null
  status: Status
  createdAt: string
  expiresAt?: string | null
  lastViewedAt?: string | null
  viewCount: number
}
type FileInfo = { filename: string; size: number; updatedAt: string } | null
type Action = "approve" | "decline" | "revoke" | "reapprove"

const ACTIONS: Record<Status, Action[]> = {
  PENDING: ["approve", "decline"],
  APPROVED: ["revoke"],
  EXPIRED: ["reapprove"],
  REVOKED: ["reapprove"],
  DECLINED: [],
}
const FILTERS: [string, Status[] | null][] = [
  ["All", null],
  ["Pending", ["PENDING"]],
  ["Active", ["APPROVED"]],
  ["Closed", ["EXPIRED", "REVOKED"]],
  ["Declined", ["DECLINED"]],
]
const LABEL: Record<Status, string> = { PENDING: "Pending", APPROVED: "Active", EXPIRED: "Expired", REVOKED: "Revoked", DECLINED: "Declined" }
const TONE: Record<Status, "warn" | "success" | "neutral" | "danger"> = {
  PENDING: "warn",
  APPROVED: "success",
  EXPIRED: "neutral",
  REVOKED: "danger",
  DECLINED: "danger",
}

const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Nairobi" })
const DATETIME = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Nairobi",
})
const until = (r: Request) =>
  r.status === "APPROVED" && r.expiresAt ? DATE.format(new Date(r.expiresAt)) : r.status === "REVOKED" ? "Revoked" : r.status === "EXPIRED" && r.expiresAt ? `Closed ${DATE.format(new Date(r.expiresAt))}` : "None"
const kb = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : n < 1024 ? "under 1 KB" : `${Math.round(n / 1024)} KB`)

/** Admin › Transcripts (Admin-Transcripts board): requests to see the private transcript, and the file itself. */
export default function AdminTranscriptsPage() {
  const [requests, setRequests] = useState<Request[] | null>(null)
  const [file, setFile] = useState<FileInfo>(null)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [confirmRevoke, setConfirmRevoke] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<{ text: string; tone?: "danger" } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [manualLink, setManualLink] = useState<{ name: string; link: string } | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/transcripts")
      if (!res.ok) throw new Error(String(res.status))
      const { data } = await res.json()
      setRequests(data.requests)
      setFile(data.file)
      setError("")
      setSelected((s) => s ?? data.requests.find((r: Request) => r.status === "PENDING")?.id ?? data.requests[0]?.id ?? null)
    } catch {
      setError("Couldn’t load the requests. If you just added this feature, the database may need its new tables (npm run db:push).")
      setRequests([])
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!notice) return
    const t = setTimeout(() => setNotice(null), 6000)
    return () => clearTimeout(t)
  }, [notice])

  const act = async (r: Request, action: Action) => {
    setBusy(true)
    setConfirmRevoke(false)
    try {
      const res = await fetch(`/api/admin/transcripts/${r.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error)
      const first = r.name.split(/\s+/)[0]
      const date = body.data.expiresAt ? DATE.format(new Date(body.data.expiresAt)) : ""
      const mailNote = body.data.emailed ? "" : " The email didn’t send, so copy the link below and share it yourself."
      setManualLink(body.data.link ? { name: r.name, link: body.data.link } : null)
      setNotice(
        action === "decline"
          ? { text: `Declined. ${first} gets a short note, no link.${body.data.emailed ? "" : mailNote}`, tone: "danger" }
          : action === "revoke"
            ? { text: `Access revoked. ${first}’s link stopped working.`, tone: "danger" }
            : { text: `Approved. ${first} gets a private link that works until ${date}.${mailNote}` },
      )
      await load()
      refreshAdminCounts()
    } catch {
      setNotice({ text: "That didn’t go through. Try again.", tone: "danger" })
    } finally {
      setBusy(false)
    }
  }

  const upload = async (f: File) => {
    setUploading(true)
    const form = new FormData()
    form.append("file", f)
    try {
      const res = await fetch("/api/admin/transcripts/document", { method: "POST", body: form })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || "Upload failed.")
      setFile(body.data)
      setNotice({ text: "Transcript uploaded. Approved links show it straight away." })
    } catch (e) {
      setNotice({ text: e instanceof Error ? e.message : "Upload failed.", tone: "danger" })
    } finally {
      setUploading(false)
      if (fileInput.current) fileInput.current.value = ""
    }
  }

  const list = requests ?? []
  const shown = list.filter((r) => !FILTERS[filter][1] || FILTERS[filter][1]!.includes(r.status))
  const cur = list.find((r) => r.id === selected) ?? null

  return (
    <>
      <PageHeader
        crumb="Admin / Inbox"
        title="Transcript requests"
        description="People asking to see your academic transcript. Approving sends a private link that works for 60 days, then closes on its own."
      >
        <a href="/education#transcript-sec" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View on site
        </a>
      </PageHeader>

      {error && (
        <p role="alert" className="m-0 text-sm text-danger">
          {error}
        </p>
      )}
      <p aria-live="polite" className={cn("m-0 min-h-5 text-sm", notice?.tone === "danger" ? "text-danger" : "text-ink-muted")}>
        {notice?.text}
      </p>

      {manualLink && (
        <div className="flex flex-col gap-2 rounded-lg border border-line-strong bg-surface p-4" role="status">
          <span className="text-sm font-medium">Private link for {manualLink.name}</span>
          <span className="text-xs text-ink-subtle">Shown once. It isn’t stored anywhere you can see again; approve again to make a new one.</span>
          <div className="flex flex-wrap gap-2">
            <input readOnly value={manualLink.link} onFocus={(e) => e.currentTarget.select()} aria-label="Private link" className="min-h-10 min-w-0 flex-1 rounded-md border border-line-strong bg-bg px-3 font-mono text-xs text-ink" />
            <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => navigator.clipboard?.writeText(manualLink.link)}>
              Copy
            </button>
            <button type="button" className={buttonVariants({ variant: "ghost", size: "sm" })} onClick={() => setManualLink(null)}>
              Done
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-start gap-6">
        <section aria-labelledby="tr-list" className="flex min-w-0 flex-[3_1_520px] flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="tr-list" className="title m-0">
              Requests
            </h2>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter requests">
              {FILTERS.map(([label, statuses], i) => (
                <button key={label} type="button" className="gb-chip" aria-pressed={filter === i} onClick={() => setFilter(i)}>
                  {label}
                  <span className="gb-chip-n">{list.filter((r) => !statuses || statuses.includes(r.status)).length}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-subtle">
                  {["Requester", "Reason", "Status", "Access until", "Views"].map((h) => (
                    <th key={h} scope="col" className="border-b border-line px-4 py-2.5 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests === null ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-ink-muted">
                      Loading
                    </td>
                  </tr>
                ) : shown.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-ink-muted">
                      No requests here.
                    </td>
                  </tr>
                ) : (
                  shown.map((r) => (
                    <tr key={r.id} className={cn("border-b border-line last:border-b-0", r.id === selected && "bg-surface-raised")}>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-ink hover:underline"
                          aria-pressed={r.id === selected}
                          onClick={() => {
                            setSelected(r.id)
                            setConfirmRevoke(false)
                          }}
                        >
                          {r.name}
                        </button>
                        <div className="text-[13px] text-ink-muted">{r.organisation}</div>
                      </td>
                      <td className="px-4 py-3 text-ink-muted">{r.reason}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={r.status} label={LABEL[r.status]} tone={TONE[r.status]} />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-subtle">{until(r)}</td>
                      <td className="px-4 py-3 font-mono text-xs tabular-nums text-ink-subtle">{r.viewCount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p className="m-0 text-xs text-ink-subtle">Links close on their own after 60 days, at midnight EAT.</p>
        </section>

        <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
          <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5" aria-label="Selected request">
            {cur ? (
              <>
                <h2 className="title m-0">Request from {cur.name}</h2>
                <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                  <dt className="text-ink-subtle">Organisation</dt>
                  <dd className="m-0">{cur.organisation}</dd>
                  <dt className="text-ink-subtle">Email</dt>
                  <dd className="m-0 break-all">
                    <a href={`mailto:${cur.email}`}>{cur.email}</a>
                  </dd>
                  <dt className="text-ink-subtle">Reason</dt>
                  <dd className="m-0">{cur.reason}</dd>
                  <dt className="text-ink-subtle">Asked</dt>
                  <dd className="m-0">{DATETIME.format(new Date(cur.createdAt))} EAT</dd>
                  {cur.lastViewedAt && (
                    <>
                      <dt className="text-ink-subtle">Last opened</dt>
                      <dd className="m-0">{DATETIME.format(new Date(cur.lastViewedAt))} EAT</dd>
                    </>
                  )}
                </dl>
                {cur.note && <p className="m-0 border-l border-line-strong pl-3 text-sm text-ink-muted">“{cur.note}”</p>}
                <div className="-mx-5 -mb-5 mt-2 flex flex-wrap justify-end gap-2 border-t border-line px-5 py-4">
                  {ACTIONS[cur.status].length === 0 && <span className="text-sm text-ink-muted">Declined. Nothing else to do.</span>}
                  {ACTIONS[cur.status].includes("decline") && (
                    <button type="button" disabled={busy} className={buttonVariants({ variant: "ghost", size: "sm" })} onClick={() => act(cur, "decline")}>
                      Decline
                    </button>
                  )}
                  {(ACTIONS[cur.status].includes("approve") || ACTIONS[cur.status].includes("reapprove")) && (
                    <button
                      type="button"
                      disabled={busy || !file}
                      title={file ? undefined : "Upload the transcript first"}
                      className={cn(buttonVariants({ size: "sm" }), "disabled:opacity-60")}
                      onClick={() => act(cur, cur.status === "PENDING" ? "approve" : "reapprove")}
                    >
                      {cur.status === "PENDING" ? "Approve for 60 days" : "Approve again for 60 days"}
                    </button>
                  )}
                  {ACTIONS[cur.status].includes("revoke") &&
                    (confirmRevoke ? (
                      <div className="flex w-full flex-col gap-2">
                        <p className="m-0 text-sm text-ink-muted">
                          Their link stops working straight away and the transcript is hidden again. They can send a new request.
                        </p>
                        <div className="flex justify-end gap-2">
                          <button type="button" className={buttonVariants({ variant: "ghost", size: "sm" })} onClick={() => setConfirmRevoke(false)}>
                            Keep access
                          </button>
                          <button type="button" disabled={busy} className={buttonVariants({ variant: "destructive", size: "sm" })} onClick={() => act(cur, "revoke")}>
                            Revoke access
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => setConfirmRevoke(true)}>
                        Revoke access
                      </button>
                    ))}
                </div>
                {!file && (ACTIONS[cur.status].includes("approve") || ACTIONS[cur.status].includes("reapprove")) && (
                  <p className="m-0 text-xs text-ink-subtle">Upload the transcript below before approving, so the link has something to open.</p>
                )}
              </>
            ) : (
              <p className="m-0 text-sm text-ink-muted">No requests yet. New ones land here, and you get an email.</p>
            )}
          </div>

          <div className="flex flex-col items-start gap-2.5 rounded-lg border border-line bg-surface p-5">
            <span className="label text-ink-subtle">The transcript</span>
            {file ? (
              <span className="flex items-center gap-2 text-sm">
                <FilePdf size={18} aria-hidden />
                <span className="font-mono text-[13px]">{file.filename}</span>
                <span className="text-ink-subtle">
                  {kb(file.size)}, {DATE.format(new Date(file.updatedAt))}
                </span>
              </span>
            ) : (
              <span className="text-sm text-ink-muted">Not uploaded yet. Approved links can’t show anything until it is.</span>
            )}
            <span className="text-xs text-ink-subtle">PDF, under 4 MB. Stored privately; it’s only served through an approved link.</span>
            <input
              ref={fileInput}
              type="file"
              accept="application/pdf"
              className="sr-only"
              id="tr-file"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) upload(f)
              }}
            />
            <label htmlFor="tr-file" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer", uploading && "pointer-events-none opacity-60")}>
              <UploadSimple size={15} aria-hidden />
              {uploading ? "Uploading" : file ? "Replace PDF" : "Upload PDF"}
            </label>
          </div>
        </aside>
      </div>
    </>
  )
}
