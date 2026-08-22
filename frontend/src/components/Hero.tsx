import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { playTactileClick } from '../utils/audio';
import { useCursorParallax, useTilt, CornerBrackets } from '../lib/motion';

interface HeroProps {
  onOpenRegister: () => void;
  onScrollToNextEvent: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onScrollToNextEvent }) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
    { line1: 'BUILD.', line2: 'BREAK.', line3: 'REBUILD.' },
    { line1: 'HIGH SIGNAL.', line2: 'ZERO NOISE.', line3: 'PURE CRAFT.' },
    { line1: 'IDEAS NEED', line2: 'A PLACE', line3: 'TO HAPPEN.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 w-full overflow-hidden select-none"
    >
      {/* Floating environmental decorations */}
      <motion.div style={{ x: decoX, y: decoY }} className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
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

      {/* Micro Status Bar / Coordinate Header */}
      <motion.div style={{ x: metaX, y: metaY }}>
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
          <span className="hidden sm:inline text-slate-600 dark:text-[#565C57]">LAT: 28.6139° N / LONG: 77.2090° E</span>
        </div>

        <div className="flex items-center gap-4 text-emerald-700 dark:text-accent">
          <span className="hidden md:inline mono text-[10px] text-slate-600 dark:text-[#A9ADA9]">
            PROTOCOL: V2.6_STABLE
          </span>
          <span className="bg-emerald-50 dark:bg-accent/10 border border-emerald-300 dark:border-accent/20 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
            ● 48H INTENSIVE
          </span>
        </div>
        </motion.div>
      </motion.div>

      {/* Clean Minimalism Split Hero Layout with Parallax */}
      <div className="flex-grow flex flex-col lg:flex-row gap-8 z-10 my-auto py-2">

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
              HACKATHONS / EVENTS / CONTINUOUS SHIP CULTURE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="font-display text-[52px] sm:text-[76px] md:text-[90px] lg:text-[102px] leading-[0.88] font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0] uppercase mb-6 select-none"
            >
              <div>{headlines[headlineIndex].line1}</div>
              <div className="text-slate-500 dark:text-[#A9ADA9]/60">{headlines[headlineIndex].line2}</div>
              <div className="text-emerald-600 dark:text-accent">{headlines[headlineIndex].line3}</div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="max-w-xl text-sm sm:text-base mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed"
            >
              No endless keynote talks. No vanity pitches. 48 hours of high-throughput continuous engineering with India's top software, hardware, AI, and protocol builders.
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
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold">SCALE</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0]">20+ EVENTS</p>
            </div>
            <div>
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold">COMMUNITY</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0]">5,000+ BUILDERS</p>
            </div>
            <div>
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold">GLOBAL</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0]">8 CITIES</p>
            </div>
            <div>
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold">GRANTS POOL</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-accent">₹1.8CR+</p>
            </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: FEATURED EVENT PANEL & MINI ARCHIVE WITH PARALLAX */}
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
            className="event-panel flex-grow p-6 sm:p-8 border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C] relative flex flex-col justify-between overflow-hidden group shadow-md hover:shadow-xl hover:border-emerald-600/50 dark:hover:border-accent/40 transition-shadow duration-300 will-change-transform"
          >
            <CornerBrackets />
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 dark:bg-accent/10 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="mono text-[10px] bg-emerald-50 text-emerald-700 dark:bg-accent/10 dark:text-accent px-2 py-1 border border-emerald-300 dark:border-accent/20 font-bold uppercase">
                  NEXT EVENT / OPEN
                </span>
                <span className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] bg-slate-100 dark:bg-[#050605] px-2 py-1 border border-slate-300 dark:border-[#1A1C1A]">
                  24—26 OCT
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 tracking-tighter text-slate-950 dark:text-[#F5F5F0] uppercase">
                CODE//<br/>FORGE
              </h2>

              <div className="space-y-3.5 text-sm mono">
                <div className="flex justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                  <span className="text-slate-600 dark:text-[#A9ADA9]">LOCATION</span>
                  <span className="font-bold uppercase text-slate-950 dark:text-[#F5F5F0]">New Delhi</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                  <span className="text-slate-600 dark:text-[#A9ADA9]">DURATION</span>
                  <span className="font-bold uppercase text-slate-950 dark:text-[#F5F5F0]">48 Hours</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                  <span className="text-slate-600 dark:text-[#A9ADA9]">CAPACITY</span>
                  <span className="font-bold uppercase text-emerald-700 dark:text-accent">500 Builders</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                  <span className="text-slate-600 dark:text-[#A9ADA9]">PRIZE POOL</span>
                  <span className="font-bold uppercase text-emerald-700 dark:text-accent">₹500K+</span>
                </div>
              </div>
            </div>

            <button
              id="hero-claim-spot-btn"
              onClick={() => {
                playTactileClick(1000, 0.05);
                onOpenRegister();
              }}
              className="w-full mt-8 border border-emerald-600 dark:border-accent text-emerald-700 dark:text-accent py-4 font-bold text-xs sm:text-sm tracking-widest hover:bg-emerald-600 hover:text-white dark:hover:bg-accent dark:hover:text-[#050605] transition-colors rounded-none cursor-pointer mono uppercase flex items-center justify-center gap-2"
            >
              <span>CLAIM YOUR SPOT →</span>
            </button>

            <div className="mt-3 flex items-center justify-between mono text-[8px] tracking-[0.22em] uppercase text-slate-400 dark:text-[#3D443D]/70">
              <span>NODE: DELHI_NCR</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block" />
                SYNC_OK
              </span>
            </div>
          </motion.div>

          {/* Mini Archive Preview Card */}
          <div
            onClick={() => {
              playTactileClick();
              onScrollToNextEvent();
            }}
            className="h-36 border border-slate-300 dark:border-[#1A1C1A] p-6 flex flex-col justify-between group cursor-pointer hover:border-emerald-600 dark:hover:border-accent/40 bg-white dark:bg-[#0B0D0C] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] font-semibold">PAST EVENT</p>
              <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-[#1A1C1A] group-hover:bg-emerald-600 dark:group-hover:bg-accent transition-colors" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="font-display text-xl font-bold uppercase text-slate-950 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors">
                  Hack//Delhi
                </h3>
                <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mt-1">240 TEAMS / 2026</p>
              </div>
              <span className="text-xl text-slate-500 dark:text-[#A9ADA9] group-hover:text-emerald-700 dark:group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">↗</span>
            </div>
          </div>

        </motion.div>

      </div>

    </section>
  );
};
