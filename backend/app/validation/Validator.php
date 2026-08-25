<?php

declare(strict_types=1);

namespace App\Validation;

class Validator
{
    private array $errors = [];
    private array $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function required(string $field, ?string $label = null): self
    {
        $label = $label ?? ucfirst(str_replace('_', ' ', $field));
        if (!isset($this->data[$field]) || trim((string) $this->data[$field]) === '') {
            $this->errors[$field] = "{$label} is required.";
        }
        return $this;
    }

    public function email(string $field, ?string $label = null): self
    {
        $label = $label ?? ucfirst(str_replace('_', ' ', $field));
        if (!empty($this->data[$field]) && !filter_var($this->data[$field], FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field] = "{$label} must be a valid email address.";
        }
        return $this;
    }

    public function minLength(string $field, int $min, ?string $label = null): self
    {
        $label = $label ?? ucfirst(str_replace('_', ' ', $field));
        if (!empty($this->data[$field]) && strlen((string) $this->data[$field]) < $min) {
            $this->errors[$field] = "{$label} must be at least {$min} characters.";
        }
        return $this;
    }

    public function maxLength(string $field, int $max, ?string $label = null): self
    {
        $label = $label ?? ucfirst(str_replace('_', ' ', $field));
        if (!empty($this->data[$field]) && strlen((string) $this->data[$field]) > $max) {
            $this->errors[$field] = "{$label} must not exceed {$max} characters.";
        }
        return $this;
    }

    public function maxLengthBytes(string $field, int $max, ?string $label = null): self
    {
        $label = $label ?? ucfirst(str_replace('_', ' ', $field));
        if (!empty($this->data[$field]) && strlen((string) $this->data[$field]) > $max) {
            $this->errors[$field] = "{$label} is too long.";
        }
        return $this;
    }

    public function matches(string $field, string $otherField, ?string $label = null, ?string $otherLabel = null): self
    {
        $label = $label ?? ucfirst(str_replace('_', ' ', $field));
        $otherLabel = $otherLabel ?? ucfirst(str_replace('_', ' ', $otherField));
        if (($this->data[$field] ?? null) !== ($this->data[$otherField] ?? null)) {
            $this->errors[$field] = "{$label} must match {$otherLabel}.";
        }
        return $this;
    }

    public function in(string $field, array $allowed, ?string $label = null): self
    {
        $label = $label ?? ucfirst(str_replace('_', ' ', $field));
        if (!empty($this->data[$field]) && !in_array($this->data[$field], $allowed, true)) {
            $this->errors[$field] = "{$label} must be one of: " . implode(', ', $allowed) . ".";
        }
        return $this;
    }

    public function integer(string $field, ?string $label = null): self
    {
        $label = $label ?? ucfirst(str_replace('_', ' ', $field));
        if (!empty($this->data[$field]) && !ctype_digit((string) $this->data[$field])) {
            $this->errors[$field] = "{$label} must be a valid integer.";
        }
        return $this;
    }

    public function alpha(string $field, ?string $label = null): self
    {
        $label = $label ?? ucfirst(str_replace('_', ' ', $field));
        if (!empty($this->data[$field]) && !preg_match('/^[a-zA-Z\s]+$/', (string) $this->data[$field])) {
            $this->errors[$field] = "{$label} must contain only letters and spaces.";
        }
        return $this;
    }

    public function url(string $field, ?string $label = null): self
    {
        $label = $label ?? ucfirst(str_replace('_', ' ', $field));
        if (!empty($this->data[$field]) && !filter_var($this->data[$field], FILTER_VALIDATE_URL)) {
            $this->errors[$field] = "{$label} must be a valid URL.";
        }
        return $this;
    }

    public function fails(): bool
    {
        return !empty($this->errors);
    }

    public function errors(): array
    {
        return $this->errors;
    }

    public function firstError(): ?string
    {
        return !empty($this->errors) ? reset($this->errors) : null;
    }

    public static function validate(array $data, array $rules): self
    {
        $validator = new self($data);

        foreach ($rules as $field => $fieldRules) {
            foreach ($fieldRules as $rule) {
                if (is_string($rule)) {
                    match ($rule) {
                        'required' => $validator->required($field),
                        'email'    => $validator->email($field),
                        'alpha'    => $validator->alpha($field),
                        default    => null,
                    };
                } elseif (is_array($rule)) {
                    $ruleName = $rule[0] ?? '';
                    $ruleParam = $rule[1] ?? null;
                    $ruleParam2 = $rule[2] ?? null;

                    match ($ruleName) {
                        'required'  => $validator->required($field),
                        'email'     => $validator->email($field),
                        'min'       => $validator->minLength($field, (int) $ruleParam),
                        'max'       => $validator->maxLength($field, (int) $ruleParam),
                        'matches'   => $validator->matches($field, $ruleParam),
                        'in'        => $validator->in($field, $ruleParam),
                        'integer'   => $validator->integer($field),
                        'alpha'     => $validator->alpha($field),
                        'url'       => $validator->url($field),
                        default     => null,
                    };
                }
            }
        }

        return $validator;
    }
}
