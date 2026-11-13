import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import type { CaseStudy } from "@/lib/content/home"
import { cn } from "@/lib/utils"

import { DeviceMockup } from "./device-mockup"
import { Icon } from "./icon"

/**
 * Problem first: what was broken, what I did, what changed, with the live site beside it (v9: copy 4 columns, frame
 * 8; the period sits under the title, and the result reads as one sentence).
 */
export function CaseStudyCard({ study, href }: { study: CaseStudy; href?: string }) {
  return (
    <article className="gb-case">
      <div className="gb-case-copy">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="gb-case-title">{study.title}</h3>
            {study.award ? (
              <span className="gb-tag gb-tag-award">{study.award}</span>
            ) : study.kind ? (
              <span className="gb-tag">{study.kind}</span>
            ) : null}
          </div>
          {study.period !== study.kind && <p className="m-0 text-sm text-ink-muted">{study.period}</p>}
        </div>
        <p className="gb-case-problem">{study.problem}</p>
        <ol className="gb-case-steps">
          {study.approach.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ol>
        <p className="gb-case-outcome">{study.outcome}</p>
        <div className="gb-case-foot">
          {href ? (
            <Link href={href} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Read the case study
              <Icon name="arrow" size={14} />
            </Link>
          ) : (
            study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Follow the build
                <Icon name="newtab" size={14} />
              </a>
            )
          )}
        </div>
      </div>
      <div className="gb-case-shot">
        <DeviceMockup
          url={study.url}
          liveUrl={study.live ? study.liveUrl : undefined}
          shots={study.shots}
          mock={study.mock}
          compact
        />
      </div>
    </article>
  )
}
