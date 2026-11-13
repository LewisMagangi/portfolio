import Link from "next/link"

import type { AwardData } from "@/lib/content/awards"
import { cn } from "@/lib/utils"

/** Gambit AwardCard: the rank in amber (ink when quiet), then the title, the event and the work behind it. */
export function AwardCard({ award }: { award: AwardData }) {
  return (
    <article className={cn("gb-award", award.tone === "quiet" && "gb-award-quiet")}>
      <div className={cn("gb-award-rank", award.rank.length > 4 && "is-long")}>{award.rank}</div>
      <div className="gb-award-body">
        <h3 className="gb-award-title">{award.title}</h3>
        <p className="gb-award-event">{award.event}</p>
        <div className="gb-award-foot">
          <span>{award.year}</span>
          {award.href && <Link href={award.href}>{award.linkLabel ?? "See the work"}</Link>}
          {award.proofUrl && (
            <a href={award.proofUrl} target="_blank" rel="noopener noreferrer">
              Proof
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
