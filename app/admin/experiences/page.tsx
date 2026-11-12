// app/admin/experiences/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Briefcase, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  employmentType: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  achievements: Array<{ achievement: string }>;
}

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experiences');
      const data = await response.json();
      setExperiences(data.data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) {
      return;
    }

    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Experience deleted successfully');
        setExperiences(experiences.filter(e => e.id !== id));
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Failed to delete experience');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const formatEmploymentType = (type: string) => {
    return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-line-strong border-t-ink" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-ink mb-2">Manage Experiences</h1>
            <p className="text-ink-muted">Add, edit, or delete work experiences</p>
          </div>
          <Link href="/admin/experiences/new">
            <Button className="">
              <Plus className="mr-2" size={20} />
              Add Experience
            </Button>
          </Link>
        </div>

        {/* Experiences List */}
        {experiences.length > 0 ? (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <Card key={exp.id} className="bg-surface border-line p-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-surface-raised rounded-lg flex items-center justify-center">
                      <Briefcase className="text-ink" size={24} />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-ink">{exp.role}</h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-1 bg-success-soft text-success rounded text-xs">
                            Current
                          </span>
                        )}
                      </div>
                      
                      <p className="text-ink font-medium">{exp.company}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-ink-muted mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : 'N/A')}
                        </span>
                        {exp.location && <span>{exp.location}</span>}
                        <span className="px-2 py-0.5 bg-surface-raised rounded text-xs">
                          {formatEmploymentType(exp.employmentType)}
                        </span>
                      </div>
                      
                      {exp.description && (
                        <p className="text-ink-muted mt-3 line-clamp-2">{exp.description}</p>
                      )}
                      
                      {exp.achievements.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-ink-subtle">
                            {exp.achievements.length} achievement{exp.achievements.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/admin/experiences/${exp.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2" size={14} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(exp.id)}
                      className="border-danger text-danger hover:bg-surface-raised"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-ink-muted mb-4">No experiences yet. Add your first one!</p>
            <Link href="/admin/experiences/new">
              <Button className="">
                <Plus className="mr-2" size={20} />
                Add Experience
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
