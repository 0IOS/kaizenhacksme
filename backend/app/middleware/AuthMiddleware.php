<?php

declare(strict_types=1);

namespace App\Middleware;

class AuthMiddleware
{
    public static function requireAuth(): array
    {
        \App\Config\Session::init();

        $userId = \App\Config\Session::get('user_id');

        if (!$userId) {
            if (self::isApiRequest()) {
                http_response_code(401);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['success' => false, 'error' => 'Authentication required']);
                exit;
            }

            \App\Helpers\Session::flash('error', 'Please log in to continue.');
            $returnUrl = urlencode($_SERVER['REQUEST_URI'] ?? '/');
            header('Location: /login.php?return=' . $returnUrl);
            exit;
        }

        $db = \App\Config\Database::getConnection();
        $stmt = $db->prepare('SELECT id, name, email, role FROM users WHERE id = ?');
        $stmt->execute([$userId]);
        $user = $stmt->fetch();

        if (!$user) {
            \App\Config\Session::destroy();
            if (self::isApiRequest()) {
                http_response_code(401);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['success' => false, 'error' => 'Invalid session']);
                exit;
            }
            header('Location: /login.php');
            exit;
        }

        return $user;
    }

    public static function requireRole(string ...$roles): array
    {
        $user = self::requireAuth();

        if (!in_array($user['role'], $roles, true)) {
            if (self::isApiRequest()) {
                http_response_code(403);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['success' => false, 'error' => 'Insufficient permissions']);
                exit;
            }
            ErrorHandler::renderForbidden();
        }

        return $user;
    }

    public static function optionalAuth(): ?array
    {
        \App\Config\Session::init();

        $userId = \App\Config\Session::get('user_id');

        if (!$userId) {
            return null;
        }

        $db = \App\Config\Database::getConnection();
        $stmt = $db->prepare('SELECT id, name, email, role FROM users WHERE id = ?');
        $stmt->execute([$userId]);
        $user = $stmt->fetch();

        return $user ?: null;
    }

    public static function isLoggedIn(): bool
    {
        \App\Config\Session::init();
        return (bool) \App\Config\Session::get('user_id');
    }

    private static function isApiRequest(): bool
    {
        $uri = $_SERVER['REQUEST_URI'] ?? '';
        $accept = $_SERVER['HTTP_ACCEPT'] ?? '';

        return str_starts_with($uri, '/api/')
            || str_contains($accept, 'application/json')
            || ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'XMLHttpRequest';
    }
}
