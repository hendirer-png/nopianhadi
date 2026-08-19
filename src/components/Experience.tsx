
import React from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';

const experiences = [
  { 
    years: "2022 - Sekarang", 
    title: "Senior Web Developer", 
    company: "Tech Corp",
    description: "Memimpin tim dalam pembuatan website dan web app yang fungsional, performant, dan responsif.",
    responsibilities: [
      "Memimpin pengembangan aplikasi web full-stack",
      "Optimasi performa dan SEO website",
      "Mentoring tim developer",
      "Membangun arsitektur aplikasi yang scalable"
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"]
  },
  { 
    years: "2021 - 2022", 
    title: "Video Editor & Content Creator", 
    company: "Creative Agency",
    description: "Memproduksi dan mengedit berbagai konten video dan materi promosi untuk social media klien.",
    responsibilities: [
      "Mengedit video YouTube, Reels, dan TikTok",
      "Membuat motion graphics dan animasi",
      "Melakukan color grading dan audio mixing",
      "Menyusun strategi konten media sosial"
    ],
    technologies: ["Premiere Pro", "After Effects", "CapCut", "Audition", "Canva"]
  },
  { 
    years: "2020 - 2021", 
    title: "Graphic & UI/UX Designer", 
    company: "Design Studio",
    description: "Merancang identitas visual, branding, dan antarmuka aplikasi untuk meningkatkan user experience.",
    responsibilities: [
      "Membuat desain UI/UX untuk web dan mobile",
      "Merancang logo dan brand guidelines",
      "Membuat aset desain media sosial",
      "Melakukan user research dan testing"
    ],
    technologies: ["Figma", "Photoshop", "Illustrator", "InDesign"]
  },
  { 
    years: "2018 - 2020", 
    title: "Junior Web Developer", 
    company: "Startup Inc",
    description: "Berkontribusi dalam pembuatan landing page, pemeliharaan website, dan perbaikan bug.",
    responsibilities: [
      "Mengembangkan landing page responsif",
      "Memperbaiki bug di frontend",
      "Berkolaborasi dengan tim desainer",
      "Melakukan testing dan QA"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React", "Git"]
  },
];

const Experience: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [selectedExp, setSelectedExp] = React.useState<number | null>(null);

  const handleExpClick = (index: number) => {
    setSelectedExp(index);
  };

  const closeModal = () => {
    setSelectedExp(null);
  };

  return (
    <section className="flex items-center justify-center py-10 md:py-20 relative overflow-hidden min-h-[600px] md:min-h-[1080px]" ref={ref as React.RefObject<HTMLElement>}>
      <Floating3DIcon position="left" delay={150} iconType="main" />
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-8 md:mb-16 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Pengalaman Terkini</h2>
        </div>
        <div className="space-y-3 md:space-y-4">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                onClick={() => handleExpClick(index)}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 py-3 md:py-4 bg-white rounded-lg md:rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-900 shadow-md hover:shadow-2xl hover:-translate-y-1 px-4 md:px-6 transition-all duration-500 ease-out cursor-pointer"
              >
                <span className="text-gray-500 text-[10px] md:text-sm group-hover:text-gray-300 transition-colors font-medium">{exp.years}</span>
                <span className="font-bold text-sm md:text-lg group-hover:text-white transition-colors">{exp.title}</span>
                <span className="text-gray-500 text-[10px] md:text-sm group-hover:text-gray-300 transition-colors font-medium">{exp.company}</span>
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 absolute right-4 top-3 md:relative md:right-0 md:top-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              {index < experiences.length - 1 && <div className="h-4"></div>}
            </div>
          ))}
        </div>
        <div className={`text-center mt-6 md:mt-12 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <a href="#" className="inline-block bg-gray-900 text-white text-xs md:text-sm font-semibold px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-gray-800 hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                Unduh CV
            </a>
        </div>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedExp !== null && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 rounded-t-3xl flex justify-between items-start">
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">{experiences[selectedExp].title}</h3>
                <p className="text-gray-600 text-sm md:text-base font-medium">{experiences[selectedExp].company}</p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">{experiences[selectedExp].years}</p>
              </div>
              <button 
                onClick={closeModal}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-xs md:text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">Deskripsi</h4>
                <p className="text-gray-700 text-xs md:text-base leading-relaxed">{experiences[selectedExp].description}</p>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-xs md:text-sm font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wider">Tanggung Jawab</h4>
                <div className="space-y-2">
                  {experiences[selectedExp].responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-2 md:gap-3">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-900 mt-1.5 md:mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-xs md:text-base leading-relaxed">{resp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs md:text-sm font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wider">Teknologi</h4>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {experiences[selectedExp].technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-800 rounded-lg text-[10px] md:text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50 rounded-b-3xl">
              <button 
                onClick={closeModal}
                className="w-full bg-gray-900 text-white font-semibold px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-base rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
