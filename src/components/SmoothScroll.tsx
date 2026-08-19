import React, { useEffect } from 'react';

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Lenis Smooth Scroll alternative dengan vanilla JS
    let scrollY = window.scrollY;
    let targetScrollY = scrollY;
    let isScrolling = false;

    const smoothScroll = () => {
      scrollY += (targetScrollY - scrollY) * 0.1;
      
      if (Math.abs(targetScrollY - scrollY) > 0.5) {
        window.scrollTo(0, scrollY);
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      targetScrollY += e.deltaY;
      targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));
      
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    // Uncomment untuk enable custom smooth scroll (optional)
    // window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      // window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
