# CLAUDE.md - argajitsrkar.in

> Read this before making changes. Update the Changelog at the bottom when you ship.

> **Typography rule (HARD):** Never use the em-dash. Use a plain hyphen `-` instead. Same rule as GrantSetu.

---

## Project Overview

**Site:** [argajitsrkar.in](https://argajitsrkar.in)
**Type:** Personal site + content platform (blog, free PDF resources for M.Sc/PhD students, portfolio)
**Owner:** Argajit Sarkar - Doctoral Scholar, Tripura University; founder of [GrantSetu](https://grantsetu.in)
**Repo:** [github.com/argajitsarkr/argajitsrkar.in](https://github.com/argajitsarkr/argajitsrkar.in)
**Strategy:** Funnels readers to GrantSetu. Every blog post can drop a `<GrantSetuCTA>` callout.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), NextAuth v5 |
| Backend | FastAPI, SQLAlchemy (async), Alembic |
| Database | PostgreSQL 15 |
| Cache | Redis 7 |
| PDF storage | Cloudflare R2 |
| Deployment | Docker Compose, Cloudflare Tunnel |
| Server | Home Ubuntu laptop, `192.168.1.50`, accessed via `ssh argajit@192.168.1.50` |
| Outage fallback | Cloudflare Worker -> `https://argajitsarkr.github.io` (the existing static portfolio) |

Ports on the laptop: frontend `:3002`, api `:8001`. (Port 3000 is the existing static-portfolio Docker container `argajitsarkar-site`; 3001 is `bluevolt-web`; 8000 is `bluevolt-api`. 3002 and 8001 are free.)

---

## Repo Layout

```
argajitsrkar.in/
├── docker-compose.yml
├── deploy.sh              # up / update / logs / status / migrate / shell / worker
├── cloudflared-config.yml # template - copy to /etc/cloudflared/config.yml
├── CLAUDE.md
├── README.md
├── frontend/              # Next.js 14
├── backend/               # FastAPI
├── worker/                # Cloudflare outage Worker (wrangler)
└── uploads/               # Docker volume mount for any local-disk uploads (PDFs go to R2)
```

---

## Public Pages

- `/` Hero, founder framing (GrantSetu callout), latest posts
- `/about` Long-form story
- `/research` Publications + fellowships (ICMR PTS-III, ASM Future Leaders Fellow)
- `/projects` GrantSetu headline + research projects
- `/writing` Blog index
- `/writing/[slug]` Markdown post with optional `<GrantSetuCTA>` boxes
- `/resources` Free PDF library for students
- `/now` What I'm working on this month
- `/speaking` Talks + NEP Saarthi workshops
- `/cv` Direct PDF

## Admin (single-admin, `argajit05@gmail.com`)

- `/auth/signin` Google or email/password
- `/admin` Dashboard
- `/admin/blog` List / new / edit / delete with markdown live preview
- `/admin/resources` Upload PDF (-> R2), list, delete

---

## Environment Variables

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=https://api.argajitsrkar.in
NEXTAUTH_URL=https://argajitsrkar.in
NEXTAUTH_SECRET=<random-32-char>
GOOGLE_CLIENT_ID=<from-google-cloud-console>
GOOGLE_CLIENT_SECRET=<from-google-cloud-console>
AUTH_TRUST_HOST=true
```

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql+asyncpg://argajit:<pwd>@db:5432/argajit
REDIS_URL=redis://redis:6379/0
FRONTEND_URL=https://argajitsrkar.in
CORS_ORIGINS=https://argajitsrkar.in,http://localhost:3002
ADMIN_EMAILS=argajit05@gmail.com
GOOGLE_CLIENT_ID=<same-as-frontend>
GOOGLE_CLIENT_SECRET=<same-as-frontend>
NEXTAUTH_SECRET=<same-as-frontend>
DB_PASSWORD=<postgres-pwd>
R2_ACCOUNT_ID=<cloudflare-account>
R2_ACCESS_KEY_ID=<r2-token>
R2_SECRET_ACCESS_KEY=<r2-token>
R2_BUCKET=argajit-resources
R2_PUBLIC_BASE=https://pub-<hash>.r2.dev   # or custom-domain
BUTTONDOWN_API_KEY=                        # shared with GrantSetu; blank -> stdout in dev
```

---

## Deployment

```bash
# First time (on laptop)
ssh argajit@192.168.1.50
cd ~/argajitsrkar.in
git clone https://github.com/argajitsarkr/argajitsrkar.in.git .
# fill in backend/.env and frontend/.env.local
./deploy.sh up

# After pushing changes
./deploy.sh update
```

Cloudflare Tunnel: add `argajitsrkar.in`, `www.argajitsrkar.in`, `api.argajitsrkar.in` hostnames to the laptop's existing tunnel (or create one).

---

## Changelog

| Date | Changes |
|---|---|
| 2026-06-03 | Project scaffolded: docker-compose, deploy.sh, cloudflared template, README, CLAUDE.md. Backend + frontend scaffolds pending. |
