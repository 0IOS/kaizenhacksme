import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PARTNERS } from '../data/mockData';
import { playTactileClick } from '../utils/audio';
import { Reveal, StaggerGroup, StaggerItem, CornerBrackets } from '../lib/motion';

interface PartnersProps {
  onOpenPartnerInquiry: () => void;
}

export const Partners: React.FC<PartnersProps> = ({ onOpenPartnerInquiry }) => {
  return (
    <section
      id="partners"
      className="relative py-16 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
    >
      {/* Medium-intensity section grid, fading downward */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[420px] grid-medium opacity-[0.5] dark:opacity-40 grid-fade-y pointer-events-none" />

      {/* Ghost partner-count numeral */}
      <div
        aria-hidden="true"
        className="ghost-numeral absolute -bottom-10 right-2 text-[200px] xl:text-[260px] opacity-[0.04] dark:opacity-[0.05] hidden lg:block"
      >
        {String(PARTNERS.length).padStart(2, '0')}
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Section Header */}
        <Reveal direction="up" amount={0.3} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 sm:mb-12">
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
        </Reveal>

        {/* Monochrome Logos Grid */}
        <StaggerGroup className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PARTNERS.map((partner) => (
            <StaggerItem key={partner.id} className="h-full">
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick()}
                title={`Visit ${partner.name}`}
                className="group relative bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] hover:border-emerald-600/70 dark:hover:border-accent/50 p-6 flex flex-col justify-between min-h-[150px] h-full transition-all duration-300 overflow-hidden rounded-none shadow-sm hover:shadow-lg hover:-translate-y-0.5 will-change-transform focus-visible:-translate-y-0.5"
              >
                <CornerBrackets />

                {/* Corner status indicator */}
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-600/0 dark:bg-accent/0 group-hover:bg-emerald-600/80 dark:group-hover:bg-accent/70 transition-colors duration-300" />

                {/* Top Row: Category badge */}
                <div className="text-[10px] mono text-slate-500 dark:text-[#565C57] group-hover:text-slate-700 dark:group-hover:text-[#A9ADA9] transition-colors uppercase font-medium tracking-wider">
                  {partner.category}
                  <ArrowUpRight size={13} className="inline-block ml-1.5 -top-0.5 relative opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 text-emerald-600 dark:text-accent" />
                </div>

                {/* Main Brand Text/Logo — stronger/darker on hover, never colorful */}
                <div className="my-auto pt-2">
                  <span className="font-display font-bold text-lg sm:text-xl md:text-2xl text-slate-800 dark:text-[#A9ADA9] group-hover:text-slate-950 dark:group-hover:text-[#F5F5F0] transition-all duration-300 uppercase tracking-tight block truncate">
                    {partner.name}
                  </span>
                </div>

                {/* Bottom tier + description reveal */}
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[9px] mono tracking-[0.18em] uppercase font-bold px-2 py-1 border border-slate-200 dark:border-[#242825] bg-slate-50 dark:bg-[#050605] text-slate-600 dark:text-[#565C57] group-hover:border-emerald-600/40 dark:group-hover:border-accent/30 group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors duration-300">
                    <span className="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 group-hover:bg-emerald-600 dark:group-hover:bg-accent transition-colors duration-300" aria-hidden="true" />
                    TIER: {partner.tier}
                  </span>
                  <p className="mt-2 text-[10px] leading-relaxed mono text-slate-500 dark:text-[#565C57] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-16 overflow-hidden transition-all duration-300 ease-out">
                    {partner.description}
                  </p>
                </div>

                {/* Left accent edge slides in on hover */}
                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-600 dark:bg-accent origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Become a Partner Call to Action at Bottom */}
        <Reveal direction="up" delay={0.1} className="mt-12 pt-8 border-t border-slate-300 dark:border-[#1A1C1A] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs mono text-slate-700 dark:text-[#A9ADA9] text-center sm:text-left font-medium">
            WANT TO SPONSOR BOUNTIES, PROVIDE GPU RUNTIMES, OR RECRUIT FROM OUR BUILDER ARENA?
          </div>

          <button
            onClick={() => {
              playTactileClick(1000, 0.05);
              onOpenPartnerInquiry();
            }}
            className="cta-solid group px-6 py-3.5 text-xs tracking-widest shrink-0"
          >
            <span>BECOME A PARTNER</span>
            <span className="group-hover:translate-x-1 transition-all">→</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
};
