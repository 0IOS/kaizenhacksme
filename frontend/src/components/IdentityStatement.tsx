import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { KEY_STATS } from '../data/mockData';
import { Reveal, StaggerGroup, StaggerItem, AnimatedStat } from '../lib/motion';

export const IdentityStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xOffsetLeft = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const xOffsetRight = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const yManifesto = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={containerRef}
      id="identity-statement"
      className="relative py-20 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
    >
      {/* Ghost system label — subconscious layer */}
      <div
        aria-hidden="true"
        className="ghost-numeral absolute top-6 right-0 text-[150px] sm:text-[220px] opacity-[0.04] dark:opacity-[0.05] hidden md:block"
      >
        KAIZEN
      </div>

      {/* Huge Typography Visual Statement with Parallax */}
      <Reveal direction="up" amount={0.3} className="relative z-10 mb-12 sm:mb-16">
        <motion.div style={{ y: yManifesto }}>
          <div className="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-6 font-bold">
            // PHILOSOPHY & MANIFESTO
          </div>

          <h2 className="font-display font-bold text-[clamp(2.9rem,11vw,8rem)] sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-slate-950 dark:text-[#F5F5F0] leading-[0.92] uppercase select-none">
            <motion.div style={{ x: xOffsetLeft }}>IDEAS</motion.div>
            <div className="text-slate-500 dark:text-[#A9ADA9]/60">NEED</div>
            <motion.div style={{ x: xOffsetRight }}>A PLACE</motion.div>
            <div className="text-emerald-600 dark:text-accent">TO HAPPEN.</div>
          </h2>
        </motion.div>
      </Reveal>

      {/* Credibility metrics band — real numbers only */}
      <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 pt-10 border-t border-slate-300 dark:border-[#1A1C1A] relative z-10">
        {KEY_STATS.map((stat, idx) => (
          <StaggerItem key={idx} className={`group relative ${idx > 0 ? 'lg:border-l lg:border-slate-200 dark:lg:border-[#161916] lg:pl-8' : ''}`}>
            <div className="flex items-center gap-2 text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-2 font-bold">
              <span className={`w-1 h-1 bg-emerald-600/70 dark:bg-accent/50 transition-transform duration-300 group-hover:scale-150`} />
              0{idx + 1} //
            </div>
            <AnimatedStat
              value={stat.value}
              className={`font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight transition-colors ${
                idx === 0
                  ? 'text-emerald-600 dark:text-accent'
                  : 'text-slate-950 dark:text-[#F5F5F0] group-hover:text-emerald-600 dark:group-hover:text-accent'
              }`}
            />
            <div className="mt-3 text-xs mono font-bold text-slate-700 dark:text-[#A9ADA9] uppercase tracking-wider">
              {stat.label}
            </div>
            <div className="text-[11px] mono text-slate-500 dark:text-[#565C57] mt-0.5 font-medium">
              {stat.sub}
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

    </section>
  );
};
