import type { Metadata } from "next"

import { Shader } from "@/components/site/shader"
import { CONTACT_LINKS } from "@/lib/site"

import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Hiring for AI/ML or full stack, collaborating on something useful, or up for a game? Send me a message.",
}

// Contact board: "Your move." with the ways to reach me on the left, the message form on the right.
export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <Shader shape="warp" type="4x4" size={2} speed={0.12} front="line" fade="right" opacity={0.5} />
      <div className="relative mx-auto box-border flex max-w-content flex-wrap gap-16 px-8 pb-[104px] pt-[88px] max-sm:gap-10 max-sm:px-4 max-sm:pb-16 max-sm:pt-12">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
          <h1 className="display-xl m-0">Your move.</h1>
          <p className="lead m-0 text-ink-muted">
            Hiring for AI/ML or full stack, collaborating on something useful, or up for a game? Send me a message.
          </p>
          <dl className="m-0 mt-2 flex flex-col border-t border-line">
            {CONTACT_LINKS.map((l) => (
              <div key={l.k} className="grid grid-cols-[110px_minmax(0,1fr)] gap-4 border-b border-line py-3.5 max-sm:grid-cols-[88px_minmax(0,1fr)]">
                <dt className="pt-[3px] text-sm font-medium text-ink-subtle">{l.k}</dt>
                <dd className="m-0 min-w-0">
                  <a
                    href={l.href}
                    className="break-words font-mono text-sm"
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.v}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
