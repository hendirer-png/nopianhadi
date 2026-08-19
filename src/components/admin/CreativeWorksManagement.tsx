import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Image as ImageIcon, Video } from 'lucide-react';
import { creativeWorksApi } from '../../lib/api/creativeWorks';
import { storageApi } from '../../lib/api/storage';
import { CreativeWork } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import { Loader2 } from 'lucide-react';

interface ToastState { message: string; type: 'success' | 'error'; }

const CreativeWorksManagement: React.FC = () => {
  const [works, setWorks] = useState<CreativeWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [editingWork, setEditingWork] = useState<CreativeWork | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [formData, setFormData] = useState<Partial<CreativeWork>>({
    title: '', category: 'Design', image: '', images: [], video_url: '', status: 'Published'
  });

  useEffect(() => { fetchWorks(); }, []);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3500); return () => clearTimeout(t); }
  }, [toast]);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const data = await creativeWorksApi.getAll();
      setWorks(data);
    } catch { setToast({ message: 'Gagal memuat data.', type: 'error' }); }
    finally { setLoading(false); }
  };

  const filteredWorks = useMemo(() =>
    works.filter(w => {
      const matchSearch = w.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = filterCategory === 'All' || w.category === filterCategory;
      return matchSearch && matchCat;
    }), [works, searchTerm, filterCategory]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus karya ini?')) return;
    try {
      await creativeWorksApi.delete(id);
      setWorks(prev => prev.filter(w => w.id !== id));
      setToast({ message: 'Karya berhasil dihapus.', type: 'success' });
    } catch { setToast({ message: 'Gagal menghapus karya.', type: 'error' }); }
  };

  const openModal = (work?: CreativeWork) => {
    if (work) { setEditingWork(work); setFormData(work); }
    else { setEditingWork(null); setFormData({ title: '', category: 'Design', image: '', images: [], video_url: '', status: 'Published' }); }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingWork(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingWork) {
        const updated = await creativeWorksApi.update(editingWork.id, formData);
        setWorks(prev => prev.map(w => w.id === updated.id ? updated : w));
        setToast({ message: 'Karya berhasil diperbarui!', type: 'success' });
      } else {
        const created = await creativeWorksApi.create(formData as Omit<CreativeWork, 'id' | 'created_at' | 'updated_at'>);
        setWorks(prev => [created, ...prev]);
        setToast({ message: 'Karya berhasil ditambahkan!', type: 'success' });
      }
      closeModal();
    } catch { setToast({ message: 'Gagal menyimpan karya.', type: 'error' }); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      const url = await storageApi.uploadImage(file, 'creative-works/');
      setFormData({ ...formData, image: url });
      setToast({ message: 'Gambar berhasil diunggah!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Gagal mengunggah gambar.', type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    try {
      setIsUploadingGallery(true);
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await storageApi.uploadImage(files[i], 'creative-works/gallery/');
        urls.push(url);
      }
      setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...urls] }));
      setToast({ message: `${files.length} gambar berhasil diunggah!`, type: 'success' });
    } catch (error) {
      setToast({ message: 'Gagal mengunggah galeri gambar.', type: 'error' });
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  return (
    <AdminLayout title="Kelola Karya Kreatif" subtitle="Manajemen portfolio desain grafis dan video editing.">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari karya..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-11 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm w-full transition-all"
              >
                <option value="All">Semua Kategori</option>
                <option value="Design">Desain Grafis</option>
                <option value="Video">Video Editing</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold text-sm whitespace-nowrap shadow-lg shadow-red-500/20"
          >
            <Plus className="w-4 h-4" />Karya Baru
          </button>
        </div>

        {/* Grid Cards */}
        {loading ? (
          <div className="py-16 text-center text-gray-400">Memuat data...</div>
        ) : filteredWorks.length === 0 ? (
          <div className="py-16 text-center text-gray-400">Tidak ada karya ditemukan.</div>
        ) : (
          <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredWorks.map(work => (
              <div key={work.id} className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {work.video_url && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={work.video_url} target="_blank" rel="noreferrer"
                        className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <Video className="w-4 h-4 text-gray-900 ml-0.5" />
                      </a>
                    </div>
                  )}
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${work.category === 'Design' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {work.category === 'Design' ? 'Desain' : 'Video'}
                  </span>
                  <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${work.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {work.status}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-bold text-gray-900 text-sm leading-tight mb-3 line-clamp-2">{work.title}</p>
                  <div className="flex gap-2">
                    <button onClick={() => openModal(work)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 rounded-lg transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />Edit
                    </button>
                    <button onClick={() => handleDelete(work.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10 rounded-t-3xl">
              <h2 className="text-lg font-bold text-gray-900">
                {editingWork ? 'Edit Karya Kreatif' : 'Tambah Karya Baru'}
              </h2>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors text-lg">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Karya *</label>
                <input type="text" required value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  placeholder="Contoh: Brand Campaign Ramadan 2024" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kategori *</label>
                  <select value={formData.category || 'Design'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500">
                    <option value="Design">Desain Grafis</option>
                    <option value="Video">Video Editing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                  <select value={formData.status || 'Published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Published' | 'Draft' })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500">
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Gambar (Thumbnail) *</label>
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all cursor-pointer"
                  />
                  {isUploading && <Loader2 className="w-5 h-5 text-red-500 animate-spin" />}
                </div>
              </div>
              {formData.image && (
                <div className="rounded-xl overflow-hidden h-36 bg-gray-100">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Galeri Gambar (Bisa Pilih Banyak)</label>
                <div className="flex items-center gap-4 mb-4">
                  <input type="file" accept="image/*" multiple
                    onChange={handleGalleryUpload}
                    disabled={isUploadingGallery}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all cursor-pointer"
                  />
                  {isUploadingGallery && <Loader2 className="w-5 h-5 text-red-500 animate-spin" />}
                </div>
                {formData.images && formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-3">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => removeGalleryImage(idx)} className="p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-transform">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  URL Video <span className="text-gray-400 font-normal">(Opsional)</span>
                </label>
                <input type="text" value={formData.video_url || ''}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  placeholder="https://youtube.com/watch?v=..." />
                <p className="text-xs text-gray-400 mt-1.5">Isi jika karya ini memiliki link video YouTube/Vimeo.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal}
                  className="flex-1 py-3 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm">
                  Batal
                </button>
                <button type="submit"
                  className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors text-sm shadow-lg shadow-red-500/25">
                  Simpan Karya
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold transition-all ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.message}
        </div>
      )}
    </AdminLayout>
  );
};

export default CreativeWorksManagement;
