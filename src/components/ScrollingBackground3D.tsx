import React, { useEffect, useState } from 'react';

const ScrollingBackground3D: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background dengan parallax effect */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          transform: `translateY(${scrollY * 0.5}px) scale(1.2)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img 
          src="/images/3d-bg.png" 
          alt="3D Background" 
          className="w-full h-full object-cover object-center"
          style={{ filter: 'blur(0px)' }}
        />
      </div>
      
      {/* Gradient overlay untuk depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6F6F6]/30 via-[#F6F6F6]/50 to-[#F6F6F6]"></div>
    </div>
  );
};

export default ScrollingBackground3D;
