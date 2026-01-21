// app/admin/cv/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Download, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  cv?: string;
}

export default function CVManager() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setCvFile(file);
    }
  };

  const handleUpload = async () => {
    if (!cvFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('cv', cvFile);

      const response = await fetch('/api/admin/cv/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUser(prev => prev ? { ...prev, cv: data.cvPath } : null);
        setCvFile(null);
        alert('CV uploaded successfully!');
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error uploading CV:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your CV?')) return;

    try {
      const response = await fetch('/api/admin/cv/delete', {
        method: 'DELETE',
      });

      if (response.ok) {
        setUser(prev => prev ? { ...prev, cv: undefined } : null);
        alert('CV deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Delete failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting CV:', error);
      alert('Delete failed. Please try again.');
    }
  };

  const handleDownload = () => {
    if (user?.cv) {
      const link = document.createElement('a');
      link.href = user.cv;
      link.download = `${user.name.replace(/\s+/g, '_')}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
            <h1 className="text-4xl font-bold text-white">CV Management</h1>
            <p className="text-slate-400">Upload and manage your CV for download</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Current CV Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="text-cyan-400" size={24} />
                Current CV
              </CardTitle>
              <CardDescription>
                {user.cv ? 'Your CV is uploaded and available for download' : 'No CV uploaded yet'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.cv ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <FileText size={16} />
                    <span>CV uploaded</span>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleDownload} variant="outline" size="sm">
                      <Download className="mr-2" size={16} />
                      Download
                    </Button>
                    <Button onClick={handleDelete} variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500/10">
                      <Trash2 className="mr-2" size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-slate-400">
                  No CV file uploaded. Upload one below to make it available for download on your portfolio.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload New CV */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="text-blue-400" size={24} />
                Upload CV
              </CardTitle>
              <CardDescription>
                Upload a new CV file (PDF only, max 10MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cv-file">Select CV File</Label>
                  <Input
                    id="cv-file"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                </div>
                {cvFile && (
                  <div className="text-sm text-slate-300">
                    Selected: {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
                <Button
                  onClick={handleUpload}
                  disabled={!cvFile || uploading}
                  className="w-full"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2" size={16} />
                      Upload CV
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Download Information</CardTitle>
            <CardDescription>
              Your CV download link will be available at: <code className="bg-slate-800 px-2 py-1 rounded">/api/cv/download</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">
              Visitors can download your CV from the main portfolio page. Downloads are tracked for analytics.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}