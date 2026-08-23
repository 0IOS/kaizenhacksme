import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Volume2, VolumeX, Menu, X, Sun, Moon } from 'lucide-react';
import { playTactileClick, toggleSound, isSoundEnabled } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { REGISTRATION_URL } from '../data/mockData';

interface NavbarProps {
  onOpenPartners?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPartners }) => {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 130, damping: 26, mass: 0.4 });

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playTactileClick(900, 0.04);
  };

  const handleThemeToggle = () => {
    playTactileClick(800, 0.04);
    toggleTheme();
  };

  const scrollToSection = (id: string) => {
    playTactileClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#050605]/90 backdrop-blur-md border-b border-slate-300 dark:border-[#1A1C1A] py-3.5 shadow-sm'
          : 'bg-white/60 dark:bg-[#050605]/40 backdrop-blur-xs py-5 border-b border-transparent'
      }`}
    >
      <div className="shell px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Left */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            playTactileClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-3 select-none"
        >
          <div className="w-2.5 h-2.5 bg-emerald-600 dark:bg-accent group-hover:scale-110 transition-transform duration-200" />
          <span className="font-display font-bold text-xl tracking-tight text-slate-950 dark:text-[#F5F5F0]">
            KAIZEN HACKS
          </span>
          <span className="hidden md:inline-block text-[10px] mono text-emerald-700 dark:text-accent bg-emerald-50 dark:bg-accent/10 px-2 py-0.5 border border-emerald-300 dark:border-accent/20 font-bold">
            SPRINT // 2026
          </span>
        </a>

        {/* Desktop Nav Right */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <nav className="flex items-center gap-6 lg:gap-8 text-xs sm:text-sm uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] font-medium mono">
            <button
              onClick={() => scrollToSection('featured-event')}
              className="nav-link hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors uppercase cursor-pointer"
            >
              Events
            </button>
            <button
              onClick={() => {
                if (onOpenPartners) {
                  onOpenPartners();
                } else {
                  scrollToSection('partners');
                }
              }}
              className="nav-link hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors uppercase cursor-pointer"
            >
              Partners
            </button>
            <button
              onClick={() => scrollToSection('organizers')}
              className="nav-link hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors uppercase cursor-pointer"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection('event-archive')}
              className="nav-link hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors uppercase cursor-pointer"
            >
              Archive
            </button>
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent p-1.5 cursor-pointer border border-slate-300 dark:border-[#1A1C1A] bg-slate-100 dark:bg-[#0B0D0C] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} className="text-accent" /> : <Moon size={15} className="text-emerald-700" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute micro-sounds' : 'Enable micro-sounds'}
            className="text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent p-1.5 cursor-pointer border border-slate-300 dark:border-[#1A1C1A] bg-slate-100 dark:bg-[#0B0D0C] transition-colors"
            aria-label="Toggle tactile sound"
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} className="text-slate-400 dark:text-[#565C57]" />}
          </button>

          {/* Primary CTA */}
          <a
            id="nav-register-btn"
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1000, 0.05)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-accent dark:text-[#050605] dark:hover:bg-[#B7FFC9] px-5 py-2 font-bold tracking-normal rounded-none transition-all cursor-pointer text-xs mono shadow-sm"
          >
            REGISTER →
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={handleSoundToggle}
            className="p-2 text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C]"
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} className="text-slate-400 dark:text-[#565C57]" />}
          </button>

          <button
            onClick={() => {
              playTactileClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 text-slate-900 dark:text-[#F5F5F0] hover:text-emerald-700 dark:hover:text-accent border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-600 dark:bg-accent origin-left opacity-70"
        style={{ scaleX: progressX }}
      />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0B0D0C] border-b border-slate-300 dark:border-[#1A1C1A] px-6 py-6 animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <nav className="flex flex-col gap-4 text-sm mono tracking-widest text-slate-700 dark:text-[#A9ADA9]">
            <button
              onClick={() => scrollToSection('featured-event')}
              className="text-left py-2 hover:text-slate-950 dark:hover:text-[#F5F5F0] border-b border-slate-200 dark:border-[#1A1C1A] uppercase"
            >
              01 // EVENTS (GREENTECH)
            </button>
            <button
              onClick={() => scrollToSection('partners')}
              className="text-left py-2 hover:text-slate-950 dark:hover:text-[#F5F5F0] border-b border-slate-200 dark:border-[#1A1C1A] uppercase"
            >
              02 // PARTNERS
            </button>
            <button
              onClick={() => scrollToSection('organizers')}
              className="text-left py-2 hover:text-slate-950 dark:hover:text-[#F5F5F0] border-b border-slate-200 dark:border-[#1A1C1A] uppercase"
            >
              03 // TEAM
            </button>
            <button
              onClick={() => scrollToSection('event-archive')}
              className="text-left py-2 hover:text-slate-950 dark:hover:text-[#F5F5F0] border-b border-slate-200 dark:border-[#1A1C1A] uppercase"
            >
              04 // PAST ARCHIVE
            </button>
            
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileMenuOpen(false);
                playTactileClick(1000);
              }}
              className="mt-2 w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white dark:bg-accent dark:text-[#050605] mono text-xs font-bold uppercase tracking-wider rounded-none"
            >
              <span>REGISTER FOR IDEATHON →</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

