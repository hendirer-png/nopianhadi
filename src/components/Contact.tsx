import React, { useState } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Input validation and sanitization
      const sanitizedData = {
        name: formData.name.trim().slice(0, 100),
        email: formData.email.trim().toLowerCase().slice(0, 100),
        subject: formData.subject.trim(),
        message: formData.message.trim().slice(0, 2000)
      };

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedData.email)) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
        setIsSubmitting(false);
        return;
      }

      // Validate name (no special characters except spaces, hyphens, apostrophes)
      const nameRegex = /^[a-zA-Z\s\-']+$/;
      if (!nameRegex.test(sanitizedData.name)) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
        setIsSubmitting(false);
        return;
      }

      // Check for spam patterns (simple check)
      const spamPatterns = ['http://', 'https://', 'www.', '<script', 'onclick', 'onerror'];
      const hasSpam = spamPatterns.some(pattern => 
        sanitizedData.message.toLowerCase().includes(pattern)
      );
      
      if (hasSpam) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
        setIsSubmitting(false);
        return;
      }

      // Rate limiting check (simple client-side)
      const lastSubmit = localStorage.getItem('lastContactSubmit');
      if (lastSubmit) {
        const timeSinceLastSubmit = Date.now() - parseInt(lastSubmit);
        if (timeSinceLastSubmit < 60000) { // 1 minute cooldown
          setSubmitStatus('error');
          setTimeout(() => setSubmitStatus('idle'), 3000);
          setIsSubmitting(false);
          return;
        }
      }

      // Insert data ke Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: sanitizedData.name,
            email: sanitizedData.email,
            subject: sanitizedData.subject,
            message: sanitizedData.message,
            status: 'Unread'
          }
        ]);

      if (error) throw error;

      // Store timestamp for rate limiting
      localStorage.setItem('lastContactSubmit', Date.now().toString());

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="flex items-center justify-center py-10 md:py-20 relative overflow-hidden min-h-[800px] md:min-h-[1080px]" 
      ref={ref as React.RefObject<HTMLElement>}
    >
      <Floating3DIcon position="center" delay={160} iconType="main" />
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        
        <div className={`text-center mb-8 md:mb-16 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Mari Terhubung</h2>
          <p className="text-gray-500 text-xs md:text-base mt-3 md:mt-4 max-w-2xl mx-auto px-4">
            Punya project atau ide? Saya siap membantu mewujudkannya. Hubungi saya sekarang!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-8">
              
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Informasi Kontak</h3>
                <p className="text-gray-600 text-xs md:text-base leading-relaxed mb-6 md:mb-8">
                  Saya selalu terbuka untuk mendiskusikan project baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda.
                </p>
              </div>

              {/* Contact methods */}
              <div className="space-y-4 md:space-y-6">
                <a href="mailto:nopianhadi2@gmail.com" className="flex items-start gap-3 md:gap-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-xs md:text-base text-gray-900 group-hover:text-red-500 transition-colors">Email</p>
                    <p className="text-gray-600 text-[10px] md:text-sm">nopianhadi2@gmail.com</p>
                  </div>
                </a>

                <a href="https://wa.me/6289540618407" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 md:gap-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-xs md:text-base text-gray-900 group-hover:text-green-500 transition-colors">WhatsApp</p>
                    <p className="text-gray-600 text-[10px] md:text-sm">0895-4061-8407</p>
                  </div>
                </a>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-xs md:text-base text-gray-900">Lokasi</p>
                    <p className="text-gray-600 text-[10px] md:text-sm">Indonesia</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="font-semibold text-xs md:text-base text-gray-900 mb-3 md:mb-4">Ikuti Saya</p>
                <div className="flex gap-2 md:gap-3">
                  <a
                    href="https://github.com/nopianhadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/nopian-hadi-74041816a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-xl bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/nopianhadii/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-xl bg-gray-100 text-gray-700 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.tiktok.com/@hadinoviann"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-xl bg-gray-100 text-gray-700 hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                  >
                    <span className="sr-only">TikTok</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61583447691938&locale=id_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-xl bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '100ms' }}>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100">
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 text-xs md:text-base rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 text-xs md:text-base rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    Subjek
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 text-xs md:text-base rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                  >
                    <option value="">Pilih subjek...</option>
                    <option value="web-development">Web Development</option>
                    <option value="desain-grafis">Desain Grafis & Medsos</option>
                    <option value="video-editing">Video Editing & Animasi</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 md:px-4 md:py-3 text-xs md:text-base rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                    placeholder="Ceritakan tentang project Anda..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold px-5 py-2.5 md:px-8 md:py-4 text-xs md:text-base rounded-full shadow-[0_4px_12px_rgba(255,107,53,0.3)] hover:shadow-[0_8px_30px_rgba(255,107,53,0.5)] transition-all duration-300 ease-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-200 text-green-800 px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-sm font-medium">
                    ✓ Pesan berhasil dikirim! Saya akan segera menghubungi Anda.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-800 px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-sm font-medium">
                    ✗ Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung via email/WhatsApp.
                  </div>
                )}
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
