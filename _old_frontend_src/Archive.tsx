import GenArt from "./GenArt";
import { Arrow, FadeReveal, SectionTag } from "./ui";

type Event = {
  name: string;
  year: string;
  builders: string;
  teams: string;
  mode: "contour" | "matrix" | "arcs";
  seed: number;
  span: string;
  ratio: string;
};

const EVENTS: Event[] = [
  {
    name: "HACK//DELHI",
    year: "2026",
    builders: "1.2K BUILDERS",
    teams: "240 TEAMS",
    mode: "contour",
    seed: 7,
    span: "lg:col-span-7",
    ratio: "aspect-[16/10]",
  },
  {
    name: "SYNTH//RUN",
    year: "2025",
    builders: "900 BUILDERS",
    teams: "150 TEAMS",
    mode: "matrix",
    seed: 13,
    span: "lg:col-span-5 lg:mt-32",
    ratio: "aspect-[4/3]",
  },
  {
    name: "FORGE//NIGHT",
    year: "2024",
    builders: "480 BUILDERS",
    teams: "96 TEAMS",
    mode: "arcs",
    seed: 42,
    span: "lg:col-span-5 lg:col-start-3 lg:-mt-16",
    ratio: "aspect-[16/11]",
  },
];

function ArchiveCard({ e, index }: { e: Event; index: number }) {
  return (
    <FadeReveal
      delay={(index % 3) * 0.1}
      className={`group cursor-pointer ${e.span}`}
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
        <div className={`relative ${e.ratio} overflow-hidden border border-line`}>
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
            <GenArt seed={e.seed} mode={e.mode} />
          </div>
          <span className="absolute left-5 top-5 z-10 font-mono text-[10px] tracking-[0.3em] text-bone/50 mix-blend-difference">
            {String(index + 1).padStart(3, "0")}
          </span>
          <Arrow className="absolute bottom-5 right-5 z-10 h-7 w-7 -translate-x-3 translate-y-3 text-signal opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-signal/0 transition-colors duration-700 group-hover:bg-signal/[0.04]" />
        </div>

        <div className="flex items-start justify-between gap-4 pt-5">
          <h3 className="text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-none tracking-tight text-bone transition-colors duration-300 group-hover:text-mist">
            {e.name}
          </h3>
          <span className="pt-1 font-mono text-sm tracking-[0.2em] text-ash">
            {e.year}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-end overflow-hidden">
          <div className="flex translate-y-2 gap-6 font-mono text-[11px] tracking-[0.22em] text-ash opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-signal">{e.builders}</span>
            <span>{e.teams}</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.28em] text-ash/40 transition-colors duration-500 group-hover:text-ash">
            VIEW ARCHIVE ↗
          </p>
        </div>
      </div>
    </FadeReveal>
  );
}

export default function Archive() {
  return (
    <section id="archive" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex items-end justify-between md:mb-20">
          <SectionTag index="02" label="Archive" />
          <h2 className="text-right text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-none tracking-tight text-stroke-bone select-none">
            PAST EVENTS
          </h2>
        </div>

        <div className="grid gap-x-10 gap-y-16 lg:grid-cols-12 lg:gap-y-8">
          {EVENTS.map((e, i) => (
            <ArchiveCard key={e.name} e={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
