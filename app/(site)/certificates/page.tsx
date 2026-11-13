/* eslint-disable @next/next/no-img-element -- small local certificate thumbnails */
import type { Metadata } from "next"

import { CertificateCarousel } from "@/components/gambit/certificate-carousel"
import { CertGroups } from "@/components/site/cert-groups"
import { getCertificates } from "@/lib/certificates"
import { INTRO } from "@/lib/content/certificates"

export const metadata: Metadata = {
  title: "Certificates",
  description: INTRO.lead,
}

// Admin › Certificates refreshes this on save; the hour is a backstop.
export const revalidate = 3600

export default async function CertificatesPage() {
  const { lead, carousel, groups, others } = await getCertificates()
  return (
    <div className="mx-auto box-border flex max-w-content flex-col gap-12 px-[clamp(16px,4vw,32px)] pb-24 pt-[72px]">
      <div className="flex flex-col gap-[18px]">
        <h1 className="display m-0">{INTRO.title}</h1>
        <p className="lead m-0 max-w-[640px] text-ink-muted">{lead}</p>
      </div>

      <CertificateCarousel items={carousel} id="cert-all" label="Certificates" />

      <CertGroups groups={groups} />

      <section aria-labelledby="other-h" data-reveal="" className="flex flex-col gap-4 border-t border-line pt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="other-h" className="heading m-0">
            Other certificates
          </h2>
          <span className="text-sm text-ink-muted">Short courses, career prep and chess</span>
        </div>
        <ul className="m-0 flex list-none flex-col p-0">
          {others.map((o) => (
            <li key={o.title} className="flex flex-wrap items-center gap-4 border-t border-line py-4 last:border-b">
              <img src={o.image} alt={o.alt} width={112} height={80} loading="lazy" className="h-20 w-28 flex-none rounded-md border border-line bg-surface object-cover" />
              <div className="flex min-w-[min(100%,240px)] flex-1 flex-col gap-0.5">
                <span className="text-xs text-ink-muted">{o.issuer}</span>
                <strong className="font-medium">{o.title}</strong>
                <span className="font-mono text-xs text-ink-subtle">{o.when}</span>
              </div>
              {o.tag && <span className="gb-tag gb-tag-award">{o.tag}</span>}
              {o.href && (
                <a href={o.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm">
                  View certificate ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
