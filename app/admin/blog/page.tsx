// app/admin/blog/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  status: string;
  publishedAt?: string;
  views: number;
  author: {
    name: string;
    avatar?: string;
  };
  categories: Array<{
    category: {
      name: string;
    };
  }>;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchPosts = useCallback(async () => {
    try {
      const status = filter === 'all' ? '' : filter.toUpperCase();
      const response = await fetch(`/api/blog/posts${status ? `?status=${status}` : ''}`);
      const data = await response.json();
      setPosts(data.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/posts/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Blog post deleted successfully');
        setPosts(posts.filter(p => p.slug !== slug));
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete blog post');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-green-500';
      case 'DRAFT': return 'bg-yellow-500';
      case 'ARCHIVED': return 'bg-gray-500';
      default: return 'bg-slate-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Manage Blog Posts</h1>
            <p className="text-slate-400">Create, edit, or delete blog articles</p>
          </div>
          <Link href="/admin/blog/new">
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              <Plus className="mr-2" size={20} />
              New Post
            </Button>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'published', 'draft', 'archived'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              onClick={() => setFilter(status)}
              className={filter === status ? 'bg-cyan-500' : ''}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Posts List */}
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="bg-slate-800 border-slate-700 p-6">
                <div className="flex gap-6">
                  {post.coverImage && (
                    <div className="w-48 h-32 bg-slate-700 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      {post.categories.slice(0, 2).map((cat, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-700 rounded text-xs text-cyan-400">
                          {cat.category.name}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>By {post.author.name}</span>
                        {post.publishedAt && (
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        )}
                        <span className="flex items-center gap-1">
                          <Eye size={14} /> {post.views}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href={`/admin/blog/${post.slug}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2" size={14} />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(post.slug)}
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-slate-400 mb-4">No blog posts found. Create your first one!</p>
            <Link href="/admin/blog/new">
              <Button className="bg-cyan-500 hover:bg-cyan-600">
                <Plus className="mr-2" size={20} />
                New Post
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
