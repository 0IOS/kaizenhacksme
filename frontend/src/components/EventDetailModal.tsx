import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { EventItem } from '../types';
import { REGISTRATION_URL } from '../data/mockData';
import { playTactileClick } from '../utils/audio';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  React.useEffect(() => {
    if (!event) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-[#050605]/80 backdrop-blur-md overflow-y-auto anim-fade"
      role="dialog"
      aria-modal="true"
      aria-label={`Event specification — ${event.name}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] p-6 sm:p-10 shadow-2xl my-8 rounded-none anim-modal">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-accent" />
            <span className="mono text-xs font-bold text-emerald-700 dark:text-accent uppercase tracking-wider">
              EVENT SPECIFICATION // {event.code}
            </span>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            aria-label="Close specification"
            className="p-1 text-slate-500 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero Photo Banner */}
        <div className="relative h-48 sm:h-64 overflow-hidden border border-slate-300 dark:border-[#1A1C1A] mb-6 bg-slate-100 dark:bg-[#050605]">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0B0D0C] via-white/40 dark:via-[#0B0D0C]/40 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="text-[10px] mono text-emerald-700 dark:text-accent uppercase font-bold">
                {event.edition} · {event.year}
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-950 dark:text-[#F5F5F0] uppercase tracking-tight">
                {event.name}
              </h2>
            </div>
            <div className="text-right mono text-xs text-emerald-700 dark:text-accent bg-white/95 dark:bg-[#050605]/90 border border-emerald-600/30 dark:border-accent/30 px-3 py-1 font-bold shadow-sm">
              {event.prizePool}
            </div>
          </div>
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-slate-200 dark:border-[#1A1C1A] py-4 mb-6 text-xs mono">
          <div>
            <div className="text-[10px] text-slate-500 dark:text-[#565C57] uppercase font-semibold">DATE</div>
            <div className="text-slate-950 dark:text-[#F5F5F0] font-bold mt-0.5">{event.date}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 dark:text-[#565C57] uppercase font-semibold">LOCATION</div>
            {event.mapsUrl ? (
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick()}
                title="Open in Google Maps"
                className="text-emerald-700 dark:text-accent font-bold mt-0.5 inline-block hover:underline decoration-dotted underline-offset-2"
              >
                {event.city} ↗
              </a>
            ) : (
              <div className="text-slate-950 dark:text-[#F5F5F0] font-bold mt-0.5">{event.city}</div>
            )}
          </div>
          <div>
            <div className="text-[10px] text-slate-500 dark:text-[#565C57] uppercase font-semibold">CAPACITY</div>
            <div className="text-slate-950 dark:text-[#F5F5F0] font-bold mt-0.5">{event.builderCount}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 dark:text-[#565C57] uppercase font-semibold">TEAMS</div>
            <div className="text-slate-950 dark:text-[#F5F5F0] font-bold mt-0.5">{event.teamsCount}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Tracks List */}
        {event.tracks && (
          <div className="mb-6">
            <div className="text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-wider mb-2 font-bold">
              ENGINEERING TRACKS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {event.tracks.map((tr, i) => (
                <div key={i} className="flex items-center gap-2 text-xs mono text-slate-900 dark:text-[#F5F5F0] bg-slate-50 dark:bg-[#050605] p-2 border border-slate-300 dark:border-[#1A1C1A] font-medium">
                  <span className="text-emerald-700 dark:text-accent font-bold">›</span>
                  <span>{tr}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Winners Section if Available */}
        {event.winners && event.winners.length > 0 && (
          <div className="mb-6">
            <div className="text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-wider mb-2 font-bold">
              HIGHLIGHT WINNERS
            </div>
            <div className="space-y-2">
              {event.winners.map((win, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 dark:bg-[#050605] p-3 border border-slate-300 dark:border-[#1A1C1A] text-xs mono">
                  <div>
                    <span className="font-bold text-slate-950 dark:text-[#F5F5F0]">{win.project}</span>
                    <span className="text-slate-500 dark:text-[#565C57] ml-2">by {win.team}</span>
                  </div>
                  <span className="text-emerald-700 dark:text-accent text-[11px] font-bold">TRACK: {win.track}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule if Available */}
        {event.schedule && event.schedule.length > 0 && (
          <div className="mb-6">
            <div className="text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-wider mb-2 font-bold">
              SPRINT AGENDA
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {event.schedule.map((item, i) => (
                <div key={i} className="bg-slate-50 dark:bg-[#050605] p-2.5 border border-slate-300 dark:border-[#1A1C1A] text-xs mono">
                  <div className="text-emerald-700 dark:text-accent text-[10px] font-bold">{item.time}</div>
                  <div className="font-bold text-slate-950 dark:text-[#F5F5F0]">{item.title}</div>
                  <div className="text-slate-600 dark:text-[#A9ADA9] text-[10px] mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-slate-200 dark:border-[#1A1C1A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {event.mapsUrl ? (
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTactileClick()}
              className="text-[10px] mono text-slate-500 dark:text-[#565C57] hover:text-emerald-700 dark:hover:text-accent transition-colors font-medium underline decoration-dotted underline-offset-2"
            >
              VENUE: {event.venue} ↗
            </a>
          ) : (
            <div className="text-[10px] mono text-slate-500 dark:text-[#565C57] font-medium">
              VENUE: {event.venue}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playTactileClick();
                onClose();
              }}
              className="px-5 py-3 bg-transparent hover:bg-slate-100 dark:hover:bg-[#1A1C1A] border border-slate-300 dark:border-[#1A1C1A] text-slate-900 dark:text-[#F5F5F0] mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none"
            >
              CLOSE SPEC
            </button>

            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTactileClick(1000)}
              className="group px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent text-white dark:text-[#050605] mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer rounded-none shadow-sm"
            >
              <span>APPLY FOR {event.name}</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
