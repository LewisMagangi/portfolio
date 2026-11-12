/* eslint-disable @next/next/no-img-element -- certificates keep their exact aspect in a scroll-snap track */
import type { Certificate } from "@/lib/content/home"

import { CarouselControls } from "./carousel"
import { Icon } from "./icon"

function host(u: string) {
  return u.replace(/^https?:\/\//, "").split("/")[0]
}

/** The certificate itself, with its record behind "Verify". */
export function CertificateCarousel({ items, id = "cert-track", label = "Certificates" }: { items: Certificate[]; id?: string; label?: string }) {
  return (
    <div className="gb-certs">
      <ul className="gb-certs-track" id={id} tabIndex={0} aria-label={label}>
        {items.map((c, i) => (
          <li key={c.title} className="gb-cert-slide">
            <figure>
              <div className="gb-cert-img">
                <img
                  src={c.image}
                  alt={`${c.title} certificate issued to Lewis Magangi by ${c.issuer}`}
                  width={c.w}
                  height={c.h}
                  loading={i > 1 ? "lazy" : undefined}
                  decoding="async"
                  draggable={false}
                />
              </div>
              <figcaption>
                <strong>{c.title}</strong>
                <span className="gb-cert-by">
                  {c.issuer}
                  <time>{c.date}</time>
                </span>
              </figcaption>
            </figure>
            <details className="gb-verify">
              <summary>
                <Icon name="shield" size={14} />
                Verify
              </summary>
              <dl>
                {c.credential && (
                  <div>
                    <dt>Credential</dt>
                    <dd translate="no">{c.credential}</dd>
                  </div>
                )}
                {c.fileUrl && (
                  <div>
                    <dt>Certificate file</dt>
                    <dd>
                      <a href={c.fileUrl} target="_blank" rel="noopener noreferrer">
                        Open the original
                        <Icon name="newtab" size={13} />
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt>Official record</dt>
                  <dd>
                    {c.verifyUrl ? (
                      <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer">
                        Open on {host(c.verifyUrl)}
                        <Icon name="newtab" size={13} />
                      </a>
                    ) : (
                      <span className="gb-muted">Link being added</span>
                    )}
                  </dd>
                </div>
              </dl>
            </details>
          </li>
        ))}
      </ul>
      <CarouselControls target={id} label={label} itemLabel="certificate" />
    </div>
  )
}
