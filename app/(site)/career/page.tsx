import type { Metadata } from "next"
import Link from "next/link"

import { StoryRail } from "@/components/gambit/story-rail"
import { Timeline } from "@/components/gambit/timeline"
import { buttonVariants } from "@/components/ui/button"
import { INTRO, MOVES, RAIL } from "@/lib/content/career"
import { CV_HREF } from "@/lib/content/home"
import { BOOK_HREF } from "@/lib/site"

export const metadata: Metadata = {
  title: "Career",
  description: INTRO.lead,
}

export default function CareerPage() {
  return (
    <>
      <StoryRail items={RAIL} after="career-top" ctaLabel="Book a free call" />

      <div className="mx-auto box-border flex max-w-content flex-col gap-10 px-[clamp(16px,4vw,32px)] pb-24 pt-[72px]">
        <div id="career-top" className="flex flex-col gap-[18px]">
          <h1 className="display m-0 max-w-[760px]">{INTRO.title}</h1>
          <p className="lead m-0 max-w-[620px] text-ink-muted">{INTRO.lead}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={BOOK_HREF} className={buttonVariants()}>
              Book a free discovery call
            </Link>
            <a href={CV_HREF} download="Lewis_Magangi_CV.pdf" className={buttonVariants({ variant: "outline" })}>
              {INTRO.cvLabel}
            </a>
            <Link className="gb-link" href="/education">
              {INTRO.studiedLabel}
            </Link>
          </div>
        </div>

        <div className="min-w-0">
          <Timeline items={MOVES} initial={MOVES.length - 1} scrollSpy controls taskTitle={INTRO.taskTitle} />
        </div>
      </div>
    </>
  )
}
