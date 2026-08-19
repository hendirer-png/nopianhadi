import React from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';
import { PlusIcon, MapPinIcon } from './icons/DecorativeIcons';

const skillCategories = [
  {
    title: 'Web Development',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React / Next.js', level: 90, icon: '⚛️' },
      { name: 'TypeScript', level: 85, icon: '📘' },
      { name: 'Node.js', level: 80, icon: '🟢' },
      { name: 'Tailwind CSS', level: 95, icon: '🎨' },
      { name: 'REST API', level: 88, icon: '🔌' },
    ]
  },
  {
    title: 'Desain Grafis & UI/UX',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Figma', level: 95, icon: '🎯' },
      { name: 'Adobe Photoshop', level: 90, icon: '🖼️' },
      { name: 'Adobe Illustrator', level: 85, icon: '✒️' },
      { name: 'Desain Konten Medsos', level: 92, icon: '📱' },
      { name: 'Canva Pro', level: 95, icon: '✨' },
    ]
  },
  {
    title: 'Video Editing & Tools',
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'CapCut', level: 95, icon: '🎬' },
      { name: 'Adobe Premiere', level: 80, icon: '🎞️' },
      { name: 'After Effects', level: 75, icon: '✨' },
      { name: 'Git & GitHub', level: 88, icon: '📦' },
      { name: 'Copywriting', level: 85, icon: '✍️' },
    ]
  }
];

const Skills: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [hoveredCategory, setHoveredCategory] = React.useState<number | null>(null);
  const [animatedLevels, setAnimatedLevels] = React.useState<number[][]>([]);

  React.useEffect(() => {
    if (isVisible) {
      const intervals: NodeJS.Timeout[] = [];
      
      skillCategories.forEach((category, catIndex) => {
        category.skills.forEach((skill, skillIndex) => {
          const interval = setInterval(() => {
            setAnimatedLevels((prev) => {
              const newLevels = [...prev];
              if (!newLevels[catIndex]) newLevels[catIndex] = [];
              
              const currentLevel = newLevels[catIndex][skillIndex] || 0;
              if (currentLevel < skill.level) {
                newLevels[catIndex][skillIndex] = Math.min(currentLevel + 2, skill.level);
              }
              
              return newLevels;
            });
          }, 20);
          
          intervals.push(interval);
        });
      });

      return () => intervals.forEach(clearInterval);
    }
  }, [isVisible]);

  return (
    <section 
      id="skills" 
      className="bg-neutral-900 flex items-center justify-center py-16 relative overflow-hidden" 
      style={{ minHeight: 'auto' }} 
      ref={ref as React.RefObject<HTMLElement>}
    >
      <Floating3DIcon position="right" delay={120} iconType="alt" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-[15%] left-[12%] opacity-20 animate-[float_3s_ease-in-out_infinite] hidden lg:block">
        <PlusIcon className="w-16 h-16 text-neutral-600" />
      </div>
      <div className="absolute bottom-[10%] right-[15%] opacity-30 animate-[float_4s_ease-in-out_infinite_1.5s] hidden lg:block">
        <MapPinIcon className="w-20 h-20 text-neutral-600" />
      </div>
      <div className="absolute top-[40%] right-[8%] hidden md:block bg-neutral-800 text-white text-xs px-3 py-1 rounded-full shadow-lg animate-[float_3.2s_ease-in-out_infinite_0.5s]">Tech Stack</div>
      
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        
        <div className={`text-center mb-6 md:mb-10 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white">Keahlian & Teknologi</h2>
          <p className="text-gray-400 text-xs md:text-base mt-2 md:mt-3 max-w-2xl mx-auto px-4">
            Tech stack dan tools yang saya kuasai untuk membangun solusi web yang powerful
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 max-w-7xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`rounded-xl border transition-all duration-500 overflow-hidden ${
                hoveredCategory === categoryIndex 
                  ? 'bg-white border-white shadow-2xl p-6' 
                  : 'bg-gray-800 border-gray-700 p-4'
              }`}>
                
                {/* Header - Always visible */}
                <div className={`text-base font-bold transition-all duration-300 ${
                  hoveredCategory === categoryIndex ? 'text-gray-900' : 'text-white'
                }`}>
                  {category.title}
                </div>

                {/* Skills list - Show on hover */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  hoveredCategory === categoryIndex ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="transition-all duration-300"
                        style={{ transitionDelay: `${skillIndex * 30}ms` }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-900">
                            {skill.name}
                          </span>
                          <span className="text-xs text-gray-700 font-semibold">
                            {animatedLevels[categoryIndex]?.[skillIndex] || 0}%
                          </span>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="h-1 rounded-full overflow-hidden bg-gray-200">
                          <div 
                            className="h-full rounded-full bg-gray-900 transition-all duration-1000 ease-out"
                            style={{ 
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDelay: `${(categoryIndex * 100) + (skillIndex * 50)}ms`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
};

export default Skills;
