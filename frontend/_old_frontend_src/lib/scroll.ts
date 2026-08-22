import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initLenis() {
  if (lenis) return lenis;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  lenis = new Lenis({
    lerp: reduced ? 1 : 0.09,
    wheelMultiplier: 1,
    smoothWheel: !reduced,
  });
  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.4 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}

export function lockScroll(lock: boolean) {
  if (!lenis) return;
  lock ? lenis.stop() : lenis.start();
}
