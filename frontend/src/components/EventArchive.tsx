import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PAST_EVENTS } from '../data/mockData';
import { EventItem } from '../types';
import { playTactileClick } from '../utils/audio';
import { ScrubIn, ScrubCard, CornerBrackets } from '../lib/motion';

interface EventArchiveProps {
  onSelectEvent: (event: EventItem) => void;
}

export const EventArchive: React.FC<EventArchiveProps> = ({ onSelectEvent }) => {
  return (
    <section
      id="event-archive"
      className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 shell select-none"
    >
      {/* Section Header */}
      <ScrubIn from="left" distance={56} rotate={-0.4} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div>
          <div className="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
            // HISTORICAL VAULT
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
            PAST EVENTS
          </h2>
        </div>

        <div className="text-xs mono text-slate-600 dark:text-[#565C57] uppercase font-semibold">
          [THE STORY STARTS NOW]
        </div>
      </ScrubIn>

      {/* Archive Grid — renders once events complete */}
      {PAST_EVENTS.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PAST_EVENTS.map((event, idx) => (
            <ScrubCard key={event.id} index={idx} distance={72} className="h-full">
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
                    alt={event.name}
                    loading="lazy"
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
                  <div className="w-9 h-9 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] group-hover:border-emerald-600 dark:group-hover:border-accent flex items-center justify-center text-slate-800 dark:text-[#F5F5F0] group-hover:text-emerald-600 dark:group-hover:text-accent group-hover:scale-105 transition-all">
                    <ArrowUpRight size={16} />
                  </div>
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
            </ScrubCard>
          ))}
        </div>
      ) : (
        /* Positive Empty State — the vault fills after the debut edition */
        <ScrubIn from="up" distance={56} scaleFrom={0.98}>
          <div className="group relative bg-white dark:bg-[#0B0D0C] border border-dashed border-slate-300 dark:border-[#1A1C1A] p-10 sm:p-16 text-center overflow-hidden shadow-sm">
            <CornerBrackets />
            <div className="absolute inset-0 tech-grid-fine opacity-20 pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-accent/10 border border-emerald-300 dark:border-accent/30 text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-widest font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse" />
                <span>VOL. 01 IN PROGRESS</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-4xl text-slate-950 dark:text-[#F5F5F0] uppercase tracking-tight">
                HISTORY LOADING…
              </h3>

              <p className="text-xs sm:text-sm mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed">
                Every great archive starts with a blank page. GreenTech Ideathon is our first chapter — and its story isn't written yet.
              </p>

              <p className="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-wider font-bold">
                Be part of VOL. 01 — the best time to join is at the beginning.
              </p>
            </div>
          </div>
        </ScrubIn>
      )}

    </section>
  );
};
