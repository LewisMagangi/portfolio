import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { BOOK_HREF } from "@/lib/site"
import { cn } from "@/lib/utils"

import { Icon, type IconName } from "./icon"

export type Service = { icon: IconName; title: string; body: string; points: readonly string[] }

export function ServiceList({ items }: { items: readonly Service[] }) {
  return (
    <ul className="gb-services">
      {items.map((s) => (
        <li key={s.title}>
          <span className="gb-service-icon" aria-hidden>
            <Icon name={s.icon} size={20} />
          </span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
          <ul className="gb-service-points">
            {s.points.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export type Tier = { name: string; price: string; base?: string; for: string; includes: string[]; note?: string; featured?: boolean }

/**
 * Cumulative tiers ("Everything in Bronze, plus"). A badge (`note`) shows only when Admin › Services sets one.
 * A featured tier gets the stronger border, but its button stays outline: one primary action per view.
 */
export function PricingTiers({
  tiers,
  footnote,
  bookHref = BOOK_HREF,
  ctaLabel = "Book a free discovery call",
}: {
  tiers: Tier[]
  footnote?: string
  bookHref?: string
  ctaLabel?: string
}) {
  return (
    <div className="gb-tiers">
      <ul className="gb-tiers-list">
        {tiers.map((t) => (
          <li key={t.name} className={cn("gb-tier", t.featured && "is-featured")}>
            <div className="gb-tier-head">
              <h3>{t.name}</h3>
              {t.note && <span className="gb-tier-note">{t.note}</span>}
            </div>
            <p className="gb-tier-price">
              <span className="gb-tier-from">Typically</span>
              <strong>{t.price}</strong>
              <span className="gb-tier-unit">per project</span>
            </p>
            <p className="gb-tier-for">{t.for}</p>
            {t.base && <p className="gb-tier-base">Everything in {t.base}, plus</p>}
            <ul className="gb-tier-inc">
              {t.includes.map((x) => (
                <li key={x}>
                  <Icon name="check" size={16} />
                  {x}
                </li>
              ))}
            </ul>
            <Link href={bookHref} className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}>
              {ctaLabel}
            </Link>
          </li>
        ))}
      </ul>
      {footnote && <p className="gb-tiers-foot">{footnote}</p>}
    </div>
  )
}
