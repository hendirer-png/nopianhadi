import React, { useEffect, useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Info,
  Type,
  Link as LinkIcon,
  Star
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { projectsApi } from '../../lib/api/projects';
import { storageApi } from '../../lib/api/storage';
import type { Project } from '../../lib/supabase';
import Toast from './Toast';
import { Loader2 } from 'lucide-react';

const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'media' | 'extra'>('basic');
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    client: '',
    year: new Date().getFullYear().toString(),
    category: '',
    hero_image: '',
    overview: '',
    challenge: '',
    solution: '',
    results: [],
    technologies: [],
    duration: '',
    role: '',
    images: [],
    video: '',
    live_demo: '',
    source_code: '',
    status: 'Draft',
    testimonial_quote: '',
    testimonial_author: '',
    testimonial_position: ''
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        if (!mounted) return;
        setProjects(data);
      } catch (e) {
        console.error('Failed to load projects', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus project ini?')) return;
    try {
      await projectsApi.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      setToast({ message: 'Project berhasil dihapus', type: 'success' });
    } catch (error) {
      console.error('Delete failed:', error);
      setToast({ message: 'Gagal menghapus project', type: 'error' });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setActiveTab('basic');
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      client: '',
      year: new Date().getFullYear().toString(),
      category: '',
      hero_image: '',
      overview: '',
      challenge: '',
      solution: '',
      results: [],
      technologies: [],
      duration: '',
      role: '',
      images: [],
      video: '',
      live_demo: '',
      source_code: '',
      status: 'Draft',
      testimonial_quote: '',
      testimonial_author: '',
      testimonial_position: ''
    });
    setActiveTab('basic');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        const updated = await projectsApi.update(editingProject.id, formData as Partial<Project>);
        setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
        setToast({ message: 'Project berhasil diupdate', type: 'success' });
      } else {
        const created = await projectsApi.create(formData as Omit<Project, 'id' | 'created_at' | 'updated_at'>);
        setProjects(prev => [created, ...prev]);
        setToast({ message: 'Project berhasil ditambahkan', type: 'success' });
      }
      setShowModal(false);
    } catch (error) {
      console.error('Submit failed:', error);
      setToast({ message: 'Gagal menyimpan project', type: 'error' });
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingHero(true);
      const url = await storageApi.uploadImage(file, 'projects/');
      setFormData(prev => ({ ...prev, hero_image: url }));
      setToast({ message: 'Thumbnail berhasil diunggah!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Gagal mengunggah thumbnail.', type: 'error' });
    } finally {
      setIsUploadingHero(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsUploadingGallery(true);
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await storageApi.uploadImage(files[i], 'projects/gallery/');
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

  const tabs = [
    { id: 'basic', label: 'Info Dasar', icon: Info },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'extra', label: 'Tambahan', icon: Star },
  ];

  return (
    <AdminLayout
      title="Kelola Proyek"
      subtitle={`Daftar semua proyek portfolio (${projects.length})`}
    >
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-1 items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-red-500 focus-within:border-transparent transition-all">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari proyek atau klien..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="All">Semua Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Proyek Baru
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Proyek & Klien</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Tahun</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                      <span className="text-gray-500 text-sm font-medium">Memuat data proyek...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-gray-500 font-medium">
                    Tidak ada proyek ditemukan.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm">
                          <img src={project.hero_image} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">{project.title}</p>
                          <p className="text-xs text-gray-500 font-medium">{project.client}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-lg">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-gray-600">
                      {project.year}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${project.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-orange-50 text-orange-600'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'Published' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                        {project.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-red-500/10 absolute inset-0 pointer-events-none" />
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col relative animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  {editingProject ? 'Edit Proyek' : 'Proyek Baru'}
                </h2>
                <p className="text-gray-500 text-sm mt-2 font-medium">Lengkapi detail karya terbaik Anda</p>
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
                    ? 'bg-white text-red-600 shadow-md ring-1 ring-black/5'
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
                {activeTab === 'basic' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Nama Proyek *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 transition-all outline-none font-medium"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Kategori *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 transition-all outline-none font-medium"
                        required
                      >
                        <option value="">Pilih Kategori</option>
                        <option value="Website">Website</option>
                        <option value="Desain Grafis">Desain Grafis</option>
                        <option value="Video Editing">Video Editing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Tahun *</label>
                      <input
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 transition-all outline-none font-medium"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Status Publikasi *</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 transition-all outline-none font-medium"
                        required
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </div>
                )}



                {activeTab === 'media' && (
                  <div className="space-y-8">
                    <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 flex items-start gap-4">
                      <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                        <ImageIcon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-red-900">Media & Visual</h4>
                        <p className="text-sm text-red-700 mt-1">Unggah gambar dari perangkat Anda langsung ke Supabase Storage.</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Upload Thumbnail Proyek (Hero Image) *</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="file" accept="image/*"
                          onChange={handleHeroImageUpload}
                          disabled={isUploadingHero}
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all cursor-pointer"
                        />
                        {isUploadingHero && <Loader2 className="w-5 h-5 text-red-500 animate-spin" />}
                        {formData.hero_image && (
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                            <img src={formData.hero_image} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Video Demo URL (Embed)</label>
                      <input
                        type="url"
                        value={formData.video || ''}
                        onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 transition-all outline-none font-medium text-sm"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'extra' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Live Demo URL</label>
                        <input
                          type="url"
                          value={formData.live_demo || ''}
                          onChange={(e) => setFormData({ ...formData, live_demo: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 transition-all outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Source Code URL</label>
                        <input
                          type="url"
                          value={formData.source_code || ''}
                          onChange={(e) => setFormData({ ...formData, source_code: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 transition-all outline-none font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-10 py-8 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-b-[2rem]">
              <div className="flex gap-2">
                {activeTab !== 'basic' && (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = tabs.findIndex(t => t.id === activeTab);
                      setActiveTab(tabs[idx - 1].id as any);
                    }}
                    className="px-6 py-3 font-bold text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Kembali
                  </button>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 font-bold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Batal
                </button>
                {activeTab !== 'extra' ? (
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
                    className="px-10 py-3 bg-red-500 text-white rounded-2xl font-bold hover:shadow-xl shadow-red-500/20 transition-all hover:-translate-y-0.5"
                  >
                    {editingProject ? 'Simpan Perubahan' : 'Terbitkan Proyek'}
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

export default ProjectsManagement;

