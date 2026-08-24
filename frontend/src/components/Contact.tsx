import React from 'react';
import { Mail } from 'lucide-react';
import { playTactileClick } from '../utils/audio';
import { Reveal, CornerBrackets } from '../lib/motion';

export const CONTACT_EMAIL = 'support@kaizenhacks.tech';

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative py-16 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
    >
      {/* Medium-intensity section grid, fading downward */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[360px] grid-medium opacity-[0.45] dark:opacity-35 grid-fade-y pointer-events-none" />

      {/* Ghost channel numeral */}
      <div
        aria-hidden="true"
        className="ghost-numeral absolute -bottom-8 right-2 text-[180px] xl:text-[240px] opacity-[0.04] dark:opacity-[0.05] hidden md:block"
      >
        08
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Section Header */}
        <Reveal direction="up" amount={0.3} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 border-b border-slate-300 dark:border-[#1A1C1A] pb-4">
          <div>
            <div className="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
              // SIGNAL.US // DIRECT CHANNEL
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
              CONTACT
            </h2>
          </div>
          <div className="hidden sm:block text-xs mono text-slate-600 dark:text-[#565C57] uppercase font-semibold">
            [ONE ADDRESS. REAL HUMANS.]
          </div>
        </Reveal>

        {/* Primary Channel Dossier Card */}
        <Reveal direction="up" delay={0.06} amount={0.25}>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Kaizen Hacks — Hello')}`}
            onClick={() => playTactileClick(1000, 0.05)}
            title={`Email ${CONTACT_EMAIL}`}
            className="group relative block bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] hover:border-emerald-600/60 dark:hover:border-accent/50 px-6 sm:px-10 py-8 sm:py-12 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 will-change-transform"
          >
            <CornerBrackets />

            {/* Hover glow halo */}
            <div className="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 60px rgba(141, 255, 179, 0.04)' }} />
            {/* Top accent slide */}
            <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-600 dark:bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[11px] mono text-slate-500 dark:text-[#565C57] uppercase tracking-widest mb-3 font-bold">
                  <Mail size={14} className="text-emerald-600 dark:text-accent shrink-0" />
                  EMAIL // PRIMARY CHANNEL
                </div>
                <div className="font-display font-bold text-xl sm:text-3xl lg:text-5xl text-slate-950 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors tracking-tight break-all sm:break-normal leading-tight">
                  {CONTACT_EMAIL}
                </div>
              </div>

              <div className="shrink-0 self-start lg:self-center flex items-center gap-4">
                <span className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] group-hover:bg-emerald-600 dark:group-hover:bg-accent group-hover:border-emerald-600 dark:group-hover:border-accent flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <span className="text-lg sm:text-xl text-slate-800 dark:text-[#F5F5F0] group-hover:text-white dark:group-hover:text-[#050605] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" aria-hidden="true">↗</span>
                </span>
              </div>
            </div>

            {/* Technical metadata strip */}
            <div className="relative z-10 mt-8 pt-4 border-t border-slate-200 dark:border-[#1A1C1A] flex flex-wrap items-center justify-between gap-x-6 gap-y-2 mono text-[9px] tracking-[0.22em] uppercase text-slate-400 dark:text-[#3D443D]/70">
              <span>KAIZEN HACKS // ORG.MAIL</span>
              <span className="hidden md:inline">NODE: DELHI_KALKAJI</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block" />
                CHANNEL_OK
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
};
