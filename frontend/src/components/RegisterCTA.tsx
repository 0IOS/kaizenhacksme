import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { playTactileClick } from '../utils/audio';
import { Reveal, EASE_OUT } from '../lib/motion';
import { useTheme } from '../context/ThemeContext';
import { REGISTRATION_URL, VENUE_MAPS_URL } from '../data/mockData';

export const RegisterCTA: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="registration-cta"
      className="relative min-h-[52vh] flex flex-col justify-center items-center py-20 sm:py-24 px-5 sm:px-8 bg-[#E4EEE3] dark:bg-[#050605] border-t border-slate-300 dark:border-[#1A1C1A] overflow-hidden text-center select-none"
    >
      {/* Minimal grid — barely there */}
      <div className="absolute inset-0 tech-grid opacity-[0.06] dark:opacity-[0.12] pointer-events-none" />

      {/* Ghost section numeral */}
      <div aria-hidden="true" className="ghost-numeral absolute top-6 left-4 text-[140px] xl:text-[200px] opacity-[0.05] dark:opacity-[0.06] hidden md:block">
        07
      </div>

      {/* Atmospheric emerald core glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(141, 255, 179, 0.09) 0%, transparent 65%)'
            : 'radial-gradient(circle, rgba(5, 150, 105, 0.10) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Monospace Micro Label */}
        <Reveal direction="down" amount={0.6} className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#0B0D0C] border border-emerald-300 dark:border-accent/30 text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-widest font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse" />
            <span>REGISTRATIONS OPEN // VOL. 01</span>
          </div>
        </Reveal>

        {/* Large Typography without glow */}
        <Reveal direction="up" amount={0.4}>
          <h2 className="font-display font-bold text-[clamp(3rem,14vw,5rem)] sm:text-8xl md:text-9xl lg:text-[130px] text-emerald-600 dark:text-accent tracking-tighter uppercase leading-[0.88] select-none">
            <div>READY</div>
            <div className="text-slate-950 dark:text-[#F5F5F0]">TO BUILD?</div>
          </h2>
        </Reveal>

        {/* Action Button: NEXT EVENT → */}
        <Reveal direction="up" delay={0.12} className="mt-10 sm:mt-14">
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1100, 0.06)}
            className="cta-solid group px-8 sm:px-12 py-5 sm:py-6 text-sm sm:text-base tracking-widest"
          >
            <span>NEXT EVENT (GREENTECH IDEATHON)</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-200" />
            <span
              className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-[#050605]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-hidden="true"
            />
          </a>
        </Reveal>

        {/* System status line */}
        <Reveal direction="none" delay={0.2} className="mt-7">
          <div className="flex items-center justify-center gap-3 text-[10px] mono tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57]/90 font-semibold">
            <span>STATUS // OPEN</span>
            <span className="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full" aria-hidden="true" />
            <span>SEATS // 50</span>
            <span className="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full" aria-hidden="true" />
            <span>PROTOCOL // V2.6</span>
          </div>
        </Reveal>

        {/* Tiny metadata subline */}
        <Reveal direction="none" delay={0.25} className="mt-4">
          <a
            href={VENUE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick()}
            className="flex flex-wrap items-center justify-center gap-3 text-xs mono text-slate-600 dark:text-[#565C57] hover:text-emerald-700 dark:hover:text-accent tracking-wider uppercase font-semibold transition-colors"
          >
            <span>ONE-DAY IDEATHON</span>
            <span className="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full" />
            <span>CM SHRI / DBRA SOSE KALKAJI ↗</span>
            <span className="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full" />
            <span>DATE TO BE ANNOUNCED</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};
