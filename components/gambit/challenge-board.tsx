"use client"

import { useEffect, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Icon, type IconName } from "./icon"

export type Challenge = {
  platform: string
  icon: IconName
  label: string
  handle: string
  invite: string
  cta: string
  href: string
  /** Set false in Admin › Challenges to skip the live rating. */
  live?: boolean
}

// Public profile APIs: a live rating when the platform shares one. Silent on failure.
const LIVE: Record<string, (handle: string, signal: AbortSignal) => Promise<string | null>> = {
  lichess: async (u, signal) => {
    const d = await (await fetch(`https://lichess.org/api/user/${u}`, { signal })).json()
    const b = d.perfs?.blitz || d.perfs?.rapid
    return b ? `Blitz ${b.rating}` : null
  },
  chesscom: async (u, signal) => {
    const d = await (await fetch(`https://api.chess.com/pub/player/${u}/stats`, { signal })).json()
    const b = d.chess_blitz || d.chess_rapid
    return b?.last ? `${d.chess_blitz ? "Blitz" : "Rapid"} ${b.last.rating}` : null
  },
  codewars: async (u, signal) => {
    const d = await (await fetch(`https://www.codewars.com/api/v1/users/${u}`, { signal })).json()
    return d.ranks?.overall ? `${d.ranks.overall.name} overall` : null
  },
}

function ChallengeItem({ item, live }: { item: Challenge; live: boolean }) {
  const [stat, setStat] = useState<string | null>(null)

  useEffect(() => {
    const load = LIVE[item.platform]
    if (!live || item.live === false || !load) return
    const ctrl = new AbortController()
    const timer = window.setTimeout(() => ctrl.abort(), 5000)
    load(item.handle, ctrl.signal)
      .then((v) => {
        if (v) setStat(v)
      })
      .catch(() => {})
    return () => {
      window.clearTimeout(timer)
      ctrl.abort()
    }
  }, [item.platform, item.handle, item.live, live])

  return (
    <li className="gb-challenge">
      <span className="gb-challenge-icon" aria-hidden>
        <Icon name={item.icon} size={22} />
      </span>
      <div className="gb-challenge-copy">
        <h3>{item.label}</h3>
        <p>{item.invite}</p>
        <p className="gb-challenge-meta">
          <span translate="no">{item.handle}</span>
          {stat && <span className="gb-challenge-stat">{stat}</span>}
        </p>
      </div>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.cta} on ${item.label}`}
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gb-challenge-cta")}
      >
        {item.cta}
        <Icon name="newtab" size={14} />
      </a>
    </li>
  )
}

/** Play or race me. Live numbers appear when the platform shares them. */
export function ChallengeBoard({ items, live = false }: { items: readonly Challenge[]; live?: boolean }) {
  return (
    <ul className="gb-challenges">
      {items.map((c) => (
        <ChallengeItem key={`${c.platform}-${c.handle}`} item={c} live={live} />
      ))}
    </ul>
  )
}
