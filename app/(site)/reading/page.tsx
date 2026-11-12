import type { Metadata } from "next"

import { Bookshelf } from "@/components/gambit/bookshelf"
import { EMPTY_TEXT, FINISHED, INTRO, NEXT, READING, WANT } from "@/lib/content/reading"

export const metadata: Metadata = {
  title: "Reading",
  description: INTRO.lead,
}

export default function ReadingPage() {
  return (
    <>
      <header className="mx-auto box-border flex max-w-content flex-col gap-6 px-8 pb-16 pt-24 max-sm:px-4 max-sm:pb-12 max-sm:pt-12">
        <div className="flex max-w-[760px] flex-col gap-4">
          <h1 className="display m-0">{INTRO.title}</h1>
          <p className="lead m-0 text-ink-muted">{INTRO.lead}</p>
        </div>
      </header>
      <div className="border-t border-line">
        <section data-reveal="" aria-label="Bookshelf" className="mx-auto box-border max-w-content px-8 py-24 max-sm:px-4 max-sm:py-16">
          <Bookshelf reading={READING} next={NEXT} read={FINISHED} wishlist={WANT} emptyText={EMPTY_TEXT} />
        </section>
      </div>
    </>
  )
}
