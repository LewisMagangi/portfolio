import type { Metadata } from "next"
import Link from "next/link"

import { Accordion } from "@/components/gambit/accordion"
import { PricingTiers, ServiceList } from "@/components/gambit/pricing"
import { buttonVariants } from "@/components/ui/button"
import { FAQ, SERVICES } from "@/lib/content/home"
import { getServices } from "@/lib/services"
import { BOOK_HREF } from "@/lib/site"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four kinds of work, priced per project. Every engagement starts with a free 30 minute discovery call, and you get a quote before anything is built.",
}

const BOOK_LABEL = "Book a free discovery call"
const sec = "mx-auto box-border flex max-w-content flex-col gap-12 px-8 py-24 max-sm:gap-8 max-sm:px-4 max-sm:py-16"

const STEPS = [
  { title: "Discovery call", body: "Free and online. We talk through the problem and whether I’m the right fit." },
  { title: "Scope and quote", body: "I send back what I’ll build, the tier it fits and the price." },
  { title: "Build and hand over", body: "I build in short steps you can see, then hand over the code and access." },
]

// "Work behind each service" (Services board). Case studies get their own page.
const PROOF = [
  { title: "Web development", body: "Wamumbi, a charity platform its officials run, deployed on real data.", href: "/work/wamumbi-charity-platform" },
  { title: "AI and ML engineering", body: "DataCamp Associate AI Engineer, and Machine Learning in Production.", href: "/ai-ml" },
  { title: "Data", body: "The 3NF schema and 51 tables under Wamumbi.", href: "/work/wamumbi-charity-platform" },
  { title: "Cybersecurity", body: "BSc Computer Forensics, and Dynamic Cryptosuite, best final year project.", href: "/education#programmes" },
]

function Head({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div className="flex max-w-[680px] flex-col gap-4">
      <h2 id={id} className="heading m-0">
        {title}
      </h2>
      {lead && <p className="m-0 text-lg leading-7 text-ink-muted max-sm:text-base max-sm:leading-6">{lead}</p>}
    </div>
  )
}

// Saving in Admin › Services revalidates "/services"; this is the fallback refresh.
export const revalidate = 3600

export default async function ServicesPage() {
  const offer = await getServices()
  return (
    <>
      <header>
        <section className={sec}>
          <div className="flex max-w-[680px] flex-col gap-4">
            <h1 className="display m-0">Services and pricing.</h1>
            <p className="m-0 text-lg leading-7 text-ink-muted max-sm:text-base max-sm:leading-6">
              Four kinds of work, priced per project. Every engagement starts with a free 30 minute discovery call, and you get a quote before
              anything is built.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={BOOK_HREF} className={buttonVariants()}>
              {BOOK_LABEL}
            </Link>
            <Link className="gb-link" href="/work">
              See the work first
            </Link>
          </div>
        </section>
      </header>

      <div id="what" className="border-t border-line">
        <section data-reveal="" aria-labelledby="what-h" className={sec}>
          <Head id="what-h" title="What I do." />
          <ServiceList items={offer.items} />
        </section>
      </div>

      <div id="pricing" className="border-t border-line">
        <section data-reveal="" aria-labelledby="price-h" className={sec}>
          <Head id="price-h" title="What it costs." lead="Each tier includes everything in the one before it." />
          <PricingTiers tiers={offer.tiers} footnote={SERVICES.footnote} ctaLabel={BOOK_LABEL} />
        </section>
      </div>

      <div id="process" className="border-t border-line">
        <section data-reveal="" aria-labelledby="proc-h" className={sec}>
          <Head id="proc-h" title="How a project runs." />
          <ol aria-label="How a project works" className="m-0 grid list-none grid-cols-3 gap-8 p-0 max-md:grid-cols-1 max-md:gap-4">
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

      <div id="proof" className="border-t border-line">
        <section data-reveal="" aria-labelledby="proof-h" className={sec}>
          <Head id="proof-h" title="Work behind each service." />
          <div className="grid grid-cols-2 gap-x-8 max-md:grid-cols-1">
            {PROOF.map((p) => (
              <Link key={p.title} href={p.href} className="group flex flex-col gap-1 border-t border-line py-4 text-ink no-underline">
                <strong className="font-medium underline-offset-[3px] group-hover:underline">{p.title}</strong>
                <span className="text-sm text-ink-muted">{p.body}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div id="faq" className="border-t border-line">
        <section data-reveal="" aria-labelledby="faq-h" className={sec}>
          <Head id="faq-h" title={FAQ.heading} />
          <Accordion items={[...FAQ.items]} initial={-1} />
          <div>
            <Link href={BOOK_HREF} className={buttonVariants()}>
              {BOOK_LABEL}
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
