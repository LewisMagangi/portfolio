// Server only. The certificates on /certificates and in the Home carousel, edited in Admin › Certificates.
// Group names and the page intro stay in lib/content/certificates.ts. Falls back to the launch list there
// (and the carousel in lib/content/home.ts) while the table is empty or not pushed yet.
import { GROUPS, INTRO, OTHERS, type CertCardData, type CertGroup } from "@/lib/content/certificates"
import { CERTS, type Certificate as CarouselItem } from "@/lib/content/home"
import type { Certificate, CertificateCategory } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"

export type OtherCert = { title: string; issuer: string; when: string; tag?: string; href?: string; image: string; alt: string }
export type CertificatesView = { lead: string; carousel: CarouselItem[]; groups: CertGroup[]; others: OtherCert[] }

/** The groups on /certificates, in page order, with the category each one is stored as. */
export const GROUP_CATEGORY: Record<string, CertificateCategory> = { ai: "AI_DATA", swe: "SOFTWARE", pro: "PROFESSIONAL" }

/** The categories Admin › Certificates offers, labelled as the site shows them. */
export const CATEGORIES: { value: CertificateCategory; label: string }[] = [
  ...GROUPS.map((g) => ({ value: GROUP_CATEGORY[g.id], label: g.name })),
  { value: "OTHER", label: "Other certificates" },
]

const WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"]

/** The intro counts the professional certificates ("Nine professional certificates, …"). */
function leadFor(n: number) {
  const word = WORDS[n] ?? String(n)
  return INTRO.lead.replace(/^\w+ professional certificates/, `${word} professional ${n === 1 ? "certificate" : "certificates"}`)
}

const FALLBACK: CertificatesView = { lead: INTRO.lead, carousel: CERTS, groups: GROUPS, others: OTHERS }

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

/** The carousel runs newest first across groups, by the last month and year in the date ("Dec 2025"). */
function monthOf(date: string) {
  const all = [...date.toLowerCase().matchAll(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+(\d{4})\b/g)]
  const last = all[all.length - 1]
  return last ? Number(last[2]) * 12 + MONTHS.indexOf(last[1]) : -1
}

const CATEGORY_ORDER: CertificateCategory[] = ["AI_DATA", "SOFTWARE", "PROFESSIONAL", "OTHER"]
const groupRank = (c: Certificate) => CATEGORY_ORDER.indexOf(c.category)

const toCard = (c: Certificate): CertCardData => ({
  mark: c.mark ?? "",
  issuer: c.issuer,
  title: c.title,
  date: c.date,
  length: c.length ?? "",
  ...(c.verifyUrl ? { verify: c.verifyUrl } : {}),
  ...(c.note ? { note: c.note } : {}),
  learned: c.learned,
})

/** Everything /certificates and Home need. Certificates still in progress stay off the site. */
export async function getCertificates(): Promise<CertificatesView> {
  try {
    const rows = await prisma.certificate.findMany({
      where: { status: "VERIFIED" },
      orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
    })
    return rows.length === 0 ? FALLBACK : buildView(rows)
  } catch {
    // No database, or the certificates table isn't pushed yet.
    return FALLBACK
  }
}

/** Verified rows, sorted by orderIndex, as the page sections. */
export function buildView(rows: Certificate[]): CertificatesView {
  const groups = GROUPS.map((g) => ({
    id: g.id,
    name: g.name,
    items: rows.filter((r) => r.category === GROUP_CATEGORY[g.id]).map(toCard),
  })).filter((g) => g.items.length > 0)

  const carousel = rows
    .filter((r) => r.featured && r.image)
    .sort((a, b) => monthOf(b.date) - monthOf(a.date) || groupRank(a) - groupRank(b) || a.orderIndex - b.orderIndex)
    .map((r) => ({
      title: r.fullTitle || r.title,
      issuer: r.org || r.issuer,
      date: r.date,
      image: r.image as string,
      w: r.imageWidth ?? 1100,
      h: r.imageHeight ?? 635,
      ...(r.verifyUrl ? { fileUrl: r.verifyUrl } : {}),
    }))

  const others = rows
    .filter((r) => r.category === "OTHER" && r.image)
    .map((r) => ({
      title: r.title,
      issuer: r.issuer,
      when: r.date,
      image: r.image as string,
      alt: r.alt || `${r.issuer} certificate for ${r.title}`,
      ...(r.tag ? { tag: r.tag } : {}),
      ...(r.verifyUrl ? { href: r.verifyUrl } : {}),
    }))

  const professional = groups.reduce((n, g) => n + g.items.length, 0)
  return { lead: leadFor(professional), carousel, groups, others }
}

/** The launch list as rows: each card joined to its carousel image by title, newest first within its group. */
export function launchCertificates() {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
  const rows = GROUPS.flatMap((g) =>
    g.items.map((c, i) => {
      const shot = CERTS.find((x) => norm(x.title) === norm(c.title) || norm(x.title).startsWith(`${norm(c.title)} `))
      return {
        title: c.title,
        fullTitle: shot && shot.title !== c.title ? shot.title : null,
        issuer: c.issuer,
        org: shot?.issuer ?? null,
        mark: c.mark || null,
        category: GROUP_CATEGORY[g.id],
        date: c.date,
        length: c.length || null,
        note: c.note ?? null,
        learned: c.learned,
        verifyUrl: c.verify ?? shot?.fileUrl ?? null,
        image: shot?.image ?? null,
        imageWidth: shot?.w ?? null,
        imageHeight: shot?.h ?? null,
        featured: !!shot,
        orderIndex: i,
      }
    }),
  )
  const others = OTHERS.map((o, i) => ({
    title: o.title,
    issuer: o.issuer,
    category: "OTHER" as const,
    date: o.when,
    tag: "tag" in o ? o.tag ?? null : null,
    verifyUrl: "href" in o ? o.href ?? null : null,
    image: o.image,
    alt: o.alt,
    learned: [],
    featured: false,
    orderIndex: i,
  }))
  return [...rows, ...others]
}

/** Admin › Certificates starts from what the site shows: an empty table takes the launch list. */
export async function seedCertificatesIfEmpty() {
  if ((await prisma.certificate.count()) > 0) return
  await prisma.certificate.createMany({ data: launchCertificates() })
}
