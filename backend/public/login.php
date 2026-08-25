<?php declare(strict_types=1); require_once __DIR__ . '/../app/bootstrap.php';

use App\Helpers\Auth;
use App\Helpers\Csrf;
use App\Config\Session;

if (Auth::isLoggedIn()) {
    header('Location: /dashboard.php');
    exit;
}

$pageTitle = 'Login — Kaizen Hacks';
$pageDescription = 'Sign in to your Kaizen Hacks account to manage event registrations and access the builder dashboard.';
$baseUrl = '';

require_once __DIR__ . '/../includes/header.php';
require_once __DIR__ . '/../includes/navbar.php';

$flashError = Session::get('error');
$flashSuccess = Session::get('success');
?>
<main class="min-h-screen flex items-center justify-center px-5 sm:px-8 pt-28 pb-20">
    <div class="relative w-full max-w-md">
        <!-- Ghost numeral backdrop -->
        <div aria-hidden="true" class="ghost-numeral absolute -top-16 -right-8 text-[160px] opacity-[0.04] dark:opacity-[0.05] pointer-events-none select-none">KZ</div>

        <div class="relative bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] shadow-sm">
            <!-- Top accent bar -->
            <div class="h-1 bg-emerald-600 dark:bg-accent"></div>

            <div class="px-8 py-10 sm:px-10 sm:py-12">
                <!-- Header -->
                <div class="mb-8">
                    <div class="mono text-[9px] tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57] mb-2">
                        KAIZEN_SYSTEM // AUTH_MODULE
                    </div>
                    <h1 class="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0]">
                        LOGIN <span class="text-emerald-700 dark:text-accent">//</span> KAIZEN_SYSTEM
                    </h1>
                </div>

                <!-- Flash Messages -->
                <?php if ($flashError): ?>
                    <div id="login-feedback" class="mb-6 px-4 py-3 text-xs mono border border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                        <?= htmlspecialchars($flashError, ENT_QUOTES, 'UTF-8') ?>
                    </div>
                <?php elseif ($flashSuccess): ?>
                    <div id="login-feedback" class="mb-6 px-4 py-3 text-xs mono border border-emerald-300 dark:border-accent/30 bg-emerald-50 dark:bg-accent/10 text-emerald-700 dark:text-accent">
                        <?= htmlspecialchars($flashSuccess, ENT_QUOTES, 'UTF-8') ?>
                    </div>
                <?php else: ?>
                    <div id="login-feedback" class="mb-6 px-4 py-3 text-xs mono border hidden"></div>
                <?php endif; ?>

                <!-- Login Form -->
                <form id="login-form" class="space-y-5">
                    <input type="hidden" name="_csrf_token" value="<?= htmlspecialchars(Csrf::token(), ENT_QUOTES, 'UTF-8') ?>">

                    <!-- Email -->
                    <div>
                        <label for="login-email" class="block mono text-[10px] tracking-[0.2em] uppercase text-slate-600 dark:text-[#565C57] mb-2 font-bold">
                            EMAIL_ADDRESS
                        </label>
                        <input
                            type="email"
                            id="login-email"
                            name="email"
                            required
                            autocomplete="email"
                            placeholder="you@example.com"
                            class="w-full px-4 py-3 bg-[#F2F7F1] dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] text-sm font-sans text-slate-900 dark:text-[#F5F5F0] placeholder:text-slate-400 dark:placeholder:text-[#565C57] focus:outline-none focus:border-emerald-600 dark:focus:border-accent focus:ring-1 focus:ring-emerald-600/30 dark:focus:ring-accent/30 transition-colors"
                        >
                    </div>

                    <!-- Password -->
                    <div>
                        <label for="login-password" class="block mono text-[10px] tracking-[0.2em] uppercase text-slate-600 dark:text-[#565C57] mb-2 font-bold">
                            PASSWORD
                        </label>
                        <input
                            type="password"
                            id="login-password"
                            name="password"
                            required
                            autocomplete="current-password"
                            placeholder="Min 8 characters"
                            class="w-full px-4 py-3 bg-[#F2F7F1] dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] text-sm font-sans text-slate-900 dark:text-[#F5F5F0] placeholder:text-slate-400 dark:placeholder:text-[#565C57] focus:outline-none focus:border-emerald-600 dark:focus:border-accent focus:ring-1 focus:ring-emerald-600/30 dark:focus:ring-accent/30 transition-colors"
                        >
                    </div>

                    <!-- Submit -->
                    <button type="submit" class="cta-solid w-full py-3.5 text-xs tracking-widest mt-2">
                        AUTHENTICATE
                        <span class="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                    </button>
                </form>

                <!-- Footer Links -->
                <div class="mt-8 pt-6 border-t border-slate-200 dark:border-[#1A1C1A] text-center">
                    <p class="mono text-xs text-slate-600 dark:text-[#565C57]">
                        NO ACCOUNT?
                        <a href="/register.php" class="text-emerald-700 dark:text-accent font-bold hover:underline">
                            REGISTER →
                        </a>
                    </p>
                </div>
            </div>
        </div>

        <!-- Bottom system status -->
        <div class="mt-4 flex items-center justify-center gap-2 mono text-[9px] tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57]">
            <span class="w-1 h-1 rounded-full bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block"></span>
            <span>AUTH_MODULE v1.0 // SECURE_CHANNEL</span>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
