import { CountUp, FadeReveal } from "./ui";

const STATS = [
  { value: 20, suffix: "+", label: "EVENTS", note: "since 2023" },
  { value: 5, suffix: "K+", label: "BUILDERS", note: "in community" },
  { value: 3.2, suffix: "M", label: "PRIZES ₹", decimals: 1, note: "awarded" },
  { value: 48, suffix: "H", label: "AVG BUILD TIME", note: "non-stop" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-line">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <FadeReveal
            key={s.label}
            delay={i * 0.08}
            className={`flex flex-col gap-1 border-line px-6 py-10 md:px-10 ${
              i !== 0 ? "border-l" : ""
            } ${i >= 2 ? "max-lg:border-t max-lg:[&:nth-child(odd)]:border-l-0" : ""}`}
          >
            <span className="text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-none tracking-tight text-bone">
              <CountUp
                value={s.value}
                suffix={s.suffix}
                decimals={s.decimals ?? 0}
              />
            </span>
            <span className="font-mono text-[11px] tracking-[0.28em] text-signal">
              {s.label}
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ash/60">
              {s.note}
            </span>
          </FadeReveal>
        ))}
      </div>
    </section>
  );
}
