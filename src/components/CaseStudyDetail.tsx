import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { projectsApi } from '../lib/api/projects';
import { Project, supabase } from '../lib/supabase';
import { PLACEHOLDER_IMAGES, handleImageError } from '../utils/imageFallback';

// Helper function to ensure array data is properly parsed
const ensureArray = (data: any): string[] => {
  if (!data) return [];

  if (Array.isArray(data)) {
    return data.filter(item => item && typeof item === 'string' && item.trim() !== '');
  }

  if (typeof data === 'string') {
    // Handle PostgreSQL array format: {item1,item2,item3}
    if (data.startsWith('{') && data.endsWith('}')) {
      return data
        .slice(1, -1)
        .split(',')
        .map(item => item.trim().replace(/^"|"$/g, ''))
        .filter(item => item !== '');
    }
    // Handle comma-separated string
    return data.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  return [];
};

// Helper function to convert YouTube URL to embed format and validate
const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url || url.trim() === '') return null;

  // Check if it's just the base YouTube URL without video ID
  if (url === 'https://www.youtube.com/' || url === 'https://youtube.com/' || url === 'http://www.youtube.com/') {
    return null;
  }

  // Already an embed URL with video ID
  if (url.includes('youtube.com/embed/')) {
    const videoId = url.split('youtube.com/embed/')[1]?.split('?')[0];
    return videoId ? url : null;
  }

  // Extract video ID from various YouTube URL formats
  let videoId = '';

  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('youtube.com/watch?v=')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    videoId = urlParams.get('v') || '';
  }
  // Format: https://youtu.be/VIDEO_ID
  else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
  }
  // Format: https://www.youtube.com/v/VIDEO_ID
  else if (url.includes('youtube.com/v/')) {
    videoId = url.split('youtube.com/v/')[1]?.split('?')[0] || '';
  }
  // Vimeo support
  else if (url.includes('vimeo.com/')) {
    const vimeoId = url.split('vimeo.com/')[1]?.split('?')[0];
    if (vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
  }

  // Return embed URL if video ID found and valid (using youtube-nocookie for privacy)
  if (videoId && videoId.length > 5) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  }

  // Return null if no valid video ID found
  return null;
};

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAdmin(!!data.session);
    };
    checkUser();
  }, []);

  // Fetch project data from Supabase
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError('ID project tidak ditemukan');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await projectsApi.getById(id);

        if (!data) {
          setError('Project tidak ditemukan');
        } else {
          // Ensure arrays are properly parsed
          const processedData = {
            ...data,
            results: ensureArray(data.results),
            technologies: ensureArray(data.technologies),
            images: ensureArray(data.images)
          };

          setProject(processedData);
        }
      } catch (error) {
        console.error('❌ Failed to fetch project:', error);
        setError('Gagal memuat project. Silakan refresh halaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat project...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {error || 'Project Tidak Ditemukan'}
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{project.title} | Studi Kasus Nopian Hadi</title>
        <meta name="description" content={project.overview || project.title} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.overview} />
        <meta property="og:image" content={project.hero_image} />
      </Helmet>

      {project.status === 'Draft' && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-orange-500 text-white px-6 py-2 rounded-full font-black text-xs tracking-widest shadow-2xl border-4 border-white animate-bounce">
          PRATINJAU DRAF
        </div>
      )}
      {/* Header - Minimalis dengan backdrop blur */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-12 py-3 md:py-4 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate('/#work');
              }
            }}
            className="group flex items-center gap-1.5 md:gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300"
          >
            <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-[11px] md:text-sm font-medium">Kembali</span>
          </button>
          <div className="text-[9px] md:text-xs text-gray-400 uppercase tracking-wider">Studi Kasus</div>
        </div>
      </header>

      {/* Hero Section - Padat dan rapi */}
      <section className="pt-6 pb-4 md:pt-10 md:pb-8 px-4 md:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Category Badge */}
          <div className="flex justify-center mb-3 md:mb-4 animate-[fadeIn_0.6s_ease-out]">
            <span className="inline-block text-[10px] md:text-xs font-medium px-2.5 md:px-3 py-0.5 md:py-1 bg-gray-100 text-gray-700 rounded-full">
              {project.category}
            </span>
          </div>

          {/* Title - Hero Title Size */}
          <h1 className="text-xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 text-center mb-4 md:mb-6 leading-tight animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
            {project.title}
          </h1>

          {/* Meta Info - Compact */}
          <div className="flex items-center justify-center gap-2 md:gap-4 text-[10px] md:text-sm text-gray-500 mb-4 md:mb-6 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <span className="font-semibold text-gray-900">{project.client}</span>
            <span>•</span>
            <span className="font-medium">{project.year}</span>
            <span>•</span>
            <span className="font-medium">{project.duration}</span>
          </div>

          {/* Action Buttons - Compact */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
            {project.live_demo && (
              <div className="relative">
                {/* Glow effect ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-75 blur-lg animate-[pulse_2s_ease-in-out_infinite]"></div>

                {/* Main button */}
                <a
                  href={project.live_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group inline-flex items-center gap-1.5 md:gap-2 bg-gray-900 text-white text-[11px] md:text-sm font-medium px-4 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-gray-800 transition-all duration-300 hover:gap-3 hover:scale-105 animate-[subtleBounce_3s_ease-in-out_infinite]"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                  <span className="relative">Lihat Demo</span>
                  <svg className="relative w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>

                  {/* Ping indicator */}
                  <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 flex h-2 w-2 md:h-3 md:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-green-500"></span>
                  </span>
                </a>
              </div>
            )}
            {project.source_code && (
              <a
                href={project.source_code}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 md:gap-2 bg-gray-100 text-gray-900 text-[11px] md:text-sm font-medium px-4 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-gray-200 transition-all duration-300 hover:gap-3 hover:scale-105"
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Kode Sumber</span>
              </a>
            )}
          </div>

          {/* Hero Image - Compact */}
          <div className="relative overflow-hidden rounded-lg md:rounded-xl shadow-xl animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <div className="aspect-video bg-gray-100">
              <img
                src={project.hero_image || PLACEHOLDER_IMAGES.project}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => handleImageError(e, 'project')}
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes subtleBounce {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-4px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      {/* Project Info - Compact */}
      <section className="py-4 md:py-8 px-4 md:px-6 lg:px-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="text-center">
              <div className="text-[9px] md:text-xs text-gray-400 uppercase tracking-wider mb-1 md:mb-1.5">Peran</div>
              <div className="text-[11px] md:text-sm lg:text-base font-semibold text-gray-900">{project.role}</div>
            </div>
            <div className="text-center">
              <div className="text-[9px] md:text-xs text-gray-400 uppercase tracking-wider mb-1 md:mb-1.5">Durasi</div>
              <div className="text-[11px] md:text-sm lg:text-base font-semibold text-gray-900">{project.duration}</div>
            </div>
            <div className="text-center">
              <div className="text-[9px] md:text-xs text-gray-400 uppercase tracking-wider mb-1 md:mb-1.5">Tahun</div>
              <div className="text-[11px] md:text-sm lg:text-base font-semibold text-gray-900">{project.year}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content - Padat dan rapi */}
      <section className="py-6 md:py-12 px-4 md:px-6 lg:px-12" ref={ref as React.RefObject<HTMLElement>}>
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-12">

          {/* Overview */}
          {project.overview && (
            <div className="opacity-100 translate-y-0">
              <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Ringkasan Project</h2>
              <p className="text-xs md:text-lg text-gray-700 leading-relaxed">{project.overview}</p>
            </div>
          )}

          {/* Challenge & Solution - Side by side di desktop */}
          {(project.challenge || project.solution) && (
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              {/* Challenge */}
              {project.challenge && (
                <div className="opacity-100 translate-y-0">
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Tantangan</h3>
                  <p className="text-[11px] md:text-base text-gray-600 leading-relaxed">{project.challenge}</p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className="opacity-100 translate-y-0">
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Solusi</h3>
                  <p className="text-[11px] md:text-base text-gray-600 leading-relaxed">{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Technologies - Compact */}
          {(() => {
            const techs = ensureArray(project.technologies);
            if (techs.length === 0) return null;

            return (
              <div className="opacity-100 translate-y-0">
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Teknologi yang Digunakan</h3>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {techs.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-800 rounded-full text-[10px] md:text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Results */}
          {(() => {
            const results = ensureArray(project.results);
            if (results.length === 0) return null;

            return (
              <div className="opacity-100 translate-y-0">
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Hasil yang Dicapai</h3>
                <ul className="space-y-2 md:space-y-3">
                  {results.map((result, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3 text-[11px] md:text-base text-gray-700">
                      <svg className="w-4 h-4 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}

          {/* Images Gallery */}
          {(() => {
            const images = ensureArray(project.images);
            return images.length > 0 && (
              <div className="opacity-100 translate-y-0">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Galeri Project</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg shadow-md aspect-video bg-gray-100">
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => handleImageError(e, 'project')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Video */}
          {(() => {
            if (!project.video) return null;
            const embedUrl = getYouTubeEmbedUrl(project.video);
            if (!embedUrl) return null;

            return (
              <div className="opacity-100 translate-y-0">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Video Demo</h3>
                <div className="relative overflow-hidden rounded-lg shadow-xl aspect-video bg-gray-100">
                  <iframe
                    src={embedUrl}
                    title={`${project.title} Video`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            );
          })()}

          {/* Testimonial */}
          {project.testimonial_quote && (
            <div className="opacity-100 translate-y-0">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Testimoni Klien</h3>
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                <svg className="w-10 h-10 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg text-gray-700 leading-relaxed mb-4 italic">"{project.testimonial_quote}"</p>
                <div>
                  <p className="font-bold text-gray-900">{project.testimonial_author}</p>
                  <p className="text-sm text-gray-600 font-medium">{project.testimonial_position}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="group inline-flex items-center gap-2 bg-white text-gray-900 text-base font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:gap-3 hover:scale-105 shadow-xl"
            >
              <span>Start a Project</span>
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const workSection = document.getElementById('work');
                  if (workSection) {
                    workSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="group inline-flex items-center gap-2 bg-transparent text-white text-base font-semibold px-8 py-4 rounded-full border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover:gap-3 hover:scale-105"
            >
              <span>View More Work</span>
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Back to home link */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <button
              onClick={() => navigate('/')}
              className="group inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;
