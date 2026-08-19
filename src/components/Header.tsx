
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-3 md:py-6 px-3 sm:px-8 md:px-12 lg:px-24 transition-all duration-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-200 shadow-md animate-[float_3s_ease-in-out_infinite]">
            <img 
              src="/images/3xOEBCA4HlTD4SssKE2vnFVUFs.png" 
              alt="Nopian Hadi" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-base md:text-2xl font-bold tracking-tight">
            Nopian Hadi
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Karya
          </a>
          <a href="#skills" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Keahlian
          </a>
          <a href="#services" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Layanan
          </a>

          <a href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Testimoni
          </a>
          <a href="#contact" className="inline-block bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-200 ease-out hover:scale-105">
            Mari Terhubung
          </a>
          {location.pathname === '/' && (
            <button 
              onClick={() => navigate('/admin/login')}
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all duration-200 ease-out hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {location.pathname === '/' && (
            <button 
              onClick={() => navigate('/admin/login')}
              className="inline-flex items-center gap-1 bg-blue-600 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-full hover:bg-blue-700 transition-all duration-200 ease-out hover:scale-105"
            >
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </button>
          )}
          <button className="inline-block bg-gray-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full hover:bg-gray-800 transition-all duration-200 ease-out hover:scale-105">
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
