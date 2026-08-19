import React from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';

const aiFeatures = [
  {
    title: 'AI Web Solutions',
    description: 'Integrasi chatbot cerdas dan recommendation system untuk meningkatkan engagement website Anda.',
    benefits: ['Smart Chatbot 24/7', 'Product Recommendation', 'Automated Customer Service']
  },
  {
    title: 'AI Image & Design',
    description: 'Pemanfaatan AI generative (Midjourney, DALL-E) untuk menciptakan aset visual unik dan mempercepat proses desain.',
    benefits: ['Generative Assets', 'Rapid Prototyping', 'Style Transfer']
  },
  {
    title: 'AI Video Production',
    description: 'Penggunaan tools AI untuk auto-caption, color grading otomatis, dan peningkatan kualitas resolusi video.',
    benefits: ['Auto Subtitles', 'Audio Cleanup', 'Smart Editing']
  },
  {
    title: 'AI Copywriting',
    description: 'Memanfaatkan AI untuk menyusun teks marketing, artikel blog, dan deskripsi produk yang SEO-friendly.',
    benefits: ['SEO Optimization', 'Social Media Captions', 'Email Newsletters']
  },
  {
    title: 'AI Data Analytics',
    description: 'Menganalisis tren pasar, perilaku audiens, dan performa konten untuk merumuskan strategi berikutnya.',
    benefits: ['Trend Prediction', 'Audience Insights', 'Performance Reports']
  },
  {
    title: 'AI Workflow Automation',
    description: 'Mengotomatisasi penjadwalan konten dan manajemen tugas harian agar proses kerja lebih efisien.',
    benefits: ['Social Media Scheduling', 'Task Automation', 'Cross-platform Sync']
  }
];

const aiAdvantages = [
  {
    title: 'Efisiensi Operasional',
    description: 'Otomasi tugas repetitif menghemat waktu dan biaya operasional hingga 60%',
    stat: '60%',
    statLabel: 'Cost Reduction'
  },
  {
    title: 'Customer Experience',
    description: 'Response time lebih cepat dan personalisasi meningkatkan kepuasan pelanggan',
    stat: '85%',
    statLabel: 'Customer Satisfaction'
  },
  {
    title: 'Revenue Growth',
    description: 'Recommendation system dan personalisasi meningkatkan conversion rate',
    stat: '35%',
    statLabel: 'Conversion Increase'
  },
  {
    title: 'Data-Driven Decisions',
    description: 'Insight mendalam dari data untuk strategi bisnis yang lebih akurat',
    stat: '90%',
    statLabel: 'Better Insights'
  }
];

const AIIntegration: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [activeFeature, setActiveFeature] = React.useState<number | null>(null);
  const [activeAdvantage, setActiveAdvantage] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveAdvantage((prev) => (prev + 1) % aiAdvantages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="ai-integration" 
      className="bg-neutral-900 flex items-center justify-center py-16 relative overflow-hidden"
      style={{ minHeight: 'auto' }}
      ref={ref as React.RefObject<HTMLElement>}
    >
      <Floating3DIcon position="right" delay={200} iconType="alt" />

      <div className="w-full max-w-[1920px] mx-auto px-8 lg:px-16 xl:px-24 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-10 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Integrasi AI untuk Website & Aplikasi
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Tingkatkan performa bisnis dengan teknologi Artificial Intelligence yang powerful dan scalable
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto mb-8">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`rounded-xl border transition-all duration-500 overflow-hidden ${
                activeFeature === index 
                  ? 'bg-white border-white shadow-2xl p-6' 
                  : 'bg-gray-800 border-gray-700 p-4'
              }`}>
                
                {/* Header - Always visible */}
                <div className={`text-base font-bold transition-all duration-300 ${
                  activeFeature === index ? 'text-gray-900' : 'text-white'
                }`}>
                  {feature.title}
                </div>

                {/* Details - Show on hover */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  activeFeature === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-sm mb-3 leading-relaxed text-gray-700">
                    {feature.description}
                  </p>

                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div 
                        key={idx}
                        className="transition-all duration-300 text-xs text-gray-600"
                        style={{ transitionDelay: `${idx * 30}ms` }}
                      >
                        • {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {aiAdvantages.map((advantage, index) => (
            <div
              key={index}
              className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${(aiFeatures.length + index) * 100}ms` }}
              onMouseEnter={() => setActiveAdvantage(index)}
              onMouseLeave={() => setActiveAdvantage(-1)}
            >
              <div className={`rounded-xl border transition-all duration-500 overflow-hidden ${
                activeAdvantage === index 
                  ? 'bg-white border-white shadow-2xl p-6' 
                  : 'bg-gray-800 border-gray-700 p-4'
              }`}>
                
                {/* Header - Always visible */}
                <div className={`text-base font-bold transition-all duration-300 ${
                  activeAdvantage === index ? 'text-gray-900' : 'text-white'
                }`}>
                  {advantage.title}
                </div>

                {/* Details - Show on hover */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  activeAdvantage === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-sm mb-4 leading-relaxed text-gray-700">
                    {advantage.description}
                  </p>
                  
                  {/* Stat */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">
                      {advantage.stat}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{advantage.statLabel}</div>
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

export default AIIntegration;
