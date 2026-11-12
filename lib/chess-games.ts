// Server only. Lique's best rated Lichess wins for the Chess page GameTheatre.
// Reads the ChessGame cache (filled by "Refresh best wins from Lichess" in Admin › Chess) and falls back to
// the bundled snapshot in lib/content/lichess-best-wins.json when the cache is empty or unreachable.
import type { TheatreGame } from "@/components/gambit/game-theatre"
import BEST_WINS from "@/lib/content/lichess-best-wins.json"
import { prisma } from "@/lib/prisma"

const SPEEDS = ["bullet", "blitz", "rapid"]
const ORDINAL = ["1st", "2nd", "3rd", "4th", "5th"]

export const winLabel = (rank: number, speed: string) => `${ORDINAL[rank - 1] ?? `${rank}th`} best rated ${speed} win`

const dateLabel = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Nairobi" })

function fromSnapshot(): TheatreGame[] {
  return BEST_WINS.games.map((g) => ({
    label: g.label,
    speed: g.speed,
    rank: String(g.rank),
    me: g.me,
    opp: g.opp,
    oppRating: String(g.oppRating),
    myRating: String(g.myRating),
    opening: g.opening,
    clock: g.clock,
    date: g.date,
    how: g.how,
    url: g.url,
    uci: g.uci,
    san: g.san,
    clocks: g.clocks,
  }))
}

export async function getBestWins(): Promise<TheatreGame[]> {
  try {
    const rows = await prisma.chessGame.findMany({ orderBy: [{ rank: "asc" }] })
    if (rows.length === 0) return fromSnapshot()
    return rows
      .sort((a, b) => SPEEDS.indexOf(a.speed) - SPEEDS.indexOf(b.speed) || a.rank - b.rank)
      .map((r) => ({
        label: winLabel(r.rank, r.speed),
        speed: r.speed,
        rank: String(r.rank),
        me: r.me,
        opp: r.opp,
        oppRating: String(r.oppRating),
        myRating: String(r.myRating),
        opening: r.opening ?? "",
        clock: r.clock ?? "",
        date: dateLabel(r.playedAt),
        how: r.how ?? "",
        url: `https://lichess.org/${r.lichessId}${r.me === "black" ? "/black" : ""}`,
        uci: r.uci,
        san: r.san,
        clocks: Array.isArray(r.clocks) ? (r.clocks as number[]) : typeof r.clocks === "string" ? r.clocks : undefined,
      }))
  } catch {
    // No database, or the table isn't pushed yet: the snapshot is the same data as of 10 Nov 2026.
    return fromSnapshot()
  }
}
