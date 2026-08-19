import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/admin/dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setTimeout(() => {
        setLockoutTime(lockoutTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockoutTime === 0) {
      setIsLocked(false);
      setLoginAttempts(0);
    }
  }, [lockoutTime, isLocked]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      setError(`Terlalu banyak percobaan. Coba lagi dalam ${lockoutTime} detik.`);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        setError('Email dan password harus diisi');
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= 5) {
          setIsLocked(true);
          setLockoutTime(300);
          setError('Terlalu banyak percobaan gagal. Akun dikunci 5 menit.');
        } else {
          setError('Email atau password tidak valid. Sisa percobaan: ' + (5 - newAttempts));
        }
        setIsLoading(false);
        return;
      }

      setLoginAttempts(0);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan pada sistem.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
      </div>

      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in duration-700">
        {/* Logo/Icon */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 flex items-center justify-center mb-6 shadow-2xl">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Portofolio <span className="text-blue-500">Admin</span></h1>
          <p className="text-gray-400 font-medium mt-2">Personal Management System v2025</p>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-5 py-4 rounded-2xl text-sm font-bold flex items-center gap-3">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="group space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border-2 border-transparent group-focus-within:border-white/10 group-focus-within:bg-white/10 px-14 py-4 rounded-2xl text-white font-bold outline-none transition-all placeholder:text-gray-600"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Access Key</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border-2 border-transparent group-focus-within:border-white/10 group-focus-within:bg-white/10 px-14 py-4 rounded-2xl text-white font-bold outline-none transition-all placeholder:text-gray-600"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.5rem] font-black transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <span>Otorisasi Akses</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-white/10">
            <a
              href="/"
              className="text-gray-400 hover:text-white text-xs font-black uppercase tracking-widest inline-flex items-center gap-2 transition-all hover:-translate-x-1"
            >
              <ArrowLeft size={14} />
              Kembali ke Portfolio
            </a>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center mt-10 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
          &copy; 2025 Nopian Hadi &bull; Secured System
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
