import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { Volume2, VolumeX, Menu, X, Sun, Moon } from 'lucide-react';
import { playTactileClick, toggleSound, isSoundEnabled } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { REGISTRATION_URL } from '../data/mockData';
import { useActiveSection } from '../lib/motion';
import logoUrl from '../../assets/image.png';

interface NavbarProps {
  onOpenPartners?: () => void;
}

const SECTION_IDS = ['featured-event', 'partners', 'organizers', 'event-archive'];

const NAV_LINKS = [
  { id: 'featured-event', label: 'Events' },
  { id: 'partners', label: 'Partners' },
  { id: 'organizers', label: 'Team' },
  { id: 'event-archive', label: 'Archive' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenPartners }) => {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();

  const activeSection = useActiveSection(SECTION_IDS);

  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 130, damping: 26, mass: 0.4 });

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
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

  const renderNavLink = (id: string, label: string, mobile: boolean) => {
    const isActive = activeSection === id;
    if (mobile) {
      return (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={`text-left py-2.5 border-b transition-colors uppercase flex items-center justify-between cursor-pointer ${
            isActive
              ? 'text-emerald-700 dark:text-accent border-emerald-600/40 dark:border-accent/30'
              : 'text-slate-700 dark:text-[#A9ADA9] hover:text-slate-950 dark:hover:text-[#F5F5F0] border-slate-200 dark:border-[#1A1C1A]'
          }`}
        >
          <span>{label}</span>
          <span
            className={`w-1 h-1 rounded-full transition-opacity ${
              isActive ? 'bg-emerald-600 dark:bg-accent opacity-100' : 'opacity-0'
            }`}
          />
        </button>
      );
    }
    return (
      <button
        key={id}
        onClick={() => scrollToSection(id)}
        aria-current={isActive ? 'true' : undefined}
        className={`relative py-1 uppercase transition-colors cursor-pointer ${
          isActive
            ? 'text-emerald-700 dark:text-accent'
            : 'text-slate-700 dark:text-[#A9ADA9] hover:text-slate-950 dark:hover:text-[#F5F5F0]'
        }`}
      >
        {label}
        {isActive && (
          <motion.span
            layoutId={reduced ? undefined : 'nav-active-underline'}
            className="absolute -bottom-1 left-0 right-0 h-px bg-emerald-600 dark:bg-accent"
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
        )}      </button>
    );
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#050605]/90 backdrop-blur-md border-b border-slate-300 dark:border-[#1A1C1A] py-3 shadow-sm'
          : 'bg-white/60 dark:bg-[#050605]/40 backdrop-blur-xs py-5 border-b border-transparent'
      }`}
    >
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
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
          <img
            src={logoUrl}
            alt="Kaizen Hacks logo"
            className="h-9 w-9 object-contain group-hover:scale-110 transition-transform duration-200"
          />
          <span className="font-display font-bold text-xl tracking-tight text-slate-950 dark:text-[#F5F5F0]">
            KAIZEN HACKS
          </span>
          <span className="hidden sm:inline-block text-[10px] mono text-emerald-700 dark:text-accent bg-emerald-50 dark:bg-accent/10 px-2 py-0.5 border border-emerald-300 dark:border-accent/20 font-bold">
            SPRINT // 2026
          </span>
        </a>

        {/* Desktop Nav Right */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <nav className="flex items-center gap-5 xl:gap-7 text-xs uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] font-medium mono">
            {NAV_LINKS.map((link) => renderNavLink(link.id, link.label, false))}
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
            className="group relative bg-emerald-600 hover:bg-emerald-700 dark:bg-accent dark:text-[#050605] dark:hover:bg-[#B7FFC9] text-white px-5 py-2 font-bold tracking-normal rounded-none transition-all duration-200 cursor-pointer text-xs mono shadow-sm hover:shadow-md hover:-translate-y-px inline-flex items-center gap-2"
          >
            REGISTER
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
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
            className="hidden sm:block p-2 text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C]"
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} className="text-slate-400 dark:text-[#565C57]" />}
          </button>

          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1000, 0.05)}
            className="sm:hidden bg-emerald-600 dark:bg-accent text-white dark:text-[#050605] px-3 py-2 mono text-[10px] font-bold uppercase"
            aria-label="Register for the ideathon"
          >
            REGISTER →
          </a>

          <button
            onClick={() => {
              playTactileClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-expanded={mobileMenuOpen}
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
        <div className="lg:hidden bg-white dark:bg-[#0B0D0C] border-b border-slate-300 dark:border-[#1A1C1A] px-6 py-6 anim-drawer shadow-lg">
          <nav className="flex flex-col gap-1 text-sm mono tracking-widest text-slate-700 dark:text-[#A9ADA9]">
            {NAV_LINKS.map((link, i) =>
              renderNavLink(link.id, `0${i + 1} // ${labelFor(link.label)}`, true)
            )}

            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileMenuOpen(false);
                playTactileClick(1000);
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-accent dark:text-[#050605] dark:hover:opacity-90 mono text-xs font-bold uppercase tracking-wider rounded-none transition-colors"
            >
              <span>REGISTER FOR IDEATHON →</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

const labelFor = (label: string): string => {
  switch (label) {
    case 'Events':
      return 'EVENTS (GREENTECH)';
    case 'Archive':
      return 'PAST ARCHIVE';
    default:
      return label.toUpperCase();
  }
};
