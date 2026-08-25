<?php

declare(strict_types=1);

use App\Helpers\Csrf;
use App\Middleware\RateLimitMiddleware;
use App\Services\InquiryService;
use App\Validation\Validator;

$inquiryService = new InquiryService();

function inqJsonResponse(mixed $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    inqJsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

RateLimitMiddleware::enforce('inquiry', 3, 900);

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$validator = Validator::validate($input, [
    'company'  => ['required', ['max', 200]],
    'email'    => ['required', 'email', ['max', 255]],
    'tier'     => ['required'],
]);

if ($validator->fails()) {
    inqJsonResponse(['success' => false, 'errors' => $validator->errors()], 422);
}

$data = [
    'company'       => App\Helpers\Sanitize::string($input['company'], 200),
    'contact_name'  => !empty($input['contactName']) ? App\Helpers\Sanitize::string($input['contactName'], 200) : null,
    'email'         => App\Helpers\Sanitize::email($input['email']),
    'tier'          => App\Helpers\Sanitize::string($input['tier'], 100),
    'offering'      => !empty($input['offering']) ? App\Helpers\Sanitize::string($input['offering'], 2000) : null,
];

$result = $inquiryService->submit($data);
inqJsonResponse($result, $result['success'] ? 200 : 400);
