// components/BlogPostCard.tsx
// Blog post card component

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface BlogPostCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    publishedAt: Date;
    readTime?: number;
    views: number;
    author: {
      name: string;
      avatar?: string;
    };
    categories: Array<{
      category: {
        name: string;
        slug: string;
      };
    }>;
  };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
      {/* Cover Image */}
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/blog/category/${cat.category.slug}`}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {cat.category.name}
            </Link>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-slate-400 mb-4 line-clamp-3">{post.excerpt}</p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime} min read</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}