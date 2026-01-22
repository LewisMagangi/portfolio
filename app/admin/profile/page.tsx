// app/admin/profile/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, ArrowLeft, Eye, EyeOff, Save } from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/profile');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setFormData(prev => ({
          ...prev,
          name: data.user.name || '',
          email: data.user.email || '',
        }));
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    // Validate passwords match
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match');
      setMessageType('error');
      setSaving(false);
      return;
    }

    // Validate new password strength
    if (formData.newPassword && formData.newPassword.length < 8) {
      setMessage('New password must be at least 8 characters long');
      setMessageType('error');
      setSaving(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          currentPassword: formData.currentPassword || undefined,
          newPassword: formData.newPassword || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Profile updated successfully!');
        setMessageType('success');
        setUser(data.user);
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));

        // If email changed, user might need to re-login
        if (data.user.email !== user?.email) {
          setTimeout(() => {
            alert('Email changed. You may need to login again with your new email.');
          }, 2000);
        }
      } else {
        setMessage(data.message || 'Failed to update profile');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
      setMessageType('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2" size={16} />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white">Profile Settings</h1>
            <p className="text-slate-400">Manage your account information</p>
          </div>
        </div>

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="text-cyan-400" size={24} />
              Account Information
            </CardTitle>
            <CardDescription>
              Update your profile details and change your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Password Change */}
              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={formData.currentPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  Leave password fields empty if you don&apos;t want to change your password
                </p>
              </div>

              {/* Message */}
              {message && (
                <Alert className={messageType === 'success' ? 'border-green-500' : 'border-red-500'}>
                  <AlertDescription className={messageType === 'success' ? 'text-green-400' : 'text-red-400'}>
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" disabled={saving} className="bg-cyan-500 hover:bg-cyan-600">
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2" size={16} />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Read-only account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <Label className="text-slate-400">Role</Label>
                <p className="text-white font-medium">{user.role}</p>
              </div>
              <div>
                <Label className="text-slate-400">Member Since</Label>
                <p className="text-white font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label className="text-slate-400">Last Login</Label>
                <p className="text-white font-medium">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                </p>
              </div>
              <div>
                <Label className="text-slate-400">Last Updated</Label>
                <p className="text-white font-medium">
                  {new Date(user.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}