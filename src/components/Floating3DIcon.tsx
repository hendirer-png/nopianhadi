import React, { useEffect, useState, useRef } from 'react';

interface Floating3DIconProps {
  position?: 'left' | 'right' | 'center';
  delay?: number;
  iconType?: 'main' | 'alt';
}

const Floating3DIcon: React.FC<Floating3DIconProps> = ({ position = 'right', delay = 0, iconType = 'main' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (iconRef.current) {
        const rect = iconRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = 0.5 + scrollProgress * 0.5;
  const rotate = scrollProgress * 180;
  const opacity = scrollProgress;

  const positionClass = {
    left: 'left-[5%]',
    right: 'right-[5%]',
    center: 'left-1/2 -translate-x-1/2',
  }[position];

  return (
    <div
      ref={iconRef}
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 pointer-events-none z-0`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="relative transition-all duration-700 ease-out"
        style={{
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          opacity: opacity,
        }}
      >
        <img
          src={iconType === 'main' ? '/images/3d-bg.png' : '/images/3d-icon-1.png'}
          alt="3D Icon"
          className="w-[300px] h-auto drop-shadow-2xl"
        />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 blur-2xl opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Floating3DIcon;
