<?php

declare(strict_types=1);

use App\Helpers\Csrf;
use App\Middleware\RateLimitMiddleware;
use App\Services\ContactService;
use App\Validation\Validator;

$contactService = new ContactService();

function contactJsonResponse(mixed $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    contactJsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

RateLimitMiddleware::enforce('contact', 5, 900);

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$validator = Validator::validate($input, [
    'name'    => ['required', ['max', 200]],
    'email'   => ['required', 'email', ['max', 255]],
    'message' => ['required', ['min', 10], ['max', 5000]],
]);

if ($validator->fails()) {
    contactJsonResponse(['success' => false, 'errors' => $validator->errors()], 422);
}

$data = [
    'name'    => App\Helpers\Sanitize::string($input['name'], 200),
    'email'   => App\Helpers\Sanitize::email($input['email']),
    'subject' => !empty($input['subject']) ? App\Helpers\Sanitize::string($input['subject'], 300) : null,
    'message' => App\Helpers\Sanitize::string($input['message'], 5000),
];

$result = $contactService->submit($data);
contactJsonResponse($result, $result['success'] ? 200 : 400);
