<?php
declare(strict_types=1);

$registrationUrl = 'https://www.tinyurl.com/greentechideathon';

$footerPartners = [
    ['id' => 'p1', 'name' => 'Kaizen Labs', 'website' => '#'],
    ['id' => 'p2', 'name' => 'GreenTech', 'website' => '#'],
    ['id' => 'p3', 'name' => 'Open Source', 'website' => '#'],
    ['id' => 'p4', 'name' => 'Community', 'website' => '#'],
];
?>
<footer class="bg-[#F2F7F1] dark:bg-[#050605] border-t border-slate-300 dark:border-[#1A1C1A] pt-14 sm:pt-16 pb-8 px-5 sm:px-8 lg:px-12 w-full select-none">
    <!-- Top Navigation & Minimal Columns -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-10 border-b border-slate-200 dark:border-[#1A1C1A]">
        <!-- Left Col: Brand & System Status -->
        <div class="md:col-span-5 flex flex-col justify-between">
            <div>
                <div class="flex items-center gap-3">
                    <span class="w-2.5 h-2.5 bg-emerald-600 dark:bg-accent" />
                    <span class="font-display text-xl font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0]">
                        KAIZEN HACKS
                    </span>
                </div>
                <p class="mt-4 text-xs mono text-slate-700 dark:text-[#A9ADA9] max-w-sm leading-relaxed">
                    A high-signal builder collective launching with the GreenTech Ideathon — turning SDG ideas into working apps, websites, and games that tackle real-world problems.
                </p>
            </div>

            <div class="mt-5 flex items-center gap-4 text-[11px] mono text-slate-600 dark:text-[#565C57]">
                <span class="text-emerald-700 dark:text-accent flex items-center gap-1.5 font-bold">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse" />
                    STATUS: NOMINAL
                </span>
                <span>·</span>
                <span id="footer-ist-clock" class="font-medium text-slate-700 dark:text-[#565C57]">--:--:-- IST</span>
                <span>·</span>
                <span id="footer-utc-clock" class="font-medium text-slate-700 dark:text-[#565C57]">--:--:-- UTC</span>
            </div>
        </div>

        <!-- Middle Col: Navigation Links -->
        <div class="md:col-span-4 grid grid-cols-2 gap-6 text-xs mono">
            <div>
                <div class="text-emerald-700 dark:text-accent uppercase tracking-widest mb-3 font-bold">NAVIGATION</div>
                <ul class="space-y-2.5 text-slate-700 dark:text-[#A9ADA9] font-medium">
                    <li>
                        <button data-nav-target="featured-event" class="hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors cursor-pointer uppercase">
                            Events
                        </button>
                    </li>
                    <li>
                        <button data-nav-target="partners" class="hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors cursor-pointer uppercase">
                            Partners
                        </button>
                    </li>
                    <li>
                        <button data-nav-target="organizers" class="hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors cursor-pointer uppercase">
                            Team
                        </button>
                    </li>
                    <li>
                        <button data-nav-target="event-archive" class="hover:text-slate-950 dark:hover:text-[#F5F5F0] transition-colors cursor-pointer uppercase">
                            Archive
                        </button>
                    </li>
                </ul>
            </div>

            <div>
                <div class="text-emerald-700 dark:text-accent uppercase tracking-widest mb-3 font-bold">ACTIONS</div>
                <ul class="space-y-2.5 text-slate-700 dark:text-[#A9ADA9]">
                    <li>
                        <a
                            href="<?= htmlspecialchars($registrationUrl, ENT_QUOTES, 'UTF-8') ?>"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-emerald-700 hover:text-emerald-800 dark:text-accent dark:hover:text-accent transition-colors cursor-pointer uppercase font-bold"
                        >
                            REGISTER →
                        </a>
                    </li>
                    <li>
                        <button
                            id="footer-partner-btn"
                            class="text-emerald-700 hover:text-emerald-800 dark:text-accent dark:hover:text-accent transition-colors cursor-pointer uppercase font-bold"
                        >
                            PARTNERSHIP →
                        </button>
                    </li>
                    <li>
                        <a
                            href="mailto:build@kaizenhacks.org"
                            class="hover:text-emerald-700 dark:hover:text-accent transition-colors uppercase flex items-center gap-1 font-medium"
                        >
                            CONTACT ↗
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Right Col: Social & Back to Top -->
        <div class="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div class="flex items-center gap-3 text-slate-700 dark:text-[#A9ADA9]">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2.5 bg-white dark:bg-[#0B0D0C] hover:bg-emerald-600 hover:text-white dark:hover:bg-accent dark:hover:text-[#050605] border border-slate-300 dark:border-[#1A1C1A] transition-colors shadow-sm"
                    aria-label="GitHub"
                >
                    <!-- GitHub icon -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                    </svg>
                </a>
                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2.5 bg-white dark:bg-[#0B0D0C] hover:bg-emerald-600 hover:text-white dark:hover:bg-accent dark:hover:text-[#050605] border border-slate-300 dark:border-[#1A1C1A] transition-colors shadow-sm"
                    aria-label="Twitter"
                >
                    <!-- Twitter / X icon -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                </a>
                <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2.5 bg-white dark:bg-[#0B0D0C] hover:bg-emerald-600 hover:text-white dark:hover:bg-accent dark:hover:text-[#050605] border border-slate-300 dark:border-[#1A1C1A] transition-colors shadow-sm"
                    aria-label="Discord"
                >
                    <!-- Discord icon -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17.5 8A6.5 6.5 0 1 0 5.1 16.1c.5.8 1.1 1.5 1.6 2.2l.3.4 1.2-.3a7.8 7.8 0 0 0 2.4 0l1.2.3.3-.4c.5-.7 1.1-1.4 1.6-2.2A6.5 6.5 0 0 0 17.5 8Z"/>
                        <circle cx="9" cy="12" r="1"/>
                        <circle cx="15" cy="12" r="1"/>
                    </svg>
                </a>
                <a
                    href="mailto:team@kaizenhacks.org"
                    class="p-2.5 bg-white dark:bg-[#0B0D0C] hover:bg-emerald-600 hover:text-white dark:hover:bg-accent dark:hover:text-[#050605] border border-slate-300 dark:border-[#1A1C1A] transition-colors shadow-sm"
                    aria-label="Email"
                >
                    <!-- Mail icon -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                </a>
            </div>

            <button
                id="back-to-top-btn"
                class="mt-6 md:mt-0 flex items-center gap-2 text-xs mono text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent font-semibold transition-colors cursor-pointer"
            >
                <span>BACK TO TOP</span>
                <!-- ArrowUp icon -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                </svg>
            </button>
        </div>
    </div>

    <!-- FOOTER BAR -->
    <div class="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] mono text-slate-600 dark:text-[#A9ADA9]">
        <div class="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-1 font-medium">
            <span class="text-emerald-700 dark:text-accent font-bold">SUPPORTED BY</span>
            <?php foreach ($footerPartners as $partner): ?>
                <a
                    href="<?= htmlspecialchars($partner['website'], ENT_QUOTES, 'UTF-8') ?>"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-slate-800 dark:text-[#F5F5F0] opacity-80 uppercase hover:opacity-100 hover:text-emerald-700 dark:hover:text-accent transition-all"
                >
                    <?= htmlspecialchars($partner['name'], ENT_QUOTES, 'UTF-8') ?>
                </a>
            <?php endforeach; ?>
            <button
                id="footer-your-logo-btn"
                class="text-slate-500 dark:text-[#565C57] uppercase hover:text-emerald-700 dark:hover:text-accent transition-colors cursor-pointer"
            >
                + YOUR LOGO
            </button>
        </div>
        <div class="text-slate-600 dark:text-[#A9ADA9] mt-2 md:mt-0 font-medium">
            © 2026 KAIZEN HACKS / CONTINUOUS BUILDER EVOLUTION.
        </div>
    </div>

    <!-- Subtle Bottom Coordinates & Node Status -->
    <div class="pt-5 mt-5 border-t border-slate-200 dark:border-[#1A1C1A]/60 flex flex-col sm:flex-row items-center justify-between text-[9px] mono text-slate-500 dark:text-[#565C57]">
        <div>KAIZEN_SYSTEM_ONLINE // B_01 // 28.6139° N, 77.2090° E</div>
        <div class="mt-1 sm:mt-0">NEW DELHI // KALKAJI</div>
    </div>
</footer>

<script>
(function () {
    /* Live clocks */
    function updateClocks() {
        var now = new Date();
        var istEl = document.getElementById('footer-ist-clock');
        var utcEl = document.getElementById('footer-utc-clock');
        if (istEl) istEl.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST';
        if (utcEl) utcEl.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false }) + ' UTC';
    }
    updateClocks();
    setInterval(updateClocks, 1000);

    /* Back to top */
    var btt = document.getElementById('back-to-top-btn');
    if (btt) {
        btt.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
</script>
