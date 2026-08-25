<?php

declare(strict_types=1);

namespace App\Services;

use App\Config\Database;
use App\Helpers\Logger;

class EventService
{
    private \PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function getFeatured(): ?array
    {
        try {
            $stmt = $this->db->query(
                "SELECT * FROM events WHERE status = 'registration_open' ORDER BY created_at DESC LIMIT 1"
            );
            $event = $stmt->fetch();

            if ($event) {
                $event['tags'] = json_decode($event['tags'] ?? '[]', true);
                $event['tracks'] = $this->getTracks((int) $event['id']);
                $event['schedule'] = $this->getSchedule((int) $event['id']);
            }

            return $event ?: null;
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch featured event', ['error' => $e->getMessage()]);
            return null;
        }
    }

    public function getById(int $id): ?array
    {
        try {
            $stmt = $this->db->prepare('SELECT * FROM events WHERE id = ?');
            $stmt->execute([$id]);
            $event = $stmt->fetch();

            if ($event) {
                $event['tags'] = json_decode($event['tags'] ?? '[]', true);
                $event['tracks'] = $this->getTracks((int) $event['id']);
                $event['schedule'] = $this->getSchedule((int) $event['id']);
            }

            return $event ?: null;
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch event', ['event_id' => $id, 'error' => $e->getMessage()]);
            return null;
        }
    }

    public function getBySlug(string $slug): ?array
    {
        try {
            $stmt = $this->db->prepare('SELECT * FROM events WHERE slug = ?');
            $stmt->execute([$slug]);
            $event = $stmt->fetch();

            if ($event) {
                $event['tags'] = json_decode($event['tags'] ?? '[]', true);
                $event['tracks'] = $this->getTracks((int) $event['id']);
                $event['schedule'] = $this->getSchedule((int) $event['id']);
            }

            return $event ?: null;
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch event by slug', ['slug' => $slug, 'error' => $e->getMessage()]);
            return null;
        }
    }

    public function getAll(string $status = '', int $limit = 50, int $offset = 0): array
    {
        try {
            $sql = 'SELECT * FROM events';
            $params = [];

            if ($status) {
                $sql .= ' WHERE status = ?';
                $params[] = $status;
            }

            $sql .= ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            $params[] = $limit;
            $params[] = $offset;

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $events = $stmt->fetchAll();

            foreach ($events as &$event) {
                $event['tags'] = json_decode($event['tags'] ?? '[]', true);
            }

            return $events;
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch events', ['error' => $e->getMessage()]);
            return [];
        }
    }

    public function create(array $data): ?int
    {
        try {
            $stmt = $this->db->prepare(
                'INSERT INTO events (name, code, slug, edition, year, description, date_text, city, venue, maps_url, duration, builder_count, teams_count, prize_pool, status, image_url, tags, registration_url, created_by)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            );

            $stmt->execute([
                $data['name'],
                $data['code'],
                $data['slug'],
                $data['edition'],
                $data['year'],
                $data['description'],
                $data['date_text'] ?? 'COMING SOON',
                $data['city'],
                $data['venue'],
                $data['maps_url'] ?? null,
                $data['duration'] ?? 'ONE DAY',
                $data['builder_count'] ?? '50 SEATS',
                $data['teams_count'] ?? 'TEAMS OF 2-4',
                $data['prize_pool'] ?? 'TO BE REVEALED',
                $data['status'] ?? 'upcoming',
                $data['image_url'] ?? null,
                json_encode($data['tags'] ?? []),
                $data['registration_url'] ?? null,
                $data['created_by'] ?? null,
            ]);

            $eventId = (int) $this->db->lastInsertId();

            if (!empty($data['tracks'])) {
                $this->setTracks($eventId, $data['tracks']);
            }

            if (!empty($data['schedule'])) {
                $this->setSchedule($eventId, $data['schedule']);
            }

            return $eventId;
        } catch (\PDOException $e) {
            Logger::error('Failed to create event', ['error' => $e->getMessage()]);
            return null;
        }
    }

    public function update(int $id, array $data): bool
    {
        try {
            $fields = [];
            $params = [];

            $allowedFields = [
                'name', 'code', 'slug', 'edition', 'year', 'description', 'date_text',
                'city', 'venue', 'maps_url', 'duration', 'builder_count', 'teams_count',
                'prize_pool', 'status', 'image_url', 'registration_url',
            ];

            foreach ($allowedFields as $field) {
                if (array_key_exists($field, $data)) {
                    $fields[] = "{$field} = ?";
                    $params[] = $data[$field];
                }
            }

            if (array_key_exists('tags', $data)) {
                $fields[] = 'tags = ?';
                $params[] = is_array($data['tags']) ? json_encode($data['tags']) : $data['tags'];
            }

            if (empty($fields)) {
                return false;
            }

            $params[] = $id;
            $sql = 'UPDATE events SET ' . implode(', ', $fields) . ' WHERE id = ?';

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);

            return $stmt->rowCount() > 0;
        } catch (\PDOException $e) {
            Logger::error('Failed to update event', ['event_id' => $id, 'error' => $e->getMessage()]);
            return false;
        }
    }

    public function delete(int $id): bool
    {
        try {
            $stmt = $this->db->prepare('DELETE FROM events WHERE id = ?');
            $stmt->execute([$id]);
            return $stmt->rowCount() > 0;
        } catch (\PDOException $e) {
            Logger::error('Failed to delete event', ['event_id' => $id, 'error' => $e->getMessage()]);
            return false;
        }
    }

    public function getTracks(int $eventId): array
    {
        try {
            $stmt = $this->db->prepare(
                'SELECT name FROM event_tracks WHERE event_id = ? ORDER BY sort_order'
            );
            $stmt->execute([$eventId]);
            return array_column($stmt->fetchAll(), 'name');
        } catch (\PDOException $e) {
            return [];
        }
    }

    public function getSchedule(int $eventId): array
    {
        try {
            $stmt = $this->db->prepare(
                'SELECT time_text as time, title, description as `desc` FROM event_schedule WHERE event_id = ? ORDER BY sort_order'
            );
            $stmt->execute([$eventId]);
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            return [];
        }
    }

    private function setTracks(int $eventId, array $tracks): void
    {
        $stmt = $this->db->prepare('DELETE FROM event_tracks WHERE event_id = ?');
        $stmt->execute([$eventId]);

        $stmt = $this->db->prepare(
            'INSERT INTO event_tracks (event_id, name, sort_order) VALUES (?, ?, ?)'
        );

        foreach ($tracks as $index => $track) {
            $name = is_array($track) ? ($track['name'] ?? '') : $track;
            $stmt->execute([$eventId, $name, $index + 1]);
        }
    }

    private function setSchedule(int $eventId, array $items): void
    {
        $stmt = $this->db->prepare('DELETE FROM event_schedule WHERE event_id = ?');
        $stmt->execute([$eventId]);

        $stmt = $this->db->prepare(
            'INSERT INTO event_schedule (event_id, time_text, title, description, sort_order) VALUES (?, ?, ?, ?, ?)'
        );

        foreach ($items as $index => $item) {
            $stmt->execute([
                $eventId,
                $item['time'] ?? $item['time_text'] ?? 'TBA',
                $item['title'] ?? '',
                $item['desc'] ?? $item['description'] ?? null,
                $index + 1,
            ]);
        }
    }

    public function getOrganizers(): array
    {
        try {
            $stmt = $this->db->query(
                'SELECT * FROM organizers WHERE is_active = 1 ORDER BY sort_order'
            );
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch organizers', ['error' => $e->getMessage()]);
            return [];
        }
    }

    public function getPartners(): array
    {
        try {
            $stmt = $this->db->query(
                'SELECT * FROM partners WHERE is_active = 1 ORDER BY sort_order'
            );
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            Logger::error('Failed to fetch partners', ['error' => $e->getMessage()]);
            return [];
        }
    }
}
