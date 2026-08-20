import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { creativeWorksApi } from '../lib/api/creativeWorks';
import { CreativeWork } from '../lib/supabase';
import { getVideoThumbnail } from '../utils/videoUtils';

const CreativeWorks: React.FC = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [works, setWorks] = useState<CreativeWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Design' | 'Video'>('All');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    creativeWorksApi.getPublished()
      .then(setWorks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = works.filter(w => activeFilter === 'All' || w.category === activeFilter);
  const displayedWorks = showAll ? filtered : filtered.slice(0, 8); // Tampilkan 8 item awal

  // Helper: prioritas work.image → auto YouTube thumbnail
  const getThumbSrc = (work: CreativeWork): string => {
    if (work.image) return work.image;
    if (work.video_url) {
      const yt = getVideoThumbnail(work.video_url);
      if (yt) return yt;
    }
    return '';
  };

  // if (!loading && works.length === 0) return null;

  return (
    <section
      id="creative-works"
      className="bg-[#F6F6F6] py-16 md:py-32 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl md:text-4xl xl:text-5xl font-black tracking-tight">
            Karya Desain &amp; Video
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 md:mt-3 max-w-xl mx-auto">
            Koleksi karya desain grafis dan video editing pilihan
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex justify-center gap-2 mb-8 md:mb-12 transition-all duration-700 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {(['All', 'Design', 'Video'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeFilter === filter
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {filter === 'All' ? 'Semua' : filter === 'Design' ? 'Desain Grafis' : 'Video Editing'}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p>Belum ada karya untuk kategori ini.</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {displayedWorks.map((work, index) => (
              <div
                key={work.id}
                className={`break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${index * 60}ms` }}
                onClick={() => navigate(`/creative-work/${work.id}`)}
              >
                {/* Gambar: upload admin atau thumbnail otomatis YouTube */}
                {(() => {
                  const src = getThumbSrc(work);
                  return src ? (
                    <img
                      src={src}
                      alt={work.title}
                      className="w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <PlayCircle className="w-10 h-10 text-gray-400" />
                    </div>
                  );
                })()}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  {work.video_url && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 scale-75 group-hover:scale-100 transition-transform duration-300">
                        <PlayCircle className="w-7 h-7 text-white fill-white/30" />
                      </div>
                    </div>
                  )}
                  <div>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${work.category === 'Design' ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'}`}>
                      {work.category === 'Design' ? 'Desain' : 'Video'}
                    </span>
                    <p className="text-white font-bold text-sm leading-tight">{work.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tombol Lihat Lebih Banyak - hanya tampil jika ada lebih dari 8 karya */}
        {!loading && filtered.length > 8 && (
          <div className={`flex justify-center mt-10 md:mt-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

export default CreativeWorks;
