-- KaizenHacks Database Schema
-- MySQL/MariaDB 10.5+ / MySQL 8.0+

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('participant', 'organizer', 'admin') NOT NULL DEFAULT 'participant',
    `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_users_email` (`email`),
    INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Events table
CREATE TABLE IF NOT EXISTS `events` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(200) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `edition` VARCHAR(50) NOT NULL,
    `year` VARCHAR(10) NOT NULL,
    `description` TEXT NOT NULL,
    `date_text` VARCHAR(100) NOT NULL DEFAULT 'COMING SOON',
    `city` VARCHAR(100) NOT NULL,
    `venue` VARCHAR(200) NOT NULL,
    `maps_url` VARCHAR(500) DEFAULT NULL,
    `duration` VARCHAR(50) NOT NULL DEFAULT 'ONE DAY',
    `builder_count` VARCHAR(50) NOT NULL DEFAULT '50 SEATS',
    `teams_count` VARCHAR(50) NOT NULL DEFAULT 'TEAMS OF 2-4',
    `prize_pool` VARCHAR(200) NOT NULL DEFAULT 'TO BE REVEALED',
    `status` ENUM('upcoming', 'registration_open', 'completed', 'archived') NOT NULL DEFAULT 'upcoming',
    `image_url` VARCHAR(500) DEFAULT NULL,
    `tags` JSON DEFAULT NULL,
    `registration_url` VARCHAR(500) DEFAULT NULL,
    `created_by` INT UNSIGNED DEFAULT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_events_code` (`code`),
    UNIQUE KEY `uk_events_slug` (`slug`),
    INDEX `idx_events_status` (`status`),
    INDEX `idx_events_year` (`year`),
    CONSTRAINT `fk_events_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Event tracks
CREATE TABLE IF NOT EXISTS `event_tracks` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `event_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    CONSTRAINT `fk_tracks_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Event schedule
CREATE TABLE IF NOT EXISTS `event_schedule` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `event_id` INT UNSIGNED NOT NULL,
    `time_text` VARCHAR(50) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    CONSTRAINT `fk_schedule_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Registrations (user registrations for events)
CREATE TABLE IF NOT EXISTS `registrations` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `event_id` INT UNSIGNED NOT NULL,
    `status` ENUM('pending', 'confirmed', 'cancelled', 'waitlisted') NOT NULL DEFAULT 'pending',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_registrations_user_event` (`user_id`, `event_id`),
    INDEX `idx_registrations_event` (`event_id`),
    INDEX `idx_registrations_status` (`status`),
    CONSTRAINT `fk_registrations_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_registrations_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Partners
CREATE TABLE IF NOT EXISTS `partners` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(200) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `tier` ENUM('titanium', 'platinum', 'gold', 'ecosystem') NOT NULL DEFAULT 'ecosystem',
    `logo_text` VARCHAR(200) DEFAULT NULL,
    `website` VARCHAR(500) DEFAULT NULL,
    `description` TEXT DEFAULT NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_partners_tier` (`tier`),
    INDEX `idx_partners_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Organizers/team members
CREATE TABLE IF NOT EXISTS `organizers` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `role` VARCHAR(100) NOT NULL,
    `division` VARCHAR(100) NOT NULL,
    `tagline` TEXT DEFAULT NULL,
    `image_url` VARCHAR(500) DEFAULT NULL,
    `github_url` VARCHAR(500) DEFAULT NULL,
    `twitter_url` VARCHAR(500) DEFAULT NULL,
    `linkedin_url` VARCHAR(500) DEFAULT NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_organizers_slug` (`slug`),
    INDEX `idx_organizers_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Partner inquiries
CREATE TABLE IF NOT EXISTS `inquiries` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `company` VARCHAR(200) NOT NULL,
    `contact_name` VARCHAR(200) DEFAULT NULL,
    `email` VARCHAR(255) NOT NULL,
    `tier` VARCHAR(100) NOT NULL,
    `offering` TEXT DEFAULT NULL,
    `status` ENUM('new', 'contacted', 'converted', 'archived') NOT NULL DEFAULT 'new',
    `ip_address` VARCHAR(45) DEFAULT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_inquiries_status` (`status`),
    INDEX `idx_inquiries_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact messages
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(200) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(300) DEFAULT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('new', 'read', 'replied', 'archived') NOT NULL DEFAULT 'new',
    `ip_address` VARCHAR(45) DEFAULT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_contact_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Rate limiting
CREATE TABLE IF NOT EXISTS `rate_limits` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `ip_address` VARCHAR(45) NOT NULL,
    `endpoint` VARCHAR(100) NOT NULL,
    `attempts` INT UNSIGNED NOT NULL DEFAULT 1,
    `window_start` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_rate_limits_lookup` (`ip_address`, `endpoint`, `window_start`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Application logs
CREATE TABLE IF NOT EXISTS `app_logs` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `level` ENUM('info', 'warning', 'error', 'critical') NOT NULL,
    `message` TEXT NOT NULL,
    `context` JSON DEFAULT NULL,
    `ip_address` VARCHAR(45) DEFAULT NULL,
    `user_agent` VARCHAR(500) DEFAULT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_logs_level` (`level`),
    INDEX `idx_logs_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- Seed data: Default admin user (password: changeme123 - MUST be changed)
INSERT INTO `users` (`name`, `email`, `password_hash`, `role`) VALUES
('Admin', 'admin@kaizenhacks.tech', '$2y$12$LJ3m4z8Kz8Kz8Kz8Kz8KzOeJKR8Kz8Kz8Kz8Kz8Kz8Kz8Kz8Kz8', 'admin');

-- Seed data: Featured event
INSERT INTO `events` (`name`, `code`, `slug`, `edition`, `year`, `description`, `date_text`, `city`, `venue`, `maps_url`, `duration`, `builder_count`, `teams_count`, `prize_pool`, `status`, `image_url`, `tags`) VALUES
('GREENTECH', 'GT_001', 'greentech-ideathon-2026', 'VOL. 01', '2026', 'An ideathon where builders think of ideas that advance the UN Sustainable Development Goals — then bring them to life as an app, website, or game that tackles real-life problems.', 'COMING SOON', 'NEW DELHI', 'CM SHRI / DBRA SOSE KALKAJI', 'https://www.google.com/maps/search/?api=1&query=DBRA+SOSE+Kalkaji+New+Delhi', 'ONE DAY', '50 SEATS', 'TEAMS OF 2–4', 'TO BE REVEALED', 'registration_open', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop', '["IDEATHON","SDG","APPS","WEBSITES","GAMES"]');

-- Seed event tracks
INSERT INTO `event_tracks` (`event_id`, `name`, `sort_order`) VALUES
(1, 'SDG 03 // GOOD HEALTH & WELL-BEING', 1),
(1, 'SDG 04 // QUALITY EDUCATION', 2),
(1, 'SDG 07 // AFFORDABLE & CLEAN ENERGY', 3),
(1, 'SDG 09 // INDUSTRY, INNOVATION & INFRASTRUCTURE', 4),
(1, 'SDG 11 // SUSTAINABLE CITIES & COMMUNITIES', 5),
(1, 'SDG 13 // CLIMATE ACTION', 6);

-- Seed event schedule
INSERT INTO `event_schedule` (`event_id`, `time_text`, `title`, `description`, `sort_order`) VALUES
(1, 'TBA', 'TIMELINE COMING SOON', 'The full run-of-show will be announced shortly.', 1);

-- Seed partners
INSERT INTO `partners` (`name`, `category`, `tier`, `logo_text`, `website`, `description`, `sort_order`) VALUES
('GOOGLE CLOUD', 'INFRASTRUCTURE', 'titanium', 'Google Cloud', 'https://cloud.google.com', 'Providing scalable GPU clusters & Vertex AI credits to all accepted teams.', 1),
('ANTHROPIC', 'AI RESEARCH', 'titanium', 'Anthropic', 'https://anthropic.com', 'Frontier AI models and API tier access for autonomous agent builders.', 2),
('SUPABASE', 'DATABASE & AUTH', 'platinum', 'Supabase', 'https://supabase.com', 'Instant Postgres, Auth, and Vector databases for rapid production builds.', 3),
('GITHUB', 'DEVELOPER PLATFORM', 'platinum', 'GitHub', 'https://github.com', 'Official code platform, Actions compute, and Copilot licenses.', 4),
('SOLANA', 'DECENTRALIZED', 'gold', 'Solana', 'https://solana.com', 'High throughput Layer 1 infrastructure and $15,000 track grants.', 5),
('VERCEL', 'DEPLOYMENT', 'gold', 'Vercel', 'https://vercel.com', 'Edge runtime deployment networks and zero-configuration hosting.', 6),
('MODAL', 'SERVERLESS AI', 'ecosystem', 'Modal Labs', 'https://modal.com', 'Serverless cloud compute for Python, AI pipelines, and custom containers.', 7),
('RESEND', 'COMMUNICATION', 'ecosystem', 'Resend', 'https://resend.com', 'Modern developer-first transactional messaging APIs.', 8);

-- Seed organizers
INSERT INTO `organizers` (`slug`, `name`, `role`, `division`, `tagline`, `image_url`, `github_url`, `linkedin_url`, `sort_order`) VALUES
('hamza', 'HAMZA KHAN', 'Founder & CEO', 'MAIN LEAD', 'Distributed systems engineer. Built deployment pipelines scaling to millions of hits.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', 'https://github.com/hamzakh9n', 'https://linkedin.com', 1),
('vaun', 'VAUN RAIKWAR', 'Founder & Developer', 'TECH LEAD', 'Obsessed with high-signal digital craft, extreme latency reduction & compiler design.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', 'https://github.com/v4run-codez', 'https://linkedin.com', 2),
('saurabh', 'SAURABH GUPTA', 'Founder & Developer', 'TECH LEAD', 'Connecting high-output hacker communities with global VC funds & deeptech studios.', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop', 'https://github.com/0ios', 'https://linkedin.com', 3),
('anshika', 'AANSHIKA', 'GRAPHIC DESIGNER', 'DESIGN LEAD', 'Creating the visual identity of Kaizenhacksme', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop', 'https://github.com/0ios', 'https://linkedin.com', 4),
('yash', 'YASH PRATAP SINGH', 'Founder & Social Media Manager', 'MARKETING LEAD', 'Runs the floor on event day — registrations, venues, and everything in between.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop', 'https://github.com', 'https://linkedin.com', 5);
