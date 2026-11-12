import { cn } from "@/lib/utils"

// One still position (the Gambit ChessBoard with controls off), drawn with the GameTheatre squares
// and the cburnett pieces. Server rendered; no script.
const pieceSrc = (p: string) => `/pieces/cburnett/${p === p.toUpperCase() ? "w" : "b"}${p.toUpperCase()}.svg`
const NAMES: Record<string, string> = { k: "king", q: "queen", r: "rook", b: "bishop", n: "knight", p: "pawn" }

function squares(fen: string) {
  const out: (string | null)[] = []
  for (const row of fen.split(" ")[0].split("/"))
    for (const c of row) {
      if (/\d/.test(c)) for (let i = 0; i < Number(c); i++) out.push(null)
      else out.push(c)
    }
  return out
}

const idx = (sq: string) => (8 - Number(sq[1])) * 8 + "abcdefgh".indexOf(sq[0])

export function ChessPosition({
  fen,
  label,
  from,
  to,
  size = 176,
  className,
}: {
  fen: string
  /** What the position shows, for screen readers. */
  label: string
  from?: string
  to?: string
  size?: number
  className?: string
}) {
  const board = squares(fen)
  const hl = new Set([from, to].filter(Boolean).map((s) => idx(s as string)))
  return (
    <div className={cn("gb-gt flex flex-col gap-2", className)} style={{ width: size, maxWidth: "100%" }}>
      <div className="gb-gt-board" role="img" aria-label={label}>
        {board.map((pc, sq) => {
          const r = Math.floor(sq / 8)
          const f = sq % 8
          return (
            <div key={sq} className={cn("gb-gt-sq", (r + f) % 2 ? "is-dark" : "is-light", hl.has(sq) && "is-last")}>
              {pc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="gb-gt-pc" src={pieceSrc(pc)} alt="" aria-hidden draggable={false} data-piece={NAMES[pc.toLowerCase()]} />
              )}
            </div>
          )
        })}
      </div>
      <p className="gb-gt-credit">Pieces: cburnett by Colin M.L. Burnett, GPLv2+.</p>
    </div>
  )
}
