// Server only. Services and price tiers for Home and the Services page, edited in Admin › Services.
// Falls back to the copy in lib/content/home.ts (SERVICES) while the tables are empty or unreachable.
import type { Service, Tier } from "@/components/gambit/pricing"
import { ICONS, type IconName } from "@/components/gambit/icon"
import { SERVICES } from "@/lib/content/home"
import { prisma } from "@/lib/prisma"

export type ServicesData = { items: Service[]; tiers: Tier[] }

const iconOf = (name: string): IconName => (name in ICONS ? (name as IconName) : "code")

export const DEFAULT_SERVICES = SERVICES.items.map((s, i) => ({
  title: s.title,
  body: s.body,
  icon: s.icon as string,
  points: [...s.points],
  showOnHome: true,
  orderIndex: i,
}))

export const DEFAULT_TIERS = SERVICES.tiers.map((t, i) => ({
  name: t.name,
  price: t.price,
  base: "base" in t ? (t.base ?? null) : null,
  for: t.for,
  includes: [...t.includes],
  badge: null as string | null,
  showOnHome: true,
  highlight: false,
  orderIndex: i,
}))

const fallback = (): ServicesData => ({ items: SERVICES.items.map((s) => ({ ...s, points: [...s.points] })), tiers: SERVICES.tiers })

/** `where: "home"` drops anything switched off for Home. */
export async function getServices(where: "home" | "services" = "services"): Promise<ServicesData> {
  try {
    const filter = where === "home" ? { showOnHome: true } : {}
    const [services, tiers] = await Promise.all([
      prisma.service.findMany({ where: filter, orderBy: { orderIndex: "asc" } }),
      prisma.priceTier.findMany({ where: filter, orderBy: { orderIndex: "asc" } }),
    ])
    // Never edited yet: show the launch copy rather than an empty section.
    if (services.length === 0 && tiers.length === 0) {
      const total = await prisma.service.count()
      if (total === 0 && (await prisma.priceTier.count()) === 0) return fallback()
    }
    return {
      items: services.map((s) => ({ icon: iconOf(s.icon), title: s.title, body: s.body, points: s.points })),
      tiers: tiers.map((t) => ({
        name: t.name,
        price: t.price,
        base: t.base ?? undefined,
        for: t.for,
        includes: t.includes,
        note: t.badge ?? undefined,
        featured: t.highlight,
      })),
    }
  } catch {
    // No database, or the tables aren't pushed yet.
    return fallback()
  }
}

/** Fills empty tables with the launch copy so Admin › Services starts from what the site shows. */
export async function seedServicesIfEmpty() {
  const [s, t] = await Promise.all([prisma.service.count(), prisma.priceTier.count()])
  if (s === 0 && t === 0) {
    await prisma.$transaction([
      prisma.service.createMany({ data: DEFAULT_SERVICES }),
      prisma.priceTier.createMany({ data: DEFAULT_TIERS }),
    ])
  }
}
