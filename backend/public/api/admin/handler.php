<?php

declare(strict_types=1);

use App\Helpers\Auth;
use App\Helpers\Csrf;
use App\Middleware\AuthMiddleware;
use App\Services\EventService;
use App\Services\RegistrationService;
use App\Services\InquiryService;
use App\Services\ContactService;
use App\Services\UserService;

function adminJsonResponse(mixed $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

$user = AuthMiddleware::requireRole('admin', 'organizer');

$uri = $_SERVER['REQUEST_URI'];
$uri = parse_url($uri, PHP_URL_PATH);
$uri = '/' . ltrim(str_replace('/api/admin', '', $uri), '/');

$method = $_SERVER['REQUEST_METHOD'];

if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
    Csrf::verify();
}

$eventService = new EventService();
$regService = new RegistrationService();
$inquiryService = new InquiryService();
$contactService = new ContactService();
$userService = new UserService();

switch ($uri) {
    case '/stats':
        adminJsonResponse([
            'success' => true,
            'stats'   => [
                'users'         => $userService->getStats(),
                'registrations' => $regService->getStats(),
                'inquiries'     => $inquiryService->getStats(),
                'contacts'      => $contactService->getStats(),
            ],
        ]);
        break;

    case '/events':
        if ($method === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            if (!$input) {
                adminJsonResponse(['success' => false, 'error' => 'Invalid input'], 422);
            }
            $input['created_by'] = (int) $user['id'];
            $eventId = $eventService->create($input);
            if ($eventId) {
                adminJsonResponse(['success' => true, 'event_id' => $eventId], 201);
            } else {
                adminJsonResponse(['success' => false, 'error' => 'Failed to create event'], 500);
            }
        } else {
            $events = $eventService->getAll();
            adminJsonResponse(['success' => true, 'events' => $events]);
        }
        break;

    default:
        if (preg_match('#/events/(\d+)$#', $uri, $matches)) {
            $eventId = (int) $matches[1];

            if ($method === 'PUT') {
                $input = json_decode(file_get_contents('php://input'), true);
                $result = $eventService->update($eventId, $input ?: []);
                adminJsonResponse(['success' => $result]);
            } elseif ($method === 'DELETE') {
                $result = $eventService->delete($eventId);
                adminJsonResponse(['success' => $result]);
            } else {
                $event = $eventService->getById($eventId);
                if ($event) {
                    adminJsonResponse(['success' => true, 'event' => $event]);
                } else {
                    adminJsonResponse(['success' => false, 'error' => 'Event not found'], 404);
                }
            }
            break;
        }

        adminJsonResponse(['success' => false, 'error' => 'Endpoint not found'], 404);
        break;
}
