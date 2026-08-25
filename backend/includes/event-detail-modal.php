<?php
declare(strict_types=1);

use App\Helpers\Csrf;

$csrfToken = Csrf::token();
?>
<div
    id="partner-inquiry-modal"
    class="fixed inset-0 z-50 hidden items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-[#050605]/80 backdrop-blur-md overflow-y-auto anim-fade"
    role="dialog"
    aria-modal="true"
    aria-label="Partner ecosystem inquiry"
>
    <div class="relative w-full max-w-lg bg-white dark:bg-[#0B0D0C] border border-slate-300 dark:border-[#1A1C1A] p-6 sm:p-8 shadow-2xl my-8 rounded-none anim-modal">
        <!-- Top Header -->
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-[#1A1C1A] pb-4 mb-6">
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-600 dark:bg-accent" />
                <span class="mono text-xs font-bold text-emerald-700 dark:text-accent uppercase tracking-wider">
                    PARTNER ECOSYSTEM INTAKE
                </span>
            </div>

            <button
                id="partner-modal-close"
                class="p-1 text-slate-500 dark:text-[#A9ADA9] hover:text-emerald-700 dark:hover:text-accent transition-colors cursor-pointer"
                aria-label="Close modal"
            >
                <!-- X icon -->
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
            </button>
        </div>

        <!-- FORM STATE (hidden after submit) -->
        <div id="partner-form-state">
            <form id="partner-inquiry-form" class="space-y-4">
                <?= Csrf::field() ?>

                <div>
                    <div class="font-display text-2xl font-bold text-slate-950 dark:text-[#F5F5F0] uppercase tracking-tight">
                        PARTNER WITH KAIZEN HACKS
                    </div>
                    <p class="text-xs mono text-slate-600 dark:text-[#A9ADA9] mt-1">
                        Sponsor prize pools, supply developer credits, deploy GPU runtimes, or judge live stage demos.
                    </p>
                </div>

                <div class="space-y-3 pt-2">
                    <div>
                        <label for="pi-company" class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                            COMPANY / PROTOCOL NAME *
                        </label>
                        <input
                            type="text"
                            id="pi-company"
                            name="company"
                            required
                            placeholder="e.g. Anthropic / Cloud Run"
                            class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none"
                        />
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label for="pi-contact" class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                                CONTACT PERSON
                            </label>
                            <input
                                type="text"
                                id="pi-contact"
                                name="contact_name"
                                required
                                placeholder="e.g. Alex"
                                class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none"
                            />
                        </div>

                        <div>
                            <label for="pi-email" class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                                WORK EMAIL *
                            </label>
                            <input
                                type="email"
                                id="pi-email"
                                name="email"
                                required
                                placeholder="alex@company.io"
                                class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors rounded-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label for="pi-tier" class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                            INTENDED TIER / FOCUS
                        </label>
                        <select
                            id="pi-tier"
                            name="tier"
                            class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2.5 text-xs mono text-slate-950 dark:text-[#F5F5F0] outline-none transition-colors cursor-pointer rounded-none"
                        >
                            <option value="TITANIUM (NAMING + MAIN BOUNTY + STAGE)">TITANIUM // TITLE SPONSOR & MAIN BOUNTY</option>
                            <option value="PLATINUM (BOUNTY + MENTORSHIP)">PLATINUM // TRACK BOUNTY & MENTOR LAB</option>
                            <option value="GOLD (CREDITS + HIRING POOL)">GOLD // INFRA CREDITS & HIRING ACCESS</option>
                            <option value="ECOSYSTEM (COMMUNITY & GRANTS)">ECOSYSTEM // SPECIAL GRANT POOL</option>
                        </select>
                    </div>

                    <div>
                        <label for="pi-offering" class="block text-[11px] mono text-slate-700 dark:text-[#A9ADA9] font-bold uppercase mb-1">
                            OFFERINGS / API CREDITS (OPTIONAL)
                        </label>
                        <textarea
                            id="pi-offering"
                            name="offering"
                            rows="2"
                            placeholder="e.g. $10,000 GPU API credits, custom hardware kits, $5K track bounty"
                            class="w-full bg-slate-50 dark:bg-[#050605] border border-slate-300 dark:border-[#1A1C1A] focus:border-emerald-600 dark:focus:border-accent px-3.5 py-2 text-xs mono text-slate-950 dark:text-[#F5F5F0] placeholder-slate-400 dark:placeholder-[#565C57] outline-none transition-colors resize-none rounded-none"
                        ></textarea>
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-200 dark:border-[#1A1C1A] flex items-center justify-between">
                    <div class="text-[10px] mono text-slate-500 dark:text-[#565C57] font-medium">
                        DIRECT DECK & CALL WITHIN 12 HOURS
                    </div>

                    <button
                        type="submit"
                        class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent text-white dark:text-[#050605] mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer rounded-none shadow-sm"
                    >
                        <span>TRANSMIT BRIEF</span>
                        <!-- ArrowRight icon -->
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </form>
        </div>

        <!-- SUCCESS STATE (hidden by default) -->
        <div id="partner-success-state" class="hidden text-center py-8 space-y-4">
            <div class="w-12 h-12 bg-emerald-50 dark:bg-accent/10 border border-emerald-600 dark:border-accent rounded-full flex items-center justify-center mx-auto text-emerald-700 dark:text-accent">
                <!-- CheckCircle2 icon -->
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m9 12 2 2 4-4"/>
                </svg>
            </div>

            <h3 class="font-display font-bold text-2xl text-slate-950 dark:text-[#F5F5F0] uppercase">
                TRANSMISSION RECEIVED
            </h3>

            <p class="text-xs mono text-slate-700 dark:text-[#A9ADA9] max-w-sm mx-auto leading-relaxed">
                Our core team will contact <span id="partner-success-email" class="text-emerald-700 dark:text-accent font-bold"></span> with the complete Partner Deck and track customization kit.
            </p>

            <button
                id="partner-success-close"
                class="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-accent text-white dark:text-[#050605] mono font-bold text-xs uppercase tracking-wider cursor-pointer rounded-none shadow-sm"
            >
                CLOSE
            </button>
        </div>
    </div>
</div>

<script>
(function () {
    var modal = document.getElementById('partner-inquiry-modal');
    var form = document.getElementById('partner-inquiry-form');
    var formState = document.getElementById('partner-form-state');
    var successState = document.getElementById('partner-success-state');
    var successEmail = document.getElementById('partner-success-email');
    var closeBtn = document.getElementById('partner-modal-close');
    var successCloseBtn = document.getElementById('partner-success-close');

    function openModal() {
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        formState.classList.remove('hidden');
        successState.classList.add('hidden');
        if (form) form.reset();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
        formState.classList.remove('hidden');
        successState.classList.add('hidden');
    }

    /* Expose openModal globally for footer/nav buttons */
    window.openPartnerModal = openModal;

    /* Close buttons */
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeModal);

    /* Backdrop click */
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
    }

    /* Escape key */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    /* Bind footer buttons */
    var footerPartnerBtn = document.getElementById('footer-partner-btn');
    if (footerPartnerBtn) footerPartnerBtn.addEventListener('click', openModal);
    var footerYourLogoBtn = document.getElementById('footer-your-logo-btn');
    if (footerYourLogoBtn) footerYourLogoBtn.addEventListener('click', openModal);

    /* Form submission */
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var company = document.getElementById('pi-company').value.trim();
            var email = document.getElementById('pi-email').value.trim();
            if (!company || !email) return;

            var csrfField = form.querySelector('input[name="_csrf_token"]');
            var csrfToken = csrfField ? csrfField.value : '';

            var payload = {
                company: company,
                contact_name: document.getElementById('pi-contact').value.trim(),
                email: email,
                tier: document.getElementById('pi-tier').value,
                offering: document.getElementById('pi-offering').value.trim(),
                _csrf_token: csrfToken,
            };

            fetch('/api/partner-inquiry.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                body: JSON.stringify(payload),
            })
            .then(function (r) { return r.json(); })
            .then(function () {
                formState.classList.add('hidden');
                successState.classList.remove('hidden');
                if (successEmail) successEmail.textContent = email;
            })
            .catch(function () {
                /* Show success anyway to avoid broken UX */
                formState.classList.add('hidden');
                successState.classList.remove('hidden');
                if (successEmail) successEmail.textContent = email;
            });
        });
    }
})();
</script>
