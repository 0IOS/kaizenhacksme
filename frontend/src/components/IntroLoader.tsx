import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playTactileClick } from '../utils/audio';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOTING KAIZEN CORE');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2300; // 2.3 seconds

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStatusText('INITIALIZING RUNTIME & MESH GRID...');
      } else if (pct < 65) {
        setStatusText('CALIBRATING SPRINT MATRIX // DELHI NCR');
      } else if (pct < 95) {
        setStatusText('SYNCHRONIZING BUILDER ARENA...');
      } else {
        setStatusText('SYSTEM ONLINE // READY TO SHIP');
      }

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 200);
      }
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearInterval(timer);
        setVisible(false);
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    playTactileClick();
    setVisible(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-[#050605] dark:bg-[#050605] light:bg-[#F5F6F8] text-[#F5F5F0] dark:text-[#F5F5F0] light:text-[#0B0D0C] select-none cursor-pointer"
        >
          {/* Top Bar Status */}
          <div className="flex items-center justify-between text-xs mono text-[#A9ADA9] dark:text-[#A9ADA9] light:text-[#565C57]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-bold text-accent">KAIZEN HACKS</span>
              <span className="opacity-40">/</span>
              <span className="hidden sm:inline">PROTOCOL V2.6</span>
            </div>
            <div className="text-[10px] tracking-widest uppercase opacity-75 hover:opacity-100 transition-opacity">
              [ CLICK ANYWHERE OR ESC TO ENTER ]
            </div>
          </div>

          {/* Center Cinematic Calibration Core */}
          <div className="max-w-xl mx-auto w-full my-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/30 text-xs mono text-accent font-bold uppercase tracking-widest">
              <span>● LOADING ARENA ENVIRONMENT</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tight uppercase text-[#F5F5F0] dark:text-[#F5F5F0] light:text-[#0B0D0C]">
              KAIZEN HACKS
            </h1>

            {/* Monospace Telemetry Details */}
            <p className="text-xs sm:text-sm mono text-[#A9ADA9] dark:text-[#A9ADA9] light:text-[#565C57] tracking-wider">
              {statusText}
            </p>

            {/* High-Precision Progress Bar */}
            <div className="w-full bg-[#111412] dark:bg-[#111412] light:bg-[#E2E5E9] border border-[#1A1C1A] dark:border-[#1A1C1A] light:border-[#CBD2D9] h-2 p-0.5 relative overflow-hidden">
              <motion.div
                className="bg-accent h-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] mono text-[#A9ADA9] dark:text-[#A9ADA9] light:text-[#565C57]">
              <span>NODE: DELHI_NCR</span>
              <span className="font-bold text-accent">{progress}%</span>
              <span>48H INTENSIVE</span>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className="flex items-center justify-between text-[10px] mono text-[#565C57] dark:text-[#565C57] light:text-[#9CA3AF]">
            <div>LAT: 28.6139° N // LONG: 77.2090° E</div>
            <div>CONTINUOUS BUILDER EVOLUTION</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
