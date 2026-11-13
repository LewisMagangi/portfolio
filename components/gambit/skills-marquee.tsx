"use client"

import Link from "next/link"
import { useState } from "react"

import { Icon } from "./icon"

type Tool = { name: string; level: "shipped" | "trained"; group: string }

const ROWS: Tool[][] = [
  [
    { name: "Python", level: "shipped", group: "backend" },
    { name: "Django", level: "shipped", group: "backend" },
    { name: "Flask", level: "shipped", group: "backend" },
    { name: "tRPC", level: "shipped", group: "backend" },
    { name: "Next.js", level: "shipped", group: "frontend" },
    { name: "React", level: "shipped", group: "frontend" },
    { name: "TypeScript", level: "shipped", group: "frontend" },
    { name: "Tailwind", level: "shipped", group: "frontend" },
    { name: "shadcn/ui", level: "shipped", group: "frontend" },
    { name: "PostgreSQL", level: "shipped", group: "data" },
    { name: "Prisma", level: "shipped", group: "data" },
  ],
  [
    { name: "OpenAI API", level: "trained", group: "ai" },
    { name: "LangChain", level: "trained", group: "ai" },
    { name: "Pinecone", level: "trained", group: "ai" },
    { name: "Hugging Face", level: "trained", group: "ai" },
    { name: "scikit-learn", level: "trained", group: "ai" },
    { name: "MLflow", level: "trained", group: "ai" },
    { name: "Docker", level: "trained", group: "delivery" },
    { name: "GitHub Actions", level: "shipped", group: "delivery" },
    { name: "Vercel", level: "shipped", group: "delivery" },
    { name: "Git", level: "shipped", group: "delivery" },
    { name: "C and Unix", level: "shipped", group: "backend" },
  ],
]

/**
 * The toolset as the page's last texture: two slow rows in opposite directions, each tool linking to its group on
 * /skills. Pauses on hover, on focus and with its button (WCAG 2.2.2); stands still under reduced motion.
 */
export function SkillsMarquee() {
  const [paused, setPaused] = useState(false)
  return (
    <section aria-labelledby="tools-h" className={paused ? "gb-mq-wrap is-paused" : "gb-mq-wrap"}>
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-8 max-sm:px-4">
        <p id="tools-h" className="m-0 text-lg font-medium">
          The tools behind every move above.{" "}
          <span className="font-normal text-ink-muted">Each one links to the work that used it.</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-3 text-xs text-ink-subtle">
            <span className="inline-flex items-center gap-1.5">
              <i className="gb-level-dot" data-level="shipped" aria-hidden />
              Shipped
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="gb-level-dot" data-level="trained" aria-hidden />
              Trained
            </span>
          </span>
          <button type="button" className="gb-frame-btn" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
            <Icon name={paused ? "play" : "pause"} size={12} />
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        {ROWS.map((row, r) => (
          <div key={r} className="gb-mq">
            <ul className={r === 1 ? "gb-mq-track is-rev" : "gb-mq-track"}>
              {[0, 1].map((copy) =>
                row.map((t) => (
                  <li key={`${copy}-${t.name}`} aria-hidden={copy === 1 || undefined}>
                    <Link href={`/skills#${t.group}`} className="gb-mq-chip" tabIndex={copy === 1 ? -1 : undefined}>
                      <i className="gb-level-dot" data-level={t.level} aria-hidden />
                      {t.name}
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-content px-8 max-sm:px-4">
        <Link className="gb-link text-sm" href="/skills">
          See all 32 skills and where I used each one
        </Link>
      </div>
    </section>
  )
}
