import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import type { CaseStudy } from "@/lib/content/home"
import { cn } from "@/lib/utils"

import { DeviceMockup } from "./device-mockup"
import { Icon } from "./icon"

/** Problem first: what was broken, what I did, what changed, with the live site beside it. */
export function CaseStudyCard({ study, href }: { study: CaseStudy; href?: string }) {
  return (
    <article className="gb-case">
      <div className="gb-case-copy">
        <div className="gb-case-meta">
          <span>{study.period}</span>
          {study.award ? (
            <span className="gb-tag gb-tag-award">{study.award}</span>
          ) : study.kind ? (
            <span className="gb-tag">{study.kind}</span>
          ) : null}
        </div>
        <h3 className="gb-case-title">{study.title}</h3>
        <p className="gb-case-problem">{study.problem}</p>
        <ol className="gb-case-steps">
          {study.approach.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ol>
        <dl className="gb-case-results">
          {study.results.map((r) => (
            <div key={r.l}>
              <dt>{r.v}</dt>
              <dd>{r.l}</dd>
            </div>
          ))}
        </dl>
        <div className="gb-case-foot">
          {href && (
            <Link href={href} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Read the case study
              <Icon name="arrow" size={14} />
            </Link>
          )}
          {study.liveUrl && (
            <a className="gb-case-live" href={study.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit the live site
              <Icon name="newtab" size={14} />
            </a>
          )}
        </div>
      </div>
      <div className="gb-case-shot">
        <DeviceMockup url={study.url} liveUrl={study.live ? study.liveUrl : undefined} mock={study.mock} compact />
      </div>
    </article>
  )
}
