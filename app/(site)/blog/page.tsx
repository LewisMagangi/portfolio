import type { Metadata } from "next"

import { BlogIndex } from "@/components/site/blog-index"
import { SubscribeForm } from "@/components/site/subscribe-form"
import { getPosts, topics } from "@/lib/blog"

const INTRO = {
  title: "Notes from the build.",
  lead: "What I learn shipping web apps, securing them, and moving into machine learning. Short, practical, written after the work is done.",
}

export const metadata: Metadata = {
  title: "Blog",
  description: INTRO.lead,
}

// Publishing in Admin › Blog revalidates "/blog"; this is the fallback refresh (and when scheduled posts appear).
export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getPosts()
  return (
    <>
      <BlogIndex title={INTRO.title} lead={INTRO.lead} posts={posts} topics={topics(posts)} />
      <div className="border-t border-line">
        <section aria-labelledby="sub-h" className="mx-auto box-border max-w-content px-8 py-24 max-sm:px-4 max-sm:py-16">
          <SubscribeForm />
        </section>
      </div>
    </>
  )
}
