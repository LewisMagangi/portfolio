// app/admin/projects/[slug]/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription: string;
  thumbnail?: string;
  githubUrl?: string;
  liveUrl?: string;
  status: string;
  featured: boolean;
  technologies: Array<{ technology: { id: string; name: string } }>;
  highlights: Array<{ highlight: string }>;
  startDate?: string;
  endDate?: string;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    detailedDescription: '',
    thumbnail: '',
    githubUrl: '',
    liveUrl: '',
    status: 'ACTIVE',
    featured: false,
    technologies: [] as string[],
    highlights: [] as string[],
    startDate: '',
    endDate: ''
  });

  const fetchProject = useCallback(async () => {
    try {
      const response = await fetch(`/api/projects/${slug}`);
      if (response.ok) {
        const data = await response.json();
        const project: Project = data.data;

        setFormData({
          title: project.title,
          slug: project.slug,
          description: project.description,
          detailedDescription: project.detailedDescription || '',
          thumbnail: project.thumbnail || '',
          githubUrl: project.githubUrl || '',
          liveUrl: project.liveUrl || '',
          status: project.status,
          featured: project.featured,
          technologies: project.technologies.map(t => t.technology.id),
          highlights: project.highlights.map(h => h.highlight),
          startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
          endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : ''
        });
      } else {
        toast.error('Failed to load project');
        router.push('/admin/projects');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load project');
      router.push('/admin/projects');
    } finally {
      setFetchLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/projects/${formData.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.filter(t => t.trim()),
          highlights: formData.highlights.filter(h => h.trim()),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Project updated successfully!');
        router.push('/admin/projects');
      } else {
        toast.error(data.error || 'Failed to update project');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, '']
    }));
  };

  const updateTechnology = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.map((tech, i) => i === index ? value : tech)
    }));
  };

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((highlight, i) => i === index ? value : highlight)
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
        <div>Loading project...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2" size={16} />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Project</h1>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
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
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  required
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <Label htmlFor="detailedDescription">Detailed Description</Label>
                <Textarea
                  id="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={(e) => handleChange('detailedDescription', e.target.value)}
                  rows={6}
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) => handleChange('thumbnail', e.target.value)}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => handleChange('githubUrl', e.target.value)}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) => handleChange('liveUrl', e.target.value)}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md"
                    aria-label="Project Status"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="rounded"
                  aria-label="Featured Project"
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <div>
                <Label>Technologies</Label>
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={tech}
                      onChange={(e) => updateTechnology(index, e.target.value)}
                      placeholder="Technology ID"
                      className="bg-slate-700 border-slate-600"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeTechnology(index)}
                      className="border-red-500 text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addTechnology} className="mt-2">
                  Add Technology
                </Button>
              </div>

              <div>
                <Label>Highlights</Label>
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      placeholder="Project highlight"
                      className="bg-slate-700 border-slate-600"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeHighlight(index)}
                      className="border-red-500 text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addHighlight} className="mt-2">
                  Add Highlight
                </Button>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="bg-cyan-500 hover:bg-cyan-600">
                  <Save className="mr-2" size={16} />
                  {loading ? 'Updating...' : 'Update Project'}
                </Button>
                <Link href="/admin/projects">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}