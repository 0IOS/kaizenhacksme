<?php

declare(strict_types=1);

namespace App\Services;

use App\Config\Database;
use App\Helpers\Logger;

class RegistrationService
{
    private \PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function register(int $userId, int $eventId): array
    {
        try {
            $stmt = $this->db->prepare(
                'SELECT id, status FROM registrations WHERE user_id = ? AND event_id = ?'
            );
            $stmt->execute([$userId, $eventId]);
            $existing = $stmt->fetch();

            if ($existing) {
                if ($existing['status'] === 'cancelled') {
                    $stmt = $this->db->prepare(
                        'UPDATE registrations SET status = ? WHERE id = ?'
                    );
                    $stmt->execute(['pending', $existing['id']]);
                    return ['success' => true, 'message' => 'Registration reactivated.'];
                }
                return ['success' => false, 'message' => 'You are already registered for this event.'];
            }

            $stmt = $this->db->prepare(
                'SELECT id, builder_count FROM events WHERE id = ? AND status = ?'
            );
            $stmt->execute([$eventId, 'registration_open']);
            $event = $stmt->fetch();

            if (!$event) {
                return ['success' => false, 'message' => 'Registration is not open for this event.'];
            }

            $stmt = $this->db->prepare(
                'SELECT COUNT(*) as count FROM registrations WHERE event_id = ? AND status IN (?, ?)'
            );
            $stmt->execute([$eventId, 'pending', 'confirmed']);
            $count = (int) $stmt->fetch()['count'];

            $capacity = (int) filter_var($event['builder_count'], FILTER_SANITIZE_NUMBER_INT);
            if ($capacity > 0 && $count >= $capacity) {
                $stmt = $this->db->prepare(
                    'INSERT INTO registrations (user_id, event_id, status) VALUES (?, ?, ?)'
                );
                $stmt->execute([$userId, $eventId, 'waitlisted']);
                return ['success' => true, 'message' => 'Event is full. You have been added to the waitlist.'];
            }

            $stmt = $this->db->prepare(
                'INSERT INTO registrations (user_id, event_id, status) VALUES (?, ?, ?)'
            );
            $stmt->execute([$userId, $eventId, 'pending']);

            Logger::info('User registered for event', [
                'user_id'  => $userId,
                'event_id' => $eventId,
            ]);

            return ['success' => true, 'message' => 'Registration submitted successfully.'];
        } catch (\PDOException $e) {
            Logger::error('Registration failed', [
                'user_id'  => $userId,
                'event_id' => $eventId,
                'error'    => $e->getMessage(),
            ]);
            return ['success' => false, 'message' => 'Registration failed. Please try again.'];
        }
    }

    public function cancel(int $userId, int $eventId): array
    {
        try {
            $stmt = $this->db->prepare(
                'SELECT id, status FROM registrations WHERE user_id = ? AND event_id = ? AND status != ?'
            );
            $stmt->execute([$userId, $eventId, 'cancelled']);
            $registration = $stmt->fetch();

            if (!$registration) {
                return ['success' => false, 'message' => 'No active registration found.'];
            }

            $stmt = $this->db->prepare(
                'UPDATE registrations SET status = ? WHERE id = ?'
            );
            $stmt->execute(['cancelled', $registration['id']]);

            return ['success' => true, 'message' => 'Registration cancelled.'];
        } catch (\PDOException $e) {
            Logger::error('Cancellation failed', [
                'user_id'  => $userId,
                'event_id' => $eventId,
                'error'    => $e->getMessage(),
            ]);
            return ['success' => false, 'message' => 'Cancellation failed. Please try again.'];
        }
    }

    public function getUserRegistrations(int $userId): array
    {
        try {
            $stmt = $this->db->prepare(
                'SELECT r.*, e.name as event_name, e.slug as event_slug, e.date_text, e.city, e.image_url
                 FROM registrations r
                 JOIN events e ON r.event_id = e.id
                 WHERE r.user_id = ?
                 ORDER BY r.created_at DESC'
            );
            $stmt->execute([$userId]);
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch user registrations', ['user_id' => $userId, 'error' => $e->getMessage()]);
            return [];
        }
    }

    public function getEventRegistrations(int $eventId): array
    {
        try {
            $stmt = $this->db->prepare(
                'SELECT r.*, u.name as user_name, u.email as user_email
                 FROM registrations r
                 JOIN users u ON r.user_id = u.id
                 WHERE r.event_id = ?
                 ORDER BY r.created_at'
            );
            $stmt->execute([$eventId]);
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch event registrations', ['event_id' => $eventId, 'error' => $e->getMessage()]);
            return [];
        }
    }

    public function getStats(): array
    {
        try {
            $stmt = $this->db->query(
                "SELECT status, COUNT(*) as count FROM registrations GROUP BY status"
            );
            $rows = $stmt->fetchAll();
            $stats = ['total' => 0, 'pending' => 0, 'confirmed' => 0, 'cancelled' => 0, 'waitlisted' => 0];
            foreach ($rows as $row) {
                $stats[$row['status']] = (int) $row['count'];
                $stats['total'] += (int) $row['count'];
            }
            return $stats;
        } catch (\PDOException $e) {
            return ['total' => 0, 'pending' => 0, 'confirmed' => 0, 'cancelled' => 0, 'waitlisted' => 0];
        }
    }
}
