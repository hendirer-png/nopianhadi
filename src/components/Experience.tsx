
import React from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';

const experiences = [
  { 
    years: "2021 - Sekarang", 
    title: "IT Supporting, Desain & Video Konten", 
    company: "Mal Pelayanan Publik Kabupaten Pandeglang",
    description: "Memberikan dukungan teknis IT serta memproduksi berbagai konten visual dan video untuk kebutuhan publikasi instansi.",
    responsibilities: [
      "Memberikan dukungan teknis dan troubleshooting perangkat komputer, jaringan, serta kebutuhan IT.",
      "Membantu memastikan perangkat dan sistem pendukung pelayanan dapat berfungsi dengan baik.",
      "Membuat desain grafis untuk kebutuhan informasi, publikasi, dan media pelayanan.",
      "Membuat dan mengedit video konten untuk kebutuhan publikasi dan media sosial.",
      "Mendukung kebutuhan dokumentasi foto dan video berbagai kegiatan.",
      "Membantu pengelolaan dan penyediaan materi visual untuk kebutuhan komunikasi dan publikasi."
    ],
    technologies: ["IT Support", "Networking", "Graphic Design", "Video Editing", "Content Creation"]
  },
  { 
    years: "2020 - Sekarang", 
    title: "Freelance Web Developer", 
    company: "Freelance",
    description: "Membuat, mengembangkan, dan memelihara website sesuai dengan kebutuhan dan identitas visual klien.",
    responsibilities: [
      "Membuat dan mengembangkan website sesuai kebutuhan klien.",
      "Melakukan pengelolaan dan pemeliharaan website.",
      "Menyesuaikan tampilan website dengan kebutuhan dan identitas visual klien.",
      "Melakukan troubleshooting serta perbaikan pada website.",
      "Berkomunikasi langsung dengan klien untuk memahami kebutuhan dan menyelesaikan proyek."
    ],
    technologies: ["Web Development", "Frontend", "Backend", "Maintenance", "Troubleshooting"]
  },
  { 
    years: "September 2020 - Sekarang", 
    title: "Video Editor", 
    company: "CV. Riad Pelita",
    description: "Bertanggung jawab atas proses editing offline dan mengolah footage menjadi video yang menarik.",
    responsibilities: [
      "Bertanggung jawab atas proses offline editing secara menyeluruh.",
      "Mengolah footage menjadi video yang menarik dan sesuai kebutuhan produksi.",
      "Melakukan penyuntingan video berdasarkan konsep dan kebutuhan proyek."
    ],
    technologies: ["Adobe Premiere Pro", "Video Editing", "Color Grading"]
  },
  { 
    years: "Desember 2018 - Juli 2020", 
    title: "Video Editor & Videographer", 
    company: "CV. Project Wedding",
    description: "Melakukan pengambilan gambar video dan mengedit video untuk dokumentasi pernikahan.",
    responsibilities: [
      "Melakukan pengambilan footage video di lokasi shooting.",
      "Bertanggung jawab atas proses offline editing secara menyeluruh.",
      "Berkoordinasi dengan tim untuk memastikan kebutuhan visual selama proses produksi terpenuhi."
    ],
    technologies: ["Videography", "Offline Editing", "Team Coordination"]
  },
  { 
    years: "Februari 2017 - Oktober 2018", 
    title: "Graphic Designer", 
    company: "Digital Printing Rajawali",
    description: "Membuat dan menyesuaikan desain grafis untuk keperluan digital printing.",
    responsibilities: [
      "Membuat desain sesuai kebutuhan dan permintaan klien.",
      "Berkolaborasi dengan desainer lain dalam menyelesaikan proyek.",
      "Menyesuaikan desain dengan kebutuhan media dan proses produksi."
    ],
    technologies: ["CorelDRAW", "Photoshop", "Digital Printing", "Graphic Design"]
  }
];

const education = [
  {
    years: "2013 - 2016",
    school: "SMK Negeri 7 Pandeglang",
    major: "Jurusan Multimedia",
    description: "Mempelajari desain grafis, photography, videography, dan video editing."
  },
  {
    years: "2010 - 2013",
    school: "SMP Negeri 1 Koroncong",
    major: "",
    description: ""
  },
  {
    years: "2004 - 2010",
    school: "SD Negeri Pakuluran",
    major: "",
    description: ""
  }
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
                <span className="text-gray-500 text-[10px] md:text-sm group-hover:text-gray-300 transition-colors font-medium w-full md:w-1/4">{exp.years}</span>
                <span className="font-bold text-sm md:text-lg group-hover:text-white transition-colors w-full md:w-1/2">{exp.title}</span>
                <span className="text-gray-500 text-[10px] md:text-sm group-hover:text-gray-300 transition-colors font-medium w-full md:w-1/4 md:text-right pr-6">{exp.company}</span>
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              {index < experiences.length - 1 && <div className="h-4"></div>}
            </div>
          ))}
        </div>

        <div className={`text-center mb-8 mt-16 md:mb-12 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Riwayat Pendidikan</h2>
        </div>
        <div className="space-y-3 md:space-y-4">
          {education.map((edu, index) => (
            <div 
              key={`edu-${index}`}
              className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 py-3 md:py-4 bg-white rounded-lg md:rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-900 shadow-md hover:shadow-2xl px-4 md:px-6 transition-all duration-500 ease-out">
                <span className="text-gray-500 text-[10px] md:text-sm group-hover:text-gray-300 transition-colors font-medium w-full md:w-1/4">{edu.years}</span>
                <div className="flex flex-col w-full md:w-1/2">
                  <span className="font-bold text-sm md:text-lg group-hover:text-white transition-colors">{edu.school}</span>
                  {edu.major && <span className="text-xs md:text-sm text-gray-500 group-hover:text-gray-300 transition-colors">{edu.major}</span>}
                </div>
                <span className="text-gray-500 text-[10px] md:text-sm group-hover:text-gray-300 transition-colors font-medium w-full md:w-1/4 md:text-right hidden md:block">
                   {edu.description && <span className="truncate max-w-[200px] inline-block">{edu.description}</span>}
                </span>
              </div>
              {index < education.length - 1 && <div className="h-4"></div>}
            </div>
          ))}
        </div>
        <div className={`flex justify-center gap-4 mt-6 md:mt-12 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <a href="https://drive.google.com/file/d/1AXrv7SHNjQRFVaDQ0liGggkQxSpLBmr_/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-900 text-white text-xs md:text-sm font-semibold px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-gray-800 hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                Unduh CV
            </a>
            <a href="https://wa.me/62895406181407" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white text-xs md:text-sm font-semibold px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-green-600 hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Hubungi via WA
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
