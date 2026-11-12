import type { Metadata } from "next"
import Link from "next/link"

import { WorkIndex } from "@/components/site/work-index"
import { buttonVariants } from "@/components/ui/button"
import { CLOSE, INTRO } from "@/lib/content/work"
import { BOOK_HREF } from "@/lib/site"

export const metadata: Metadata = {
  title: "Work",
  description: INTRO.lead,
}

export default function WorkPage() {
  return (
    <div className="mx-auto box-border flex max-w-content flex-col gap-10 px-[clamp(16px,4vw,32px)] pb-24 pt-[72px]">
      <div className="flex flex-col gap-[18px]">
        <h1 className="display m-0 max-w-[760px]">{INTRO.title}</h1>
        <p className="lead m-0 max-w-[640px] text-ink-muted">{INTRO.lead}</p>
      </div>

      <WorkIndex />

      <section aria-labelledby="work-close-h" className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-12">
        <div className="flex max-w-[560px] flex-col gap-2">
          <h2 id="work-close-h" className="heading m-0">
            {CLOSE.heading}
          </h2>
          <p className="m-0 text-ink-muted">{CLOSE.body}</p>
        </div>
        <Link href={BOOK_HREF} className={buttonVariants()}>
          Book a free discovery call
        </Link>
      </section>
    </div>
  )
}
