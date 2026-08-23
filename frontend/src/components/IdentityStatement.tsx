import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { KEY_STATS } from '../data/mockData';
import { AnimatedStat, ScrubIn } from '../lib/motion';

const STAT_DIRECTIONS = ['left', 'up', 'right', 'diag-right'] as const;

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
      className="py-20 sm:py-24 px-5 sm:px-8 lg:px-12 shell select-none overflow-hidden"
    >
      {/* Huge Typography Visual Statement with Parallax */}
      <div className="mb-12 sm:mb-16">
        <motion.div style={{ y: yManifesto }}>
          <ScrubIn from="left" distance={36} className="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-6 font-bold">
            <div>// PHILOSOPHY & MANIFESTO</div>
          </ScrubIn>

          <h2 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-slate-950 dark:text-[#F5F5F0] leading-[0.92] uppercase select-none">
            <ScrubIn from="left" distance={140} rotate={-0.6}>
              <motion.div style={{ x: xOffsetLeft }}>IDEAS</motion.div>
            </ScrubIn>
            <ScrubIn from="right" distance={120} lag={0.06}>
              <div className="text-slate-500 dark:text-[#A9ADA9]/60">NEED</div>
            </ScrubIn>
            <ScrubIn from="left" distance={140} rotate={0.6} lag={0.12}>
              <motion.div style={{ x: xOffsetRight }}>A PLACE</motion.div>
            </ScrubIn>
            <ScrubIn from="right" distance={160} scaleFrom={0.97} lag={0.18}>
              <div className="text-emerald-600 dark:text-accent">TO HAPPEN.</div>
            </ScrubIn>
          </h2>
        </motion.div>
      </div>

      {/* Pure high-signal metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-slate-300 dark:border-[#1A1C1A]">
        {KEY_STATS.map((stat, idx) => (
          <ScrubIn
            key={idx}
            from={STAT_DIRECTIONS[idx % STAT_DIRECTIONS.length]}
            distance={72}
            scaleFrom={0.98}
            lag={idx * 0.05}
            className="group relative"
          >
            <div className="text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
              0{idx + 1} //
            </div>
            <AnimatedStat
              value={stat.value}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-[#F5F5F0] tracking-tight group-hover:text-emerald-600 dark:group-hover:text-accent transition-colors"
            />
            <div className="mt-2 text-xs mono font-bold text-slate-700 dark:text-[#A9ADA9] uppercase tracking-wider">
              {stat.label}
            </div>
            <div className="text-[11px] mono text-slate-500 dark:text-[#565C57] mt-0.5 font-medium">
              {stat.sub}
            </div>
          </ScrubIn>
        ))}
      </div>

    </section>
  );
};
