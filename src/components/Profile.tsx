import React from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const Profile: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      id="profile" 
      className="relative flex items-center justify-center overflow-hidden bg-white py-10 md:py-20" 
      style={{ minHeight: '400px' }} 
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
          
          {/* Photo Section */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div className="relative">
              <div className="w-48 md:w-72 lg:w-80 aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-gray-100 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/images/nopian-hadi.jpg" 
                  alt="Nopian Hadi" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] md:text-xs font-semibold px-3 md:px-4 py-1 md:py-1.5 rounded-full mb-3 md:mb-4">
              Web Dev, Desain Konten Medsos & Desain, Video Editor
            </div>
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4 md:mb-6">
              Nopian Hadi
            </h2>
            
            <p className="text-xs md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
              Seorang profesional kreatif yang passionate dalam Web Development, Desain Konten Medsos & Desain, serta Video Editing. 
              Saya fokus pada pembuatan solusi digital komprehensif yang tidak hanya terlihat bagus secara visual, 
              tetapi juga berfungsi dengan sempurna dan memiliki user experience terbaik.
            </p>

            <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              <div className="flex items-center gap-2 md:gap-3 justify-center lg:justify-start">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-[11px] md:text-base">Spesialisasi: React, Node.js, TypeScript</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 justify-center lg:justify-start">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 text-[11px] md:text-base">Fokus: Performance & User Experience</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 justify-center lg:justify-start">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 text-[11px] md:text-base">Lokasi: Indonesia</span>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4 justify-center lg:justify-start mb-6 md:mb-8">
              <a 
                href="#contact" 
                className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold px-4 py-2 md:px-6 md:py-3 text-xs md:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Hubungi Saya
              </a>
              <a 
                href="#work" 
                className="inline-block bg-gray-100 text-gray-800 font-semibold px-4 py-2 md:px-6 md:py-3 text-xs md:text-base rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105"
              >
                Lihat Portfolio
              </a>
            </div>

            {/* Social Media */}
            <div className="flex gap-2 md:gap-4 justify-center lg:justify-start">
              <a 
                href="https://github.com/nopianhadi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/nopian-hadi-74041816a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/nopianhadii/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@hadinoviann" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61583447691938&locale=id_ID" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="mailto:nopianhadi2@gmail.com" 
                className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="Email"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Profile;
