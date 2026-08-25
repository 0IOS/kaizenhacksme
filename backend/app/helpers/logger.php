<?php

declare(strict_types=1);

namespace App\Helpers;

class Logger
{
    private static string $logDir = '';

    private static function getLogDir(): string
    {
        if (self::$logDir === '') {
            self::$logDir = dirname(__DIR__, 2) . '/storage/logs';
        }
        return self::$logDir;
    }

    public static function info(string $message, array $context = []): void
    {
        self::log('info', $message, $context);
    }

    public static function warning(string $message, array $context = []): void
    {
        self::log('warning', $message, $context);
    }

    public static function error(string $message, array $context = []): void
    {
        self::log('error', $message, $context);
    }

    public static function critical(string $message, array $context = []): void
    {
        self::log('critical', $message, $context);
    }

    private static function log(string $level, string $message, array $context = []): void
    {
        $sanitizedContext = self::sanitizeContext($context);

        $entry = [
            'timestamp' => date('Y-m-d H:i:s'),
            'level'     => $level,
            'message'   => $message,
            'context'   => $sanitizedContext,
            'ip'        => self::getClientIp(),
        ];

        $line = json_encode($entry, JSON_UNESCAPED_UNICODE) . PHP_EOL;

        $logFile = self::getLogDir() . '/app_' . date('Y-m-d') . '.log';

        try {
            file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
        } catch (\Throwable $e) {
            error_log("Logger write failed: {$e->getMessage()}");
        }

        if ($level === 'critical' || $level === 'error') {
            $errorLog = self::getLogDir() . '/php_error.log';
            file_put_contents($errorLog, $line, FILE_APPEND | LOCK_EX);
        }
    }

    private static function sanitizeContext(array $context): array
    {
        $sensitiveKeys = [
            'password', 'password_hash', 'token', 'secret',
            'api_key', 'apikey', 'session_id', 'cookie',
            'authorization', 'auth', 'credential',
        ];

        $sanitized = [];

        foreach ($context as $key => $value) {
            $lowerKey = strtolower($key);
            $isSensitive = false;

            foreach ($sensitiveKeys as $sensitiveKey) {
                if (str_contains($lowerKey, $sensitiveKey)) {
                    $isSensitive = true;
                    break;
                }
            }

            if ($isSensitive) {
                $sanitized[$key] = '[REDACTED]';
            } elseif (is_string($value) && strlen($value) > 500) {
                $sanitized[$key] = substr($value, 0, 500) . '...[TRUNCATED]';
            } else {
                $sanitized[$key] = $value;
            }
        }

        return $sanitized;
    }

    private static function getClientIp(): string
    {
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
}
