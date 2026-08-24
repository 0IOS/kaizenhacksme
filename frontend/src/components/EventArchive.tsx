import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { PAST_EVENTS, FEATURED_EVENT, REGISTRATION_URL } from '../data/mockData';
import { EventItem } from '../types';
import { playTactileClick } from '../utils/audio';
import { Reveal, StaggerGroup, StaggerItem, CornerBrackets } from '../lib/motion';

interface EventArchiveProps {
  onSelectEvent: (event: EventItem) => void;
}

export const EventArchive: React.FC<EventArchiveProps> = ({ onSelectEvent }) => {
  return (
    <section
      id="event-archive"
      className="relative py-16 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
    >
      {/* Medium-intensity section grid */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[420px] grid-medium opacity-[0.45] dark:opacity-35 grid-fade-y pointer-events-none" />

      {/* Ghost vault numeral */}
      <div aria-hidden="true" className="ghost-numeral absolute top-8 right-4 text-[180px] xl:text-[240px] opacity-[0.04] dark:opacity-[0.05] hidden md:block">
        00
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Section Header */}
        <Reveal direction="up" amount={0.3} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
              // HISTORICAL VAULT
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
              PAST EVENTS
            </h2>
          </div>

          <div className="text-xs mono text-slate-600 dark:text-[#565C57] uppercase font-semibold tracking-wider">
            [THE STORY STARTS NOW]
          </div>
        </Reveal>

        {/* Archive Grid — renders once events complete */}
        {PAST_EVENTS.length > 0 ? (
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PAST_EVENTS.map((event) => (
              <StaggerItem key={event.id} className="h-full">
                <div
                  onClick={() => {
                    playTactileClick();
                    onSelectEvent(event);
                  }}
                  className="group relative bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] hover:border-emerald-600 dark:hover:border-accent/60 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[420px] sm:min-h-[460px] h-full shadow-sm hover:shadow-xl hover:-translate-y-1 will-change-transform"
                >
                  <CornerBrackets />

                  {/* Background Event Photo with subtle zoom on hover */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={event.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                      className="w-full h-full object-cover filter grayscale contrast-125 scale-100 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500 opacity-15 dark:opacity-35 group-hover:opacity-40 dark:group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050605] via-white/90 dark:via-[#050605]/85 to-white/40 dark:to-[#050605]/40 transition-opacity duration-300 group-hover:opacity-95" />
                  </div>

                  {/* Top Border Accent Slide */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-600 dark:bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-20" />

                  {/* Top Row: Year & Edition Badge */}
                  <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                    <span className="mono text-xs text-emerald-700 dark:text-accent bg-emerald-50 dark:bg-[#050605] border border-emerald-300 dark:border-accent/30 px-2.5 py-1 font-bold">
                      {event.year} // {event.edition}
                    </span>
                    <span className="w-9 h-9 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] group-hover:border-emerald-600 dark:group-hover:border-accent flex items-center justify-center text-slate-800 dark:text-[#F5F5F0] group-hover:text-emerald-600 dark:group-hover:text-accent group-hover:scale-105 transition-all">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  {/* Bottom Content: Huge Title + Compact Metadata */}
                  <div className="relative z-10 p-6 sm:p-8">
                    {/* Event Name */}
                    <h3 className="font-display font-bold text-3xl sm:text-4xl text-slate-950 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors uppercase tracking-tight">
                      {event.name}
                    </h3>

                    {/* Monospace Metadata Row */}
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-[#1A1C1A] flex flex-wrap items-center justify-between gap-3 text-xs mono text-slate-700 dark:text-[#A9ADA9] group-hover:text-slate-950 dark:group-hover:text-[#F5F5F0] transition-colors">
                      <div className="flex items-center gap-3 sm:gap-4 font-medium">
                        <span className="text-slate-950 dark:text-[#F5F5F0] font-bold">{event.builderCount}</span>
                        <span>·</span>
                        <span>{event.teamsCount}</span>
                        <span>·</span>
                        <span>{event.city}</span>
                      </div>
                      <div className="text-emerald-700 dark:text-accent font-bold">
                        {event.prizePool}
                      </div>
                    </div>

                    {/* Sliding Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      {event.tags.map((t, i) => (
                        <span key={i} className="text-[10px] mono text-slate-700 dark:text-[#A9ADA9] bg-slate-100 dark:bg-[#050605] px-2 py-0.5 border border-slate-300 dark:border-[#1A1C1A] font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          /* Intentional first-edition state — an archive whose first record is being written */
          <Reveal direction="up" amount={0.25}>
            <div className="group relative bg-white dark:bg-[#0B0D0C] border border-dashed border-slate-300 dark:border-[#242825] overflow-hidden shadow-sm">
              <CornerBrackets />
              <div className="absolute inset-0 tech-grid-fine opacity-20 pointer-events-none" />

              <div className="grid lg:grid-cols-2">
                {/* Left: narrative */}
                <div className="relative z-10 p-8 sm:p-12 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-dashed border-slate-300 dark:border-[#242825]">
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-accent/10 border border-emerald-300 dark:border-accent/30 text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-widest font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse" />
                      <span>VOL. 01 IN PROGRESS</span>
                    </div>

                    <h3 className="font-display font-bold text-3xl sm:text-5xl text-slate-950 dark:text-[#F5F5F0] uppercase tracking-tight leading-[0.95]">
                      HISTORY<br />
                      <span className="text-slate-400 dark:text-[#565C57]/70">LOADING</span><span className="blink-dot text-emerald-600 dark:text-accent">_</span>
                    </h3>

                    <p className="text-xs sm:text-sm mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed max-w-md">
                      Every great archive starts with a blank page. GreenTech Ideathon is our first chapter — and its story isn't written yet.
                    </p>
                  </div>

                  <a
                    href={REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTactileClick(1000, 0.05)}
                    className="inline-flex w-fit items-center gap-2 px-5 py-3 bg-emerald-600 dark:bg-accent text-white dark:text-[#050605] hover:bg-emerald-700 dark:hover:bg-[#B7FFC9] text-xs mono font-bold uppercase tracking-widest transition-all duration-200 hover:-translate-y-px hover:shadow-md"
                  >
                    WRITE VOL.01 WITH US <ArrowRight size={14} />
                  </a>
                </div>

                {/* Right: ledger of records */}
                <div className="relative z-10 p-6 sm:p-12 flex flex-col justify-center overflow-x-auto">
                  <div className="min-w-[300px]">
                    <div className="mono text-[9px] tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/80 mb-4">
                      ARCHIVE.INDEX // SHELF_A
                    </div>

                    <div className="border border-slate-200 dark:border-[#161916] divide-y divide-slate-200 dark:divide-[#161916]">
                      {/* Ledger header */}
                      <div className="grid grid-cols-[2.75rem_1fr_3rem_4.5rem] sm:grid-cols-[3rem_1fr_4rem_5.5rem] gap-2 px-2.5 sm:px-3 py-2 mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57]/70 bg-slate-50 dark:bg-[#050605]">
                        <span>IDX</span>
                        <span>EVENT</span>
                        <span>YEAR</span>
                        <span className="text-right">STATUS</span>
                      </div>

                      {/* First record — real, in progress */}
                      <div className="grid grid-cols-[2.75rem_1fr_3rem_4.5rem] sm:grid-cols-[3rem_1fr_4rem_5.5rem] gap-2 px-2.5 sm:px-3 py-3 mono text-[10px] sm:text-xs items-center">
                        <span className="text-slate-500 dark:text-[#565C57]">001</span>
                        <span className="font-bold text-slate-950 dark:text-[#F5F5F0] uppercase">{FEATURED_EVENT.name}</span>
                        <span className="text-slate-600 dark:text-[#A9ADA9]">{FEATURED_EVENT.year}</span>
                        <span className="text-right text-emerald-700 dark:text-accent font-bold">● OPEN</span>
                      </div>

                      {/* Awaiting slots — intentionally empty */}
                      {[2, 3].map((n) => (
                        <div key={n} className="grid grid-cols-[2.75rem_1fr_3rem_4.5rem] sm:grid-cols-[3rem_1fr_4rem_5.5rem] gap-2 px-2.5 sm:px-3 py-3 mono text-[10px] sm:text-xs items-center opacity-40">
                          <span className="text-slate-500 dark:text-[#565C57]">{String(n).padStart(3, '0')}</span>
                          <span className="text-slate-400 dark:text-[#333833] tracking-widest">————</span>
                          <span className="text-slate-400 dark:text-[#333833]">——</span>
                          <span className="text-right text-slate-400 dark:text-[#333833] uppercase">AWAITING</span>
                        </div>
                      ))}
                    </div>

                    {/* Record metadata strip */}
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[9px] mono tracking-[0.18em] uppercase text-slate-500 dark:text-[#565C57]/80">
                      <span>FORMAT // {FEATURED_EVENT.duration}</span>
                      <span>NODE // {FEATURED_EVENT.city}</span>
                      <span>CAP // 50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>

    </section>
  );
};
