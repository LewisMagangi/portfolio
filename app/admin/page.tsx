// app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  MessageSquare, 
  User, 
  Settings,
  LogOut,
  TrendingUp,
  Eye,
  Download,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    blogPosts: 0,
    messages: 0,
    views: 0
  });

  useEffect(() => {
    fetchUser();
    fetchStats();
  }, []);

  const fetchUser = async () => {
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
  };

  const fetchStats = async () => {
    try {
      const [projectsRes, postsRes, messagesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/blog/posts'),
        fetch('/api/contact?status=NEW')
      ]);

      const [projectsData, postsData, messagesData] = await Promise.all([
        projectsRes.json(),
        postsRes.json(),
        messagesRes.json()
      ]);

      setStats({
        projects: projectsData.count || 0,
        blogPosts: postsData.pagination?.total || 0,
        messages: messagesData.data?.length || 0,
        views: 0 // Would fetch from analytics
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Welcome back, {user?.name}!</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-red-500 text-red-500 hover:bg-red-500/10">
            <LogOut className="mr-2" size={20} />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderKanban className="text-cyan-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{stats.projects}</div>
              <p className="text-xs text-slate-400 mt-1">Active and completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="text-blue-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{stats.blogPosts}</div>
              <p className="text-xs text-slate-400 mt-1">Published articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Messages</CardTitle>
              <Mail className="text-purple-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{stats.messages}</div>
              <p className="text-xs text-slate-400 mt-1">Unread inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="text-green-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{stats.views}</div>
              <p className="text-xs text-slate-400 mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/projects">
            <Card className="hover:border-cyan-500 transition-colors cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <FolderKanban className="text-cyan-400" size={24} />
                </div>
                <CardTitle>Manage Projects</CardTitle>
                <CardDescription>Add, edit, or delete portfolio projects</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/blog">
            <Card className="hover:border-blue-500 transition-colors cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="text-blue-400" size={24} />
                </div>
                <CardTitle>Manage Blog</CardTitle>
                <CardDescription>Create and publish new articles</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/messages">
            <Card className="hover:border-purple-500 transition-colors cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="text-purple-400" size={24} />
                </div>
                <CardTitle>Messages</CardTitle>
                <CardDescription>View and respond to contact inquiries</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/experience">
            <Card className="hover:border-green-500 transition-colors cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="text-green-400" size={24} />
                </div>
                <CardTitle>Experience & Education</CardTitle>
                <CardDescription>Update work history and education</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/skills">
            <Card className="hover:border-yellow-500 transition-colors cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="text-yellow-400" size={24} />
                </div>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Manage technical skills and proficiency</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="hover:border-orange-500 transition-colors cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="text-orange-400" size={24} />
                </div>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View site traffic and metrics</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}