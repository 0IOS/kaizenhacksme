let currentTheme = 'light';

export function getTheme() {
  return currentTheme;
}

export function isDark() {
  return currentTheme === 'dark';
}

export function initTheme() {
  try {
    const saved = localStorage.getItem('kaizen_theme');
    if (saved === 'dark' || saved === 'light') {
      currentTheme = saved;
    }
  } catch {}
  applyTheme();
}

export function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme();
  try { localStorage.setItem('kaizen_theme', currentTheme); } catch {}
  return currentTheme;
}

function applyTheme() {
  const root = document.documentElement;
  if (currentTheme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
  root.setAttribute('data-theme', currentTheme);
  document.querySelectorAll('[data-theme-icon]').forEach(el => {
    el.setAttribute('data-theme-icon', currentTheme);
  });
}
