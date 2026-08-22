import { useEffect, useRef } from "react";

type Mode = "contour" | "matrix" | "arcs";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function GenArt({
  seed,
  mode,
  className = "",
}: {
  seed: number;
  mode: Mode;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rand = mulberry32(seed);
    let w = 0;
    let h = 0;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = "#0b0d0c";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(245,245,240,0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 56) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
      }
      for (let y = 0; y <= h; y += 56) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
      ctx.stroke();

      if (mode === "contour") {
        const lines = 26;
        const freq = 1.2 + rand() * 2;
        const ampBase = h * (0.05 + rand() * 0.08);
        const accentLine = Math.floor(rand() * lines);
        for (let i = 0; i < lines; i++) {
          const p = i / (lines - 1);
          const yBase = h * (0.12 + p * 0.76);
          const phase = rand() * Math.PI * 2;
          const isAccent = i === accentLine;
          ctx.strokeStyle = isAccent
            ? "rgba(141,255,179,0.85)"
            : `rgba(245,245,240,${0.06 + p * 0.12})`;
          ctx.lineWidth = isAccent ? 1.4 : 1;
          ctx.beginPath();
          for (let x = 0; x <= w; x += 4) {
            const n =
              Math.sin((x / w) * freq * Math.PI * 2 + phase) *
                ampBase * (1 - Math.abs(p - 0.5)) +
              Math.sin((x / w) * freq * 3.7 * Math.PI + phase * 2) * ampBase * 0.35;
            const y = yBase + n;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        const ox = w * (0.15 + rand() * 0.7);
        const oy = h * (0.15 + rand() * 0.7);
        ctx.fillStyle = "rgba(141,255,179,0.9)";
        ctx.fillRect(ox - 4, oy - 0.5, 8, 1);
        ctx.fillRect(ox - 0.5, oy - 4, 1, 8);
      }

      if (mode === "matrix") {
        const cols = Math.ceil(w / 34);
        const rows = Math.ceil(h / 34);
        const cx = rand() * w;
        const cy = rand() * h;
        const maxD = Math.hypot(w, h) * 0.7;
        for (let i = 0; i <= cols; i++) {
          for (let j = 0; j <= rows; j++) {
            const x = i * 34;
            const y = j * 34;
            const d = Math.hypot(x - cx, y - cy) / maxD;
            const wave = Math.sin(d * Math.PI * 3 - rand() * 0.9) * 0.5 + 0.5;
            const a = wave * (1 - d) * 0.55;
            if (a < 0.03) continue;
            ctx.fillStyle =
              d < 0.18 ? `rgba(141,255,179,${a + 0.25})` : `rgba(245,245,240,${a})`;
            const s = 1.2 + wave * (1 - d) * 3;
            ctx.beginPath();
            ctx.arc(x, y, s / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        const ringR = Math.min(w, h) * (0.18 + rand() * 0.14);
        ctx.strokeStyle = "rgba(141,255,179,0.5)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (mode === "arcs") {
        const cx = w * (0.3 + rand() * 0.4);
        const cy = h * (0.3 + rand() * 0.4);
        const count = 16;
        const maxR = Math.hypot(w, h) * 0.62;
        const accentIdx = Math.floor(rand() * count);
        for (let i = 0; i < count; i++) {
          const r = ((i + 1) / count) * maxR;
          const start = rand() * Math.PI * 2;
          const sweep = 0.6 + rand() * 2.4;
          const isAccent = i === accentIdx;
          ctx.strokeStyle = isAccent
            ? "rgba(141,255,179,0.85)"
            : `rgba(245,245,240,${0.05 + (i / count) * 0.13})`;
          ctx.lineWidth = isAccent ? 1.5 : 1;
          ctx.beginPath();
          ctx.arc(cx, cy, r, start, start + sweep);
          ctx.stroke();
          const ex = cx + Math.cos(start + sweep) * r;
          const ey = cy + Math.sin(start + sweep) * r;
          ctx.fillStyle = isAccent
            ? "rgba(141,255,179,0.9)"
            : "rgba(169,173,169,0.4)";
          ctx.fillRect(ex - 1.5, ey - 1.5, 3, 3);
        }
      }

      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(169,173,169,0.28)";
      ctx.fillText(`FIG.${String(seed).padStart(2, "0")}`, 16, h - 16);
      ctx.fillText(
        `${w}×${h}`,
        w - 64,
        h - 16,
      );
      ctx.strokeStyle = "rgba(245,245,240,0.10)";
      ctx.strokeRect(12.5, 12.5, w - 25, h - 25);
    };

    render();
    const ro = new ResizeObserver(render);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [seed, mode]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
