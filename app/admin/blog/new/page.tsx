// app/admin/blog/new/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    status: 'DRAFT',
    authorId: '',
    categories: [] as string[],
    tags: [] as string[]
  });

  useEffect(() => {
    fetchCategoriesAndTags();
    fetchCurrentUser();
  }, []);

  const fetchCategoriesAndTags = async () => {
    try {
      const [catRes, tagRes] = await Promise.all([
        fetch('/api/blog/categories'),
        fetch('/api/blog/tags')
      ]);
      const [catData, tagData] = await Promise.all([catRes.json(), tagRes.json()]);
      setCategories(catData.data || []);
      setTags(tagData.data || []);
    } catch (error) {
      console.error('Error fetching categories/tags:', error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      if (data.user) {
        setFormData(prev => ({ ...prev, authorId: data.user.id }));
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Blog post created successfully!');
        router.push('/admin/blog');
      } else {
        toast.error(data.error || 'Failed to create blog post');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2" size={16} />
              Back to Blog
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Create New Blog Post</h1>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      handleChange('title', e.target.value);
                      handleChange('slug', generateSlug(e.target.value));
                    }}
                    required
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    required
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  required
                  rows={2}
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  required
                  rows={15}
                  className="bg-slate-700 border-slate-600"
                  placeholder="Write your blog post content here... (Markdown supported)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <Input
                    id="coverImage"
                    value={formData.coverImage}
                    onChange={(e) => handleChange('coverImage', e.target.value)}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full h-10 px-3 bg-slate-700 border border-slate-600 rounded-md"
                    aria-label="Blog Post Status"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              {categories.length > 0 && (
                <div>
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(cat.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleChange('categories', [...formData.categories, cat.id]);
                            } else {
                              handleChange('categories', formData.categories.filter(c => c !== cat.id));
                            }
                          }}
                          className="rounded border-slate-600"
                        />
                        <span className="text-sm">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {tags.length > 0 && (
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <label key={tag.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.tags.includes(tag.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleChange('tags', [...formData.tags, tag.id]);
                            } else {
                              handleChange('tags', formData.tags.filter(t => t !== tag.id));
                            }
                          }}
                          className="rounded border-slate-600"
                        />
                        <span className="text-sm">{tag.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  <Save className="mr-2" size={16} />
                  {loading ? 'Creating...' : 'Create Post'}
                </Button>
                <Link href="/admin/blog">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
