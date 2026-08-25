<?php declare(strict_types=1); require_once __DIR__ . '/../app/bootstrap.php';

use App\Helpers\Auth;
use App\Helpers\Csrf;
use App\Config\Session;
use App\Config\Database;

if (!Auth::isLoggedIn()) {
    Session::flash('error', 'Please log in to access the dashboard.');
    header('Location: /login.php');
    exit;
}

$user = Auth::getCurrentUser();
$isAdmin = Auth::hasRole('admin', 'super_admin');
$pageTitle = 'Dashboard — Kaizen Hacks';
$pageDescription = 'Your Kaizen Hacks dashboard. Manage your profile and event registrations.';
$baseUrl = '';

$flashError = Session::get('error');
$flashSuccess = Session::get('success');

$registrations = [];
try {
    $db = Database::getConnection();
    $stmt = $db->prepare(
        'SELECT r.id, r.event_id, r.registered_at, r.status,
                e.title AS event_title, e.date AS event_date, e.location AS event_location
         FROM registrations r
         JOIN events e ON e.id = r.event_id
         WHERE r.user_id = ?
         ORDER BY r.registered_at DESC'
    );
    $stmt->execute([$user['id']]);
    $registrations = $stmt->fetchAll();
} catch (\Throwable $e) {
    \App\Helpers\Logger::warning('Failed to load registrations', ['error' => $e->getMessage()]);
}

require_once __DIR__ . '/../includes/header.php';
require_once __DIR__ . '/../includes/navbar.php';
?>
<main class="min-h-screen px-5 sm:px-8 lg:px-12 pt-28 pb-20">
    <div class="max-w-4xl mx-auto">
        <!-- Ghost numeral backdrop -->
        <div class="relative">
            <div aria-hidden="true" class="ghost-numeral absolute -top-20 -right-12 text-[200px] opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none">KZ</div>

            <!-- Header -->
            <div class="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <div class="mono text-[9px] tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57] mb-2">
                        KAIZEN_SYSTEM // USER_CONSOLE
                    </div>
                    <h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0]">
                        DASHBOARD <span class="text-emerald-700 dark:text-accent">//</span> <?= strtoupper(htmlspecialchars($user['name'] ?? 'OPERATOR', ENT_QUOTES, 'UTF-8')) ?>
                    </h1>
                </div>
                <button
                    id="dashboard-logout-btn"
                    class="self-start sm:self-auto px-5 py-2.5 mono text-[10px] tracking-widest uppercase font-bold border border-slate-300 dark:border-[#1A1C1A] bg-[var(--color-bg-elevated)] dark:bg-[#0B0D0C] text-slate-700 dark:text-[#A9ADA9] hover:border-red-400 hover:text-red-600 dark:hover:border-red-500/40 dark:hover:text-red-400 transition-colors cursor-pointer"
                >
                    LOGOUT →
                </button>
            </div>

            <!-- Flash Messages -->
            <?php if ($flashError): ?>
                <div class="mb-6 px-4 py-3 text-xs mono border border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                    <?= htmlspecialchars($flashError, ENT_QUOTES, 'UTF-8') ?>
                </div>
            <?php endif; ?>
            <?php if ($flashSuccess): ?>
                <div class="mb-6 px-4 py-3 text-xs mono border border-emerald-300 dark:border-accent/30 bg-emerald-50 dark:bg-accent/10 text-emerald-700 dark:text-accent">
                    <?= htmlspecialchars($flashSuccess, ENT_QUOTES, 'UTF-8') ?>
                </div>
            <?php endif; ?>

            <!-- Admin Link -->
            <?php if ($isAdmin): ?>
                <a href="/admin/" class="inline-flex items-center gap-2 mb-8 px-5 py-2.5 mono text-[10px] tracking-widest uppercase font-bold bg-emerald-600 dark:bg-accent text-white dark:text-[#050605] hover:bg-emerald-700 dark:hover:bg-[#B7FFC9] transition-colors">
                    ADMIN_PANEL
                    <span aria-hidden="true">→</span>
                </a>
            <?php endif; ?>

            <!-- User Info Card -->
            <div class="bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] shadow-sm mb-8">
                <div class="h-1 bg-emerald-600 dark:bg-accent"></div>
                <div class="px-8 py-8">
                    <div class="mono text-[10px] tracking-[0.2em] uppercase text-slate-500 dark:text-[#565C57] mb-4 font-bold">
                        IDENTITY_DATA // USER_PROFILE
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <div class="mono text-[9px] tracking-[0.2em] uppercase text-slate-400 dark:text-[#3D443D] mb-1">NAME</div>
                            <div class="text-sm font-medium text-slate-900 dark:text-[#F5F5F0]">
                                <?= htmlspecialchars($user['name'] ?? '—', ENT_QUOTES, 'UTF-8') ?>
                            </div>
                        </div>
                        <div>
                            <div class="mono text-[9px] tracking-[0.2em] uppercase text-slate-400 dark:text-[#3D443D] mb-1">EMAIL</div>
                            <div class="text-sm font-medium text-slate-900 dark:text-[#F5F5F0]">
                                <?= htmlspecialchars($user['email'] ?? '—', ENT_QUOTES, 'UTF-8') ?>
                            </div>
                        </div>
                        <div>
                            <div class="mono text-[9px] tracking-[0.2em] uppercase text-slate-400 dark:text-[#3D443D] mb-1">ROLE</div>
                            <div class="inline-block px-2 py-0.5 mono text-[10px] tracking-wider uppercase font-bold
                                <?= $isAdmin
                                    ? 'bg-emerald-100 dark:bg-accent/15 text-emerald-700 dark:text-accent border border-emerald-300 dark:border-accent/30'
                                    : 'bg-slate-100 dark:bg-[#111412] text-slate-700 dark:text-[#A9ADA9] border border-slate-300 dark:border-[#1A1C1A]' ?>">
                                <?= htmlspecialchars($user['role'] ?? 'participant', ENT_QUOTES, 'UTF-8') ?>
                            </div>
                        </div>
                        <div>
                            <div class="mono text-[9px] tracking-[0.2em] uppercase text-slate-400 dark:text-[#3D443D] mb-1">MEMBER_SINCE</div>
                            <div class="text-sm font-medium text-slate-900 dark:text-[#F5F5F0]">
                                <?= $user['created_at'] ? date('M d, Y', strtotime($user['created_at'])) : '—' ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Event Registrations -->
            <div class="bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] shadow-sm">
                <div class="h-1 bg-emerald-600 dark:bg-accent"></div>
                <div class="px-8 py-8">
                    <div class="flex items-center justify-between mb-6">
                        <div class="mono text-[10px] tracking-[0.2em] uppercase text-slate-500 dark:text-[#565C57] font-bold">
                            EVENT_REGISTRATIONS // <?= count($registrations) ?> TOTAL
                        </div>
                        <a href="/" class="mono text-[10px] tracking-wider uppercase text-emerald-700 dark:text-accent font-bold hover:underline">
                            BROWSE EVENTS →
                        </a>
                    </div>

                    <?php if (empty($registrations)): ?>
                        <div class="py-12 text-center">
                            <div class="mono text-[9px] tracking-[0.28em] uppercase text-slate-400 dark:text-[#3D443D] mb-3">
                                NO_REGISTRATIONS_FOUND
                            </div>
                            <p class="text-sm text-slate-600 dark:text-[#A9ADA9] mb-6">
                                You haven't registered for any events yet.
                            </p>
                            <a href="/" class="cta-solid px-6 py-2.5 text-xs tracking-widest">
                                EXPLORE EVENTS
                                <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    <?php else: ?>
                        <div class="space-y-4">
                            <?php foreach ($registrations as $reg): ?>
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 border border-slate-200 dark:border-[#1A1C1A] bg-[#F8FAF7] dark:bg-[#050605] hover:border-slate-300 dark:hover:border-[#242825] transition-colors">
                                    <div class="min-w-0">
                                        <div class="font-display font-bold text-sm text-slate-900 dark:text-[#F5F5F0] truncate">
                                            <?= htmlspecialchars($reg['event_title'] ?? 'Untitled Event', ENT_QUOTES, 'UTF-8') ?>
                                        </div>
                                        <div class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 mono text-[10px] tracking-wider uppercase text-slate-500 dark:text-[#565C57]">
                                            <?php if ($reg['event_date']): ?>
                                                <span class="flex items-center gap-1">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                                    <?= htmlspecialchars(date('M d, Y', strtotime($reg['event_date'])), ENT_QUOTES, 'UTF-8') ?>
                                                </span>
                                            <?php endif; ?>
                                            <?php if ($reg['event_location']): ?>
                                                <span class="flex items-center gap-1">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                                    <?= htmlspecialchars($reg['event_location'], ENT_QUOTES, 'UTF-8') ?>
                                                </span>
                                            <?php endif; ?>
                                            <span class="flex items-center gap-1">
                                                Registered <?= htmlspecialchars(date('M d', strtotime($reg['registered_at'])), ENT_QUOTES, 'UTF-8') ?>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3 shrink-0">
                                        <span class="px-2 py-0.5 mono text-[9px] tracking-wider uppercase font-bold
                                            <?= ($reg['status'] ?? 'confirmed') === 'confirmed'
                                                ? 'bg-emerald-100 dark:bg-accent/15 text-emerald-700 dark:text-accent border border-emerald-300 dark:border-accent/30'
                                                : 'bg-slate-100 dark:bg-[#111412] text-slate-500 dark:text-[#565C57] border border-slate-300 dark:border-[#1A1C1A]' ?>">
                                            <?= htmlspecialchars($reg['status'] ?? 'confirmed', ENT_QUOTES, 'UTF-8') ?>
                                        </span>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Bottom system status -->
            <div class="mt-8 flex items-center justify-center gap-2 mono text-[9px] tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57]">
                <span class="w-1 h-1 rounded-full bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block"></span>
                <span>SESSION_ACTIVE // USER_<?= strtoupper(substr((string)($user['id'] ?? 0), 0, 6)) ?></span>
            </div>
        </div>
    </div>
</main>

<script>
(function () {
    var logoutBtn = document.getElementById('dashboard-logout-btn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', function () {
        logoutBtn.disabled = true;
        logoutBtn.textContent = 'LOGGING OUT...';

        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': (document.querySelector('meta[name="csrf-token"]') || {}).content || ''
            }
        })
        .then(function () {
            window.location.href = '/login.php';
        })
        .catch(function () {
            window.location.href = '/login.php';
        });
    });
})();
</script>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
