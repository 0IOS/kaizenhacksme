import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import { playTactileClick } from '../utils/audio';
import { useCursorParallax, useTilt, useIsDesktop, useReducedMotionSafe, EASE_OUT, CornerBrackets } from '../lib/motion';
import { FEATURED_EVENT, REGISTRATION_URL, VENUE_MAPS_URL } from '../data/mockData';

interface HeroProps {
  onScrollToNextEvent: () => void;
}

/* Load intro: pieces assemble from their signature directions, then the
   composition hands control over to the scroll-scrubbed pinned phase. */
const INTRO_PARENT: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const introChild = (from: 'left' | 'right' | 'up' | 'down' | 'diag', dist: number): Variants => ({
  hidden:
    from === 'left'
      ? { opacity: 0, x: -dist }
      : from === 'right'
        ? { opacity: 0, x: dist }
        : from === 'down'
          ? { opacity: 0, y: -dist }
          : from === 'diag'
            ? { opacity: 0, x: dist * 0.7, y: dist * 0.55, rotate: 1.2 }
            : { opacity: 0, y: dist },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.95, ease: EASE_OUT },
  },
});

export const Hero: React.FC<HeroProps> = ({ onScrollToNextEvent }) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const wrapRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const isDesktop = useIsDesktop();

  /* Pin only when there is room and motion is welcome. */
  const pinned = isDesktop && !reduced;

  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1440));
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ---- Classic (non-pinned) traversal parallax — preserved behaviour ---- */
  const { scrollYProgress: classicP } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end start'],
  });
  const cYHeadline = useTransform(classicP, [0, 1], reduced ? [0, 0] : [0, 60]);
  const cYPanel = useTransform(classicP, [0, 1], reduced ? [0, 0] : [0, -40]);
  const cYStats = useTransform(classicP, [0, 1], reduced ? [0, 0] : [0, 30]);
  const cOpacity = useTransform(classicP, [0, 0.85], [1, reduced ? 1 : 0.2]);

  /* ---- Pinned scroll-scrubbed choreography ---- */
  const { scrollYProgress: pinP } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  /* Kinetic drift along each element's entry axis — subtle and continuous,
     but keyframed to return EXACTLY to the static layout position by the end
     of the pinned phase so nothing rests displaced or clips at the edges.
     Peaks are kept within the section padding so text never leaves the frame. */
  const pEyebrowX = useTransform(pinP, [0, 0.5, 1], pinned ? [0, -14, 0] : [0, 0, 0]);
  const pLine1X = useTransform(pinP, [0, 0.5, 1], pinned ? [0, -44, 0] : [0, 0, 0]);
  const pLine2X = useTransform(pinP, [0, 0.5, 1], pinned ? [0, 52, 0] : [0, 0, 0]);
  const pLine3Y = useTransform(pinP, [0, 0.5, 1], pinned ? [0, -46, 0] : [0, 0, 0]);
  const pLine3R = useTransform(pinP, [0, 0.5, 1], pinned ? [0, -0.8, 0] : [0, 0, 0]);
  const pDescY = useTransform(pinP, [0, 0.5, 1], pinned ? [0, -24, 0] : [0, 0, 0]);
  const pStatsY = useTransform(pinP, [0, 0.5, 1], pinned ? [0, -30, 0] : [0, 0, 0]);
  const pMetaY = useTransform(pinP, [0, 0.5, 1], pinned ? [0, -14, 0] : [0, 0, 0]);

  const pDecoY = useTransform(pinP, [0, 0.5, 1], pinned ? [0, -60, 0] : [0, 0, 0]);
  const pRingRotate = useTransform(pinP, [0, 1], pinned ? [-16, 24] : [0, 0]);
  const pRingScale = useTransform(pinP, [0, 1], pinned ? [0.94, 1.07] : [1, 1]);

  /* Release: composition fades back just before unpinning */
  const pRelease = useTransform(pinP, [0.84, 1], [1, 0.12]);

  /* Cursor parallax layers (desktop, pointer-fine guarded inside hook) */
  const { x: nx, y: ny } = useCursorParallax(1);
  const metaX = useTransform(nx, (v) => v * 3);
  const metaY = useTransform(ny, (v) => v * 3);
  const headX = useTransform(nx, (v) => v * 6);
  const headY = useTransform(nx, (v) => v * 6);
  const panelX = useTransform(nx, (v) => v * -10);
  const panelY = useTransform(nx, (v) => v * -8);
  const decoX = useTransform(nx, (v) => v * 14);
  const decoY = useTransform(nx, (v) => v * 12);

  /* Scroll drift + cursor depth composed into single values */
  const metaCombinedY = useTransform<number, number>([pMetaY, metaY], ([s, c]) => s + c);
  const decoCombinedY = useTransform<number, number>([pDecoY, decoY], ([s, c]) => s + c);

  /* Panel: scroll drift and cursor depth composed into single values */
  const panelScrollX = useTransform(pinP, [0, 0.5, 1], pinned ? [0, -22, 0] : [0, 0, 0]);
  const panelScrollY = useTransform(pinP, [0, 0.5, 1], pinned ? [0, -36, 0] : [0, 0, 0]);
  const pPanelX = useTransform<number, number>([panelScrollX, panelX], ([s, c]) => s + c);
  const pPanelY = useTransform<number, number>([panelScrollY, panelY], ([s, c]) => s + c);
  const pPanelScale = useTransform(pinP, [0, 1], pinned ? [1, 1.035] : [1, 1]);

  const tilt = useTilt(2.2);

  const headlines = [
    { line1: 'BUILD.', line2: 'FOR THE', line3: 'PLANET.' },
    { line1: 'IDEAS THAT', line2: 'SOLVE', line3: 'REAL PROBLEMS.' },
    { line1: 'THINK.', line2: 'BUILD.', line3: 'IMPACT.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [headlines.length]);

  const introDist = vw < 1024 ? Math.round(vw * 0.16) : Math.round(vw * 0.13);

  /* Reduced motion: skip the load choreography entirely — content appears
     immediately at its final position. */
  const introGroupProps = (): { initial: false } | { variants: Variants; initial: 'hidden'; animate: 'show' } =>
    reduced
      ? { initial: false }
      : { variants: INTRO_PARENT, initial: 'hidden', animate: 'show' };

  const introChildProps = (
    from: 'left' | 'right' | 'up' | 'down' | 'diag',
    dist: number
  ): { initial: false } | { variants: Variants } =>
    reduced ? { initial: false } : { variants: introChild(from, dist) };

  return (
    <section
      ref={wrapRef}
      id="hero-section"
      className={pinned ? 'relative w-full select-none' : 'relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 shell overflow-hidden select-none'}
      style={pinned ? { height: '230vh' } : undefined}
    >
      <div
        className={
          pinned
            ? 'sticky top-0 h-svh flex flex-col justify-between pt-24 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 shell overflow-hidden select-none'
            : undefined
        }
      >
      {/* Floating environmental decorations */}
      <motion.div style={{ x: decoX, y: decoCombinedY }} className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        <div className="float-deco absolute top-[30%] right-[38%] text-accent/40 dark:text-accent/30 mono text-sm select-none" style={{ ['--f-min' as string]: 0.25, ['--f-max' as string]: 0.55 }}>
          +
        </div>
        <div className="float-deco absolute bottom-[26%] left-[42%] text-emerald-600/30 dark:text-accent/20 mono text-xs select-none" style={{ ['--f-min' as string]: 0.2, ['--f-max' as string]: 0.45 }}>
          +
        </div>
        <motion.div
          style={{ rotate: pRingRotate, scale: pRingScale }}
          className="absolute top-[24%] right-[4%] w-56 h-56"
        >
          <div className="float-deco w-full h-full rounded-full border border-slate-300/70 dark:border-[#161A17]" style={{ ['--f-min' as string]: 0.5, ['--f-max' as string]: 0.85 }} />
        </motion.div>
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
      <motion.div style={{ x: metaX, y: metaCombinedY }}>
        <motion.div
          {...introGroupProps()}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-300 dark:border-[#1A1C1A] pb-4 mb-8 text-[11px] mono text-slate-600 dark:text-[#A9ADA9]"
        >
        <motion.div {...introChildProps('up', 18)} className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 dark:bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-accent"></span>
          </span>
          <span className="text-slate-950 dark:text-[#F5F5F0] font-semibold">
            KAIZEN HACKS // SPRINT LABS
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-[#565C57]">|</span>
          <span className="hidden sm:inline text-slate-600 dark:text-[#565C57]">LAT: 28.5270° N / LONG: 77.2590° E</span>
        </motion.div>

        <motion.div {...introChildProps('down', 14)} className="flex items-center gap-4 text-emerald-700 dark:text-accent">
          <span className="hidden md:inline mono text-[10px] text-slate-600 dark:text-[#A9ADA9]">
            PROTOCOL: V2.6_STABLE
          </span>
          <span className="bg-emerald-50 dark:bg-accent/10 border border-emerald-300 dark:border-accent/20 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
            ● IDEATHON EDITION
          </span>
        </motion.div>
        </motion.div>
      </motion.div>

      {/* Clean Minimalism Split Hero Layout with Parallax */}
      <div className="flex-grow flex flex-col lg:flex-row gap-8 z-10 my-auto py-2">

        {/* LEFT COLUMN: HERO HEADLINE & METRICS */}
        <motion.div
          style={{ y: pinned ? undefined : cYHeadline, opacity: pinned ? pRelease : cOpacity }}
          className="w-full lg:w-2/3 flex flex-col justify-between"
        >
          <motion.div
            {...introGroupProps()}
            style={{ x: headX, y: headY }}
            className="mt-2 sm:mt-6"
          >
            <motion.div style={{ x: pinned ? pEyebrowX : undefined }}>
              <motion.p
                {...introChildProps('left', 48)}
                className="mono text-emerald-700 dark:text-accent text-xs mb-4 tracking-widest font-bold uppercase"
              >
                IDEATHONS / EVENTS / CONTINUOUS SHIP CULTURE
              </motion.p>
            </motion.div>

            <motion.h1
              className="font-display text-[52px] sm:text-[76px] md:text-[90px] lg:text-[102px] leading-[0.88] font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0] uppercase mb-6 select-none"
            >
              <motion.div style={{ x: pinned ? pLine1X : undefined }}>
                <motion.div {...introChildProps('left', introDist)}>
                  <motion.div
                    key={`l1-${headlineIndex}`}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    {headlines[headlineIndex].line1}
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                style={{ x: pinned ? pLine2X : undefined }}
                className="text-slate-500 dark:text-[#A9ADA9]/60"
              >
                <motion.div {...introChildProps('right', introDist)}>
                  <motion.div
                    key={`l2-${headlineIndex}`}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.06, ease: EASE_OUT }}
                  >
                    {headlines[headlineIndex].line2}
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                style={{ y: pinned ? pLine3Y : undefined, rotate: pinned ? pLine3R : undefined }}
                className="text-emerald-600 dark:text-accent"
              >
                <motion.div {...introChildProps('diag', Math.round(introDist * 0.85))}>
                  <motion.div
                    key={`l3-${headlineIndex}`}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12, ease: EASE_OUT }}
                  >
                    {headlines[headlineIndex].line3}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.h1>

            <motion.div style={{ y: pinned ? pDescY : undefined }}>
              <motion.p
                {...introChildProps('up', 40)}
                className="max-w-xl text-sm sm:text-base mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed"
              >
                No endless keynote talks. No vanity pitches. An ideathon where ideas for the UN Sustainable Development Goals become real apps, websites, and games tackling everyday problems.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Scale & Community Indicators */}
          <motion.div style={{ y: pinned ? pStatsY : cYStats }}>
            <motion.div
              {...introGroupProps()}
              className="border-t border-slate-300 dark:border-[#1A1C1A] pt-8 mt-10 flex flex-wrap gap-8 sm:gap-12"
            >
            <motion.div {...introChildProps('up', 34)}>
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold">SCALE</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0]">DEBUT EDITION</p>
            </motion.div>
            <motion.div {...introChildProps('up', 34)}>
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold">COMMUNITY</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0]">FOUNDING 50</p>
            </motion.div>
            <motion.div {...introChildProps('up', 34)}>
              <p className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold">GRANTS POOL</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-accent">UNLOCKING SOON</p>
            </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: FEATURED EVENT PANEL WITH PARALLAX */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
          style={{ y: pinned ? undefined : cYPanel }}
          className="w-full lg:w-1/3 flex flex-col gap-6"
        >
          <motion.div
            style={{ x: pPanelX, y: pPanelY, scale: pinned ? pPanelScale : undefined, opacity: pinned ? pRelease : undefined, ...tilt.style }}
            {...tilt.handlers}
            className="event-panel flex-grow p-6 sm:p-8 border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C] relative flex flex-col justify-between overflow-hidden group shadow-md hover:shadow-xl hover:border-emerald-600/50 dark:hover:border-accent/40 transition-shadow duration-300 will-change-transform"
          >
            <CornerBrackets />
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 dark:bg-accent/10 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            <motion.div
              {...introGroupProps()}
            >
              <div className="flex justify-between items-start mb-8">
                <motion.span {...introChildProps('up', 22)} className="mono text-[10px] bg-emerald-50 text-emerald-700 dark:bg-accent/10 dark:text-accent px-2 py-1 border border-emerald-300 dark:border-accent/20 font-bold uppercase">
                  NEXT EVENT / OPEN
                </motion.span>
                <motion.span {...introChildProps('up', 22)} className="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] bg-slate-100 dark:bg-[#050605] px-2 py-1 border border-slate-300 dark:border-[#1A1C1A]">
                  {FEATURED_EVENT.date}
                </motion.span>
              </div>

              <motion.h2
                {...introChildProps('right', 64)}
                className="font-display text-4xl sm:text-5xl font-bold mb-6 tracking-tighter text-slate-950 dark:text-[#F5F5F0] uppercase"
              >
                GREEN<br/>TECH
              </motion.h2>

              <motion.div {...introChildProps('up', 30)} className="space-y-3.5 text-sm mono">
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
              </motion.div>
            </motion.div>

            <a
              id="hero-claim-spot-btn"
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTactileClick(1000, 0.05)}
              className="w-full mt-8 border border-emerald-600 dark:border-accent text-emerald-700 dark:text-accent py-4 font-bold text-xs sm:text-sm tracking-widest hover:bg-emerald-600 hover:text-white dark:hover:bg-accent dark:hover:text-[#050605] transition-colors rounded-none cursor-pointer mono uppercase flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>CLAIM YOUR SPOT →</span>
            </a>

            <div className="mt-3 flex items-center justify-between mono text-[8px] tracking-[0.22em] uppercase text-slate-400 dark:text-[#3D443D]/70">
              <span>NODE: DELHI_KALKAJI</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block" />
                SYNC_OK
              </span>
            </div>
          </motion.div>

        </motion.div>

      </div>

      </div>

    </section>
  );
};
