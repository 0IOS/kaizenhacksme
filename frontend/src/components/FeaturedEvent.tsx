import React, { useState, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { FEATURED_EVENT, REGISTRATION_URL } from '../data/mockData';
import { playTactileClick } from '../utils/audio';
import { Reveal, CornerBrackets, EASE_OUT } from '../lib/motion';

interface FeaturedEventProps {
  onSelectEventDetail: () => void;
}

const TABS = ['OVERVIEW', 'TRACKS', 'TIMELINE'] as const;
type Tab = (typeof TABS)[number];

export const FeaturedEvent: React.FC<FeaturedEventProps> = ({ onSelectEventDetail }) => {
  const [activeTab, setActiveTab] = useState<Tab>('OVERVIEW');
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imgParallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={containerRef}
      id="featured-event"
      className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
    >
      {/* Section Header */}
      <Reveal direction="up" amount={0.3} className="flex flex-wrap items-end justify-between gap-4 mb-8 border-b border-slate-300 dark:border-[#1A1C1A] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-accent animate-pulse" />
            <span>PRIMARY CENTERPIECE // UPCOMING EVENT</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
            NEXT HACKATHON
          </h2>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline mono text-[10px] text-slate-500 dark:text-[#565C57]/90 uppercase tracking-widest">
            EVENT // VOL.01
          </span>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-accent/10 border border-emerald-300 dark:border-accent/30 text-xs mono text-emerald-700 dark:text-accent uppercase tracking-wider font-bold">
            <span className="inline-block w-1.5 h-1.5 bg-emerald-600 dark:bg-accent animate-pulse" />
            <span>LIMITED SEATS: 50</span>
          </div>
        </div>
      </Reveal>

      {/* Main Visual Panel */}
      <Reveal direction="up" amount={0.15}>
      <div className="relative group event-panel border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C] hover:border-emerald-600/60 dark:hover:border-accent/50 transition-all duration-300 overflow-hidden shadow-md hover:shadow-2xl">
        <CornerBrackets />
        {/* Hover glow halo */}
        <div className="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 60px rgba(141, 255, 179, 0.04)' }} />

        {/* Background Visual Layer with Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.13] dark:opacity-30 group-hover:opacity-[0.18] dark:group-hover:opacity-40 transition-opacity duration-500">
          <motion.img
            style={{ y: imgParallaxY, scale: 1.15 }}
            src={FEATURED_EVENT.image}
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="w-full h-full object-cover object-center grayscale contrast-150 transition-transform duration-700"
          />
          {/* Subtle green duotone tint */}
          <div className="absolute inset-0 bg-emerald-700/25 dark:bg-accent/[0.06] mix-blend-color pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0B0D0C] via-white/85 dark:via-[#0B0D0C]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#0B0D0C] via-white/75 dark:via-[#0B0D0C]/75 to-transparent" />
          <div className="absolute inset-0 tech-grid-fine opacity-40" />
        </div>

        {/* Technical frame annotations over the visual */}
        <div className="absolute top-4 right-5 z-10 hidden md:flex flex-col items-end gap-1 mono text-[8px] tracking-[0.28em] uppercase text-slate-400 dark:text-[#333833]/60 pointer-events-none" aria-hidden="true">
          <span>FIG.01 — EVENT NODE</span>
          <span>IMG.SRC // MONO_TREATMENT</span>
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-between min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]">

          {/* Top Row: Meta bar & Date status */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-[#1A1C1A] pb-6">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs mono text-slate-700 dark:text-[#A9ADA9]">
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] text-slate-950 dark:text-[#F5F5F0] uppercase font-bold">
                {FEATURED_EVENT.edition}
              </span>
              <span className="flex items-center gap-1.5 text-slate-950 dark:text-[#F5F5F0] font-medium">
                <Calendar size={14} className="text-emerald-600 dark:text-accent" />
                {FEATURED_EVENT.date}
              </span>
              <a
                href={FEATURED_EVENT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick()}
                title="Open in Google Maps"
                className="flex items-center gap-1.5 hover:text-emerald-700 dark:hover:text-accent transition-colors"
              >
                <MapPin size={14} className="text-emerald-600 dark:text-accent" />
                {FEATURED_EVENT.city} ↗
              </a>
              <span className="flex items-center gap-1.5">
                {FEATURED_EVENT.duration} IDEATHON
              </span>
              <span className="hidden xl:flex items-center gap-1.5 text-slate-500 dark:text-[#565C57]/90">
                T-MINUS
                <span className="text-emerald-700 dark:text-accent font-bold">--:--<span className="blink-dot">_</span></span>
              </span>
            </div>

            {/* Status HUD */}
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] px-4 py-2 self-start lg:self-auto">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse" />
              <div className="mono text-xs sm:text-sm font-bold text-emerald-700 dark:text-accent tracking-wider uppercase">
                Registrations Open
              </div>
            </div>
          </div>

          {/* Center Visual Core */}
          <div className="my-8 lg:my-10">
            <div className="inline-block text-xs mono tracking-widest text-emerald-700 dark:text-accent uppercase mb-2 font-bold">
              IDEATHON CODEX // BUILD FOR THE GOALS
            </div>

            <h1 className="font-display font-bold text-[clamp(3rem,13vw,7rem)] sm:text-7xl md:text-8xl lg:text-9xl text-slate-950 dark:text-[#F5F5F0] tracking-tighter uppercase leading-none">
              {FEATURED_EVENT.name}
            </h1>

            {/* Compact Numbers Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-y border-slate-200 dark:border-[#1A1C1A] py-6 max-w-4xl">
              <div>
                <div className="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">CAPACITY</div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0] mt-1">50</div>
                <div className="text-[11px] mono text-slate-500 dark:text-[#565C57]">Builder Seats</div>
              </div>
              <div>
                <div className="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">PRIZE POOL</div>
                <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 dark:text-accent mt-1">TBA</div>
                <div className="text-[11px] mono text-slate-500 dark:text-[#565C57]">To Be Revealed</div>
              </div>
              <div>
                <div className="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">DURATION</div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0] mt-1">1 DAY</div>
                <div className="text-[11px] mono text-slate-500 dark:text-[#565C57]">Ideathon Sprint</div>
              </div>
              <div>
                <div className="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">VENUE</div>
                <a
                  href={FEATURED_EVENT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTactileClick()}
                  title="Open in Google Maps"
                  className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-slate-950 dark:text-[#F5F5F0] mt-1 hover:text-emerald-700 dark:hover:text-accent transition-colors underline decoration-dotted underline-offset-4"
                >
                  KALKAJI ↗
                </a>
                <div className="text-[11px] mono text-slate-500 dark:text-[#565C57]">CM Shri / DBRA SOSE</div>
              </div>
            </div>

            {/* Capacity allocation strip — every segment open while registration runs */}
            <div className="mt-5 max-w-4xl">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] mono tracking-[0.24em] uppercase text-slate-500 dark:text-[#565C57]/90 font-semibold">
                  SEAT ALLOCATION // ROLLING ADMISSION
                </span>
                <span className="text-[9px] mono tracking-[0.24em] uppercase text-emerald-700 dark:text-accent font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-accent inline-block" />
                  OPEN
                </span>
              </div>
              <div className="flex gap-1" aria-label="All 50 seats currently open for registration">
                {[...Array(10)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.35, ease: EASE_OUT }}
                    className={`h-1.5 flex-1 origin-left ${i % 3 === 2 ? 'bg-emerald-600 dark:bg-accent' : 'bg-emerald-600/30 dark:bg-accent/25'}`}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        playTactileClick();
                        setActiveTab(tab);
                      }}
                      aria-pressed={isActive}
                      className={`relative px-3 py-1.5 text-xs mono tracking-wider uppercase transition-colors cursor-pointer ${
                        isActive
                          ? `text-white dark:text-[#050605] font-bold ${reduced ? 'bg-emerald-600 dark:bg-accent shadow-sm' : ''}`
                          : 'bg-slate-100 dark:bg-[#050605] hover:bg-slate-200 dark:hover:bg-[#1A1C1A] text-slate-700 dark:text-[#A9ADA9] border border-slate-300 dark:border-[#1A1C1A]'
                      }`}
                    >
                      {isActive && !reduced && (
                        <motion.span
                          layoutId={reduced ? undefined : 'event-tab-pill'}
                          className="absolute inset-0 shadow-sm"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                          transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              {activeTab === 'OVERVIEW' && (
                <div className="max-w-2xl text-xs sm:text-sm mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed">
                  <p>
                    Pick an idea that advances an SDG, then bring it to life as an app, website, or game that tackles real-life problems. Mentor support throughout — no idea is too early.
                  </p>
                </div>
              )}

              {activeTab === 'TRACKS' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-3xl">
                  {FEATURED_EVENT.tracks.map((track, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs mono text-slate-900 dark:text-[#F5F5F0] bg-slate-50 dark:bg-[#050605] px-3 py-2 border border-slate-300 dark:border-[#1A1C1A]">
                      <span className="text-emerald-600 dark:text-accent font-bold">›</span>
                      <span>{track}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'TIMELINE' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                  {FEATURED_EVENT.schedule?.slice(0, 3).map((item, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-[#050605] p-3 border border-slate-300 dark:border-[#1A1C1A]">
                      <div className="text-[10px] mono text-emerald-700 dark:text-accent font-bold">{item.time}</div>
                      <div className="text-xs mono font-bold text-slate-950 dark:text-[#F5F5F0] mt-0.5">{item.title}</div>
                      <div className="text-[11px] mono text-slate-600 dark:text-[#A9ADA9] mt-1">{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-slate-200 dark:border-[#1A1C1A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs mono text-slate-600 dark:text-[#A9ADA9]">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-accent shrink-0" />
              <span>CONFIRMATIONS SENT ON ROLLING BASIS</span>
            </div>

            <div className="flex items-stretch sm:items-center gap-3">
              <button
                onClick={() => {
                  playTactileClick();
                  onSelectEventDetail();
                }}
                className="px-5 py-3.5 bg-transparent hover:bg-slate-100 dark:hover:bg-[#1A1C1A] border border-slate-300 dark:border-[#1A1C1A] text-slate-900 dark:text-[#F5F5F0] text-xs mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                VIEW FULL SPEC
              </button>

              <a
                id="featured-event-register"
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick(1000, 0.06)}
                className="cta-solid group relative px-8 py-3.5 text-sm tracking-widest"
              >
                <span>REGISTER NOW</span>
                <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform duration-200" />
              </a>
            </div>
          </div>

        </div>

      </div>
      </Reveal>

    </section>
  );
};
