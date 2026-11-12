// Server only. Published posts for /blog and /blog/[slug], from the database (Admin › Blog), rendered from Markdown.
// The posts in lib/content/blog-posts.ts always show: from the database once it has them, from the file until then
// (or when the database is unreachable). Retired slugs never show, even if still published in the database.
import { Marked } from "marked"

import { CATEGORY_ORDER, POSTS as CONTENT_POSTS, RETIRED_SLUGS } from "@/lib/content/blog-posts"
import { prisma } from "@/lib/prisma"

export type PostSummary = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  dateTime: string
  read: string
}
export type Post = PostSummary & { html: string }

const MONTH = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "Africa/Nairobi" })

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;|&#\d+;/g, "")
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

/**
 * Markdown to HTML. Posts are written by Lewis in the admin, so raw HTML (figures) is allowed.
 * Every h2 and h3 gets an id for the contents list, and a leading "# Title" is dropped because the page prints the title.
 */
function render(md: string) {
  const used = new Map<string, number>()
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens)
        if (depth === 1) depth = 2
        const base = slugify(inner) || "section"
        const n = used.get(base) ?? 0
        used.set(base, n + 1)
        const id = n ? `${base}-${n + 1}` : base
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`
      },
    },
  })
  const body = md.replace(/^\s*#\s+[^\n]+\n+/, "")
  return marked.parse(body, { async: false }) as string
}

const words = (md: string) => md.split(/\s+/).filter(Boolean).length
const readLabel = (minutes: number | null | undefined, md: string) => `${minutes || Math.max(1, Math.round(words(md) / 220))} min read`

function fromContent(p: (typeof CONTENT_POSTS)[number]): Post {
  const d = new Date(`${p.publishedAt}T09:00:00+03:00`)
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: MONTH.format(d),
    dateTime: d.toISOString(),
    read: readLabel(p.readTime, p.content),
    html: render(p.content),
  }
}

const include = { categories: { include: { category: true }, orderBy: { createdAt: "asc" as const } } }
// A function, so "published before now" is checked per request and a scheduled post appears on time.
const published = () => ({ status: "PUBLISHED" as const, publishedAt: { not: null, lte: new Date() } })

type Row = Awaited<ReturnType<typeof prisma.blogPost.findFirst<{ include: typeof include }>>>

function fromRow(r: NonNullable<Row>, withHtml: boolean): Post {
  const d = r.publishedAt ?? r.createdAt
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.categories[0]?.category.name ?? "Notes",
    date: MONTH.format(d),
    dateTime: d.toISOString(),
    read: readLabel(r.readTime, r.content),
    html: withHtml ? render(r.content) : "",
  }
}

async function dbPosts(): Promise<Post[] | null> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { ...published(), slug: { notIn: RETIRED_SLUGS } },
      include,
      orderBy: { publishedAt: "desc" },
    })
    return rows.map((r) => fromRow(r, false))
  } catch {
    return null
  }
}

/** Newest first. */
export async function getPosts(): Promise<PostSummary[]> {
  const rows = (await dbPosts()) ?? []
  const missing = CONTENT_POSTS.filter((c) => !rows.some((r) => r.slug === c.slug)).map(fromContent)
  return [...rows, ...missing]
    .sort((a, b) => b.dateTime.localeCompare(a.dateTime))
    .map(({ html: _html, ...p }) => p)
}

export async function getPost(slug: string): Promise<Post | null> {
  if (RETIRED_SLUGS.includes(slug)) return null
  try {
    const row = await prisma.blogPost.findFirst({ where: { slug, ...published() }, include })
    if (row) return fromRow(row, true)
    // Unpublished in the database means unpublished: no file fallback for it.
    if (await prisma.blogPost.count({ where: { slug } })) return null
  } catch {
    // Database unreachable: fall through to the content posts.
  }
  const c = CONTENT_POSTS.find((p) => p.slug === slug)
  return c ? fromContent(c) : null
}

/** Topics for the filter: the known order first, then any others, each with its count. */
export function topics(posts: PostSummary[]) {
  const names = Array.from(new Set(posts.map((p) => p.category)))
  names.sort((a, b) => (CATEGORY_ORDER.indexOf(a) + 1 || 99) - (CATEGORY_ORDER.indexOf(b) + 1 || 99))
  return names.map((name) => ({ name, count: posts.filter((p) => p.category === name).length }))
}
