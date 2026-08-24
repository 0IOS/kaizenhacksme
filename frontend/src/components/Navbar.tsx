import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { Volume2, VolumeX, Menu, X, Sun, Moon } from 'lucide-react';
import { playTactileClick, toggleSound, isSoundEnabled } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { REGISTRATION_URL } from '../data/mockData';
import { useActiveSection, EASE_OUT } from '../lib/motion';

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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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

  /* Scroll lock + Escape while the mobile sheet is open */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [mobileMenuOpen]);

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
    if (!mobileMenuOpen) {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    /* Defer until the scroll-lock effect has cleaned up */
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
    });
  };

  const renderNavLink = (id: string, label: string, mobile: boolean, index?: number) => {
    const isActive = activeSection === id;
    if (mobile) {
      return (
        <motion.button
          key={id}
          initial={reduced ? false : { opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.08 + (index ?? 0) * 0.06, ease: EASE_OUT }}
          onClick={() => scrollToSection(id)}
          aria-current={isActive ? 'true' : undefined}
          className={`group text-left py-4 sm:py-5 border-b transition-colors uppercase flex items-baseline gap-4 cursor-pointer ${
            isActive
              ? 'text-emerald-700 dark:text-accent border-emerald-600/40 dark:border-accent/30'
              : 'text-slate-800 dark:text-[#A9ADA9] hover:text-slate-950 dark:hover:text-[#F5F5F0] border-slate-200 dark:border-[#1A1C1A]'
          }`}
        >
          <span className={`mono text-[10px] tracking-[0.2em] ${isActive ? 'text-emerald-600 dark:text-accent' : 'text-slate-400 dark:text-[#565C57]'}`}>
            {String((index ?? 0) + 1).padStart(2, '0')}
          </span>
          <span className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-none">
            {labelFor(label)}
          </span>
          <span className="ml-auto self-center font-mono text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-600 dark:text-accent" aria-hidden="true">→</span>
        </motion.button>
      );
    }
    return (
      <button
        key={id}
        onClick={() => scrollToSection(id)}
        aria-current={isActive ? 'true' : undefined}
        className={`relative py-1 uppercase transition-colors cursor-pointer group/link inline-flex items-start gap-1 ${
          isActive
            ? 'text-emerald-700 dark:text-accent'
            : 'text-slate-700 dark:text-[#A9ADA9] hover:text-slate-950 dark:hover:text-[#F5F5F0]'
        }`}
      >
        <span className={`mono text-[8px] tracking-[0.12em] mt-px transition-colors ${isActive ? 'text-emerald-600 dark:text-accent' : 'text-slate-400 dark:text-[#565C57] group-hover/link:text-slate-500 dark:group-hover/link:text-[#565C57]'}`}>
          {String(NAV_LINKS.findIndex((l) => l.id === id) + 1).padStart(2, '0')}
        </span>
        {label}
        {isActive && (
          <motion.span
            layoutId={reduced ? undefined : 'nav-active-underline'}
            className="absolute -bottom-1 left-0 right-0 h-px bg-emerald-600 dark:bg-accent"
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
        )}
      </button>
    );
  };

  /* Deterministic header background — Tailwind bg utilities on the same element
     resolve by stylesheet order, not state, so state lives inline instead. */
  const headerBg = (() => {
    const dark = theme === 'dark';
    if (mobileMenuOpen) return dark ? '#0B0D0C' : '#F2F7F1';
    if (isScrolled) return dark ? 'rgba(5, 6, 5, 0.90)' : 'rgba(242, 247, 241, 0.95)';
    return dark ? 'rgba(5, 6, 5, 0.40)' : 'rgba(237, 243, 236, 0.55)';
  })();

  return (
    <header
      id="main-navbar"
      style={{ backgroundColor: headerBg }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled && !mobileMenuOpen
          ? 'backdrop-blur-md border-b border-slate-300 dark:border-[#1A1C1A] py-3 shadow-sm'
          : `backdrop-blur-xs py-5 border-b border-transparent ${mobileMenuOpen ? '!border-slate-300 dark:!border-[#1A1C1A]' : ''}`
      }`}
    >
      <div className="relative z-40 w-full max-w-[1800px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Left */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            playTactileClick();
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-3 select-none"
        >
          <div className="w-2.5 h-2.5 bg-emerald-600 dark:bg-accent group-hover:scale-110 transition-transform duration-200" />
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
            {NAV_LINKS.map((link, i) => renderNavLink(link.id, link.label, false, i))}
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:border-emerald-600/40 dark:hover:border-accent/30 p-1.5 cursor-pointer border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} className="text-accent" /> : <Moon size={15} className="text-emerald-700" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute micro-sounds' : 'Enable micro-sounds'}
            className="text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:border-emerald-600/40 dark:hover:border-accent/30 p-1.5 cursor-pointer border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C] transition-colors"
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
            className="cta-solid group px-5 py-2.5 tracking-widest text-xs"
          >
            REGISTER
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={handleSoundToggle}
            className="hidden sm:block p-2 text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C]"
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} className="text-slate-400 dark:text-[#565C57]" />}
          </button>

          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1000, 0.05)}
            className="sm:hidden cta-solid px-3 py-2 text-[10px] tracking-wider"
            aria-label="Register for the ideathon"
          >
            REGISTER →
          </a>

          <button
            ref={menuButtonRef}
            onClick={() => {
              playTactileClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-panel"
            className="p-2 text-slate-900 dark:text-[#F5F5F0] hover:text-emerald-700 dark:hover:text-accent border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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

      {/* Mobile Full-Screen Menu Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-panel"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="lg:hidden fixed inset-0 top-0 z-30 bg-[#F2F7F1] dark:bg-[#0B0D0C] overflow-y-auto overscroll-contain"
          >
            {/* Clear the fixed header bar */}
            <div className="h-[68px] sm:h-[76px]" aria-hidden="true" />

            {/* Ghost numeral backdrop */}
            <div aria-hidden="true" className="ghost-numeral absolute -bottom-8 -right-4 text-[220px] opacity-[0.04] dark:opacity-[0.05] pointer-events-none select-none">
              KZ
            </div>
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-56 grid-subtle opacity-40 dark:opacity-25 grid-fade-y pointer-events-none" />

            <nav className="relative z-10 flex flex-col px-6 sm:px-8 pt-6 pb-10 min-h-full">
              <div className="mono text-[9px] tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/80 mb-2">
                MENU.INDEX // KAIZEN_SYSTEM
              </div>

              <div className="flex flex-col text-sm mono tracking-widest text-slate-700 dark:text-[#A9ADA9]">
                {NAV_LINKS.map((link, i) => renderNavLink(link.id, link.label, true, i))}

                <motion.a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    playTactileClick(1000);
                  }}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.34, ease: EASE_OUT }}
                  className="mt-8 w-full cta-solid py-4 text-xs tracking-widest"
                >
                  <span>REGISTER FOR IDEATHON</span>
                  <span aria-hidden="true">→</span>
                </motion.a>
              </div>

              <motion.div
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.42 }}
                className="mt-auto pt-10 flex items-center justify-between mono text-[9px] tracking-[0.22em] uppercase text-slate-400 dark:text-[#3D443D]/70"
                aria-hidden="true"
              >
                <span>NODE: DELHI_KALKAJI</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block" />
                  SYS_OK
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
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
