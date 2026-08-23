import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { playTactileClick } from '../utils/audio';
import { ScrubIn, EASE_OUT, useCursorParallax } from '../lib/motion';
import { useTheme } from '../context/ThemeContext';
import { REGISTRATION_URL, VENUE_MAPS_URL } from '../data/mockData';

export const RegisterCTA: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef<HTMLElement>(null);

  /* Background depth: grid drifts slower than content, glow breathes wider */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.04, 0.92]);

  const { x: nx, y: ny } = useCursorParallax(1);
  const glowX = useTransform(nx, (v) => v * 14);
  const glowYc = useTransform(ny, (v) => v * 12);
  const typeX = useTransform(nx, (v) => v * -5);

  return (
    <section
      ref={sectionRef}
      id="registration-cta"
      className="relative min-h-[60vh] flex flex-col justify-center items-center py-24 sm:py-28 px-5 sm:px-8 bg-slate-100 dark:bg-[#050605] border-t border-slate-300 dark:border-[#1A1C1A] overflow-hidden text-center select-none"
    >
      {/* Background Grid overlay — slow counter-drift */}
      <motion.div style={{ y: gridY }} className="absolute -inset-y-16 inset-x-0 tech-grid opacity-10 dark:opacity-20 pointer-events-none" />

      {/* Atmospheric emerald core glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ scale: glowScale, x: glowX, y: glowYc }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        >
          <div
            className="w-[720px] h-[720px] rounded-full blur-[150px]"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(141, 255, 179, 0.09) 0%, transparent 65%)'
                : 'radial-gradient(circle, rgba(5, 150, 105, 0.10) 0%, transparent 65%)',
            }}
          />
        </motion.div>
      </div>

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
        <ScrubIn from="down" distance={30} className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#0B0D0C] border border-emerald-300 dark:border-accent/30 text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-widest font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse" />
            <span>REGISTRATIONS OPEN // VOL. 01</span>
          </div>
        </ScrubIn>

        {/* Large Typography without glow */}
        <motion.div style={{ x: typeX }}>
          <h2 className="font-display font-bold text-6xl sm:text-8xl md:text-9xl lg:text-[130px] text-emerald-600 dark:text-accent tracking-tighter uppercase leading-[0.88] select-none">
            <ScrubIn from="left" distance={180} rotate={-0.8}>
              <div>READY</div>
            </ScrubIn>
            <ScrubIn from="right" distance={200} scaleFrom={0.96} lag={0.08}>
              <div className="text-slate-950 dark:text-[#F5F5F0]">TO BUILD?</div>
            </ScrubIn>
          </h2>
        </motion.div>

        {/* Action Button: NEXT EVENT → */}
        <ScrubIn from="up" distance={52} scaleFrom={0.96} lag={0.14} className="mt-10 sm:mt-14">
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1100, 0.06)}
            className="group px-8 sm:px-12 py-5 sm:py-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent dark:hover:opacity-90 text-white dark:text-[#050605] mono font-bold text-sm sm:text-base uppercase tracking-widest flex items-center gap-4 transition-all duration-200 cursor-pointer hover:scale-105 rounded-none shadow-md hover:shadow-xl active:scale-[0.98]"
          >
            <span>NEXT EVENT (GREENTECH IDEATHON)</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-200" />
          </a>
        </ScrubIn>

        {/* Tiny metadata subline */}
        <ScrubIn from="none" distance={0} lag={0.22} className="mt-8">
          <a
            href={VENUE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick()}
            className="flex items-center justify-center gap-3 text-xs mono text-slate-600 dark:text-[#565C57] hover:text-emerald-700 dark:hover:text-accent tracking-wider uppercase font-semibold transition-colors"
          >
            <span>ONE-DAY IDEATHON</span>
            <span className="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full" />
            <span>CM SHRI / DBRA SOSE KALKAJI ↗</span>
            <span className="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full" />
            <span>DATE TO BE ANNOUNCED</span>
          </a>
        </ScrubIn>
      </div>
    </section>
  );
};
