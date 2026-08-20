
import React from 'react';
import { Star } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const cards = [
    /* Card 1 */
    <div key="card1" className="card-float-1 w-32 h-32 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-[0.85rem] sm:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-6 flex flex-col relative overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
      <div className="text-left">
        <p className="text-gray-300 text-[8px] sm:text-sm font-medium">Monthly Revenue</p>
        <h3 className="text-white text-lg sm:text-3xl font-bold mt-0.5 sm:mt-1">$4,900</h3>
      </div>
      <div className="mt-auto space-y-1.5 sm:space-y-3">
        <div className="h-1 sm:h-2 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-blue-400 w-3/4 rounded-full animate-pulse"></div>
        </div>
        <div className="h-1 sm:h-2 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-purple-400 w-1/2 rounded-full animate-pulse" style={{ animationDelay: '500ms' }}></div>
        </div>
      </div>
    </div>,

    /* Card 2 */
    <div key="card2" className="card-float-2 w-32 h-32 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-[0.85rem] sm:rounded-3xl bg-white/80 backdrop-blur-md p-3 sm:p-6 flex flex-col relative shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
      <div className="text-left text-gray-800 relative z-10">
        <h3 className="text-[11px] sm:text-xl font-bold leading-tight">Intelligence in<br />Every Decision</h3>
      </div>
      <div className="mt-auto flex items-end gap-1 sm:gap-2 h-12 sm:h-24 relative z-10">
        <div className="w-1/4 bg-blue-200 h-1/3 rounded-t-sm hover:h-1/2 transition-all duration-300"></div>
        <div className="w-1/4 bg-blue-300 h-2/3 rounded-t-sm hover:h-3/4 transition-all duration-300"></div>
        <div className="w-1/4 bg-blue-400 h-1/2 rounded-t-sm hover:h-2/3 transition-all duration-300"></div>
        <div className="w-1/4 bg-blue-500 h-full rounded-t-sm hover:opacity-80 transition-all duration-300"></div>
      </div>
    </div>,

    /* Card 3 (Center - Focus) */
    <div key="card3" className="card-float-3 w-32 h-32 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-[0.85rem] sm:rounded-3xl bg-white backdrop-blur-md flex items-center justify-center relative shadow-2xl overflow-hidden border-[2px] sm:border-4 border-white/20 p-2 sm:p-4 hover:scale-105 transition-transform duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50 animate-pulse"></div>
      <div className="relative z-10 space-y-1.5 sm:space-y-4 w-full">
        <div className="bg-white rounded-full py-1 px-2 sm:py-2 sm:px-4 shadow-sm flex items-center gap-1.5 sm:gap-3 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-[6px] sm:text-[10px] text-white">Cal</span>
          </div>
          <span className="text-[8px] sm:text-xs font-medium text-gray-600">Calendar</span>
        </div>
        <div className="bg-white rounded-full py-1 px-2 sm:py-2 sm:px-4 shadow-sm flex items-center gap-1.5 sm:gap-3 w-4/5 ml-auto hover:-translate-y-1 transition-transform duration-300">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-[6px] sm:text-[10px] text-white">Msg</span>
          </div>
          <span className="text-[8px] sm:text-xs font-medium text-gray-600">Messages</span>
        </div>
      </div>
    </div>,

    /* Card 4 */
    <div key="card4" className="card-float-4 w-32 h-32 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-[0.85rem] sm:rounded-3xl bg-white backdrop-blur-md p-3 sm:p-6 flex flex-col relative shadow-2xl hover:scale-105 transition-transform duration-300">
      <div className="flex justify-between items-start text-gray-800">
        <h3 className="text-[10px] sm:text-sm font-semibold">Performance</h3>
        <svg className="animate-bounce w-3 h-3 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
      </div>
      <div className="mt-1 sm:mt-4 text-left">
        <span className="text-xl sm:text-4xl font-bold text-gray-900">49%</span>
        <p className="text-[8px] sm:text-xs text-gray-500">Running tasks</p>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-0.5 sm:gap-2">
        <div className="bg-gray-100 py-0.5 px-1 sm:py-1.5 sm:px-2 rounded text-[7px] sm:text-[10px] text-gray-600 font-medium text-center hover:bg-gray-200 transition-colors">Strategic</div>
        <div className="bg-gray-100 py-0.5 px-1 sm:py-1.5 sm:px-2 rounded text-[7px] sm:text-[10px] text-gray-600 font-medium text-center hover:bg-gray-200 transition-colors">Processed</div>
        <div className="bg-gray-100 py-0.5 px-1 sm:py-1.5 sm:px-2 rounded text-[7px] sm:text-[10px] text-gray-600 font-medium text-center hover:bg-gray-200 transition-colors">Grow Faster</div>
        <div className="bg-gray-100 py-0.5 px-1 sm:py-1.5 sm:px-2 rounded text-[7px] sm:text-[10px] text-gray-600 font-medium text-center hover:bg-gray-200 transition-colors">Build Smart</div>
      </div>
    </div>,

    /* Card 5 */
    <div key="card5" className="card-float-5 w-32 h-32 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-[0.85rem] sm:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-6 flex flex-col relative shadow-2xl hover:scale-105 transition-transform duration-300">
      <div className="flex gap-1 sm:gap-2 flex-wrap">
        <span className="bg-white/20 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-xs text-white hover:bg-white/40 transition-colors cursor-pointer">Home</span>
        <span className="bg-white/20 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-xs text-white hover:bg-white/40 transition-colors cursor-pointer">Strategic</span>
        <span className="bg-white/20 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-xs text-white hover:bg-white/40 transition-colors cursor-pointer">Ai/It</span>
        <span className="bg-white/20 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-xs text-white hover:bg-white/40 transition-colors cursor-pointer">Smarter</span>
        <span className="bg-white/20 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-xs text-white hover:bg-white/40 transition-colors cursor-pointer">Grow Faster</span>
      </div>
      <div className="mt-auto text-left">
        <p className="text-gray-300 text-[8px] sm:text-sm font-medium">Data Points</p>
        <h3 className="text-white text-xl sm:text-4xl font-bold mt-0 sm:mt-1">520k+</h3>
      </div>
    </div>
  ];

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden min-h-[100vh] md:min-h-[800px] lg:min-h-[1080px] bg-cover bg-center bg-no-repeat pt-32 md:pt-40 pb-16"
      style={{ backgroundImage: 'url("/images/hiro.avif")' }}
    >
      <div className={`w-full max-w-[1920px] mx-auto text-center relative z-10 transition-all duration-700 ease-out flex flex-col items-center mt-12 md:mt-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-tight max-w-5xl mx-auto text-white drop-shadow-md px-4">
          CV. Nopian Hadi <br />
          Website, Desain & Video <br />
          <span className="text-white/80 font-light text-xl md:text-4xl lg:text-5xl block mt-2 md:mt-4">Portofolio Profesional Saya</span>
        </h1>

        <p className="mt-4 md:mt-8 text-sm md:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto font-light tracking-wide drop-shadow px-4">
          Menghadirkan karya terbaik dalam pembuatan website modern, desain grafis <br className="hidden md:block" />yang memukau, dan pengeditan video profesional untuk kebutuhan Anda.
        </p>

        <div className="mt-6 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4 w-full max-w-md mx-auto sm:max-w-none">
          <a href="#" className="w-full sm:w-auto bg-[#D4FF3F] text-gray-900 font-medium px-8 py-3.5 rounded-full text-sm md:text-base hover:bg-[#c2f02e] transition-colors duration-300">
            Mulai Sekarang
          </a>
          <a href="#" className="w-full sm:w-auto bg-transparent border border-white text-white font-medium px-8 py-3.5 rounded-full text-sm md:text-base hover:bg-white/10 transition-colors duration-300">
            Lihat Portofolio
          </a>
        </div>

        <div className="mt-10 md:mt-16 flex flex-col items-center px-4">
          <div className="flex gap-1 mb-2 md:mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-[#FFD700] text-[#FFD700]" />
            ))}
          </div>
          <p className="text-[10px] md:text-xs font-semibold text-gray-300 tracking-[0.2em] uppercase text-center">
            Rekomendasi dari 4,900+ Mitra Bisnis
          </p>
        </div>

        {/* Marquee Glassmorphism Cards Section */}
        <div
          className="mt-12 md:mt-32 w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div className="flex gap-4 md:gap-6 min-w-max px-4 py-8 animate-marquee hover:[animation-play-state:paused]">
            {cards}
            {cards}
            {cards}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-33.33% - 1.5rem)); /* Adjust for gap */
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        .card-float-1 { animation: float 6s ease-in-out infinite; }
        .card-float-2 { animation: float 7s ease-in-out infinite 1s; }
        .card-float-3 { animation: float 6.5s ease-in-out infinite 0.5s; }
        .card-float-4 { animation: float 6s ease-in-out infinite 1.5s; }
        .card-float-5 { animation: float 7.5s ease-in-out infinite 0.2s; }
      `}</style>
    </section>
  );
};

export default Hero;

