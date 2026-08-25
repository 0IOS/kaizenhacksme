/* ==========================================================
   main.js — Navigation, Modals, Tabs, Interactive behavior
   ========================================================== */

import { initTheme, toggleTheme, isDark } from './theme.js';
import { playTactileClick, playSuccessChime, toggleSound, isSoundEnabled, loadSoundPreference } from './audio.js';
import { initAllAnimations, onActiveSectionChange, initScrollSpy } from './animations.js';
import {
  FEATURED_EVENT, REGISTRATION_URL, VENUE_MAPS_URL, CONTACT_EMAIL,
  ORGANIZERS, PARTNERS, KEY_STATS, PAST_EVENTS, postInquiry
} from './data.js';

/* ── Initialize ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadSoundPreference();
  initNavbar();
  initMobileMenu();
  initFooterClocks();
  initFeaturedEventTabs();
  initPartnerInquiryModal();
  initEventDetailModal();
  initAllAnimations();
  initScrollSpy(['featured-event', 'partners', 'organizers', 'event-archive']);
  initHeroHeadlineRotation();
});

/* ==========================================================
   NAVIGATION
   ========================================================== */
function initNavbar() {
  const header = document.getElementById('main-navbar');
  const themeBtns = document.querySelectorAll('[data-theme-toggle]');
  const soundBtns = document.querySelectorAll('[data-sound-toggle]');
  const scrollProgress = document.querySelector('.scroll-progress-bar');

  // Scroll state
  let isScrolled = false;
  const updateScroll = () => {
    const wasScrolled = isScrolled;
    isScrolled = window.scrollY > 20;
    if (wasScrolled !== isScrolled) {
      updateNavbarStyle();
    }
  };

  const updateNavbarStyle = () => {
    const dark = isDark();
    if (isScrolled) {
      header.style.backgroundColor = dark ? 'rgba(5, 6, 5, 0.90)' : 'rgba(242, 247, 241, 0.95)';
      header.classList.add('scrolled');
    } else {
      header.style.backgroundColor = dark ? 'rgba(5, 6, 5, 0.40)' : 'rgba(237, 243, 236, 0.55)';
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // Theme toggle
  themeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playTactileClick(800, 0.04);
      toggleTheme();
      updateNavbarStyle();
      updateThemeIcons();
      updateRegisterCTABackground();
    });
  });

  // Sound toggle
  soundBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = toggleSound();
      updateSoundIcons(next);
      if (next) playTactileClick(900, 0.04);
    });
  });

  // Nav links smooth scroll
  document.querySelectorAll('[data-scroll-to]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-scroll-to');
      playTactileClick();
      scrollToSection(id);
    });
  });

  // Active section highlight
  onActiveSectionChange((id) => {
    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      const isActive = link.getAttribute('data-nav-link') === id;
      link.classList.toggle('nav-active', isActive);
    });
  });

  // Brand click scroll to top
  document.querySelectorAll('[data-scroll-top]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      playTactileClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function updateThemeIcons() {
  const dark = isDark();
  document.querySelectorAll('[data-theme-icon]').forEach((icon) => {
    icon.innerHTML = dark ? getSunIcon() : getMoonIcon();
  });
}

function updateSoundIcons(enabled) {
  document.querySelectorAll('[data-sound-icon]').forEach((icon) => {
    icon.innerHTML = enabled ? getVolumeIcon() : getVolumeXIcon();
  });
}

function updateRegisterCTABackground() {
  const section = document.getElementById('registration-cta');
  if (!section) return;
  const dark = isDark();
  section.style.backgroundColor = dark ? '#050605' : '#E4EEE3';
}

/* ==========================================================
   MOBILE MENU
   ========================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const panel = document.getElementById('mobile-menu-panel');
  if (!toggle || !panel) return;

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    panel.classList.add('mobile-menu-open');
    panel.classList.remove('mobile-menu-closed');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    toggle.innerHTML = getCloseIcon();
    playTactileClick();
  };

  const closeMenu = () => {
    isOpen = false;
    panel.classList.remove('mobile-menu-open');
    panel.classList.add('mobile-menu-closed');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.innerHTML = getMenuIcon();
    playTactileClick();
  };

  toggle.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  // Mobile nav link clicks
  panel.querySelectorAll('[data-scroll-to]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-scroll-to');
      playTactileClick();
      closeMenu();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToSection(id);
        });
      });
    });
  });
}

/* ==========================================================
   FOOTER CLOCKS
   ========================================================== */
function initFooterClocks() {
  const istEl = document.getElementById('clock-ist');
  const utcEl = document.getElementById('clock-utc');
  const localEl = document.getElementById('clock-local');
  const localAbbrev = document.getElementById('clock-local-abbrev');
  if (!istEl && !utcEl) return;

  const startTime = Date.now();

  const update = () => {
    const now = new Date();
    if (istEl) istEl.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST';
    if (utcEl) utcEl.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false }) + ' UTC';
    if (localEl) localEl.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
    if (localAbbrev) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      localAbbrev.textContent = tz.split('/').pop().replace(/_/g, ' ').toUpperCase().slice(0, 4);
    }

    // Uptime counter
    const uptimeEl = document.getElementById('uptime-counter');
    if (uptimeEl) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      uptimeEl.textContent = `${h}:${m}:${s}`;
    }
  };
  update();
  setInterval(update, 1000);

  // Footer back-to-top
  document.querySelectorAll('[data-back-to-top]').forEach((btn) => {
    btn.addEventListener('click', () => {
      playTactileClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ==========================================================
   FEATURED EVENT TABS
   ========================================================== */
function initFeaturedEventTabs() {
  const tabBtns = document.querySelectorAll('[data-tab]');
  const tabPanels = document.querySelectorAll('[data-tab-panel]');
  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      playTactileClick();

      // Update button states
      tabBtns.forEach((b) => {
        const isActive = b.getAttribute('data-tab') === tab;
        b.setAttribute('aria-pressed', isActive);
        b.classList.toggle('tab-active', isActive);
      });

      // Update panels
      tabPanels.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-tab-panel') !== tab;
      });
    });
  });
}

/* ==========================================================
   EVENT DETAIL MODAL
   ========================================================== */
function initEventDetailModal() {
  const modal = document.getElementById('event-detail-overlay');
  if (!modal) return;

  const close = () => {
    modal.classList.add('hidden');
    modal.style.opacity = '0';
    document.body.style.overflow = '';
    playTactileClick();
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  const closeBtn = document.getElementById('close-event-detail');
  if (closeBtn) closeBtn.addEventListener('click', close);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });

  // Open buttons
  document.querySelectorAll('[data-open-event-detail]').forEach((btn) => {
    btn.addEventListener('click', () => {
      playTactileClick();
      modal.classList.remove('hidden');
      requestAnimationFrame(() => { modal.style.opacity = '1'; });
      document.body.style.overflow = 'hidden';
    });
  });
}

/* ==========================================================
   PARTNER INQUIRY MODAL
   ========================================================== */
function initPartnerInquiryModal() {
  const modal = document.getElementById('partner-modal-overlay');
  if (!modal) return;

  const form = document.getElementById('partner-inquiry-form');

  const close = () => {
    modal.classList.add('hidden');
    modal.style.opacity = '0';
    document.body.style.overflow = '';
    if (form) form.reset();
    // Reset status
    const statusEl = document.getElementById('partner-submit-status');
    if (statusEl) { statusEl.textContent = ''; statusEl.className = 'text-xs mono font-bold'; }
    const submitText = document.getElementById('partner-submit-text');
    const submitSpinner = document.getElementById('partner-submit-spinner');
    if (submitText) submitText.textContent = 'SUBMIT INQUIRY';
    if (submitSpinner) submitSpinner.classList.add('hidden');
    playTactileClick();
  };

  const open = () => {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => { modal.style.opacity = '1'; });
    document.body.style.overflow = 'hidden';
    playTactileClick();
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  const closeBtn = document.getElementById('close-partner-modal');
  if (closeBtn) closeBtn.addEventListener('click', close);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });

  // Open buttons
  document.querySelectorAll('[data-open-partner-inquiry]').forEach((btn) => {
    btn.addEventListener('click', open);
  });
  const openBtn = document.getElementById('open-partner-modal');
  if (openBtn) openBtn.addEventListener('click', open);

  // Form submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value?.trim();
      const email = form.querySelector('[name="email"]')?.value?.trim();
      if (!name || !email) return;

      const submitText = document.getElementById('partner-submit-text');
      const submitSpinner = document.getElementById('partner-submit-spinner');
      const statusEl = document.getElementById('partner-submit-status');

      playTactileClick();
      if (submitText) submitText.textContent = 'SENDING...';
      if (submitSpinner) submitSpinner.classList.remove('hidden');

      const data = {
        name,
        email,
        organization: form.querySelector('[name="organization"]')?.value || '',
        message: form.querySelector('[name="message"]')?.value || ''
      };

      try {
        await postInquiry(data);
        playSuccessChime();
        if (statusEl) { statusEl.textContent = 'SENT'; statusEl.className = 'text-xs mono font-bold text-emerald-600 dark:text-accent'; }
        if (submitText) submitText.textContent = 'INQUIRY SENT';
        if (submitSpinner) submitSpinner.classList.add('hidden');
        setTimeout(close, 1500);
      } catch (err) {
        console.error('Partner inquiry submission failed', err);
        if (statusEl) { statusEl.textContent = 'FAILED - TRY AGAIN'; statusEl.className = 'text-xs mono font-bold text-red-500'; }
        if (submitText) submitText.textContent = 'SUBMIT INQUIRY';
        if (submitSpinner) submitSpinner.classList.add('hidden');
      }
    });
  }
}

/* ==========================================================
   HERO HEADLINE ROTATION
   ========================================================== */
function initHeroHeadlineRotation() {
  const headlines = document.querySelectorAll('[data-hero-headline]');
  if (headlines.length < 2) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let index = 0;

  setInterval(() => {
    headlines.forEach((h, i) => {
      h.style.opacity = i === index ? '1' : '0';
      h.style.transform = i === index ? 'translateY(0)' : 'translateY(10px)';
    });
    index = (index + 1) % headlines.length;
  }, 2500);
}

/* ==========================================================
   SVG ICON HELPERS
   ========================================================== */
function getSunIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
}

function getMoonIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
}

function getVolumeIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
}

function getVolumeXIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`;
}

function getMenuIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
}

function getCloseIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
}

/* ==========================================================
   EXPOSE GLOBAL HELPERS for inline handlers
   ========================================================== */
window.playClick = playTactileClick;
window.scrollToSection = scrollToSection;
