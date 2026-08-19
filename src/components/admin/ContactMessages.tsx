import React, { useState, useEffect } from 'react';
import {
  Mail,
  Clock,
  Trash2,
  CheckCircle,
  Archive as ArchiveIcon,
  Eye,
  EyeOff,
  Reply,
  MoreVertical,
  ChevronRight,
  User,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
  created_at: string;
  updated_at: string;
}

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: ContactMessage['status']) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.map(msg =>
        msg.id === id ? { ...msg, status: newStatus } : msg
      ));

      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.filter(msg => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    return msg.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Unread': return { color: 'text-blue-600 bg-blue-50', icon: EyeOff, label: 'Belum Dibaca' };
      case 'Read': return { color: 'text-yellow-600 bg-yellow-50', icon: Eye, label: 'Sudah Dibaca' };
      case 'Replied': return { color: 'text-emerald-600 bg-emerald-50', icon: CheckCircle, label: 'Sudah Dibalas' };
      case 'Archived': return { color: 'text-gray-500 bg-gray-50', icon: ArchiveIcon, label: 'Diarsipkan' };
      default: return { color: 'text-gray-500 bg-gray-50', icon: Clock, label: status };
    }
  };

  const getSubjectLabel = (subject: string) => {
    const labels: { [key: string]: string } = {
      'web-development': 'Web Development',
      'ui-ux-design': 'UI/UX Design',
      'consulting': 'Consulting',
      'other': 'Lainnya'
    };
    return labels[subject] || subject;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = [
    { label: 'Total Pesan', value: messages.length, color: 'text-gray-600', bg: 'bg-white', icon: MessageSquare },
    { label: 'Belum Dibaca', value: messages.filter(m => m.status === 'Unread').length, color: 'text-blue-600', bg: 'bg-blue-50', icon: AlertCircle },
    { label: 'Dibalas', value: messages.filter(m => m.status === 'Replied').length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle },
    { label: 'Diarsipkan', value: messages.filter(m => m.status === 'Archived').length, color: 'text-gray-500', bg: 'bg-gray-50', icon: ArchiveIcon },
  ];

  return (
    <AdminLayout
      title="Pesan Kontak"
      subtitle="Kelola semua pesan masuk dari website Anda"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((item, idx) => (
          <div key={idx} className={`${item.bg} p-6 rounded-[2rem] border border-gray-100 shadow-sm`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${item.color} bg-white shadow-sm`}>
                <item.icon size={20} />
              </div>
            </div>
            <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
            <div className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {['all', 'unread', 'read', 'replied', 'archived'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${filter === f
              ? 'bg-gray-900 text-white shadow-lg'
              : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 font-medium'
              }`}
          >
            {f === 'all' ? 'Semua' :
              f === 'unread' ? 'Belum Dibaca' :
                f === 'read' ? 'Dibaca' :
                  f === 'replied' ? 'Dibalas' : 'Arsip'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Messages List */}
        <div className="lg:col-span-5 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center py-20 gap-3 bg-white rounded-[2rem] border border-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="text-gray-400 font-medium">Memuat pesan...</span>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="bg-white p-12 rounded-[2rem] border border-gray-100 text-center text-gray-400 font-bold italic">
              Kosong. Tidak ada pesan {filter !== 'all' ? `dengan status ${filter}` : ''}.
            </div>
          ) : (
            filteredMessages.map((message) => {
              const statusInfo = getStatusInfo(message.status);
              return (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (message.status === 'Unread') updateStatus(message.id, 'Read');
                  }}
                  className={`group bg-white p-6 rounded-[2rem] border-2 cursor-pointer transition-all hover:shadow-xl ${selectedMessage?.id === message.id
                    ? 'border-gray-900 shadow-xl'
                    : 'border-transparent shadow-sm'
                    } ${message.status === 'Unread' ? 'bg-blue-50/30' : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${message.status === 'Unread' ? 'bg-blue-500 animate-pulse' : 'bg-transparent'}`}></div>
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{formatDate(message.created_at)}</span>
                  </div>

                  <h3 className={`font-black text-gray-900 mb-1 group-hover:text-gray-900 transition-colors ${message.status === 'Unread' ? 'text-lg' : 'text-base'}`}>{message.name}</h3>
                  <p className="text-xs font-bold text-gray-400 mb-4">{message.email}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">
                      {getSubjectLabel(message.subject)}
                    </span>
                    <ChevronRight className={`text-gray-300 transition-transform ${selectedMessage?.id === message.id ? 'translate-x-1 text-gray-900' : ''}`} size={16} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          {selectedMessage ? (
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Detail Header */}
              <div className="bg-gray-900 p-10 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                        <User size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black">{selectedMessage.name}</h2>
                        <p className="text-gray-400 font-bold text-sm tracking-wide">{selectedMessage.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 text-xs font-black uppercase tracking-widest text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{formatDate(selectedMessage.created_at)}</span>
                  </div>
                  <div className="ml-auto px-4 py-1.5 bg-white/5 rounded-xl border border-white/10 text-white">
                    {getSubjectLabel(selectedMessage.subject)}
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-10">
                <div className="mb-10">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 block">Pesan Masuk</span>
                  <div className="text-gray-700 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Quick Status Update */}
                <div className="bg-gray-50 rounded-3xl p-6 mb-8">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-4 block">Perbarui Status</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(['Unread', 'Read', 'Replied', 'Archived'] as const).map((status) => {
                      const info = getStatusInfo(status);
                      return (
                        <button
                          key={status}
                          onClick={() => updateStatus(selectedMessage.id, status)}
                          disabled={selectedMessage.status === status}
                          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border-2 transition-all ${selectedMessage.status === status
                            ? 'bg-white border-gray-900 text-gray-900 shadow-md ring-4 ring-gray-900/5'
                            : 'bg-white border-transparent text-gray-400 hover:border-gray-200'
                            }`}
                        >
                          <info.icon size={18} />
                          <span className="text-[10px] font-black uppercase">{status}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Final Actions */}
                <div className="flex flex-col md:flex-row gap-4">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${getSubjectLabel(selectedMessage.subject)}`}
                    onClick={() => updateStatus(selectedMessage.id, 'Replied')}
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/20 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Reply size={20} />
                    Balas Sekarang
                  </a>
                  <button
                    onClick={() => updateStatus(selectedMessage.id, 'Archived')}
                    className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-400 font-black rounded-2xl hover:border-gray-900 hover:text-gray-900 transition-all"
                  >
                    Arsipkan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-dashed border-gray-200 p-20 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 text-gray-300">
                <Mail size={40} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Pilih sebuah pesan</h3>
              <p className="text-gray-400 font-medium max-w-xs">Pilih salah satu pesan di sebelah kiri untuk melihat detail dan merespon.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactMessages;
