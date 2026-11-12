"use client"

import { ArrowsClockwise } from "@phosphor-icons/react"
import { useCallback, useEffect, useState } from "react"

import { PageHeader } from "@/components/admin/admin-shell"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Game = {
  lichessId: string
  speed: string
  rank: number
  me: string
  opp: string
  oppRating: number
  myRating: number
  opening: string | null
  clock: string | null
  playedAt: string
  how: string | null
  refreshedAt: string
}

const SPEEDS = ["bullet", "blitz", "rapid"]
const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Nairobi" })
const DATETIME = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Nairobi",
})
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** Admin › Chess: the best wins the Chess page replays, refreshed from Lichess on demand. */
export default function AdminChessPage() {
  const [games, setGames] = useState<Game[] | null>(null)
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<{ text: string; tone?: "danger" } | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/chess")
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error)
      setGames(body.data.games)
      setError("")
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Couldn’t load the chess cache.")
      setGames([])
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const refresh = async () => {
    setBusy(true)
    setNotice(null)
    try {
      const res = await fetch("/api/admin/chess", { method: "POST" })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || "The refresh didn’t go through. Try again.")
      setGames(body.data.games)
      setError("")
      setNotice({ text: `Refreshed. ${body.data.stored} games stored, and the Chess page shows them now.` })
    } catch (e) {
      setNotice({ text: e instanceof Error ? e.message : "The refresh didn’t go through. Try again.", tone: "danger" })
    } finally {
      setBusy(false)
    }
  }

  const list = games ?? []
  const refreshedAt = list[0]?.refreshedAt

  return (
    <>
      <PageHeader
        crumb="Admin / Content"
        title="Chess"
        description="Your five best rated Lichess wins in bullet, blitz and rapid, which the board on the Chess page replays."
      >
        <a href="/chess" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
          View on site
        </a>
        <button type="button" disabled={busy} onClick={refresh} className={cn(buttonVariants({ size: "sm" }), "gap-2 disabled:opacity-60")}>
          <ArrowsClockwise size={16} aria-hidden className={cn(busy && "animate-spin motion-reduce:animate-none")} />
          {busy ? "Refreshing" : "Refresh best wins from Lichess"}
        </button>
      </PageHeader>

      {error && (
        <p role="alert" className="m-0 text-sm text-danger">
          {error}
        </p>
      )}
      <p aria-live="polite" className={cn("m-0 min-h-5 text-sm", notice?.tone === "danger" ? "text-danger" : "text-ink-muted")}>
        {notice?.text}
      </p>

      <section aria-labelledby="chess-list" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="chess-list" className="title m-0">
            Best wins
          </h2>
          <span className="text-[13px] text-ink-muted">
            {refreshedAt
              ? `Last refreshed ${DATETIME.format(new Date(refreshedAt))} EAT`
              : games === null
                ? ""
                : "Not refreshed yet. The site shows the snapshot from 10 Nov 2026."}
          </span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs text-ink-subtle">
                {["Win", "Opponent", "Opening", "Ended", "Played"].map((h) => (
                  <th key={h} scope="col" className="border-b border-line px-4 py-2.5 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {games === null ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ink-muted">
                    Loading
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ink-muted">
                    Nothing cached yet. Refresh to pull your best wins from Lichess.
                  </td>
                </tr>
              ) : (
                [...list]
                  .sort((a, b) => SPEEDS.indexOf(a.speed) - SPEEDS.indexOf(b.speed) || a.rank - b.rank)
                  .map((g) => (
                    <tr key={g.lichessId} className="border-b border-line last:border-b-0">
                      <td className="px-4 py-3">
                        <a
                          href={`https://lichess.org/${g.lichessId}${g.me === "black" ? "/black" : ""}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-ink hover:underline"
                        >
                          {cap(g.speed)} #{g.rank}
                        </a>
                        <div className="font-mono text-xs text-ink-subtle">{g.clock}</div>
                      </td>
                      <td className="px-4 py-3">
                        {g.opp} <span className="font-mono text-xs tabular-nums text-ink-subtle">{g.oppRating}</span>
                        <div className="text-[13px] text-ink-muted">
                          You, as {g.me}, rated {g.myRating}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ink-muted">{g.opening}</td>
                      <td className="px-4 py-3 text-ink-muted">{g.how}</td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-subtle">{DATE.format(new Date(g.playedAt))}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        <p className="m-0 text-xs text-ink-subtle">
          Ranks come from Lichess’s best wins for each time control.
        </p>
      </section>
    </>
  )
}
