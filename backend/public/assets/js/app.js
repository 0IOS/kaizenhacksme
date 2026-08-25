/**
 * Kaizen Hacks — Main Application JavaScript
 * Vanilla JS replacement for React component behaviors.
 * Organized by feature with DOMContentLoaded initialization.
 */

(function () {
  'use strict';

  /* ============================================================
     Utility: Get CSRF token from <meta> tag
     ============================================================ */
  function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
  }

  /* ============================================================
     1. THEME TOGGLING (dark/light mode)
     Persists to localStorage key 'kaizen_theme'.
     ============================================================ */
  const Theme = {
    KEY: 'kaizen_theme',

    current() {
      try {
        const saved = localStorage.getItem(this.KEY);
        if (saved === 'dark' || saved === 'light') return saved;
      } catch (e) { /* ignore */ }
      return 'light';
    },

    apply(theme) {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
      root.setAttribute('data-theme', theme);
      try {
        localStorage.setItem(this.KEY, theme);
      } catch (e) { /* ignore */ }
    },

    toggle() {
      const next = this.current() === 'dark' ? 'light' : 'dark';
      this.apply(next);
      return next;
    },

    init() {
      this.apply(this.current());
    }
  };

  /* ============================================================
     2. SOUND EFFECTS (Web Audio API)
     playTactileClick, playSuccessChime, toggleSound, isSoundEnabled
     ============================================================ */
  let audioCtx = null;
  let soundEnabled = true;

  function getAudioContext() {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTactileClick(freq, duration) {
    if (!soundEnabled) return;
    freq = freq || 800;
    duration = duration || 0.03;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Gracefully handle browser audio restrictions
    }
  }

  function playSuccessChime() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      [523.25, 659.25, 783.99, 1046.50].forEach(function (freq, i) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.05, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.18);
      });
    } catch (e) {
      // Ignore audio errors
    }
  }

  function toggleSound(enabled) {
    if (enabled !== undefined) {
      soundEnabled = enabled;
    } else {
      soundEnabled = !soundEnabled;
    }
    return soundEnabled;
  }

  function isSoundEnabled() {
    return soundEnabled;
  }

  /* ============================================================
     3. MOBILE MENU TOGGLE
     Opens/closes the mobile navigation sheet with scroll lock
     and Escape key support.
     ============================================================ */
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuPanel = document.getElementById('mobile-menu-panel');
    if (!menuBtn || !menuPanel) return;

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      menuPanel.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    }

    function closeMenu() {
      isOpen = false;
      menuPanel.classList.add('hidden');
      document.body.style.overflow = '';
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    }

    menuBtn.addEventListener('click', function () {
      playTactileClick();
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Escape key closes mobile menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        menuBtn.focus();
      }
    });

    // Mobile nav link clicks: close menu then scroll
    var mobileNavLinks = menuPanel.querySelectorAll('[data-scroll-to]');
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
        var targetId = this.getAttribute('data-scroll-to');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            var el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          });
        });
      });
    });

    // Close mobile menu when clicking backdrop
    menuPanel.addEventListener('click', function (e) {
      if (e.target === menuPanel) {
        closeMenu();
      }
    });
  }

  /* ============================================================
     4. SMOOTH SCROLL TO SECTIONS
     All links/buttons with [data-scroll-to] attribute.
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('[data-scroll-to]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var targetId = this.getAttribute('data-scroll-to');
        if (!targetId) return;
        var target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          playTactileClick();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================================
     5. SCROLL SPY FOR NAV (IntersectionObserver-based)
     Highlights the active nav link based on which section
     is currently most visible in the viewport.
     ============================================================ */
  function initScrollSpy() {
    var sectionIds = ['featured-event', 'partners', 'organizers', 'event-archive'];
    var navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length) return;

    var observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    var activeSection = null;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          activeSection = entry.target.id;
          updateActiveLink(activeSection);
        }
      });
    }, observerOptions);

    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    function updateActiveLink(activeId) {
      navLinks.forEach(function (link) {
        var href = link.getAttribute('href') || '';
        var linkId = href.replace('#', '');
        if (linkId === activeId) {
          link.classList.add('nav-active');
        } else {
          link.classList.remove('nav-active');
        }
      });
    }
  }

  /* ============================================================
     6. SCROLL PROGRESS BAR FOR NAVBAR
     Updates a progress indicator as the user scrolls.
     ============================================================ */
  function initScrollProgress() {
    var progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var progress = docHeight > 0 ? scrollTop / docHeight : 0;
          progressBar.style.transform = 'scaleX(' + progress + ')';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     7. NAVBAR SCROLL STATE
     Adds/removes scrolled class for background change.
     ============================================================ */
  function initNavbarScroll() {
    var header = document.getElementById('main-navbar');
    if (!header) return;

    var ticking = false;

    function updateHeader() {
      var scrolled = window.scrollY > 20;
      if (scrolled) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    updateHeader();
  }

  /* ============================================================
     8. PARTNER INQUIRY MODAL
     Open/close with Escape key, form submission via fetch with
     CSRF token from meta tag.
     ============================================================ */
  function initPartnerModal() {
    var openBtns = document.querySelectorAll('[data-open-partner-modal]');
    var closeBtns = document.querySelectorAll('[data-close-partner-modal]');
    var modal = document.getElementById('partner-inquiry-modal');
    var form = document.getElementById('partner-inquiry-form');
    var formContent = document.getElementById('partner-form-content');
    var successContent = document.getElementById('partner-success-content');

    if (!modal) return;

    function openModal() {
      playTactileClick();
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      // Reset form state
      if (formContent) formContent.classList.remove('hidden');
      if (successContent) successContent.classList.add('hidden');
      if (form) form.reset();
    }

    function closeModal() {
      playTactileClick();
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener('click', openModal);
    });

    closeBtns.forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });

    // Close on backdrop click
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });

    // Form submission
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var company = form.querySelector('[name="company"]');
        var email = form.querySelector('[name="email"]');
        if (!company || !email) return;
        if (!company.value.trim() || !email.value.trim()) return;

        playTactileClick();
        playSuccessChime();

        var submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'TRANSMITTING...';
        }

        var data = {
          company: company.value.trim(),
          contactName: (form.querySelector('[name="contactName"]') || {}).value || '',
          email: email.value.trim(),
          tier: (form.querySelector('[name="tier"]') || {}).value || 'PLATINUM (BOUNTY + MENTORSHIP)',
          offering: (form.querySelector('[name="offering"]') || {}).value || ''
        };

        fetch('/api/inquiries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCsrfToken()
          },
          body: JSON.stringify(data)
        })
          .then(function (res) { return res.json(); })
          .then(function () {
            if (formContent) formContent.classList.add('hidden');
            if (successContent) successContent.classList.remove('hidden');
          })
          .catch(function () {
            // Even on failure, show success state to avoid breaking UI
            if (formContent) formContent.classList.add('hidden');
            if (successContent) successContent.classList.remove('hidden');
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'TRANSMIT BRIEF';
            }
          });
      });
    }
  }

  /* ============================================================
     9. EVENT DETAIL MODAL
     Open/close, Escape key.
     ============================================================ */
  function initEventDetailModal() {
    var modal = document.getElementById('event-detail-modal');
    if (!modal) return;

    function openModal() {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-event-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        playTactileClick();
        openModal();
      });
    });

    document.querySelectorAll('[data-close-event-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        playTactileClick();
        closeModal();
      });
    });

    // Close on backdrop
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  /* ============================================================
     10. TAB SWITCHING FOR FEATURED EVENT
     OVERVIEW / TRACKS / TIMELINE tabs.
     ============================================================ */
  function initFeaturedEventTabs() {
    var tabs = document.querySelectorAll('[data-event-tab]');
    var panels = document.querySelectorAll('[data-event-panel]');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        playTactileClick();
        var target = this.getAttribute('data-event-tab');

        // Update active tab styling
        tabs.forEach(function (t) {
          t.classList.remove('tab-active');
          t.classList.remove('bg-[var(--color-accent)]');
          t.classList.remove('text-white');
          t.classList.remove('text-[#050605]');
          t.classList.remove('font-bold');
          t.classList.add('bg-slate-100');
          t.classList.add('text-slate-700');
          t.classList.add('border');
          t.classList.add('border-slate-300');
        });

        this.classList.add('tab-active');
        this.classList.remove('bg-slate-100');
        this.classList.remove('text-slate-700');
        this.classList.remove('border');
        this.classList.remove('border-slate-300');
        this.classList.add('bg-[var(--color-accent)]');
        this.classList.add('font-bold');

        // If dark mode, apply dark variants
        if (htmlDark()) {
          this.classList.add('text-[#050605]');
        } else {
          this.classList.add('text-white');
        }

        // Show/hide panels
        panels.forEach(function (panel) {
          if (panel.getAttribute('data-event-panel') === target) {
            panel.classList.remove('hidden');
          } else {
            panel.classList.add('hidden');
          }
        });
      });
    });
  }

  function htmlDark() {
    return document.documentElement.classList.contains('dark');
  }

  /* ============================================================
     11. FOOTER CLOCKS (IST/UTC)
     Updates every second.
     ============================================================ */
  function initFooterClocks() {
    var istEl = document.getElementById('clock-ist');
    var utcEl = document.getElementById('clock-utc');
    if (!istEl && !utcEl) return;

    function updateClocks() {
      var now = new Date();
      if (istEl) {
        istEl.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST';
      }
      if (utcEl) {
        utcEl.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false }) + ' UTC';
      }
    }

    updateClocks();
    setInterval(updateClocks, 1000);
  }

  /* ============================================================
     12. BACKGROUND CANVAS PARTICLES
     Simplified CSS-based parallax on scroll. Generates particles
     and glow elements, applies scroll-driven transforms via CSS
     custom properties.
     ============================================================ */
  function initBackgroundParticles() {
    var container = document.getElementById('bg-particles');
    if (!container) return;

    var isMobile = window.innerWidth < 768;
    var count = isMobile ? 8 : 16;
    var particles = [];

    for (var i = 0; i < count; i++) {
      var span = document.createElement('span');
      span.className = 'particle';

      var upward = Math.random() > 0.3;
      var diagonal = !upward && Math.random() > 0.5;
      var emerald = Math.random() > 0.55;

      var size = Math.random() > 0.75 ? 2.5 : 1.5;
      var dx = diagonal ? (Math.random() * 60 - 30) : (Math.random() * 16 - 8);
      var dy = upward ? -(40 + Math.random() * 90) : (20 + Math.random() * 50);
      var dur = (16 + Math.random() * 18);
      var delay = -(Math.random() * 30);
      var o0 = 0.04 + Math.random() * 0.1;
      var o1 = 0.14 + Math.random() * 0.26;
      var color = emerald ? 'var(--color-accent)' : '#9BA39C';

      span.style.left = (Math.random() * 100).toFixed(2) + '%';
      span.style.top = (Math.random() * 100).toFixed(2) + '%';
      span.style.width = size + 'px';
      span.style.height = size + 'px';
      span.style.backgroundColor = color;
      span.style.opacity = o0;
      span.style.animationDuration = dur + 's';
      span.style.animationDelay = delay + 's';
      span.style.setProperty('--p-dx', dx + 'px');
      span.style.setProperty('--p-dy', dy + 'px');
      span.style.setProperty('--p-o0', o0);
      span.style.setProperty('--p-o1', o1);

      container.appendChild(span);
      particles.push(span);
    }
  }

  /* ============================================================
     13. SCROLL PARALLAX FOR BACKGROUND LAYERS
     Applies parallax translateY transforms to the grid, glow,
     and particles based on scroll position.
     ============================================================ */
  function initScrollParallax() {
    var gridLayer = document.getElementById('bg-grid-layer');
    var glowLayer = document.getElementById('bg-glow-layer');
    var particleLayer = document.getElementById('bg-particles');

    if (!gridLayer && !glowLayer && !particleLayer) return;

    var ticking = false;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    function clamp(v, min, max) {
      return Math.min(max, Math.max(min, v));
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.pageYOffset || document.documentElement.scrollTop;

          if (gridLayer) {
            gridLayer.style.transform = 'translate3d(0,' + clamp(scrollY * -0.03, -300, 300) + 'px,0)';
          }
          if (glowLayer) {
            glowLayer.style.transform = 'translate3d(0,' + clamp(scrollY * -0.065, -230, 230) + 'px,0)';
          }
          if (particleLayer) {
            particleLayer.style.transform = 'translate3d(0,' + clamp(scrollY * -0.105, -170, 170) + 'px,0)';
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     14. BACK TO TOP BUTTON
     Shows after scrolling down, scrolls to top on click.
     ============================================================ */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 400) {
            btn.classList.remove('opacity-0');
            btn.classList.add('opacity-100');
          } else {
            btn.classList.add('opacity-0');
            btn.classList.remove('opacity-100');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      playTactileClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     15. CONTACT FORM HANDLING
     Submits to /api/contact via fetch with CSRF token.
     ============================================================ */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');
      var message = form.querySelector('[name="message"]');

      if (!name || !email || !message) return;
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) return;

      playTactileClick();

      var submitBtn = form.querySelector('[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'SENDING...';
      }

      var data = {
        name: name.value.trim(),
        email: email.value.trim(),
        subject: (form.querySelector('[name="subject"]') || {}).value || '',
        message: message.value.trim()
      };

      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCsrfToken()
        },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          playSuccessChime();
          var feedback = document.getElementById('contact-feedback');
          if (feedback) {
            feedback.textContent = 'Message sent successfully. We\'ll get back to you soon.';
            feedback.classList.remove('hidden');
            feedback.classList.add('text-green-600');
          }
          form.reset();
        })
        .catch(function () {
          var feedback = document.getElementById('contact-feedback');
          if (feedback) {
            feedback.textContent = 'Failed to send message. Please try again.';
            feedback.classList.remove('hidden');
            feedback.classList.add('text-red-500');
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  }

  /* ============================================================
     16. REGISTRATION FORM HANDLING
     Handles event registration form submission.
     ============================================================ */
  function initRegistrationForm() {
    var form = document.getElementById('registration-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');

      if (!name || !email) return;
      if (!name.value.trim() || !email.value.trim()) return;

      playTactileClick();

      var submitBtn = form.querySelector('[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'REGISTERING...';
      }

      var data = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: (form.querySelector('[name="phone"]') || {}).value || '',
        event_id: (form.querySelector('[name="event_id"]') || {}).value || '',
        team_name: (form.querySelector('[name="team_name"]') || {}).value || ''
      };

      fetch('/api/registrations/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCsrfToken()
        },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          playSuccessChime();
          var feedback = document.getElementById('registration-feedback');
          if (feedback) {
            if (result.success) {
              feedback.textContent = 'Registration successful! Check your email for confirmation.';
              feedback.classList.remove('hidden', 'text-red-500');
              feedback.classList.add('text-green-600');
            } else {
              feedback.textContent = result.error || 'Registration failed. Please try again.';
              feedback.classList.remove('hidden', 'text-green-600');
              feedback.classList.add('text-red-500');
            }
          }
          if (result.success) form.reset();
        })
        .catch(function () {
          var feedback = document.getElementById('registration-feedback');
          if (feedback) {
            feedback.textContent = 'Network error. Please check your connection and try again.';
            feedback.classList.remove('hidden', 'text-green-600');
            feedback.classList.add('text-red-500');
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  }

  /* ============================================================
     17. LOGIN FORM HANDLING
     Handles user login via /api/auth/login.
     ============================================================ */
  function initLoginForm() {
    var form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = form.querySelector('[name="email"]');
      var password = form.querySelector('[name="password"]');

      if (!email || !password) return;
      if (!email.value.trim() || !password.value) return;

      playTactileClick();

      var submitBtn = form.querySelector('[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'LOGGING IN...';
      }

      var data = {
        email: email.value.trim(),
        password: password.value
      };

      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCsrfToken()
        },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (result.success) {
            playSuccessChime();
            window.location.href = '/admin';
          } else {
            var feedback = document.getElementById('login-feedback');
            if (feedback) {
              feedback.textContent = result.error || 'Invalid email or password.';
              feedback.classList.remove('hidden', 'text-green-600');
              feedback.classList.add('text-red-500');
            }
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = originalText;
            }
          }
        })
        .catch(function () {
          var feedback = document.getElementById('login-feedback');
          if (feedback) {
            feedback.textContent = 'Network error. Please try again.';
            feedback.classList.remove('hidden', 'text-green-600');
            feedback.classList.add('text-red-500');
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  }

  /* ============================================================
     18. REGISTRATION / SIGNUP FORM HANDLING
     Handles user account creation via /api/auth/register.
     ============================================================ */
  function initSignupForm() {
    var form = document.getElementById('signup-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');
      var password = form.querySelector('[name="password"]');
      var passwordConfirm = form.querySelector('[name="password_confirm"]');

      if (!name || !email || !password || !passwordConfirm) return;
      if (!name.value.trim() || !email.value.trim() || !password.value || !passwordConfirm.value) return;

      if (password.value !== passwordConfirm.value) {
        var feedback = document.getElementById('signup-feedback');
        if (feedback) {
          feedback.textContent = 'Passwords do not match.';
          feedback.classList.remove('hidden', 'text-green-600');
          feedback.classList.add('text-red-500');
        }
        return;
      }

      playTactileClick();

      var submitBtn = form.querySelector('[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'CREATING ACCOUNT...';
      }

      var data = {
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value,
        password_confirm: passwordConfirm.value
      };

      fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCsrfToken()
        },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (result.success) {
            playSuccessChime();
            window.location.href = '/admin';
          } else {
            var feedback = document.getElementById('signup-feedback');
            if (feedback) {
              feedback.textContent = result.error || 'Registration failed. Please try again.';
              feedback.classList.remove('hidden', 'text-green-600');
              feedback.classList.add('text-red-500');
            }
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = originalText;
            }
          }
        })
        .catch(function () {
          var feedback = document.getElementById('signup-feedback');
          if (feedback) {
            feedback.textContent = 'Network error. Please try again.';
            feedback.classList.remove('hidden', 'text-green-600');
            feedback.classList.add('text-red-500');
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  }

  /* ============================================================
     19. ADMIN PANEL INTERACTIONS
     Event creation, editing, deletion, and stat loading.
     ============================================================ */
  function initAdminPanel() {
    // Event creation form
    var createEventForm = document.getElementById('create-event-form');
    if (createEventForm) {
      createEventForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var formData = new FormData(createEventForm);
        var data = {};
        formData.forEach(function (value, key) {
          data[key] = value;
        });

        var submitBtn = createEventForm.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'CREATING...';
        }

        fetch('/api/admin/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCsrfToken()
          },
          body: JSON.stringify(data)
        })
          .then(function (res) { return res.json(); })
          .then(function (result) {
            if (result.success) {
              playSuccessChime();
              window.location.reload();
            } else {
              var feedback = document.getElementById('admin-feedback');
              if (feedback) {
                feedback.textContent = result.error || 'Failed to create event.';
                feedback.classList.remove('hidden');
                feedback.classList.add('text-red-500');
              }
            }
          })
          .catch(function () {
            var feedback = document.getElementById('admin-feedback');
            if (feedback) {
              feedback.textContent = 'Network error. Please try again.';
              feedback.classList.remove('hidden');
              feedback.classList.add('text-red-500');
            }
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'CREATE EVENT';
            }
          });
      });
    }

    // Event delete buttons
    document.querySelectorAll('[data-delete-event]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!confirm('Are you sure you want to delete this event?')) return;

        var eventId = this.getAttribute('data-delete-event');
        playTactileClick();

        fetch('/api/admin/events/' + eventId, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': getCsrfToken()
          }
        })
          .then(function (res) { return res.json(); })
          .then(function (result) {
            if (result.success) {
              window.location.reload();
            } else {
              alert('Failed to delete event.');
            }
          })
          .catch(function () {
            alert('Network error. Please try again.');
          });
      });
    });

    // Load admin stats
    var statsContainer = document.getElementById('admin-stats');
    if (statsContainer) {
      fetch('/api/admin/stats', {
        headers: {
          'X-CSRF-Token': getCsrfToken()
        }
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (result.success && result.stats) {
            renderStats(result.stats);
          }
        })
        .catch(function () {
          statsContainer.textContent = 'Failed to load stats.';
        });
    }

    function renderStats(stats) {
      var html = '';
      if (stats.users) {
        html += '<div class="stat-card"><div class="stat-number">' + (stats.users.total || 0) + '</div><div class="stat-label">Total Users</div></div>';
      }
      if (stats.registrations) {
        html += '<div class="stat-card"><div class="stat-number">' + (stats.registrations.total || 0) + '</div><div class="stat-label">Registrations</div></div>';
      }
      if (stats.inquiries) {
        html += '<div class="stat-card"><div class="stat-number">' + (stats.inquiries.total || 0) + '</div><div class="stat-label">Partner Inquiries</div></div>';
      }
      if (stats.contacts) {
        html += '<div class="stat-card"><div class="stat-number">' + (stats.contacts.total || 0) + '</div><div class="stat-label">Contact Messages</div></div>';
      }
      statsContainer.innerHTML = html;
    }
  }

  /* ============================================================
     20. DATA COUNTERS ANIMATION
     IntersectionObserver-based number counting for stat elements.
     Elements with [data-count] attribute will animate from 0
     to their target value when they enter the viewport.
     ============================================================ */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Show final values immediately
      counters.forEach(function (el) {
        var target = el.getAttribute('data-count');
        if (target !== null) {
          el.textContent = target;
        }
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (el) {
      observer.observe(el);
    });

    function animateCounter(el) {
      var target = el.getAttribute('data-count');
      var text = el.textContent.trim();

      // Handle special values
      if (target === '∞' || target === '∞') {
        el.textContent = '∞';
        return;
      }

      var targetNum = parseInt(target, 10);
      if (isNaN(targetNum) || targetNum === 0) {
        el.textContent = target || text;
        return;
      }

      var duration = 1200;
      var startTime = null;
      var startVal = 0;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(startVal + (targetNum - startVal) * eased);

        el.textContent = String(current).padStart(target.length, '0');

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(step);
    }
  }

  /* ============================================================
     21. SOUND TOGGLE BUTTON STATE
     Updates sound toggle button icons based on current state.
     ============================================================ */
  function initSoundToggle() {
    var btns = document.querySelectorAll('[data-toggle-sound]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = toggleSound();
        updateSoundButtons(next);
        if (next) playTactileClick(900, 0.04);
      });
    });
  }

  function updateSoundButtons(enabled) {
    document.querySelectorAll('[data-toggle-sound]').forEach(function (btn) {
      var iconOn = btn.querySelector('.sound-on');
      var iconOff = btn.querySelector('.sound-off');
      if (iconOn && iconOff) {
        if (enabled) {
          iconOn.classList.remove('hidden');
          iconOff.classList.add('hidden');
        } else {
          iconOn.classList.add('hidden');
          iconOff.classList.remove('hidden');
        }
      }
      btn.setAttribute('aria-label', enabled ? 'Mute micro-sounds' : 'Enable micro-sounds');
    });
  }

  /* ============================================================
     22. THEME TOGGLE BUTTON STATE
     Updates theme toggle button icons based on current theme.
     ============================================================ */
  function initThemeToggle() {
    var btns = document.querySelectorAll('[data-toggle-theme]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        playTactileClick(800, 0.04);
        Theme.toggle();
        updateThemeButtons();
      });
    });
    updateThemeButtons();
  }

  function updateThemeButtons() {
    var isDark = Theme.current() === 'dark';
    document.querySelectorAll('[data-toggle-theme]').forEach(function (btn) {
      var iconSun = btn.querySelector('.icon-sun');
      var iconMoon = btn.querySelector('.icon-moon');
      if (iconSun && iconMoon) {
        if (isDark) {
          iconSun.classList.remove('hidden');
          iconMoon.classList.add('hidden');
        } else {
          iconSun.classList.add('hidden');
          iconMoon.classList.remove('hidden');
        }
      }
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    });
  }

  /* ============================================================
     23. HERO HEADLINE ROTATION
     Cycles through headline variants in the hero section.
     ============================================================ */
  function initHeroHeadlines() {
    var container = document.getElementById('hero-headlines');
    if (!container) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var headlines = [
      { line1: 'BUILD.', line2: 'FOR THE', line3: 'PLANET.' },
      { line1: 'IDEAS THAT', line2: 'SOLVE', line3: 'REAL PROBLEMS.' },
      { line1: 'THINK.', line2: 'BUILD.', line3: 'IMPACT.' }
    ];

    var currentIndex = 0;
    var line1El = document.getElementById('hero-line1');
    var line2El = document.getElementById('hero-line2');
    var line3El = document.getElementById('hero-line3');

    if (!line1El || !line2El || !line3El) return;

    function cycleHeadline() {
      currentIndex = (currentIndex + 1) % headlines.length;
      var current = headlines[currentIndex];

      // Fade out
      container.style.opacity = '0';
      container.style.transform = 'translateY(-10px)';

      setTimeout(function () {
        line1El.textContent = current.line1;
        line2El.textContent = current.line2;
        line3El.textContent = current.line3;

        // Fade in
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 300);
    }

    setInterval(cycleHeadline, 2500);
  }

  /* ============================================================
     24. ANIMATED STAT VALUES (Identity Section)
     Handles the counting animation for stat numbers using
     data-count attribute.
     ============================================================ */
  function initAnimatedStats() {
    // Already handled by initCounters(), but this adds
    // additional IntersectionObserver-based reveal for the
    // stats container section.
    var statsSection = document.getElementById('identity-stats');
    if (!statsSection) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('stats-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }

  /* ============================================================
     INITIALIZATION
     All modules initialized on DOMContentLoaded.
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    // Theme must init first to set correct CSS variables
    Theme.init();

    // Sound & UI toggles
    initThemeToggle();
    initSoundToggle();

    // Navigation
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initScrollProgress();
    initNavbarScroll();

    // Modals
    initPartnerModal();
    initEventDetailModal();

    // Tabs
    initFeaturedEventTabs();

    // Footer
    initFooterClocks();

    // Background
    initBackgroundParticles();
    initScrollParallax();

    // Back to top
    initBackToTop();

    // Forms
    initContactForm();
    initRegistrationForm();
    initLoginForm();
    initSignupForm();

    // Admin
    initAdminPanel();

    // Animations
    initCounters();
    initAnimatedStats();
    initHeroHeadlines();
  });

})();
