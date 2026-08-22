import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskReveal } from "./ui";

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-line px-6 py-32 md:py-48"
    >
      <h2 className="mx-auto max-w-[1600px] select-none font-medium uppercase leading-[0.95] tracking-tight">
        <motion.div style={{ x: x1 }}>
          <MaskReveal>
            <span className="block text-[clamp(3rem,11vw,10.5rem)] text-bone">Ideas</span>
          </MaskReveal>
        </motion.div>
        <motion.div style={{ x: x2 }}>
          <MaskReveal delay={0.08} className="pl-[8vw]">
            <span className="block text-[clamp(3rem,11vw,10.5rem)] text-bone">Need</span>
          </MaskReveal>
        </motion.div>
        <MaskReveal delay={0.16}>
          <span className="block text-[clamp(3rem,11vw,10.5rem)] text-stroke-bone">
            A&nbsp;Place
          </span>
        </MaskReveal>
        <MaskReveal delay={0.24}>
          <span className="glow-signal block text-[clamp(3rem,11vw,10.5rem)] text-signal">
            To&nbsp;Happen.
          </span>
        </MaskReveal>
      </h2>
    </section>
  );
}
