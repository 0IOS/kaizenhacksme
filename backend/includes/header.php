<?php
declare(strict_types=1);

use App\Helpers\Auth;
use App\Helpers\Csrf;

$pageTitle = $pageTitle ?? 'Kaizen Hacks — Continuous Builder Evolution';
$pageDescription = $pageDescription ?? 'A high-signal builder collective launching with the GreenTech Ideathon — turning SDG ideas into working apps, websites, and games that tackle real-world problems.';
$baseUrl = $baseUrl ?? '';

$loggedIn = Auth::isLoggedIn();
$currentUser = $loggedIn ? Auth::getCurrentUser() : null;
$csrfToken = Csrf::token();
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#EDF3EC" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#050605" media="(prefers-color-scheme: dark)">

    <link rel="icon" type="image/svg+xml" href="<?= $baseUrl ?>/assets/favicon.svg">

    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?></title>
    <meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">

    <!-- OpenGraph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:site_name" content="Kaizen Hacks">
    <meta property="og:url" content="<?= htmlspecialchars($_SERVER['HTTP_HOST'] ?? 'https://kaizenhacks.org', ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:image" content="<?= $baseUrl ?>/assets/og-image.png">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">
    <meta name="twitter:image" content="<?= $baseUrl ?>/assets/og-image.png">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        display: ['"Space Grotesk"', 'sans-serif'],
                        mono: ['"JetBrains Mono"', 'monospace'],
                        sans: ['"Inter"', 'sans-serif'],
                    },
                    colors: {
                        accent: '#8DFFB3',
                    },
                },
            },
        };
    </script>

    <!-- Main CSS -->
    <link rel="stylesheet" href="<?= $baseUrl ?>/assets/css/main.css">

    <!-- CSRF Token -->
    <?= Csrf::meta() ?>

    <!-- Inline critical: system status blink -->
    <style>
        .blink-dot {
            animation: blink 1.4s steps(2, start) infinite;
        }
        @keyframes blink {
            to { opacity: 0; }
        }
        .ghost-numeral {
            font-family: "Space Grotesk", sans-serif;
            font-weight: 700;
            line-height: 0.85;
        }
        .anim-fade {
            animation: fadeIn 0.25s ease-out both;
        }
        .anim-modal {
            animation: modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes modalSlideIn {
            from { opacity: 0; transform: translateY(12px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .grid-subtle {
            background-image:
                linear-gradient(rgba(141,255,179,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(141,255,179,0.06) 1px, transparent 1px);
            background-size: 60px 60px;
        }
        .grid-fade-y {
            mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
        }
    </style>
</head>

<body
    class="bg-[#EDF3EC] dark:bg-[#050605] text-[#0B0D0C] dark:text-[#F5F5F0] antialiased selection:bg-[#8DFFB3] selection:text-[#050605] overflow-x-hidden transition-colors duration-300"
    data-logged-in="<?= $loggedIn ? 'true' : 'false' ?>"
    data-user-role="<?= htmlspecialchars($currentUser['role'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
    data-user-name="<?= htmlspecialchars($currentUser['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
    data-user-email="<?= htmlspecialchars($currentUser['email'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
    data-csrf-token="<?= htmlspecialchars($csrfToken, ENT_QUOTES, 'UTF-8') ?>"
>

<!-- System Status HUD -->
<div class="fixed top-3 right-4 z-50 flex items-center gap-2 mono text-[9px] tracking-[0.22em] uppercase text-slate-500 dark:text-[#565C57] pointer-events-none select-none">
    <span class="w-1 h-1 rounded-full bg-emerald-600/70 dark:bg-accent/60 blink-dot inline-block" />
    <span>SYS_OK // NODE_DELHI</span>
</div>
