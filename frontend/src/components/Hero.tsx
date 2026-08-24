import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence, type Variants } from 'motion/react';
import { playTactileClick } from '../utils/audio';
import { useCursorParallax, useTilt, CornerBrackets, EASE_OUT } from '../lib/motion';
import { FEATURED_EVENT, REGISTRATION_URL, VENUE_MAPS_URL } from '../data/mockData';

interface HeroProps {
  onScrollToNextEvent: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToNextEvent }) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yHeadline = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yPanel = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yStats = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  const { x: nx, y: ny } = useCursorParallax(1);
  const metaX = useTransform(nx, (v) => v * 3);
  const metaY = useTransform(ny, (v) => v * 3);
  const headX = useTransform(nx, (v) => v * 6);
  const headY = useTransform(ny, (v) => v * 6);
  const panelX = useTransform(nx, (v) => v * -10);
  const panelY = useTransform(ny, (v) => v * -8);
  const decoX = useTransform(nx, (v) => v * 14);
  const decoY = useTransform(ny, (v) => v * 12);

  const tilt = useTilt(2.2);

  const headlines = [
    { line1: 'BUILD.', line2: 'FOR THE', line3: 'PLANET.' },
    { line1: 'IDEAS THAT', line2: 'SOLVE', line3: 'REAL PROBLEMS.' },
    { line1: 'THINK.', line2: 'BUILD.', line3: 'IMPACT.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [headlines.length]);

  const current = headlines[headlineIndex];

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 w-full overflow-hidden select-none"
    >
      {/* Technical backdrop — ghost numeral, crosshair grid, system nodes (4–7% ink) */}
      <motion.div style={{ x: decoX, y: decoY }} className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        {/* Oversized edition numeral */}
        <div className="ghost-numeral absolute -bottom-14 -left-6 text-[340px] xl:text-[420px] opacity-[0.05] dark:opacity-[0.06]">
          01
        </div>

        {/* Crosshair through orbital ring */}
        <div className="absolute top-[calc(24%+7rem)] right-[calc(4%+7rem)] w-[42rem] max-w-[70vw] h-px bg-slate-400/25 dark:bg-[#1E231F]" />
        <div className="absolute top-[calc(24%-14rem)] right-[calc(4%+7rem)] w-px h-[42rem] max-h-[80vh] bg-slate-400/20 dark:bg-[#161A17]" />

        {/* Measurement ticks along the crosshair */}
        <div className="absolute top-[calc(24%+7rem)] right-[calc(4%+9rem)] flex gap-6">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`w-px bg-slate-400/40 dark:bg-[#242825] ${i % 2 === 0 ? 'h-2' : 'h-1'}`} />
          ))}
        </div>

        {/* Node cluster */}
        <div className="absolute top-[calc(24%+7rem)] right-[calc(4%+7rem)]">
          <span className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent opacity-50 blink-dot" />
        </div>
        <span className="absolute top-[calc(24%+8.5rem)] right-[calc(4%+8.5rem)] mono text-[8px] tracking-[0.3em] text-slate-400 dark:text-[#333833]/70 uppercase">
          NODE_28 // SYNCED
        </span>

        {/* Floating environmental decorations */}
        <div className="float-deco absolute top-[30%] right-[38%] text-accent/40 dark:text-accent/30 mono text-sm select-none" style={{ ['--f-min' as string]: 0.25, ['--f-max' as string]: 0.55 }}>
          +
        </div>
        <div className="float-deco absolute bottom-[26%] left-[42%] text-emerald-600/30 dark:text-accent/20 mono text-xs select-none" style={{ ['--f-min' as string]: 0.2, ['--f-max' as string]: 0.45 }}>
          +
        </div>
        <div className="float-deco absolute top-[24%] right-[4%] w-56 h-56 rounded-full border border-slate-300/70 dark:border-[#161A17]" style={{ ['--f-min' as string]: 0.5, ['--f-max' as string]: 0.85 }} />
        <div className="float-deco absolute top-[24%] right-[4%] w-56 h-56 hidden xl:flex items-center justify-center">
          <span className="mono text-[8px] tracking-[0.3em] text-slate-400 dark:text-[#333833]/70">ORBITAL.SYNC</span>
        </div>
        <div className="absolute top-[52%] left-[-1%] w-24 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-[#1E231F] to-transparent" />
        <div className="absolute bottom-[18%] right-[30%] flex items-center gap-2 mono text-[9px] tracking-widest text-slate-500 dark:text-[#3D443D]/80 uppercase">
          <span className="w-1 h-1 bg-emerald-600/70 dark:bg-accent/50 blink-dot" />
          LINK_STABLE
        </div>
      </motion.div>

      {/* Vertical sector coordinates */}
      <div className="absolute top-1/3 right-3 mono text-[9px] tracking-widest text-slate-400 dark:text-[#1A1C1A] rotate-90 origin-right hidden xl:block pointer-events-none" aria-hidden="true">
        SECTOR.07 // 28.5270° N — 77.2590° E
      </div>

      {/* Micro Status Bar / Coordinate Header */}
      <motion.div style={{ x: metaX, y: metaY }} className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-300 dark:border-[#1A1C1A] pb-4 mb-8 text-[11px] mono text-slate-600 dark:text-[#A9ADA9]"
        >
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 dark:bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-accent"></span>
          </span>
          <span className="text-slate-950 dark:text-[#F5F5F0] font-semibold">
            KAIZEN HACKS // SPRINT LABS
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-[#565C57]">|</span>
          <span className="hidden sm:inline text-slate-600 dark:text-[#565C57]">LAT: 28.5270° N / LONG: 77.2590° E</span>
        </div>

        <div className="flex items-center gap-4 text-emerald-700 dark:text-accent">
          <span className="hidden lg:inline mono text-[10px] text-slate-500 dark:text-[#565C57]/90">
            SYS.STATUS // ONLINE
          </span>
          <span className="hidden md:inline mono text-[10px] text-slate-600 dark:text-[#A9ADA9]">
            PROTOCOL: V2.6_STABLE
          </span>
          <span className="bg-emerald-50 dark:bg-accent/10 border border-emerald-300 dark:border-accent/20 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
            ● IDEATHON EDITION
          </span>
        </div>
        </motion.div>
      </motion.div>

      {/* Clean Minimalism Split Hero Layout with Parallax */}
      <div className="relative z-10 flex-grow flex flex-col lg:flex-row gap-8 my-auto py-2">

        {/* LEFT COLUMN: HERO HEADLINE & METRICS */}
        <motion.div
          style={{ y: yHeadline, opacity: opacityFade }}
          className="w-full lg:w-2/3 flex flex-col justify-between"
        >
          <motion.div style={{ x: headX, y: headY }} className="mt-2 sm:mt-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mono text-emerald-700 dark:text-accent text-xs mb-4 tracking-widest font-bold uppercase"
            >
              IDEATHONS / EVENTS / CONTINUOUS SHIP CULTURE
            </motion.p>

            <motion.h1
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="font-display text-[clamp(2.75rem,11vw,3.25rem)] sm:text-[68px] md:text-[84px] lg:text-[5.9vw] xl:text-[6.4vw] 2xl:text-[7vw] leading-[0.88] font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0] uppercase mb-6 select-none"
            >
              {reduced ? (
                <>
                  <div>{current.line1}</div>
                  <div className="text-slate-500 dark:text-[#A9ADA9]/60">{current.line2}</div>
                  <div className="text-emerald-600 dark:text-accent">{current.line3}</div>
                </>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={headlineIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    {[current.line1, current.line2, current.line3].map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: i * 0.08, ease: EASE_OUT }}
                        className={
                          i === 1
                            ? 'text-slate-500 dark:text-[#A9ADA9]/60'
                            : i === 2
                              ? 'text-emerald-600 dark:text-accent'
                              : undefined
                        }
                      >
                        {line}
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="max-w-xl text-sm sm:text-base mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed"
            >
              No endless keynote talks. No vanity pitches. An ideathon where ideas for the UN Sustainable Development Goals become real apps, websites, and games tackling everyday problems.
            </motion.p>
          </motion.div>

          {/* Scale & Community Indicators */}
          <motion.div style={{ y: yStats }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="border-t border-slate-300 dark:border-[#1A1C1A] pt-8 mt-10 flex flex-wrap gap-8 sm:gap-12"
            >
            <div>
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold"><span className="text-emerald-600 dark:text-accent mr-1">▪</span>SCALE</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0]">DEBUT EDITION</p>
            </div>
            <div>
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold"><span className="text-emerald-600 dark:text-accent mr-1">▪</span>COMMUNITY</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0]">FOUNDING 50</p>
            </div>
            <div>
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold"><span className="text-emerald-600 dark:text-accent mr-1">▪</span>GRANTS POOL</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-accent">UNLOCKING SOON</p>
            </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: FEATURED EVENT PANEL WITH PARALLAX */}
        <motion.div
          style={{ y: yPanel }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="w-full lg:w-1/3 flex flex-col gap-6"
        >
          <motion.div
            style={{ x: panelX, y: panelY, ...tilt.style }}
            {...tilt.handlers}
            className="event-panel flex-grow p-6 sm:p-8 border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C] relative flex flex-col justify-between overflow-hidden group shadow-md hover:shadow-xl hover:border-emerald-600/50 dark:hover:border-accent/40 transition-all duration-300 will-change-transform"
          >
            <CornerBrackets />
            {/* Ghost event code behind panel content */}
            <div className="ghost-numeral absolute -top-5 -right-3 text-[110px] opacity-[0.04] dark:opacity-[0.05]" aria-hidden="true">
              GT
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 dark:bg-accent/10 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <span className="mono text-[10px] bg-emerald-50 text-emerald-700 dark:bg-accent/10 dark:text-accent px-2 py-1 border border-emerald-300 dark:border-accent/20 font-bold uppercase">
                  NEXT EVENT / OPEN
                </span>
                <span className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] bg-slate-100 dark:bg-[#050605] px-2 py-1 border border-slate-300 dark:border-[#1A1C1A]">
                  {FEATURED_EVENT.date}
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 tracking-tighter text-slate-950 dark:text-[#F5F5F0] uppercase">
                GREEN<br/>TECH
              </h2>

              <div className="space-y-3.5 text-sm mono">
                <div className="flex justify-between gap-3 border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                  <span className="text-slate-600 dark:text-[#A9ADA9] shrink-0">LOCATION</span>
                  <a
                    href={VENUE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTactileClick()}
                    title="Open in Google Maps"
                    className="font-bold uppercase text-right text-emerald-700 dark:text-accent hover:underline decoration-dotted underline-offset-2 text-xs"
                  >
                    CM Shri/DBRA SOSE Kalkaji ↗
                  </a>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                  <span className="text-slate-600 dark:text-[#A9ADA9]">DURATION</span>
                  <span className="font-bold uppercase text-slate-950 dark:text-[#F5F5F0]">One Day Ideathon</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                  <span className="text-slate-600 dark:text-[#A9ADA9]">CAPACITY</span>
                  <span className="font-bold uppercase text-emerald-700 dark:text-accent">50 Builders</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                  <span className="text-slate-600 dark:text-[#A9ADA9]">PRIZE POOL</span>
                  <span className="font-bold uppercase text-emerald-700 dark:text-accent">To Be Revealed</span>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <a
                id="hero-claim-spot-btn"
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick(1000, 0.05)}
                className="cta-solid group/btn relative w-full mt-8 py-4 text-xs sm:text-sm tracking-widest"
              >
                <span>CLAIM YOUR SPOT</span>
                <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1.5">→</span>
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-[#050605]/80 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" aria-hidden="true" />
              </a>

              <button
                onClick={() => {
                  playTactileClick();
                  onScrollToNextEvent();
                }}
                className="w-full mt-2.5 py-2.5 mono text-[10px] tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57] hover:text-emerald-700 dark:hover:text-accent transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                VIEW EVENT BRIEF <span aria-hidden="true">↓</span>
              </button>
            </div>

            <div className="relative z-10 mt-3 flex items-center justify-between mono text-[8px] tracking-[0.22em] uppercase text-slate-400 dark:text-[#3D443D]/70">
              <span>NODE: DELHI_KALKAJI</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block" />
                SYNC_OK
              </span>
            </div>
          </motion.div>

        </motion.div>

      </div>

    </section>
  );
};
