import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'motion/react';

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 26 },
  down: { y: -26 },
  left: { x: 26 },
  right: { x: -26 },
  none: {},
};

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  scale?: boolean;
  amount?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  scale = false,
  amount = 0.25,
  className,
}) => {
  const reduced = useReducedMotion();
  const hidden = reduced
    ? { opacity: 0 }
    : { opacity: 0, ...OFFSETS[direction], ...(scale ? { scale: 0.98 } : {}) };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
};

export const STAGGER_PARENT = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const STAGGER_CHILD = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const StaggerGroup: React.FC<{ children: React.ReactNode; className?: string; amount?: number }> = ({
  children,
  className,
  amount = 0.15,
}) => (
  <motion.div
    className={className}
    variants={STAGGER_PARENT}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount }}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div className={className} variants={STAGGER_CHILD}>
    {children}
  </motion.div>
);

type ParallaxListener = (nx: number, ny: number) => void;

const parallaxListeners = new Set<ParallaxListener>();
let parallaxBound = false;

const bindParallaxLoop = () => {
  if (parallaxBound || typeof window === 'undefined') return;
  parallaxBound = true;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId: number | null = null;

  const loop = () => {
    currentX += (targetX - currentX) * 0.075;
    currentY += (targetY - currentY) * 0.075;
    parallaxListeners.forEach((l) => l(currentX, currentY));
    const settled =
      Math.abs(targetX - currentX) < 0.0008 && Math.abs(targetY - currentY) < 0.0008;
    rafId = settled ? null : requestAnimationFrame(loop);
  };

  window.addEventListener(
    'mousemove',
    (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
      if (rafId === null) rafId = requestAnimationFrame(loop);
    },
    { passive: true }
  );
};

export function useCursorParallax(strength = 8): { x: MotionValue<number>; y: MotionValue<number> } {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (reduced || typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const listener: ParallaxListener = (nx, ny) => {
      x.set(nx * strength);
      y.set(ny * strength);
    };
    parallaxListeners.add(listener);
    bindParallaxLoop();
    return () => {
      parallaxListeners.delete(listener);
    };
  }, [reduced, strength, x, y]);

  return { x, y };
}

export function useTilt(maxDeg = 2.5) {
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 140, damping: 18, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 140, damping: 18, mass: 0.4 });

  const handlers = useMemo(
    () => ({
      onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
        if (reduced) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * maxDeg * 2);
        rotateX.set(-py * maxDeg * 2);
      },
      onMouseLeave: () => {
        rotateX.set(0);
        rotateY.set(0);
      },
    }),
    [maxDeg, reduced, rotateX, rotateY]
  );

  const style = {
    rotateX,
    rotateY,
    transformPerspective: 1000,
  };

  return { style, handlers };
}

interface ParsedStat {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  grouping: boolean;
}

const parseStatValue = (raw: string): ParsedStat | null => {
  const match = raw.match(/^([^\d]*)([\d][\d.,]*)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  const target = parseFloat(numStr.replace(/,/g, ''));
  if (Number.isNaN(target)) return null;
  return { prefix, target, suffix, decimals, grouping: numStr.includes(',') };
};

const formatStat = (v: number, p: ParsedStat) =>
  `${p.prefix}${v
    .toFixed(p.decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, p.grouping ? ',' : '')}${p.suffix}`;

export const AnimatedStat: React.FC<{ value: string; className?: string }> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const [display, setDisplay] = useState(() => (parsed ? formatStat(parsed.target, parsed) : value));

  useEffect(() => {
    if (!parsed || !inView) return;
    const controls = animate(0, parsed.target, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(formatStat(v, parsed)),
    });
    return () => controls.stop();
  }, [inView, parsed]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

interface SectionDividerProps {
  label?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ label, className = '' }) => (
  <div className={`w-full px-5 sm:px-8 lg:px-12 ${className}`} aria-hidden="true">
    <div className="flex items-center gap-3 sm:gap-4">
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="h-px flex-1 origin-right bg-slate-300 dark:bg-[#161916]"
      />
      <span className="w-1 h-1 bg-emerald-600/60 dark:bg-accent/40" />
      <span className="text-[9px] mono tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/70 whitespace-nowrap">
        {label}
      </span>
      <span className="w-1 h-1 bg-slate-300 dark:bg-[#242825]" />
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="h-px flex-1 origin-left bg-slate-200 dark:bg-[#101210]"
      />
    </div>
  </div>
);

export const CornerBrackets: React.FC<{ light?: boolean }> = ({ light }) => (
  <>
    <span
      aria-hidden="true"
      className={`absolute top-0 left-0 w-3.5 h-3.5 border-t border-l transition-all duration-300 pointer-events-none ${
        light
          ? 'border-emerald-600/0 group-hover:border-emerald-600/80'
          : 'border-accent/0 group-hover:border-accent/70'
      }`}
    />
    <span
      aria-hidden="true"
      className={`absolute top-0 right-0 w-3.5 h-3.5 border-t border-r transition-all duration-300 pointer-events-none ${
        light
          ? 'border-emerald-600/0 group-hover:border-emerald-600/80'
          : 'border-accent/0 group-hover:border-accent/70'
      }`}
    />
    <span
      aria-hidden="true"
      className={`absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l transition-all duration-300 pointer-events-none ${
        light
          ? 'border-emerald-600/0 group-hover:border-emerald-600/80'
          : 'border-accent/0 group-hover:border-accent/70'
      }`}
    />
    <span
      aria-hidden="true"
      className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r transition-all duration-300 pointer-events-none ${
        light
          ? 'border-emerald-600/0 group-hover:border-emerald-600/80'
          : 'border-accent/0 group-hover:border-accent/70'
      }`}
    />
  </>
);
