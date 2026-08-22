import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { ORGANIZERS } from '../data/mockData';
import { playTactileClick } from '../utils/audio';
import { Reveal, StaggerGroup, StaggerItem, CornerBrackets } from '../lib/motion';

export const ThePeople: React.FC = () => {
  return (
    <section
      id="organizers"
      className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none"
    >
      {/* Section Header */}
      <Reveal direction="up" amount={0.3} className="flex items-baseline justify-between mb-10 sm:mb-12">
        <div>
          <div className="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
            // CORE OPERATORS
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
            THE PEOPLE
          </h2>
        </div>
        <div className="hidden sm:block text-xs mono text-slate-600 dark:text-[#565C57] uppercase font-semibold">
          [ENGINEERING & SPRINT DIRECTORS]
        </div>
      </Reveal>

      {/* Editorial Portraits Grid */}
      <StaggerGroup className="sibling-dim grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ORGANIZERS.map((person) => (
          <StaggerItem key={person.id} className="h-full">
            <div
              className="group relative bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] hover:border-emerald-600 dark:hover:border-accent/60 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full shadow-sm hover:shadow-xl hover:-translate-y-1.5 will-change-transform"
            >
              <CornerBrackets />

              {/* Image Container with Editorial Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-[#050605]">
                <img
                  src={person.image}
                  alt={person.name}
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:contrast-110 group-hover:brightness-110 group-hover:scale-105 transition-all duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0B0D0C] via-transparent to-transparent opacity-85" />
              </div>

              {/* Content Area */}
              <div className="p-5 relative z-10">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-bold text-2xl text-slate-950 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors uppercase">
                    {person.name}
                  </h3>
                  <span className="text-[10px] mono text-slate-500 dark:text-[#565C57] uppercase tracking-wider font-semibold group-hover:text-slate-700 dark:group-hover:text-[#A9ADA9] transition-colors">
                    {person.division}
                  </span>
                </div>

                {/* Minimal Role Label */}
                <div className="mt-1 text-xs mono text-emerald-700 dark:text-accent uppercase tracking-wider font-bold">
                  {person.role}
                </div>

                {/* Reveal One-line & Socials */}
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-[#1A1C1A] text-xs mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed">
                  <p className="line-clamp-2">{person.tagline}</p>

                  <div className="mt-4 flex items-center gap-3 text-slate-600/70 dark:text-[#565C57]/70 group-hover:text-emerald-700 dark:group-hover:text-accent transition-all duration-300">
                    {person.github && (
                      <a
                        href={person.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTactileClick()}
                        className="hover:scale-110 transition-transform"
                        aria-label="GitHub"
                      >
                        <Github size={15} />
                      </a>
                    )}
                    {person.twitter && (
                      <a
                        href={person.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTactileClick()}
                        className="hover:scale-110 transition-transform"
                        aria-label="Twitter / X"
                      >
                        <Twitter size={15} />
                      </a>
                    )}
                    {person.linkedin && (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTactileClick()}
                        className="hover:scale-110 transition-transform"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Subtle top indicator */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-600 dark:bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

    </section>
  );
};
