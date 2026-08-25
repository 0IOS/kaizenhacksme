<?php declare(strict_types=1); require_once __DIR__ . '/../../app/bootstrap.php';

use App\Middleware\AuthMiddleware;
use App\Services\InquiryService;
use App\Helpers\Csrf;

$user = AuthMiddleware::requireRole('admin', 'organizer');
$csrfToken = Csrf::token();

$inquiryService = new InquiryService();
$inquiries = $inquiryService->getAll(200);

$pageTitle = 'Manage Inquiries — Admin — Kaizen Hacks';
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
                        <a href="/admin/events.php" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-medium uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-[#0B0D0C] border border-transparent hover:border-slate-200 dark:hover:border-[#1A1C1A] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                            EVENTS
                        </a>
                        <a href="/admin/users.php" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-medium uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-[#0B0D0C] border border-transparent hover:border-slate-200 dark:hover:border-[#1A1C1A] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            USERS
                        </a>
                        <a href="/admin/inquiries.php" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-bold uppercase tracking-wider bg-emerald-600/10 dark:bg-accent/10 text-emerald-700 dark:text-accent border border-emerald-600/20 dark:border-accent/20 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            INQUIRIES
                        </a>
                        <a href="/admin/contacts.php" class="flex items-center gap-2.5 px-3 py-2.5 text-xs mono font-medium uppercase tracking-wider text-slate-700 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-[#0B0D0C] border border-transparent hover:border-slate-200 dark:hover:border-[#1A1C1A] transition-colors">
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
                        INQUIRIES
                    </h1>
                    <p class="mt-2 text-xs mono text-slate-600 dark:text-[#A9ADA9] tracking-wide">
                        <?= count($inquiries) ?> PARTNER INQUIR<?= count($inquiries) !== 1 ? 'IES' : 'Y' ?> RECEIVED
                    </p>
                </div>

                <!-- Inquiries Table -->
                <div class="bg-white dark:bg-[#0B0D0C] border border-slate-200 dark:border-[#1A1C1A] overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="border-b border-slate-200 dark:border-[#1A1C1A]">
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57]">COMPANY</th>
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57]">CONTACT</th>
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57] hidden md:table-cell">EMAIL</th>
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57] hidden lg:table-cell">TIER</th>
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57]">STATUS</th>
                                    <th class="px-5 py-3.5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#565C57] hidden sm:table-cell">DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (empty($inquiries)): ?>
                                    <tr>
                                        <td colspan="6" class="px-5 py-12 text-center">
                                            <div class="mono text-xs text-slate-500 dark:text-[#565C57] uppercase tracking-wider">NO INQUIRIES FOUND</div>
                                        </td>
                                    </tr>
                                <?php else: ?>
                                    <?php foreach ($inquiries as $inq): ?>
                                        <tr class="border-b border-slate-100 dark:border-[#1A1C1A]/60 hover:bg-slate-50 dark:hover:bg-[#050605] transition-colors inquiry-row" data-inquiry-id="<?= $inq['id'] ?>">
                                            <td class="px-5 py-4">
                                                <div class="font-display font-bold text-sm text-slate-950 dark:text-[#F5F5F0] tracking-tight">
                                                    <?= htmlspecialchars($inq['company']) ?>
                                                </div>
                                            </td>
                                            <td class="px-5 py-4">
                                                <span class="text-xs mono text-slate-700 dark:text-[#A9ADA9]">
                                                    <?= htmlspecialchars($inq['contact_name'] ?? '—') ?>
                                                </span>
                                            </td>
                                            <td class="px-5 py-4 hidden md:table-cell">
                                                <a href="mailto:<?= htmlspecialchars($inq['email']) ?>" class="text-xs mono text-emerald-700 dark:text-accent hover:underline">
                                                    <?= htmlspecialchars($inq['email']) ?>
                                                </a>
                                            </td>
                                            <td class="px-5 py-4 hidden lg:table-cell">
                                                <span class="text-[10px] mono text-slate-600 dark:text-[#A9ADA9] uppercase">
                                                    <?= htmlspecialchars(mb_strimwidth($inq['tier'] ?? '—', 0, 28, '...')) ?>
                                                </span>
                                            </td>
                                            <td class="px-5 py-4">
                                                <?php
                                                $statusColors = [
                                                    'new' => 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
                                                    'contacted' => 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
                                                    'converted' => 'bg-emerald-50 dark:bg-accent/10 text-emerald-700 dark:text-accent border-emerald-200 dark:border-accent/20',
                                                    'archived' => 'bg-slate-100 dark:bg-[#111412] text-slate-600 dark:text-[#A9ADA9] border-slate-200 dark:border-[#1A1C1A]',
                                                ];
                                                $currentStatus = $inq['status'] ?? 'new';
                                                $statusClass = $statusColors[$currentStatus] ?? $statusColors['new'];
                                                ?>
                                                <select
                                                    class="status-select appearance-none px-2 py-1 text-[10px] mono font-bold uppercase tracking-wider border outline-none transition-colors cursor-pointer rounded-none <?= $statusClass ?>"
                                                    data-inquiry-id="<?= $inq['id'] ?>"
                                                    data-current-status="<?= htmlspecialchars($currentStatus) ?>"
                                                >
                                                    <option value="new" <?= $currentStatus === 'new' ? 'selected' : '' ?>>NEW</option>
                                                    <option value="contacted" <?= $currentStatus === 'contacted' ? 'selected' : '' ?>>CONTACTED</option>
                                                    <option value="converted" <?= $currentStatus === 'converted' ? 'selected' : '' ?>>CONVERTED</option>
                                                    <option value="archived" <?= $currentStatus === 'archived' ? 'selected' : '' ?>>ARCHIVED</option>
                                                </select>
                                            </td>
                                            <td class="px-5 py-4 hidden sm:table-cell">
                                                <span class="text-xs mono text-slate-500 dark:text-[#565C57]">
                                                    <?= date('M d, Y', strtotime($inq['created_at'])) ?>
                                                </span>
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

    document.querySelectorAll('.status-select').forEach(function (select) {
        select.addEventListener('change', function () {
            var inquiryId = select.dataset.inquiryId;
            var newStatus = select.value;
            var originalStatus = select.dataset.currentStatus;

            if (newStatus === originalStatus) return;

            fetch('/api/admin/inquiries/' + inquiryId + '/status', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                body: JSON.stringify({ status: newStatus }),
            })
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (data.success) {
                    select.dataset.currentStatus = newStatus;
                } else {
                    alert(data.error || 'Failed to update status');
                    select.value = originalStatus;
                }
            })
            .catch(function () {
                alert('Network error.');
                select.value = originalStatus;
            });
        });
    });
})();
</script>

<?php require_once __DIR__ . '/../../includes/footer.php'; ?>
