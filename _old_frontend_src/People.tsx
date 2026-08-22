import { FadeReveal, SectionTag } from "./ui";

type Person = {
  name: string;
  role: string;
  line: string;
  seedHue: number;
};

const PEOPLE: Person[] = [
  { name: "VARUN", role: "FRONTEND", line: "Interfaces that feel inevitable.", seedHue: 0 },
  { name: "ANANYA", role: "OPERATIONS", line: "Runs 48 hours like clockwork.", seedHue: 1 },
  { name: "KABIR", role: "DESIGN", line: "Black, green. Nothing else.", seedHue: 2 },
  { name: "MEERA", role: "SYSTEMS", line: "Uptime is a personality trait.", seedHue: 3 },
];

function Portrait({ p }: { p: Person }) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden border border-line transition-colors duration-500 hover:border-signal/40">
      <div
        className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        style={{
          background: `radial-gradient(120% 90% at ${25 + p.seedHue * 18}% 20%, #1d211e 0%, #0b0d0c 55%, #050605 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `repeating-linear-gradient(${90 + p.seedHue * 22}deg, transparent 0px, transparent 34px, rgba(245,245,240,0.035) 35px)`,
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0 flex select-none items-center justify-center text-[clamp(6rem,11vw,10rem)] font-semibold leading-none text-stroke-faint transition-all duration-700 group-hover:text-stroke-signal"
      >
        {p.name[0]}
      </span>
      <span
        aria-hidden
        className="absolute left-5 top-5 h-1.5 w-1.5 rounded-full bg-ash/40 transition-colors duration-500 group-hover:bg-signal"
      />

      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-void via-void/95 to-transparent p-5 pt-12 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
        <p className="text-sm leading-snug text-bone">{p.line}</p>
        <div className="mt-4 flex gap-4 font-mono text-[10px] tracking-[0.25em] text-ash">
          <span className="transition-colors hover:text-signal cursor-pointer">X</span>
          <span className="transition-colors hover:text-signal cursor-pointer">GH</span>
          <span className="transition-colors hover:text-signal cursor-pointer">IN</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-void/70 px-5 py-4 backdrop-blur-sm">
        <span className="font-mono text-xs tracking-[0.3em] text-bone">{p.name}</span>
        <span className="font-mono text-[10px] tracking-[0.25em] text-signal">
          {p.role}
        </span>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_60px_rgba(141,255,179,0.15)] transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
  );
}

export default function People() {
  return (
    <section id="team" className="relative border-t border-line px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex items-end justify-between md:mb-20">
          <SectionTag index="03" label="Organizers" />
          <h2 className="text-right text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-none tracking-tight text-bone select-none">
            THE&nbsp;PEOPLE
          </h2>
        </div>
        <FadeReveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {PEOPLE.map((p) => (
              <Portrait key={p.name} p={p} />
            ))}
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
