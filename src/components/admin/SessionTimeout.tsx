import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

/**
 * Component to handle session timeout and auto-logout
 * Warns user before session expires
 */
const SessionTimeout: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let warningTimer: NodeJS.Timeout;
    let logoutTimer: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        const expiresAt = data.session.expires_at;
        if (expiresAt) {
          const now = Math.floor(Date.now() / 1000);
          const timeUntilExpiry = expiresAt - now;
          
          // Show warning 5 minutes before expiry
          const warningTime = Math.max(0, (timeUntilExpiry - 300) * 1000);
          
          warningTimer = setTimeout(() => {
            setShowWarning(true);
            setTimeLeft(300); // 5 minutes
            
            // Start countdown
            countdownInterval = setInterval(() => {
              setTimeLeft(prev => {
                if (prev <= 1) {
                  clearInterval(countdownInterval);
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          }, warningTime);
          
          // Auto logout at expiry
          logoutTimer = setTimeout(async () => {
            await supabase.auth.signOut();
            navigate('/admin/login');
          }, timeUntilExpiry * 1000);
        }
      }
    };

    checkSession();

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  const handleExtendSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (!error && data.session) {
        setShowWarning(false);
        setTimeLeft(0);
      }
    } catch (error) {
      console.error('Failed to extend session:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (!showWarning) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-orange-100 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Sesi Akan Berakhir</h3>
          <p className="text-gray-600">
            Sesi Anda akan berakhir dalam{' '}
            <span className="font-bold text-orange-500">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleExtendSession}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Perpanjang Sesi
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Logout Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeout;
