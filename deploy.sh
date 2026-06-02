#!/usr/bin/env bash
# deploy.sh - argajitsrkar.in operations helper
# Mirrors grantsetu's deploy.sh pattern. Run on the home laptop.

set -e
cd "$(dirname "$0")"

cmd=${1:-help}

case "$cmd" in
  up)
    docker compose up -d --build
    ;;
  update)
    git pull
    docker compose up -d --build
    docker image prune -f
    ;;
  down)
    docker compose down
    ;;
  logs)
    docker compose logs -f --tail=200 "${2:-}"
    ;;
  status)
    docker compose ps
    echo
    docker stats --no-stream
    ;;
  migrate)
    docker compose exec api alembic upgrade head
    ;;
  shell)
    docker compose exec "${2:-api}" sh
    ;;
  worker)
    cd worker && npx wrangler deploy
    ;;
  help|*)
    cat <<'EOF'
Usage: ./deploy.sh <command>

Commands:
  up        Build + start all services
  update    git pull, rebuild, restart, prune
  down      Stop all services
  logs [svc] Tail logs (optionally for one service)
  status    Container + resource status
  migrate   Run pending Alembic migrations
  shell [svc] Shell into a container (default: api)
  worker    Deploy Cloudflare outage Worker (run from laptop)
EOF
    ;;
esac
