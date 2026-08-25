<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/app/bootstrap.php';

use App\Config\Database;
use App\Services\EventService;

$eventService = new EventService();
$featuredEvent = $eventService->getFeatured();
$organizers = $eventService->getOrganizers();
$partners = $eventService->getPartners();

$registrationUrl = 'https://www.tinyurl.com/greentechideathon';
$venueMapsUrl = 'https://www.google.com/maps/search/?api=1&query=DBRA+SOSE+Kalkaji+New+Delhi';
$contactEmail = 'support@kaizenhacks.tech';

$pageTitle = 'Kaizen Hacks — Continuous Builder Evolution';

$keyStats = [
    ['value' => '50', 'label' => 'BUILDER SEATS', 'sub' => 'Founding cohort — Vol. 01'],
    ['value' => sprintf('%02d', count($partners)), 'label' => 'ECOSYSTEM PARTNERS', 'sub' => 'Compute, AI & venture network'],
    ['value' => '01', 'label' => 'DAY SPRINT', 'sub' => 'One-day ideathon format'],
    ['value' => '∞', 'label' => 'IDEAS', 'sub' => 'A place for them to happen'],
];

$marqueeItems = [
    'GREENTECH IDEATHON',
    'BUILD FOR THE SDGs',
    'APPS · WEBSITES · GAMES',
    'REAL PROBLEMS, REAL SOLUTIONS',
    '50 BUILDER SEATS',
    'CM SHRI / DBRA SOSE KALKAJI',
    'IDEAS TO WORKING BUILDS',
    'ZERO NOISE',
    'CONTINUOUS EVOLUTION',
    'KAIZEN HACKS',
];

$headlines = [
    ['line1' => 'BUILD.', 'line2' => 'FOR THE', 'line3' => 'PLANET.'],
    ['line1' => 'IDEAS THAT', 'line2' => 'SOLVE', 'line3' => 'REAL PROBLEMS.'],
    ['line1' => 'THINK.', 'line2' => 'BUILD.', 'line3' => 'IMPACT.'],
];

include dirname(__DIR__) . '/includes/header.php';
include dirname(__DIR__) . '/includes/navbar.php';
?>

<main class="relative z-10 flex-1">

<!-- ============================================================
     SECTION 1: HERO
     ============================================================ -->
<section
    id="hero-section"
    class="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 w-full overflow-hidden select-none"
>
    <!-- Technical backdrop — ghost numeral, crosshair grid, system nodes -->
    <div class="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        <!-- Oversized edition numeral -->
        <div class="ghost-numeral absolute -bottom-14 -left-6 text-[340px] xl:text-[420px] opacity-[0.05] dark:opacity-[0.06]">
            01
        </div>

        <!-- Crosshair through orbital ring -->
        <div class="absolute top-[calc(24%+7rem)] right-[calc(4%+7rem)] w-[42rem] max-w-[70vw] h-px bg-slate-400/25 dark:bg-[#1E231F]"></div>
        <div class="absolute top-[calc(24%-14rem)] right-[calc(4%+7rem)] w-px h-[42rem] max-h-[80vh] bg-slate-400/20 dark:bg-[#161A17]"></div>

        <!-- Measurement ticks along the crosshair -->
        <div class="absolute top-[calc(24%+7rem)] right-[calc(4%+9rem)] flex gap-6">
            <span class="w-px bg-slate-400/40 dark:bg-[#242825] h-2"></span>
            <span class="w-px bg-slate-400/40 dark:bg-[#242825] h-1"></span>
            <span class="w-px bg-slate-400/40 dark:bg-[#242825] h-2"></span>
            <span class="w-px bg-slate-400/40 dark:bg-[#242825] h-1"></span>
            <span class="w-px bg-slate-400/40 dark:bg-[#242825] h-2"></span>
        </div>

        <!-- Node cluster -->
        <div class="absolute top-[calc(24%+7rem)] right-[calc(4%+7rem)]">
            <span class="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent opacity-50 blink-dot inline-block"></span>
        </div>
        <span class="absolute top-[calc(24%+8.5rem)] right-[calc(4%+8.5rem)] mono text-[8px] tracking-[0.3em] text-slate-400 dark:text-[#333833]/70 uppercase">
            NODE_28 // SYNCED
        </span>

        <!-- Floating environmental decorations -->
        <div class="float-deco absolute top-[30%] right-[38%] text-accent/40 dark:text-accent/30 mono text-sm select-none">+</div>
        <div class="float-deco absolute bottom-[26%] left-[42%] text-emerald-600/30 dark:text-accent/20 mono text-xs select-none">+</div>
        <div class="float-deco absolute top-[24%] right-[4%] w-56 h-56 rounded-full border border-slate-300/70 dark:border-[#161A17]"></div>
        <div class="float-deco absolute top-[24%] right-[4%] w-56 h-56 hidden xl:flex items-center justify-center">
            <span class="mono text-[8px] tracking-[0.3em] text-slate-400 dark:text-[#333833]/70">ORBITAL.SYNC</span>
        </div>
        <div class="absolute top-[52%] left-[-1%] w-24 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-[#1E231F] to-transparent"></div>
        <div class="absolute bottom-[18%] right-[30%] flex items-center gap-2 mono text-[9px] tracking-widest text-slate-500 dark:text-[#3D443D]/80 uppercase">
            <span class="w-1 h-1 bg-emerald-600/70 dark:bg-accent/50 blink-dot"></span>
            LINK_STABLE
        </div>
    </div>

    <!-- Vertical sector coordinates -->
    <div class="absolute top-1/3 right-3 mono text-[9px] tracking-widest text-slate-400 dark:text-[#1A1C1A] rotate-90 origin-right hidden xl:block pointer-events-none" aria-hidden="true">
        SECTOR.07 // 28.5270° N — 77.2590° E
    </div>

    <!-- Micro Status Bar / Coordinate Header -->
    <div class="relative z-10">
        <div
            class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-300 dark:border-[#1A1C1A] pb-4 mb-8 text-[11px] mono text-slate-600 dark:text-[#A9ADA9] opacity-0 animate-[kz-slide-down_0.8s_ease-out_0.2s_forwards]"
        >
            <div class="flex items-center gap-3">
                <span class="flex h-2 w-2 relative">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 dark:bg-accent opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-accent"></span>
                </span>
                <span class="text-slate-950 dark:text-[#F5F5F0] font-semibold">
                    KAIZEN HACKS // SPRINT LABS
                </span>
                <span class="hidden sm:inline text-slate-300 dark:text-[#565C57]">|</span>
                <span class="hidden sm:inline text-slate-600 dark:text-[#565C57]">LAT: 28.5270° N / LONG: 77.2590° E</span>
            </div>

            <div class="flex items-center gap-4 text-emerald-700 dark:text-accent">
                <span class="hidden lg:inline mono text-[10px] text-slate-500 dark:text-[#565C57]/90">
                    SYS.STATUS // ONLINE
                </span>
                <span class="hidden md:inline mono text-[10px] text-slate-600 dark:text-[#A9ADA9]">
                    PROTOCOL: V2.6_STABLE
                </span>
                <span class="bg-emerald-50 dark:bg-accent/10 border border-emerald-300 dark:border-accent/20 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                    ● IDEATHON EDITION
                </span>
            </div>
        </div>
    </div>

    <!-- Clean Minimalism Split Hero Layout -->
    <div class="relative z-10 flex-grow flex flex-col lg:flex-row gap-8 my-auto py-2">

        <!-- LEFT COLUMN: HERO HEADLINE & METRICS -->
        <div class="w-full lg:w-2/3 flex flex-col justify-between">
            <div class="mt-2 sm:mt-6">
                <p class="mono text-emerald-700 dark:text-accent text-xs mb-4 tracking-widest font-bold uppercase opacity-0 animate-[kz-fade-in_0.7s_ease-out_0.4s_forwards]">
                    IDEATHONS / EVENTS / CONTINUOUS SHIP CULTURE
                </p>

                <h1
                    id="hero-headline"
                    class="font-display text-[clamp(2.75rem,11vw,3.25rem)] sm:text-[68px] md:text-[84px] lg:text-[5.9vw] xl:text-[6.4vw] 2xl:text-[7vw] leading-[0.88] font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0] uppercase mb-6 select-none"
                    data-headlines="<?= htmlspecialchars(json_encode($headlines), ENT_QUOTES, 'UTF-8') ?>"
                >
                    <div data-line="1">BUILD.</div>
                    <div data-line="2" class="text-slate-500 dark:text-[#A9ADA9]/60">FOR THE</div>
                    <div data-line="3" class="text-emerald-600 dark:text-accent">PLANET.</div>
                </h1>

                <p class="max-w-xl text-sm sm:text-base mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed opacity-0 animate-[kz-fade-in_0.8s_ease-out_0.7s_forwards]">
                    No endless keynote talks. No vanity pitches. An ideathon where ideas for the UN Sustainable Development Goals become real apps, websites, and games tackling everyday problems.
                </p>
            </div>

            <!-- Scale & Community Indicators -->
            <div class="border-t border-slate-300 dark:border-[#1A1C1A] pt-8 mt-10 flex flex-wrap gap-8 sm:gap-12 opacity-0 animate-[kz-fade-in_0.8s_ease-out_0.8s_forwards]">
                <div>
                    <p class="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold"><span class="text-emerald-600 dark:text-accent mr-1">▪</span>SCALE</p>
                    <p class="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0]">DEBUT EDITION</p>
                </div>
                <div>
                    <p class="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold"><span class="text-emerald-600 dark:text-accent mr-1">▪</span>COMMUNITY</p>
                    <p class="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0]">FOUNDING 50</p>
                </div>
                <div>
                    <p class="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] mb-1 font-semibold"><span class="text-emerald-600 dark:text-accent mr-1">▪</span>GRANTS POOL</p>
                    <p class="font-display text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-accent">UNLOCKING SOON</p>
                </div>
            </div>
        </div>

        <!-- RIGHT COLUMN: FEATURED EVENT PANEL -->
        <div class="w-full lg:w-1/3 flex flex-col gap-6">
            <div class="event-panel flex-grow p-6 sm:p-8 border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C] relative flex flex-col justify-between overflow-hidden group shadow-md hover:shadow-xl hover:border-emerald-600/50 dark:hover:border-accent/40 transition-all duration-300 will-change-transform">
                <!-- Corner brackets (hover-activated) -->
                <span aria-hidden="true" class="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                <span aria-hidden="true" class="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                <span aria-hidden="true" class="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                <span aria-hidden="true" class="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>

                <!-- Ghost event code -->
                <div class="ghost-numeral absolute -top-5 -right-3 text-[110px] opacity-[0.04] dark:opacity-[0.05]" aria-hidden="true">GT</div>
                <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 dark:bg-accent/10 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-8">
                        <span class="mono text-[10px] bg-emerald-50 text-emerald-700 dark:bg-accent/10 dark:text-accent px-2 py-1 border border-emerald-300 dark:border-accent/20 font-bold uppercase">
                            NEXT EVENT / OPEN
                        </span>
                        <span class="mono text-[10px] text-slate-600 dark:text-[#A9ADA9] bg-slate-100 dark:bg-[#050605] px-2 py-1 border border-slate-300 dark:border-[#1A1C1A]">
                            <?= htmlspecialchars($featuredEvent['date_text'] ?? 'COMING SOON', ENT_QUOTES, 'UTF-8') ?>
                        </span>
                    </div>

                    <h2 class="font-display text-4xl sm:text-5xl font-bold mb-6 tracking-tighter text-slate-950 dark:text-[#F5F5F0] uppercase">
                        GREEN<br>TECH
                    </h2>

                    <div class="space-y-3.5 text-sm mono">
                        <div class="flex justify-between gap-3 border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                            <span class="text-slate-600 dark:text-[#A9ADA9] shrink-0">LOCATION</span>
                            <a
                                href="<?= htmlspecialchars($venueMapsUrl, ENT_QUOTES, 'UTF-8') ?>"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open in Google Maps"
                                class="font-bold uppercase text-right text-emerald-700 dark:text-accent hover:underline decoration-dotted underline-offset-2 text-xs"
                            >
                                CM Shri/DBRA SOSE Kalkaji ↗
                            </a>
                        </div>
                        <div class="flex justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                            <span class="text-slate-600 dark:text-[#A9ADA9]">DURATION</span>
                            <span class="font-bold uppercase text-slate-950 dark:text-[#F5F5F0]">One Day Ideathon</span>
                        </div>
                        <div class="flex justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                            <span class="text-slate-600 dark:text-[#A9ADA9]">CAPACITY</span>
                            <span class="font-bold uppercase text-emerald-700 dark:text-accent">50 Builders</span>
                        </div>
                        <div class="flex justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-2">
                            <span class="text-slate-600 dark:text-[#A9ADA9]">PRIZE POOL</span>
                            <span class="font-bold uppercase text-emerald-700 dark:text-accent">To Be Revealed</span>
                        </div>
                    </div>
                </div>

                <div class="relative z-10">
                    <a
                        id="hero-claim-spot-btn"
                        href="<?= htmlspecialchars($registrationUrl, ENT_QUOTES, 'UTF-8') ?>"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="cta-solid group/btn relative w-full mt-8 py-4 text-xs sm:text-sm tracking-widest"
                    >
                        <span>CLAIM YOUR SPOT</span>
                        <span class="inline-block transition-transform duration-200 group-hover/btn:translate-x-1.5">→</span>
                        <span class="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-[#050605]/80 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" aria-hidden="true"></span>
                    </a>

                    <button
                        onclick="document.getElementById('featured-event').scrollIntoView({behavior:'smooth'})"
                        class="w-full mt-2.5 py-2.5 mono text-[10px] tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57] hover:text-emerald-700 dark:hover:text-accent transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                        VIEW EVENT BRIEF <span aria-hidden="true">↓</span>
                    </button>
                </div>

                <div class="relative z-10 mt-3 flex items-center justify-between mono text-[8px] tracking-[0.22em] uppercase text-slate-400 dark:text-[#3D443D]/70">
                    <span>NODE: DELHI_KALKAJI</span>
                    <span class="flex items-center gap-1.5">
                        <span class="w-1 h-1 bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block"></span>
                        SYNC_OK
                    </span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     SECTION 2: MARQUEE TICKER
     ============================================================ -->
<div class="relative w-full border-y border-slate-300 dark:border-[#1A1C1A] bg-[#DEE8DB]/70 dark:bg-[#080A09] py-3.5 overflow-hidden select-none">
    <!-- Edge gradient masks -->
    <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#EDF3EC] dark:from-[#050605] to-transparent z-10 pointer-events-none"></div>
    <div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#EDF3EC] dark:from-[#050605] to-transparent z-10 pointer-events-none"></div>

    <div class="flex w-max animate-[marquee_28s_linear_infinite] motion-reduce:animate-none whitespace-nowrap hover:[animation-play-state:paused]">
        <?php
        $allItems = array_merge($marqueeItems, $marqueeItems, $marqueeItems);
        foreach ($allItems as $idx => $text):
            $isClone = $idx >= count($marqueeItems);
        ?>
            <div
                aria-hidden="<?= $isClone ? 'true' : 'false' ?>"
                class="flex items-center gap-6 mx-6 text-xs sm:text-sm font-mono tracking-widest text-slate-800 dark:text-[#A9ADA9] uppercase"
            >
                <span class="hover:text-emerald-700 dark:hover:text-accent transition-colors font-semibold"><?= htmlspecialchars($text, ENT_QUOTES, 'UTF-8') ?></span>
                <span class="text-emerald-600 dark:text-accent font-bold" aria-hidden="true">→</span>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<!-- ============================================================
     SECTION 3: FEATURED EVENT
     ============================================================ -->
<section
    id="featured-event"
    class="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
>
    <!-- Section Header -->
    <div class="flex flex-wrap items-end justify-between gap-4 mb-8 border-b border-slate-300 dark:border-[#1A1C1A] pb-4">
        <div>
            <div class="flex items-center gap-2 text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
                <span class="w-2 h-2 rounded-full bg-emerald-600 dark:bg-accent animate-pulse"></span>
                <span>PRIMARY CENTERPIECE // UPCOMING EVENT</span>
            </div>
            <h2 class="font-display font-bold text-3xl sm:text-4xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
                NEXT HACKATHON
            </h2>
        </div>

        <!-- Status Pill -->
        <div class="flex items-center gap-3">
            <span class="hidden sm:inline mono text-[10px] text-slate-500 dark:text-[#565C57]/90 uppercase tracking-widest">
                EVENT // VOL.01
            </span>
            <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-accent/10 border border-emerald-300 dark:border-accent/30 text-xs mono text-emerald-700 dark:text-accent uppercase tracking-wider font-bold">
                <span class="inline-block w-1.5 h-1.5 bg-emerald-600 dark:bg-accent animate-pulse"></span>
                <span>LIMITED SEATS: 50</span>
            </div>
        </div>
    </div>

    <!-- Main Visual Panel -->
    <div class="relative group event-panel border border-slate-300 dark:border-[#1A1C1A] bg-white dark:bg-[#0B0D0C] hover:border-emerald-600/60 dark:hover:border-accent/50 transition-all duration-300 overflow-hidden shadow-md hover:shadow-2xl">
        <!-- Corner brackets -->
        <span aria-hidden="true" class="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
        <span aria-hidden="true" class="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
        <span aria-hidden="true" class="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
        <span aria-hidden="true" class="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>

        <!-- Hover glow halo -->
        <div class="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="box-shadow: inset 0 0 60px rgba(141, 255, 179, 0.04);"></div>

        <!-- Background Visual Layer -->
        <div class="absolute inset-0 z-0 overflow-hidden opacity-[0.13] dark:opacity-30 group-hover:opacity-[0.18] dark:group-hover:opacity-40 transition-opacity duration-500">
            <?php if (!empty($featuredEvent['image_url'])): ?>
            <img
                src="<?= htmlspecialchars($featuredEvent['image_url'], ENT_QUOTES, 'UTF-8') ?>"
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden="true"
                class="w-full h-full object-cover object-center grayscale contrast-150 transition-transform duration-700 scale-110"
            >
            <?php endif; ?>
            <div class="absolute inset-0 bg-emerald-700/25 dark:bg-accent/[0.06] mix-blend-color pointer-events-none"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0B0D0C] via-white/85 dark:via-[#0B0D0C]/85 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-white dark:from-[#0B0D0C] via-white/75 dark:via-[#0B0D0C]/75 to-transparent"></div>
            <div class="absolute inset-0 tech-grid-fine opacity-40"></div>
        </div>

        <!-- Technical frame annotations -->
        <div class="absolute top-4 right-5 z-10 hidden md:flex flex-col items-end gap-1 mono text-[8px] tracking-[0.28em] uppercase text-slate-400 dark:text-[#333833]/60 pointer-events-none" aria-hidden="true">
            <span>FIG.01 — EVENT NODE</span>
            <span>IMG.SRC // MONO_TREATMENT</span>
        </div>

        <!-- Content Container -->
        <div class="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-between min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]">

            <!-- Top Row: Meta bar & Date status -->
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-[#1A1C1A] pb-6">
                <div class="flex flex-wrap items-center gap-3 sm:gap-6 text-xs mono text-slate-700 dark:text-[#A9ADA9]">
                    <span class="px-2.5 py-1 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] text-slate-950 dark:text-[#F5F5F0] uppercase font-bold">
                        <?= htmlspecialchars($featuredEvent['edition'] ?? 'VOL. 01', ENT_QUOTES, 'UTF-8') ?>
                    </span>
                    <span class="flex items-center gap-1.5 text-slate-950 dark:text-[#F5F5F0] font-medium">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600 dark:text-accent"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        <?= htmlspecialchars($featuredEvent['date_text'] ?? 'COMING SOON', ENT_QUOTES, 'UTF-8') ?>
                    </span>
                    <a
                        href="<?= htmlspecialchars($featuredEvent['maps_url'] ?? $venueMapsUrl, ENT_QUOTES, 'UTF-8') ?>"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in Google Maps"
                        class="flex items-center gap-1.5 hover:text-emerald-700 dark:hover:text-accent transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600 dark:text-accent"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        <?= htmlspecialchars($featuredEvent['city'] ?? 'NEW DELHI', ENT_QUOTES, 'UTF-8') ?> ↗
                    </a>
                    <span class="flex items-center gap-1.5">
                        <?= htmlspecialchars($featuredEvent['duration'] ?? 'ONE DAY', ENT_QUOTES, 'UTF-8') ?> IDEATHON
                    </span>
                    <span class="hidden xl:flex items-center gap-1.5 text-slate-500 dark:text-[#565C57]/90">
                        T-MINUS
                        <span class="text-emerald-700 dark:text-accent font-bold">--:--<span class="blink-dot">_</span></span>
                    </span>
                </div>

                <!-- Status HUD -->
                <div class="flex items-center gap-3 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] px-4 py-2 self-start lg:self-auto">
                    <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse"></span>
                    <div class="mono text-xs sm:text-sm font-bold text-emerald-700 dark:text-accent tracking-wider uppercase">
                        Registrations Open
                    </div>
                </div>
            </div>

            <!-- Center Visual Core -->
            <div class="my-8 lg:my-10">
                <div class="inline-block text-xs mono tracking-widest text-emerald-700 dark:text-accent uppercase mb-2 font-bold">
                    IDEATHON CODEX // BUILD FOR THE GOALS
                </div>

                <h1 class="font-display font-bold text-[clamp(3rem,13vw,7rem)] sm:text-7xl md:text-8xl lg:text-9xl text-slate-950 dark:text-[#F5F5F0] tracking-tighter uppercase leading-none">
                    <?= htmlspecialchars($featuredEvent['name'] ?? 'GREENTECH', ENT_QUOTES, 'UTF-8') ?>
                </h1>

                <!-- Compact Numbers Grid -->
                <div class="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-y border-slate-200 dark:border-[#1A1C1A] py-6 max-w-4xl">
                    <div>
                        <div class="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">CAPACITY</div>
                        <div class="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0] mt-1">50</div>
                        <div class="text-[11px] mono text-slate-500 dark:text-[#565C57]">Builder Seats</div>
                    </div>
                    <div>
                        <div class="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">PRIZE POOL</div>
                        <div class="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 dark:text-accent mt-1">TBA</div>
                        <div class="text-[11px] mono text-slate-500 dark:text-[#565C57]">To Be Revealed</div>
                    </div>
                    <div>
                        <div class="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">DURATION</div>
                        <div class="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-[#F5F5F0] mt-1">1 DAY</div>
                        <div class="text-[11px] mono text-slate-500 dark:text-[#565C57]">Ideathon Sprint</div>
                    </div>
                    <div>
                        <div class="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] tracking-widest uppercase font-semibold">VENUE</div>
                        <a
                            href="<?= htmlspecialchars($featuredEvent['maps_url'] ?? $venueMapsUrl, ENT_QUOTES, 'UTF-8') ?>"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open in Google Maps"
                            class="font-display text-lg sm:text-xl lg:text-2xl font-bold text-slate-950 dark:text-[#F5F5F0] mt-1 hover:text-emerald-700 dark:hover:text-accent transition-colors underline decoration-dotted underline-offset-4"
                        >
                            KALKAJI ↗
                        </a>
                        <div class="text-[11px] mono text-slate-500 dark:text-[#565C57]">CM Shri / DBRA SOSE</div>
                    </div>
                </div>

                <!-- Capacity allocation strip -->
                <div class="mt-5 max-w-4xl">
                    <div class="flex items-center justify-between mb-1.5">
                        <span class="text-[9px] mono tracking-[0.24em] uppercase text-slate-500 dark:text-[#565C57]/90 font-semibold">
                            SEAT ALLOCATION // ROLLING ADMISSION
                        </span>
                        <span class="text-[9px] mono tracking-[0.24em] uppercase text-emerald-700 dark:text-accent font-bold flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 bg-emerald-600 dark:bg-accent inline-block"></span>
                            OPEN
                        </span>
                    </div>
                    <div class="flex gap-1" aria-label="All 50 seats currently open for registration">
                        <?php for ($i = 0; $i < 10; $i++): ?>
                            <span class="h-1.5 flex-1 <?= $i % 3 === 2 ? 'bg-emerald-600 dark:bg-accent' : 'bg-emerald-600/30 dark:bg-accent/25' ?>"></span>
                        <?php endfor; ?>
                    </div>
                </div>

                <!-- Interactive Tab Switcher -->
                <div class="mt-8" id="featured-event-tabs" data-active-tab="OVERVIEW">
                    <div class="flex items-center gap-2 mb-4" role="tablist">
                        <?php
                        $tabs = ['OVERVIEW', 'TRACKS', 'TIMELINE'];
                        foreach ($tabs as $tab):
                            $isActive = $tab === 'OVERVIEW';
                        ?>
                            <button
                                role="tab"
                                aria-pressed="<?= $isActive ? 'true' : 'false' ?>"
                                data-tab="<?= htmlspecialchars($tab, ENT_QUOTES, 'UTF-8') ?>"
                                class="relative px-3 py-1.5 text-xs mono tracking-wider uppercase transition-colors cursor-pointer <?= $isActive
                                    ? 'text-white dark:text-[#050605] font-bold bg-emerald-600 dark:bg-accent shadow-sm'
                                    : 'bg-slate-100 dark:bg-[#050605] hover:bg-slate-200 dark:hover:bg-[#1A1C1A] text-slate-700 dark:text-[#A9ADA9] border border-slate-300 dark:border-[#1A1C1A]'
                                ?>"
                            >
                                <?= htmlspecialchars($tab, ENT_QUOTES, 'UTF-8') ?>
                            </button>
                        <?php endforeach; ?>
                    </div>

                    <!-- Tab: OVERVIEW -->
                    <div class="tab-content max-w-2xl text-xs sm:text-sm mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed" data-tab-content="OVERVIEW">
                        <p>
                            Pick an idea that advances an SDG, then bring it to life as an app, website, or game that tackles real-life problems. Mentor support throughout — no idea is too early.
                        </p>
                    </div>

                    <!-- Tab: TRACKS -->
                    <div class="tab-content hidden grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-3xl" data-tab-content="TRACKS">
                        <?php
                        $tracks = $featuredEvent['tracks'] ?? [];
                        foreach ($tracks as $track):
                        ?>
                            <div class="flex items-center gap-2 text-xs mono text-slate-900 dark:text-[#F5F5F0] bg-slate-50 dark:bg-[#050605] px-3 py-2 border border-slate-300 dark:border-[#1A1C1A]">
                                <span class="text-emerald-600 dark:text-accent font-bold">›</span>
                                <span><?= htmlspecialchars($track, ENT_QUOTES, 'UTF-8') ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <!-- Tab: TIMELINE -->
                    <div class="tab-content hidden grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl" data-tab-content="TIMELINE">
                        <?php
                        $schedule = $featuredEvent['schedule'] ?? [];
                        $shownSchedule = array_slice($schedule, 0, 3);
                        foreach ($shownSchedule as $item):
                        ?>
                            <div class="bg-slate-50 dark:bg-[#050605] p-3 border border-slate-300 dark:border-[#1A1C1A]">
                                <div class="text-[10px] mono text-emerald-700 dark:text-accent font-bold"><?= htmlspecialchars($item['time'] ?? 'TBA', ENT_QUOTES, 'UTF-8') ?></div>
                                <div class="text-xs mono font-bold text-slate-950 dark:text-[#F5F5F0] mt-0.5"><?= htmlspecialchars($item['title'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                                <div class="text-[11px] mono text-slate-600 dark:text-[#A9ADA9] mt-1"><?= htmlspecialchars($item['desc'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>

            <!-- Bottom Action Footer -->
            <div class="pt-6 border-t border-slate-200 dark:border-[#1A1C1A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div class="flex items-center gap-2 text-xs mono text-slate-600 dark:text-[#A9ADA9]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600 dark:text-accent shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                    <span>CONFIRMATIONS SENT ON ROLLING BASIS</span>
                </div>

                <div class="flex items-stretch sm:items-center gap-3">
                    <button
                        onclick="document.getElementById('event-detail-modal').classList.remove('hidden'); document.getElementById('event-detail-modal').classList.add('flex'); document.body.style.overflow='hidden';"
                        class="px-5 py-3.5 bg-transparent hover:bg-slate-100 dark:hover:bg-[#1A1C1A] border border-slate-300 dark:border-[#1A1C1A] text-slate-900 dark:text-[#F5F5F0] text-xs mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                        VIEW FULL SPEC
                    </button>

                    <a
                        id="featured-event-register"
                        href="<?= htmlspecialchars($registrationUrl, ENT_QUOTES, 'UTF-8') ?>"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="cta-solid group relative px-8 py-3.5 text-sm tracking-widest"
                    >
                        <span>REGISTER NOW</span>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1.5 transition-transform duration-200"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Section Divider -->
<div class="w-full px-5 sm:px-8 lg:px-12" aria-hidden="true">
    <div class="flex items-center gap-3 sm:gap-4">
        <span class="h-px flex-1 bg-slate-300 dark:bg-[#161916]"></span>
        <span class="w-1 h-1 bg-emerald-600/60 dark:bg-accent/40"></span>
        <span class="text-[9px] mono tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/70 whitespace-nowrap">SYS.CONTINUITY // MANIFESTO_01</span>
        <span class="w-1 h-1 bg-slate-300 dark:bg-[#242825]"></span>
        <span class="h-px flex-1 bg-slate-200 dark:bg-[#101210]"></span>
    </div>
</div>

<!-- ============================================================
     SECTION 4: IDENTITY STATEMENT
     ============================================================ -->
<section
    id="identity-statement"
    class="relative py-20 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
>
    <!-- Ghost system label -->
    <div aria-hidden="true" class="ghost-numeral absolute top-6 right-0 text-[150px] sm:text-[220px] opacity-[0.04] dark:opacity-[0.05] hidden md:block">
        KAIZEN
    </div>

    <!-- Huge Typography Visual Statement -->
    <div class="relative z-10 mb-12 sm:mb-16">
        <div class="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-6 font-bold">
            // PHILOSOPHY & MANIFESTO
        </div>

        <h2 class="font-display font-bold text-[clamp(2.9rem,11vw,8rem)] sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-slate-950 dark:text-[#F5F5F0] leading-[0.92] uppercase select-none">
            <div>IDEAS</div>
            <div class="text-slate-500 dark:text-[#A9ADA9]/60">NEED</div>
            <div>A PLACE</div>
            <div class="text-emerald-600 dark:text-accent">TO HAPPEN.</div>
        </h2>
    </div>

    <!-- Credibility metrics band -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 pt-10 border-t border-slate-300 dark:border-[#1A1C1A] relative z-10">
        <?php foreach ($keyStats as $idx => $stat): ?>
            <div class="group relative <?= $idx > 0 ? 'lg:border-l lg:border-slate-200 dark:lg:border-[#161916] lg:pl-8' : '' ?>">
                <div class="flex items-center gap-2 text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-2 font-bold">
                    <span class="w-1 h-1 bg-emerald-600/70 dark:bg-accent/50"></span>
                    0<?= $idx + 1 ?> //
                </div>
                <span class="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight <?= $idx === 0 ? 'text-emerald-600 dark:text-accent' : 'text-slate-950 dark:text-[#F5F5F0]' ?>">
                    <?= htmlspecialchars($stat['value'], ENT_QUOTES, 'UTF-8') ?>
                </span>
                <div class="mt-3 text-xs mono font-bold text-slate-700 dark:text-[#A9ADA9] uppercase tracking-wider">
                    <?= htmlspecialchars($stat['label'], ENT_QUOTES, 'UTF-8') ?>
                </div>
                <div class="text-[11px] mono text-slate-500 dark:text-[#565C57] mt-0.5 font-medium">
                    <?= htmlspecialchars($stat['sub'], ENT_QUOTES, 'UTF-8') ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<!-- Section Divider -->
<div class="w-full px-5 sm:px-8 lg:px-12" aria-hidden="true">
    <div class="flex items-center gap-3 sm:gap-4">
        <span class="h-px flex-1 bg-slate-300 dark:bg-[#161916]"></span>
        <span class="w-1 h-1 bg-emerald-600/60 dark:bg-accent/40"></span>
        <span class="text-[9px] mono tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/70 whitespace-nowrap">ARCHIVE.INDEX // AWAITING_VOL_01</span>
        <span class="w-1 h-1 bg-slate-300 dark:bg-[#242825]"></span>
        <span class="h-px flex-1 bg-slate-200 dark:bg-[#101210]"></span>
    </div>
</div>

<!-- ============================================================
     SECTION 5: EVENT ARCHIVE
     ============================================================ -->
<section
    id="event-archive"
    class="relative py-16 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
>
    <!-- Medium-intensity section grid -->
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-[420px] grid-medium opacity-[0.45] dark:opacity-35 grid-fade-y pointer-events-none"></div>

    <!-- Ghost vault numeral -->
    <div aria-hidden="true" class="ghost-numeral absolute top-8 right-4 text-[180px] xl:text-[240px] opacity-[0.04] dark:opacity-[0.05] hidden md:block">
        00
    </div>

    <div class="relative z-10 max-w-[1800px] mx-auto">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div>
                <div class="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
                    // HISTORICAL VAULT
                </div>
                <h2 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
                    PAST EVENTS
                </h2>
            </div>

            <div class="text-xs mono text-slate-600 dark:text-[#565C57] uppercase font-semibold tracking-wider">
                [THE STORY STARTS NOW]
            </div>
        </div>

        <?php
        $pastEvents = $eventService->getAll('completed');
        if (empty($pastEvents)):
        ?>
            <!-- First-edition-in-progress state -->
            <div class="group relative bg-white dark:bg-[#0B0D0C] border border-dashed border-slate-300 dark:border-[#242825] overflow-hidden shadow-sm">
                <!-- Corner brackets -->
                <span aria-hidden="true" class="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                <span aria-hidden="true" class="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                <span aria-hidden="true" class="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                <span aria-hidden="true" class="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>

                <div class="absolute inset-0 tech-grid-fine opacity-20 pointer-events-none"></div>

                <div class="grid lg:grid-cols-2">
                    <!-- Left: narrative -->
                    <div class="relative z-10 p-8 sm:p-12 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-dashed border-slate-300 dark:border-[#242825]">
                        <div class="space-y-5">
                            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-accent/10 border border-emerald-300 dark:border-accent/30 text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-widest font-bold">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse"></span>
                                <span>VOL. 01 IN PROGRESS</span>
                            </div>

                            <h3 class="font-display font-bold text-3xl sm:text-5xl text-slate-950 dark:text-[#F5F5F0] uppercase tracking-tight leading-[0.95]">
                                HISTORY<br>
                                <span class="text-slate-400 dark:text-[#565C57]/70">LOADING</span><span class="blink-dot text-emerald-600 dark:text-accent">_</span>
                            </h3>

                            <p class="text-xs sm:text-sm mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed max-w-md">
                                Every great archive starts with a blank page. GreenTech Ideathon is our first chapter — and its story isn't written yet.
                            </p>
                        </div>

                        <a
                            href="<?= htmlspecialchars($registrationUrl, ENT_QUOTES, 'UTF-8') ?>"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="cta-solid w-fit px-5 py-3 text-xs tracking-widest"
                        >
                            WRITE VOL.01 WITH US
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                    </div>

                    <!-- Right: ledger of records -->
                    <div class="relative z-10 p-6 sm:p-12 flex flex-col justify-center overflow-x-auto">
                        <div class="min-w-[300px]">
                            <div class="mono text-[9px] tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/80 mb-4">
                                ARCHIVE.INDEX // SHELF_A
                            </div>

                            <div class="border border-slate-200 dark:border-[#161916] divide-y divide-slate-200 dark:divide-[#161916]">
                                <!-- Ledger header -->
                                <div class="grid grid-cols-[2.75rem_1fr_3rem_4.5rem] sm:grid-cols-[3rem_1fr_4rem_5.5rem] gap-2 px-2.5 sm:px-3 py-2 mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57]/70 bg-slate-50 dark:bg-[#050605]">
                                    <span>IDX</span>
                                    <span>EVENT</span>
                                    <span>YEAR</span>
                                    <span class="text-right">STATUS</span>
                                </div>

                                <!-- First record — real, in progress -->
                                <div class="grid grid-cols-[2.75rem_1fr_3rem_4.5rem] sm:grid-cols-[3rem_1fr_4rem_5.5rem] gap-2 px-2.5 sm:px-3 py-3 mono text-[10px] sm:text-xs items-center">
                                    <span class="text-slate-500 dark:text-[#565C57]">001</span>
                                    <span class="font-bold text-slate-950 dark:text-[#F5F5F0] uppercase"><?= htmlspecialchars($featuredEvent['name'] ?? 'GREENTECH', ENT_QUOTES, 'UTF-8') ?></span>
                                    <span class="text-slate-600 dark:text-[#A9ADA9]"><?= htmlspecialchars($featuredEvent['year'] ?? '2026', ENT_QUOTES, 'UTF-8') ?></span>
                                    <span class="text-right text-emerald-700 dark:text-accent font-bold">● OPEN</span>
                                </div>

                                <!-- Awaiting slots -->
                                <?php for ($n = 2; $n <= 3; $n++): ?>
                                    <div class="grid grid-cols-[2.75rem_1fr_3rem_4.5rem] sm:grid-cols-[3rem_1fr_4rem_5.5rem] gap-2 px-2.5 sm:px-3 py-3 mono text-[10px] sm:text-xs items-center opacity-40">
                                        <span class="text-slate-500 dark:text-[#565C57]"><?= str_pad((string)$n, 3, '0', STR_PAD_LEFT) ?></span>
                                        <span class="text-slate-400 dark:text-[#333833] tracking-widest">————</span>
                                        <span class="text-slate-400 dark:text-[#333833]">——</span>
                                        <span class="text-right text-slate-400 dark:text-[#333833] uppercase">AWAITING</span>
                                    </div>
                                <?php endfor; ?>
                            </div>

                            <!-- Record metadata strip -->
                            <div class="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[9px] mono tracking-[0.18em] uppercase text-slate-500 dark:text-[#565C57]/80">
                                <span>FORMAT // <?= htmlspecialchars($featuredEvent['duration'] ?? 'ONE DAY', ENT_QUOTES, 'UTF-8') ?></span>
                                <span>NODE // <?= htmlspecialchars($featuredEvent['city'] ?? 'NEW DELHI', ENT_QUOTES, 'UTF-8') ?></span>
                                <span>CAP // 50</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php else: ?>
            <!-- Archive Grid — renders past events -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <?php foreach ($pastEvents as $event):
                    $tags = json_decode($event['tags'] ?? '[]', true);
                ?>
                    <div class="h-full">
                        <div
                            class="group relative bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] hover:border-emerald-600 dark:hover:border-accent/60 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[420px] sm:min-h-[460px] h-full shadow-sm hover:shadow-xl hover:-translate-y-1 will-change-transform"
                            data-event-id="<?= (int) $event['id'] ?>"
                        >
                            <!-- Corner brackets -->
                            <span aria-hidden="true" class="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                            <span aria-hidden="true" class="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                            <span aria-hidden="true" class="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                            <span aria-hidden="true" class="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>

                            <!-- Background Event Photo -->
                            <?php if (!empty($event['image_url'])): ?>
                            <div class="absolute inset-0 z-0 overflow-hidden">
                                <img
                                    src="<?= htmlspecialchars($event['image_url'], ENT_QUOTES, 'UTF-8') ?>"
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    aria-hidden="true"
                                    class="w-full h-full object-cover filter grayscale contrast-125 scale-100 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500 opacity-15 dark:opacity-35 group-hover:opacity-40 dark:group-hover:opacity-60"
                                >
                                <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050605] via-white/90 dark:via-[#050605]/85 to-white/40 dark:to-[#050605]/40 transition-opacity duration-300 group-hover:opacity-95"></div>
                            </div>
                            <?php endif; ?>

                            <!-- Top Border Accent Slide -->
                            <div class="absolute top-0 left-0 right-0 h-[3px] bg-emerald-600 dark:bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-20"></div>

                            <!-- Top Row: Year & Edition Badge -->
                            <div class="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                                <span class="mono text-xs text-emerald-700 dark:text-accent bg-emerald-50 dark:bg-[#050605] border border-emerald-300 dark:border-accent/30 px-2.5 py-1 font-bold">
                                    <?= htmlspecialchars($event['year'] ?? '', ENT_QUOTES, 'UTF-8') ?> // <?= htmlspecialchars($event['edition'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                                </span>
                                <span class="w-9 h-9 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] group-hover:border-emerald-600 dark:group-hover:border-accent flex items-center justify-center text-slate-800 dark:text-[#F5F5F0] group-hover:text-emerald-600 dark:group-hover:text-accent group-hover:scale-105 transition-all">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                                </span>
                            </div>

                            <!-- Bottom Content: Huge Title + Compact Metadata -->
                            <div class="relative z-10 p-6 sm:p-8">
                                <h3 class="font-display font-bold text-3xl sm:text-4xl text-slate-950 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors uppercase tracking-tight">
                                    <?= htmlspecialchars($event['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                                </h3>

                                <div class="mt-4 pt-4 border-t border-slate-200 dark:border-[#1A1C1A] flex flex-wrap items-center justify-between gap-3 text-xs mono text-slate-700 dark:text-[#A9ADA9] group-hover:text-slate-950 dark:group-hover:text-[#F5F5F0] transition-colors">
                                    <div class="flex items-center gap-3 sm:gap-4 font-medium">
                                        <span class="text-slate-950 dark:text-[#F5F5F0] font-bold"><?= htmlspecialchars($event['builder_count'] ?? '', ENT_QUOTES, 'UTF-8') ?></span>
                                        <span>·</span>
                                        <span><?= htmlspecialchars($event['teams_count'] ?? '', ENT_QUOTES, 'UTF-8') ?></span>
                                        <span>·</span>
                                        <span><?= htmlspecialchars($event['city'] ?? '', ENT_QUOTES, 'UTF-8') ?></span>
                                    </div>
                                    <div class="text-emerald-700 dark:text-accent font-bold">
                                        <?= htmlspecialchars($event['prize_pool'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                                    </div>
                                </div>

                                <div class="mt-3 flex flex-wrap gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                                    <?php foreach ($tags as $tag): ?>
                                        <span class="text-[10px] mono text-slate-700 dark:text-[#A9ADA9] bg-slate-100 dark:bg-[#050605] px-2 py-0.5 border border-slate-300 dark:border-[#1A1C1A] font-medium">
                                            #<?= htmlspecialchars($tag, ENT_QUOTES, 'UTF-8') ?>
                                        </span>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>

<!-- Section Divider -->
<div class="w-full px-5 sm:px-8 lg:px-12" aria-hidden="true">
    <div class="flex items-center gap-3 sm:gap-4">
        <span class="h-px flex-1 bg-slate-300 dark:bg-[#161916]"></span>
        <span class="w-1 h-1 bg-emerald-600/60 dark:bg-accent/40"></span>
        <span class="text-[9px] mono tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/70 whitespace-nowrap">OPERATORS.REGISTRY // CORE_5</span>
        <span class="w-1 h-1 bg-slate-300 dark:bg-[#242825]"></span>
        <span class="h-px flex-1 bg-slate-200 dark:bg-[#101210]"></span>
    </div>
</div>

<!-- ============================================================
     SECTION 6: THE PEOPLE
     ============================================================ -->
<section
    id="organizers"
    class="relative py-16 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
>
    <!-- Very subtle section grid -->
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-[360px] grid-subtle opacity-40 dark:opacity-30 grid-fade-y pointer-events-none"></div>

    <div class="relative z-10 max-w-[1800px] mx-auto">
        <!-- Section Header -->
        <div class="flex items-baseline justify-between mb-10 sm:mb-12">
            <div>
                <div class="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
                    // CORE OPERATORS
                </div>
                <h2 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
                    THE PEOPLE
                </h2>
            </div>
            <div class="hidden sm:block text-xs mono text-slate-600 dark:text-[#565C57] uppercase font-semibold">
                [ENGINEERING & SPRINT DIRECTORS]
            </div>
        </div>

        <!-- Editorial Portraits Grid -->
        <div class="sibling-dim grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <?php foreach ($organizers as $idx => $person): ?>
                <div class="h-full">
                    <div class="group relative bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] hover:border-emerald-600 dark:hover:border-accent/60 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full shadow-sm hover:shadow-xl hover:-translate-y-1.5 will-change-transform">
                        <!-- Corner brackets -->
                        <span aria-hidden="true" class="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                        <span aria-hidden="true" class="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                        <span aria-hidden="true" class="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                        <span aria-hidden="true" class="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>

                        <!-- Image Container -->
                        <div class="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-[#050605]">
                            <?php if (!empty($person['image_url'])): ?>
                            <img
                                src="<?= htmlspecialchars($person['image_url'], ENT_QUOTES, 'UTF-8') ?>"
                                alt="<?= htmlspecialchars(($person['name'] ?? '') . ' — ' . ($person['role'] ?? ''), ENT_QUOTES, 'UTF-8') ?>"
                                loading="lazy"
                                decoding="async"
                                class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-[90%] group-hover:contrast-[112%] group-hover:brightness-[106%] group-hover:scale-[1.03] transition-all duration-500 opacity-90 group-hover:opacity-100 will-change-transform"
                            >
                            <?php endif; ?>
                            <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0B0D0C] via-transparent to-transparent opacity-85"></div>

                            <!-- Index indicator — appears on hover -->
                            <span class="absolute top-3 left-3 mono text-[9px] tracking-[0.22em] text-slate-600 dark:text-[#A9ADA9]/80 bg-white/85 dark:bg-[#050605]/85 border border-slate-300 dark:border-[#1A1C1A] px-1.5 py-0.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                                <?= str_pad((string)($idx + 1), 2, '0', STR_PAD_LEFT) ?> / <?= str_pad((string)count($organizers), 2, '0', STR_PAD_LEFT) ?>
                            </span>

                            <!-- Division chip -->
                            <span class="absolute bottom-3 right-3 mono text-[8px] tracking-[0.24em] uppercase text-slate-600 dark:text-[#A9ADA9]/70 bg-white/80 dark:bg-[#050605]/80 border border-slate-200 dark:border-[#1A1C1A] px-1.5 py-0.5">
                                <?= htmlspecialchars($person['division'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                            </span>
                        </div>

                        <!-- Content Area -->
                        <div class="p-5 relative z-10">
                            <div class="flex items-baseline justify-between gap-2">
                                <h3 class="font-display font-bold text-xl sm:text-2xl text-slate-950 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors uppercase leading-tight">
                                    <?= htmlspecialchars($person['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                                </h3>
                            </div>

                            <div class="mt-1 text-xs mono text-emerald-700 dark:text-accent uppercase tracking-wider font-bold group-hover:tracking-[0.14em] transition-all duration-300">
                                <?= htmlspecialchars($person['role'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                            </div>

                            <div class="mt-3 pt-3 border-t border-slate-200 dark:border-[#1A1C1A] text-xs mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed">
                                <p class="line-clamp-2"><?= htmlspecialchars($person['tagline'] ?? '', ENT_QUOTES, 'UTF-8') ?></p>

                                <div class="mt-4 flex items-center gap-3 text-slate-600/60 dark:text-[#565C57]/60 group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors duration-300">
                                    <?php if (!empty($person['github'])): ?>
                                        <a
                                            href="<?= htmlspecialchars($person['github'], ENT_QUOTES, 'UTF-8') ?>"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="hover:scale-110 transition-transform"
                                            aria-label="GitHub profile of <?= htmlspecialchars($person['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                                        </a>
                                    <?php endif; ?>
                                    <?php if (!empty($person['twitter'])): ?>
                                        <a
                                            href="<?= htmlspecialchars($person['twitter'], ENT_QUOTES, 'UTF-8') ?>"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="hover:scale-110 transition-transform"
                                            aria-label="Twitter / X profile of <?= htmlspecialchars($person['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                                        </a>
                                    <?php endif; ?>
                                    <?php if (!empty($person['linkedin'])): ?>
                                        <a
                                            href="<?= htmlspecialchars($person['linkedin'], ENT_QUOTES, 'UTF-8') ?>"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="hover:scale-110 transition-transform"
                                            aria-label="LinkedIn profile of <?= htmlspecialchars($person['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                                        </a>
                                    <?php endif; ?>

                                    <span class="ml-auto mono text-[8px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-emerald-700/80 dark:text-accent/70">
                                        OPERATOR.OK
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Subtle top indicator -->
                        <div class="absolute top-0 left-0 w-full h-[2px] bg-emerald-600 dark:bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Section Divider -->
<div class="w-full px-5 sm:px-8 lg:px-12" aria-hidden="true">
    <div class="flex items-center gap-3 sm:gap-4">
        <span class="h-px flex-1 bg-slate-300 dark:bg-[#161916]"></span>
        <span class="w-1 h-1 bg-emerald-600/60 dark:bg-accent/40"></span>
        <span class="text-[9px] mono tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/70 whitespace-nowrap">ECOSYSTEM.MESH // PARTNER_NET</span>
        <span class="w-1 h-1 bg-slate-300 dark:bg-[#242825]"></span>
        <span class="h-px flex-1 bg-slate-200 dark:bg-[#101210]"></span>
    </div>
</div>

<!-- ============================================================
     SECTION 7: PARTNERS
     ============================================================ -->
<section
    id="partners"
    class="relative py-16 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
>
    <!-- Medium-intensity section grid -->
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-[420px] grid-medium opacity-[0.5] dark:opacity-40 grid-fade-y pointer-events-none"></div>

    <!-- Ghost partner-count numeral -->
    <div
        aria-hidden="true"
        class="ghost-numeral absolute -bottom-10 right-2 text-[200px] xl:text-[260px] opacity-[0.04] dark:opacity-[0.05] hidden lg:block"
    >
        <?= str_pad((string)count($partners), 2, '0', STR_PAD_LEFT) ?>
    </div>

    <div class="relative z-10 max-w-[1800px] mx-auto">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 sm:mb-12">
            <div>
                <div class="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
                    // ECOSYSTEM & INFRASTRUCTURE
                </div>
                <h2 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
                    SUPPORTED BY
                </h2>
            </div>
            <div class="text-xs mono text-slate-600 dark:text-[#565C57] uppercase font-semibold">
                [INFRASTRUCTURE, COMPUTE & VENTURE PARTNERS]
            </div>
        </div>

        <!-- Partner Grid -->
        <div class="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <?php foreach ($partners as $partner): ?>
                <div class="h-full">
                    <a
                        href="<?= htmlspecialchars($partner['website'] ?? '#', ENT_QUOTES, 'UTF-8') ?>"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visit <?= htmlspecialchars($partner['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
                        class="group relative bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] hover:border-emerald-600/70 dark:hover:border-accent/50 p-6 flex flex-col justify-between min-h-[150px] h-full transition-all duration-300 overflow-hidden rounded-none shadow-sm hover:shadow-lg hover:-translate-y-0.5 will-change-transform focus-visible:-translate-y-0.5"
                    >
                        <!-- Corner brackets -->
                        <span aria-hidden="true" class="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                        <span aria-hidden="true" class="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                        <span aria-hidden="true" class="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
                        <span aria-hidden="true" class="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>

                        <!-- Corner status indicator -->
                        <span class="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-600/0 dark:bg-accent/0 group-hover:bg-emerald-600/80 dark:group-hover:bg-accent/70 transition-colors duration-300"></span>

                        <!-- Top Row: Category badge -->
                        <div class="text-[10px] mono text-slate-500 dark:text-[#565C57] group-hover:text-slate-700 dark:group-hover:text-[#A9ADA9] transition-colors uppercase font-medium tracking-wider">
                            <?= htmlspecialchars($partner['category'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-1.5 -top-0.5 relative opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 text-emerald-600 dark:text-accent"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                        </div>

                        <!-- Main Brand Text/Logo -->
                        <div class="my-auto pt-2">
                            <span class="font-display font-bold text-lg sm:text-xl md:text-2xl text-slate-800 dark:text-[#A9ADA9] group-hover:text-slate-950 dark:group-hover:text-[#F5F5F0] transition-all duration-300 uppercase tracking-tight block truncate">
                                <?= htmlspecialchars($partner['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                            </span>
                        </div>

                        <!-- Bottom tier + description reveal -->
                        <div>
                            <span class="inline-flex items-center gap-1.5 text-[9px] mono tracking-[0.18em] uppercase font-bold px-2 py-1 border border-slate-200 dark:border-[#242825] bg-slate-50 dark:bg-[#050605] text-slate-600 dark:text-[#565C57] group-hover:border-emerald-600/40 dark:group-hover:border-accent/30 group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors duration-300">
                                <span class="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 group-hover:bg-emerald-600 dark:group-hover:bg-accent transition-colors duration-300" aria-hidden="true"></span>
                                TIER: <?= htmlspecialchars($partner['tier'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                            </span>
                            <p class="mt-2 text-[10px] leading-relaxed mono text-slate-500 dark:text-[#565C57] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-16 overflow-hidden transition-all duration-300 ease-out">
                                <?= htmlspecialchars($partner['description'] ?? '', ENT_QUOTES, 'UTF-8') ?>
                            </p>
                        </div>

                        <!-- Left accent edge -->
                        <span class="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-600 dark:bg-accent origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"></span>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Become a Partner CTA -->
        <div class="mt-12 pt-8 border-t border-slate-300 dark:border-[#1A1C1A] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div class="text-xs mono text-slate-700 dark:text-[#A9ADA9] text-center sm:text-left font-medium">
                WANT TO SPONSOR BOUNTIES, PROVIDE GPU RUNTIMES, OR RECRUIT FROM OUR BUILDER ARENA?
            </div>

            <button
                onclick="window.openPartnerModal && window.openPartnerModal()"
                class="cta-solid group px-6 py-3.5 text-xs tracking-widest shrink-0"
            >
                <span>BECOME A PARTNER</span>
                <span class="group-hover:translate-x-1 transition-all">→</span>
            </button>
        </div>
    </div>
</section>

<!-- Section Divider -->
<div class="w-full px-5 sm:px-8 lg:px-12" aria-hidden="true">
    <div class="flex items-center gap-3 sm:gap-4">
        <span class="h-px flex-1 bg-slate-300 dark:bg-[#161916]"></span>
        <span class="w-1 h-1 bg-emerald-600/60 dark:bg-accent/40"></span>
        <span class="text-[9px] mono tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/70 whitespace-nowrap">ENTRY.POINT // REG_OPEN</span>
        <span class="w-1 h-1 bg-slate-300 dark:bg-[#242825]"></span>
        <span class="h-px flex-1 bg-slate-200 dark:bg-[#101210]"></span>
    </div>
</div>

<!-- ============================================================
     SECTION 8: REGISTER CTA
     ============================================================ -->
<section
    id="registration-cta"
    class="relative min-h-[52vh] flex flex-col justify-center items-center py-20 sm:py-24 px-5 sm:px-8 bg-[#E4EEE3] dark:bg-[#050605] border-t border-slate-300 dark:border-[#1A1C1A] overflow-hidden text-center select-none"
>
    <!-- Minimal grid -->
    <div class="absolute inset-0 tech-grid opacity-[0.06] dark:opacity-[0.12] pointer-events-none"></div>

    <!-- Ghost section numeral -->
    <div aria-hidden="true" class="ghost-numeral absolute top-6 left-4 text-[140px] xl:text-[200px] opacity-[0.05] dark:opacity-[0.06] hidden md:block">
        07
    </div>

    <!-- Atmospheric emerald core glow -->
    <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-[150px] pointer-events-none"
        style="background: radial-gradient(circle, rgba(5, 150, 105, 0.10) 0%, transparent 65%);"
        aria-hidden="true"
    ></div>

    <div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <!-- Monospace Micro Label -->
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#0B0D0C] border border-emerald-300 dark:border-accent/30 text-[11px] mono text-emerald-700 dark:text-accent uppercase tracking-widest font-bold shadow-sm mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse"></span>
            <span>REGISTRATIONS OPEN // VOL. 01</span>
        </div>

        <!-- Large Typography -->
        <h2 class="font-display font-bold text-[clamp(3rem,14vw,5rem)] sm:text-8xl md:text-9xl lg:text-[130px] text-emerald-600 dark:text-accent tracking-tighter uppercase leading-[0.88] select-none">
            <div>READY</div>
            <div class="text-slate-950 dark:text-[#F5F5F0]">TO BUILD?</div>
        </h2>

        <!-- Action Button -->
        <div class="mt-10 sm:mt-14">
            <a
                href="<?= htmlspecialchars($registrationUrl, ENT_QUOTES, 'UTF-8') ?>"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-solid group px-8 sm:px-12 py-5 sm:py-6 text-sm sm:text-base tracking-widest"
            >
                <span>NEXT EVENT (GREENTECH IDEATHON)</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-2 transition-transform duration-200"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <span
                    class="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-[#050605]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-hidden="true"
                ></span>
            </a>
        </div>

        <!-- System status line -->
        <div class="mt-7 flex items-center justify-center gap-3 text-[10px] mono tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57]/90 font-semibold">
            <span>STATUS // OPEN</span>
            <span class="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full" aria-hidden="true"></span>
            <span>SEATS // 50</span>
            <span class="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full" aria-hidden="true"></span>
            <span>PROTOCOL // V2.6</span>
        </div>

        <!-- Tiny metadata subline -->
        <div class="mt-4">
            <a
                href="<?= htmlspecialchars($venueMapsUrl, ENT_QUOTES, 'UTF-8') ?>"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-wrap items-center justify-center gap-3 text-xs mono text-slate-600 dark:text-[#565C57] hover:text-emerald-700 dark:hover:text-accent tracking-wider uppercase font-semibold transition-colors"
            >
                <span>ONE-DAY IDEATHON</span>
                <span class="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full"></span>
                <span>CM SHRI / DBRA SOSE KALKAJI ↗</span>
                <span class="w-1 h-1 bg-emerald-600/50 dark:bg-accent/40 rounded-full"></span>
                <span>DATE TO BE ANNOUNCED</span>
            </a>
        </div>
    </div>
</section>

<!-- Section Divider -->
<div class="w-full px-5 sm:px-8 lg:px-12" aria-hidden="true">
    <div class="flex items-center gap-3 sm:gap-4">
        <span class="h-px flex-1 bg-slate-300 dark:bg-[#161916]"></span>
        <span class="w-1 h-1 bg-emerald-600/60 dark:bg-accent/40"></span>
        <span class="text-[9px] mono tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57]/70 whitespace-nowrap">SIGNAL.US // MAIL_LINK</span>
        <span class="w-1 h-1 bg-slate-300 dark:bg-[#242825]"></span>
        <span class="h-px flex-1 bg-slate-200 dark:bg-[#101210]"></span>
    </div>
</div>

<!-- ============================================================
     SECTION 9: CONTACT
     ============================================================ -->
<section
    id="contact"
    class="relative py-16 sm:py-24 px-5 sm:px-8 lg:px-12 w-full select-none overflow-hidden"
>
    <!-- Medium-intensity section grid -->
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-[360px] grid-medium opacity-[0.45] dark:opacity-35 grid-fade-y pointer-events-none"></div>

    <!-- Ghost channel numeral -->
    <div
        aria-hidden="true"
        class="ghost-numeral absolute -bottom-8 right-2 text-[180px] xl:text-[240px] opacity-[0.04] dark:opacity-[0.05] hidden md:block"
    >
        08
    </div>

    <div class="relative z-10 max-w-[1800px] mx-auto">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 border-b border-slate-300 dark:border-[#1A1C1A] pb-4">
            <div>
                <div class="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">
                    // SIGNAL.US // DIRECT CHANNEL
                </div>
                <h2 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
                    CONTACT
                </h2>
            </div>
            <div class="hidden sm:block text-xs mono text-slate-600 dark:text-[#565C57] uppercase font-semibold">
                [ONE ADDRESS. REAL HUMANS.]
            </div>
        </div>

        <!-- Primary Channel Dossier Card -->
        <a
            href="mailto:<?= htmlspecialchars($contactEmail, ENT_QUOTES, 'UTF-8') ?>?subject=<?= urlencode('Kaizen Hacks — Hello') ?>"
            title="Email <?= htmlspecialchars($contactEmail, ENT_QUOTES, 'UTF-8') ?>"
            class="group relative block bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] hover:border-emerald-600/60 dark:hover:border-accent/50 px-6 sm:px-10 py-8 sm:py-12 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 will-change-transform"
        >
            <!-- Corner brackets -->
            <span aria-hidden="true" class="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
            <span aria-hidden="true" class="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
            <span aria-hidden="true" class="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>
            <span aria-hidden="true" class="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-accent/0 group-hover:border-accent/70 transition-all duration-300 pointer-events-none"></span>

            <!-- Hover glow halo -->
            <div class="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="box-shadow: inset 0 0 60px rgba(141, 255, 179, 0.04);"></div>
            <!-- Top accent slide -->
            <span aria-hidden="true" class="absolute top-0 left-0 right-0 h-[2px] bg-emerald-600 dark:bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>

            <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div class="min-w-0">
                    <div class="flex items-center gap-2 text-[11px] mono text-slate-500 dark:text-[#565C57] uppercase tracking-widest mb-3 font-bold">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600 dark:text-accent shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        EMAIL // PRIMARY CHANNEL
                    </div>
                    <div class="font-display font-bold text-xl sm:text-3xl lg:text-5xl text-slate-950 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors tracking-tight break-all sm:break-normal leading-tight">
                        <?= htmlspecialchars($contactEmail, ENT_QUOTES, 'UTF-8') ?>
                    </div>
                </div>

                <div class="shrink-0 self-start lg:self-center flex items-center gap-4">
                    <span class="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] group-hover:bg-emerald-600 dark:group-hover:bg-accent group-hover:border-emerald-600 dark:group-hover:border-accent flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                        <span class="text-lg sm:text-xl text-slate-800 dark:text-[#F5F5F0] group-hover:text-white dark:group-hover:text-[#050605] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" aria-hidden="true">↗</span>
                    </span>
                </div>
            </div>

            <!-- Technical metadata strip -->
            <div class="relative z-10 mt-8 pt-4 border-t border-slate-200 dark:border-[#1A1C1A] flex flex-wrap items-center justify-between gap-x-6 gap-y-2 mono text-[9px] tracking-[0.22em] uppercase text-slate-400 dark:text-[#3D443D]/70">
                <span>KAIZEN HACKS // ORG.MAIL</span>
                <span class="hidden md:inline">NODE: DELHI_KALKAJI</span>
                <span class="flex items-center gap-1.5">
                    <span class="w-1 h-1 bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block"></span>
                    CHANNEL_OK
                </span>
            </div>
        </a>
    </div>
</section>

</main>

<?php include dirname(__DIR__) . '/includes/event-detail-modal.php'; ?>
<?php include dirname(__DIR__) . '/includes/footer.php'; ?>

<!-- Event Detail Modal -->
<div
    id="event-detail-modal"
    class="fixed inset-0 z-50 hidden items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-[#050605]/80 backdrop-blur-md overflow-y-auto anim-fade"
    role="dialog"
    aria-modal="true"
    aria-label="Event detail"
>
    <div class="relative w-full max-w-2xl bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] p-6 sm:p-8 shadow-2xl my-8 rounded-none anim-modal">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-4 mb-6">
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-600 dark:bg-accent"></span>
                <span class="mono text-xs font-bold text-emerald-700 dark:text-accent uppercase tracking-wider">
                    EVENT SPECIFICATION
                </span>
            </div>
            <button
                onclick="document.getElementById('event-detail-modal').classList.add('hidden'); document.getElementById('event-detail-modal').classList.remove('flex'); document.body.style.overflow='';"
                class="p-1 text-slate-500 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent transition-colors cursor-pointer"
                aria-label="Close modal"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>

        <div class="space-y-6">
            <!-- Event name -->
            <div>
                <div class="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-1 font-bold">PRIMARY CENTERPIECE</div>
                <h3 class="font-display font-bold text-3xl sm:text-4xl text-slate-950 dark:text-[#F5F5F0] tracking-tight uppercase">
                    <?= htmlspecialchars($featuredEvent['name'] ?? 'GREENTECH', ENT_QUOTES, 'UTF-8') ?> IDEATHON
                </h3>
            </div>

            <!-- Description -->
            <p class="text-xs sm:text-sm mono text-slate-700 dark:text-[#A9ADA9] leading-relaxed">
                <?= htmlspecialchars($featuredEvent['description'] ?? '', ENT_QUOTES, 'UTF-8') ?>
            </p>

            <!-- Details grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div class="bg-slate-50 dark:bg-[#050605] p-3 border border-slate-300 dark:border-[#1A1C1A]">
                    <div class="text-[10px] mono text-emerald-700 dark:text-accent font-bold">EDITION</div>
                    <div class="text-xs mono font-bold text-slate-950 dark:text-[#F5F5F0] mt-0.5"><?= htmlspecialchars($featuredEvent['edition'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                </div>
                <div class="bg-slate-50 dark:bg-[#050605] p-3 border border-slate-300 dark:border-[#1A1C1A]">
                    <div class="text-[10px] mono text-emerald-700 dark:text-accent font-bold">DATE</div>
                    <div class="text-xs mono font-bold text-slate-950 dark:text-[#F5F5F0] mt-0.5"><?= htmlspecialchars($featuredEvent['date_text'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                </div>
                <div class="bg-slate-50 dark:bg-[#050605] p-3 border border-slate-300 dark:border-[#1A1C1A]">
                    <div class="text-[10px] mono text-emerald-700 dark:text-accent font-bold">CITY</div>
                    <div class="text-xs mono font-bold text-slate-950 dark:text-[#F5F5F0] mt-0.5"><?= htmlspecialchars($featuredEvent['city'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                </div>
                <div class="bg-slate-50 dark:bg-[#050605] p-3 border border-slate-300 dark:border-[#1A1C1A]">
                    <div class="text-[10px] mono text-emerald-700 dark:text-accent font-bold">DURATION</div>
                    <div class="text-xs mono font-bold text-slate-950 dark:text-[#F5F5F0] mt-0.5"><?= htmlspecialchars($featuredEvent['duration'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                </div>
                <div class="bg-slate-50 dark:bg-[#050605] p-3 border border-slate-300 dark:border-[#1A1C1A]">
                    <div class="text-[10px] mono text-emerald-700 dark:text-accent font-bold">CAPACITY</div>
                    <div class="text-xs mono font-bold text-slate-950 dark:text-[#F5F5F0] mt-0.5"><?= htmlspecialchars($featuredEvent['builder_count'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                </div>
                <div class="bg-slate-50 dark:bg-[#050605] p-3 border border-slate-300 dark:border-[#1A1C1A]">
                    <div class="text-[10px] mono text-emerald-700 dark:text-accent font-bold">PRIZE POOL</div>
                    <div class="text-xs mono font-bold text-emerald-600 dark:text-accent mt-0.5"><?= htmlspecialchars($featuredEvent['prize_pool'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                </div>
            </div>

            <!-- Tracks -->
            <?php if (!empty($featuredEvent['tracks'])): ?>
            <div>
                <div class="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-2 font-bold">TRACKS</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <?php foreach ($featuredEvent['tracks'] as $track): ?>
                        <div class="flex items-center gap-2 text-xs mono text-slate-900 dark:text-[#F5F5F0] bg-slate-50 dark:bg-[#050605] px-3 py-2 border border-slate-300 dark:border-[#1A1C1A]">
                            <span class="text-emerald-600 dark:text-accent font-bold">›</span>
                            <span><?= htmlspecialchars($track, ENT_QUOTES, 'UTF-8') ?></span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

            <!-- Schedule -->
            <?php if (!empty($featuredEvent['schedule'])): ?>
            <div>
                <div class="text-xs mono text-emerald-700 dark:text-accent uppercase tracking-widest mb-2 font-bold">SCHEDULE</div>
                <div class="space-y-2">
                    <?php foreach ($featuredEvent['schedule'] as $item): ?>
                        <div class="bg-slate-50 dark:bg-[#050605] p-3 border border-slate-300 dark:border-[#1A1C1A]">
                            <div class="text-[10px] mono text-emerald-700 dark:text-accent font-bold"><?= htmlspecialchars($item['time'] ?? 'TBA', ENT_QUOTES, 'UTF-8') ?></div>
                            <div class="text-xs mono font-bold text-slate-950 dark:text-[#F5F5F0] mt-0.5"><?= htmlspecialchars($item['title'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                            <div class="text-[11px] mono text-slate-600 dark:text-[#A9ADA9] mt-1"><?= htmlspecialchars($item['desc'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

            <!-- Register CTA -->
            <div class="pt-4 border-t border-slate-200 dark:border-[#1A1C1A] flex items-center justify-between">
                <div class="text-[10px] mono text-slate-500 dark:text-[#565C57] font-medium">
                    CONFIRMATIONS SENT ON ROLLING BASIS
                </div>
                <a
                    href="<?= htmlspecialchars($registrationUrl, ENT_QUOTES, 'UTF-8') ?>"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cta-solid group px-6 py-3 text-xs tracking-widest"
                >
                    <span>REGISTER NOW</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform duration-200"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </div>
        </div>
    </div>
</div>

<script src="<?= $baseUrl ?>/assets/js/app.js"></script>

<!-- Hero headline rotation + featured event tabs -->
<script>
(function () {
    /* ---- Hero Headline Rotation ---- */
    var headlineEl = document.getElementById('hero-headline');
    if (headlineEl) {
        var raw = headlineEl.getAttribute('data-headlines');
        var headlines = raw ? JSON.parse(raw) : [];
        if (headlines.length > 0) {
            var idx = 0;
            setInterval(function () {
                idx = (idx + 1) % headlines.length;
                var h = headlines[idx];
                var lines = headlineEl.querySelectorAll('[data-line]');
                if (lines.length === 3) {
                    lines[0].textContent = h.line1;
                    lines[1].textContent = h.line2;
                    lines[2].textContent = h.line3;
                }
            }, 2500);
        }
    }

    /* ---- Featured Event Tabs ---- */
    var tabContainer = document.getElementById('featured-event-tabs');
    if (tabContainer) {
        var tabBtns = tabContainer.querySelectorAll('[data-tab]');
        var tabContents = tabContainer.querySelectorAll('[data-tab-content]');

        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = btn.getAttribute('data-tab');

                /* Update button states */
                tabBtns.forEach(function (b) {
                    var isActive = b.getAttribute('data-tab') === target;
                    b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                    if (isActive) {
                        b.className = 'relative px-3 py-1.5 text-xs mono tracking-wider uppercase transition-colors cursor-pointer text-white dark:text-[#050605] font-bold bg-emerald-600 dark:bg-accent shadow-sm';
                    } else {
                        b.className = 'relative px-3 py-1.5 text-xs mono tracking-wider uppercase transition-colors cursor-pointer bg-slate-100 dark:bg-[#050605] hover:bg-slate-200 dark:hover:bg-[#1A1C1A] text-slate-700 dark:text-[#A9ADA9] border border-slate-300 dark:border-[#1A1C1A]';
                    }
                });

                /* Update content visibility */
                tabContents.forEach(function (c) {
                    if (c.getAttribute('data-tab-content') === target) {
                        c.classList.remove('hidden');
                    } else {
                        c.classList.add('hidden');
                    }
                });
            });
        });
    }

    /* ---- Event Detail Modal Close on Escape ---- */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var modal = document.getElementById('event-detail-modal');
            if (modal && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = '';
            }
        }
    });

    /* ---- Event Detail Modal Close on Backdrop Click ---- */
    var eventModal = document.getElementById('event-detail-modal');
    if (eventModal) {
        eventModal.addEventListener('click', function (e) {
            if (e.target === eventModal) {
                eventModal.classList.add('hidden');
                eventModal.classList.remove('flex');
                document.body.style.overflow = '';
            }
        });
    }

    /* ---- Intersection Observer for Fade-in Animations ---- */
    if ('IntersectionObserver' in window) {
        var revealEls = document.querySelectorAll('.reveal-on-scroll');
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-6');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        revealEls.forEach(function (el) {
            revealObserver.observe(el);
        });
    }
})();
</script>

</body>
</html>
