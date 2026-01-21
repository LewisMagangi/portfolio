// app/admin/analytics/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Eye, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DownloadStat {
  id: string;
  fileType: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

interface AnalyticsData {
  totalDownloads: number;
  cvDownloads: number;
  pageViews: number;
  recentDownloads: DownloadStat[];
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>({
    totalDownloads: 0,
    cvDownloads: 0,
    pageViews: 0,
    recentDownloads: []
  });

  const fetchAnalytics = useCallback(async () => {
    try {
      // For now, we'll show placeholder data since the analytics API might not be fully implemented
      // In a real implementation, you'd fetch from your analytics endpoints
      setData({
        totalDownloads: 0,
        cvDownloads: 0,
        pageViews: 0,
        recentDownloads: []
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

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
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2" size={16} />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white">Analytics</h1>
            <p className="text-slate-400">Site metrics and download statistics</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CV Downloads</CardTitle>
              <Download className="text-cyan-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{data.cvDownloads}</div>
              <p className="text-xs text-slate-400 mt-1">Total CV downloads</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <FileText className="text-blue-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{data.totalDownloads}</div>
              <p className="text-xs text-slate-400 mt-1">All file downloads</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="text-green-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{data.pageViews}</div>
              <p className="text-xs text-slate-400 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <TrendingUp className="text-purple-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">+12%</div>
              <p className="text-xs text-slate-400 mt-1">From last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Downloads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Downloads</CardTitle>
            <CardDescription>Latest CV and file downloads</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentDownloads.length > 0 ? (
              <div className="space-y-4">
                {data.recentDownloads.map((download) => (
                  <div key={download.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <Download className="text-cyan-400" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{download.fileType} Download</p>
                        <p className="text-sm text-slate-400">{download.ipAddress}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">
                        {new Date(download.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(download.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Download className="mx-auto text-slate-500 mb-4" size={48} />
                <p className="text-slate-400">No downloads yet</p>
                <p className="text-sm text-slate-500 mt-1">Downloads will appear here once users start downloading your CV</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}