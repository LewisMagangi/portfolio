import type { Metadata } from "next"
import Link from "next/link"

import { CourseStory, type CourseFront } from "@/components/gambit/course-story"
import { StoryRail } from "@/components/gambit/story-rail"
import { TranscriptRequest } from "@/components/site/transcript-request"
import { buttonVariants } from "@/components/ui/button"
import { INTRO, LATEST, PROGRAMMES, SCHOOLS, TRACKS } from "@/lib/content/education"
import { keepDates } from "@/lib/dom"

export const metadata: Metadata = {
  title: "Education",
  description: INTRO.lead,
}

const RAIL = [
  { id: "programmes", label: "Degree and programmes" },
  { id: "transcript-sec", label: "Transcript" },
  { id: "latest", label: "Latest" },
]

const STEPS = [
  { title: "You ask", body: "Name, work email, organisation and why you need it." },
  { title: "I approve", body: "Every request is reviewed by hand. You get a private link by email." },
  { title: "It closes itself", body: "The link works for 60 days, then it expires and the transcript is hidden again." },
]

const sec = "mx-auto box-border flex max-w-content flex-col gap-6 px-8 py-24 max-sm:px-4 max-sm:py-16"
const lead = "m-0 text-lg leading-7 text-ink-muted max-sm:text-base max-sm:leading-6"

/** A programme card, the same face as the CourseStory front, without the flip. */
function ProgrammeCard({ s }: { s: CourseFront }) {
  // Its own grid: the face style pins itself to cell 1/1, which only a flip card should share.
  return (
    <div className="grid min-w-0">
      <article className="gb-cs-face gb-cs-front">
        <div className="gb-cs-meta">
          <span>{keepDates(s.dates)}</span>
          <span className="gb-cs-result">{s.result}</span>
        </div>
        <div className="gb-cs-title">
          <h3 className="title">{s.title}</h3>
          <span>{s.org}</span>
        </div>
        {s.links.length > 0 && (
          <div className="gb-cs-links">
            {s.links.map((l) => (
              <a key={l.href} className="gb-link" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
        {s.groups.map((g) => (
          <div key={g.name} className="gb-cs-group">
            <h4>{g.name}</h4>
            <div className="gb-cs-chips">
              {g.items.map((c) => (
                <span key={c} className="gb-cs-chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </article>
    </div>
  )
}

export default function EducationPage() {
  return (
    <>
      <StoryRail items={RAIL} after="edu-top" ctaLabel="Book a free call" />

      <header id="edu-top">
        <section className={`${sec} pb-12 max-sm:pb-10`}>
          <div className="flex max-w-[760px] flex-col gap-4">
            <h1 className="display m-0">{INTRO.title}</h1>
            <p className={lead}>{INTRO.lead}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#transcript-sec" className={buttonVariants({ variant: "outline" })}>
              Request my transcript
            </a>
            <Link className="gb-link" href="/career">
              See it all in order on Career
            </Link>
          </div>
        </section>
      </header>

      <div id="programmes" className="border-t border-line">
        <section data-reveal="" aria-labelledby="deg-h" className={sec}>
          <div className="flex max-w-[680px] flex-col gap-4">
            <h2 id="deg-h" className="heading m-0">
              {PROGRAMMES.heading}
            </h2>
            <p className={lead}>{PROGRAMMES.lead}</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-6">
            {SCHOOLS.map((s) => (
              <ProgrammeCard key={s.title} s={s} />
            ))}
            {TRACKS.map((t) => (
              <CourseStory key={t.id} front={t.front} stories={t.stories} duration={7} />
            ))}
          </div>
        </section>
      </div>

      <div id="transcript-sec" className="border-t border-line">
        <section data-reveal="" aria-labelledby="tr-h" className={sec}>
          <div className="flex max-w-[680px] flex-col gap-4">
            <h2 id="tr-h" className="heading m-0">
              Transcript
            </h2>
            <p className={lead}>
              Grades stay private by default. Send a request and I’ll review it myself; an approved link opens the transcript for 60 days,
              then closes on its own.
            </p>
          </div>
          <TranscriptRequest />
          <ol aria-label="How access works" className="m-0 grid list-none grid-cols-3 gap-8 p-0 max-md:grid-cols-1 max-md:gap-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-2 border-t border-line pt-4">
                <span className="font-mono text-xs text-ink-subtle" aria-hidden>
                  {i + 1}
                </span>
                <strong className="text-lg font-medium leading-7">{s.title}</strong>
                <span className="text-ink-muted">{s.body}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div id="latest" className="border-t border-line">
        <section data-reveal="" aria-labelledby="now-h" className={sec}>
          <div className="flex max-w-[680px] flex-col gap-4">
            <h2 id="now-h" className="heading m-0">
              {LATEST.heading}
            </h2>
            <p className={lead}>{LATEST.lead}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={LATEST.primary.href} className={buttonVariants({ variant: "outline" })}>
              {LATEST.primary.label}
            </Link>
            <Link className="gb-link" href={LATEST.secondary.href}>
              {LATEST.secondary.label}
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
