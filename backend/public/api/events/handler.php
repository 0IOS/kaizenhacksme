<?php

declare(strict_types=1);

use App\Services\EventService;

$eventService = new EventService();

$method = $_SERVER['REQUEST_METHOD'];
$action = $action ?? '';

function eventsJsonResponse(mixed $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

switch ($action) {
    case '':
    case 'list':
        $status = $_GET['status'] ?? '';
        $limit = min((int) ($_GET['limit'] ?? 50), 100);
        $offset = max(0, (int) ($_GET['offset'] ?? 0));

        $events = $eventService->getAll($status, $limit, $offset);
        eventsJsonResponse(['success' => true, 'events' => $events]);
        break;

    case 'featured':
        $event = $eventService->getFeatured();
        if ($event) {
            eventsJsonResponse(['success' => true, 'event' => $event]);
        } else {
            eventsJsonResponse(['success' => false, 'error' => 'No featured event found'], 404);
        }
        break;

    default:
        if (preg_match('/^\d+$/', $action)) {
            $event = $eventService->getById((int) $action);
        } else {
            $event = $eventService->getBySlug($action);
        }

        if ($event) {
            eventsJsonResponse(['success' => true, 'event' => $event]);
        } else {
            eventsJsonResponse(['success' => false, 'error' => 'Event not found'], 404);
        }
        break;
}
