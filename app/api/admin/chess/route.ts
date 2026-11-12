// Admin › Chess: the cached best wins the Chess page replays, and "Refresh best wins from Lichess".
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { verifyAuth } from "@/lib/auth"
import { refreshBestWins } from "@/lib/lichess"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
// Four sequential Lichess requests; give them room on a cold start.
export const maxDuration = 60

const unauthorized = () => NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })

async function list() {
  return prisma.chessGame.findMany({
    orderBy: [{ speed: "asc" }, { rank: "asc" }],
    select: {
      lichessId: true, speed: true, rank: true, me: true, opp: true, oppRating: true, myRating: true,
      opening: true, clock: true, playedAt: true, how: true, refreshedAt: true,
    },
  })
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) return unauthorized()
  try {
    return NextResponse.json({ success: true, data: { games: await list() } })
  } catch {
    return NextResponse.json(
      { success: false, error: "Couldn’t read the chess cache. The database may need the chess_games table (npm run db:push)." },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) return unauthorized()
  try {
    const stored = await refreshBestWins()
    revalidatePath("/chess")
    return NextResponse.json({ success: true, data: { stored, games: await list() } })
  } catch (e) {
    const message = e instanceof Error && e.message.startsWith("Lichess") ? e.message : "The refresh didn’t go through. Try again."
    return NextResponse.json({ success: false, error: message }, { status: 502 })
  }
}
