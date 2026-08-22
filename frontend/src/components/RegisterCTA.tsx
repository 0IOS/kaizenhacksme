import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { playTactileClick } from '../utils/audio';
import { Reveal, EASE_OUT } from '../lib/motion';
import { useTheme } from '../context/ThemeContext';

interface RegisterCTAProps {
  onOpenRegister: () => void;
}

export const RegisterCTA: React.FC<RegisterCTAProps> = ({ onOpenRegister }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="registration-cta"
      className="relative min-h-[60vh] flex flex-col justify-center items-center py-24 sm:py-28 px-5 sm:px-8 bg-slate-100 dark:bg-[#050605] border-t border-slate-300 dark:border-[#1A1C1A] overflow-hidden text-center select-none"
    >
      {/* Background Grid overlay */}
      <div className="absolute inset-0 tech-grid opacity-10 dark:opacity-20 pointer-events-none" />

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

      {/* Faint signal scanline */}
      <div
        className="scanline absolute left-0 right-0 h-24 top-[-15vh] pointer-events-none hidden sm:block"
        style={{
          ['--scan-dur' as string]: '22s',
          ['--scan-op' as string]: 0.4,
          background:
            'linear-gradient(to bottom, transparent, rgba(141, 255, 179, 0.06), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Monospace Micro Label */}
        <Reveal direction="down" amount={0.6} className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#0B0D0C] border border-emerald-300 dark:border-accent/30 text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-widest font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse" />
            <span>APPLICATIONS CLOSING SOON // VOL. 05</span>
          </div>
        </Reveal>

        {/* Large Typography without glow */}
        <Reveal direction="up" amount={0.4}>
          <h2 className="font-display font-bold text-6xl sm:text-8xl md:text-9xl lg:text-[130px] text-emerald-600 dark:text-accent tracking-tighter uppercase leading-[0.88] select-none">
            <div>READY</div>
            <div className="text-slate-950 dark:text-[#F5F5F0]">TO BUILD?</div>
          </h2>
        </Reveal>

        {/* Action Button: NEXT EVENT → */}
        <Reveal direction="up" delay={0.12} className="mt-10 sm:mt-14">
          <button
            onClick={() => {
              playTactileClick(1100, 0.06);
              onOpenRegister();
            }}
            className="group px-8 sm:px-12 py-5 sm:py-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent dark:hover:opacity-90 text-white dark:text-[#050605] mono font-bold text-sm sm:text-base uppercase tracking-widest flex items-center gap-4 transition-all duration-200 cursor-pointer hover:scale-105 rounded-none shadow-md hover:shadow-xl"
          >
            <span>NEXT EVENT (CODE//FORGE)</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-200" />
          </button>
        </Reveal>

        {/* Tiny metadata subline */}
        <Reveal direction="none" delay={0.25} className="mt-8">
          <div className="flex items-center gap-3 text-xs mono text-slate-600 dark:text-[#565C57] tracking-wider uppercase font-semibold">
            <span>48 HOURS</span>
            <span className="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full" />
            <span>NEW DELHI</span>
            <span className="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full" />
            <span>OCTOBER 24—26, 2026</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
