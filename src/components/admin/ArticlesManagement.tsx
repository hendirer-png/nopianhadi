import React, { useEffect, useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  Eye,
  ChevronRight,
  Info,
  Layout,
  FileText,
  Image as ImageIcon,
  Save,
  Check,
  X,
  Loader2,
  BookOpen,
  Type,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, Article, UserProfile } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import Toast from './Toast';
import { articlesApi } from '../../lib/api/articles';
import { userProfilesApi } from '../../lib/api/user-profiles';

const ArticlesManagement: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'content' | 'media'>('info');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'Draft',
    date: new Date().toISOString().split('T')[0],
    image: '',
    author: 'Nopian Hadi',
    author_name: 'Nopian Hadi',
    author_bio: '',
    author_avatar: '',
    tags: [],
    read_time: '5 min read'
  });

  const categories = ['Design', 'Development', 'AI', 'Tutorial', 'Personal'];

  useEffect(() => {
    fetchArticles();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const p = await userProfilesApi.getCurrent();
      setProfile(p);
      if (p) {
        setFormData(prev => ({
          ...prev,
          author: p.name,
          author_name: p.name,
          author_bio: p.bio,
          author_avatar: p.avatar
        }));
      }
    } catch (e) {
      console.warn('Could not fetch profile for auto-fill');
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await articlesApi.getAll();
      setArticles(data);
    } catch (error) {
      console.error('Error:', error);
      setToast({ message: 'Gagal memuat artikel.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || article.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchTerm, categoryFilter]);

  const handleAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      status: 'Draft',
      date: new Date().toISOString().split('T')[0],
      image: '',
      author: 'Nopian Hadi',
      author_name: 'Nopian Hadi',
      author_bio: 'Product Designer & Full-stack Developer',
      tags: [],
      read_time: '5 min read'
    });
    setActiveTab('info');
    setShowModal(true);
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({ ...article });
    setActiveTab('info');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Hapus artikel ini?')) return;
    try {
      await articlesApi.delete(id);
      setArticles(articles.filter(a => a.id !== id));
      setToast({ message: 'Artikel berhasil dihapus.', type: 'success' });
    } catch (error) {
      setToast({ message: 'Gagal menghapus artikel.', type: 'error' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        const updated = await articlesApi.update(editingArticle.id, formData);
        setArticles(articles.map(a => a.id === updated.id ? updated : a));
        setToast({ message: 'Artikel diperbarui!', type: 'success' });
      } else {
        const articleData = {
          ...formData,
          author: profile?.name || formData.author,
          author_name: profile?.name || formData.author_name,
          author_bio: profile?.bio || formData.author_bio,
          author_avatar: profile?.avatar || formData.author_avatar,
        };
        const created = await articlesApi.create(articleData as any);
        setArticles([created, ...articles]);
        setToast({ message: 'Artikel dipublikasikan!', type: 'success' });
      }
      setShowModal(false);
    } catch (error) {
      setToast({ message: 'Terjadi kesalahan.', type: 'error' });
    }
  };

  const handleTagsChange = (val: string) => {
    const tags = val.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData({ ...formData, tags });
  };

  const tabs = [
    { id: 'info', label: 'Informasi Dasar', icon: BookOpen },
    { id: 'content', label: 'Konten Artikel', icon: Type },
    { id: 'media', label: 'Media & Visual', icon: ImageIcon },
  ];

  return (
    <AdminLayout
      title="Kelola Artikel"
      subtitle={`Daftar tulisan blog Anda (${articles.length})`}
    >
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-1 items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition-all">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari artikel..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm">
            <Filter className="text-gray-400 w-4 h-4" />
            <select
              className="bg-transparent border-none outline-none text-sm font-medium text-gray-700"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">Semua Kategori</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-purple-500/20 transition-all"
          >
            <Plus size={20} />
            Artikel Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
            <span className="text-gray-500 font-medium">Memuat artikel...</span>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-500 font-medium border border-dashed border-gray-200">
            Tidak ada artikel ditemukan.
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-80 h-56 md:h-auto overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${article.status === 'Published'
                      ? 'bg-emerald-500/80 text-white'
                      : 'bg-orange-500/80 text-white'
                      }`}>
                      {article.status}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-widest px-3 py-1 bg-purple-50 rounded-lg">
                      {article.category}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/article/${article.id}`}
                        target="_blank"
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                        title="Pratinjau"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => handleEdit(article)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                    {article.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex flex-wrap items-center gap-6 text-xs font-bold text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-300" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-300" />
                      {article.read_time}
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-300" />
                      {article.author_name || article.author}
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      {article.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-purple-400 bg-purple-50 px-2 py-0.5 rounded-md">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  {editingArticle ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                </h2>
                <p className="text-sm font-medium text-gray-500 mt-1">Bagikan pengetahuan Anda melalui blog</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-3 rounded-2xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-10 py-4 bg-gray-50/50 flex gap-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-md ring-1 ring-black/5'
                    : 'text-gray-500 hover:bg-white/50'
                    }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10">
              <div className="space-y-8">
                {activeTab === 'info' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-full">
                      <label className="block text-sm font-bold text-gray-700 mb-3">Judul Artikel *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-500 transition-all outline-none font-medium"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Kategori *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-500 transition-all outline-none font-medium"
                        required
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Status *</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-500 transition-all outline-none font-medium"
                        required
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Tags (koma sebagai pemisah)</label>
                      <input
                        type="text"
                        value={formData.tags?.join(', ')}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-500 transition-all outline-none font-medium"
                        placeholder="React, Design, UI"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Waktu Baca</label>
                      <input
                        type="text"
                        value={formData.read_time}
                        onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-500 transition-all outline-none font-medium"
                        placeholder="5 min read"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'content' && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Excerpt (Ringkasan Singkat) *</label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={3}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-500 transition-all outline-none font-medium resize-none text-sm leading-relaxed"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Isi Artikel (Markdown/HTML) *</label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={12}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-500 transition-all outline-none font-medium font-mono text-sm leading-relaxed"
                        required
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Banner Image URL *</label>
                      <div className="space-y-6">
                        <input
                          type="url"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-500 transition-all outline-none font-medium"
                          placeholder="https://images.unsplash.com/..."
                          required
                        />
                        {formData.image && (
                          <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-gray-100 shadow-inner max-w-2xl mx-auto">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Tanggal Publikasi</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-500 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-10 py-8 border-t border-gray-100 bg-gray-50/50 rounded-b-[2rem] flex justify-between items-center">
              <div className="flex gap-2">
                {activeTab !== 'info' && (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = tabs.findIndex(t => t.id === activeTab);
                      setActiveTab(tabs[idx - 1].id as any);
                    }}
                    className="px-6 py-3 font-bold text-gray-400 hover:text-gray-900 transition-all"
                  >
                    Kembali
                  </button>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 font-bold text-gray-400 hover:text-gray-600 transition-all"
                >
                  Batal
                </button>
                {activeTab !== 'media' ? (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = tabs.findIndex(t => t.id === activeTab);
                      setActiveTab(tabs[idx + 1].id as any);
                    }}
                    className="px-10 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:shadow-xl transition-all"
                  >
                    Lanjut
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-10 py-3 bg-purple-600 text-white rounded-2xl font-bold hover:shadow-xl shadow-purple-500/20 transition-all hover:-translate-y-0.5"
                  >
                    {editingArticle ? 'Simpan Artikel' : 'Publikasi Artikel'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </AdminLayout>
  );
};

export default ArticlesManagement;
