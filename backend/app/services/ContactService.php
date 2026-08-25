<?php

declare(strict_types=1);

namespace App\Services;

use App\Config\Database;
use App\Helpers\Logger;

class ContactService
{
    private \PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function submit(array $data): array
    {
        try {
            $stmt = $this->db->prepare(
                'INSERT INTO contact_messages (name, email, subject, message, ip_address) VALUES (?, ?, ?, ?, ?)'
            );

            $stmt->execute([
                $data['name'],
                $data['email'],
                $data['subject'] ?? null,
                $data['message'],
                $_SERVER['REMOTE_ADDR'] ?? null,
            ]);

            Logger::info('Contact message submitted', [
                'name'  => $data['name'],
                'email' => $data['email'],
            ]);

            return ['success' => true, 'message' => 'Message sent successfully.'];
        } catch (\PDOException $e) {
            Logger::error('Failed to submit contact message', ['error' => $e->getMessage()]);
            return ['success' => false, 'message' => 'Failed to send message. Please try again.'];
        }
    }

    public function getAll(int $limit = 50, int $offset = 0): array
    {
        try {
            $stmt = $this->db->prepare(
                'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT ? OFFSET ?'
            );
            $stmt->execute([$limit, $offset]);
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch contact messages', ['error' => $e->getMessage()]);
            return [];
        }
    }

    public function updateStatus(int $id, string $status): bool
    {
        try {
            $stmt = $this->db->prepare('UPDATE contact_messages SET status = ? WHERE id = ?');
            $stmt->execute([$status, $id]);
            return $stmt->rowCount() > 0;
        } catch (\PDOException $e) {
            Logger::error('Failed to update contact message status', ['id' => $id, 'error' => $e->getMessage()]);
            return false;
        }
    }

    public function getStats(): array
    {
        try {
            $stmt = $this->db->query(
                "SELECT status, COUNT(*) as count FROM contact_messages GROUP BY status"
            );
            $rows = $stmt->fetchAll();
            $stats = ['total' => 0, 'new' => 0, 'read' => 0, 'replied' => 0, 'archived' => 0];
            foreach ($rows as $row) {
                $stats[$row['status']] = (int) $row['count'];
                $stats['total'] += (int) $row['count'];
            }
            return $stats;
        } catch (\PDOException $e) {
            return ['total' => 0, 'new' => 0, 'read' => 0, 'replied' => 0, 'archived' => 0];
        }
    }
}
