// app/admin/messages/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { Mail, Trash2, Check, Archive, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: string;
  replied: boolean;
  repliedAt?: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      const status = filter === 'all' ? '' : filter.toUpperCase();
      const response = await fetch(`/api/contact${status ? `?status=${status}` : ''}`);
      const data = await response.json();
      setMessages(data.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success('Status updated');
        fetchMessages();
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update status');
    }
  };

  const handleMarkReplied = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replied: true, status: 'REPLIED' }),
      });

      if (response.ok) {
        toast.success('Marked as replied');
        fetchMessages();
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, { method: 'DELETE' });

      if (response.ok) {
        toast.success('Message deleted');
        fetchMessages();
        if (selectedMessage?.id === id) {
          setDialogOpen(false);
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete message');
    }
  };

  const openMessage = (message: Message) => {
    setSelectedMessage(message);
    setDialogOpen(true);
    
    // Mark as read if new
    if (message.status === 'NEW') {
      handleStatusChange(message.id, 'READ');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-500';
      case 'READ': return 'bg-slate-500';
      case 'REPLIED': return 'bg-green-500';
      case 'ARCHIVED': return 'bg-gray-500';
      case 'SPAM': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
            <h1 className="text-4xl font-bold text-white mb-2">Messages</h1>
            <p className="text-slate-400">Manage contact form submissions</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Mail size={16} />
            {messages.filter(m => m.status === 'NEW').length} new
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'new', 'read', 'replied', 'archived', 'spam'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              onClick={() => setFilter(status)}
              className={filter === status ? 'bg-cyan-500' : ''}
              size="sm"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Messages List */}
        {messages.length > 0 ? (
          <div className="space-y-2">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-750 transition-colors ${
                  message.status === 'NEW' ? 'border-l-4 border-l-cyan-500' : ''
                }`}
                onClick={() => openMessage(message)}
              >
                <CardContent className="py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(message.status)}`} />
                        <span className={`font-medium ${message.status === 'NEW' ? 'text-white' : 'text-slate-300'}`}>
                          {message.name}
                        </span>
                        <span className="text-slate-500 text-sm">&lt;{message.email}&gt;</span>
                        {message.replied && (
                          <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
                            Replied
                          </span>
                        )}
                      </div>
                      {message.subject && (
                        <p className={`text-sm ${message.status === 'NEW' ? 'text-slate-200' : 'text-slate-400'} mb-1`}>
                          {message.subject}
                        </p>
                      )}
                      <p className="text-slate-500 text-sm line-clamp-1">
                        {message.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-slate-500 text-xs whitespace-nowrap">
                        {formatDate(message.createdAt)}
                      </span>
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        {!message.replied && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkReplied(message.id)}
                            title="Mark as replied"
                          >
                            <Reply size={14} />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(message.id, 'ARCHIVED')}
                          title="Archive"
                        >
                          <Archive size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(message.id)}
                          className="text-red-500 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Mail className="mx-auto text-slate-500 mb-4" size={48} />
            <p className="text-slate-400">No messages found.</p>
          </Card>
        )}

        {/* Message Detail Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail size={20} />
                Message Details
              </DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">From</p>
                    <p className="font-medium">{selectedMessage.name}</p>
                    <p className="text-cyan-400 text-sm">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Received</p>
                    <p>{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {selectedMessage.subject && (
                  <div>
                    <p className="text-slate-400 text-sm">Subject</p>
                    <p className="font-medium">{selectedMessage.subject}</p>
                  </div>
                )}

                <div>
                  <p className="text-slate-400 text-sm mb-2">Message</p>
                  <div className="bg-slate-700 p-4 rounded-lg whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                    {selectedMessage.replied && (
                      <span className="text-green-400 text-sm flex items-center gap-1">
                        <Check size={14} />
                        Replied {selectedMessage.repliedAt && `on ${new Date(selectedMessage.repliedAt).toLocaleDateString()}`}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}`)}
                    >
                      <Reply size={14} className="mr-1" />
                      Reply via Email
                    </Button>
                    {!selectedMessage.replied && (
                      <Button
                        size="sm"
                        onClick={() => {
                          handleMarkReplied(selectedMessage.id);
                          setDialogOpen(false);
                        }}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Check size={14} className="mr-1" />
                        Mark Replied
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
