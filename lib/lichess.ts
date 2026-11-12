// Server only. Fetches Lique's five best rated wins per time control from Lichess, in the shape of the ChessGame cache.
// Endpoints (as in lichess-best-wins.json › source): /api/user/{user}/perf/{speed} for stat.bestWins, then one bulk
// export of those games with moves, opening and clocks. Four requests in all, made one at a time as Lichess asks.
import { Chess } from "chess.js"

import { prisma } from "@/lib/prisma"

export const LICHESS_USER = "Lique"
export const SPEEDS = ["bullet", "blitz", "rapid"] as const
const HEADERS = { "User-Agent": "portfolio-best-wins/1.0" }

type BestWin = { opRating: number; opId: { id: string; name: string }; at: string; gameId: string }
type ExportedGame = {
  id: string
  createdAt: number
  status: string
  winner?: "white" | "black"
  players: Record<"white" | "black", { user?: { name: string }; rating?: number }>
  opening?: { name: string }
  moves: string
  clocks?: number[]
  clock?: { initial: number; increment: number }
}

export type ChessGameRow = {
  lichessId: string
  speed: string
  rank: number
  me: string
  opp: string
  oppRating: number
  myRating: number
  opening: string | null
  clock: string | null
  playedAt: Date
  result: string
  how: string | null
  uci: string
  san: string
  clocks: number[] | undefined
}

const HOW: Record<string, string> = {
  mate: "Checkmate",
  outoftime: "Won on time",
  resign: "Opponent resigned",
  timeout: "Opponent left the game",
  variantEnd: "Won",
}

async function get(url: string, accept = "application/json", init?: RequestInit) {
  const res = await fetch(url, { ...init, headers: { ...HEADERS, Accept: accept }, cache: "no-store" })
  if (res.status === 429) throw new Error("Lichess is rate limiting this server. Wait a minute and try again.")
  if (!res.ok) throw new Error(`Lichess answered ${res.status} for ${new URL(url).pathname}.`)
  return res
}

/** SAN as Lichess exports it, to the UCI the GameTheatre replays. Throws on an illegal move. */
export function sanToUci(san: string) {
  const board = new Chess()
  return san
    .split(" ")
    .filter(Boolean)
    .map((s) => {
      const m = board.move(s)
      return m.from + m.to + (m.promotion ?? "")
    })
    .join(" ")
}

export async function fetchBestWins(user = LICHESS_USER): Promise<ChessGameRow[]> {
  const ranked: { speed: string; rank: number; id: string }[] = []
  for (const speed of SPEEDS) {
    const perf = await (await get(`https://lichess.org/api/user/${user}/perf/${speed}`)).json()
    const wins: BestWin[] = perf?.stat?.bestWins?.results ?? []
    wins.slice(0, 5).forEach((w, i) => ranked.push({ speed, rank: i + 1, id: w.gameId }))
  }
  if (ranked.length === 0) throw new Error("Lichess returned no best wins.")

  const params = "moves=true&opening=true&clocks=true&pgnInJson=false"
  const body = await (
    await get(`https://lichess.org/api/games/export/_ids?${params}`, "application/x-ndjson", {
      method: "POST",
      body: ranked.map((r) => r.id).join(","),
    })
  ).text()
  const games = new Map<string, ExportedGame>()
  for (const line of body.split("\n")) {
    if (!line.trim()) continue
    const g = JSON.parse(line) as ExportedGame
    games.set(g.id, g)
  }

  const me = user.toLowerCase()
  return ranked.flatMap(({ speed, rank, id }) => {
    const g = games.get(id)
    if (!g) return []
    const side = g.players.white.user?.name.toLowerCase() === me ? "white" : "black"
    const other = side === "white" ? "black" : "white"
    return [
      {
        lichessId: g.id,
        speed,
        rank,
        me: side,
        opp: g.players[other].user?.name ?? "Anonymous",
        oppRating: g.players[other].rating ?? 0,
        myRating: g.players[side].rating ?? 0,
        opening: g.opening?.name ?? null,
        clock: g.clock ? `${g.clock.initial}+${g.clock.increment}` : null,
        playedAt: new Date(g.createdAt),
        result: g.winner === "white" ? "1-0" : g.winner === "black" ? "0-1" : "1/2-1/2",
        how: HOW[g.status] ?? null,
        uci: sanToUci(g.moves),
        san: g.moves,
        // Lichess gives centiseconds; the theatre reads tenths.
        clocks: g.clocks?.map((c) => Math.round(c / 10)),
      },
    ]
  })
}

/** Replaces the ChessGame cache with a fresh fetch. Returns the number of games stored. */
export async function refreshBestWins() {
  const rows = await fetchBestWins()
  await prisma.$transaction([
    prisma.chessGame.deleteMany({}),
    prisma.chessGame.createMany({ data: rows.map((r) => ({ ...r, clocks: r.clocks ?? undefined })) }),
  ])
  return rows.length
}
