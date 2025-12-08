// app/admin/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  githubUrl?: string;
  liveUrl?: string;
  status: string;
  featured: boolean;
  technologies: Array<{
    technology: {
      name: string;
    };
  }>;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.posts || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, slug: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Project deleted successfully');
        setProjects(projects.filter(p => p.id !== id));
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
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
            <h1 className="text-4xl font-bold text-white mb-2">Manage Projects</h1>
            <p className="text-slate-400">Add, edit, or delete portfolio projects</p>
          </div>
          <Link href="/admin/projects/new">
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              <Plus className="mr-2" size={20} />
              Add Project
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                {project.thumbnail && (
                  <div className="h-48 bg-slate-700 relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.featured && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-cyan-500 text-white rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-700 rounded text-xs text-cyan-400"
                      >
                        {tech.technology.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                    <span className="px-2 py-1 bg-slate-700 rounded text-xs">
                      {project.status}
                    </span>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/admin/projects/${project.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Edit className="mr-2" size={16} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(project.id, project.slug)}
                      className="border-red-500 text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-slate-400 mb-4">No projects yet. Create your first one!</p>
            <Link href="/admin/projects/new">
              <Button className="bg-cyan-500 hover:bg-cyan-600">
                <Plus className="mr-2" size={20} />
                Add Project
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}