import React, { useState } from 'react';

const VideoIntroduction: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
  };

  // Play Icon SVG
  const PlayIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
      <path d="M8 5v14l11-7z"/>
    </svg>
  );

  // Close Icon SVG
  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <section id="video-intro" className="py-8 md:py-16 px-4 md:px-8 lg:px-16 xl:px-24 bg-neutral-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-neutral-800 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-neutral-800 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white mb-2 md:mb-3">
            Kenali Saya Lebih Dekat
          </h2>
          <p className="text-gray-400 text-xs md:text-base max-w-2xl mx-auto px-4">
            Tonton video perkenalan singkat untuk mengetahui lebih lanjut tentang pengalaman, 
            pendekatan kerja, dan bagaimana saya dapat membantu mewujudkan proyek Anda
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-lg md:rounded-xl overflow-hidden shadow-2xl bg-white p-0.5 md:p-1">
            <div className="bg-gray-900 rounded-md md:rounded-lg overflow-hidden">
              {!isPlaying ? (
                // Video Thumbnail with Play Button
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group cursor-pointer"
                     onClick={handlePlayVideo}>
                  {/* Thumbnail Image - Replace with your actual thumbnail */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-40"
                       style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200')" }}>
                  </div>
                  
                  {/* Play Button */}
                  <div className="relative z-10 transform transition-all duration-300 group-hover:scale-110">
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <PlayIcon />
                    </div>
                  </div>

                  {/* Overlay Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white text-base md:text-xl lg:text-2xl font-bold mb-0.5 md:mb-1">Video Perkenalan</h3>
                    <p className="text-gray-300 text-xs md:text-sm">Durasi: 2 menit</p>
                  </div>
                </div>
              ) : (
                // Video Player
                <div className="relative aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
                    title="Video Perkenalan"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                  
                  {/* Close Button */}
                  <button
                    onClick={handleCloseVideo}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors z-20"
                  >
                    <CloseIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoIntroduction;
