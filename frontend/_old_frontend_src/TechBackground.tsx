import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

const LABEL_POOL = [
  "28.6139°N",
  "77.2090°E",
  "SYS//OK",
  "48H",
  "0x2F",
  "NODE-07",
  "500+",
  "BUILD",
  "Δ 0.0041",
  "SYNC",
];

export default function TechBackground({ className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    const mouse = { x: -9999, y: -9999 };
    const eased = { x: 0.3, y: 0.35 };

    const labels = Array.from({ length: 14 }, (_, i) => ({
      text: LABEL_POOL[i % LABEL_POOL.length],
      gx: Math.random(),
      gy: Math.random(),
      born: Math.random() * 100,
      life: 240 + Math.random() * 300,
    }));

    const shapes = [
      { kind: "rect", x: 0.72, y: 0.24, s: 130, rot: 0.12, speed: 0.0006 },
      { kind: "tri", x: 0.16, y: 0.66, s: 90, rot: -0.3, speed: -0.0004 },
      { kind: "circle", x: 0.86, y: 0.72, s: 60, rot: 0, speed: 0.0008 },
    ];

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
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const GAP = 72;

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      eased.x += (mouse.x - eased.x) * 0.03;
      eased.y += (mouse.y - eased.y) * 0.03;

      ctx.strokeStyle = "rgba(245,245,240,0.035)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += GAP) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
      }
      for (let y = 0; y <= h; y += GAP) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
      ctx.stroke();

      ctx.fillStyle = "rgba(141,255,179,0.5)";
      for (let x = GAP; x < w; x += GAP * 4) {
        for (let y = GAP; y < h; y += GAP * 4) {
          ctx.fillRect(x - 3.5, y - 0.5, 7, 1);
          ctx.fillRect(x - 0.5, y - 3.5, 1, 7);
        }
      }

      ctx.font = "10px 'JetBrains Mono', monospace";
      for (const l of labels) {
        const age = (t + l.born) % l.life;
        const fade =
          age < 40 ? age / 40 : age > l.life - 60 ? (l.life - age) / 60 : 1;
        ctx.fillStyle = `rgba(169,173,169,${0.22 * fade})`;
        ctx.fillText(l.text, l.gx * (w - 90) + 8, l.gy * (h - 30) + 14);
        ctx.fillStyle = `rgba(245,245,240,${0.08 * fade})`;
        ctx.fillRect(l.gx * (w - 90), l.gy * (h - 30) + 18, 26, 1);
      }

      const scanY = ((t * 0.6) % (h + 200)) - 100;
      const grad = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
      grad.addColorStop(0, "rgba(141,255,179,0)");
      grad.addColorStop(0.5, "rgba(141,255,179,0.05)");
      grad.addColorStop(1, "rgba(141,255,179,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 80, w, 160);
      ctx.strokeStyle = "rgba(141,255,179,0.10)";
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(w, scanY);
      ctx.stroke();

      for (const s of shapes) {
        const cx = s.x * w;
        const cy = s.y * h + Math.sin(t * s.speed * 400) * 14;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(s.rot + t * s.speed);
        ctx.strokeStyle = "rgba(245,245,240,0.06)";
        ctx.beginPath();
        if (s.kind === "rect") ctx.rect(-s.s / 2, -s.s / 2, s.s, s.s);
        if (s.kind === "tri") {
          ctx.moveTo(0, -s.s / 2);
          ctx.lineTo(s.s / 2, s.s / 2);
          ctx.lineTo(-s.s / 2, s.s / 2);
          ctx.closePath();
        }
        if (s.kind === "circle") ctx.arc(0, 0, s.s / 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      const glowR = Math.max(w, h) * 0.45;
      const g2 = ctx.createRadialGradient(eased.x, eased.y, 0, eased.x, eased.y, glowR);
      g2.addColorStop(0, "rgba(141,255,179,0.055)");
      g2.addColorStop(1, "rgba(141,255,179,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      t = 100;
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
