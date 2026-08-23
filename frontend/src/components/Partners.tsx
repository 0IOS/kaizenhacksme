import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PARTNERS } from '../data/mockData';
import { playTactileClick } from '../utils/audio';
import { ScrubIn, ScrubCard } from '../lib/motion';

interface PartnersProps {
  onOpenPartnerInquiry: () => void;
}

export const Partners: React.FC<PartnersProps> = ({ onOpenPartnerInquiry }) => {
  return (
    <section
      id="partners"
      className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 shell select-none"
    >
      {/* Section Header */}
      <ScrubIn from="left" distance={56} rotate={-0.4} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 sm:mb-12">
        <div>
          <div className="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
            // ECOSYSTEM & INFRASTRUCTURE
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
            SUPPORTED BY
          </h2>
        </div>
        <div className="text-xs mono text-slate-600 dark:text-[#565C57] uppercase font-semibold">
          [INFRASTRUCTURE, COMPUTE & VENTURE PARTNERS]
        </div>
      </ScrubIn>

      {/* Monochrome Logos Grid with Clean Border Styling */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {PARTNERS.map((partner, idx) => (
          <ScrubCard key={partner.id} index={idx} distance={56} scaleFrom={0.97} className="h-full">
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTactileClick()}
              className="group relative bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] hover:border-emerald-600 dark:hover:border-accent/60 p-6 sm:p-8 flex flex-col justify-between min-h-[140px] h-full transition-all duration-300 overflow-hidden rounded-none shadow-sm hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* Corner status indicator */}
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-600/0 dark:bg-accent/0 group-hover:bg-emerald-600/80 dark:group-hover:bg-accent/70 transition-colors duration-300" />

              {/* Top Row: Category badge & arrow */}
              <div className="flex items-center justify-between text-[10px] mono text-slate-500 dark:text-[#565C57] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors uppercase font-medium">
                <span>{partner.category}</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-emerald-600 dark:text-accent" />
              </div>

              {/* Main Brand Text/Logo */}
              <div className="my-auto pt-2">
                <span className="font-display font-bold text-lg sm:text-xl md:text-2xl text-slate-800 dark:text-[#A9ADA9] group-hover:text-emerald-700 dark:group-hover:text-accent transition-all duration-300 uppercase tracking-tight">
                  {partner.name}
                </span>
              </div>

              {/* Bottom tier indicator */}
              <div className="text-[9px] mono text-slate-500 dark:text-[#565C57] tracking-widest uppercase font-medium group-hover:text-slate-700 dark:group-hover:text-[#A9ADA9] transition-colors">
                TIER: {partner.tier}
              </div>

              {/* Hover ambient accent aura */}
              <div className="absolute inset-0 bg-radial from-emerald-500/5 dark:from-accent/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            </a>
          </ScrubCard>
        ))}
      </div>

      {/* Become a Partner Call to Action at Bottom */}
      <ScrubIn from="up" distance={40} lag={0.05} className="mt-12 pt-8 border-t border-slate-300 dark:border-[#1A1C1A] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-xs mono text-slate-700 dark:text-[#A9ADA9] text-center sm:text-left font-medium">
          WANT TO SPONSOR BOUNTIES, PROVIDE GPU RUNTIMES, OR RECRUIT FROM OUR BUILDER ARENA?
        </div>

        <button
          onClick={() => {
            playTactileClick(1000, 0.05);
            onOpenPartnerInquiry();
          }}
          className="group inline-flex items-center gap-3 px-6 py-3.5 bg-emerald-600 dark:bg-accent text-white dark:text-[#050605] hover:bg-emerald-700 dark:hover:opacity-90 text-xs mono font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-none shadow-sm shrink-0"
        >
          <span>BECOME A PARTNER</span>
          <span className="group-hover:translate-x-1 transition-all">→</span>
        </button>
      </ScrubIn>

    </section>
  );
};
