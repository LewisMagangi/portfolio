import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArticleToc } from "@/components/gambit/article-toc"
import { buttonVariants } from "@/components/ui/button"
import { getPost, getPosts } from "@/lib/blog"
import { BOOK_HREF } from "@/lib/site"

export const revalidate = 3600

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: "Post not found" }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.dateTime },
  }
}

const SEC = "mx-auto box-border flex max-w-content flex-col px-8 max-sm:px-4"

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  // "Keep reading": the next older post, or the newest one when this is the oldest.
  const all = await getPosts()
  const i = all.findIndex((p) => p.slug === post.slug)
  const other = all[i + 1] ?? all.find((p) => p.slug !== post.slug)

  return (
    <>
      <article id="article">
        <header>
          <section className={`${SEC} gap-5 pb-10 pt-24 max-sm:pt-12`}>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink-muted">
              <Link className="gb-crumb max-md:inline-flex max-md:min-h-11 max-md:items-center" href="/blog">
                Blog
              </Link>
              <span aria-hidden>/</span>
              <span>{post.category}</span>
            </nav>
            <h1 className="display m-0 max-w-[820px]">{post.title}</h1>
            <div className="flex items-center gap-3">
              <Image src="/portrait/lewis-magangi-square.jpg" alt="" width={40} height={40} className="size-10 rounded-full border border-line object-cover" />
              <span className="flex flex-col">
                <strong className="font-medium">Lewis Magangi</strong>
                <span className="font-mono text-xs text-ink-subtle">
                  <time dateTime={post.dateTime}>{post.date}</time>, {post.read}
                </span>
              </span>
            </div>
          </section>
        </header>
        <div className="border-t border-line">
          <div className={`${SEC} grid grid-cols-[200px_minmax(0,680px)] items-start gap-16 pb-24 pt-14 max-[960px]:grid-cols-1 max-[960px]:gap-6 max-sm:pb-16`}>
            <aside className="self-stretch">
              <ArticleToc target="post-body" />
            </aside>
            {/* Rendered from Markdown that only the admin can write (every blog API write needs an admin session). */}
            <div id="post-body" className="gb-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </div>
      </article>

      <div className="border-t border-line">
        <section aria-labelledby="next-h" className={`${SEC} gap-6 py-24 max-sm:py-16`}>
          {other && (
            <>
              <h2 id="next-h" className="title m-0">
                Keep reading
              </h2>
              <Link
                href={`/blog/${other.slug}`}
                className="group grid grid-cols-[120px_minmax(0,1fr)_auto] items-baseline gap-6 border-t border-line py-5 text-ink no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] max-[820px]:grid-cols-1 max-[820px]:gap-1"
              >
                <time dateTime={other.dateTime} className="font-mono text-xs text-ink-subtle">
                  {other.date}
                </time>
                <span className="flex flex-col gap-1">
                  <strong className="text-lg font-medium underline-offset-4 group-hover:underline">{other.title}</strong>
                  <span className="text-sm text-ink-muted">{other.excerpt}</span>
                </span>
                <span className="font-mono text-xs text-ink-subtle">{other.read}</span>
              </Link>
            </>
          )}
          {!other && (
            <h2 id="next-h" className="sr-only">
              What next
            </h2>
          )}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-surface p-6">
            <div className="flex flex-col gap-1">
              <strong className="font-medium">Building something like this?</strong>
              <span className="text-sm text-ink-muted">A free 30 minute call is the quickest way to find out if I can help.</span>
            </div>
            <Link href={BOOK_HREF} className={buttonVariants()}>
              Book a free discovery call
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
