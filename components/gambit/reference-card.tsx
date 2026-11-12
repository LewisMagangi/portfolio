import Link from "next/link"

import type { Reference } from "@/lib/content/home"

import { Icon } from "./icon"

function initials(name: string) {
  return name
    .replace(/^(Dr|Mr|Ms|Mrs|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

/**
 * Every card is the same size. A longer message opens in place (`full`, `moreLabel`, v8.6).
 * The reviewer's words are shown exactly as written.
 */
export function ReferenceCard({ reference: r, linkLabel = "Read the full letter" }: { reference: Reference; linkLabel?: string }) {
  return (
    <figure className="gb-ref">
      <div className="gb-ref-head">
        <span className="gb-ref-mono" aria-hidden>
          {r.mark || initials(r.name)}
        </span>
        <div>
          <div className="gb-ref-rel">{r.relation}</div>
          {r.date && <div className="gb-ref-date">{r.date}</div>}
        </div>
        {r.result && (
          <span className="gb-ref-result">
            <Icon name="trophy" size={14} />
            {r.result}
          </span>
        )}
      </div>
      <blockquote className="gb-ref-quote">{r.quote}</blockquote>
      {r.full && (
        <details className="gb-ref-more">
          <summary>
            {r.moreLabel || "Read the full message"}
            <Icon name="chev" size={14} />
          </summary>
          <p>{r.full}</p>
        </details>
      )}
      <figcaption className="gb-ref-cap">
        <strong>{r.name}</strong>
        <span>{r.role}</span>
      </figcaption>
      {(r.href || r.contextHref) && (
        <div className="gb-ref-foot">
          {r.contextHref && (
            <Link className="gb-ref-link" href={r.contextHref}>
              <Icon name="play" size={14} />
              {r.contextLabel || "See the work"}
            </Link>
          )}
          {r.href && (
            <a className="gb-ref-link" href={r.href} target="_blank" rel="noopener noreferrer">
              <Icon name="letter" size={14} />
              {linkLabel}
            </a>
          )}
        </div>
      )}
    </figure>
  )
}
