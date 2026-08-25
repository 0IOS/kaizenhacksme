<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/app/bootstrap.php';

use App\Config\Session;
use App\Helpers\Csrf;
use App\Middleware\ErrorHandler;

$uri = $_SERVER['REQUEST_URI'];
$uri = parse_url($uri, PHP_URL_PATH);
$uri = preg_replace('#^/api#', '', $uri);
$uri = '/' . ltrim($uri, '/');

$method = $_SERVER['REQUEST_METHOD'];

$parts = array_filter(explode('/', $uri));
$endpoint = $parts[1] ?? '';
$action = $parts[2] ?? '';

function jsonResponse(mixed $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    switch ($endpoint) {
        case 'health':
            jsonResponse(['status' => 'ok', 'timestamp' => date('c')]);
            break;

        case 'auth':
            require __DIR__ . '/auth/handler.php';
            break;

        case 'events':
            require __DIR__ . '/events/handler.php';
            break;

        case 'registrations':
            require __DIR__ . '/registrations/handler.php';
            break;

        case 'inquiries':
            require __DIR__ . '/inquiries/handler.php';
            break;

        case 'contact':
            require __DIR__ . '/contact/handler.php';
            break;

        case 'admin':
            require __DIR__ . '/admin/handler.php';
            break;

        default:
            jsonResponse(['success' => false, 'error' => 'Endpoint not found'], 404);
            break;
    }
} catch (\Throwable $e) {
    \App\Helpers\Logger::critical('API error', [
        'endpoint' => $endpoint,
        'message'  => $e->getMessage(),
        'file'     => $e->getFile(),
        'line'     => $e->getLine(),
    ]);
    jsonResponse(['success' => false, 'error' => 'Internal server error'], 500);
}
