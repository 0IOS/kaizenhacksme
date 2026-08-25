# KaizenHacks

A student-led innovation organization building hackathons, communities, and opportunities for student builders.

## Repository Structure

```
├── frontend/          # Original React 19 + TypeScript + Vite SPA (preserved)
└── backend/           # PHP + MySQL backend (Hostinger-compatible)
    ├── public/        # Document root
    ├── app/           # Application logic (config, middleware, services, helpers)
    ├── includes/      # PHP includes (header, navbar, footer, modals)
    ├── database/      # MySQL schema
    └── storage/       # Logs, uploads
```

## Frontend (React)

The `frontend/` directory contains the original React SPA built with Vite + Tailwind CSS v4. This is preserved for reference but the production site runs from `backend/`.

## Backend (PHP)

The `backend/` directory is a complete PHP + MySQL rewrite designed for **Hostinger PHP hosting**. See `backend/README.md` for full deployment instructions.

**Stack:** PHP 8.2+, MySQL/MariaDB, PDO, Vanilla JS, Tailwind CSS CDN

**Key Features:**
- Server-rendered pages matching the original React UI
- Secure authentication (bcrypt, session management, CSRF protection)
- Role-based authorization (participant, organizer, admin)
- Rate limiting on sensitive endpoints
- Prepared statements for all database queries
- Centralized error handling (no stack traces in production)
- Security headers (CSP, HSTS, X-Frame-Options)
- Admin panel for event/user/inquiry management
