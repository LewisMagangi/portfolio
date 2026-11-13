"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import type { Mock } from "@/lib/content/home"
import { cn } from "@/lib/utils"

import { Icon } from "./icon"

function host(u?: string) {
  return String(u || "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
}

export function BrowserFrame({
  url,
  openHref,
  caption,
  children,
  className,
}: {
  url?: string
  openHref?: string
  caption?: string
  children: ReactNode
  className?: string
}) {
  return (
    <figure className={cn("gb-browser", className)}>
      <div className="gb-browser-bar">
        <span className="gb-browser-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="gb-browser-url" translate="no">
          {url || "lewismagangi.dev"}
        </span>
        {openHref && (
          <a
            className="gb-frame-open"
            href={openHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${url || openHref} in a new tab`}
          >
            <Icon name="newtab" size={14} />
          </a>
        )}
      </div>
      <div className="gb-browser-view">{children}</div>
      {caption && <figcaption className="gb-frame-cap mt-3">{caption}</figcaption>}
    </figure>
  )
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <figure className={cn("gb-phone", className)}>
      <div className="gb-phone-body">
        <span className="gb-phone-notch" aria-hidden />
        <div className="gb-phone-view">{children}</div>
      </div>
    </figure>
  )
}

const BARS = [40, 62, 48, 80, 66, 92, 74]

/** A schematic screen, shown as the poster until the live site paints (or instead of it when there is none). */
export function MockScreen({ mock, phone = false }: { mock: Mock; phone?: boolean }) {
  const stats = mock.stats.slice(0, phone ? 1 : 3)
  const rows = mock.rows.slice(0, phone ? 3 : 4)
  return (
    <div className={cn("gb-mock", phone && "is-phone")} aria-hidden>
      {!phone && (
        <div className="gb-mock-side">
          <b>{mock.brand}</b>
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} className={i === 0 ? "on" : ""} />
          ))}
        </div>
      )}
      <div className="gb-mock-main">
        <div className="gb-mock-top">
          <strong>{mock.title}</strong>
          {!phone && <span className="gb-mock-pill">{mock.badge}</span>}
        </div>
        {stats.length > 0 && (
          <div className="gb-mock-stats">
            {stats.map((s) => (
              <div key={s.l}>
                <em>{s.l}</em>
                <b>{s.v}</b>
              </div>
            ))}
          </div>
        )}
        <div className="gb-mock-chart">
          {BARS.map((b, i) => (
            <i key={i} style={{ height: b + "%" }} />
          ))}
        </div>
        <div className="gb-mock-rows">
          {rows.map((r) => (
            <div key={r}>
              <span className="gb-mock-av" />
              <span>{r}</span>
              <i />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function useNear<T extends Element>(margin = "400px 0px") {
  const ref = useRef<T>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [near, margin])
  return [ref, near] as const
}

/**
 * The real site, scaled into the frame. Loads when near the viewport and stays inert (the page keeps scrolling past
 * it) until the visitor chooses to use it; Esc or leaving the frame hands the wheel back. `still` keeps it inert for
 * good (the before and after curtain owns the pointer).
 */
export function LiveView({
  src,
  title,
  poster,
  viewport = 1440,
  phone = false,
  still = false,
}: {
  src: string
  title?: string
  poster: ReactNode
  viewport?: number
  phone?: boolean
  still?: boolean
}) {
  const [ref, near] = useNear<HTMLDivElement>()
  const [box, setBox] = useState({ s: 0, h: 0 })
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setBox({ s: el.clientWidth / viewport, h: el.clientHeight })
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, viewport])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [active])

  const name = title || host(src)
  const on = active && !still
  return (
    <div
      ref={ref}
      className={cn("gb-live", loaded && "is-loaded", on && "is-active")}
      onMouseLeave={() => setActive(false)}
    >
      <div className="gb-live-poster" aria-hidden={loaded || undefined}>
        {poster}
      </div>
      {near && box.s > 0 && (
        <iframe
          src={src}
          title={`${name} (live site)`}
          loading="lazy"
          tabIndex={on ? 0 : -1}
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setLoaded(true)}
          style={{ width: viewport, height: Math.ceil(box.h / box.s), transform: `scale(${box.s})` }}
        />
      )}
      {!on && !still && (
        <button type="button" className="gb-live-use" onClick={() => setActive(true)}>
          <span>
            <Icon name="cursor" size={16} />
            {phone ? "Use it" : "Use the live site"}
          </span>
        </button>
      )}
    </div>
  )
}

/** A screenshot pair for one build: desktop (1440 by 900) and phone (390 by 844). */
export type Shots = { desktop: string; phone: string; alt: string }

/** A screenshot in the frame, top aligned so the page reads from its first screen. */
function ShotView({ shots, phone }: { shots: Shots; phone: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size local screenshots in a fixed frame
    <img
      className="gb-shot"
      src={phone ? shots.phone : shots.desktop}
      alt={phone ? `${shots.alt}, on a phone` : shots.alt}
      width={phone ? 390 : 1440}
      height={phone ? 844 : 900}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}

const EASE = (k: number) => (k === 1 ? 1 : 1 - Math.pow(2, -10 * k))

/**
 * Before and after: the original under, the rebuild over it, clipped from the left edge of a handle the visitor
 * drags from right to left. Nothing moves until they drag, press an arrow key or choose "Play the change".
 * Horizontal drags move the curtain; vertical drags still scroll the page (touch-action: pan-y).
 */
function Curtain({
  before,
  after,
}: {
  before: { view: ReactNode; label: string }
  after: { view: ReactNode; label: string }
}) {
  const [pos, setPos] = useState(62)
  const stage = useRef<HTMLDivElement>(null)
  const drag = useRef(false)
  const raf = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const at = (x: number) => {
    const r = stage.current?.getBoundingClientRect()
    if (!r || r.width === 0) return
    setPos(Math.max(0, Math.min(100, Math.round(((x - r.left) / r.width) * 100))))
  }
  const play = () => {
    cancelAnimationFrame(raf.current)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos(0)
      return
    }
    const t0 = performance.now()
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1600)
      setPos(Math.round(100 - 100 * EASE(k)))
      if (k < 1) raf.current = requestAnimationFrame(step)
    }
    setPos(100)
    raf.current = requestAnimationFrame(step)
  }
  return (
    <div className="gb-curtain-wrap">
      <div
        ref={stage}
        className="gb-curtain"
        onPointerDown={(e) => {
          cancelAnimationFrame(raf.current)
          drag.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          at(e.clientX)
        }}
        onPointerMove={(e) => drag.current && at(e.clientX)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
      >
        <div className="gb-curtain-layer">{before.view}</div>
        <div className="gb-curtain-layer" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          {after.view}
        </div>
        <span className="gb-curtain-tag is-before" aria-hidden>
          Before
        </span>
        <span className="gb-curtain-tag is-after" aria-hidden>
          After
        </span>
        <input
          className="gb-curtain-input"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => {
            cancelAnimationFrame(raf.current)
            setPos(Number(e.target.value))
          }}
          aria-label={`Curtain between ${before.label} (before) and ${after.label} (after)`}
          aria-valuetext={`${pos}% before, ${100 - pos}% after`}
        />
        <span className="gb-curtain-seam" style={{ left: `${pos}%` }} aria-hidden />
        <span className="gb-curtain-knob" style={{ left: `${pos}%` }} aria-hidden>
          <Icon name="drag" size={18} />
        </span>
      </div>
      <div className="gb-curtain-foot">
        <p>Drag from right to left, or use the arrow keys.</p>
        <button type="button" className="gb-curtain-play" onClick={play}>
          <Icon name="play" size={14} />
          Play the change
        </button>
      </div>
    </div>
  )
}

/**
 * One frame, one device at a time (v9). The bar switches the same live site between desktop (1440) and phone (390)
 * inside a stage that keeps its height, so nothing below moves. With `before`, a Before and after button turns the
 * frame into a curtain.
 */
export function DeviceMockup({
  url,
  liveUrl,
  mock,
  mobileMock,
  caption,
  compact = false,
  before,
  shots,
  openHref,
}: {
  url?: string
  /** Runs the real site in the frame. Ignored when `shots` is given. */
  liveUrl?: string
  mock: Mock
  mobileMock?: Mock
  caption?: string
  compact?: boolean
  /** The original build, shown under the current one in the before and after curtain. */
  before?: { url: string; shots: Shots }
  /** Screenshots in place of a live frame. */
  shots?: Shots
  /** Where the open-in-a-new-tab icon goes (deployed builds only). Defaults to `liveUrl`. */
  openHref?: string
}) {
  const label = url || host(liveUrl)
  const [phone, setPhone] = useState(false)
  const [curtain, setCurtain] = useState(false)

  // On a phone the frame opens in phone view (after hydration, so server and client markup match).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 640px)").matches) setPhone(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const poster = phone ? <MockScreen mock={mobileMock || mock} phone /> : <MockScreen mock={mock} />
  const showCurtain = Boolean(curtain && before && shots)
  const open = openHref ?? (shots ? undefined : liveUrl)
  const switchable = Boolean(shots || liveUrl)

  let view: ReactNode
  if (showCurtain && before && shots)
    view = (
      <Curtain
        before={{ view: <ShotView shots={before.shots} phone={phone} />, label: before.url }}
        after={{ view: <ShotView shots={shots} phone={phone} />, label }}
      />
    )
  else if (shots) view = <ShotView shots={shots} phone={phone} />
  else if (!liveUrl) view = poster
  else
    view = (
      <LiveView
        key={phone ? "p" : "d"}
        src={liveUrl}
        title={phone ? `${label} on a phone` : label}
        poster={poster}
        viewport={phone ? 390 : 1440}
        phone={phone}
      />
    )

  return (
    <figure className={cn("gb-device", compact && "is-compact", phone && "is-phone", showCurtain && "is-curtain")}>
      <div className="gb-browser-bar">
        <span className="gb-browser-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="gb-browser-url" translate="no">
          {showCurtain && before ? `${before.url} → ${label}` : label}
        </span>
        {before && shots && (
          <button
            type="button"
            className="gb-frame-btn"
            aria-pressed={curtain}
            onClick={() => setCurtain((c) => !c)}
          >
            <Icon name="split" size={14} />
            <span className="max-sm:sr-only">Before and after</span>
          </button>
        )}
        {switchable && (
          <div className="gb-frame-seg" role="group" aria-label="View as">
            <button type="button" aria-pressed={!phone} aria-label="Desktop" onClick={() => setPhone(false)}>
              <Icon name="desktop" size={16} />
            </button>
            <button type="button" aria-pressed={phone} aria-label="Phone" onClick={() => setPhone(true)}>
              <Icon name="phone" size={16} />
            </button>
          </div>
        )}
        {open && !showCurtain && (
          <a
            className="gb-frame-open"
            href={open}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${label} in a new tab`}
          >
            <Icon name="newtab" size={14} />
          </a>
        )}
      </div>
      <div className="gb-device-stage">
        {phone ? (
          <div className="gb-device-phone">
            <div className="gb-phone-body">
              <span className="gb-phone-notch" aria-hidden />
              <div className="gb-phone-view">{view}</div>
            </div>
          </div>
        ) : (
          view
        )}
      </div>
      {caption && !showCurtain && <figcaption className="gb-frame-cap">{caption}</figcaption>}
    </figure>
  )
}
