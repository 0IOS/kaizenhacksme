<?php declare(strict_types=1); require_once __DIR__ . '/../app/bootstrap.php';

use App\Helpers\Csrf;
use App\Config\Session;

$pageTitle = 'Contact — Kaizen Hacks';
$pageDescription = 'Get in touch with the Kaizen Hacks team. Send us a message about partnerships, events, or general inquiries.';
$baseUrl = '';

require_once __DIR__ . '/../includes/header.php';
require_once __DIR__ . '/../includes/navbar.php';

$flashError = Session::get('error');
$flashSuccess = Session::get('success');
?>
<main class="min-h-screen px-5 sm:px-8 lg:px-12 pt-28 pb-20">
    <div class="max-w-2xl mx-auto">
        <!-- Ghost numeral backdrop -->
        <div class="relative">
            <div aria-hidden="true" class="ghost-numeral absolute -top-20 -right-12 text-[200px] opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none">KZ</div>

            <!-- Header -->
            <div class="mb-10">
                <div class="mono text-[9px] tracking-[0.28em] uppercase text-slate-500 dark:text-[#565C57] mb-2">
                    KAIZEN_SYSTEM // DIRECT_CHANNEL
                </div>
                <h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-[#F5F5F0]">
                    CONTACT <span class="text-emerald-700 dark:text-accent">//</span> DIRECT CHANNEL
                </h1>
                <p class="mt-4 text-sm text-slate-600 dark:text-[#A9ADA9] max-w-lg leading-relaxed">
                    Have a question about the GreenTech Ideathon, a partnership proposal, or just want to say hello?
                    Drop us a message and we'll get back to you.
                </p>
            </div>

            <!-- Form Card -->
            <div class="bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] shadow-sm">
                <!-- Top accent bar -->
                <div class="h-1 bg-emerald-600 dark:bg-accent"></div>

                <div class="px-8 py-10 sm:px-10 sm:py-12">
                    <!-- Flash Messages -->
                    <?php if ($flashError): ?>
                        <div id="contact-feedback" class="mb-6 px-4 py-3 text-xs mono border border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                            <?= htmlspecialchars($flashError, ENT_QUOTES, 'UTF-8') ?>
                        </div>
                    <?php elseif ($flashSuccess): ?>
                        <div id="contact-feedback" class="mb-6 px-4 py-3 text-xs mono border border-emerald-300 dark:border-accent/30 bg-emerald-50 dark:bg-accent/10 text-emerald-700 dark:text-accent">
                            <?= htmlspecialchars($flashSuccess, ENT_QUOTES, 'UTF-8') ?>
                        </div>
                    <?php else: ?>
                        <div id="contact-feedback" class="mb-6 px-4 py-3 text-xs mono border hidden"></div>
                    <?php endif; ?>

                    <!-- Contact Form -->
                    <form id="contact-form" class="space-y-5">
                        <input type="hidden" name="_csrf_token" value="<?= htmlspecialchars(Csrf::token(), ENT_QUOTES, 'UTF-8') ?>">

                        <!-- Name & Email Row -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label for="contact-name" class="block mono text-[10px] tracking-[0.2em] uppercase text-slate-600 dark:text-[#565C57] mb-2 font-bold">
                                    NAME
                                </label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    required
                                    autocomplete="name"
                                    placeholder="Your name"
                                    class="w-full px-4 py-3 bg-[#F2F7F1] dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] text-sm font-sans text-slate-900 dark:text-[#F5F5F0] placeholder:text-slate-400 dark:placeholder:text-[#565C57] focus:outline-none focus:border-emerald-600 dark:focus:border-accent focus:ring-1 focus:ring-emerald-600/30 dark:focus:ring-accent/30 transition-colors"
                                >
                            </div>
                            <div>
                                <label for="contact-email" class="block mono text-[10px] tracking-[0.2em] uppercase text-slate-600 dark:text-[#565C57] mb-2 font-bold">
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    required
                                    autocomplete="email"
                                    placeholder="you@example.com"
                                    class="w-full px-4 py-3 bg-[#F2F7F1] dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] text-sm font-sans text-slate-900 dark:text-[#F5F5F0] placeholder:text-slate-400 dark:placeholder:text-[#565C57] focus:outline-none focus:border-emerald-600 dark:focus:border-accent focus:ring-1 focus:ring-emerald-600/30 dark:focus:ring-accent/30 transition-colors"
                                >
                            </div>
                        </div>

                        <!-- Subject -->
                        <div>
                            <label for="contact-subject" class="block mono text-[10px] tracking-[0.2em] uppercase text-slate-600 dark:text-[#565C57] mb-2 font-bold">
                                SUBJECT
                            </label>
                            <input
                                type="text"
                                id="contact-subject"
                                name="subject"
                                placeholder="What is this about?"
                                class="w-full px-4 py-3 bg-[#F2F7F1] dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] text-sm font-sans text-slate-900 dark:text-[#F5F5F0] placeholder:text-slate-400 dark:placeholder:text-[#565C57] focus:outline-none focus:border-emerald-600 dark:focus:border-accent focus:ring-1 focus:ring-emerald-600/30 dark:focus:ring-accent/30 transition-colors"
                            >
                        </div>

                        <!-- Message -->
                        <div>
                            <label for="contact-message" class="block mono text-[10px] tracking-[0.2em] uppercase text-slate-600 dark:text-[#565C57] mb-2 font-bold">
                                MESSAGE
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                required
                                rows="6"
                                minlength="10"
                                maxlength="5000"
                                placeholder="Type your message here..."
                                class="w-full px-4 py-3 bg-[#F2F7F1] dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] text-sm font-sans text-slate-900 dark:text-[#F5F5F0] placeholder:text-slate-400 dark:placeholder:text-[#565C57] focus:outline-none focus:border-emerald-600 dark:focus:border-accent focus:ring-1 focus:ring-emerald-600/30 dark:focus:ring-accent/30 transition-colors resize-none"
                            ></textarea>
                        </div>

                        <!-- Submit -->
                        <button type="submit" class="cta-solid w-full py-3.5 text-xs tracking-widest mt-2">
                            TRANSMIT MESSAGE
                            <span class="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                        </button>
                    </form>
                </div>
            </div>

            <!-- Bottom info -->
            <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px] mono text-slate-500 dark:text-[#565C57]">
                <div class="flex items-center gap-2">
                    <span class="w-1 h-1 rounded-full bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block"></span>
                    <span>CHANNEL_OPEN // AVG_RESPONSE &lt; 24H</span>
                </div>
                <div>ALTERNATIVE: build@kaizenhacks.org</div>
            </div>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
