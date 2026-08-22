import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Clock, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { FEATURED_EVENT } from '../data/mockData';
import { playTactileClick } from '../utils/audio';
import { Reveal, CornerBrackets } from '../lib/motion';

interface FeaturedEventProps {
  onOpenRegister: () => void;
  onSelectEventDetail: () => void;
}

export const FeaturedEvent: React.FC<FeaturedEventProps> = ({ onOpenRegister, onSelectEventDetail }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TRACKS' | 'TIMELINE'>('OVERVIEW');
  const [timeLeft, setTimeLeft] = useState({ days: 63, hours: 14, minutes: 28, seconds: 45 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imgParallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  // Countdown timer simulation
  useEffect(() => {
    const targetDate = new Date('2026-10-24T18:00:00Z').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-accent/10 border border-emerald-300 dark:border-accent/30 text-xs mono text-emerald-700 dark:text-accent uppercase tracking-wider font-bold">
          <span className="inline-block w-1.5 h-1.5 bg-emerald-600 dark:bg-accent" />
          <span>REGISTRATION OPEN (SLOTS REMAINING: 142)</span>
        </div>
      </Reveal>

      {/* Main Visual Panel */}
      <Reveal direction="up" amount={0.15}>
      <div className="relative group event-panel border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C] hover:border-emerald-600/60 dark:hover:border-accent/50 transition-all duration-300 overflow-hidden shadow-md hover:shadow-2xl">
        <CornerBrackets />
        {/* Hover glow halo */}
        <div className="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 60px rgba(141, 255, 179, 0.04)' }} />
        
        {/* Background Visual Layer with Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-10 dark:opacity-30 group-hover:opacity-20 dark:group-hover:opacity-40 transition-opacity duration-500">
          <motion.img
            style={{ y: imgParallaxY, scale: 1.1 }}
            src={FEATURED_EVENT.image}
            alt={FEATURED_EVENT.name}
            className="w-full h-full object-cover object-center filter grayscale contrast-125 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0B0D0C] via-white/85 dark:via-[#0B0D0C]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#0B0D0C] via-white/75 dark:via-[#0B0D0C]/75 to-transparent" />
          <div className="absolute inset-0 tech-grid-fine opacity-40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-between min-h-[580px] lg:min-h-[640px]">
          
          {/* Top Row: Meta bar & Countdown */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-[#1A1C1A] pb-6">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs mono text-slate-700 dark:text-[#A9ADA9]">
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] text-slate-950 dark:text-[#F5F5F0] uppercase font-bold">
                {FEATURED_EVENT.edition}
              </span>
              <span className="flex items-center gap-1.5 text-slate-950 dark:text-[#F5F5F0] font-medium">
                <Calendar size={14} className="text-emerald-600 dark:text-accent" />
                {FEATURED_EVENT.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-emerald-600 dark:text-accent" />
                {FEATURED_EVENT.city}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-emerald-600 dark:text-accent" />
                {FEATURED_EVENT.duration}
              </span>
            </div>

            {/* Countdown HUD */}
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] px-4 py-2 self-start lg:self-auto">
              <div className="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] uppercase tracking-wider mr-1 font-semibold">
                T-MINUS:
              </div>
              <div className="flex items-baseline gap-2 mono text-sm sm:text-base font-bold text-emerald-700 dark:text-accent">
                <span>{String(timeLeft.days).padStart(2, '0')}d</span>
                <span className="text-slate-400 dark:text-[#565C57]">:</span>
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span className="text-slate-400 dark:text-[#565C57]">:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span className="text-slate-400 dark:text-[#565C57]">:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>

          {/* Center Visual Core */}
          <div className="my-8 lg:my-10">
            <div className="inline-block text-xs mono tracking-widest text-emerald-700 dark:text-accent uppercase mb-2 font-bold">
              SPRINT CODEX // INDIA'S PREMIER BUILDER ARENA
            </div>
            
            <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-950 dark:text-[#F5F5F0] tracking-tighter uppercase leading-none">
              {FEATURED_EVENT.name}
            </h1>

            {/* Compact Numbers Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-y border-slate-200 dark:border-[#1A1C1A] py-6 max-w-4xl">
              <div>
                <div className="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">CAPACITY</div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0] mt-1">500+</div>
                <div className="text-[11px] mono text-slate-500 dark:text-[#565C57]">Accepted Builders</div>
              </div>
              <div>
                <div className="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">PRIZE POOL</div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-accent mt-1">₹500K+</div>
                <div className="text-[11px] mono text-slate-500 dark:text-[#565C57]">Cash & Grants</div>
              </div>
              <div>
                <div className="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">DURATION</div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0] mt-1">48H</div>
                <div className="text-[11px] mono text-slate-500 dark:text-[#565C57]">Continuous Hack</div>
              </div>
              <div>
                <div className="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">VENUE</div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0] mt-1">DELHI NCR</div>
                <div className="text-[11px] mono text-slate-500 dark:text-[#565C57]">Innovation Complex</div>
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                {(['OVERVIEW', 'TRACKS', 'TIMELINE'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      playTactileClick();
                      setActiveTab(tab);
                    }}
                    className={`px-3 py-1.5 text-xs mono tracking-wider uppercase transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-emerald-600 text-white dark:bg-accent dark:text-[#050605] font-bold shadow-sm'
                        : 'bg-slate-100 dark:bg-[#050605] hover:bg-slate-200 dark:hover:bg-[#1A1C1A] text-slate-700 dark:text-[#A9ADA9] border border-slate-300 dark:border-[#1A1C1A]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              {activeTab === 'OVERVIEW' && (
                <div className="max-w-2xl text-xs sm:text-sm mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed">
                  <p>
                    Full hardware and cloud GPU access. On-site mentors from frontier research labs, top angels, and infrastructure leads. High caffeine, zero fluff.
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
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-accent" />
              <span>APPLICATIONS REVIEWED ON ROLLING BASIS</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playTactileClick();
                  onSelectEventDetail();
                }}
                className="px-5 py-3.5 bg-transparent hover:bg-slate-100 dark:hover:bg-[#1A1C1A] border border-slate-300 dark:border-[#1A1C1A] text-slate-900 dark:text-[#F5F5F0] text-xs mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                VIEW FULL SPEC
              </button>

              <button
                id="featured-event-register"
                onClick={() => {
                  playTactileClick(1000, 0.06);
                  onOpenRegister();
                }}
                className="group px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent dark:hover:opacity-90 text-white dark:text-[#050605] mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>REGISTER FOR CODE//FORGE</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
      </Reveal>

    </section>
  );
};

