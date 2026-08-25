<?php

declare(strict_types=1);

namespace App\Middleware;

class RateLimitMiddleware
{
    public static function check(string $endpoint, ?int $maxAttempts = null, ?int $windowSeconds = null): bool
    {
        $maxAttempts = $maxAttempts ?? (int) (getenv('RATE_LIMIT_' . strtoupper($endpoint)) ?: 5);
        $windowSeconds = $windowSeconds ?? (int) (getenv('RATE_LIMIT_WINDOW') ?: 900);

        $ip = self::getClientIp();
        $db = \App\Config\Database::getConnection();

        try {
            $stmt = $db->prepare(
                'DELETE FROM rate_limits WHERE window_start < DATE_SUB(NOW(), INTERVAL ? SECOND)'
            );
            $stmt->execute([$windowSeconds]);

            $stmt = $db->prepare(
                'SELECT id, attempts, window_start FROM rate_limits 
                 WHERE ip_address = ? AND endpoint = ? AND window_start > DATE_SUB(NOW(), INTERVAL ? SECOND)
                 ORDER BY window_start DESC LIMIT 1'
            );
            $stmt->execute([$ip, $endpoint, $windowSeconds]);
            $record = $stmt->fetch();

            if ($record) {
                if ((int) $record['attempts'] >= $maxAttempts) {
                    \App\Helpers\Logger::warning('Rate limit exceeded', [
                        'ip'       => $ip,
                        'endpoint' => $endpoint,
                        'attempts' => $record['attempts'],
                    ]);
                    return false;
                }

                $stmt = $db->prepare(
                    'UPDATE rate_limits SET attempts = attempts + 1 WHERE id = ?'
                );
                $stmt->execute([$record['id']]);
            } else {
                $stmt = $db->prepare(
                    'INSERT INTO rate_limits (ip_address, endpoint, attempts, window_start) VALUES (?, ?, 1, NOW())'
                );
                $stmt->execute([$ip, $endpoint]);
            }

            return true;
        } catch (\PDOException $e) {
            \App\Helpers\Logger::error('Rate limit check failed', [
                'error' => 'PDOException (details omitted)',
            ]);
            return false;
        }
    }

    public static function enforce(string $endpoint, ?int $maxAttempts = null, ?int $windowSeconds = null): void
    {
        if (!self::check($endpoint, $maxAttempts, $windowSeconds)) {
            self::addRetryHeader($endpoint, $windowSeconds);
            ErrorHandler::renderRateLimited();
        }
    }

    public static function addRetryHeader(string $endpoint, ?int $windowSeconds = null): void
    {
        $windowSeconds = $windowSeconds ?? (int) (getenv('RATE_LIMIT_WINDOW') ?: 900);
        header("Retry-After: {$windowSeconds}");
    }

    private static function getClientIp(): string
    {
        $headers = [
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_REAL_IP',
            'HTTP_CF_CONNECTING_IP',
            'REMOTE_ADDR',
        ];

        foreach ($headers as $header) {
            if (!empty($_SERVER[$header])) {
                $ip = explode(',', $_SERVER[$header])[0];
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }

        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }

    public static function getClientIpPublic(): string
    {
        return self::getClientIp();
    }
}
