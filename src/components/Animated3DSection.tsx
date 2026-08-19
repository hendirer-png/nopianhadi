import React, { useEffect, useState, useRef } from 'react';

const Animated3DSection: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Hitung progress scroll (0 sampai 1)
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kalkulasi transformasi berdasarkan scroll progress
  const scale = 1 + scrollProgress * 0.5; // Mulai dari 1, membesar sampai 1.5
  const rotate = scrollProgress * 360; // Rotasi 360 derajat
  const translateX = scrollProgress * 200; // Bergerak ke kanan 200px
  const translateY = scrollProgress * -100; // Bergerak ke atas 100px
  const opacity = 1 - scrollProgress * 0.3; // Sedikit fade out

  return (
    <section 
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F6F6F6] to-white"
      style={{ minHeight: '1080px' }}
    >
      <div className="w-full max-w-[1920px] mx-auto px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Konten Teks */}
          <div 
            className="space-y-6 transition-all duration-700"
            style={{
              opacity: Math.max(0.3, 1 - scrollProgress * 0.5),
              transform: `translateX(${-scrollProgress * 50}px)`,
            }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Desain 3D yang
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Interaktif
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Menciptakan pengalaman visual yang memukau dengan elemen 3D yang responsif dan dinamis.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors">
                Lihat Karya
              </button>
              <button className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors">
                Pelajari Lebih
              </button>
            </div>
          </div>

          {/* Gambar 3D Animasi */}
          <div className="relative h-[600px] flex items-center justify-center">
            <div
              className="relative transition-all duration-300 ease-out"
              style={{
                transform: `
                  scale(${scale})
                  rotate(${rotate}deg)
                  translate(${translateX}px, ${translateY}px)
                `,
                opacity: opacity,
              }}
            >
              <img
                src="/images/3d-bg.png"
                alt="3D Object"
                className="w-full max-w-[500px] h-auto drop-shadow-2xl"
              />
              
              {/* Glow effect */}
              <div 
                className="absolute inset-0 blur-3xl opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
                  transform: 'scale(0.8)',
                }}
              ></div>
            </div>

            {/* Decorative elements */}
            <div 
              className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
              style={{
                transform: `translate(${scrollProgress * -100}px, ${scrollProgress * 50}px)`,
              }}
            ></div>
            <div 
              className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
              style={{
                transform: `translate(${scrollProgress * 100}px, ${scrollProgress * -50}px)`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>
    </section>
  );
};

export default Animated3DSection;
