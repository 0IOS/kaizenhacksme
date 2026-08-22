import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PolyOrb from "./PolyOrb";
import { scrollToId } from "../lib/scroll";
import { Arrow, FadeReveal, MaskReveal, SectionTag } from "./ui";

const META = [
  ["DATE", "24—26 OCT"],
  ["CITY", "NEW DELHI"],
  ["RUNTIME", "48 HOURS"],
  ["CAPACITY", "500+ BUILDERS"],
];

export default function NextEvent() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="event" className="relative px-6 py-28 md:px-10 md:py-36">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/[0.04] blur-[160px]"
      />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center justify-between">
          <SectionTag index="01" label="Upcoming" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-ash">
            EDITION&nbsp;07
          </span>
        </div>

        <motion.div
          ref={ref}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ y }}
          className={`group relative overflow-hidden border bg-panel transition-all duration-700 ${
            hover ? "border-signal/40 shadow-[0_0_120px_rgba(141,255,179,0.12)]" : "border-line"
          }`}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-700 ease-out group-hover:scale-x-100"
          />

          <div className="grid lg:min-h-[78vh] lg:grid-cols-[1.15fr_1fr]">
            <div className="relative flex flex-col justify-between gap-14 p-8 md:p-14">
              <MaskReveal>
                <h2 className="text-[clamp(3.4rem,9vw,9rem)] font-semibold leading-[0.95] tracking-tight text-bone">
                  CODE<span className="text-signal">//</span>FORGE
                </h2>
              </MaskReveal>

              <div className="grid max-w-md grid-cols-2 gap-x-8 gap-y-6">
                {META.map(([k, v], i) => (
                  <FadeReveal key={k} delay={0.15 + i * 0.07}>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-ash">{k}</p>
                    <p className="mt-1 font-mono text-sm tracking-[0.08em] text-bone">
                      {v}
                    </p>
                  </FadeReveal>
                ))}
              </div>

              <FadeReveal delay={0.3}>
                <a
                  href="#register"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#register");
                  }}
                  className="group/reg relative inline-flex items-center gap-5 self-start overflow-hidden border border-signal/50 px-10 py-6 font-mono text-sm tracking-[0.25em] text-signal transition-colors duration-300 hover:text-void"
                >
                  <span className="pointer-events-none absolute inset-0 translate-y-full bg-signal transition-transform duration-400 ease-out group-hover/reg:translate-y-0" />
                  <span className="relative z-10">REGISTER</span>
                  <Arrow className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/reg:translate-x-2" />
                  <span className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-500 group-hover/reg:opacity-50 bg-signal" />
                </a>
              </FadeReveal>
            </div>

            <div className="relative min-h-[46vh] border-t border-line lg:border-l lg:border-t-0">
              <motion.div
                animate={hover ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <PolyOrb active={hover} />
              </motion.div>

              <div
                aria-hidden
                className={`absolute inset-0 bg-signal/[0.03] blur-3xl transition-opacity duration-700 ${
                  hover ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-signal" />
                REGISTRATION OPEN
              </div>
              <p className="pointer-events-none absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.3em] text-ash/60">
                LAT 28.61 / LON 77.20
              </p>
              <p className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] tracking-[0.3em] text-ash/40">
                OBJ_042
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-8 py-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ash md:px-14">
            <span>FREE ENTRY / TEAMS OF 2—4</span>
            <span className="hidden sm:inline">FOOD + SWAG + PRIZE POOL ₹800K</span>
            <span className="text-signal">SEATS FILL FAST</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
