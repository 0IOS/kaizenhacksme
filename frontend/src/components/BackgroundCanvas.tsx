import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface ParticleCfg {
  left: string;
  top: string;
  size: number;
  dx: string;
  dy: string;
  dur: string;
  delay: string;
  o0: number;
  o1: number;
  color: string;
}

const makeParticles = (count: number): ParticleCfg[] =>
  Array.from({ length: count }, (_, i) => {
    const upward = Math.random() > 0.3;
    const diagonal = !upward && Math.random() > 0.5;
    const emerald = Math.random() > 0.55;
    return {
      left: `${(Math.random() * 100).toFixed(2)}%`,
      top: `${(Math.random() * 100).toFixed(2)}%`,
      size: Math.random() > 0.75 ? 2.5 : 1.5,
      dx: diagonal ? `${(Math.random() * 60 - 30).toFixed(1)}px` : `${(Math.random() * 16 - 8).toFixed(1)}px`,
      dy: upward ? `-${(40 + Math.random() * 90).toFixed(1)}px` : `${(20 + Math.random() * 50).toFixed(1)}px`,
      dur: `${(16 + Math.random() * 18).toFixed(1)}s`,
      delay: `-${(Math.random() * 30).toFixed(1)}s`,
      o0: +(0.04 + Math.random() * 0.1).toFixed(2),
      o1: +(0.14 + Math.random() * 0.26).toFixed(2),
      color: emerald ? 'var(--color-accent)' : '#9BA39C',
    };
  });

export const BackgroundCanvas: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const reduced = useReducedMotion();

  const spotRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);

  const { scrollY } = useScroll();
  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
  const gridY = useTransform(scrollY, (v) => (reduced ? 0 : clamp(v * -0.03, -300, 300)));
  const glowY = useTransform(scrollY, (v) => (reduced ? 0 : clamp(v * -0.065, -230, 230)));
  const particlesY = useTransform(scrollY, (v) => (reduced ? 0 : clamp(v * -0.105, -170, 170)));

  const particles = useMemo<ParticleCfg[]>(
    () => makeParticles(typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 16),
    []
  );

  useEffect(() => {
    if (reduced || typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let rafId: number | null = null;
    let tx = -2000;
    let ty = -2000;
    let cx = -2000;
    let cy = -2000;
    let initialized = false;
    let lastTextUpdate = 0;

    const tick = () => {
      cx += (tx - cx) * 0.075;
      cy += (ty - cy) * 0.075;

      if (spotRef.current) {
        spotRef.current.style.transform = `translate3d(${cx - 225}px, ${cy - 225}px, 0)`;
      }

      const now = performance.now();
      if (coordsRef.current && now - lastTextUpdate > 180) {
        lastTextUpdate = now;
        const lat = (28.6139 + (cy / window.innerHeight) * 0.05).toFixed(4);
        const lng = (77.2090 + (cx / window.innerWidth) * 0.05).toFixed(4);
        coordsRef.current.textContent = `${lat}° N, ${lng}° E`;
      }

      if (Math.abs(tx - cx) > 0.08 || Math.abs(ty - cy) > 0.08) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const handleMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!initialized) {
        cx = tx;
        cy = ty;
        initialized = true;
      }
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  const gridImage = isDark
    ? 'linear-gradient(to right, #101310 1px, transparent 1px), linear-gradient(to bottom, #101310 1px, transparent 1px)'
    : 'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)';
  const fineImage = isDark
    ? 'radial-gradient(circle at 70% 28%, rgba(141, 255, 179, 0.05) 0%, transparent 62%)'
    : 'radial-gradient(circle at 70% 28%, rgba(5, 150, 105, 0.07) 0%, transparent 62%)';

  const glowColor = isDark ? '141, 255, 179' : '5, 150, 105';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      <div className={`absolute inset-0 transition-colors duration-300 ${isDark ? 'bg-[#050605]' : 'bg-[#F1F3F6]'}`} />

      {/* Layer 1 — technical grid: slow drift + scroll parallax */}
      <motion.div style={{ y: gridY }} className="absolute inset-x-0 -top-80 -bottom-80">
        <div
          className={`absolute inset-0 ${reduced ? '' : 'grid-drift'}`}
          style={{
            opacity: isDark ? 0.75 : 0.6,
            backgroundImage: gridImage,
            backgroundSize: '44px 44px',
          }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: fineImage }} />
      </motion.div>

      {/* Layer 2 — atmospheric emerald glow */}
      <motion.div style={{ y: glowY }} className="absolute inset-x-0 -top-64 -bottom-64">
        <div
          className={`absolute w-[900px] h-[900px] rounded-full blur-[160px] ${reduced ? '' : 'glow-layer'}`}
          style={{
            top: '-12%',
            left: '-14%',
            background: `radial-gradient(circle, rgba(${glowColor}, ${isDark ? 0.075 : 0.06}) 0%, transparent 65%)`,
            ['--glow-min' as string]: isDark ? 0.6 : 0.5,
            ['--glow-max' as string]: 1,
            animationDelay: '0s',
          }}
        />
        <div
          className={`absolute w-[760px] h-[760px] rounded-full blur-[150px] ${reduced ? '' : 'glow-layer'}`}
          style={{
            top: '34%',
            right: '-18%',
            background: `radial-gradient(circle, rgba(${glowColor}, ${isDark ? 0.055 : 0.045}) 0%, transparent 65%)`,
            ['--glow-min' as string]: 0.45,
            ['--glow-max' as string]: 0.95,
            animationDelay: '-6s',
            animationDuration: '17s',
          }}
        />
        <div
          className={`absolute w-[880px] h-[880px] rounded-full blur-[170px] ${reduced ? '' : 'glow-layer'}`}
          style={{
            bottom: '-22%',
            left: '24%',
            background: `radial-gradient(circle, rgba(${glowColor}, ${isDark ? 0.065 : 0.05}) 0%, transparent 65%)`,
            ['--glow-min' as string]: 0.5,
            ['--glow-max' as string]: 1,
            animationDelay: '-11s',
            animationDuration: '21s',
          }}
        />
      </motion.div>

      {/* Layer 3 — floating technical particles */}
      <motion.div style={{ y: particlesY }} className="absolute inset-x-0 -top-48 -bottom-48">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.o0,
              animationDuration: p.dur,
              animationDelay: p.delay,
              ['--p-dx' as string]: p.dx,
              ['--p-dy' as string]: p.dy,
              ['--p-o0' as string]: p.o0,
              ['--p-o1' as string]: p.o1,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 4 — signal scanline sweep */}
      {!reduced && (
        <div
          className="scanline absolute left-0 right-0 h-28 hidden md:block"
          style={{
            top: '-20vh',
            ['--scan-dur' as string]: '19s',
            ['--scan-op' as string]: isDark ? 0.5 : 0.35,
            animationDelay: '4s',
            background: `linear-gradient(to bottom, transparent, rgba(${glowColor}, ${isDark ? 0.09 : 0.07}), transparent)`,
          }}
        />
      )}

      {/* Ambient cursor spotlight */}
      <div
        ref={spotRef}
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none will-change-transform"
        style={{
          opacity: isDark ? 0.08 : 0.05,
          background: `radial-gradient(circle, rgba(${glowColor}, 0.9) 0%, rgba(${glowColor}, 0.05) 50%, transparent 75%)`,
          transform: 'translate3d(-2000px, -2000px, 0)',
        }}
      />

      {/* Decorative Coordinates */}
      <div className="absolute top-1/2 left-3 mono text-[9px] text-slate-400 dark:text-[#1A1C1A] -rotate-90 origin-left tracking-widest hidden xl:block">
        LAT: 28.6139° N / LONG: 77.2090° E
      </div>
    </div>
  );
};
