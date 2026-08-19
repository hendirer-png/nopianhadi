import React, { useState, useRef } from 'react';
import {
  User,
  Share2,
  Shield,
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Check,
  Save,
  LogOut,
  AlertTriangle,
  Lock,
  Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import Toast from './Toast';

interface ProfileSettings {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
  website: string;
}

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

const SettingsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'social' | 'security'>('profile');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileSettings>({
    name: 'Nopian Hadi',
    email: 'nopian@example.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, Indonesia',
    bio: 'Full Stack Developer & UI/UX Designer dengan 5+ tahun pengalaman',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    website: 'https://nopianhadi.com'
  });

  const [social, setSocial] = useState<SocialLinks>({
    github: 'https://github.com/nopianhadi',
    linkedin: 'https://linkedin.com/in/nopianhadi',
    twitter: 'https://twitter.com/nopianhadi',
    instagram: 'https://instagram.com/nopianhadi'
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({ message: 'Profil berhasil diperbarui!', type: 'success' });
    }, 1000);
  };

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({ message: 'Media sosial berhasil diperbarui!', type: 'success' });
    }, 1000);
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      setToast({ message: 'Password baru tidak cocok!', type: 'error' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({ message: 'Password berhasil diperbarui!', type: 'success' });
      setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 1000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|jpg|png|gif)$/)) {
      setToast({ message: 'Format file tidak didukung!', type: 'error' });
      return;
    }

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      setProfile({ ...profile, avatar: data.publicUrl });
      setToast({ message: 'Foto profil diperbarui!', type: 'success' });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setToast({ message: 'Gagal upload foto.', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil Akun', icon: User, color: 'text-blue-500' },
    { id: 'social', label: 'Media Sosial', icon: Share2, color: 'text-emerald-500' },
    { id: 'security', label: 'Keamanan', icon: Shield, color: 'text-purple-500' },
  ];

  return (
    <AdminLayout
      title="Pengaturan"
      subtitle="Kelola profil, tautan sosial, dan keamanan akun Anda"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-72 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all ${activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-xl shadow-gray-200/50'
                : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                }`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? tab.color : ''} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            {activeTab === 'profile' && (
              <div className="p-10">
                <form onSubmit={handleProfileSubmit} className="space-y-10">
                  {/* Photo Upload */}
                  <div className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-gray-50">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden ring-4 ring-gray-100 group-hover:ring-blue-100 transition-all">
                        <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 p-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-all hover:scale-110 active:scale-95"
                      >
                        {uploading ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="text-xl font-black text-gray-900 mb-1">Foto Profil</h4>
                      <p className="text-sm font-medium text-gray-400">JPG, PNG atau GIF (Maksimal 2MB)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                        <User size={16} className="text-gray-400" /> Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-blue-500 transition-all outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                        <Mail size={16} className="text-gray-400" /> Alamat Email
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-blue-500 transition-all outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                        <Phone size={16} className="text-gray-400" /> Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-blue-500 transition-all outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                        <MapPin size={16} className="text-gray-400" /> Lokasi
                      </label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-blue-500 transition-all outline-none font-medium"
                      />
                    </div>
                    <div className="col-span-full space-y-3">
                      <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                        <Globe size={16} className="text-gray-400" /> Website Personal
                      </label>
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-blue-500 transition-all outline-none font-medium"
                      />
                    </div>
                    <div className="col-span-full space-y-3">
                      <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                        <Loader2 size={16} className="text-gray-400" /> Bio Singkat
                      </label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-blue-500 transition-all outline-none font-medium resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-50">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-[1.25rem] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-0.5"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                      Simpan Profil
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="p-10">
                <form onSubmit={handleSocialSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus-within:border-emerald-500 transition-all group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 group-focus-within:text-emerald-500 shadow-sm">
                        <Github size={24} />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">GitHub Profile</label>
                        <input
                          type="url"
                          value={social.github}
                          onChange={(e) => setSocial({ ...social, github: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full bg-transparent border-none outline-none font-bold text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus-within:border-emerald-500 transition-all group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 group-focus-within:text-emerald-500 shadow-sm">
                        <Linkedin size={24} />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">LinkedIn Profile</label>
                        <input
                          type="url"
                          value={social.linkedin}
                          onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/..."
                          className="w-full bg-transparent border-none outline-none font-bold text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus-within:border-emerald-500 transition-all group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 group-focus-within:text-emerald-500 shadow-sm">
                        <Twitter size={24} />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Twitter Account</label>
                        <input
                          type="url"
                          value={social.twitter}
                          onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                          placeholder="https://twitter.com/..."
                          className="w-full bg-transparent border-none outline-none font-bold text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus-within:border-emerald-500 transition-all group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 group-focus-within:text-emerald-500 shadow-sm">
                        <Instagram size={24} />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Instagram Account</label>
                        <input
                          type="url"
                          value={social.instagram}
                          onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                          placeholder="https://instagram.com/..."
                          className="w-full bg-transparent border-none outline-none font-bold text-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-50">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-10 py-4 bg-emerald-600 text-white rounded-[1.25rem] font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 hover:-translate-y-0.5"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                      Update Sosial
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="p-10">
                <form onSubmit={handleSecuritySubmit} className="space-y-8">
                  <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-[2rem] border border-purple-100">
                    <div className="p-3 bg-white rounded-2xl text-purple-600 shadow-sm">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <h5 className="font-black text-purple-900">Perbarui Keamanan</h5>
                      <p className="text-sm font-medium text-purple-700 mt-1">Gunakan kombinasi yang kuat (huruf, angka, simbol) untuk melindungi akun Anda.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                        <Lock size={16} className="text-gray-400" /> Password Saat Ini
                      </label>
                      <input
                        type="password"
                        value={security.currentPassword}
                        onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-purple-500 transition-all outline-none font-medium"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                          <Shield size={16} className="text-gray-400" /> Password Baru
                        </label>
                        <input
                          type="password"
                          value={security.newPassword}
                          onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-purple-500 transition-all outline-none font-medium"
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                          <Shield size={16} className="text-gray-400" /> Konfirmasi
                        </label>
                        <input
                          type="password"
                          value={security.confirmPassword}
                          onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-purple-500 transition-all outline-none font-medium"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-50">
                    <button
                      type="button"
                      onClick={async () => {
                        if (confirm('Yakin ingin logout?')) {
                          await supabase.auth.signOut();
                          window.location.href = '/admin/login';
                        }
                      }}
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-600 rounded-[1.25rem] font-bold hover:bg-gray-200 transition-all"
                    >
                      <LogOut size={20} />
                      Logout Akun
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-purple-600 text-white rounded-[1.25rem] font-black hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/20 hover:-translate-y-0.5"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                      Update Keamanan
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

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

export default SettingsManagement;
