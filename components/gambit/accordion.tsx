"use client"

import { useId, useState } from "react"

import { cn } from "@/lib/utils"

import { Icon } from "./icon"

/** One panel open at a time; -1 starts with all closed. */
export function Accordion({ items, initial = 0 }: { items: { title: string; body: string }[]; initial?: number }) {
  const [open, setOpen] = useState(initial)
  const base = useId()
  return (
    <div className="gb-acc">
      {items.map((it, i) => {
        const on = i === open
        const id = `${base}-${i}`
        return (
          <div key={it.title} className={cn("gb-acc-item", on && "is-open")}>
            <h3 className="m-0">
              <button
                type="button"
                className="gb-acc-head"
                aria-expanded={on}
                aria-controls={id}
                onClick={() => setOpen(on ? -1 : i)}
              >
                <span className="gb-acc-title">{it.title}</span>
                <span className="gb-acc-chev" aria-hidden>
                  <Icon name="chev" size={16} />
                </span>
              </button>
            </h3>
            <div className="gb-acc-panel" id={id} role="region" aria-label={it.title}>
              <div className="gb-acc-in">
                <p>{it.body}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
