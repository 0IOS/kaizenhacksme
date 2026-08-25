<?php declare(strict_types=1); require_once __DIR__ . '/../../app/bootstrap.php';

use App\Middleware\AuthMiddleware;
use App\Services\UserService;
use App\Services\RegistrationService;
use App\Services\InquiryService;
use App\Services\ContactService;

$user = AuthMiddleware::requireRole('admin', 'organizer');

$userService = new UserService();
$regService = new RegistrationService();
$inquiryService = new InquiryService();
$contactService = new ContactService();

$userStats = $userService->getStats();
$regStats = $regService->getStats();
$inquiryStats = $inquiryService->getStats();
$contactStats = $contactService->getStats();

$pageTitle = 'Admin Dashboard — Kaizen Hacks';
require_once __DIR__ . '/../../includes/header.php';
?>

<main class="min-h-screen bg-[#EDF3EC] dark:bg-[#050605] pt-24 pb-16 px-5 sm:px-8 lg:px-12">
    <div class="max-w-[1400px] mx-auto">

        <!-- Admin Sidebar + Content -->
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">

            <!-- Sidebar Nav -->
            <aside class="lg:w-56 shrink-0">
                <div class="lg:sticky lg:top-28">
                    <div class="mono text-[9px] tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57] mb-2">
                        ADMIN.CONSOLE // <?= strtoupper(htmlspecialchars($user['role'])) ?>
                    </div>
                    <div class="text-xs mono text-emerald-700 dark:text-accent font-bold mb-6">
                        <?= htmlspecialchars($user['name']) ?>
                    </div>

                    <nav class="flex flex-row lg:flex-col gap-1">
                        <a href="/admin/index.php" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-bold uppercase tracking-wider bg-emerald-600/10 dark:bg-accent/10 text-emerald-700 dark:text-accent border border-emerald-600/20 dark:border-accent/20 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                            DASHBOARD
                        </a>
                        <a href="/admin/events.php" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-medium uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-[#0B0D0C] border border-transparent hover:border-slate-200 dark:hover:border-[#1A1C1A] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                            EVENTS
                        </a>
                        <a href="/admin/users.php" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-medium uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-[#0B0D0C] border border-transparent hover:border-slate-200 dark:hover:border-[#1A1C1A] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            USERS
                        </a>
                        <a href="/admin/inquiries.php" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-medium uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-[#0B0D0C] border border-transparent hover:border-slate-200 dark:hover:border-[#1A1C1A] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            INQUIRIES
                        </a>
                        <a href="/admin/index.php#contacts" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-medium uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-[#0B0D0C] border border-transparent hover:border-slate-200 dark:hover:border-[#1A1C1A] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            CONTACTS
                        </a>
                    </nav>

                    <div class="hidden lg:block mt-8 pt-6 border-t border-slate-200 dark:border-[#1A1C1A]">
                        <a href="/" class="flex items-center gap-2 text-[10px] mono text-slate-600 dark:text-[#565C57] hover:text-emerald-700 dark:hover:text-accent transition-colors uppercase tracking-wider font-medium">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                            BACK TO SITE
                        </a>
                        <a href="/api/auth/handler.php?action=logout" class="flex items-center gap-2 text-[10px] mono text-slate-600 dark:text-[#565C57] hover:text-red-600 dark:hover:text-red-400 transition-colors uppercase tracking-wider font-medium mt-3">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                            LOGOUT
                        </a>
                    </div>
                </div>
            </aside>

            <!-- Main Content -->
            <div class="flex-1 min-w-0">

                <!-- Page Header -->
                <div class="mb-8">
                    <h1 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0] uppercase">
                        DASHBOARD
                    </h1>
                    <p class="mt-2 text-xs mono text-slate-600 dark:text-[#A9ADA9] tracking-wide">
                        SYSTEM OVERVIEW // ALL NODES ACTIVE
                    </p>
                </div>

                <!-- Stat Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">

                    <!-- Total Users -->
                    <div class="bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] p-5 hover:border-emerald-600/30 dark:hover:border-accent/20 transition-colors group">
                        <div class="flex items-center justify-between mb-3">
                            <span class="mono text-[10px] tracking-[0.2em] uppercase text-slate-500 dark:text-[#565C57] font-bold">USERS</span>
                            <span class="w-8 h-8 bg-emerald-50 dark:bg-accent/10 border border-emerald-200 dark:border-accent/20 flex items-center justify-center text-emerald-700 dark:text-accent group-hover:scale-105 transition-transform">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </span>
                        </div>
                        <div class="font-display text-4xl font-bold text-slate-950 dark:text-[#F5F5F0] tracking-tight">
                            <?= $userStats['total'] ?>
                        </div>
                        <div class="mt-2 flex items-center gap-3 text-[10px] mono text-slate-500 dark:text-[#565C57]">
                            <span class="text-emerald-700 dark:text-accent font-bold"><?= $userStats['admin'] ?> ADM</span>
                            <span>·</span>
                            <span class="font-bold"><?= $userStats['organizer'] ?> ORG</span>
                            <span>·</span>
                            <span class="font-bold"><?= $userStats['participant'] ?> USR</span>
                        </div>
                    </div>

                    <!-- Total Registrations -->
                    <div class="bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] p-5 hover:border-emerald-600/30 dark:hover:border-accent/20 transition-colors group">
                        <div class="flex items-center justify-between mb-3">
                            <span class="mono text-[10px] tracking-[0.2em] uppercase text-slate-500 dark:text-[#565C57] font-bold">REGISTRATIONS</span>
                            <span class="w-8 h-8 bg-emerald-50 dark:bg-accent/10 border border-emerald-200 dark:border-accent/20 flex items-center justify-center text-emerald-700 dark:text-accent group-hover:scale-105 transition-transform">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                            </span>
                        </div>
                        <div class="font-display text-4xl font-bold text-slate-950 dark:text-[#F5F5F0] tracking-tight">
                            <?= $regStats['total'] ?>
                        </div>
                        <div class="mt-2 flex items-center gap-3 text-[10px] mono text-slate-500 dark:text-[#565C57]">
                            <span class="text-emerald-700 dark:text-accent font-bold"><?= $regStats['confirmed'] ?> CONF</span>
                            <span>·</span>
                            <span class="font-bold"><?= $regStats['pending'] ?> PEND</span>
                            <span>·</span>
                            <span class="font-bold"><?= $regStats['waitlisted'] ?> WL</span>
                        </div>
                    </div>

                    <!-- Total Inquiries -->
                    <div class="bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] p-5 hover:border-emerald-600/30 dark:hover:border-accent/20 transition-colors group">
                        <div class="flex items-center justify-between mb-3">
                            <span class="mono text-[10px] tracking-[0.2em] uppercase text-slate-500 dark:text-[#565C57] font-bold">INQUIRIES</span>
                            <span class="w-8 h-8 bg-emerald-50 dark:bg-accent/10 border border-emerald-200 dark:border-accent/20 flex items-center justify-center text-emerald-700 dark:text-accent group-hover:scale-105 transition-transform">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            </span>
                        </div>
                        <div class="font-display text-4xl font-bold text-slate-950 dark:text-[#F5F5F0] tracking-tight">
                            <?= $inquiryStats['total'] ?>
                        </div>
                        <div class="mt-2 flex items-center gap-3 text-[10px] mono text-slate-500 dark:text-[#565C57]">
                            <span class="text-emerald-700 dark:text-accent font-bold"><?= $inquiryStats['new'] ?> NEW</span>
                            <span>·</span>
                            <span class="font-bold"><?= $inquiryStats['contacted'] ?> CONTACT</span>
                            <span>·</span>
                            <span class="font-bold"><?= $inquiryStats['converted'] ?> CONV</span>
                        </div>
                    </div>

                    <!-- Total Contacts -->
                    <div id="contacts" class="bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] p-5 hover:border-emerald-600/30 dark:hover:border-accent/20 transition-colors group">
                        <div class="flex items-center justify-between mb-3">
                            <span class="mono text-[10px] tracking-[0.2em] uppercase text-slate-500 dark:text-[#565C57] font-bold">CONTACTS</span>
                            <span class="w-8 h-8 bg-emerald-50 dark:bg-accent/10 border border-emerald-200 dark:border-accent/20 flex items-center justify-center text-emerald-700 dark:text-accent group-hover:scale-105 transition-transform">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            </span>
                        </div>
                        <div class="font-display text-4xl font-bold text-slate-950 dark:text-[#F5F5F0] tracking-tight">
                            <?= $contactStats['total'] ?>
                        </div>
                        <div class="mt-2 flex items-center gap-3 text-[10px] mono text-slate-500 dark:text-[#565C57]">
                            <span class="text-emerald-700 dark:text-accent font-bold"><?= $contactStats['new'] ?> NEW</span>
                            <span>·</span>
                            <span class="font-bold"><?= $contactStats['read'] ?> READ</span>
                            <span>·</span>
                            <span class="font-bold"><?= $contactStats['replied'] ?> REPLY</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="mb-8">
                    <div class="mono text-[10px] tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57] font-bold mb-4">
                        QUICK ACCESS
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <a href="/admin/events.php" class="flex items-center gap-3 p-4 bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] hover:border-emerald-600/40 dark:hover:border-accent/30 transition-all group">
                            <span class="w-2 h-2 bg-emerald-600 dark:bg-accent group-hover:scale-125 transition-transform"></span>
                            <span class="text-xs mono font-bold uppercase tracking-wider text-slate-800 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors">MANAGE EVENTS</span>
                            <svg class="ml-auto text-slate-400 dark:text-[#565C57] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </a>
                        <a href="/admin/users.php" class="flex items-center gap-3 p-4 bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] hover:border-emerald-600/40 dark:hover:border-accent/30 transition-all group">
                            <span class="w-2 h-2 bg-emerald-600 dark:bg-accent group-hover:scale-125 transition-transform"></span>
                            <span class="text-xs mono font-bold uppercase tracking-wider text-slate-800 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors">MANAGE USERS</span>
                            <svg class="ml-auto text-slate-400 dark:text-[#565C57] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </a>
                        <a href="/admin/inquiries.php" class="flex items-center gap-3 p-4 bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] hover:border-emerald-600/40 dark:hover:border-accent/30 transition-all group">
                            <span class="w-2 h-2 bg-emerald-600 dark:bg-accent group-hover:scale-125 transition-transform"></span>
                            <span class="text-xs mono font-bold uppercase tracking-wider text-slate-800 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors">MANAGE INQUIRIES</span>
                            <svg class="ml-auto text-slate-400 dark:text-[#565C57] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </a>
                        <a href="/admin/index.php#contacts" class="flex items-center gap-3 p-4 bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] hover:border-emerald-600/40 dark:hover:border-accent/30 transition-all group">
                            <span class="w-2 h-2 bg-emerald-600 dark:bg-accent group-hover:scale-125 transition-transform"></span>
                            <span class="text-xs mono font-bold uppercase tracking-wider text-slate-800 dark:text-[#F5F5F0] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors">MANAGE CONTACTS</span>
                            <svg class="ml-auto text-slate-400 dark:text-[#565C57] group-hover:text-emerald-700 dark:group-hover:text-accent transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </a>
                    </div>
                </div>

                <!-- Recent Activity Summary -->
                <div class="bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] p-6">
                    <div class="flex items-center justify-between mb-5">
                        <div class="mono text-[10px] tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57] font-bold">
                            SYSTEM STATUS
                        </div>
                        <span class="flex items-center gap-1.5 text-[10px] mono text-emerald-700 dark:text-accent font-bold">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-accent animate-pulse"></span>
                            ALL SYSTEMS NOMINAL
                        </span>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div>
                            <div class="mono text-[9px] tracking-wider uppercase text-slate-500 dark:text-[#565C57] mb-1">USER DB</div>
                            <div class="text-emerald-700 dark:text-accent mono text-xs font-bold">ONLINE</div>
                        </div>
                        <div>
                            <div class="mono text-[9px] tracking-wider uppercase text-slate-500 dark:text-[#565C57] mb-1">REGISTRATIONS</div>
                            <div class="text-emerald-700 dark:text-accent mono text-xs font-bold">ONLINE</div>
                        </div>
                        <div>
                            <div class="mono text-[9px] tracking-wider uppercase text-slate-500 dark:text-[#565C57] mb-1">INQUIRIES</div>
                            <div class="text-emerald-700 dark:text-accent mono text-xs font-bold">ONLINE</div>
                        </div>
                        <div>
                            <div class="mono text-[9px] tracking-wider uppercase text-slate-500 dark:text-[#565C57] mb-1">CONTACTS</div>
                            <div class="text-emerald-700 dark:text-accent mono text-xs font-bold">ONLINE</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>
