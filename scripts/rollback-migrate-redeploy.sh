#!/usr/bin/env bash
#
# Roll the API database back to a known dump, re-apply migrations, re-run the
# team-membership backfill, and put the API back online under pm2.
#
# Order matters: the API is stopped first so nothing writes to the database
# while it is being replaced, and only restarted once the data is in its final
# shape. Every step is fatal — a failed restore must not be followed by a
# migration run against half-restored data.
#
# Usage:
#   scripts/rollback-migrate-redeploy.sh [--dump <path>] [--no-build] [--yes]
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_DIR="$REPO_ROOT/apps/api"

DUMP="$API_DIR/api_db.predeploy.20260901-122841.dump"   # the 12:28 pre-deploy dump
PM2_APP="mtym_api"
PG_CONTAINER="mtym_db"
DO_BUILD=1
ASSUME_YES=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dump)     DUMP="$2"; shift 2 ;;
    --no-build) DO_BUILD=0; shift ;;
    --yes|-y)   ASSUME_YES=1; shift ;;
    -h|--help)  sed -n '2,14p' "$0"; exit 0 ;;
    *) echo "unknown argument: $1" >&2; exit 2 ;;
  esac
done

log() { printf '\n\033[1;34m==>\033[0m %s\n' "$*"; }
die() { printf '\n\033[1;31mFAILED:\033[0m %s\n' "$*" >&2; exit 1; }

[[ -f "$DUMP" ]] || die "dump not found: $DUMP"

# Credentials come from the API's own .env so the script can never target a
# different database than the API does.
env_val() { grep -E "^$1=" "$API_DIR/.env" | tail -1 | cut -d= -f2- | tr -d "'\"" ; }
PGDB="$(env_val POSTGRES_DATABASE)"
PGUSER="$(env_val POSTGRES_USER)"
[[ -n "$PGDB" && -n "$PGUSER" ]] || die "could not read POSTGRES_DATABASE / POSTGRES_USER from $API_DIR/.env"

docker inspect "$PG_CONTAINER" >/dev/null 2>&1 || die "postgres container '$PG_CONTAINER' is not running"

cat <<SUMMARY

  database   : $PGDB (container $PG_CONTAINER, user $PGUSER)
  dump       : $DUMP
               $(date -r "$DUMP" '+%Y-%m-%d %H:%M:%S')  $(du -h "$DUMP" | cut -f1)
  pm2 app    : $PM2_APP
  build      : $([[ $DO_BUILD -eq 1 ]] && echo yes || echo "no (--no-build)")

  This DROPS the current '$PGDB' database and replaces it with the dump.

SUMMARY

if [[ $ASSUME_YES -eq 0 ]]; then
  read -rp "Continue? [y/N] " reply
  [[ "$reply" =~ ^[Yy]$ ]] || { echo "aborted"; exit 1; }
fi

STAMP="$(date '+%Y%m%d-%H%M%S')"

# 1. Safety net: the current database, before anything touches it.
SAFETY="$API_DIR/api_db.pre-rollback.$STAMP.dump"
log "Backing up current database to $(basename "$SAFETY")"
docker exec "$PG_CONTAINER" pg_dump -U "$PGUSER" -d "$PGDB" -Fc > "$SAFETY" \
  || die "safety backup failed — nothing was changed"

# 2. Stop the API so it holds no connections and writes nothing mid-restore.
log "Stopping pm2 app $PM2_APP"
pm2 stop "$PM2_APP" || die "could not stop $PM2_APP"

restart_api() { pm2 restart "$PM2_APP" --update-env >/dev/null 2>&1 || true; }

# 3. Restore. Dropping and recreating is used rather than pg_restore --clean so
#    that objects created after the dump (a later migration's table, say) are
#    gone rather than left behind as orphans.
log "Restoring $PGDB from $(basename "$DUMP")"
docker exec "$PG_CONTAINER" psql -U "$PGUSER" -d postgres -v ON_ERROR_STOP=1 -c \
  "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$PGDB' AND pid <> pg_backend_pid();" >/dev/null \
  || { restart_api; die "could not terminate existing connections"; }
docker exec "$PG_CONTAINER" psql -U "$PGUSER" -d postgres -v ON_ERROR_STOP=1 \
  -c "DROP DATABASE IF EXISTS \"$PGDB\";" -c "CREATE DATABASE \"$PGDB\" OWNER \"$PGUSER\";" >/dev/null \
  || { restart_api; die "could not recreate $PGDB — restore with: docker exec -i $PG_CONTAINER pg_restore -U $PGUSER -d $PGDB --clean --if-exists < $SAFETY"; }
# The dump carries rows that violate their own foreign keys (orphaned
# applications_status / applications_reviews rows), so pg_restore cannot
# re-create those constraints and exits non-zero. That is tolerated — the
# table data is all there — but ONLY when every error is a constraint that
# could not be added. Any other error means the data itself is incomplete
# and the run must stop.
RESTORE_LOG="$(mktemp)"
FK_SKIPPED=0
if ! docker exec -i "$PG_CONTAINER" pg_restore -U "$PGUSER" -d "$PGDB" --no-owner --no-privileges < "$DUMP" 2> >(tee "$RESTORE_LOG" >&2); then
  total_errors=$(grep -c '^pg_restore: error:' "$RESTORE_LOG" || true)
  fk_errors=$(grep -c 'violates foreign key constraint' "$RESTORE_LOG" || true)
  if [[ "$total_errors" -gt 0 && "$total_errors" -eq "$fk_errors" ]]; then
    FK_SKIPPED="$fk_errors"
    printf '\n\033[1;33mWARNING:\033[0m %s foreign key constraint(s) could not be re-created (orphaned rows in the dump). Continuing.\n' "$FK_SKIPPED"
  else
    restart_api
    die "pg_restore failed with errors beyond constraint creation — the database may be incomplete; safety copy: $SAFETY (details: $RESTORE_LOG)"
  fi
fi
# Independent sanity check that data actually landed, whatever pg_restore said.
row_check=$(docker exec "$PG_CONTAINER" psql -U "$PGUSER" -d "$PGDB" -tA -c "SELECT count(*) FROM users;" 2>/dev/null || echo 0)
[[ "${row_check:-0}" -gt 0 ]] || { restart_api; die "restore left an empty users table; safety copy: $SAFETY"; }
log "Restored — users: $row_check"

# 4. Migrations, against the freshly restored schema.
log "Running migrations"
cd "$API_DIR"
TS_NODE_PROJECT=tsconfig.json pnpm run migration:run \
  || { restart_api; die "migration:run failed — API restarted on rolled-back data; safety copy: $SAFETY"; }

# 5. Backfill (idempotent: users with an open stint are skipped).
log "Running team-membership backfill"
npm run script:run --file=backfill-current-team-memberships \
  || { restart_api; die "backfill failed — API restarted; safety copy: $SAFETY"; }

# 6. Rebuild and bring the API back up.
if [[ $DO_BUILD -eq 1 ]]; then
  log "Building API"
  pnpm run build || { restart_api; die "build failed — API restarted on the previous dist"; }
fi

log "Restarting pm2 app $PM2_APP"
pm2 restart "$PM2_APP" --update-env || die "pm2 restart failed"
pm2 save >/dev/null

sleep 3
pm2 describe "$PM2_APP" | grep -E "status|restarts|uptime" || true

if [[ "$FK_SKIPPED" -gt 0 ]]; then
  printf '\n\033[1;33mWARNING:\033[0m %s foreign key constraint(s) from the dump are MISSING on the live database.\n' "$FK_SKIPPED"
  printf '    Orphaned rows must be cleaned up before they can be re-added.\n'
fi

log "Done. Safety copy of the pre-rollback database: $SAFETY"
echo "    Tail the API with: pm2 logs $PM2_APP"
