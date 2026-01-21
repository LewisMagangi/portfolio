// app/admin/testimonials/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, Star, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating: number;
  featured: boolean;
  status: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    avatar: '',
    rating: 5,
    featured: false,
    status: 'PENDING'
  });

  const fetchTestimonials = useCallback(async () => {
    try {
      const status = filter === 'all' ? '' : filter.toUpperCase();
      const response = await fetch(`/api/testimonials${status ? `?status=${status}` : ''}`);
      const data = await response.json();
      setTestimonials(data.data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingItem ? `/api/testimonials/${editingItem.id}` : '/api/testimonials';
    const method = editingItem ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingItem ? 'Testimonial updated!' : 'Testimonial created!');
        setDialogOpen(false);
        resetForm();
        fetchTestimonials();
      } else {
        toast.error(data.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });

      if (response.ok) {
        toast.success('Testimonial deleted');
        fetchTestimonials();
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success('Status updated');
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update status');
    }
  };

  const openEditDialog = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      company: item.company || '',
      content: item.content,
      avatar: item.avatar || '',
      rating: item.rating,
      featured: item.featured,
      status: item.status
    });
    setDialogOpen(true);
  };

  const openNewDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      role: '',
      company: '',
      content: '',
      avatar: '',
      rating: 5,
      featured: false,
      status: 'PENDING'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-500';
      case 'PENDING': return 'bg-yellow-500';
      case 'REJECTED': return 'bg-red-500';
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
            <h1 className="text-4xl font-bold text-white mb-2">Manage Testimonials</h1>
            <p className="text-slate-400">Review and manage client testimonials</p>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600" onClick={openNewDialog}>
            <Plus className="mr-2" size={20} />
            Add Testimonial
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
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

        {/* Testimonials Grid */}
        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {testimonial.avatar ? (
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-cyan-400 font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-white">{testimonial.name}</p>
                        <p className="text-sm text-slate-400">
                          {testimonial.role}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(testimonial.status)}`}>
                      {testimonial.status}
                    </span>
                  </div>

                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={star <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-500'}
                      />
                    ))}
                  </div>

                  <p className="text-slate-300 text-sm line-clamp-4 mb-4">&ldquo;{testimonial.content}&rdquo;</p>

                  {testimonial.featured && (
                    <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs mb-4">
                      Featured
                    </span>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-slate-700">
                    {testimonial.status === 'PENDING' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(testimonial.id, 'APPROVED')}
                          className="border-green-500 text-green-500 hover:bg-green-500/10"
                        >
                          <Check size={14} className="mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(testimonial.id, 'REJECTED')}
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          <X size={14} className="mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(testimonial)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-slate-400 mb-4">No testimonials found.</p>
            <Button className="bg-cyan-500 hover:bg-cyan-600" onClick={openNewDialog}>
              <Plus className="mr-2" size={20} />
              Add Testimonial
            </Button>
          </Card>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="content">Testimonial Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={4}
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min={1}
                    max={5}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full h-10 px-3 bg-slate-700 border border-slate-600 rounded-md"
                    aria-label="Testimonial Status"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer h-10">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-slate-600"
                    />
                    <span>Featured</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                  {editingItem ? 'Save Changes' : 'Create Testimonial'}
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
