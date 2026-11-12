import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { ChessPosition } from "@/components/gambit/chess-position"
import { buttonVariants } from "@/components/ui/button"
import { BEYOND, INTRO, PORTRAIT, REFERENCES, STACK } from "@/lib/content/about"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "About",
  description: INTRO.paragraphs[0],
}

const card = "rounded-lg border border-line bg-surface"
const eyebrow = "text-sm font-medium text-ink-subtle"

export default function AboutPage() {
  const { chess, enactus } = BEYOND
  return (
    <div className="mx-auto box-border flex max-w-content flex-col gap-16 px-[clamp(16px,4vw,32px)] pb-24 pt-[72px]">
      <section className="flex flex-wrap items-start gap-14">
        <Image
          src={PORTRAIT.src}
          alt={PORTRAIT.alt}
          width={280}
          height={350}
          priority
          className="h-[350px] w-[280px] flex-[0_0_280px] rounded-lg border border-line bg-surface object-cover object-[center_20%] max-sm:w-full max-sm:flex-auto"
        />
        <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-[18px]">
          <h1 className="display m-0">{INTRO.title}</h1>
          {INTRO.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="m-0 max-w-[640px] text-ink-muted">
              {p}
            </p>
          ))}
          <div className="flex flex-wrap gap-2.5">
            <a href={INTRO.cv.href} download="Lewis_Magangi_CV.pdf" className={buttonVariants()}>
              {INTRO.cv.label}
            </a>
            <Link href={INTRO.career.href} className={buttonVariants({ variant: "outline" })}>
              {INTRO.career.label}
            </Link>
          </div>
        </div>
      </section>

      <section data-reveal="" aria-labelledby="stack-h" className="flex flex-col gap-6">
        <h2 id="stack-h" className="heading m-0">
          {STACK.heading}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
          {STACK.groups.map((g) => (
            <div key={g.name} className={cn(card, "flex flex-col gap-3 p-5")}>
              <span className={eyebrow}>{g.name}</span>
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {g.items.map((t) => (
                  <li key={t} className="gb-tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section data-reveal="" aria-labelledby="beyond-h" className="flex flex-col gap-6">
        <h2 id="beyond-h" className="heading m-0">
          {BEYOND.heading}
        </h2>
        <div className="flex flex-wrap gap-6">
          <article className={cn(card, "flex min-w-0 flex-[2_1_480px] flex-wrap items-center gap-7 p-7")}>
            <ChessPosition {...chess.position} size={176} className="flex-none" />
            <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-2.5">
              <span className={eyebrow}>{chess.eyebrow}</span>
              <h3 className="title m-0">{chess.title}</h3>
              <p className="m-0 text-ink-muted">{chess.body}</p>
              <div className="flex flex-wrap gap-2">
                {chess.tags.map((t) => (
                  <span key={t.label} className={cn("gb-tag", t.award && "gb-tag-award")}>
                    {t.label}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {chess.links.map((l) =>
                  l.external ? (
                    <a key={l.href} className="gb-link max-md:inline-flex max-md:min-h-11 max-md:items-center" href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label}
                    </a>
                  ) : (
                    <Link key={l.href} className="gb-link max-md:inline-flex max-md:min-h-11 max-md:items-center" href={l.href}>
                      {l.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </article>
          <article className={cn(card, "flex min-w-0 flex-[1_1_280px] flex-col gap-2.5 p-7")}>
            <span className={eyebrow}>{enactus.eyebrow}</span>
            <h3 className="title m-0">{enactus.title}</h3>
            <p className="m-0 text-sm text-ink-muted">{enactus.body}</p>
          </article>
        </div>
      </section>

      <section data-reveal="" aria-labelledby="refs-h" className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
        <div className="flex flex-col gap-1.5">
          <h2 id="refs-h" className="heading m-0">
            {REFERENCES.heading}
          </h2>
          <p className="m-0 text-ink-muted">{REFERENCES.body}</p>
        </div>
        <Link href={REFERENCES.cta.href} className={buttonVariants({ variant: "outline" })}>
          {REFERENCES.cta.label}
        </Link>
      </section>
    </div>
  )
}
