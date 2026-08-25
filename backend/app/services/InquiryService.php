<?php

declare(strict_types=1);

namespace App\Services;

use App\Config\Database;
use App\Helpers\Logger;

class InquiryService
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
                'INSERT INTO inquiries (company, contact_name, email, tier, offering, ip_address) VALUES (?, ?, ?, ?, ?, ?)'
            );

            $stmt->execute([
                $data['company'],
                $data['contact_name'] ?? null,
                $data['email'],
                $data['tier'] ?? 'PLATINUM (BOUNTY + MENTORSHIP)',
                $data['offering'] ?? null,
                $_SERVER['REMOTE_ADDR'] ?? null,
            ]);

            Logger::info('Partner inquiry submitted', [
                'company' => $data['company'],
                'email'   => $data['email'],
            ]);

            return ['success' => true, 'message' => 'Inquiry submitted successfully.'];
        } catch (\PDOException $e) {
            Logger::error('Failed to submit inquiry', ['error' => $e->getMessage()]);
            return ['success' => false, 'message' => 'Submission failed. Please try again.'];
        }
    }

    public function getAll(int $limit = 50, int $offset = 0): array
    {
        try {
            $stmt = $this->db->prepare(
                'SELECT * FROM inquiries ORDER BY created_at DESC LIMIT ? OFFSET ?'
            );
            $stmt->execute([$limit, $offset]);
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch inquiries', ['error' => $e->getMessage()]);
            return [];
        }
    }

    public function updateStatus(int $id, string $status): bool
    {
        try {
            $stmt = $this->db->prepare('UPDATE inquiries SET status = ? WHERE id = ?');
            $stmt->execute([$status, $id]);
            return $stmt->rowCount() > 0;
        } catch (\PDOException $e) {
            Logger::error('Failed to update inquiry status', ['id' => $id, 'error' => $e->getMessage()]);
            return false;
        }
    }

    public function getStats(): array
    {
        try {
            $stmt = $this->db->query(
                "SELECT status, COUNT(*) as count FROM inquiries GROUP BY status"
            );
            $rows = $stmt->fetchAll();
            $stats = ['total' => 0, 'new' => 0, 'contacted' => 0, 'converted' => 0, 'archived' => 0];
            foreach ($rows as $row) {
                $stats[$row['status']] = (int) $row['count'];
                $stats['total'] += (int) $row['count'];
            }
            return $stats;
        } catch (\PDOException $e) {
            return ['total' => 0, 'new' => 0, 'contacted' => 0, 'converted' => 0, 'archived' => 0];
        }
    }
}
