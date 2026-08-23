import React, { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, ArrowUp, Mail, Disc as Discord } from 'lucide-react';
import { playTactileClick } from '../utils/audio';
import { REGISTRATION_URL } from '../data/mockData';

interface FooterProps {
  onOpenPartnerInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPartnerInquiry }) => {
  const [istTime, setIstTime] = useState('');
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setIstTime(now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
      setUtcTime(now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false }) + ' UTC');
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playTactileClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    playTactileClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 dark:bg-[#050605] border-t border-slate-300 dark:border-[#1A1C1A] w-full select-none">
      <div className="shell px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-10">
      {/* Top Navigation & Minimal Columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-[#1A1C1A]">
        {/* Left Col: Brand & System Status */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-emerald-600 dark:bg-accent" />
              <span className="font-display text-xl font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0]">
                KAIZEN HACKS
              </span>
            </div>
            <p className="mt-4 text-xs mono text-slate-700 dark:text-[#A9ADA9] max-w-sm leading-relaxed">
              A high-signal builder collective launching with the GreenTech Ideathon — turning SDG ideas into working apps, websites, and games that tackle real-world problems.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4 text-[11px] mono text-slate-600 dark:text-[#565C57]">
            <span className="text-emerald-700 dark:text-accent flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse" />
              STATUS: NOMINAL
            </span>
            <span>·</span>
            <span className="font-medium text-slate-700 dark:text-[#565C57]">{istTime}</span>
            <span>·</span>
            <span className="font-medium text-slate-700 dark:text-[#565C57]">{utcTime}</span>
          </div>
        </div>

        {/* Middle Col: Navigation Links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs mono">
          <div>
            <div className="text-emerald-700 dark:text-accent uppercase tracking-widest mb-3 font-bold">NAVIGATION</div>
            <ul className="space-y-2.5 text-slate-700 dark:text-[#A9ADA9] font-medium">
              <li>
                <button
                  onClick={() => scrollToSection('featured-event')}
                  className="hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors cursor-pointer uppercase"
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('partners')}
                  className="hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors cursor-pointer uppercase"
                >
                  Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('organizers')}
                  className="hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors cursor-pointer uppercase"
                >
                  Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('event-archive')}
                  className="hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors cursor-pointer uppercase"
                >
                  Archive
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-emerald-700 dark:text-accent uppercase tracking-widest mb-3 font-bold">ACTIONS</div>
            <ul className="space-y-2.5 text-slate-700 dark:text-[#A9ADA9]">
              <li>
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTactileClick(1000)}
                  className="text-emerald-700 hover:text-emerald-800 dark:text-accent dark:hover:text-accent transition-colors cursor-pointer uppercase font-bold"
                >
                  REGISTER →
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenPartnerInquiry();
                  }}
                  className="text-emerald-700 hover:text-emerald-800 dark:text-accent dark:hover:text-accent transition-colors cursor-pointer uppercase font-bold"
                >
                  PARTNERSHIP →
                </button>
              </li>
              <li>
                <a
                  href="mailto:build@kaizenhacks.org"
                  onClick={() => playTactileClick()}
                  className="hover:text-emerald-700 dark:hover:text-accent transition-colors uppercase flex items-center gap-1 font-medium"
                >
                  CONTACT ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Col: Social & Back to Top */}
        <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
          <div className="flex items-center gap-3 text-slate-700 dark:text-[#A9ADA9]">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTactileClick()}
              className="p-2.5 bg-white dark:bg-[#0B0D0C] hover:bg-emerald-600 hover:text-white dark:hover:bg-accent dark:hover:text-[#050605] border border-slate-300 dark:border-[#1A1C1A] transition-colors shadow-sm"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTactileClick()}
              className="p-2.5 bg-white dark:bg-[#0B0D0C] hover:bg-emerald-600 hover:text-white dark:hover:bg-accent dark:hover:text-[#050605] border border-slate-300 dark:border-[#1A1C1A] transition-colors shadow-sm"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTactileClick()}
              className="p-2.5 bg-white dark:bg-[#0B0D0C] hover:bg-emerald-600 hover:text-white dark:hover:bg-accent dark:hover:text-[#050605] border border-slate-300 dark:border-[#1A1C1A] transition-colors shadow-sm"
              aria-label="Discord"
            >
              <Discord size={16} />
            </a>
            <a
              href="mailto:team@kaizenhacks.org"
              onClick={() => playTactileClick()}
              className="p-2.5 bg-white dark:bg-[#0B0D0C] hover:bg-emerald-600 hover:text-white dark:hover:bg-accent dark:hover:text-[#050605] border border-slate-300 dark:border-[#1A1C1A] transition-colors shadow-sm"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="mt-8 md:mt-0 flex items-center gap-2 text-xs mono text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent font-semibold transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] mono text-slate-600 dark:text-[#A9ADA9]">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-medium">
          <span className="text-emerald-700 dark:text-accent font-bold">SUPPORTED BY</span>
          <span className="text-slate-800 dark:text-[#F5F5F0] opacity-80 uppercase hover:opacity-100 transition-opacity">Google Cloud</span>
          <span className="text-slate-800 dark:text-[#F5F5F0] opacity-80 uppercase hover:opacity-100 transition-opacity">Polygon</span>
          <span className="text-slate-800 dark:text-[#F5F5F0] opacity-80 uppercase hover:opacity-100 transition-opacity">Vercel</span>
          <span className="text-slate-800 dark:text-[#F5F5F0] opacity-80 uppercase hover:opacity-100 transition-opacity">Devfolio</span>
        </div>
        <div className="text-slate-600 dark:text-[#A9ADA9] mt-2 md:mt-0 font-medium">
          © 2026 KAIZEN HACKS / CONTINUOUS BUILDER EVOLUTION.
        </div>
      </div>

      {/* Subtle Bottom Coordinates & Node Status */}
      <div className="pt-6 mt-6 border-t border-slate-200 dark:border-[#1A1C1A]/60 flex flex-col sm:flex-row items-center justify-between text-[9px] mono text-slate-500 dark:text-[#565C57]">
        <div>KAIZEN_SYSTEM_ONLINE // B_01 // 28.6139° N, 77.2090° E</div>
        <div className="mt-1 sm:mt-0">NEW DELHI // KALKAJI</div>
      </div>
      </div>
    </footer>
  );
};

