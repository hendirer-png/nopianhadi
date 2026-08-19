
import React from 'react';
import { PlusIcon, MapPinIcon, ThumbsUpIcon } from './icons/DecorativeIcons';
import { AmaraLogo, TrevaLogo, FoxHubLogo } from './icons/CompanyLogos';
import Floating3DIcon from './Floating3DIcon';

const AnimatedStatistic: React.FC<{ end: number; label: string; plus?: boolean }> = ({ end, label, plus = false }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          const duration = 2000;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentVal = Math.floor(progress * end);
            setCount(currentVal);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-800">
        {count}{plus && '+'}
      </p>
      <p className="text-[10px] md:text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
};


const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-[600px] md:min-h-[800px] lg:min-h-[1080px]">
      <Floating3DIcon position="right" iconType="main" />
      <div className={`w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 text-center relative z-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Floating elements with animations */}
        <div className="absolute top-[15%] left-[10%] opacity-80 animate-[float_3s_ease-in-out_infinite]">
            <PlusIcon className="w-10 h-10 md:w-20 md:h-20 text-gray-300" />
        </div>
        <div className="absolute top-[20%] right-[15%] hidden lg:block animate-[float_4s_ease-in-out_infinite_0.5s]">
            <img src="/images/nopian-hadi.jpg" alt="Nopian Hadi" className="rounded-full shadow-lg border-4 border-white w-16 h-16 md:w-24 md:h-24 object-cover"/>
            <div className="text-center mt-2">
                <p className="font-semibold text-xs md:text-sm">Nopian Hadi</p>
                <p className="text-[10px] md:text-xs text-gray-500">Web Dev, Desain & Video Editor</p>
            </div>
        </div>
        <div className="absolute bottom-[20%] left-[18%] hidden lg:block animate-[float_3.5s_ease-in-out_infinite_1s]">
            <MapPinIcon className="w-12 h-12 md:w-20 md:h-20 text-gray-300" />
            <div className="bg-gray-800 text-white text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full inline-block mt-2 shadow-lg">Indonesia</div>
        </div>
        <div className="absolute bottom-[10%] right-[10%] hidden lg:block animate-[float_4.5s_ease-in-out_infinite_1.5s]">
            <ThumbsUpIcon className="w-32 h-32 md:w-48 md:h-48 text-gray-200" />
        </div>
        <div className="absolute top-[40%] left-[20%] hidden md:block bg-blue-500 text-white text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full shadow-lg animate-[float_3s_ease-in-out_infinite_0.3s]">Lihat karya saya</div>
        <div className="absolute bottom-[30%] right-[30%] hidden md:block bg-blue-500 text-white text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full shadow-lg animate-[float_3.2s_ease-in-out_infinite_0.8s]">Gulir ke bawah!</div>


        <h1 className="text-xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
          Membangun solusi digital yang memukau melalui kode, desain visual, dan video.
        </h1>
        
        <div className="mt-6 md:mt-12">
          <a href="#" className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold px-5 py-2.5 md:px-8 md:py-4 rounded-full text-xs md:text-lg shadow-[0_4px_12px_rgba(255,107,53,0.3)] hover:shadow-[0_8px_30px_rgba(255,107,53,0.5)] transition-all duration-300 ease-out hover:scale-110 hover:brightness-110 active:scale-95">
            Mari Bicara!
          </a>
        </div>

        <div className="mt-10 md:mt-20 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
          <AnimatedStatistic end={10} label="Tahun Pengalaman" plus={true} />
          <AnimatedStatistic end={50} label="Proyek Selesai" plus={true} />
          <AnimatedStatistic end={15} label="Penghargaan" />
        </div>

        <div className="mt-12 md:mt-24 flex justify-center items-center space-x-4 md:space-x-8 lg:space-x-12 opacity-50">
          <AmaraLogo className="h-3 md:h-5 text-gray-600" />
          <TrevaLogo className="h-3 md:h-5 text-gray-600" />
          <FoxHubLogo className="h-3 md:h-5 text-gray-600" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
