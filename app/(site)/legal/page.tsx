import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy and terms",
  description: "Plain language. What I keep when you book a call or send a message, and the terms behind the prices on this site.",
}

// Legal board: one short page, with #privacy and #terms anchors for the footer links.
const SECTIONS = [
  {
    id: "privacy",
    title: "Privacy",
    body: [
      "When you book a call or send a message, I keep your name, email, the company you mention and your notes so I can reply and run the call. I don’t sell or share them, and I don’t use tracking cookies.",
      "The booking sends a calendar invite through Google. You can ask me to delete your details at any time by replying to any email from me.",
    ],
  },
  {
    id: "terms",
    title: "Terms",
    body: [
      "The discovery call is free and carries no obligation. Prices on this site are typical ranges, not offers; the scope, price and timeline for any project are agreed in writing before work starts.",
      "Live sites shown on this site belong to the organisations I built them for.",
    ],
  },
]

const sec = "mx-auto box-border flex max-w-content flex-col px-8 max-sm:px-4"

export default function LegalPage() {
  return (
    <>
      <header>
        <div className={`${sec} gap-4 pb-16 pt-24 max-sm:pb-10 max-sm:pt-12`}>
          <h1 className="display m-0 max-w-[760px]">Privacy and terms.</h1>
          <p className="m-0 max-w-[680px] text-lg leading-7 text-ink-muted max-sm:text-base max-sm:leading-6">
            Plain language. Last updated November 2026.
          </p>
        </div>
      </header>
      {SECTIONS.map((s) => (
        <div key={s.id} id={s.id} className="scroll-mt-20 border-t border-line">
          <section aria-labelledby={`${s.id}-h`} className={`${sec} gap-4 py-24 max-sm:py-16`}>
            <h2 id={`${s.id}-h`} className="heading m-0">
              {s.title}
            </h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 24)} className="m-0 max-w-[680px] text-ink-muted">
                {p}
              </p>
            ))}
          </section>
        </div>
      ))}
    </>
  )
}
