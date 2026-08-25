<?php

declare(strict_types=1);

namespace App\Config;

class Database
{
    private static ?\PDO $pdo = null;

    public static function getConnection(): \PDO
    {
        if (self::$pdo !== null) {
            return self::$pdo;
        }

        $host = getenv('DB_HOST') ?: '';
        $name = getenv('DB_NAME') ?: '';
        $user = getenv('DB_USER') ?: '';
        $pass = getenv('DB_PASS') ?: '';

        if ($host === '' || $name === '' || $user === '') {
            throw new \RuntimeException('Database configuration is missing. Set DB_HOST, DB_NAME, DB_USER in config.env');
        }

        $allowedCharsets = ['utf8mb4', 'utf8', 'latin1'];
        $charset = getenv('DB_CHARSET') ?: 'utf8mb4';
        if (!in_array($charset, $allowedCharsets, true)) {
            $charset = 'utf8mb4';
        }

        $dsn = "mysql:host={$host};dbname={$name};charset={$charset}";

        $options = [
            \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES   => false,
            \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$charset} COLLATE utf8mb4_unicode_ci",
        ];

        try {
            self::$pdo = new \PDO($dsn, $user, $pass, $options);
        } catch (\PDOException $e) {
            \App\Helpers\Logger::critical('Database connection failed', [
                'host'     => $host,
                'database' => $name,
                'error'    => 'PDOException (details omitted for security)',
            ]);
            throw new \RuntimeException('Database connection failed');
        }

        return self::$pdo;
    }

    public static function disconnect(): void
    {
        self::$pdo = null;
    }
}
