import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    FileText,
    Settings,
    Mail,
    Home,
    LogOut,
    ChevronLeft,
    ChevronRight,
    User
} from 'lucide-react';
import LogoutButton from './LogoutButton';

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/projects', icon: Briefcase, label: 'Web Dev' },
        { path: '/admin/creative-works', icon: FileText, label: 'Karya Kreatif' },
        { path: '/admin/testimonials', icon: MessageSquare, label: 'Testimoni' },
        { path: '/admin/messages', icon: Mail, label: 'Pesan' },
        { path: '/admin/settings', icon: Settings, label: 'Pengaturan' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-[#F6F6F6] flex">
            {/* Sidebar */}
            <aside
                className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'
                    }`}
            >
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                    {isSidebarOpen ? (
                        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                            <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                N
                            </div>
                            <span className="font-bold text-gray-900 text-lg">Admin Panel</span>
                        </div>
                    ) : (
                        <div className="w-8 h-8 mx-auto rounded-lg bg-red-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            N
                        </div>
                    )}
                </div>

                <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${isActive(item.path)
                                    ? 'bg-red-50 text-red-600 shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`} />
                            {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                    >
                        <Home className="w-5 h-5" />
                        {isSidebarOpen && <span className="font-medium">Portfolio Utama</span>}
                    </Link>
                    <div className="mt-2">
                        <LogoutButton showLabel={isSidebarOpen} />
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors z-50"
                >
                    {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 px-8 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                <User size={18} />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs text-gray-500 font-medium leading-none">Admin</p>
                                <p className="text-sm font-bold text-gray-900">Nopian Hadi</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
