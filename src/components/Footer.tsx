import React from 'react';
import { PlusIcon, MapPinIcon, ThumbsUpIcon } from './icons/DecorativeIcons';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';

const Footer: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <footer className="bg-neutral-900 text-neutral-100 relative overflow-hidden flex items-center justify-center min-h-[600px] md:min-h-[800px] lg:min-h-[1080px]" ref={ref as React.RefObject<HTMLElement>}>
      <Floating3DIcon position="center" delay={220} iconType="main" />
      <div className="w-full">
      <div className={`w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 py-10 md:py-20 text-center relative z-10 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Floating elements with animations */}
        <div className="absolute top-[15%] left-[10%] opacity-20 animate-[float_3s_ease-in-out_infinite]">
            <PlusIcon className="w-10 h-10 md:w-20 md:h-20 text-neutral-600" />
        </div>
        <div className="absolute bottom-[20%] left-[18%] hidden lg:block opacity-30 animate-[float_3.5s_ease-in-out_infinite_1s]">
            <MapPinIcon className="w-12 h-12 md:w-20 md:h-20 text-neutral-600" />
            <div className="bg-neutral-800 text-neutral-200 text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full inline-block mt-2">Indonesia</div>
        </div>
        <div className="absolute bottom-[10%] right-[10%] hidden lg:block opacity-20 animate-[float_4s_ease-in-out_infinite_1.5s]">
            <ThumbsUpIcon className="w-32 h-32 md:w-48 md:h-48 text-neutral-700" />
        </div>
        <div className="absolute top-[30%] right-[25%] hidden md:block bg-neutral-800 text-white text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full shadow-lg animate-[float_3.2s_ease-in-out_infinite_0.5s]">Follow saya</div>
        <div className="absolute bottom-[35%] right-[20%] hidden md:block bg-blue-500 text-white text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full shadow-lg animate-[float_3.3s_ease-in-out_infinite_0.8s]">Ke beranda</div>

        <div className="flex justify-center items-center gap-2 text-[10px] md:text-xs mb-3 md:mb-4 text-neutral-300">
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-green-500"></span>
            </span>
            <span>Tersedia untuk bekerja</span>
        </div>
        
        <h2 className="text-xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto px-4">
          Mari ciptakan sesuatu yang hebat bersama.
        </h2>
        
        <p className="max-w-xl mx-auto text-neutral-400 text-xs md:text-base mt-4 md:mt-6 px-4">
            Saya tidak hanya di sini untuk membangun website; saya di sini untuk terhubung dengan orang-orang dan menciptakan solusi yang bermakna.
        </p>

        <div className="mt-6 md:mt-12">
          <a href="#" className="inline-block bg-white text-gray-900 font-semibold px-5 py-2.5 md:px-8 md:py-4 rounded-full text-xs md:text-lg shadow-[0_4px_12px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.4)] hover:bg-gray-100 transition-all duration-300 ease-out hover:scale-110 active:scale-95">
            Mari Bicara!
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 border-t border-neutral-800">
        <div className="flex justify-between items-center text-[10px] md:text-xs text-neutral-500 py-4 md:py-6">
            <p>Dibuat oleh Nopian Hadi</p>
            <p className="hidden sm:block">Dibangun dengan React & Tailwind</p>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;