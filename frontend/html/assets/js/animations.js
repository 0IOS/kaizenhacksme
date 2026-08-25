/* ==========================================================
   animations.js — Scroll reveals, parallax, counters
   ========================================================== */

const EASE_OUT = [0.22, 1, 0.36, 1];
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasPointer = window.matchMedia('(pointer: fine)').matches;

/* ── Scroll Reveal (IntersectionObserver) ── */
export function initScrollReveals() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el) => observer.observe(el));
}

/* ── Section Divider Lines ── */
export function initSectionDividers() {
  const lines = document.querySelectorAll('.section-divider-line');
  if (!lines.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  lines.forEach((el) => observer.observe(el));
}

/* ── Stagger Groups ── */
export function initStaggerGroups() {
  const groups = document.querySelectorAll('.stagger-group');
  if (!groups.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        entry.target.classList.add('revealed');
        Array.from(children).forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.08}s`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  groups.forEach((el) => observer.observe(el));
}

/* ── Animated Counters ── */
export function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const parser = (raw) => {
    const match = raw.match(/^([^\d]*)([\d][\d.,]*)(.*)$/);
    if (!match) return null;
    const [, prefix, numStr, suffix] = match;
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const target = parseFloat(numStr.replace(/,/g, ''));
    if (Number.isNaN(target)) return null;
    const grouping = numStr.includes(',');
    const padWidth = numStr.split('.')[0].replace(/[.,]/g, '').length;
    return { prefix, target, suffix, decimals, grouping, padWidth };
  };

  const format = (v, p) =>
    `${p.prefix}${Math.max(0, v)
      .toFixed(p.decimals)
      .replace(/\B(?=(\d{3})+(?!\d))/g, p.grouping ? ',' : '')
      .padStart(p.padWidth, '0')}${p.suffix}`;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const parsed = parser(el.getAttribute('data-counter'));
      if (!parsed) return;
      observer.unobserve(el);

      if (prefersReduced) {
        el.textContent = format(parsed.target, parsed);
        return;
      }

      const duration = 1400;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(eased * parsed.target, parsed);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    });
  }, { threshold: 0.6 });

  counters.forEach((el) => observer.observe(el));
}

/* ── Cursor Parallax ── */
let parallaxListeners = new Set();
let parallaxBound = false;
let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
let rafId = null;

function bindParallaxLoop() {
  if (parallaxBound) return;
  parallaxBound = true;

  const loop = () => {
    currentX += (targetX - currentX) * 0.075;
    currentY += (targetY - currentY) * 0.075;
    parallaxListeners.forEach((l) => l(currentX, currentY));
    const settled = Math.abs(targetX - currentX) < 0.0008 && Math.abs(targetY - currentY) < 0.0008;
    rafId = settled ? null : requestAnimationFrame(loop);
  };

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX / window.innerWidth - 0.5;
    targetY = e.clientY / window.innerHeight - 0.5;
    if (rafId === null) rafId = requestAnimationFrame(loop);
  }, { passive: true });
}

export function initCursorParallax() {
  if (prefersReduced || !hasPointer) return;
  bindParallaxLoop();

  const els = document.querySelectorAll('[data-parallax]');
  els.forEach((el) => {
    const strength = parseFloat(el.getAttribute('data-parallax')) || 8;
    const listener = (nx, ny) => {
      el.style.transform = `translate3d(${nx * strength}px, ${ny * strength}px, 0)`;
    };
    parallaxListeners.add(listener);
  });
}

/* ── Scroll-based Parallax for background layers ── */
export function initScrollParallax() {
  if (prefersReduced) return;

  const layers = document.querySelectorAll('[data-scroll-parallax]');
  if (!layers.length) return;

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  const update = () => {
    const scrollY = window.scrollY;
    layers.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-scroll-parallax')) || 0;
      const maxDist = parseFloat(el.getAttribute('data-parallax-max')) || 200;
      el.style.transform = `translate3d(0, ${clamp(scrollY * speed, -maxDist, maxDist)}px, 0)`;
    });
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ── Scroll Progress Bar ── */
export function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress-bar');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    bar.style.transform = `scaleX(${progress})`;
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ── Active Section Spy ── */
let activeSectionCallback = null;

export function onActiveSectionChange(cb) {
  activeSectionCallback = cb;
}

export function initScrollSpy(ids) {
  if (!ids || !ids.length) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting);
    if (visible.length > 0) {
      const top = visible.reduce((best, e) =>
        e.boundingClientRect.top < best.boundingClientRect.top ? e : best
      );
      if (activeSectionCallback) activeSectionCallback(top.target.id);
    }
  }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ── Background Canvas Mouse Spotlight ── */
export function initBackgroundSpotlight() {
  if (prefersReduced || !hasPointer) return;

  const spot = document.getElementById('cursor-spotlight');
  const coords = document.getElementById('cursor-coords');
  if (!spot) return;

  let tx = -2000, ty = -2000, cx = -2000, cy = -2000, initialized = false;
  let raf = null, lastTextUpdate = 0;

  const tick = () => {
    cx += (tx - cx) * 0.075;
    cy += (ty - cy) * 0.075;
    spot.style.transform = `translate3d(${cx - 225}px, ${cy - 225}px, 0)`;

    const now = performance.now();
    if (coords && now - lastTextUpdate > 180) {
      lastTextUpdate = now;
      const lat = (28.6139 + (cy / window.innerHeight) * 0.05).toFixed(4);
      const lng = (77.2090 + (cx / window.innerWidth) * 0.05).toFixed(4);
      coords.textContent = `${lat}\u00b0 N, ${lng}\u00b0 E`;
    }

    if (Math.abs(tx - cx) > 0.08 || Math.abs(ty - cy) > 0.08) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  };

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!initialized) { cx = tx; cy = ty; initialized = true; }
    if (raf === null) raf = requestAnimationFrame(tick);
  }, { passive: true });
}

/* ── Initialize all animations ── */
export function initAllAnimations() {
  initScrollReveals();
  initSectionDividers();
  initStaggerGroups();
  initAnimatedCounters();
  initCursorParallax();
  initScrollParallax();
  initScrollProgress();
  initBackgroundSpotlight();
}
