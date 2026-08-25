<?php

declare(strict_types=1);

use App\Helpers\Auth;
use App\Helpers\Csrf;
use App\Middleware\RateLimitMiddleware;
use App\Validation\Validator;

$method = $_SERVER['REQUEST_METHOD'];
$action = $action ?? '';

function authJsonResponse(mixed $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

$uri = $_SERVER['REQUEST_URI'];
$uri = parse_url($uri, PHP_URL_PATH);
$uri = '/' . ltrim(str_replace('/api/auth', '', $uri), '/');

switch ($uri) {
    case '/login':
        if ($method !== 'POST') {
            authJsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
        }

        RateLimitMiddleware::enforce('login', 5, 900);

        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

        $validator = Validator::validate($input, [
            'email'    => ['required', 'email'],
            'password' => ['required', ['min', 8]],
        ]);

        if ($validator->fails()) {
            authJsonResponse(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $email = App\Helpers\Sanitize::email($input['email']);
        $password = $input['password'];

        $user = Auth::login($email, $password);

        if (!$user) {
            authJsonResponse(['success' => false, 'error' => 'Invalid email or password.'], 401);
        }

        authJsonResponse(['success' => true, 'user' => $user]);
        break;

    case '/register':
        if ($method !== 'POST') {
            authJsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
        }

        RateLimitMiddleware::enforce('register', 3, 900);

        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

        $validator = Validator::validate($input, [
            'name'             => ['required', ['min', 2], ['max', 100], 'alpha'],
            'email'            => ['required', 'email', ['max', 255]],
            'password'         => ['required', ['min', 8], ['max', 128]],
            'password_confirm' => ['required', ['matches', 'password']],
        ]);

        if ($validator->fails()) {
            authJsonResponse(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $name = App\Helpers\Sanitize::string($input['name'], 100);
        $email = App\Helpers\Sanitize::email($input['email']);
        $password = $input['password'];

        $user = Auth::register($name, $email, $password);

        if (!$user) {
            authJsonResponse(['success' => false, 'error' => 'An account with this email already exists.'], 409);
        }

        Auth::login($email, $password);
        authJsonResponse(['success' => true, 'user' => $user], 201);
        break;

    case '/logout':
        if ($method !== 'POST') {
            authJsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
        }

        Csrf::verify();
        Auth::logout();
        authJsonResponse(['success' => true, 'message' => 'Logged out successfully.']);
        break;

    case '/session':
        $user = Auth::getCurrentUser();
        if ($user) {
            authJsonResponse(['success' => true, 'user' => $user]);
        } else {
            authJsonResponse(['success' => false, 'user' => null]);
        }
        break;

    default:
        authJsonResponse(['success' => false, 'error' => 'Auth endpoint not found'], 404);
        break;
}
