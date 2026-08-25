<?php declare(strict_types=1); require_once __DIR__ . '/../../app/bootstrap.php';

use App\Middleware\AuthMiddleware;
use App\Services\EventService;
use App\Helpers\Csrf;

$user = AuthMiddleware::requireRole('admin', 'organizer');
$csrfToken = Csrf::token();

$eventService = new EventService();
$events = $eventService->getAll();

$pageTitle = 'Manage Events — Admin — Kaizen Hacks';
require_once __DIR__ . '/../../includes/header.php';
?>

<main class="min-h-screen bg-[#EDF3EC] dark:bg-[#050605] pt-24 pb-16 px-5 sm:px-8 lg:px-12">
    <div class="max-w-[1400px] mx-auto">

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
                        <a href="/admin/index.php" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-medium uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-[#0B0D0C] border border-transparent hover:border-slate-200 dark:hover:border-[#1A1C1A] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                            DASHBOARD
                        </a>
                        <a href="/admin/events.php" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-bold uppercase tracking-wider bg-emerald-600/10 dark:bg-accent/10 text-emerald-700 dark:text-accent border border-emerald-600/20 dark:border-accent/20 transition-colors">
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
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0] uppercase">
                            EVENTS
                        </h1>
                        <p class="mt-2 text-xs mono text-slate-600 dark:text-[#A9ADA9] tracking-wide">
                            <?= count($events) ?> EVENT<?= count($events) !== 1 ? 'S' : '' ?> REGISTERED
                        </p>
                    </div>
                    <button
                        id="create-event-btn"
                        class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent dark:hover:bg-[#B7FFC9] text-white dark:text-[#050605] mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                        CREATE EVENT
                    </button>
                </div>

                <!-- Create Event Form (hidden by default) -->
                <div id="create-event-form" class="hidden mb-8 bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] p-6">
                    <div class="flex items-center justify-between mb-5">
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-emerald-600 dark:bg-accent"></span>
                            <span class="mono text-xs font-bold text-emerald-700 dark:text-accent uppercase tracking-wider">NEW EVENT INTAKE</span>
                        </div>
                        <button id="cancel-create-btn" class="p-1 text-slate-500 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent transition-colors cursor-pointer">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>

                    <form id="event-form" class="space-y-4">
                        <input type="hidden" name="_csrf_token" value="<?= htmlspecialchars($csrfToken, ENT_QUOTES, 'UTF-8') ?>">

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">EVENT NAME *</label>
                                <input type="text" name="name" required placeholder="e.g. GreenTech Ideathon" class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none">
                            </div>
                            <div>
                                <label class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">EVENT CODE *</label>
                                <input type="text" name="code" required placeholder="e.g. GTE-2026" class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">SLUG *</label>
                                <input type="text" name="slug" required placeholder="e.g. greentech-ideathon-2026" class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none">
                            </div>
                            <div>
                                <label class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">EDITION</label>
                                <input type="text" name="edition" placeholder="e.g. INAUGURAL" class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">YEAR *</label>
                                <input type="number" name="year" required value="2026" class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] outline-none transition-colors rounded-none">
                            </div>
                            <div>
                                <label class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">CITY *</label>
                                <input type="text" name="city" required placeholder="e.g. New Delhi" class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none">
                            </div>
                            <div>
                                <label class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">STATUS</label>
                                <select name="status" class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] outline-none transition-colors cursor-pointer rounded-none">
                                    <option value="upcoming">UPCOMING</option>
                                    <option value="registration_open">REGISTRATION OPEN</option>
                                    <option value="ongoing">ONGOING</option>
                                    <option value="completed">COMPLETED</option>
                                    <option value="cancelled">CANCELLED</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">VENUE</label>
                                <input type="text" name="venue" placeholder="e.g. Kalkaji Community Centre" class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none">
                            </div>
                            <div>
                                <label class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">DATE TEXT</label>
                                <input type="text" name="date_text" placeholder="e.g. MARCH 15, 2026" class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none">
                            </div>
                        </div>

                        <div>
                            <label class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">DESCRIPTION</label>
                            <textarea name="description" rows="3" placeholder="Event description..." class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors resize-none rounded-none"></textarea>
                        </div>

                        <div class="pt-4 border-t border-slate-200 dark:border-[#1A1C1A] flex items-center justify-end gap-3">
                            <button type="button" id="cancel-create-bottom" class="px-4 py-2.5 text-xs mono font-bold uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] hover:text-slate-950 dark:hover:text-[#F5F5F0] border border-slate-300 dark:border-[#1A1C1A] hover:border-slate-400 dark:hover:border-[#242825] transition-colors cursor-pointer">
                                CANCEL
                            </button>
                            <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent dark:hover:bg-[#B7FFC9] text-white dark:text-[#050605] mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm">
                                CREATE EVENT
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Events Table -->
                <div class="bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="border-b border-slate-200 dark:border-[#1A1C1A]">
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57]">EVENT</th>
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57]">CODE</th>
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57]">STATUS</th>
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57] hidden sm:table-cell">DATE</th>
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57] hidden md:table-cell">CITY</th>
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57] text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody id="events-table-body">
                                <?php if (empty($events)): ?>
                                    <tr>
                                        <td colspan="6" class="px-5 py-12 text-center">
                                            <div class="mono text-xs text-slate-500 dark:text-[#565C57] uppercase tracking-wider">NO EVENTS FOUND</div>
                                        </td>
                                    </tr>
                                <?php else: ?>
                                    <?php foreach ($events as $event): ?>
                                        <tr class="border-b border-slate-100 dark:border-[#1A1C1A]/60 hover:bg-slate-50 dark:hover:bg-[#050605] transition-colors event-row" data-event-id="<?= $event['id'] ?>">
                                            <td class="px-5 py-4">
                                                <div class="font-display font-bold text-sm text-slate-950 dark:text-[#F5F5F0] tracking-tight">
                                                    <?= htmlspecialchars($event['name']) ?>
                                                </div>
                                                <?php if (!empty($event['edition'])): ?>
                                                    <div class="text-[10px] mono text-slate-500 dark:text-[#565C57] mt-0.5">
                                                        <?= htmlspecialchars($event['edition']) ?>
                                                    </div>
                                                <?php endif; ?>
                                            </td>
                                            <td class="px-5 py-4">
                                                <span class="text-xs mono font-bold text-slate-700 dark:text-[#A9ADA9]">
                                                    <?= htmlspecialchars($event['code']) ?>
                                                </span>
                                            </td>
                                            <td class="px-5 py-4">
                                                <?php
                                                $statusColors = [
                                                    'registration_open' => 'bg-emerald-50 dark:bg-accent/10 text-emerald-700 dark:text-accent border-emerald-200 dark:border-accent/20',
                                                    'upcoming' => 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
                                                    'ongoing' => 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
                                                    'completed' => 'bg-slate-100 dark:bg-[#111412] text-slate-600 dark:text-[#A9ADA9] border-slate-200 dark:border-[#1A1C1A]',
                                                    'cancelled' => 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20',
                                                ];
                                                $statusClass = $statusColors[$event['status']] ?? $statusColors['upcoming'];
                                                ?>
                                                <span class="inline-block px-2 py-0.5 text-[10px] mono font-bold uppercase tracking-wider border <?= $statusClass ?>">
                                                    <?= htmlspecialchars(str_replace('_', ' ', $event['status'])) ?>
                                                </span>
                                            </td>
                                            <td class="px-5 py-4 hidden sm:table-cell">
                                                <span class="text-xs mono text-slate-700 dark:text-[#A9ADA9]">
                                                    <?= htmlspecialchars($event['date_text'] ?? 'TBA') ?>
                                                </span>
                                            </td>
                                            <td class="px-5 py-4 hidden md:table-cell">
                                                <span class="text-xs mono text-slate-700 dark:text-[#A9ADA9]">
                                                    <?= htmlspecialchars($event['city'] ?? '—') ?>
                                                </span>
                                            </td>
                                            <td class="px-5 py-4 text-right">
                                                <div class="flex items-center justify-end gap-2">
                                                    <button
                                                        class="edit-event-btn p-1.5 text-slate-500 dark:text-[#565C57] hover:text-emerald-700 dark:hover:text-accent transition-colors cursor-pointer"
                                                        title="Edit"
                                                        data-event-id="<?= $event['id'] ?>"
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                                    </button>
                                                    <button
                                                        class="delete-event-btn p-1.5 text-slate-500 dark:text-[#565C57] hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                                                        title="Delete"
                                                        data-event-id="<?= $event['id'] ?>"
                                                        data-event-name="<?= htmlspecialchars($event['name'], ENT_QUOTES) ?>"
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</main>

<script>
(function () {
    var csrfToken = '<?= addslashes($csrfToken) ?>';
    var createBtn = document.getElementById('create-event-btn');
    var createForm = document.getElementById('create-event-form');
    var cancelBtn = document.getElementById('cancel-create-btn');
    var cancelBottom = document.getElementById('cancel-create-bottom');
    var eventForm = document.getElementById('event-form');

    function showForm() {
        createForm.classList.remove('hidden');
        createBtn.classList.add('hidden');
        createForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function hideForm() {
        createForm.classList.add('hidden');
        createBtn.classList.remove('hidden');
        eventForm.reset();
    }

    if (createBtn) createBtn.addEventListener('click', showForm);
    if (cancelBtn) cancelBtn.addEventListener('click', hideForm);
    if (cancelBottom) cancelBottom.addEventListener('click', hideForm);

    if (eventForm) {
        eventForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var fd = new FormData(eventForm);
            var payload = {};
            fd.forEach(function (v, k) { if (k !== '_csrf_token') payload[k] = v; });

            fetch('/api/admin/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                body: JSON.stringify(payload),
            })
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert(data.error || 'Failed to create event');
                }
            })
            .catch(function () { alert('Network error. Please try again.'); });
        });
    }

    document.querySelectorAll('.delete-event-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var id = btn.dataset.eventId;
            var name = btn.dataset.eventName;
            if (!confirm('Delete event "' + name + '"? This cannot be undone.')) return;

            fetch('/api/admin/events/' + id, {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': csrfToken },
            })
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (data.success) {
                    var row = btn.closest('.event-row');
                    if (row) row.remove();
                } else {
                    alert('Failed to delete event');
                }
            })
            .catch(function () { alert('Network error.'); });
        });
    });
})();
</script>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>
