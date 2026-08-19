import React, { useState } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';

const faqs = [
  {
    question: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan project?',
    answer: 'Waktu pengerjaan bervariasi tergantung kompleksitas project. Website sederhana biasanya 2-4 minggu, sementara aplikasi web kompleks bisa memakan waktu 2-3 bulan. Saya akan memberikan timeline yang jelas setelah diskusi requirement.'
  },
  {
    question: 'Berapa budget minimum untuk project web development?',
    answer: 'Budget minimum dimulai dari Rp 5 juta untuk landing page sederhana. Untuk aplikasi web yang lebih kompleks, budget bisa disesuaikan dengan fitur dan kebutuhan. Mari diskusikan project Anda untuk mendapatkan estimasi yang akurat.'
  },
  {
    question: 'Apakah menerima project remote atau harus bertemu langsung?',
    answer: 'Ya, saya menerima project remote dari seluruh Indonesia bahkan internasional. Komunikasi bisa dilakukan via video call, email, atau chat. Untuk klien lokal, meeting langsung juga bisa diatur jika diperlukan.'
  },
  {
    question: 'Teknologi apa saja yang Anda gunakan?',
    answer: 'Saya menggunakan tech stack modern seperti React, Next.js, TypeScript untuk frontend, dan Node.js, Express, MongoDB untuk backend. Saya juga familiar dengan tools seperti Tailwind CSS, Firebase, dan berbagai API integration.'
  },
  {
    question: 'Apakah menyediakan maintenance setelah project selesai?',
    answer: 'Ya, saya menyediakan maintenance dan support berkelanjutan. Biasanya termasuk bug fixes, minor updates, dan technical support. Paket maintenance bisa disesuaikan dengan kebutuhan Anda.'
  },
  {
    question: 'Bagaimana proses pembayaran?',
    answer: 'Pembayaran biasanya dibagi menjadi 3 tahap: 30% di awal sebagai down payment, 40% saat development selesai, dan 30% sisanya setelah launch. Sistem pembayaran bisa disesuaikan dengan kesepakatan.'
  },
  {
    question: 'Apakah website yang dibuat responsive dan mobile-friendly?',
    answer: 'Tentu! Semua website yang saya buat sudah responsive dan mobile-friendly by default. Saya memastikan tampilan optimal di semua device mulai dari smartphone, tablet, hingga desktop.'
  },
  {
    question: 'Apakah menyediakan training untuk menggunakan website?',
    answer: 'Ya, saya menyediakan training dan dokumentasi lengkap untuk client agar bisa mengelola website sendiri. Training bisa dilakukan via video call atau dokumentasi tertulis dengan screenshot.'
  }
];

const FAQ: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="flex items-center justify-center py-8 md:py-16 relative overflow-hidden" 
      style={{ minHeight: 'auto' }} 
      ref={ref as React.RefObject<HTMLElement>}
    >
      <Floating3DIcon position="right" delay={200} iconType="alt" />
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        
        <div className={`text-center mb-6 md:mb-10 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-gray-500 text-xs md:text-base mt-2 md:mt-3 max-w-2xl mx-auto px-4">
            Temukan jawaban untuk pertanyaan umum tentang layanan dan proses kerja saya
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="bg-white rounded-lg md:rounded-xl border border-gray-200 overflow-hidden hover:border-gray-900 hover:shadow-lg transition-all duration-300 h-full">
                  
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 py-3 md:px-6 md:py-5 flex items-start justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-bold text-gray-900 pr-3 md:pr-4 text-xs md:text-base leading-tight">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-900 flex items-center justify-center transition-transform duration-300 mt-0.5 ${openIndex === index ? 'rotate-180' : ''}`}>
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-4 pb-3 pt-1 md:px-6 md:pb-5 md:pt-2">
                      <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className={`text-center mt-6 md:mt-12 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-gray-200">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Masih Ada Pertanyaan?</h3>
              <p className="text-gray-600 text-xs md:text-base mb-4 md:mb-6">
                Jangan ragu untuk menghubungi saya. Saya siap menjawab semua pertanyaan Anda.
              </p>
              <a 
                href="#contact" 
                className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold px-5 py-2.5 md:px-8 md:py-4 text-xs md:text-base rounded-full shadow-[0_4px_12px_rgba(255,107,53,0.3)] hover:shadow-[0_8px_30px_rgba(255,107,53,0.5)] transition-all duration-300 ease-out hover:scale-110 hover:brightness-110 active:scale-95"
              >
                Hubungi Saya
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FAQ;
