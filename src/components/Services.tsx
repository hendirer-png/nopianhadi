import React from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';
import { PlusIcon, ThumbsUpIcon } from './icons/DecorativeIcons';

const services = [
  {
    icon: '💻',
    title: 'Web Development',
    description: 'Membangun website dan aplikasi web yang modern, responsif, dan performant menggunakan teknologi terkini.',
    features: ['Single Page Applications', 'Landing Page', 'E-commerce Solutions', 'Custom Web Apps'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '📱',
    title: 'Desain Konten Medsos',
    description: 'Menciptakan desain konten media sosial yang menarik, interaktif, dan sesuai dengan identitas brand Anda.',
    features: ['Instagram Feeds/Reels', 'TikTok Content', 'Carousel Design', 'Story Templates'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: '🎬',
    title: 'Video Editing & Animasi',
    description: 'Mengedit video mentah menjadi konten visual yang memukau, dinamis, dan siap dipublikasikan.',
    features: ['Short-form Video', 'Vlog Editing', 'Motion Graphics', 'Color Grading'],
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: '🎨',
    title: 'Graphic Design & Branding',
    description: 'Merancang identitas visual yang kuat mulai dari logo hingga material promosi digital maupun cetak.',
    features: ['Logo Design', 'Brand Guidelines', 'Marketing Collaterals', 'UI/UX Prototyping'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: '🚀',
    title: 'Digital Strategy & SEO',
    description: 'Membantu brand Anda menjangkau audiens yang tepat melalui strategi digital dan optimasi mesin pencari.',
    features: ['SEO Optimization', 'Copywriting', 'Content Planning', 'Analytics Reporting'],
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: '🔍',
    title: 'Consulting & Maintenance',
    description: 'Memberikan konsultasi, perbaikan, dan perawatan untuk aset digital Anda (website maupun konten).',
    features: ['Website Maintenance', 'Content Review', 'Technical Consulting', 'Performance Audit'],
    color: 'from-yellow-500 to-orange-500'
  }
];

const Services: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <section 
      id="services" 
      className="flex items-center justify-center py-8 md:py-16 relative overflow-hidden bg-neutral-900" 
      style={{ minHeight: 'auto' }} 
      ref={ref as React.RefObject<HTMLElement>}
    >
      <Floating3DIcon position="left" delay={140} iconType="main" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-[10%] right-[15%] opacity-20 animate-[float_3s_ease-in-out_infinite] hidden lg:block">
        <PlusIcon className="w-16 h-16 text-neutral-600" />
      </div>
      <div className="absolute bottom-[15%] left-[10%] opacity-30 animate-[float_3.5s_ease-in-out_infinite_1s] hidden lg:block">
        <ThumbsUpIcon className="w-32 h-32 text-neutral-700" />
      </div>
      
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        
        <div className={`text-center mb-6 md:mb-10 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white">Layanan yang Saya Tawarkan</h2>
          <p className="text-gray-400 text-xs md:text-base mt-2 md:mt-3 max-w-2xl mx-auto px-4">
            Solusi lengkap untuk kebutuhan digital Anda, dari konsep hingga deployment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`rounded-lg md:rounded-xl border transition-all duration-500 relative overflow-hidden ${
                hoveredIndex === index 
                  ? 'bg-white border-white shadow-2xl p-4 md:p-6' 
                  : 'bg-gray-800 border-gray-700 p-3 md:p-4'
              }`}>
                
                <div className="relative z-10">
                  {/* Number & Title - Always visible */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`text-[10px] md:text-xs font-bold transition-all duration-300 ${
                      hoveredIndex === index ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      0{index + 1}
                    </div>
                    <h3 className={`text-xs md:text-base font-bold transition-colors duration-300 ${
                      hoveredIndex === index ? 'text-gray-900' : 'text-white'
                    }`}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Details - Show on hover */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    hoveredIndex === index ? 'max-h-96 opacity-100 mt-3 md:mt-4' : 'max-h-0 opacity-0'
                  }`}>
                    {/* Description */}
                    <p className="text-[11px] md:text-sm mb-3 md:mb-4 leading-relaxed text-gray-700">
                      {service.description}
                    </p>

                    {/* Features list with stagger animation */}
                    <div className="space-y-1 md:space-y-1.5 text-[10px] md:text-xs">
                      {service.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="translate-x-2 text-gray-600 transition-all duration-300"
                          style={{ transitionDelay: `${featureIndex * 50}ms` }}
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
};

export default Services;
