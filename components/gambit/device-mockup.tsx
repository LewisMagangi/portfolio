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
 * it) until the visitor chooses to use it; Esc or leaving the frame hands the wheel back.
 */
export function LiveView({
  src,
  title,
  poster,
  viewport = 1280,
  phone = false,
}: {
  src: string
  title?: string
  poster: ReactNode
  viewport?: number
  phone?: boolean
}) {
  const [ref, near] = useNear<HTMLDivElement>()
  const [box, setBox] = useState({ s: 0, h: 0 })
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setBox({ s: el.clientWidth / viewport, h: el.clientHeight })
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
  return (
    <div
      ref={ref}
      className={cn("gb-live", loaded && "is-loaded", active && "is-active")}
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
          tabIndex={active ? 0 : -1}
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setLoaded(true)}
          style={{ width: viewport, height: Math.ceil(box.h / box.s), transform: `scale(${box.s})` }}
        />
      )}
      {!active && (
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

/** A desktop browser with a phone in front of it. With a live URL both frames run the real site. */
export function DeviceMockup({
  url,
  liveUrl,
  mock,
  mobileMock,
  caption,
  compact = false,
}: {
  url?: string
  liveUrl?: string
  mock: Mock
  mobileMock?: Mock
  caption?: string
  compact?: boolean
}) {
  const label = url || host(liveUrl)
  const desk = <MockScreen mock={mock} />
  const mob = <MockScreen mock={mobileMock || mock} phone />
  return (
    <figure className={cn("gb-devices", compact && "is-compact", liveUrl && "is-live")}>
      <div className="gb-devices-stage">
        <BrowserFrame url={label} openHref={liveUrl}>
          {liveUrl ? <LiveView src={liveUrl} title={label} poster={desk} viewport={1280} /> : desk}
        </BrowserFrame>
        <PhoneFrame className="gb-devices-phone">
          {liveUrl ? (
            <LiveView src={liveUrl} title={`${label} on a phone`} poster={mob} viewport={390} phone />
          ) : (
            mob
          )}
        </PhoneFrame>
      </div>
      {caption && <figcaption className="gb-frame-cap">{caption}</figcaption>}
    </figure>
  )
}
