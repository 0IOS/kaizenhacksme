<?php

declare(strict_types=1);

namespace App\Services;

use App\Config\Database;
use App\Helpers\Logger;

class UserService
{
    private \PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function getById(int $id): ?array
    {
        try {
            $stmt = $this->db->prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?');
            $stmt->execute([$id]);
            return $stmt->fetch() ?: null;
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch user', ['user_id' => $id, 'error' => $e->getMessage()]);
            return null;
        }
    }

    public function getAll(int $limit = 50, int $offset = 0): array
    {
        try {
            $stmt = $this->db->prepare(
                'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?'
            );
            $stmt->execute([$limit, $offset]);
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch users', ['error' => $e->getMessage()]);
            return [];
        }
    }

    public function updateRole(int $id, string $role): bool
    {
        try {
            $stmt = $this->db->prepare('UPDATE users SET role = ? WHERE id = ?');
            $stmt->execute([$role, $id]);
            return $stmt->rowCount() > 0;
        } catch (\PDOException $e) {
            Logger::error('Failed to update user role', ['user_id' => $id, 'error' => $e->getMessage()]);
            return false;
        }
    }

    public function delete(int $id): bool
    {
        try {
            $stmt = $this->db->prepare('DELETE FROM users WHERE id = ? AND role != ?');
            $stmt->execute([$id, 'admin']);
            return $stmt->rowCount() > 0;
        } catch (\PDOException $e) {
            Logger::error('Failed to delete user', ['user_id' => $id, 'error' => $e->getMessage()]);
            return false;
        }
    }

    public function getStats(): array
    {
        try {
            $stmt = $this->db->query(
                "SELECT role, COUNT(*) as count FROM users GROUP BY role"
            );
            $rows = $stmt->fetchAll();
            $stats = ['total' => 0, 'participant' => 0, 'organizer' => 0, 'admin' => 0];
            foreach ($rows as $row) {
                $stats[$row['role']] = (int) $row['count'];
                $stats['total'] += (int) $row['count'];
            }
            return $stats;
        } catch (\PDOException $e) {
            return ['total' => 0, 'participant' => 0, 'organizer' => 0, 'admin' => 0];
        }
    }

    public function count(): int
    {
        try {
            $stmt = $this->db->query('SELECT COUNT(*) as count FROM users');
            return (int) $stmt->fetch()['count'];
        } catch (\PDOException $e) {
            return 0;
        }
    }
}
