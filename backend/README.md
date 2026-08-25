# Kaizen Hacks — Backend (PHP)

Production-ready PHP + MySQL backend for the Kaizen Hacks website, designed for **Hostinger PHP hosting**.

## Architecture

```
backend/
├── public/                     # Document root (set in Hostinger)
│   ├── index.php               # Main landing page
│   ├── login.php               # Login page
│   ├── register.php            # Registration page
│   ├── contact.php             # Contact page
│   ├── dashboard.php           # User dashboard
│   ├── assets/
│   │   ├── css/main.css        # Custom CSS (themes, animations, utilities)
│   │   └── js/app.js           # Vanilla JavaScript (theme, modals, forms, etc.)
│   ├── api/
│   │   ├── router.php          # API request router
│   │   ├── auth/handler.php    # Auth endpoints (login, register, logout, session)
│   │   ├── events/handler.php  # Event endpoints (list, featured, detail)
│   │   ├── registrations/      # Registration endpoints
│   │   ├── inquiries/          # Partner inquiry submission
│   │   ├── contact/            # Contact form submission
│   │   └── admin/              # Admin API endpoints
│   └── admin/
│       ├── index.php           # Admin dashboard
│       ├── events.php          # Event management
│       ├── users.php           # User management
│       └── inquiries.php       # Inquiry management
├── app/
│   ├── bootstrap.php           # Application initialization
│   ├── config/                 # Configuration (App, Database, Session)
│   ├── middleware/              # Auth, CSRF, Rate limiting, Security headers, Error handler
│   ├── services/               # Business logic (Event, Registration, Inquiry, Contact, User)
│   ├── validation/             # Input validation
│   └── helpers/                # CSRF, Auth, Sanitize, Logger utilities
├── includes/
│   ├── header.php              # HTML head + body start
│   ├── navbar.php              # Navigation bar
│   ├── footer.php              # Footer
│   └── event-detail-modal.php  # Partner inquiry modal
├── database/
│   └── schema.sql              # MySQL database schema + seed data
├── storage/
│   ├── logs/                   # Application logs
│   └── uploads/                # File uploads
├── config.env.example          # Environment configuration template
└── .htaccess                   # Root redirect to public/
```

## Requirements

| Requirement | Version |
|-------------|---------|
| PHP | 8.2+ |
| MySQL/MariaDB | 10.5+ / 8.0+ |
| PHP Extensions | PDO, PDO_MySQL, mbstring, json, openssl, session |

## Hostinger Deployment Guide

### Step 1: Database Setup

1. Log into Hostinger hPanel
2. Go to **Databases** → **MySQL Databases**
3. Create a new database (e.g., `kaizenhacks`)
4. Create a database user with full privileges
5. Note the database name, username, and password
6. Go to **phpMyAdmin** (or use the MySQL terminal)
7. Import the SQL file: `database/schema.sql`

### Step 2: Upload Files

1. Go to **Files** → **File Manager** on Hostinger
2. Navigate to your domain's root directory (usually `public_html/`)
3. Upload ALL files from the `backend/` folder
4. Ensure the directory structure is maintained

Alternatively, use **FTP/SFTP** to upload the entire `backend/` directory.

### Step 3: Configure Environment

1. In File Manager, copy `config.env.example` to `config.env`
2. Edit `config.env` with your actual values:

```env
APP_ENV=production
APP_NAME="Kaizen Hacks"
APP_URL="https://yourdomain.com"
APP_DEBUG=false

DB_HOST="localhost"
DB_NAME="your_db_name"
DB_USER="your_db_user"
DB_PASS="your_db_password"
DB_CHARSET="utf8mb4"

SESSION_LIFETIME=7200
CSRF_TOKEN_EXPIRY=3600

RATE_LIMIT_LOGIN=5
RATE_LIMIT_REGISTER=3
RATE_LIMIT_CONTACT=5
RATE_LIMIT_INQUIRY=3
RATE_LIMIT_WINDOW=900
```

### Step 4: Set Document Root

If Hostinger allows changing the document root:

- Set it to `public_html/backend/public/`

If not, you can use the `.htaccess` rewrite rules in the root `backend/.htaccess` to redirect.

### Step 5: Set File Permissions

In File Manager or via FTP, set:
- Directories: `755`
- PHP files: `644`
- `storage/logs/`: `775` (writable)
- `storage/uploads/`: `775` (writable)
- `config.env`: `640` (readable by web server only)

### Step 6: Change Default Admin Password

After deployment, log in with:
- Email: `admin@kaizenhacks.tech`
- **Change this password immediately!**

To reset manually, update the password hash in the database:
```sql
UPDATE users SET password_hash = '$2y$12$...' WHERE email = 'admin@kaizenhacks.tech';
```

Generate a hash with: `<?php echo password_hash('your-new-password', PASSWORD_BCRYPT, ['cost' => 12]); ?>`

### Step 7: SSL/HTTPS

- Enable SSL in Hostinger hPanel → **SSL**
- The `.htaccess` automatically redirects HTTP to HTTPS

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_ENV` | Application environment | `production` |
| `APP_NAME` | Application name | `Kaizen Hacks` |
| `APP_URL` | Application URL | — |
| `APP_DEBUG` | Enable debug mode | `false` |
| `DB_HOST` | Database host | `localhost` |
| `DB_NAME` | Database name | `kaizenhacks` |
| `DB_USER` | Database user | `root` |
| `DB_PASS` | Database password | — |
| `DB_CHARSET` | Database charset | `utf8mb4` |
| `SESSION_LIFETIME` | Session lifetime in seconds | `7200` |
| `RATE_LIMIT_LOGIN` | Max login attempts per window | `5` |
| `RATE_LIMIT_REGISTER` | Max registration attempts per window | `3` |
| `RATE_LIMIT_CONTACT` | Max contact form submissions per window | `5` |
| `RATE_LIMIT_INQUIRY` | Max inquiry submissions per window | `3` |
| `RATE_LIMIT_WINDOW` | Rate limit window in seconds | `900` |

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Health check | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/logout` | User logout | No |
| GET | `/api/auth/session` | Current session info | No |
| GET | `/api/events` | List all events | No |
| GET | `/api/events/featured` | Featured event | No |
| GET | `/api/events/{slug}` | Event by slug | No |
| POST | `/api/registrations/register` | Register for event | Yes |
| POST | `/api/registrations/cancel` | Cancel registration | Yes |
| GET | `/api/registrations/my` | My registrations | Yes |
| POST | `/api/inquiries` | Submit partner inquiry | No |
| POST | `/api/contact` | Submit contact message | No |
| GET | `/api/admin/stats` | Dashboard statistics | Admin/Organizer |
| GET | `/api/admin/events` | List events (admin) | Admin/Organizer |
| POST | `/api/admin/events` | Create event | Admin/Organizer |
| PUT | `/api/admin/events/{id}` | Update event | Admin/Organizer |
| DELETE | `/api/admin/events/{id}` | Delete event | Admin/Organizer |

## Security Features

- **CSRF Protection**: All state-changing requests require CSRF tokens
- **Rate Limiting**: Sensitive endpoints are rate-limited per IP
- **Input Validation**: All input validated server-side using allowlists
- **XSS Protection**: Output escaped with `htmlspecialchars()` throughout
- **SQL Injection**: All queries use PDO prepared statements
- **Password Hashing**: bcrypt with cost factor 12
- **Session Security**: HTTP-only, Secure, SameSite cookies; session regeneration on auth
- **Security Headers**: CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- **Error Handling**: Centralized exception handler, no stack traces in production
- **Logging**: Security events logged without sensitive data exposure
- **Authentication**: Server-side session validation, role-based authorization

## Testing Checklist

- [ ] Landing page loads with all sections
- [ ] Dark/light theme toggle persists
- [ ] Mobile menu opens/closes
- [ ] Smooth scroll navigation works
- [ ] Partner inquiry form submits
- [ ] User registration works
- [ ] User login/logout works
- [ ] Session persistence
- [ ] Dashboard shows user data
- [ ] Admin panel accessible only by admin/organizer
- [ ] Event creation/editing works (admin)
- [ ] Rate limiting blocks excessive requests
- [ ] CSRF tokens required for forms
- [ ] Error pages display correctly
- [ ] HTTPS redirect works
- [ ] Responsive on mobile
- [ ] Footer clocks update in real-time
