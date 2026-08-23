import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Scroll-scrubbed primitives — fully reversible, transform/opacity   */
/* ------------------------------------------------------------------ */

type ScrubDirection = 'left' | 'right' | 'up' | 'down' | 'diag-left' | 'diag-right' | 'none';

const SCRUB_DELTAS: Record<ScrubDirection, { x: number; y: number }> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  'diag-left': { x: -1, y: 0.55 },
  'diag-right': { x: 1, y: 0.55 },
  none: { x: 0, y: 0 },
};

/** Tracks desktop breakpoint reactively (SSR-safe). */
export function useIsDesktop(minWidth = 1024): boolean {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(min-width: ${minWidth}px)`).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [minWidth]);

  return isDesktop;
}

/** Strict boolean wrapper around useReducedMotion (SSR-safe). */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion();
  return reduced === true;
}

interface ScrubInProps {
  children: React.ReactNode;
  /** Direction the element travels FROM to reach its final position. */
  from?: ScrubDirection;
  /** Travel distance in px on desktop (auto-halved below md). */
  distance?: number;
  /** Initial rotation in degrees. */
  rotate?: number;
  /** Initial scale. */
  scaleFrom?: number;
  /**
   * 0..1 — delays the scrub start so sibling elements can stagger
   * while sharing one scroll timeline.
   */
  lag?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Scroll-scrubbed entrance: the element interpolates from its offset pose to
 * its final layout position as it crosses the lower viewport, and reverses
 * exactly when scrolling back up. Settles at ~70% viewport height and stays
 * pinned to its natural position for the rest of the traversal.
 */
export const ScrubIn: React.FC<ScrubInProps> = ({
  children,
  from = 'up',
  distance = 56,
  rotate = 0,
  scaleFrom = 1,
  lag = 0,
  className,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setCompact(!e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.68'],
  });

  // Apply per-item lag so a shared row can stagger without extra listeners.
  const p = useTransform(scrollYProgress, (v) =>
    lag > 0 ? Math.min(1, Math.max(0, (v - lag) / (1 - lag))) : v
  );

  const d = reduced ? 0 : compact ? Math.round(distance * 0.45) : distance;
  const delta = SCRUB_DELTAS[from];

  /* Interpolate FROM the full offset pose (v=0, element at the lower edge of
     the viewport) TO the exact static layout position (v=1). Elements always
     come to rest at their natural position — never left displaced. */
  const x = useTransform(p, (v) => (1 - v) * delta.x * d);
  const y = useTransform(p, (v) => (1 - v) * delta.y * d);
  const rot = useTransform(p, (v) => (reduced ? 0 : (1 - v) * rotate));
  const scale = useTransform(p, [0, 1], [reduced ? 1 : scaleFrom, 1]);
  /* Reduced motion: content stays fully visible at all times */
  const opacity = useTransform(p, [0, 0.65], [reduced ? 1 : 0, 1]);

  return (
    <motion.div ref={ref} className={className} style={{ x, y, rotate: rot, scale, opacity, ...style }}>
      {children}
    </motion.div>
  );
};

/**
 * Card-grade scrubbed entrance with alternating direction support.
 * Preserves layout classes (h-full etc.) so grids are untouched.
 */
export const ScrubCard: React.FC<
  Omit<ScrubInProps, 'from'> & { index?: number; alternate?: boolean }
> = ({ index = 0, alternate = true, ...props }) => {
  const dir: ScrubDirection = alternate && index % 2 === 1 ? 'right' : 'left';
  return <ScrubIn {...props} from={dir} distance={props.distance ?? 64} rotate={props.rotate ?? 0} scaleFrom={props.scaleFrom ?? 0.97} />;
};

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

export const SectionDivider: React.FC<SectionDividerProps> = ({ label, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.96', 'start 0.78'],
  });

  const scaleXLeft = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0, 1]);
  const scaleXRight = useTransform(scrollYProgress, [0.15, 1], [reduced ? 1 : 0, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.3, 0.9], [reduced ? 1 : 0, 1]);
  const labelX = useTransform(scrollYProgress, (v) => (reduced ? 0 : (1 - v) * 14));

  return (
    <div ref={ref} className={`shell w-full px-5 sm:px-8 lg:px-12 ${className}`} aria-hidden="true">
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.span
          style={{ scaleX: scaleXLeft }}
          className="h-px flex-1 origin-right bg-slate-300 dark:bg-[#161916]"
        />
        <span className="w-1 h-1 bg-emerald-600/60 dark:bg-accent/40" />
        <motion.span
          style={{ opacity: labelOpacity, x: labelX }}
          className="text-[9px] mono tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/70 whitespace-nowrap"
        >
          {label}
        </motion.span>
        <span className="w-1 h-1 bg-slate-300 dark:bg-[#242825]" />
        <motion.span
          style={{ scaleX: scaleXRight }}
          className="h-px flex-1 origin-left bg-slate-200 dark:bg-[#101210]"
        />
      </div>
    </div>
  );
};

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
