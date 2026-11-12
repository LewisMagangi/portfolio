"use client"

/* eslint-disable @next/next/no-img-element -- local SVG pieces; next/image adds nothing on a 64-square board */
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react"

import { buttonVariants } from "@/components/ui/button"
import { prefersReducedMotion } from "@/lib/dom"
import { cn } from "@/lib/utils"

import { Icon } from "./icon"

export type TheatreGame = {
  label: string
  speed: "bullet" | "blitz" | "rapid" | string
  rank: string
  me: "white" | "black" | string
  opp: string
  oppRating: string
  myRating: string
  opening: string
  clock: string
  date: string
  how: string
  url: string
  uci?: string
  moves?: string
  san: string
  /** Tenths of a second: one reading after every move, then one more for the side to move if the game ended on time or by resignation. */
  clocks?: string | number[]
}

type Board = (string | null)[]
type Ply = { b: Board; from?: number; to?: number; cap?: boolean; check?: boolean; mate?: boolean; san?: string; ply?: number }

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
const PACE: Record<string, number> = { bullet: 520, blitz: 720, rapid: 900 }
const PIECES = "KQRBNPkqrbnp".split("")
// cburnett file names: wK.svg, bK.svg ...
const pieceSrc = (p: string) => `/pieces/cburnett/${p === p.toUpperCase() ? "w" : "b"}${p.toUpperCase()}.svg`

function toBoard(fen?: string): Board {
  const b: Board = []
  for (const r of String(fen || START).split(" ")[0].split("/"))
    for (const c of r) {
      if (/\d/.test(c)) for (let i = 0; i < Number(c); i++) b.push(null)
      else b.push(c)
    }
  return b
}
const idx = (sq: string) => (8 - Number(sq[1])) * 8 + "abcdefgh".indexOf(sq[0])

/** Replays UCI moves into one board per ply (castling, en passant and promotion included). */
function play(moves: string[], sans: string[]): Ply[] {
  const b = toBoard(START)
  const out: Ply[] = [{ b: b.slice() }]
  moves.forEach((u, k) => {
    const f = idx(u.slice(0, 2))
    const t = idx(u.slice(2, 4))
    const p = b[f]
    let cap = Boolean(b[t])
    if (p?.toLowerCase() === "k" && Math.abs((f % 8) - (t % 8)) === 2) {
      const rf = t > f ? f + 3 : f - 4
      const rt = t > f ? f + 1 : f - 1
      b[rt] = b[rf]
      b[rf] = null
    }
    if (p?.toLowerCase() === "p" && f % 8 !== t % 8 && !b[t]) {
      b[t + (p === "P" ? 8 : -8)] = null
      cap = true
    }
    b[t] = u.length > 4 ? (p === "P" ? u[4].toUpperCase() : u[4]) : p
    b[f] = null
    const s = sans[k] || ""
    out.push({ b: b.slice(), from: f, to: t, cap, check: /[+#]$/.test(s), mate: /#$/.test(s), san: s, ply: k + 1 })
  })
  return out
}

/** Synthesised move, capture, check and end sounds (the Lichess standard set is non-free, so none is borrowed). */
let audio: AudioContext | null = null
function sound(kind: "move" | "capture" | "check" | "end") {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return
    audio ??= new AC()
    const a = audio
    const t = a.currentTime
    if (a.state === "suspended") void a.resume()
    const click = (freq: number, vol: number, len: number) => {
      const n = a.createBuffer(1, Math.floor(a.sampleRate * len), a.sampleRate)
      const d = n.getChannelData(0)
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4)
      const s = a.createBufferSource()
      s.buffer = n
      const f = a.createBiquadFilter()
      f.type = "bandpass"
      f.frequency.value = freq
      f.Q.value = 1.2
      const g = a.createGain()
      g.gain.value = vol
      s.connect(f)
      f.connect(g)
      g.connect(a.destination)
      s.start(t)
    }
    const tone = (freq: number, vol: number, len: number, at: number) => {
      const o = a.createOscillator()
      const g = a.createGain()
      o.type = "sine"
      o.frequency.value = freq
      g.gain.setValueAtTime(0, t + at)
      g.gain.linearRampToValueAtTime(vol, t + at + 0.01)
      g.gain.exponentialRampToValueAtTime(0.0001, t + at + len)
      o.connect(g)
      g.connect(a.destination)
      o.start(t + at)
      o.stop(t + at + len + 0.02)
    }
    if (kind === "move") click(2200, 0.5, 0.05)
    else if (kind === "capture") {
      click(1200, 0.8, 0.07)
      click(2600, 0.35, 0.04)
    } else if (kind === "check") {
      click(2200, 0.45, 0.05)
      tone(990, 0.06, 0.14, 0.02)
    } else {
      tone(523, 0.07, 0.35, 0)
      tone(784, 0.06, 0.5, 0.12)
    }
  } catch {
    /* sound is optional */
  }
}

function store(k: string, v?: string) {
  try {
    if (v === undefined) return window.localStorage.getItem(k)
    window.localStorage.setItem(k, v)
  } catch {
    /* private mode */
  }
  return null
}

function clocksAt(c: number[] | null, k: number, last: number) {
  if (!c?.length) return null
  let w = c[0]
  let b = c.length > 1 ? c[1] : c[0]
  for (let p = 1; p <= k && p <= c.length; p++) {
    if (p % 2) w = c[p - 1]
    else b = c[p - 1]
  }
  let flag: "white" | "black" | null = null
  if (k >= last && c.length > last) {
    if ((last + 1) % 2) {
      w = c[last]
      flag = w === 0 ? "white" : null
    } else {
      b = c[last]
      flag = b === 0 ? "black" : null
    }
  }
  return { white: w, black: b, flag, toMove: (k % 2 === 0 ? "white" : "black") as "white" | "black", next: c[k] as number | undefined }
}

function fmt(d: number | null | undefined) {
  if (d == null) return null
  d = Math.max(0, Math.round(d))
  const sec = Math.floor(d / 10)
  const m = Math.floor(sec / 60)
  const ss = String(sec % 60).padStart(2, "0")
  return d < 200 ? `${m}:${ss}.${d % 10}` : `${m}:${ss}`
}

type Player = {
  name: string
  title?: string
  rating?: string | number
  color: string
  me?: boolean
  result?: "1" | "0" | null
  clock?: number | null
  running?: boolean
  flag?: boolean
}

type Live =
  | { state: "idle"; online?: boolean }
  | { state: "checking" | "offline" }
  | { state: "ended"; id: string }
  | {
      state: "playing"
      id: string
      fen: string
      lm: string | null
      wc: number | null
      bc: number | null
      white?: { user?: { name: string; title?: string }; rating?: number }
      black?: { user?: { name: string; title?: string }; rating?: number }
    }

const THEMES = [
  { id: "gambit", label: "Gambit board, the site’s greys" },
  { id: "lichess", label: "Lichess board, brown" },
  { id: "chesscom", label: "Chess.com style board, green" },
]
const SPEEDS = ["bullet", "blitz", "rapid"]

function PlayerRow({ pl, where }: { pl: Player; where: "top" | "bottom" }) {
  return (
    <div className={cn("gb-gt-player", `is-${where}`)}>
      <span className={cn("gb-gt-dot", pl.color === "white" ? "is-white" : "is-black")} aria-hidden />
      {pl.title && <span className="gb-gt-title">{pl.title}</span>}
      <strong className="gb-gt-name" translate="no">
        {pl.name}
      </strong>
      {pl.rating && <span className="gb-gt-rating">{pl.rating}</span>}
      {pl.result && (
        <span className={cn("gb-gt-result", pl.result === "1" && "is-win")} aria-label={pl.result === "1" ? "won" : "lost"}>
          {pl.result}
        </span>
      )}
      {pl.clock != null && (
        <span
          className={cn("gb-gt-clock", pl.running && "is-running", pl.flag && "is-flag", pl.clock < 200 && pl.running && "is-low")}
          aria-label={`${pl.name} clock ${fmt(pl.clock)}${pl.running ? ", running" : ""}${pl.flag ? ", out of time" : ""}`}
        >
          {fmt(pl.clock)}
        </span>
      )}
    </div>
  )
}

/**
 * My best rated Lichess wins, replayed at a watching pace with clocks, and a live view on the same board (Gambit
 * GameTheatre). Replays run only on screen. Wheel over the board steps moves; arrows, Space, Home and End work
 * when it has focus. Board colours and sound are remembered. Reduced motion: no slides, starts paused.
 */
export function GameTheatre({ games, user = "Lique" }: { games: TheatreGame[]; user?: string }) {
  const [gi, setGi] = useState(0)
  const [k, setK] = useState(0)
  const [auto, setAuto] = useState(true)
  const [theme, setTheme] = useState("gambit")
  const [soundOn, setSoundOn] = useState(false)
  const [mode, setMode] = useState<"replay" | "live">("replay")
  const [inView, setInView] = useState(false)
  const [live, setLive] = useState<Live>({ state: "idle" })
  const [runVal, setRunVal] = useState<number | null>(null)
  const [reduced, setReduced] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const wheelAcc = useRef(0)
  const soundRef = useRef(false)

  // Remembered choices, and reduced motion, read after mount so the server render matches.
  useEffect(() => {
    const r = prefersReducedMotion()
    setReduced(r)
    if (r) setAuto(false)
    setTheme(store("gb-board") || "gambit")
    const s = store("gb-sound") === "on"
    setSoundOn(s)
    soundRef.current = s
  }, [])

  const g = games[gi] ?? games[0]
  const line = useMemo(() => play(String(g.uci || g.moves || "").split(" ").filter(Boolean), String(g.san || "").split(" ")), [g])
  const last = line.length - 1
  const pos = line[Math.min(k, last)] ?? line[0]
  const clockList = useMemo(() => (typeof g.clocks === "string" ? g.clocks.split(",").filter(Boolean).map(Number) : g.clocks ?? null), [g])
  const clk = clocksAt(clockList, k, last)

  // While a replay plays, the clock of the side to move runs down toward the time it shows after its next move.
  useEffect(() => {
    setRunVal(null)
    if (mode !== "replay" || !auto || !inView || !clk || k >= last || clk.next == null) return
    const from = clk[clk.toMove]
    const to = Math.min(from, clk.next)
    const dur = k === 0 ? 900 : PACE[g.speed] || 700
    let t0 = 0
    let raf = 0
    const frame = (t: number) => {
      if (!t0) t0 = t
      const f = Math.min(1, (t - t0) / dur)
      setRunVal(Math.round(from - (from - to) * f))
      if (f < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- clk is derived from k and gi
  }, [k, gi, auto, inView, mode])

  useEffect(() => {
    const el = root.current
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver((es) => setInView(es[0].isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Watching: one move per beat, a rest on the final position, then the next game.
  useEffect(() => {
    if (mode !== "replay" || !auto || !inView) return
    const t = setTimeout(
      () => {
        if (k < last) setK(k + 1)
        else {
          setGi((gi + 1) % games.length)
          setK(0)
        }
      },
      k >= last ? 2600 : k === 0 ? 900 : PACE[g.speed] || 700,
    )
    return () => clearTimeout(t)
  }, [auto, k, gi, inView, mode, last, games.length, g.speed])

  useEffect(() => {
    if (!soundRef.current || mode !== "replay" || k === 0) return
    const q = line[k]
    if (q) sound(q.mate || k === last ? "end" : q.check ? "check" : q.cap ? "capture" : "move")
    // eslint-disable-next-line react-hooks/exhaustive-deps -- a sound per move, not per render
  }, [k, gi])

  const step = (n: number) => {
    setAuto(false)
    setK(Math.max(0, Math.min(last, n)))
  }

  // The wheel over the board runs through the moves (non-passive, on the board only; the page scrolls elsewhere).
  useEffect(() => {
    const el = boardRef.current
    if (!el || mode !== "replay") return
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
      e.preventDefault()
      wheelAcc.current += e.deltaY
      if (Math.abs(wheelAcc.current) >= 40) {
        const d = wheelAcc.current > 0 ? 1 : -1
        wheelAcc.current = 0
        setAuto(false)
        setK((x) => Math.max(0, Math.min(last, x + d)))
      }
    }
    el.addEventListener("wheel", wheel, { passive: false })
    return () => el.removeEventListener("wheel", wheel)
  }, [mode, last])

  const onKey = (e: KeyboardEvent) => {
    if (mode !== "replay") return
    const map: Record<string, () => void> = {
      ArrowRight: () => step(k + 1),
      ArrowLeft: () => step(k - 1),
      Home: () => step(0),
      End: () => step(last),
      " ": () => setAuto(!auto),
    }
    if (map[e.key]) {
      e.preventDefault()
      map[e.key]()
    }
  }

  const pickTheme = (t: string) => {
    setTheme(t)
    store("gb-board", t)
  }
  const toggleSound = () => {
    const v = !soundOn
    setSoundOn(v)
    soundRef.current = v
    store("gb-sound", v ? "on" : "off")
    if (v) sound("move")
  }

  // Live: ask Lichess every 20s whether I'm playing; if so, stream that game (NDJSON) onto this board.
  useEffect(() => {
    if (mode !== "live") return
    let stop = false
    let timer: ReturnType<typeof setTimeout>
    let ctrl: AbortController | null = null

    const watch = (id: string) => {
      ctrl = new AbortController()
      const base: Extract<Live, { state: "playing" }> = { state: "playing", id, fen: START, lm: null, wc: null, bc: null }
      fetch(`https://lichess.org/api/stream/game/${id}`, { signal: ctrl.signal })
        .then(async (r) => {
          const rd = r.body!.getReader()
          const dec = new TextDecoder()
          let buf = ""
          for (;;) {
            const res = await rd.read()
            if (res.done || stop) {
              if (!stop) {
                setLive({ state: "ended", id })
                timer = setTimeout(poll, 15000)
              }
              return
            }
            buf += dec.decode(res.value, { stream: true })
            const parts = buf.split("\n")
            buf = parts.pop() ?? ""
            for (const ln of parts) {
              if (!ln.trim()) continue
              let m: Record<string, unknown>
              try {
                m = JSON.parse(ln)
              } catch {
                continue
              }
              const players = m.players as { white: Live; black: Live } | undefined
              if (players) Object.assign(base, { white: players.white, black: players.black })
              if (typeof m.fen === "string") base.fen = m.fen
              if (m.lastMove || m.lm) base.lm = String(m.lastMove || m.lm)
              if (m.wc != null) base.wc = Number(m.wc)
              if (m.bc != null) base.bc = Number(m.bc)
              if (m.lm && soundRef.current) sound("move")
              setLive({ ...base })
            }
          }
        })
        .catch(() => {
          if (!stop) {
            setLive({ state: "offline" })
            timer = setTimeout(poll, 30000)
          }
        })
    }

    const poll = () => {
      setLive((l) => (l.state === "playing" ? l : { state: "checking" }))
      fetch(`https://lichess.org/api/users/status?ids=${encodeURIComponent(user)}&withGameIds=true`)
        .then((r) => r.json())
        .then((a: { online?: boolean; playing?: boolean; playingId?: string }[]) => {
          if (stop) return
          const s = a?.[0]
          if (s?.playing && s.playingId) watch(s.playingId)
          else {
            setLive({ state: "idle", online: Boolean(s?.online) })
            timer = setTimeout(poll, 20000)
          }
        })
        .catch(() => {
          if (!stop) {
            setLive({ state: "offline" })
            timer = setTimeout(poll, 30000)
          }
        })
    }

    poll()
    const tick = setInterval(() => {
      setLive((l) => {
        if (l.state !== "playing" || !l.fen) return l
        const w = / w /.test(l.fen)
        const n = { ...l }
        if (w && n.wc != null && n.wc > 0) n.wc--
        if (!w && n.bc != null && n.bc > 0) n.bc--
        return n
      })
    }, 1000)
    return () => {
      stop = true
      clearTimeout(timer)
      clearInterval(tick)
      ctrl?.abort()
    }
  }, [mode, user])

  // What the board shows
  const isLive = mode === "live"
  const playing = isLive && live.state === "playing"
  let board: Board
  let hlFrom = -1
  let hlTo = -1
  let checkSq = -1
  let moved = -1
  let flip: boolean
  let top: Player
  let bottom: Player
  if (live.state === "playing" && isLive) {
    board = toBoard(live.fen)
    const lm = live.lm?.match(/^([a-h][1-8])([a-h][1-8])/)
    if (lm) {
      hlFrom = idx(lm[1])
      hlTo = idx(lm[2])
    }
    const meWhite = live.white?.user?.name?.toLowerCase() === user.toLowerCase()
    flip = !meWhite
    const whiteToMove = / w /.test(live.fen)
    const side = (c: "white" | "black", me: boolean): Player => {
      const pl = live[c] ?? {}
      const secs = c === "white" ? live.wc : live.bc
      return {
        name: pl.user?.name ?? "Anonymous",
        title: pl.user?.title,
        rating: pl.rating,
        clock: secs != null ? secs * 10 : null,
        color: c,
        me,
        running: (whiteToMove ? "white" : "black") === c,
      }
    }
    top = side(meWhite ? "black" : "white", false)
    bottom = side(meWhite ? "white" : "black", true)
  } else {
    board = pos.b
    hlFrom = pos.from ?? -1
    hlTo = pos.to ?? -1
    moved = k > 0 && pos.to != null ? pos.to : -1
    if (pos.check && pos.ply) checkSq = board.indexOf(pos.ply % 2 === 1 ? "k" : "K")
    flip = g.me === "black"
    const done = k >= last
    top = { name: g.opp, rating: g.oppRating, color: g.me === "white" ? "black" : "white", result: done ? "0" : null }
    bottom = { name: user, rating: g.myRating, color: g.me, me: true, result: done ? "1" : null }
    if (clk)
      for (const pl of [top, bottom]) {
        const running = !done && clk.toMove === pl.color
        pl.clock = running && runVal != null ? runVal : clk[pl.color as "white" | "black"]
        pl.running = running
        pl.flag = clk.flag === pl.color
      }
  }

  const order = Array.from({ length: 64 }, (_, i) => (flip ? 63 - i : i))
  let dx = 0
  let dy = 0
  if (moved >= 0 && pos.from != null && pos.to != null && !reduced) {
    const fi = order.indexOf(pos.from)
    const ti = order.indexOf(pos.to)
    dx = ((fi % 8) - (ti % 8)) * 100
    dy = (Math.floor(fi / 8) - Math.floor(ti / 8)) * 100
  }
  const moveNo = (n: number) => `${Math.ceil(n / 2)}${n % 2 ? ". " : "... "}`

  return (
    <div ref={root} className="gb-gt" data-board={theme}>
      {/* Preload every piece once so the first replay never flashes. */}
      <div hidden>
        {PIECES.map((p) => (
          <img key={p} src={pieceSrc(p)} alt="" />
        ))}
      </div>

      <div className="gb-gt-bar">
        <div className="gb-gt-lights" role="group" aria-label="Board colours">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={cn("gb-gt-light", `is-${t.id}`)}
              aria-label={t.label}
              aria-pressed={theme === t.id}
              title={t.label}
              onClick={() => pickTheme(t.id)}
            />
          ))}
        </div>
        <span className="gb-gt-label" aria-live="polite">
          {isLive ? (
            playing ? (
              <>
                <span className="gb-gt-livedot" aria-hidden />
                Live on Lichess
              </>
            ) : (
              "Live view"
            )
          ) : (
            <>
              {g.label.charAt(0).toUpperCase() + g.label.slice(1)}
              <span className={cn("gb-gt-state", k >= last ? "is-final" : "is-play")}>{k >= last ? "Final" : auto ? "In play" : "Paused"}</span>
            </>
          )}
        </span>
        <div className="gb-gt-icons">
          <button type="button" className="gb-gt-icon" onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn ? "Sound on" : "Sound off"}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 9v6h4l5 4V5L8 9z" />
              {soundOn ? <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /> : <path d="M17 9l5 6M22 9l-5 6" />}
            </svg>
          </button>
          <button
            type="button"
            className={cn("gb-gt-icon", isLive && "is-on")}
            onClick={() => setMode(isLive ? "replay" : "live")}
            aria-pressed={isLive}
            aria-label={isLive ? "Back to my best wins" : "Watch me live on Lichess"}
            title={isLive ? "Back to my best wins" : "Watch me live"}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 7h11l-3-3M17 17H6l3 3" />
            </svg>
          </button>
        </div>
      </div>

      <div className="gb-gt-stage">
        <PlayerRow pl={top} where="top" />
        <div
          ref={boardRef}
          className={cn("gb-gt-board", isLive && !playing && "is-dim")}
          tabIndex={0}
          onKeyDown={onKey}
          role="img"
          aria-label={
            isLive
              ? playing
                ? "Live game on Lichess"
                : "No live game"
              : `${g.label}, ${k === 0 ? "starting position" : `after ${moveNo(k)}${pos.san}`}`
          }
          data-cursor={isLive ? undefined : "Scroll"}
        >
          {order.map((sq) => {
            const r = Math.floor(sq / 8)
            const f = sq % 8
            const pc = board[sq]
            const dark = (r + f) % 2 === 1
            return (
              <div
                key={sq}
                className={cn("gb-gt-sq", dark ? "is-dark" : "is-light", (sq === hlFrom || sq === hlTo) && "is-last", sq === checkSq && "is-check")}
              >
                {(flip ? f === 7 : f === 0) && (
                  <span className="gb-gt-rank" aria-hidden>
                    {8 - r}
                  </span>
                )}
                {(flip ? r === 0 : r === 7) && (
                  <span className="gb-gt-file" aria-hidden>
                    {"abcdefgh"[f]}
                  </span>
                )}
                {pc && (
                  <img
                    key={sq === moved ? `m${gi}-${k}` : `s${pc}`}
                    src={pieceSrc(pc)}
                    alt=""
                    draggable={false}
                    className={cn("gb-gt-pc", sq === moved && "is-moved")}
                    style={sq === moved ? ({ "--dx": `${dx}%`, "--dy": `${dy}%` } as CSSProperties) : undefined}
                  />
                )}
              </div>
            )
          })}
          {isLive && !playing && (
            <div className="gb-gt-idle">
              <strong>
                {live.state === "checking"
                  ? "Looking for a live game…"
                  : live.state === "ended"
                    ? "That game just ended."
                    : live.state === "offline"
                      ? "Lichess can’t be reached right now."
                      : "I’m not playing right now."}
              </strong>
              <span>
                {live.state === "idle" && live.online
                  ? "Online on Lichess, between games. This view checks every 20 seconds."
                  : "This view checks every 20 seconds and starts the moment a game does."}
              </span>
              <div className="gb-gt-idle-row">
                <button type="button" className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => setMode("replay")}>
                  Watch my best wins
                </button>
                <a className="gb-link" href={`https://lichess.org/@/${user}`} target="_blank" rel="noopener noreferrer">
                  Follow on Lichess ↗
                </a>
              </div>
            </div>
          )}
        </div>
        <PlayerRow pl={bottom} where="bottom" />
      </div>

      {isLive ? (
        <div className="gb-gt-foot">
          {live.state === "playing" ? (
            <a className="gb-gt-open" href={`https://lichess.org/${live.id}`} target="_blank" rel="noopener noreferrer">
              Open this game on Lichess ↗
            </a>
          ) : (
            <span className="gb-gt-meta">Streams straight from Lichess when I’m playing.</span>
          )}
        </div>
      ) : (
        <>
          <div className="gb-gt-ctl">
            <button type="button" className="gb-iconbtn" onClick={() => step(0)} disabled={k === 0} aria-label="First move">
              <Icon name="left" size={16} />
              <Icon name="left" size={16} />
            </button>
            <button type="button" className="gb-iconbtn" onClick={() => step(k - 1)} disabled={k === 0} aria-label="Previous move">
              <Icon name="left" size={18} />
            </button>
            <button
              type="button"
              className="gb-iconbtn"
              onClick={() => {
                if (!auto && k >= last) setK(0)
                setAuto(!auto)
              }}
              aria-pressed={auto}
              aria-label={auto ? "Pause" : "Play"}
            >
              <Icon name={auto ? "pause" : "play"} size={16} />
            </button>
            <button type="button" className="gb-iconbtn" onClick={() => step(k + 1)} disabled={k >= last} aria-label="Next move">
              <Icon name="right" size={18} />
            </button>
            <button type="button" className="gb-iconbtn" onClick={() => step(last)} disabled={k >= last} aria-label="Last move">
              <Icon name="right" size={16} />
              <Icon name="right" size={16} />
            </button>
            <span className="gb-gt-now">
              {k === 0 ? "Start" : `${moveNo(k)}${pos.san}`}
              <em>{k >= last ? `Game over, ${g.how.toLowerCase()}` : `Move ${Math.ceil(k / 2)} of ${Math.ceil(last / 2)}`}</em>
            </span>
          </div>
          <div className="gb-gt-meta">
            <span>{g.opening}</span>
            <span>{g.clock ? `${parseInt(g.clock, 10) / 60}+${g.clock.split("+")[1]} ${g.speed}` : ""}</span>
            <span>{k >= last ? g.how : g.date}</span>
            <a className="gb-gt-open" href={g.url} target="_blank" rel="noopener noreferrer">
              Open on Lichess ↗
            </a>
          </div>
          <div className="gb-gt-picker">
            {SPEEDS.map((sp) => {
              const list = games.map((x, j) => ({ x, j })).filter((o) => o.x.speed === sp)
              if (!list.length) return null
              return (
                <div key={sp} className="gb-gt-speed" role="group" aria-label={`${sp} games`}>
                  <span className="gb-gt-speed-name">{sp.charAt(0).toUpperCase() + sp.slice(1)}</span>
                  {list.map((o) => (
                    <button
                      key={o.j}
                      type="button"
                      className="gb-gt-pick"
                      aria-pressed={gi === o.j}
                      aria-label={`${o.x.label} against ${o.x.opp}, ${o.x.oppRating}`}
                      onClick={() => {
                        setGi(o.j)
                        setK(0)
                        setAuto(true)
                      }}
                    >
                      {o.x.rank}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
          <p className="gb-gt-credit">Scroll over the board to run through the moves. Pieces: cburnett by Colin M.L. Burnett, GPLv2+.</p>
        </>
      )}
    </div>
  )
}
