// Puts the blog's posts (lib/content/blog-posts.ts) into the database and takes the old ones off the site.
//   npm run blog:v8                  uses DATABASE_URL from .env
//   npm run blog:v8 -- .env.local    uses the dev server's database
// Safe to run twice. For each post:
//   - a post with its slug is updated;
//   - otherwise a post with the same title under an old slug is moved to the new slug (no duplicate);
//   - otherwise it is created, published.
// The retired posts (RETIRED_SLUGS) are archived, not deleted, so Admin › Blog can bring one back.
import fs from "node:fs"
import path from "node:path"

import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

import { PrismaClient } from "../lib/generated/prisma"
import { POSTS, RETIRED_SLUGS } from "../lib/content/blog-posts"

const envFile = process.argv.slice(2).find((a) => !a.startsWith("--")) || ".env"
const envPath = path.join(__dirname, "..", envFile)
if (!fs.existsSync(envPath)) throw new Error(`${envFile} not found`)
const url = fs
  .readFileSync(envPath, "utf8")
  .split("\n")
  .map((l) => l.match(/^\s*DATABASE_URL\s*=\s*"?([^"\r\n]+)"?/))
  .find(Boolean)?.[1]
if (!url) throw new Error(`No DATABASE_URL in ${envFile}`)

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
// "Co-Founders" and "Co-founding a Tech Company" are the same article; match on the word stem.
const stem = (t: string) => t.toLowerCase().replace(/[^a-z]/g, "").replace(/ing.*|ers?$/, "")

async function main() {
  const prisma = new PrismaClient({ adapter: new PrismaPg(new Pool({ connectionString: url })) })
  console.log(`Writing to ${new URL(url!).host} (${envFile})`)
  try {
    const author = await prisma.user.findFirst({ orderBy: { createdAt: "asc" }, select: { id: true } })
    const moved = new Set<string>()

    for (const p of POSTS) {
      const category = await prisma.blogCategory.upsert({
        where: { slug: slugify(p.category) },
        create: { name: p.category, slug: slugify(p.category) },
        update: { name: p.category },
      })
      const data = {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        readTime: p.readTime,
        coverImage: null,
        status: "PUBLISHED" as const,
        publishedAt: new Date(`${p.publishedAt}T09:00:00+03:00`),
      }

      let target = await prisma.blogPost.findUnique({ where: { slug: p.slug }, select: { id: true, slug: true, title: true } })
      if (!target) {
        const all = await prisma.blogPost.findMany({ select: { id: true, slug: true, title: true } })
        target = all.find((r) => stem(r.title) === stem(p.title)) ?? null
      }

      let id: string
      if (target) {
        id = (await prisma.blogPost.update({ where: { id: target.id }, data })).id
        if (target.slug !== p.slug) moved.add(target.slug)
        console.log(target.slug === p.slug ? `Updated: ${p.title}` : `Moved “${target.title}” from /blog/${target.slug} to /blog/${p.slug}`)
      } else {
        if (!author) throw new Error("No user to author the post. Create the admin first (scripts/create-admin.js).")
        id = (await prisma.blogPost.create({ data: { ...data, authorId: author.id } })).id
        console.log(`Created: ${p.title}`)
      }
      // One topic per post, as the blog filter shows it.
      await prisma.$transaction([
        prisma.blogPostCategory.deleteMany({ where: { postId: id } }),
        prisma.blogPostCategory.create({ data: { postId: id, categoryId: category.id } }),
      ])
    }

    const retire = RETIRED_SLUGS.filter((s) => !moved.has(s) && !POSTS.some((p) => p.slug === s))
    const gone = await prisma.blogPost.updateMany({ where: { slug: { in: retire }, status: { not: "ARCHIVED" } }, data: { status: "ARCHIVED" } })
    if (gone.count) console.log(`Archived ${gone.count} old post${gone.count === 1 ? "" : "s"}: ${retire.join(", ")}`)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e)
  process.exit(1)
})
