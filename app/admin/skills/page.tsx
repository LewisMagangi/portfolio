// app/admin/skills/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiencyLevel: number;
  yearsOfExperience?: number;
  icon?: string;
  orderIndex: number;
}

const SKILL_CATEGORIES = [
  'BACKEND',
  'FRONTEND',
  'DATABASE',
  'DEVOPS',
  'SECURITY',
  'TOOLS',
  'SOFT_SKILLS'
];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Record<string, Skill[]>>({});
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'BACKEND',
    proficiencyLevel: 3,
    yearsOfExperience: '',
    icon: '',
    orderIndex: 0
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      setSkills(data.data || {});
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingSkill ? `/api/skills/${editingSkill.id}` : '/api/skills';
    const method = editingSkill ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          yearsOfExperience: formData.yearsOfExperience ? parseFloat(formData.yearsOfExperience) : null
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingSkill ? 'Skill updated!' : 'Skill created!');
        setDialogOpen(false);
        resetForm();
        fetchSkills();
      } else {
        toast.error(data.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`/api/skills/${id}`, { method: 'DELETE' });

      if (response.ok) {
        toast.success('Skill deleted');
        fetchSkills();
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete skill');
    }
  };

  const openEditDialog = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiencyLevel: skill.proficiencyLevel,
      yearsOfExperience: skill.yearsOfExperience?.toString() || '',
      icon: skill.icon || '',
      orderIndex: skill.orderIndex
    });
    setDialogOpen(true);
  };

  const openNewDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'BACKEND',
      proficiencyLevel: 3,
      yearsOfExperience: '',
      icon: '',
      orderIndex: 0
    });
  };

  const formatCategory = (cat: string) => {
    return cat.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
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
            <h1 className="text-4xl font-bold text-white mb-2">Manage Skills</h1>
            <p className="text-slate-400">Add, edit, or delete your skills</p>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600" onClick={openNewDialog}>
            <Plus className="mr-2" size={20} />
            Add Skill
          </Button>
        </div>

        {/* Skills Grid by Category */}
        {Object.keys(skills).length > 0 ? (
          <div className="space-y-8">
            {SKILL_CATEGORIES.map(category => {
              const categorySkills = skills[category];
              if (!categorySkills || categorySkills.length === 0) return null;

              return (
                <Card key={category} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">{formatCategory(category)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categorySkills.map(skill => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {skill.icon && (
                              <span className="text-2xl">{skill.icon}</span>
                            )}
                            <div>
                              <p className="font-medium text-white">{skill.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map(level => (
                                    <div
                                      key={level}
                                      className={`w-2 h-2 rounded-full ${
                                        level <= skill.proficiencyLevel
                                          ? 'bg-cyan-400'
                                          : 'bg-slate-500'
                                      }`}
                                    />
                                  ))}
                                </div>
                                {skill.yearsOfExperience && (
                                  <span className="text-xs text-slate-400">
                                    {skill.yearsOfExperience}y
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(skill)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(skill.id)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-slate-400 mb-4">No skills yet. Add your first one!</p>
            <Button className="bg-cyan-500 hover:bg-cyan-600" onClick={openNewDialog}>
              <Plus className="mr-2" size={20} />
              Add Skill
            </Button>
          </Card>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 bg-slate-700 border border-slate-600 rounded-md"
                  aria-label="Skill Category"
                >
                  {SKILL_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{formatCategory(cat)}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="proficiencyLevel">Proficiency (1-5)</Label>
                  <Input
                    id="proficiencyLevel"
                    type="number"
                    min={1}
                    max={5}
                    value={formData.proficiencyLevel}
                    onChange={(e) => setFormData({ ...formData, proficiencyLevel: parseInt(e.target.value) })}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    step="0.5"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="icon">Icon (emoji)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="🔧"
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="orderIndex">Order</Label>
                  <Input
                    id="orderIndex"
                    type="number"
                    value={formData.orderIndex}
                    onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) })}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                  {editingSkill ? 'Save Changes' : 'Create Skill'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
