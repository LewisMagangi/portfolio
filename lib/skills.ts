// Server only. The skills on /skills, edited in Admin › Skills.
// Group titles and notes stay in lib/content/skills.ts; each group is one SkillCategory.
// Falls back to the launch list there while the table is empty or unreachable.
import { GROUP_CATEGORY as GROUP_CATEGORY_MAP, GROUPS, LEVEL_DB, type Evidence, type SkillGroup, type SkillLevel } from "@/lib/content/skills"
import { Prisma, type SkillCategory } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"

const GROUP_CATEGORY: Record<string, SkillCategory> = GROUP_CATEGORY_MAP

/** The categories Admin › Skills offers, with the group title each one shows under. */
export const CATEGORIES = GROUPS.map((g) => ({ value: GROUP_CATEGORY[g.id], label: g.title }))

export const levelToDb = (l: SkillLevel) => LEVEL_DB[l]
export const levelFromDb = (l: string): SkillLevel => (l === "TRAINED" ? "trained" : l === "LEARNING" ? "learning" : "shipped")

export function asEvidence(v: unknown): Evidence[] {
  if (!Array.isArray(v)) return []
  return v.flatMap((e) =>
    e && typeof e === "object" && typeof e.label === "string" && typeof e.href === "string" && e.label && e.href
      ? [{ label: e.label, href: e.href }]
      : [],
  )
}

export const DEFAULT_SKILLS = GROUPS.flatMap((g) =>
  g.skills.map((s, i) => ({
    name: s.name,
    category: GROUP_CATEGORY[g.id],
    level: levelToDb(s.level),
    how: s.how,
    evidence: s.evidence,
    orderIndex: i,
  })),
)

/**
 * Groups for /skills. Every skill on the site links to its evidence, so a row without any stays
 * off the page (Admin › Skills marks it). A group with nothing to show is left out.
 */
export async function getSkillGroups(): Promise<SkillGroup[]> {
  try {
    const rows = await prisma.skill.findMany({ orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }] })
    const groups = GROUPS.map((g) => ({
      ...g,
      skills: rows
        .filter((r) => r.category === GROUP_CATEGORY[g.id])
        .map((r) => ({ name: r.name, how: r.how ?? "", level: levelFromDb(r.level), evidence: asEvidence(r.evidence) }))
        .filter((s) => s.evidence.length > 0),
    })).filter((g) => g.skills.length > 0)
    // Never edited yet: show the launch list rather than an empty page.
    return groups.length > 0 ? groups : GROUPS
  } catch {
    // No database, or the v8 columns aren't pushed yet.
    return GROUPS
  }
}

/**
 * Until a skill has been given evidence, the table only holds pre-v8 rows (or nothing), and the site
 * shows the launch list. Bring that list in so Admin › Skills starts from what the site shows: a row
 * of the same name takes the launch level, line and evidence; older rows stay, hidden until edited.
 */
export async function seedSkillsIfEmpty() {
  const curated = await prisma.skill.count({ where: { evidence: { not: Prisma.AnyNull } } })
  if (curated > 0) return
  await prisma.$transaction(
    DEFAULT_SKILLS.map(({ name, ...rest }) =>
      prisma.skill.upsert({ where: { name }, create: { name, ...rest }, update: rest }),
    ),
  )
}
