# argajitsrkar.in

Personal site and content platform for Argajit Sarkar - PhD candidate, ASM Future Leaders Fellow, founder of [GrantSetu](https://grantsetu.in).

Full-stack site (Next.js + FastAPI + Postgres + Redis) self-hosted on a home Ubuntu laptop, fronted by Cloudflare Tunnel. Mirrors GrantSetu's architecture, scoped down.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind, NextAuth |
| Backend | FastAPI, SQLAlchemy (async), Alembic |
| DB / Cache | PostgreSQL 15, Redis 7 |
| PDF storage | Cloudflare R2 |
| Deploy | Docker Compose on home laptop, Cloudflare Tunnel |
| Outage fallback | Cloudflare Worker -> `argajitsarkr.github.io` |

## Quick start

```bash
# On the laptop (after cloning)
cp backend/.env.example backend/.env       # fill secrets
cp frontend/.env.local.example frontend/.env.local
./deploy.sh up
./deploy.sh logs
```

See [CLAUDE.md](./CLAUDE.md) for full project context.
