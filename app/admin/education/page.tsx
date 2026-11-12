// app/admin/education/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, GraduationCap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  grade?: string;
  description?: string;
  highlights: Array<{ highlight: string }>;
}

export default function AdminEducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await fetch('/api/education');
      const data = await response.json();
      setEducation(data.data || []);
    } catch (error) {
      console.error('Error fetching education:', error);
      toast.error('Failed to load education');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) {
      return;
    }

    try {
      const response = await fetch(`/api/education/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Education deleted successfully');
        setEducation(education.filter(e => e.id !== id));
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting education:', error);
      toast.error('Failed to delete education');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
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
            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-ink mb-2">Manage Education</h1>
            <p className="text-ink-muted">Add, edit, or delete education entries</p>
          </div>
          <Link href="/admin/education/new">
            <Button className="">
              <Plus className="mr-2" size={20} />
              Add Education
            </Button>
          </Link>
        </div>

        {/* Education List */}
        {education.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu) => (
              <Card key={edu.id} className="bg-surface border-line p-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-surface-raised rounded-lg flex items-center justify-center">
                      <GraduationCap className="text-ink" size={24} />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-ink">{edu.degree}</h3>
                        {edu.isCurrent && (
                          <span className="px-2 py-1 bg-success-soft text-success rounded text-xs">
                            Current
                          </span>
                        )}
                      </div>
                      
                      <p className="text-ink font-medium">{edu.institution}</p>
                      
                      {edu.fieldOfStudy && (
                        <p className="text-ink-muted text-sm">{edu.fieldOfStudy}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-ink-muted mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : (edu.endDate ? formatDate(edu.endDate) : 'N/A')}
                        </span>
                        {edu.grade && (
                          <span className="px-2 py-0.5 bg-surface-raised rounded text-xs">
                            Grade: {edu.grade}
                          </span>
                        )}
                      </div>
                      
                      {edu.highlights.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-ink-subtle">
                            {edu.highlights.length} highlight{edu.highlights.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/admin/education/${edu.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2" size={14} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(edu.id)}
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
            <p className="text-ink-muted mb-4">No education entries yet. Add your first one!</p>
            <Link href="/admin/education/new">
              <Button className="">
                <Plus className="mr-2" size={20} />
                Add Education
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
