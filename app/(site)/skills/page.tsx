import type { Metadata } from "next"
import Link from "next/link"

import { StoryRail } from "@/components/gambit/story-rail"
import { SplitWords } from "@/components/site/split-words"
import { buttonVariants } from "@/components/ui/button"
import { CLOSE, GROUPS, INTRO, LEVELS, NOW, type SkillLevel } from "@/lib/content/skills"
import { BOOK_HREF } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Skills",
  description: INTRO.lead,
}

const BOOK_LABEL = "Book a free discovery call"

// The legend lists only the levels in use, so it never explains a circle the page doesn't show.
const USED_LEVELS = (Object.keys(LEVELS) as SkillLevel[]).filter((l) => GROUPS.some((g) => g.skills.some((s) => s.level === l)))

function LevelDot({ level }: { level: SkillLevel }) {
  return <span className="gb-level-dot" data-level={level} aria-hidden />
}

export default function SkillsPage() {
  return (
    <>
      <StoryRail items={GROUPS.map((g) => ({ id: g.id, label: g.title }))} after="skills-top" ctaLabel="Book a free call" />

      <div className="mx-auto box-border flex max-w-content flex-col gap-16 px-8 pb-24 pt-[72px] max-sm:gap-12 max-sm:px-4 max-sm:pb-16 max-sm:pt-12">
        <header id="skills-top" className="flex max-w-[720px] flex-col gap-5">
          <SplitWords text={INTRO.title} className="display m-0" />
          <p className="lead m-0 text-ink-muted">{INTRO.lead}</p>
          <ul aria-label="What the circles mean" className="m-0 flex list-none flex-wrap gap-6 p-0 text-sm text-ink-muted">
            {USED_LEVELS.map((l) => (
              <li key={l} className="flex items-center gap-2">
                <LevelDot level={l} />
                {LEVELS[l].label}: {LEVELS[l].meaning}
              </li>
            ))}
          </ul>
        </header>

        <nav aria-label="Skill groups" className="flex flex-wrap gap-2 border-y border-line py-4">
          {GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="inline-flex min-h-9 items-center gap-2 rounded-full border border-line px-3.5 text-sm text-ink-muted no-underline transition-colors duration-fast ease-out hover:border-line-strong hover:text-ink max-md:min-h-11"
            >
              {g.title}
              <span className="font-mono text-xs tabular-nums text-ink-subtle">{g.skills.length}</span>
            </a>
          ))}
        </nav>

        {GROUPS.map((g) => (
          <section
            key={g.id}
            id={g.id}
            data-reveal=""
            aria-labelledby={`${g.id}-h`}
            className="grid scroll-mt-20 grid-cols-[minmax(0,280px)_minmax(0,1fr)] items-start gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-5"
          >
            <div className="sticky top-[88px] flex flex-col gap-3 max-[900px]:static">
              <h2 id={`${g.id}-h`} className="title m-0">
                {g.title}
              </h2>
              <p className="m-0 text-sm text-ink-muted">{g.note}</p>
            </div>
            <ul className="m-0 flex list-none flex-col p-0">
              {g.skills.map((s) => (
                <li
                  key={s.name}
                  className="grid grid-cols-[minmax(0,1.1fr)_120px_minmax(0,1.4fr)] items-baseline gap-6 border-t border-line py-4 last:border-b max-sm:grid-cols-[1fr_auto] max-sm:gap-x-4 max-sm:gap-y-2"
                >
                  <div className="flex flex-col gap-1">
                    <strong className="font-medium">{s.name}</strong>
                    <span className="text-sm text-ink-muted">{s.how}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-ink-subtle">
                    <LevelDot level={s.level} />
                    {LEVELS[s.level].label}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-muted max-md:gap-y-0 max-sm:col-span-full">
                    {s.evidence.map((e) => (
                      <Link key={e.label} href={e.href} className="text-ink underline decoration-line-strong underline-offset-[3px] transition-[text-decoration-color] duration-fast ease-out hover:decoration-ink max-md:inline-flex max-md:min-h-11 max-md:items-center">
                        {e.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section
          data-reveal=""
          aria-label="Latest track"
          className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-line bg-surface p-7"
        >
          <div className="flex max-w-[620px] flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-subtle">{NOW.when}</span>
            <strong className="title">{NOW.title}</strong>
            <p className="m-0 text-sm text-ink-muted">{NOW.body}</p>
          </div>
          <Link href={NOW.cta.href} className={buttonVariants({ variant: "outline" })}>
            {NOW.cta.label}
          </Link>
        </section>

        <section data-reveal="" aria-labelledby="skills-close-h" className="flex flex-col items-start gap-5 border-t border-line pt-12">
          <h2 id="skills-close-h" className="heading m-0">
            {CLOSE.heading}
          </h2>
          <p className="m-0 max-w-[560px] text-ink-muted">{CLOSE.body}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={BOOK_HREF} className={cn(buttonVariants())}>
              {BOOK_LABEL}
            </Link>
            <Link className="gb-link" href={CLOSE.secondary.href}>
              {CLOSE.secondary.label}
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
