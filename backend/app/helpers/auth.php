<?php

declare(strict_types=1);

namespace App\Helpers;

class Auth
{
    public static function login(string $email, string $password): ?array
    {
        $db = \App\Config\Database::getConnection();

        $stmt = $db->prepare('SELECT id, name, email, password_hash, role FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            \App\Helpers\Logger::info('Failed login attempt', [
                'email' => $email,
                'ip'    => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            ]);
            return null;
        }

        \App\Config\Session::init();
        \App\Config\Session::regenerate();
        \App\Config\Session::set('user_id', $user['id']);
        \App\Config\Session::set('user_role', $user['role']);
        \App\Config\Session::set('user_name', $user['name']);

        \App\Helpers\Logger::info('User logged in', [
            'user_id' => $user['id'],
            'email'   => $user['email'],
        ]);

        return [
            'id'    => $user['id'],
            'name'  => $user['name'],
            'email' => $user['email'],
            'role'  => $user['role'],
        ];
    }

    public static function logout(): void
    {
        $userId = \App\Config\Session::get('user_id');

        \App\Helpers\Logger::info('User logged out', [
            'user_id' => $userId,
        ]);

        \App\Config\Session::destroy();
    }

    public static function register(string $name, string $email, string $password): ?array
    {
        if (strlen($password) < 8) {
            return null;
        }

        if (strlen($password) > 128) {
            return null;
        }

        $db = \App\Config\Database::getConnection();

        $stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$email]);

        if ($stmt->fetch()) {
            return null;
        }

        $passwordHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

        $stmt = $db->prepare(
            'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)'
        );
        $stmt->execute([$name, $email, $passwordHash, 'participant']);

        $userId = (int) $db->lastInsertId();

        \App\Helpers\Logger::info('User registered', [
            'user_id' => $userId,
            'email'   => $email,
        ]);

        return [
            'id'    => $userId,
            'name'  => $name,
            'email' => $email,
            'role'  => 'participant',
        ];
    }

    public static function getCurrentUser(): ?array
    {
        \App\Config\Session::init();

        $userId = \App\Config\Session::get('user_id');

        if (!$userId) {
            return null;
        }

        $db = \App\Config\Database::getConnection();
        $stmt = $db->prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?');
        $stmt->execute([$userId]);
        $user = $stmt->fetch();

        return $user ?: null;
    }

    public static function isLoggedIn(): bool
    {
        \App\Config\Session::init();
        return (bool) \App\Config\Session::get('user_id');
    }

    public static function hasRole(string ...$roles): bool
    {
        $role = \App\Config\Session::get('user_role');
        return $role && in_array($role, $roles, true);
    }
}
