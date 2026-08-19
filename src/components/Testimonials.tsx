import React, { useState, useEffect } from 'react';
import { QuoteIcon, AuthorIcon1, AuthorIcon2, AuthorIcon3 } from './icons/InfoIcons';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';
import { testimonialsApi } from '../lib/api/testimonials';
import { Testimonial } from '../lib/supabase';
import { PLACEHOLDER_IMAGES, handleImageError } from '../utils/imageFallback';

const authorIcons = [AuthorIcon1, AuthorIcon2, AuthorIcon3];
const bgColors = ["bg-rose-200", "bg-amber-200", "bg-cyan-200"];

const Testimonials: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await testimonialsApi.getPublished();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        setError('Gagal memuat testimonial. Silakan refresh halaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section id="testimonials" className="bg-white py-32 relative overflow-hidden" style={{ minHeight: '2000px' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat testimonial...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="bg-white py-32 relative overflow-hidden" style={{ minHeight: '2000px' }}>
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

  // Show message if no testimonials
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="bg-white py-32 relative overflow-hidden" style={{ minHeight: '2000px' }}>
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">📝</div>
          <p className="text-gray-600">Belum ada testimonial yang dipublikasikan.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="bg-white py-16 md:py-32 relative overflow-hidden min-h-[800px]" ref={ref as React.RefObject<HTMLElement>}>
      <Floating3DIcon position="center" delay={200} iconType="alt" />
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="text-center mb-12 md:mb-24 transition-all duration-600 ease-out opacity-100 translate-y-0">
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Apa Kata Rekan Kerja Saya</h2>
          <p className="text-[10px] md:text-sm text-gray-400 mt-1 md:mt-2">({testimonials.length} testimonial dimuat)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
          {testimonials.map((testimonial, index) => {
            return (
              <div 
                key={testimonial.id} 
                className="flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 opacity-100 translate-y-0 relative group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <QuoteIcon className="w-10 h-10 text-gray-100 absolute top-4 right-4 transition-colors duration-300 group-hover:text-red-50"/>
                
                <div className="flex-grow mb-6 pt-2 relative z-10">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "{testimonial.message}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-4">
                  <img 
                    src={testimonial.image || PLACEHOLDER_IMAGES.testimonial} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover bg-gray-100"
                    onError={(e) => handleImageError(e, 'testimonial')}
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-red-500 transition-colors">{testimonial.name}</h3>
                    <p className="text-gray-500 text-[11px]">{testimonial.position} - {testimonial.company}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8 md:mt-16 pt-6 md:pt-8 transition-all duration-600 ease-out opacity-100 translate-y-0">
            <a href="#" className="inline-block bg-gray-200 text-gray-800 text-xs md:text-base font-semibold px-5 py-2.5 md:px-8 md:py-4 rounded-full hover:bg-gray-300 hover:shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                Baca di LinkedIn
            </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;