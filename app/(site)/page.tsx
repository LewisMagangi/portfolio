/* eslint-disable @next/next/no-img-element -- the 48px portrait is a local square crop */
import Link from "next/link"
import type { ReactNode } from "react"

import { Accordion } from "@/components/gambit/accordion"
import { CarouselControls } from "@/components/gambit/carousel"
import { CaseStudyCard } from "@/components/gambit/case-study-card"
import { FEATURED } from "@/lib/content/work"
import { CertificateCarousel } from "@/components/gambit/certificate-carousel"
import { ChallengeBoard } from "@/components/gambit/challenge-board"
import { DeviceMockup } from "@/components/gambit/device-mockup"
import { Icon } from "@/components/gambit/icon"
import { PricingTiers, ServiceList } from "@/components/gambit/pricing"
import { ReferenceCard } from "@/components/gambit/reference-card"
import { StoryRail } from "@/components/gambit/story-rail"
import { TaglineReveal } from "@/components/gambit/tagline-reveal"
import { Timeline } from "@/components/gambit/timeline"
import { Shader } from "@/components/site/shader"
import { SplitWords } from "@/components/site/split-words"
import { buttonVariants } from "@/components/ui/button"
import {
  CAREER,
  CERTS,
  CLOSE,
  CV_HREF,
  FAQ,
  HERO,
  OFF,
  PORTRAIT_SQUARE,
  SERVICES,
  SKILLS_TEASER,
  STORY,
  TAGLINE,
  TRUST,
  WORK,
} from "@/lib/content/home"
import { getApprovedClientReviews } from "@/lib/reviews"
import { getServices } from "@/lib/services"
import { BOOK_HREF } from "@/lib/site"
import { cn } from "@/lib/utils"

// Approving a client review or saving in Admin › Services revalidates "/"; this is the fallback refresh.

// Case study pages live at the slugs in lib/content/work.ts.
const workHref = (title: string) => `/work/${FEATURED.find((f) => f.title === title)?.slug ?? ""}`
export const revalidate = 3600

const BOOK_LABEL = "Book a free discovery call"

/** A ruled section on the 1080px column (Main board: .lm-rule + .lm-sec). */
function Section({
  id,
  labelledBy,
  children,
  className,
  reveal = true,
}: {
  id?: string
  labelledBy?: string
  children: ReactNode
  className?: string
  reveal?: boolean
}) {
  return (
    <div id={id} className="border-t border-line">
      <section
        data-reveal={reveal ? "" : undefined}
        aria-labelledby={labelledBy}
        className={cn(
          "mx-auto flex max-w-content flex-col gap-12 px-8 py-24 max-sm:gap-8 max-sm:px-4 max-sm:py-16",
          className,
        )}
      >
        {children}
      </section>
    </div>
  )
}

function Head({ id, title, lead, as: H = "h2", titleClass = "heading" }: { id: string; title: string; lead?: ReactNode; as?: "h2" | "h3"; titleClass?: string }) {
  return (
    <div className="flex max-w-[680px] flex-col gap-4">
      <H id={id} className={cn(titleClass, "m-0")}>
        {title}
      </H>
      {lead && <p className="m-0 text-lg text-ink-muted max-sm:text-base">{lead}</p>}
    </div>
  )
}

export default async function HomePage() {
  const [clientReviews, offer] = await Promise.all([getApprovedClientReviews(), getServices("home")])
  const refs = [...TRUST.refs, ...clientReviews]

  return (
    <>
      <StoryRail items={STORY} after="top" ctaLabel="Book a free call" />

      {/* Hero: the offer, the action, a site that is actually running */}
      <header id="top" className="relative overflow-hidden">
        <Shader shape="warp" type="4x4" size={2} speed={0.12} front="line" fade="right" opacity={0.6} />
        <div className="relative mx-auto grid max-w-content grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center gap-10 px-8 py-24 max-lg:grid-cols-1 max-lg:gap-12 max-sm:px-4 max-sm:pb-16 max-sm:pt-12">
          <div className="flex min-w-0 flex-col gap-6">
            <SplitWords text={HERO.title} className="display-xl m-0 max-w-[680px]" />
            <p className="lead m-0 max-w-[560px] text-ink-muted">{HERO.lead}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={BOOK_HREF} className={buttonVariants()}>
                {BOOK_LABEL}
              </Link>
              <a href="#work" className={buttonVariants({ variant: "outline" })}>
                See the work
              </a>
            </div>
            <p className="m-0 text-sm text-ink-muted">
              {HERO.note}{" "}
              <a href={CV_HREF} download="Lewis_Magangi_CV.pdf">
                {HERO.cvLabel}
              </a>
              .
            </p>
          </div>
          <div className="min-w-0">
            <DeviceMockup
              url={HERO.device.url}
              liveUrl={HERO.device.liveUrl}
              mock={HERO.device.mock}
              mobileMock={HERO.device.mobileMock}
              caption={HERO.device.caption}
            />
          </div>
        </div>
      </header>

      {/* Work */}
      <Section id="work" labelledBy="work-h">
        <Head id="work-h" title={WORK.heading} lead={WORK.lead} />
        <div className="min-w-0">
          <div
            id="case-track"
            className="gb-carousel-track"
            tabIndex={0}
            role="region"
            aria-label="Case studies"
            style={{ ["--slide" as string]: "100%" }}
          >
            {WORK.cases.map((c) => (
              <CaseStudyCard key={c.title} study={c} href={workHref(c.title)} />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CarouselControls target="case-track" label="Case studies" itemLabel="case study" />
          <Link href="/work" className={buttonVariants({ variant: "outline" })}>
            {WORK.allLabel}
          </Link>
        </div>
      </Section>

      {/* Skills teaser */}
      <Section id="skills" labelledBy="skills-h" className="gap-10">
        <Head id="skills-h" title={SKILLS_TEASER.heading} lead={SKILLS_TEASER.lead} />
        <ul className="m-0 grid list-none grid-cols-4 gap-8 p-0 max-md:grid-cols-2 max-md:gap-6 max-[480px]:grid-cols-1 max-[480px]:gap-4">
          {SKILLS_TEASER.columns.map((k) => (
            <li key={k.title} className="flex flex-col gap-2 border-t border-line pt-4">
              <strong className="text-lg font-medium">{k.title}</strong>
              <span className="text-sm text-ink-muted">{k.items}</span>
            </li>
          ))}
        </ul>
        <div>
          <Link className="gb-link" href="/skills">
            {SKILLS_TEASER.link}
          </Link>
        </div>
      </Section>

      {/* Tagline reveal */}
      <Section reveal={false}>
        <TaglineReveal text={TAGLINE} />
      </Section>

      {/* Services and pricing */}
      <Section id="services" labelledBy="svc-h">
        <Head id="svc-h" title={SERVICES.heading} lead={SERVICES.lead} />
        <ServiceList items={offer.items} />
        <PricingTiers tiers={offer.tiers} footnote={SERVICES.footnote} ctaLabel={BOOK_LABEL} />
        <ol
          aria-label="How a project works"
          className="m-0 grid list-none grid-cols-3 gap-8 p-0 [counter-reset:s] max-md:grid-cols-1 max-md:gap-4"
        >
          {SERVICES.steps.map((s) => (
            <li
              key={s.title}
              className="flex flex-col gap-2 border-t border-line pt-4 [counter-increment:s] before:font-mono before:text-xs before:text-ink-subtle before:content-[counter(s)]"
            >
              <strong className="text-lg font-medium">{s.title}</strong>
              <span className="text-ink-muted">{s.body}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* How I got here */}
      <Section id="career" labelledBy="car-h">
        <Head id="car-h" title={CAREER.heading} lead={CAREER.lead} />
        <Timeline items={CAREER.milestones} initial={CAREER.milestones.length - 1} scrollSpy />
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/career" className={buttonVariants({ variant: "outline" })}>
            {CAREER.fullLabel}
          </Link>
          <Link className="gb-link" href="/ai-ml">
            {CAREER.aiLabel}
          </Link>
        </div>
      </Section>

      {/* References and certificates */}
      <Section id="trust" labelledBy="trust-h">
        <Head id="trust-h" title={TRUST.heading} lead={TRUST.lead} />
        <div className="flex flex-wrap items-center gap-4">
          <Link href={TRUST.reviewCta.href} className={buttonVariants({ variant: "outline" })}>
            {TRUST.reviewCta.label}
          </Link>
          <span className="text-sm text-ink-muted">{TRUST.reviewCta.note}</span>
        </div>
        <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
          {refs.map((r) => (
            <ReferenceCard key={r.name + r.relation} reference={r} linkLabel={TRUST.letterLabel} />
          ))}
        </div>
        <details className="group border-t border-line pt-4">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-sm font-medium [&::-webkit-details-marker]:hidden">
            {TRUST.moreLabel}
            <Icon name="chev" size={16} className="transition-transform duration-open ease-out group-open:rotate-180" />
          </summary>
          <div className="mt-4 grid grid-cols-2 gap-6 max-lg:grid-cols-1">
            {TRUST.moreRefs.map((r) => (
              <ReferenceCard key={r.name} reference={r} linkLabel={TRUST.letterLabel} />
            ))}
          </div>
        </details>
        <div className="mt-8 flex max-w-[680px] flex-col gap-2">
          <h3 className="title m-0">{TRUST.certsHeading}</h3>
          <p className="m-0 text-sm text-ink-muted">{TRUST.certsLead}</p>
        </div>
        <CertificateCarousel items={CERTS} id="cert-track" label="Certificates" />
        <div>
          <Link href="/certificates" className={buttonVariants({ variant: "outline" })}>
            {TRUST.certsAll}
          </Link>
        </div>
      </Section>

      {/* Off the clock */}
      <Section id="off" labelledBy="off-h">
        <Head
          id="off-h"
          title={OFF.heading}
          lead={
            <>
              {OFF.leadBefore}
              <Link href="/chess">{OFF.leadLink}</Link>
              {OFF.leadAfter}
            </>
          }
        />
        <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start gap-12 max-lg:grid-cols-1">
          <ChallengeBoard items={OFF.challenges} live />
          <div className="flex flex-col gap-4">
            <h3 className="m-0 text-lg font-medium">{OFF.readingHeading}</h3>
            <ul className="m-0 list-none p-0">
              {OFF.reading.map((b) => (
                <li key={b.title} className="flex flex-col border-t border-line py-3">
                  <strong className="font-medium">{b.title}</strong>
                  <span className="text-sm text-ink-muted">{b.where}</span>
                </li>
              ))}
            </ul>
            <Link className="gb-link text-sm" href="/reading">
              {OFF.shelfLabel}
            </Link>
          </div>
        </div>
      </Section>

      {/* Questions */}
      <Section id="faq" labelledBy="faq-h">
        <Head id="faq-h" title={FAQ.heading} />
        <div className="max-w-[760px]">
          <Accordion items={FAQ.items} initial={-1} />
        </div>
      </Section>

      {/* Your move */}
      <div id="book" className="relative overflow-hidden border-t border-line">
        <Shader shape="warp" type="4x4" size={2} speed={0.12} front="line" fade="right" opacity={0.5} />
        <section
          data-reveal=""
          aria-labelledby="book-h"
          className="relative mx-auto flex max-w-content flex-col gap-12 px-8 py-24 max-sm:gap-8 max-sm:px-4 max-sm:py-16"
        >
          <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-12">
            <div className="flex max-w-[680px] flex-col gap-4">
              <h2 id="book-h" className="display m-0">
                {CLOSE.heading}
              </h2>
              <p className="m-0 text-lg text-ink-muted max-sm:text-base">{CLOSE.lead}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href={BOOK_HREF} className={buttonVariants()}>
                  {BOOK_LABEL}
                </Link>
                <Link className="gb-link" href="/contact">
                  {CLOSE.messageLabel}
                </Link>
              </div>
            </div>
            <ul className="m-0 flex list-none flex-col gap-3 rounded-xl border border-line bg-surface p-6">
              <li className="flex items-center gap-3 border-b border-line pb-3 text-sm text-ink">
                <img
                  src={PORTRAIT_SQUARE}
                  alt="Lewis Magangi"
                  width={48}
                  height={48}
                  className="size-12 rounded-full border border-line-strong object-cover"
                />
                <span>{CLOSE.me}</span>
              </li>
              {CLOSE.facts.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm text-ink-muted">
                  <Icon name={f.icon} size={16} />
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}
