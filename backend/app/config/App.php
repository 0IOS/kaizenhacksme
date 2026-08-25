<?php

declare(strict_types=1);

namespace App\Config;

class App
{
    public static function init(): void
    {
        $envFile = dirname(__DIR__, 2) . '/config.env';

        if (file_exists($envFile)) {
            self::loadEnv($envFile);
        }

        $env = getenv('APP_ENV') ?: 'production';
        $debug = filter_var(getenv('APP_DEBUG'), FILTER_VALIDATE_BOOLEAN);

        if ($env === 'production') {
            error_reporting(0);
            ini_set('display_errors', '0');
            ini_set('display_startup_errors', '0');
            ini_set('log_errors', '1');
            ini_set('error_log', dirname(__DIR__, 2) . '/storage/logs/php_error.log');
        } else {
            error_reporting(E_ALL);
            ini_set('display_errors', '1');
        }

        date_default_timezone_set('Asia/Kolkata');
    }

    private static function loadEnv(string $path): void
    {
        if (!is_readable($path)) {
            return;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($lines as $line) {
            $line = trim($line);

            if ($line === '' || $line[0] === '#') {
                continue;
            }

            $pos = strpos($line, '=');

            if ($pos === false) {
                continue;
            }

            $key = trim(substr($line, 0, $pos));
            $value = trim(substr($line, $pos + 1));

            if (strlen($value) >= 2 && $value[0] === '"' && $value[strlen($value) - 1] === '"') {
                $value = substr($value, 1, -1);
            }

            if (strlen($value) >= 2 && $value[0] === "'" && $value[strlen($value) - 1] === "'") {
                $value = substr($value, 1, -1);
            }

            if (!array_key_exists($key, $_ENV)) {
                putenv("{$key}={$value}");
            }
        }
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        $value = getenv($key);
        if ($value === false) {
            return $default;
        }

        if (filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) !== null) {
            return filter_var($value, FILTER_VALIDATE_BOOLEAN);
        }

        if (is_numeric($value)) {
            return $value + 0;
        }

        return $value;
    }

    public static function isProduction(): bool
    {
        return (self::get('APP_ENV', 'production')) === 'production';
    }

    public static function isDebug(): bool
    {
        return (bool) self::get('APP_DEBUG', false);
    }
}
