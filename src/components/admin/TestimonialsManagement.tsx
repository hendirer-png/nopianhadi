import React, { useEffect, useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Star,
  Quote,
  Building2,
  User,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  Briefcase
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { testimonialsApi } from '../../lib/api/testimonials';
import type { Testimonial } from '../../lib/supabase';
import Toast from './Toast';

const TestimonialsManagement: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'client' | 'message' | 'media'>('client');
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    position: '',
    company: '',
    message: '',
    rating: 5,
    image: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Pending'
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await testimonialsApi.getAll();
        if (!mounted) return;
        setTestimonials(data);
      } catch (e) {
        console.error('Failed to load testimonials', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = ratingFilter === 'All' || t.rating === parseInt(ratingFilter);
      return matchesSearch && matchesRating;
    });
  }, [testimonials, searchTerm, ratingFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus testimonial ini?')) return;
    try {
      await testimonialsApi.delete(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
      setToast({ message: 'Testimonial berhasil dihapus', type: 'success' });
    } catch (error) {
      console.error('Delete failed:', error);
      setToast({ message: 'Gagal menghapus testimonial', type: 'error' });
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setActiveTab('client');
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      position: '',
      company: '',
      message: '',
      rating: 5,
      image: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    });
    setActiveTab('client');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        const updated = await testimonialsApi.update(editingTestimonial.id, formData as Partial<Testimonial>);
        setTestimonials(prev => prev.map(t => (t.id === updated.id ? updated : t)));
        setToast({ message: 'Testimonial berhasil diupdate', type: 'success' });
      } else {
        const created = await testimonialsApi.create(formData as Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>);
        setTestimonials(prev => [created, ...prev]);
        setToast({ message: 'Testimonial berhasil ditambahkan', type: 'success' });
      }
      setShowModal(false);
    } catch (error) {
      console.error('Submit failed:', error);
      setToast({ message: 'Gagal menyimpan testimonial', type: 'error' });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
          />
        ))}
      </div>
    );
  };

  const tabs = [
    { id: 'client', label: 'Profil Klien', icon: User },
    { id: 'message', label: 'Isi Testimoni', icon: MessageSquare },
    { id: 'media', label: 'Media & Status', icon: ImageIcon },
  ];

  return (
    <AdminLayout
      title="Kelola Testimonial"
      subtitle={`Daftar testimoni klien Anda (${testimonials.length})`}
    >
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-1 items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari testimonial, nama, atau perusahaan..."
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
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="All">Semua Rating</option>
              <option value="5">5 Bintang</option>
              <option value="4">4 Bintang</option>
              <option value="3">3 Bintang</option>
              <option value="2">2 Bintang</option>
              <option value="1">1 Bintang</option>
            </select>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus size={20} />
            Testimoni Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex flex-col items-center py-20 gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
            <span className="text-gray-500 font-medium">Memuat testimonial...</span>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center text-gray-500 font-medium border border-dashed border-gray-200">
            Tidak ada testimonial ditemukan.
          </div>
        ) : (
          filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-emerald-50/50 group-hover:text-emerald-50 transition-colors pointer-events-none">
                <Quote size={120} />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-4 ring-emerald-50 group-hover:ring-emerald-100 transition-all"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${testimonial.status === 'Published' ? 'bg-emerald-500' : 'bg-orange-400'
                        }`}></div>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">{testimonial.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Briefcase size={14} className="text-emerald-500/50" />
                    <span>{testimonial.position}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                    <Building2 size={14} className="text-emerald-500/50" />
                    <span>{testimonial.company}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed italic line-clamp-4 font-medium">
                    "{testimonial.message}"
                  </p>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1">
                    <Calendar size={12} />
                    {testimonial.date}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
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
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  {editingTestimonial ? 'Edit Testimonial' : 'Testimonial Baru'}
                </h2>
                <p className="text-sm font-medium text-gray-500 mt-1">Umpan balik berharga dari klien Anda</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-3 rounded-2xl transition-all"
              >
                <Plus className="rotate-45" size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-10 py-4 bg-gray-50/50 flex gap-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-white text-emerald-600 shadow-md ring-1 ring-black/5'
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
                {activeTab === 'client' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-full">
                      <label className="block text-sm font-bold text-gray-700 mb-3">Nama Klien *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium"
                        placeholder="Contoh: John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Posisi/Jabatan *</label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium"
                        placeholder="Contoh: CEO"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Perusahaan *</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium"
                        placeholder="Contoh: Tech Corp"
                        required
                      />
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-bold text-gray-700 mb-3">Rating *</label>
                      <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: num })}
                            className={`flex-1 py-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${formData.rating === num
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                              : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'
                              }`}
                          >
                            <Star size={20} className={formData.rating && formData.rating >= num ? "fill-current" : ""} />
                            <span className="text-xs font-bold">{num}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'message' && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Pesan Testimonial *</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={8}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium resize-none text-sm leading-relaxed"
                        placeholder="Apa yang klien katakan tentang pekerjaan Anda?"
                        required
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Foto Klien URL *</label>
                      <div className="space-y-6">
                        <input
                          type="url"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium"
                          placeholder="https://images.unsplash.com/..."
                          required
                        />
                        {formData.image && (
                          <div className="flex justify-center">
                            <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-gray-100 shadow-xl">
                              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Tanggal</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Status *</label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium"
                          required
                        >
                          <option value="Pending">Pending</option>
                          <option value="Published">Published</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-10 py-8 border-t border-gray-100 bg-gray-50/50 rounded-b-[2rem] flex justify-between items-center">
              <div className="flex gap-2">
                {activeTab !== 'client' && (
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
                    className="px-10 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                  >
                    {editingTestimonial ? 'Simpan' : 'Tambahkan'}
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

export default TestimonialsManagement;
