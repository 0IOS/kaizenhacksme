<?php
declare(strict_types=1);

$registrationUrl = 'https://www.tinyurl.com/greentechideathon';

$navLinks = [
    ['id' => 'featured-event', 'label' => 'Events', 'display' => 'EVENTS (GREENTECH)'],
    ['id' => 'partners', 'label' => 'Partners', 'display' => 'PARTNERS'],
    ['id' => 'organizers', 'label' => 'Team', 'display' => 'TEAM'],
    ['id' => 'event-archive', 'label' => 'Archive', 'display' => 'PAST ARCHIVE'],
];
?>
<header
    id="main-navbar"
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-xs py-5 border-b border-transparent"
>
    <div class="relative z-40 w-full max-w-[1800px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        <!-- Brand Left -->
        <a href="/" class="group flex items-center gap-3 select-none" id="navbar-brand">
            <div class="w-2.5 h-2.5 bg-emerald-600 dark:bg-accent group-hover:scale-110 transition-transform duration-200" />
            <span class="font-display font-bold text-xl tracking-tight text-slate-950 dark:text-[#F5F5F0]">
                KAIZEN HACKS
            </span>
            <span class="hidden sm:inline-block text-[10px] mono text-emerald-700 dark:text-accent bg-emerald-50 dark:bg-accent/10 px-2 py-0.5 border border-emerald-300 dark:border-accent/20 font-bold">
                SPRINT // 2026
            </span>
        </a>

        <!-- Desktop Nav Right -->
        <div class="hidden lg:flex items-center gap-6 xl:gap-8">
            <nav class="flex items-center gap-5 xl:gap-7 text-xs uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] font-medium mono">
                <?php foreach ($navLinks as $i => $link): ?>
                    <button
                        data-nav-target="<?= htmlspecialchars($link['id'], ENT_QUOTES, 'UTF-8') ?>"
                        class="relative py-1 uppercase transition-colors cursor-pointer group/link inline-flex items-start gap-1 text-slate-700 dark:text-[#A9ADA9] hover:text-slate-950 dark:hover:text-[#F5F5F0]"
                    >
                        <span class="mono text-[8px] tracking-[0.12em] mt-px transition-colors text-slate-400 dark:text-[#565C57] group-hover/link:text-slate-500 dark:group-hover/link:text-[#565C57]">
                            <?= str_pad((string)($i + 1), 2, '0', STR_PAD_LEFT) ?>
                        </span>
                        <?= htmlspecialchars($link['label'], ENT_QUOTES, 'UTF-8') ?>
                    </button>
                <?php endforeach; ?>
            </nav>

            <!-- Theme Toggle Button -->
            <button
                id="desktop-theme-toggle"
                title="Switch theme"
                class="text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:border-emerald-600/40 dark:hover:border-accent/30 p-1.5 cursor-pointer border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C] transition-colors"
                aria-label="Toggle theme"
            >
                <!-- Sun icon (shown in dark mode) -->
                <svg class="hidden dark:block text-accent" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path><path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path><path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
                <!-- Moon icon (shown in light mode) -->
                <svg class="block dark:hidden text-emerald-700" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
            </button>

            <!-- Sound Toggle -->
            <button
                id="desktop-sound-toggle"
                title="Toggle micro-sounds"
                class="text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:border-emerald-600/40 dark:hover:border-accent/30 p-1.5 cursor-pointer border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C] transition-colors"
                aria-label="Toggle tactile sound"
            >
                <!-- Volume2 icon -->
                <svg id="sound-on-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
                <!-- VolumeX icon (hidden by default) -->
                <svg id="sound-off-icon" class="hidden text-slate-400 dark:text-[#565C57]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="22" y1="9" x2="16" y2="15"></line>
                    <line x1="16" y1="9" x2="22" y2="15"></line>
                </svg>
            </button>

            <!-- Primary CTA -->
            <a
                id="nav-register-btn"
                href="<?= htmlspecialchars($registrationUrl, ENT_QUOTES, 'UTF-8') ?>"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-solid group px-5 py-2.5 tracking-widest text-xs"
            >
                REGISTER
                <span class="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
        </div>

        <!-- Mobile controls -->
        <div class="flex lg:hidden items-center gap-2">
            <!-- Mobile Theme Toggle -->
            <button
                id="mobile-theme-toggle"
                class="p-2 text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C]"
                aria-label="Toggle theme"
            >
                <svg class="hidden dark:block" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path><path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path><path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
                <svg class="block dark:hidden" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
            </button>

            <!-- Mobile Sound Toggle (sm and up only) -->
            <button
                id="mobile-sound-toggle"
                class="hidden sm:block p-2 text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C]"
                aria-label="Toggle sound"
            >
                <svg class="mobile-sound-on" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
                <svg class="mobile-sound-off hidden" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="22" y1="9" x2="16" y2="15"></line>
                    <line x1="16" y1="9" x2="22" y2="15"></line>
                </svg>
            </button>

            <!-- Mobile Register CTA (below sm only) -->
            <a
                href="<?= htmlspecialchars($registrationUrl, ENT_QUOTES, 'UTF-8') ?>"
                target="_blank"
                rel="noopener noreferrer"
                class="sm:hidden cta-solid px-3 py-2 text-[10px] tracking-wider"
                aria-label="Register for the ideathon"
            >
                REGISTER →
            </a>

            <!-- Hamburger Menu Button -->
            <button
                id="mobile-menu-btn"
                aria-expanded="false"
                aria-controls="mobile-menu-panel"
                class="p-2 text-slate-900 dark:text-[#F5F5F0] hover:text-emerald-700 dark:hover:text-accent border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C]"
                aria-label="Open menu"
            >
                <!-- Menu icon -->
                <svg class="menu-open-icon hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <!-- Menu icon (default) -->
                <svg class="menu-closed-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
            </button>
        </div>
    </div>

    <!-- Scroll progress hairline -->
    <div id="scroll-progress" class="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-600 dark:bg-accent origin-left opacity-70" style="transform: scaleX(0);"></div>

    <!-- Mobile Full-Screen Menu Sheet -->
    <div
        id="mobile-menu-panel"
        class="lg:hidden fixed inset-0 top-0 z-30 bg-[#F2F7F1] dark:bg-[#0B0D0C] overflow-y-auto overscroll-contain hidden"
    >
        <!-- Clear the fixed header bar -->
        <div class="h-[68px] sm:h-[76px]" aria-hidden="true" />

        <!-- Ghost numeral backdrop -->
        <div aria-hidden="true" class="ghost-numeral absolute -bottom-8 -right-4 text-[220px] opacity-[0.04] dark:opacity-[0.05] pointer-events-none select-none">KZ</div>
        <div aria-hidden="true" class="absolute inset-x-0 top-0 h-56 grid-subtle opacity-40 dark:opacity-25 grid-fade-y pointer-events-none" />

        <nav class="relative z-10 flex flex-col px-6 sm:px-8 pt-6 pb-10 min-h-full">
            <div class="mono text-[9px] tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/80 mb-2">
                MENU.INDEX // KAIZEN_SYSTEM
            </div>

            <div class="flex flex-col text-sm mono tracking-widest text-slate-700 dark:text-[#A9ADA9]">
                <?php foreach ($navLinks as $i => $link): ?>
                    <button
                        data-nav-target="<?= htmlspecialchars($link['id'], ENT_QUOTES, 'UTF-8') ?>"
                        class="group text-left py-4 sm:py-5 border-b transition-colors uppercase flex items-baseline gap-4 cursor-pointer text-slate-800 dark:text-[#A9ADA9] hover:text-slate-950 dark:hover:text-[#F5F5F0] border-slate-200 dark:border-[#1A1C1A]"
                    >
                        <span class="mono text-[10px] tracking-[0.2em] text-slate-400 dark:text-[#565C57]">
                            <?= str_pad((string)($i + 1), 2, '0', STR_PAD_LEFT) ?>
                        </span>
                        <span class="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-none">
                            <?= htmlspecialchars($link['display'], ENT_QUOTES, 'UTF-8') ?>
                        </span>
                        <span class="ml-auto self-center font-mono text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-600 dark:text-accent" aria-hidden="true">→</span>
                    </button>
                <?php endforeach; ?>

                <a
                    href="<?= htmlspecialchars($registrationUrl, ENT_QUOTES, 'UTF-8') ?>"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-8 w-full cta-solid py-4 text-xs tracking-widest"
                >
                    <span>REGISTER FOR IDEATHON</span>
                    <span aria-hidden="true">→</span>
                </a>
            </div>

            <div class="mt-auto pt-10 flex items-center justify-between mono text-[9px] tracking-[0.22em] uppercase text-slate-400 dark:text-[#3D443D]/70" aria-hidden="true">
                <span>NODE: DELHI_KALKAJI</span>
                <span class="flex items-center gap-1.5">
                    <span class="w-1 h-1 bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block" />
                    SYS_OK
                </span>
            </div>
        </nav>
    </div>
</header>
