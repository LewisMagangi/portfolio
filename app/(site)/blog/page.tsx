// app/blog/page.tsx
import { Metadata } from 'next';
import { BlogPostCard } from '@/app/components/BlogPostCard';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Blog | Lewis Magangi',
  description: 'Articles about web development, security, and software engineering best practices.',
};

export const revalidate = 3600; // Revalidate every hour

async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: {
          not: null
        }
      },
      include: {
        author: {
          select: {
            name: true,
            avatar: true
          }
        },
        categories: {
          include: {
            category: true
          }
        },
        tags: {
          include: {
            tag: true
          }
        },
        _count: {
          select: {
            comments: {
              where: {
                status: 'APPROVED'
              }
            }
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });
    // Transform null to undefined for compatibility with BlogPostCard
    return posts.map(post => ({
      ...post,
      publishedAt: post.publishedAt!, // We filtered not null, so it's safe
      readTime: post.readTime ?? undefined,
      coverImage: post.coverImage ?? undefined,
      author: {
        ...post.author,
        avatar: post.author.avatar ?? undefined
      }
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await prisma.blogCategory.findMany({
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    });
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Thoughts on software engineering, web development, security, and the tech industry.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {posts.length > 0 ? (
              <div className="space-y-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-800 rounded-xl border border-slate-700">
                <p className="text-slate-400 text-lg">No blog posts available yet. Check back soon!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              {categories.length > 0 && (
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <a
                          href={`/blog/category/${category.slug}`}
                          className="flex justify-between items-center text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                          <span>{category.name}</span>
                          <span className="text-sm text-slate-500">({category._count.posts})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Stay Updated</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Get notified when I publish new articles.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold text-white transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}