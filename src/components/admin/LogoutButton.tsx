import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  showLabel?: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ showLabel = true }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!confirm('Apakah Anda yakin ingin keluar?')) {
      return;
    }

    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Gagal logout. Silakan coba lagi.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl w-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 disabled:opacity-50`}
      title={!showLabel ? 'Logout' : undefined}
    >
      <LogOut className={`w-5 h-5 ${isLoggingOut ? 'animate-pulse' : ''}`} />
      {showLabel && <span className="font-medium text-sm">{isLoggingOut ? 'Keluar...' : 'Logout'}</span>}
    </button>
  );
};

export default LogoutButton;
