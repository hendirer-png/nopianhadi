import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  MessageSquare,
  FileText,
  Mail,
  ArrowUpRight,
  Users,
  Eye,
  TrendingUp
} from 'lucide-react';
import { projectsApi } from '../../lib/api/projects';
import { creativeWorksApi } from '../../lib/api/creativeWorks';
import { testimonialsApi } from '../../lib/api/testimonials';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface Stats {
  totalProjects: number;
  totalCreativeWorks: number;
  totalTestimonials: number;
  totalMessages: number;
  unreadMessages: number;
}

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalCreativeWorks: 0,
    totalTestimonials: 0,
    totalMessages: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [projects, creativeWorks, testimonials, messagesData, unreadData] = await Promise.all([
          projectsApi.getAll(),
          creativeWorksApi.getAll(),
          testimonialsApi.getAll(),
          supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
          supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'Unread')
        ]);

        setStats({
          totalProjects: projects.length,
          totalCreativeWorks: creativeWorks.length,
          totalTestimonials: testimonials.length,
          totalMessages: messagesData.count || 0,
          unreadMessages: unreadData.count || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Dashboard" subtitle="Memuat statistik...">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard" subtitle="Selamat datang kembali, Nopian Hadi!">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Proyek Web"
          value={stats.totalProjects}
          icon={Briefcase}
          color="blue"
          trend="+12%"
        />
        <StatCard
          title="Karya Kreatif"
          value={stats.totalCreativeWorks}
          icon={FileText}
          color="purple"
          trend="+8"
        />
        <StatCard
          title="Testimoni"
          value={stats.totalTestimonials}
          icon={MessageSquare}
          color="emerald"
          trend="+5%"
        />
        <StatCard
          title="Pesan Baru"
          value={stats.unreadMessages}
          icon={Mail}
          color="orange"
          isWarning={stats.unreadMessages > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Statistik Pengunjung</h3>
              <p className="text-sm text-gray-500">6 bulan terakhir</p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-2 outline-none">
              <option>Bulan Ini</option>
              <option>Tahun Ini</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-semibold opacity-80 mb-1">Status Portfolio</h3>
              <p className="text-3xl font-bold mb-6">98% Online</p>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <TrendingUp size={16} />
                <span>Meningkat 2.5% hari ini</span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Eye size={120} />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Aktivitas Terakhir</h3>
            <div className="space-y-6">
              {[
                { label: 'Proyek baru ditambahkan', time: '2 jam yang lalu', type: 'projects' },
                { label: 'Pesan dari Client X', time: '5 jam yang lalu', type: 'messages' },
                { label: 'Karya kreatif baru diunggah', time: '1 hari yang lalu', type: 'articles' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-2 h-2 rounded-full mt-2 ${item.type === 'projects' ? 'bg-blue-500' :
                    item.type === 'messages' ? 'bg-orange-500' : 'bg-purple-500'
                    }`} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: any;
  color: 'blue' | 'emerald' | 'purple' | 'orange';
  trend?: string;
  isWarning?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend, isWarning }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
            <ArrowUpRight size={14} />
            {trend}
          </div>
        )}
        {isWarning && typeof value === 'number' && value > 0 && (
          <div className="animate-pulse bg-red-100 text-red-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
            Urgent
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
