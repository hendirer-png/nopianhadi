import React from 'react';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  backLink?: string;
  backText?: string;
  action?: React.ReactNode;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  title, 
  subtitle, 
  backLink = '/admin/dashboard',
  backText = 'Kembali ke Dashboard',
  action 
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            {action}
            <Link 
              to={backLink}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {backText}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
