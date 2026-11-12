import { LockSimple, ShieldCheck } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { ACCESS_DAYS, checkAccess, formatDate } from "@/lib/transcripts"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Academic transcript",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
}

/** What an approved requester sees (Transcript board, Gambit AccessViewer), and what an old link shows. */
export default async function TranscriptPage({ params }: { params: { token: string } }) {
  const access = await checkAccess(params.token, { recordView: true })
  if (access.state === "missing") notFound()

  return (
    <div className="mx-auto box-border flex max-w-content flex-col gap-8 px-8 pb-24 pt-[72px] max-sm:px-4 max-sm:pb-16 max-sm:pt-12">
      <div className="flex max-w-[680px] flex-col gap-4">
        <h1 className="display m-0">Academic transcript</h1>
        <p className="lead m-0 text-ink-muted">
          BSc Computer Forensics Science, Jaramogi Oginga Odinga University of Science and Technology. Shared privately through an approved
          request.
        </p>
      </div>

      {access.state === "closed" ? (
        <section aria-label="Shared document" className="flex flex-col gap-4">
          <div role="alert" className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface p-4">
            <LockSimple size={18} aria-hidden />
            <p className="m-0 min-w-0 flex-1 text-sm">
              <strong>
                {access.reason === "revoked"
                  ? "This link has been closed."
                  : `This link closed${access.closedOn ? ` on ${formatDate(access.closedOn)}` : ""}.`}
              </strong>{" "}
              Access lasts {ACCESS_DAYS} days. You can ask again; I’ll see the new request.
            </p>
            <Link href="/education#transcript-sec" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Request again
            </Link>
          </div>
        </section>
      ) : (
        <section aria-label="Shared document" className="flex flex-col gap-4">
          <div role="status" className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface p-4">
            <ShieldCheck size={18} aria-hidden />
            <p className="m-0 min-w-0 flex-1 text-sm">
              <strong>
                Shared with {access.request.name}, {access.request.organisation}.
              </strong>{" "}
              Access ends {formatDate(access.request.expiresAt)}, {access.request.daysLeft} {access.request.daysLeft === 1 ? "day" : "days"} from
              now.
            </p>
            <span
              className="relative h-1.5 w-28 overflow-hidden rounded-full bg-surface-raised"
              role="img"
              aria-label={`${access.request.daysLeft} of ${ACCESS_DAYS} days left`}
            >
              <i className="absolute inset-y-0 left-0 rounded-full bg-ink" style={{ width: `${Math.round((access.request.daysLeft / ACCESS_DAYS) * 100)}%` }} />
            </span>
          </div>
          {access.hasFile ? (
            <div className="relative overflow-hidden rounded-lg border border-line bg-surface">
              <iframe
                src={`/api/transcript/${params.token}/file#toolbar=0`}
                title="Lewis Magangi, BSc transcript"
                className="block h-[min(1100px,85vh)] w-full border-0"
              />
              <span className="pointer-events-none absolute bottom-3 right-4 rounded-sm bg-bg/80 px-2 py-1 font-mono text-xs text-ink-subtle">
                Viewed by {access.request.name}, {formatDate(new Date())}
              </span>
            </div>
          ) : (
            <p className="m-0 rounded-lg border border-dashed border-line-strong p-6 text-center text-sm text-ink-muted">
              The transcript is being uploaded. Open this link again shortly; it stays valid until {formatDate(access.request.expiresAt)}.
            </p>
          )}
        </section>
      )}
    </div>
  )
}
