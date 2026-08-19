import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('Session check error:', error);
          setAuthenticated(false);
          setChecking(false);
          return;
        }

        // Verify session is still valid
        if (data.session) {
          const expiresAt = data.session.expires_at;
          const now = Math.floor(Date.now() / 1000);
          
          if (expiresAt && expiresAt < now) {
            // Session expired
            await supabase.auth.signOut();
            setAuthenticated(false);
          } else {
            setAuthenticated(true);
          }
        } else {
          setAuthenticated(false);
        }
        
        setChecking(false);
      } catch (error) {
        console.error('Session check failed:', error);
        if (mounted) {
          setAuthenticated(false);
          setChecking(false);
        }
      }
    };
    
    checkSession();

    // Listen for auth changes
    const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      if (event === 'SIGNED_OUT') {
        setAuthenticated(false);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setAuthenticated(!!session);
      } else if (event === 'PASSWORD_RECOVERY') {
        // Handle password recovery if needed
        setAuthenticated(false);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
