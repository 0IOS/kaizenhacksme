import { useEffect, useRef } from "react";

type Props = {
  active?: boolean;
  className?: string;
};

function fibonacciSphere(n: number) {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }
  return pts;
}

export default function PolyOrb({ active = false, className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = 42;
    const pts = fibonacciSphere(N);
    const edges: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i][0] - pts[j][0];
        const dy = pts[i][1] - pts[j][1];
        const dz = pts[i][2] - pts[j][2];
        if (dx * dx + dy * dy + dz * dz < 0.22) edges.push([i, j]);
      }
    }

    let w = 0;
    let h = 0;
    let raf = 0;
    let rot = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      rot += activeRef.current ? 0.0045 : 0.0018;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.36;
      const cosY = Math.cos(rot);
      const sinY = Math.sin(rot);
      const tiltX = 0.45;
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      const projected = pts.map(([x, y, z]) => {
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const persp = 1 / (1.9 - z2);
        return { x: cx + x1 * R * persp * 1.9, y: cy + y2 * R * persp * 1.9, z: z2 };
      });

      for (const [a, b] of edges) {
        const p1 = projected[a];
        const p2 = projected[b];
        const depth = (p1.z + p2.z) / 2;
        const alpha = 0.05 + ((depth + 1) / 2) * 0.16;
        ctx.strokeStyle =
          depth > 0.55
            ? `rgba(141,255,179,${alpha + 0.08})`
            : `rgba(245,245,240,${alpha})`;
        ctx.lineWidth = depth > 0.55 ? 1 : 0.6;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      for (const p of projected) {
        const depth = (p.z + 1) / 2;
        const size = 1 + depth * 2.4;
        ctx.fillStyle =
          depth > 0.82
            ? `rgba(141,255,179,${0.35 + depth * 0.5})`
            : `rgba(245,245,240,${0.12 + depth * 0.25})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        if (depth > 0.92 && !reduced) {
          const pulse = (Math.sin(rot * 40) + 1) / 2;
          ctx.fillStyle = `rgba(141,255,179,${pulse * 0.14})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
