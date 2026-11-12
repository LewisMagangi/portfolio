import type { Metadata } from "next"
import Link from "next/link"

import { BookingWidget } from "@/components/gambit/booking-widget"
import { Shader } from "@/components/site/shader"

export const metadata: Metadata = {
  title: "Book a free discovery call",
  description: "Thirty minutes online, on Google Meet. Pick a weekday and a time; you’ll get a confirmation email with the link and a calendar invite.",
}

// Book board: hero, the booking widget, then "Before you book" with the questions people ask.
const FAQ = [
  { q: "Who is this for?", a: "Recruiters and hiring managers, founders with a project, and anyone who wants to talk through a build, a security question or getting into AI engineering." },
  { q: "What happens after I book?", a: "You get an email with the Google Meet link and a calendar invite. I read your notes beforehand so we can start on the real question." },
  { q: "Can I reschedule or cancel?", a: "Yes. The confirmation email has a link to move or cancel the call, up to two hours before it starts." },
  { q: "Is it really free?", a: "Yes. It’s a first conversation, not a sales call. If there’s paid work at the end of it, we’ll agree the scope separately." },
]

export default function BookPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Shader shape="warp" type="4x4" size={2} speed={0.16} front="line" fade="right" opacity={0.5} />
        <div className="relative mx-auto box-border flex max-w-content flex-col gap-5 px-8 pb-16 pt-24 max-sm:px-4 max-sm:pb-12 max-sm:pt-12">
          <h1 className="display m-0 max-w-[720px]">Book a free discovery call.</h1>
          <p className="lead m-0 max-w-[600px] text-ink-muted">
            Thirty minutes online, on Google Meet. Pick a weekday and a time; you’ll get a confirmation email with the link and a calendar invite.
          </p>
        </div>
      </section>

      <div className="mx-auto box-border flex max-w-content flex-col gap-24 px-8 pb-32 pt-16 max-sm:gap-16 max-sm:px-4 max-sm:pb-20 max-sm:pt-10">
        <BookingWidget />

        <section aria-labelledby="before-h" className="flex flex-wrap items-start gap-14">
          <div className="flex flex-[1_1_280px] flex-col gap-3">
            <h2 id="before-h" className="heading m-0">
              Before you book
            </h2>
            <p className="m-0 text-ink-muted">
              Rather write first? <Link href="/contact">Send a message</Link> and I’ll reply within two working days.
            </p>
            <p className="m-0 text-ink-muted">
              Already booked? <Link href="/book/manage">Reschedule or cancel your call</Link>.
            </p>
          </div>
          <dl className="m-0 min-w-0 flex-[999_1_560px]">
            {FAQ.map((f) => (
              <div key={f.q} className="flex flex-col gap-1.5 border-t border-line py-5">
                <dt className="text-sm font-semibold">{f.q}</dt>
                <dd className="m-0 text-sm leading-[22px] text-ink-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  )
}
