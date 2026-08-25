<?php

declare(strict_types=1);

namespace App\Middleware;

class ErrorHandler
{
    public static function register(): void
    {
        set_error_handler(function (int $severity, string $message, string $file, int $line) {
            $logMessage = "[{$severity}] {$message} in {$file}:{$line}";
            \App\Helpers\Logger::error($logMessage, [
                'severity' => $severity,
                'file'     => $file,
                'line'     => $line,
            ]);

            if ($severity === E_ERROR || $severity === E_USER_ERROR) {
                self::renderError();
            }
        });

        set_exception_handler(function (\Throwable $e) {
            \App\Helpers\Logger::critical('Uncaught exception', [
                'message' => $e->getMessage(),
                'file'    => $e->getFile(),
                'line'    => $e->getLine(),
                'code'    => $e->getCode(),
                'trace'   => $e->getTraceAsString(),
            ]);
            self::renderError();
        });

        register_shutdown_function(function () {
            $error = error_get_last();
            if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
                \App\Helpers\Logger::critical('Fatal error', [
                    'message' => $error['message'],
                    'file'    => $error['file'],
                    'line'    => $error['line'],
                ]);
                self::renderError();
            }
        });
    }

    public static function renderError(): void
    {
        http_response_code(500);

        $isApi = self::isApiRequest();

        if ($isApi) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['success' => false, 'error' => 'Internal server error']);
        } else {
            self::renderErrorPage(500, 'Something went wrong.', 'Please try again later.');
        }

        exit;
    }

    public static function renderNotFound(): void
    {
        http_response_code(404);

        if (self::isApiRequest()) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['success' => false, 'error' => 'Not found']);
        } else {
            self::renderErrorPage(404, 'Page not found.', 'The page you are looking for does not exist.');
        }

        exit;
    }

    public static function renderForbidden(): void
    {
        http_response_code(403);

        if (self::isApiRequest()) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['success' => false, 'error' => 'Forbidden']);
        } else {
            self::renderErrorPage(403, 'Access denied.', 'You do not have permission to view this page.');
        }

        exit;
    }

    public static function renderRateLimited(): void
    {
        http_response_code(429);

        if (self::isApiRequest()) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['success' => false, 'error' => 'Too many requests. Please try again later.']);
        } else {
            self::renderErrorPage(429, 'Too many requests.', 'Please wait a moment and try again.');
        }

        exit;
    }

    private static function isApiRequest(): bool
    {
        $uri = $_SERVER['REQUEST_URI'] ?? '';
        $accept = $_SERVER['HTTP_ACCEPT'] ?? '';

        return str_starts_with($uri, '/api/')
            || str_contains($accept, 'application/json')
            || ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'XMLHttpRequest';
    }

    private static function renderErrorPage(int $code, string $title, string $message): void
    {
        $appName = getenv('APP_NAME') ?: 'Kaizen Hacks';
        ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $code ?> — <?= htmlspecialchars($appName) ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Space Grotesk', sans-serif;
            background: #050605;
            color: #F5F5F0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
        }
        .error-code {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: clamp(6rem, 20vw, 12rem);
            color: #8DFFB3;
            line-height: 0.85;
            letter-spacing: -0.05em;
        }
        h1 { font-size: 1.5rem; margin: 1.5rem 0 0.5rem; font-weight: 700; }
        p { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #A9ADA9; max-width: 28rem; margin: 0 auto; }
        a { display: inline-block; margin-top: 2rem; padding: 0.75rem 2rem; background: #8DFFB3; color: #050605; font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; transition: background 0.2s; }
        a:hover { background: #B7FFC9; }
    </style>
</head>
<body>
    <div>
        <div class="error-code"><?= $code ?></div>
        <h1><?= htmlspecialchars($title) ?></h1>
        <p><?= htmlspecialchars($message) ?></p>
        <a href="/">← Back to Home</a>
    </div>
</body>
</html>
        <?php
    }
}
