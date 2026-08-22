import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    'GREENTECH IDEATHON',
    'BUILD FOR THE SDGs',
    'APPS · WEBSITES · GAMES',
    'REAL PROBLEMS, REAL SOLUTIONS',
    '50 BUILDER SEATS',
    'CM SHRI / DBRA SOSE KALKAJI',
    'IDEAS TO WORKING BUILDS',
    'ZERO NOISE',
    'CONTINUOUS EVOLUTION',
    'KAIZEN HACKS'
  ];

  return (
    <div className="relative w-full border-y border-slate-300 dark:border-[#1A1C1A] bg-slate-200/70 dark:bg-[#080A09] py-3.5 overflow-hidden select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F1F3F6] dark:from-[#050605] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F1F3F6] dark:from-[#050605] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-[marquee_28s_linear_infinite] motion-reduce:animate-none whitespace-nowrap">
        {/* Repeating items array for infinite smooth loop */}
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-6 text-xs sm:text-sm font-mono tracking-widest text-slate-800 dark:text-[#A9ADA9] uppercase">
            <span className="hover:text-emerald-700 dark:hover:text-accent transition-colors font-semibold">{text}</span>
            <span className="text-emerald-600 dark:text-accent font-bold">→</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
      `}</style>
    </div>
  );
};

