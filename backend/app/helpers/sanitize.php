<?php

declare(strict_types=1);

namespace App\Helpers;

class Sanitize
{
    public static function string(string $input, int $maxLen = 500): string
    {
        $input = trim($input);
        $input = strip_tags($input);
        $input = htmlspecialchars($input, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        if (strlen($input) > $maxLen) {
            $input = substr($input, 0, $maxLen);
        }
        return $input;
    }

    public static function email(string $input): string
    {
        $input = trim($input);
        $input = strtolower($input);
        $input = filter_var($input, FILTER_SANITIZE_EMAIL);
        return $input;
    }

    public static function int(string $input): int
    {
        return (int) filter_var($input, FILTER_SANITIZE_NUMBER_INT);
    }

    public static function html(string $input): string
    {
        $input = trim($input);
        $input = htmlspecialchars($input, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        return $input;
    }

    public static function raw(string $input): string
    {
        return trim($input);
    }

    public static function json(string $input): mixed
    {
        $decoded = json_decode($input, true);
        return json_last_error() === JSON_ERROR_NONE ? $decoded : null;
    }

    public static function url(string $input): string
    {
        $input = trim($input);
        $input = filter_var($input, FILTER_SANITIZE_URL);
        return $input;
    }
}
