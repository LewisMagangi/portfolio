// Writes the two v8 blog posts (lib/content/blog-posts.ts) into the database, replacing the old seed stubs.
//   npm run blog:v8                  uses DATABASE_URL from .env
//   npm run blog:v8 -- .env.local    uses the dev server's database
// Matches posts by slug, so running it twice changes nothing. Leaves every other post alone.
// A post is replaced only while it still holds the old seed stub (or this v8 text). One that was edited in
// the admin is skipped and listed; pass --force after the env file to replace it anyway.
// Status is never changed for an existing post, so an unpublished post stays unpublished.
import fs from "node:fs"
import path from "node:path"

import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

import { PrismaClient } from "../lib/generated/prisma"
import { POSTS } from "../lib/content/blog-posts"

const args = process.argv.slice(2)
const force = args.includes("--force")
const envFile = args.find((a) => !a.startsWith("--")) || ".env"

// What prisma/seed.ts first wrote, before v8.
const STUB_TITLES = new Set(["Building Accessible Voice Interfaces with Whisper and Coqui TTS", "Django to Next.js: A Full-Stack Journey"])
const envPath = path.join(__dirname, "..", envFile)
if (!fs.existsSync(envPath)) throw new Error(`${envFile} not found`)
const url = fs
  .readFileSync(envPath, "utf8")
  .split("\n")
  .map((l) => l.match(/^\s*DATABASE_URL\s*=\s*"?([^"\r\n]+)"?/))
  .find(Boolean)?.[1]
if (!url) throw new Error(`No DATABASE_URL in ${envFile}`)

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

async function main() {
  const prisma = new PrismaClient({ adapter: new PrismaPg(new Pool({ connectionString: url })) })
  console.log(`Writing to ${new URL(url!).host} (${envFile})`)
  try {
    const author = await prisma.user.findFirst({ orderBy: { createdAt: "asc" }, select: { id: true } })
    for (const p of POSTS) {
      const category = await prisma.blogCategory.upsert({
        where: { slug: slugify(p.category) },
        create: { name: p.category, slug: slugify(p.category) },
        update: { name: p.category },
      })
      const data = {
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        readTime: p.readTime,
        coverImage: null,
        publishedAt: new Date(`${p.publishedAt}T09:00:00+03:00`),
      }
      const existing = await prisma.blogPost.findUnique({ where: { slug: p.slug }, select: { id: true, title: true, status: true } })
      let id: string
      if (existing) {
        const untouched = STUB_TITLES.has(existing.title) || existing.title === p.title
        if (!untouched && !force) {
          console.log(`Skipped: ${p.slug} now holds “${existing.title}”, edited in the admin. Add --force to replace it.`)
          continue
        }
        id = (await prisma.blogPost.update({ where: { slug: p.slug }, data })).id
        if (existing.status !== "PUBLISHED") console.log(`Note: ${p.slug} is ${existing.status}; publish it in Admin › Blog to show it.`)
      } else {
        if (!author) throw new Error("No user to author the post. Create the admin first (scripts/create-admin.js).")
        id = (await prisma.blogPost.create({ data: { ...data, status: "PUBLISHED", slug: p.slug, authorId: author.id } })).id
      }
      // One topic per post, as the blog filter shows it.
      await prisma.$transaction([
        prisma.blogPostCategory.deleteMany({ where: { postId: id } }),
        prisma.blogPostCategory.create({ data: { postId: id, categoryId: category.id } }),
      ])
      console.log(`${existing ? "Updated" : "Created"}: ${p.title} (${p.category})`)
    }
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e)
  process.exit(1)
})
