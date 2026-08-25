<?php

declare(strict_types=1);

namespace App\Helpers;

class Csrf
{
    private const TOKEN_NAME = '_csrf_token';
    private const TOKEN_LENGTH = 32;

    public static function generate(): string
    {
        $token = bin2hex(random_bytes(self::TOKEN_LENGTH));
        \App\Config\Session::set(self::TOKEN_NAME, $token);
        return $token;
    }

    public static function token(): string
    {
        $token = \App\Config\Session::get(self::TOKEN_NAME);

        if (!$token) {
            $token = self::generate();
        }

        return $token;
    }

    public static function field(): string
    {
        $token = self::token();
        return '<input type="hidden" name="_csrf_token" value="' . htmlspecialchars($token, ENT_QUOTES, 'UTF-8') . '">';
    }

    public static function meta(): string
    {
        $token = self::token();
        return '<meta name="csrf-token" content="' . htmlspecialchars($token, ENT_QUOTES, 'UTF-8') . '">';
    }

    public static function validate(?string $token = null): bool
    {
        if ($token === null) {
            $token = $_POST[self::TOKEN_NAME] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null;

            if (!$token) {
                $input = json_decode(file_get_contents('php://input') ?: '', true);
                if (is_array($input) && isset($input[self::TOKEN_NAME])) {
                    $token = $input[self::TOKEN_NAME];
                }
            }
        }

        if (!$token) {
            return false;
        }

        $stored = \App\Config\Session::get(self::TOKEN_NAME);

        if (!$stored) {
            return false;
        }

        return hash_equals($stored, $token);
    }

    public static function verify(): void
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

        if (!in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
            return;
        }

        if (!self::validate()) {
            \App\Helpers\Logger::warning('CSRF token validation failed', [
                'uri'    => $_SERVER['REQUEST_URI'] ?? '',
                'method' => $method,
            ]);

            if (self::isApiRequest()) {
                http_response_code(403);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['success' => false, 'error' => 'Invalid security token. Please refresh and try again.']);
                exit;
            }

            http_response_code(403);
            \App\Config\Session::flash('error', 'Invalid security token. Please try again.');
            header('Location: ' . ($_SERVER['HTTP_REFERER'] ?? '/'));
            exit;
        }
    }

    private static function isApiRequest(): bool
    {
        $uri = $_SERVER['REQUEST_URI'] ?? '';
        $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
        return str_starts_with($uri, '/api/') || str_contains($accept, 'application/json');
    }
}
