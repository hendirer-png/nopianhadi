import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { creativeWorksApi } from '../lib/api/creativeWorks';
import { CreativeWork } from '../lib/supabase';
import { PlayCircle, ExternalLink } from 'lucide-react';

const CreativeWorkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [work, setWork] = useState<CreativeWork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWork = async () => {
      if (!id) {
        setError('ID karya tidak ditemukan');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await creativeWorksApi.getById(id);

        if (!data) {
          setError('Karya tidak ditemukan');
        } else {
          setWork(data);
        }
      } catch (error) {
        console.error('❌ Failed to fetch creative work:', error);
        setError('Gagal memuat karya. Silakan refresh halaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail karya...</p>
        </div>
      </div>
    );
  }

  if (error || !work) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {error || 'Karya Tidak Ditemukan'}
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
    <div className="bg-[#F6F6F6] min-h-screen pb-24">
      <Helmet>
        <title>{work.title} | Karya Kreatif Nopian Hadi</title>
        <meta name="description" content={`Detail karya: ${work.title}`} />
        <meta property="og:title" content={work.title} />
        <meta property="og:image" content={work.image} />
      </Helmet>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-12 py-3 md:py-4 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate('/#creative-works');
              }
            }}
            className="group flex items-center gap-1.5 md:gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300"
          >
            <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-[11px] md:text-sm font-medium">Kembali</span>
          </button>
          <div className="text-[9px] md:text-xs text-gray-400 uppercase tracking-wider">Detail Karya</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-12 pt-8 md:pt-12">
        {/* Title and Category */}
        <div className="mb-8 text-center">
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${work.category === 'Design' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
            {work.category === 'Design' ? 'Desain Grafis' : 'Video Editing'}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
            {work.title}
          </h1>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          {/* Main Image */}
          <div className="relative">
            <img src={work.image} alt={work.title} className="w-full object-cover" />
            
            {/* Video Action Button Overlay */}
            {work.video_url && (
              <a
                href={work.video_url}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform shadow-2xl">
                  <PlayCircle className="w-10 h-10 text-white fill-white/40" />
                </div>
              </a>
            )}
          </div>

          {/* Additional info or video link */}
          {work.video_url && (
            <div className="p-6 md:p-8 flex justify-center border-t border-gray-100">
              <a
                href={work.video_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3.5 rounded-full text-base font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/25 hover:scale-105 transform duration-200"
              >
                <ExternalLink className="w-5 h-5" />
                Buka Video di Tab Baru
              </a>
            </div>
          )}
        </div>

        {/* Gallery Images */}
        {work.images && work.images.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center">Galeri Gambar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {work.images.map((img, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <img 
                    src={img} 
                    alt={`${work.title} - Gallery ${idx + 1}`} 
                    className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500" 
                    loading="lazy" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreativeWorkDetail;
