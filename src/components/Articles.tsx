import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';
import { articlesApi } from '../lib/api/articles';
import { Article } from '../lib/supabase';
import { PLACEHOLDER_IMAGES, handleImageError } from '../utils/imageFallback';

const Articles: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await articlesApi.getPublished();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        setError('Gagal memuat artikel. Silakan refresh halaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section id="articles" className="bg-white flex items-center justify-center relative overflow-hidden" style={{ minHeight: '1080px' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat artikel...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="articles" className="bg-white flex items-center justify-center relative overflow-hidden" style={{ minHeight: '1080px' }}>
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

  // Show message if no articles
  if (articles.length === 0) {
    return (
      <section id="articles" className="bg-white flex items-center justify-center relative overflow-hidden" style={{ minHeight: '1080px' }}>
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">📰</div>
          <p className="text-gray-600">Belum ada artikel yang dipublikasikan.</p>
        </div>
      </section>
    );
  }

  // Tampilkan hanya 6 artikel pertama jika showAll = false
  const displayedArticles = showAll ? articles : articles.slice(0, 6);

  return (
    <section id="articles" className="bg-white flex items-center justify-center relative overflow-hidden min-h-[800px] md:min-h-[1080px]" ref={ref as React.RefObject<HTMLElement>}>
      <Floating3DIcon position="right" delay={180} iconType="alt" />
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 py-10 md:py-20 relative z-10">
        <div className="text-center mb-8 md:mb-16 max-w-2xl mx-auto transition-all duration-600 ease-out opacity-100 translate-y-0">
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Artikel Terkini</h2>
          <p className="text-gray-500 text-xs md:text-base mt-2 md:mt-4 px-4">Berbagi insight tentang pengembangan web, strategi desain konten, dan teknik video editing.</p>
          <p className="text-[10px] md:text-sm text-gray-400 mt-1 md:mt-2">({articles.length} artikel dimuat)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {displayedArticles.map((article, index) => (
                <Link 
                  key={article.id}
                  to={`/article/${article.id}`}
                  className={`group cursor-pointer transition-all duration-600 ease-out opacity-100 translate-y-0`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                    {/* Kartu blog tradisional dengan shadow halus */}
                    <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] group-hover:-translate-y-2">
                        {/* Image di atas */}
                        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                            <img 
                              src={article.image || PLACEHOLDER_IMAGES.article} 
                              alt={article.title} 
                              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                              onError={(e) => handleImageError(e, 'article')}
                            />
                        </div>
                        
                        {/* Konten teks di bawah */}
                        <div className="p-4 md:p-6">
                            <p className="text-[9px] md:text-xs text-gray-400 mb-2 md:mb-3 uppercase tracking-wider">{article.date}</p>
                            <h3 className="font-bold text-sm md:text-xl mb-2 md:mb-3 text-gray-900 leading-tight transition-colors duration-300 group-hover:text-red-500">{article.title}</h3>
                            <p className="text-gray-600 text-[11px] md:text-sm mb-3 md:mb-4 leading-relaxed">{article.excerpt}</p>
                            
                            {/* Link "Read article" */}
                            <span className="inline-flex items-center gap-1.5 md:gap-2 text-[11px] md:text-sm font-semibold text-gray-900 group-hover:text-red-500 transition-colors duration-300">
                                Baca Artikel
                                <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        {/* Tombol Lihat Lebih Banyak - hanya tampil jika ada lebih dari 6 artikel */}
        {articles.length > 6 && (
          <div className="text-center mt-8 md:mt-16 transition-all duration-600 ease-out opacity-100 translate-y-0">
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

export default Articles;