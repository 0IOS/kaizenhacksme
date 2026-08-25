<?php

declare(strict_types=1);

use App\Helpers\Auth;
use App\Helpers\Csrf;
use App\Middleware\RateLimitMiddleware;
use App\Services\RegistrationService;

$regService = new RegistrationService();

function regsJsonResponse(mixed $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

$uri = $_SERVER['REQUEST_URI'];
$uri = parse_url($uri, PHP_URL_PATH);
$uri = '/' . ltrim(str_replace('/api/registrations', '', $uri), '/');

$method = $_SERVER['REQUEST_METHOD'];

switch ($uri) {
    case '/register':
        if ($method !== 'POST') {
            regsJsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
        }

        Csrf::verify();

        $user = Auth::getCurrentUser();
        if (!$user) {
            regsJsonResponse(['success' => false, 'error' => 'Authentication required'], 401);
        }

        RateLimitMiddleware::enforce('event-registration', 5, 900);

        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

        if (empty($input['event_id'])) {
            regsJsonResponse(['success' => false, 'error' => 'Event ID is required'], 422);
        }

        $eventId = (int) $input['event_id'];
        if ($eventId <= 0) {
            regsJsonResponse(['success' => false, 'error' => 'Invalid event ID'], 422);
        }

        $result = $regService->register((int) $user['id'], $eventId);

        regsJsonResponse($result, $result['success'] ? 200 : 400);
        break;

    case '/cancel':
        if ($method !== 'POST') {
            regsJsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
        }

        Csrf::verify();

        $user = Auth::getCurrentUser();
        if (!$user) {
            regsJsonResponse(['success' => false, 'error' => 'Authentication required'], 401);
        }

        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

        if (empty($input['event_id'])) {
            regsJsonResponse(['success' => false, 'error' => 'Event ID is required'], 422);
        }

        $result = $regService->cancel((int) $user['id'], (int) $input['event_id']);
        regsJsonResponse($result, $result['success'] ? 200 : 400);
        break;

    case '/my':
        $user = Auth::getCurrentUser();
        if (!$user) {
            regsJsonResponse(['success' => false, 'error' => 'Authentication required'], 401);
        }

        $registrations = $regService->getUserRegistrations((int) $user['id']);
        regsJsonResponse(['success' => true, 'registrations' => $registrations]);
        break;

    default:
        regsJsonResponse(['success' => false, 'error' => 'Endpoint not found'], 404);
        break;
}
