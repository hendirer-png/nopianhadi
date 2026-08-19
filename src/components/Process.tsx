import React from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';

const processSteps = [
  {
    number: '01',
    title: 'Riset & Penemuan',
    description: 'Memahami kebutuhan, target audience, dan goals project melalui diskusi mendalam serta riset tren.',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-500',
    details: ['Briefing Klien', 'Riset Kompetitor', 'Analisis Tren', 'Penentuan Strategi']
  },
  {
    number: '02',
    title: 'Konsep & Perencanaan',
    description: 'Merancang wireframe, storyboard, atau moodboard visual sebelum proses produksi dimulai.',
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
    details: ['Wireframing (Web)', 'Moodboard (Desain)', 'Storyboard (Video)', 'Persetujuan Konsep']
  },
  {
    number: '03',
    title: 'Eksekusi & Produksi',
    description: 'Proses kreatif membangun website, membuat desain grafis, atau mengedit video dengan kualitas tinggi.',
    icon: '💻',
    color: 'from-green-500 to-emerald-500',
    details: ['Coding & Development', 'Desain Visual', 'Video Editing & Animasi', 'Copywriting']
  },
  {
    number: '04',
    title: 'Revisi & Penyempurnaan',
    description: 'Melakukan review menyeluruh, testing, dan penyesuaian detail untuk memastikan hasil akhir yang sempurna.',
    icon: '✨',
    color: 'from-orange-500 to-red-500',
    details: ['Quality Control', 'Cross-browser Testing', 'Revisi Desain/Video', 'Final Polish']
  },
  {
    number: '05',
    title: 'Pengiriman & Peluncuran',
    description: 'Menyerahkan final aset, mendeploy website ke server, atau mempublikasikan konten ke platform.',
    icon: '🚀',
    color: 'from-indigo-500 to-blue-500',
    details: ['Website Deployment', 'Handover File Final', 'Optimasi Resolusi', 'Go Live']
  },
  {
    number: '06',
    title: 'Evaluasi & Support',
    description: 'Memberikan dukungan teknis lanjutan, analisis performa, dan maintenance pasca-peluncuran.',
    icon: '🛠️',
    color: 'from-yellow-500 to-orange-500',
    details: ['Maintenance Web', 'Analisis Engagement', 'Dukungan Teknis', 'Update Konten']
  }
];

const Process: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [activeStep, setActiveStep] = React.useState<number | null>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 20);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section 
      id="process" 
      className="bg-white flex items-center justify-center py-8 md:py-16 relative overflow-hidden" 
      style={{ minHeight: 'auto' }} 
      ref={ref as React.RefObject<HTMLElement>}
    >
      <Floating3DIcon position="left" delay={180} iconType="main" />
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        
        <div className={`text-center mb-6 md:mb-10 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Cara Kerja Saya</h2>
          <p className="text-gray-500 text-xs md:text-base mt-2 md:mt-3 max-w-2xl mx-auto px-4">
            Proses terstruktur dari konsep hingga launch untuk memastikan hasil yang maksimal
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`group transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className={`relative rounded-lg md:rounded-xl border transition-all duration-500 overflow-hidden ${
                  activeStep === index 
                    ? 'bg-gray-900 border-gray-900 shadow-2xl p-4 md:p-6' 
                    : 'bg-white border-gray-200 p-3 md:p-4'
                }`}>
                  
                  {/* Progress bar on top */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-500 ${
                    activeStep === index ? 'bg-gray-800' : 'bg-transparent'
                  }`}>
                    <div 
                      className={`h-full transition-all duration-500 ${
                        activeStep === index ? 'w-full bg-white' : 'w-0'
                      }`}
                    ></div>
                  </div>

                  {/* Number & Title - Always visible */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`text-[10px] md:text-xs font-bold transition-all duration-300 ${
                      activeStep === index ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.number}
                    </div>
                    <h3 className={`text-xs md:text-base font-bold transition-colors duration-300 ${
                      activeStep === index ? 'text-white' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Details - Show on hover */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    activeStep === index ? 'max-h-96 opacity-100 mt-3 md:mt-4' : 'max-h-0 opacity-0'
                  }`}>
                    {/* Description */}
                    <p className="text-[11px] md:text-sm mb-3 md:mb-4 leading-relaxed text-gray-300">
                      {step.description}
                    </p>

                    {/* Details list with stagger animation */}
                    <div className="space-y-1 md:space-y-1.5 text-[10px] md:text-xs">
                      {step.details.map((detail, detailIndex) => (
                        <div 
                          key={detailIndex}
                          className="translate-x-2 text-gray-400 transition-all duration-300"
                          style={{ transitionDelay: `${detailIndex * 50}ms` }}
                        >
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>



        </div>

      </div>
    </section>
  );
};

export default Process;
