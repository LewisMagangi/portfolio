"use client"

/* eslint-disable @next/next/no-img-element -- local 880×508 certificates; the bar waits on each image's own load */
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"

import { keepDates, prefersReducedMotion } from "@/lib/dom"
import { cn } from "@/lib/utils"

export type CourseFront = {
  title: string
  org: string
  dates: string
  result: string
  links: { label: string; href: string }[]
  groups: { name: string; items: string[] }[]
}

export type CourseStoryItem = {
  title: string
  image?: string
  date?: string
  hours?: string
  about?: string
  chapters?: string[]
  verify?: string
}

/** The ringed badge: one arc per course, lit once seen; it spins while the stories load. */
function StoryRing({ count, seen, loading, label }: { count: number; seen: number; loading: boolean; label: string }) {
  const n = Math.max(1, count)
  const r = 19
  const c = 2 * Math.PI * r
  const gap = n > 1 ? 3 : 0
  const seg = c / n - gap
  return (
    <svg className={cn("gb-cs-ring", loading && "is-loading")} width={44} height={44} viewBox="0 0 44 44" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          cx={22}
          cy={22}
          r={r}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          className={i < seen ? "is-seen" : ""}
          strokeDasharray={`${seg} ${c - seg}`}
          strokeDashoffset={-(i * (seg + gap))}
          transform="rotate(-90 22 22)"
        />
      ))}
      <text x={22} y={26} textAnchor="middle" className="gb-cs-ring-n">
        {label}
      </text>
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />
      <path d="M9 7h7M9 11h5" />
    </svg>
  )
}

/**
 * A programme card that flips (3D, 0.8s, Tilda curve) to its courses played as stories (Gambit CourseStory).
 * Bars fill linearly and wait for each certificate image; the next one preloads. Tap right 70% for next, left 30%
 * for back, hold or the pause button to pause; arrows, Space and Esc work. The book button carries a steady
 * sheen, and the first time the card is seen it nudges once; the card itself never moves. Reduced motion: a
 * crossfade, starting paused.
 */
export function CourseStory({ front: f, stories, duration = 7 }: { front: CourseFront; stories: CourseStoryItem[]; duration?: number }) {
  const [flipped, setFlipped] = useState(false)
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [held, setHeld] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dir, setDir] = useState(1)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})
  const [hint, setHint] = useState(false)

  const back = useRef<HTMLElement>(null)
  const frontFace = useRef<HTMLElement>(null)
  const frontBtn = useRef<HTMLButtonElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const hold = useRef<ReturnType<typeof setTimeout>>()
  const wasHeld = useRef(false)

  const n = stories.length
  const cur = stories[idx] ?? ({} as CourseStoryItem)

  const markLoaded = (src?: string) => {
    if (src) setLoaded((m) => (m[src] ? m : { ...m, [src]: true }))
  }

  // The hidden face can't be focused or clicked (React 18 doesn't pass `inert` through, so set it directly).
  useEffect(() => {
    if (frontFace.current) frontFace.current.inert = flipped
    if (back.current) back.current.inert = !flipped
  }, [flipped])

  // The nudge: once, the first time the card is mostly in view.
  useEffect(() => {
    const el = wrap.current
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return
    let t1: ReturnType<typeof setTimeout>
    let t2: ReturnType<typeof setTimeout>
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return
        io.disconnect()
        t1 = setTimeout(() => {
          setHint(true)
          t2 = setTimeout(() => setHint(false), 2600)
        }, 700)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const go = (i: number) => {
    if (i < 0) i = 0
    if (i > n - 1) {
      setPlaying(false)
      return
    }
    setDir(i >= idx ? 1 : -1)
    setIdx(i)
  }

  const open = () => {
    const reduced = prefersReducedMotion()
    setHint(false)
    setFlipped(true)
    setIdx(0)
    setLoading(true)
    setTimeout(
      () => {
        setLoading(false)
        setPlaying(!reduced)
        back.current?.focus({ preventScroll: true })
      },
      reduced ? 0 : 700,
    )
  }

  const close = () => {
    setFlipped(false)
    setPlaying(false)
    setTimeout(() => frontBtn.current?.focus({ preventScroll: true }), 50)
  }

  const onEnd = () => (idx < n - 1 ? go(idx + 1) : setPlaying(false))
  const isControl = (t: EventTarget | null) => t instanceof Element && Boolean(t.closest("a, button"))

  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (isControl(e.target)) return
    wasHeld.current = false
    clearTimeout(hold.current)
    hold.current = setTimeout(() => {
      wasHeld.current = true
      setHeld(true)
    }, 220)
  }
  const up = (e: PointerEvent<HTMLDivElement>) => {
    if (isControl(e.target)) return
    clearTimeout(hold.current)
    if (wasHeld.current) {
      setHeld(false)
      wasHeld.current = false
      return
    }
    const r = e.currentTarget.getBoundingClientRect()
    go(e.clientX - r.left < r.width * 0.3 ? idx - 1 : idx + 1)
  }
  const cancel = () => {
    clearTimeout(hold.current)
    if (wasHeld.current) {
      setHeld(false)
      wasHeld.current = false
    }
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      go(idx + 1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      go(idx - 1)
    } else if (e.key === " ") {
      if (isControl(e.target)) return
      e.preventDefault()
      setPlaying((p) => !p)
    } else if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  }

  const ready = !cur.image || Boolean(loaded[cur.image])
  const running = flipped && playing && !held && !loading && ready
  const nextImg = stories[idx + 1]?.image

  return (
    <div ref={wrap} className={cn("gb-cs", flipped && "is-flipped", hint && !flipped && "is-hint")}>
      <div className="gb-cs-inner">
        {/* Front */}
        <article ref={frontFace} className="gb-cs-face gb-cs-front" aria-hidden={flipped}>
          <div className="gb-cs-meta">
            <span>{keepDates(f.dates)}</span>
            <span className="gb-cs-result">{f.result}</span>
          </div>
          <div className="gb-cs-titlerow">
            <div className="gb-cs-title">
              <h3 className="title">{f.title}</h3>
              <span>{f.org}</span>
            </div>
            {n > 0 && (
              <button
                ref={frontBtn}
                type="button"
                className="gb-cs-book"
                onClick={open}
                aria-label={`Open the ${n} course stories for ${f.title}`}
                data-cursor="Flip"
              >
                <BookIcon />
                <span className="gb-cs-book-label" aria-hidden>
                  Play the courses
                </span>
                <span className="gb-cs-book-n">{n}</span>
              </button>
            )}
          </div>
          {f.links.length > 0 && (
            <div className="gb-cs-links">
              {f.links.map((l) => (
                <a key={l.href} className="gb-link" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
          {f.groups.map((g) => (
            <div key={g.name} className="gb-cs-group">
              <h4>{g.name}</h4>
              <div className="gb-cs-chips">
                {g.items.map((c) => (
                  <span key={c} className="gb-cs-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </article>

        {/* Back */}
        <section
          ref={back}
          className="gb-cs-face gb-cs-back"
          tabIndex={flipped ? 0 : -1}
          aria-hidden={!flipped}
          onKeyDown={onKey}
          aria-roledescription="course stories"
          aria-label={`${f.title}, course stories`}
        >
          <div className="gb-cs-bars" aria-hidden>
            {stories.map((s, i) => (
              <span key={i} className="gb-cs-bar">
                <span
                  key={i === idx ? `run-${idx}${flipped ? "" : "-off"}` : `s-${i}`}
                  className={cn("gb-cs-bar-fill", i < idx && "is-done", i === idx && flipped && !loading && "is-run")}
                  style={i === idx ? { animationDuration: `${duration}s`, animationPlayState: running ? "running" : "paused" } : undefined}
                  onAnimationEnd={i === idx ? onEnd : undefined}
                />
              </span>
            ))}
          </div>
          <div className="gb-cs-head">
            <StoryRing count={n} seen={idx + (loading ? 0 : 1)} loading={loading} label={`${idx + 1}/${n}`} />
            <div className="gb-cs-who">
              <strong>{f.title}</strong>
              <span>{keepDates(cur.date ?? "")}</span>
            </div>
            <button
              type="button"
              className="gb-cs-ctl"
              onClick={() => {
                if (!playing && idx >= n - 1) setIdx(0)
                setPlaying(!playing)
              }}
              aria-label={playing ? "Pause" : "Play"}
              aria-pressed={!playing}
            >
              {playing ? (
                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x={6} y={5} width={4} height={14} rx={1} />
                  <rect x={14} y={5} width={4} height={14} rx={1} />
                </svg>
              ) : (
                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                </svg>
              )}
            </button>
            <button type="button" className="gb-cs-ctl" onClick={close} aria-label="Turn the card back over">
              <BookIcon />
            </button>
          </div>
          <div
            className={cn("gb-cs-stage", held && "is-held")}
            onPointerDown={down}
            onPointerUp={up}
            onPointerLeave={cancel}
            onPointerCancel={cancel}
            onContextMenu={(e) => e.preventDefault()}
          >
            {loading ? (
              <div className="gb-cs-loading">
                <span>Loading {n} courses</span>
              </div>
            ) : (
              <div key={idx} className={cn("gb-cs-slide", dir < 0 ? "from-left" : "from-right")} aria-live="polite">
                {cur.image && (
                  <figure className={cn("gb-cs-cert", ready && "is-ready")}>
                    <img
                      src={cur.image}
                      alt={`DataCamp statement of accomplishment for ${cur.title}, ${cur.date ?? ""}`}
                      width={880}
                      height={508}
                      draggable={false}
                      onLoad={() => markLoaded(cur.image)}
                      onError={() => markLoaded(cur.image)}
                      ref={(el) => {
                        // A cached image can finish before React attaches onLoad.
                        if (el?.complete) markLoaded(cur.image)
                      }}
                    />
                  </figure>
                )}
                <span className="gb-cs-kicker">
                  Course {idx + 1} of {n}
                  {cur.hours ? `, ${cur.hours}` : ""}
                </span>
                <h4 className="gb-cs-course">{cur.title}</h4>
                {cur.about && <p className="gb-cs-about">{cur.about}</p>}
                {cur.chapters && cur.chapters.length > 0 && (
                  <ol className="gb-cs-chapters">
                    {cur.chapters.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ol>
                )}
                {cur.verify && (
                  <a className="gb-cs-verify" href={cur.verify} target="_blank" rel="noopener noreferrer">
                    Verify on DataCamp ↗
                  </a>
                )}
              </div>
            )}
          </div>
          {nextImg && flipped && (
            <img className="gb-cs-preload" src={nextImg} alt="" aria-hidden onLoad={() => markLoaded(nextImg)} />
          )}
          <p className="gb-cs-hint" aria-hidden>
            Tap right for next, left for back, hold to pause
          </p>
        </section>
      </div>
    </div>
  )
}
