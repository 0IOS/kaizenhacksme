import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { scrollToId } from "../lib/scroll";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      className={className}
      aria-hidden
    >
      <path d="M5 12h13" />
      <path d="M12 5.5 18.5 12 12 18.5" />
    </svg>
  );
}

export function MonoLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`font-mono text-[11px] tracking-[0.28em] uppercase ${className}`}>
      {children}
    </p>
  );
}

export function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 font-mono text-[11px] tracking-[0.3em] uppercase text-ash">
      <span className="text-signal">/{index}</span>
      <span>{label}</span>
      <span className="h-px w-16 bg-line" aria-hidden />
    </div>
  );
}

type BtnProps = {
  children: ReactNode;
  target?: string;
  href?: string;
  size?: "sm" | "lg";
  solid?: boolean;
  className?: string;
};

export function SignalButton({
  children,
  target,
  href,
  size = "sm",
  solid = false,
  className = "",
}: BtnProps) {
  const pad = size === "lg" ? "px-10 py-6 text-sm" : "px-6 py-3 text-xs";
  return (
    <a
      href={href ?? target}
      onClick={
        target
          ? (e) => {
              e.preventDefault();
              scrollToId(target);
            }
          : undefined
      }
      data-cursor="view"
      className={`group/btn relative inline-flex items-center gap-4 overflow-hidden border font-mono uppercase tracking-[0.25em] transition-colors duration-300 ${
        solid
          ? "border-signal bg-signal text-void hover:bg-mist"
          : "border-signal/40 text-signal hover:text-void"
      } ${pad} ${className}`}
    >
      {!solid && (
        <span
          aria-hidden
          className="absolute inset-0 -z-0 translate-y-full bg-signal transition-transform duration-400 ease-out group-hover/btn:translate-y-0"
        />
      )}
      <span className="relative z-10 transition-transform duration-400 group-hover/btn:-translate-x-1">
        {children}
      </span>
      <Arrow className="relative z-10 h-4 w-4 transition-all duration-400 group-hover/btn:translate-x-1.5" />
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-0 opacity-0 blur-xl transition-opacity duration-500 group-hover/btn:opacity-40 ${
          solid ? "bg-signal" : "bg-signal/60"
        }`}
      />
    </a>
  );
}

export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function FadeReveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  className = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) =>
        setDisplay(
          v.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }),
        ),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

export function StatusDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
      <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-signal" />
      {label}
    </span>
  );
}
