// app/admin/education/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function NewEducationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    grade: '',
    description: '',
    highlights: ['']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/education', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          highlights: formData.highlights.filter(h => h.trim()),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Education created successfully!');
        router.push('/admin/education');
      } else {
        toast.error(data.error || 'Failed to create education');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create education');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      highlights: prev.highlights.map((h, i) => i === index ? value : h)
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/education">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2" size={16} />
              Back to Education
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Add New Education</h1>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Education Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="institution">Institution *</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleChange('institution', e.target.value)}
                    required
                    placeholder="e.g., Stanford University"
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="degree">Degree *</Label>
                  <Input
                    id="degree"
                    value={formData.degree}
                    onChange={(e) => handleChange('degree', e.target.value)}
                    required
                    placeholder="e.g., Bachelor of Science"
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fieldOfStudy">Field of Study</Label>
                  <Input
                    id="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                    placeholder="e.g., Computer Science"
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Grade/GPA</Label>
                  <Input
                    id="grade"
                    value={formData.grade}
                    onChange={(e) => handleChange('grade', e.target.value)}
                    placeholder="e.g., 3.8/4.0"
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    required
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
                    disabled={formData.isCurrent}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer h-10">
                    <input
                      type="checkbox"
                      checked={formData.isCurrent}
                      onChange={(e) => handleChange('isCurrent', e.target.checked)}
                      className="rounded border-slate-600"
                    />
                    <span>Currently studying</span>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className="bg-slate-700 border-slate-600"
                  placeholder="Describe your studies, activities, etc..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Highlights</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addHighlight}>
                    <Plus size={14} className="mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={highlight}
                        onChange={(e) => updateHighlight(index, e.target.value)}
                        placeholder="e.g., Dean's List, Research Assistant"
                        className="bg-slate-700 border-slate-600"
                      />
                      {formData.highlights.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeHighlight(index)}
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          <X size={14} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  <Save className="mr-2" size={16} />
                  {loading ? 'Creating...' : 'Create Education'}
                </Button>
                <Link href="/admin/education">
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
