import { useRef, useState } from "react";
import { scrollToId } from "../lib/scroll";
import { Arrow } from "./ui";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  return (
    <section
      id="register"
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setGlow({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      className="relative flex min-h-svh cursor-crosshair flex-col items-center justify-center overflow-hidden border-t border-line"
    >
      <div
        aria-hidden
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(141,255,179,0.09), transparent 65%)`,
        }}
      />
      <div className="bg-grid-fine absolute inset-0 mask-fade-y" aria-hidden />

      <div className="relative z-10 flex flex-col items-center gap-12 px-6 text-center">
        <p className="font-mono text-[11px] tracking-[0.34em] text-ash">
          SEATS ARE LIMITED — CODE//FORGE — 24—26 OCT
        </p>
        <h2 className="select-none text-[clamp(3.4rem,13vw,12rem)] font-semibold uppercase leading-[0.92] tracking-tight">
          <span className="block glow-signal text-signal">Ready</span>
          <span className="block text-bone">To Build?</span>
        </h2>
        <button
          onClick={() => scrollToId("#event")}
          className="group relative inline-flex items-center gap-5 overflow-hidden border border-signal/50 px-12 py-7 font-mono text-sm tracking-[0.25em] text-signal transition-colors duration-300 hover:text-void"
        >
          <span className="pointer-events-none absolute inset-0 translate-y-full bg-signal transition-transform duration-400 ease-out group-hover:translate-y-0" />
          <span className="relative z-10">NEXT EVENT</span>
          <Arrow className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
          <span className="pointer-events-none absolute inset-0 bg-signal opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
        </button>
      </div>

      <p className="absolute bottom-8 font-mono text-[10px] tracking-[0.3em] text-ash/40">
        NO CV NEEDED — JUST SHIP
      </p>
    </section>
  );
}
