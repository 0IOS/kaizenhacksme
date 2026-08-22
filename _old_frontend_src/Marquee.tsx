import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS = ["BUILDERS", "IDEAS", "SHIPPED"];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-12%"]);

  const row = (
    <>
      {WORDS.concat(WORDS).map((w, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span
            className={`whitespace-nowrap px-8 text-[clamp(3rem,7vw,6.5rem)] font-semibold uppercase leading-none tracking-tight ${
              i % 2 === 0 ? "text-stroke-faint" : "text-bone/90"
            }`}
          >
            {w}
          </span>
          <span className="h-3 w-3 rotate-45 bg-signal/70" aria-hidden />
        </span>
      ))}
    </>
  );

  return (
    <div ref={ref} className="relative overflow-hidden py-14 md:py-20" aria-hidden>
      <motion.div style={{ x }} className="w-max">
        <div className="flex w-max animate-marquee-slow">
          <div className="flex">{row}</div>
          <div className="flex" aria-hidden>
            {row}
          </div>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
