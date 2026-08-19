import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';
import { projectsApi } from '../lib/api/projects';
import { Project } from '../lib/supabase';
import { PLACEHOLDER_IMAGES, handleImageError } from '../utils/imageFallback';

const categories = ['Semua', 'Web Application', 'Web Portal', 'Nonprofit Website', 'Portfolio Website', 'Company Profile', 'Company Website'];

const SelectedWork: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [forceVisible, setForceVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectsApi.getPublished();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setError('Gagal memuat project. Silakan refresh halaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'Semua' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Tampilkan hanya 6 project pertama jika showAll = false
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  // Force visible after data loaded
  useEffect(() => {
    if (!loading && projects.length > 0) {
      setTimeout(() => setForceVisible(true), 100);
    }
  }, [loading, projects.length]);

  if (loading) {
    return (
      <section id="work" className="bg-white flex items-center justify-center py-20 relative overflow-hidden" style={{ minHeight: '1080px' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat project...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="work" className="bg-white flex items-center justify-center py-20 relative overflow-hidden" style={{ minHeight: '1080px' }}>
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
          >
            Refresh Halaman
          </button>
        </div>
      </section>
    );
  }

  const shouldShow = isVisible || forceVisible;

  return (
    <section id="work" className="bg-white flex items-center justify-center py-10 md:py-20 relative overflow-hidden min-h-[800px] md:min-h-[1080px]" ref={ref as React.RefObject<HTMLElement>}>
      <Floating3DIcon position="left" iconType="alt" />
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className={`text-center mb-6 md:mb-12 transition-all duration-600 ease-out ${shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Portofolio Project Saya</h2>
          <p className="text-gray-500 text-xs md:text-base mt-1 md:mt-2">[2022 - 2025]</p>
        </div>

        {/* Filter Kategori */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-12 transition-all duration-600 ease-out ${shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-600 ease-out cursor-pointer ${shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
              onClick={() => navigate(`/case-study/${project.id}`)}
            >
              {/* Card container dengan kotak putih yang jelas dan rapi */}
              <div className="relative h-full w-full rounded-lg md:rounded-xl bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 transition-all duration-300 ease-out group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:-translate-y-1">
                {/* Image container dengan aspect ratio konsisten */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
                  <img 
                    src={project.hero_image || PLACEHOLDER_IMAGES.project} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(e) => handleImageError(e, 'project')}
                  />
                </div>

                {/* Info section dengan detail lengkap */}
                <div className="p-3 md:p-6">
                  {/* Category & Year Badge */}
                  <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                    <span className="text-[9px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">{project.category}</span>
                    <span className="text-[9px] md:text-xs text-gray-400">•</span>
                    <span className="text-[9px] md:text-xs font-medium text-gray-500">{project.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors">{project.title}</h3>
                  
                  {/* Overview */}
                  <p className="text-[11px] md:text-base text-gray-600 line-clamp-2 leading-relaxed mb-3 md:mb-4">{project.overview}</p>
                  
                  {/* Role & Duration */}
                  <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4 text-[10px] md:text-sm">
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700 font-medium">{project.role}</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 font-medium">{project.duration}</span>
                    </div>
                  </div>
                  
                  {/* Technologies tags */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                    {project.technologies && project.technologies.slice(0, 4).map((tech) => (
                      <span 
                        key={tech} 
                        className="text-[9px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 4 && (
                      <span className="text-[9px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 bg-gray-100 text-gray-500 rounded-full font-medium">
                        +{project.technologies.length - 4} lainnya
                      </span>
                    )}
                  </div>

                  {/* Client & View button */}
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-[10px] md:text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">{project.client}</span>
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1 md:gap-1.5 text-[10px] md:text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      Lihat Detail
                      <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Lebih Banyak - hanya tampil jika ada lebih dari 6 project */}
        {filteredProjects.length > 6 && (
          <div className={`flex justify-center mt-6 md:mt-12 transition-all duration-600 ease-out ${shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-5 py-2.5 md:px-8 md:py-4 text-xs md:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-800"
            >
              {showAll ? 'Lihat Lebih Sedikit' : 'Lihat Lebih Banyak'}
              <svg className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectedWork;