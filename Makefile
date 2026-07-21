# mtym monorepo — dev / prod orchestration
# ----------------------------------------------------------------------
# Wraps the existing pnpm + turbo scripts and the docker-compose infra so
# you can bring up a full DEV or PROD environment with one command.
#
#   make dev       -> start dev infra (postgres, minio, pgadmin) + run all
#                     apps in watch mode (api, front:3000, admin:3001)
#   make prod      -> start prod infra (minio), build, then serve all apps
#
# Run `make help` for the full list. Any variable below can be overridden,
# e.g.  make dev ENV_FILE=apps/api/.env.local
# ----------------------------------------------------------------------

PNPM        ?= pnpm
DC          ?= docker compose
API_DIR     := apps/api
DEV_COMPOSE  := $(API_DIR)/docker-compose.yaml
PROD_COMPOSE := $(API_DIR)/docker-compose.prod.yaml

# Compose reads env (MINIO_*, POSTGRES_*, ...) from this file. Included only
# if it exists, so a missing .env doesn't hard-fail the command.
ENV_FILE    ?= $(API_DIR)/.env
ENV_FLAG    := $(if $(wildcard $(ENV_FILE)),--env-file $(ENV_FILE),)

DEV_DC  := $(DC) $(ENV_FLAG) -f $(DEV_COMPOSE)
PROD_DC := $(DC) $(ENV_FLAG) -f $(PROD_COMPOSE)

.DEFAULT_GOAL := help
.PHONY: help install \
        dev dev-infra dev-down dev-logs \
        prod prod-infra prod-down prod-logs build serve \
        format lint clean

help: ## Show this help
	@grep -hE '^[a-zA-Z0-9_-]+:.*?## ' $(MAKEFILE_LIST) \
	  | awk 'BEGIN{FS=":.*?## "}{printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

install: ## Install all workspace dependencies
	$(PNPM) install

# ---------- DEV ----------
dev: dev-infra ## Full dev env: infra (detached) + all apps in watch mode
	$(PNPM) dev

dev-infra: ## Start dev infra only (postgres, minio, pgadmin), detached
	$(DEV_DC) up -d

dev-down: ## Stop dev infra
	$(DEV_DC) down

dev-logs: ## Tail dev infra logs
	$(DEV_DC) logs -f

# ---------- PROD ----------
prod: prod-infra build serve ## Full prod env: infra + build + serve all apps

prod-infra: ## Start prod infra only (minio + bucket bootstrap), detached
	$(PROD_DC) up -d

prod-down: ## Stop prod infra
	$(PROD_DC) down

prod-logs: ## Tail prod infra logs
	$(PROD_DC) logs -f

build: ## Build every app for production
	$(PNPM) build

serve: ## Serve the already-built apps in production mode
	$(PNPM) --filter api start:prod & \
	$(PNPM) --filter front exec next start -p 3000 & \
	$(PNPM) --filter admin start & \
	wait

# ---------- misc ----------
format: ## Run formatters across the workspace
	$(PNPM) format

lint: ## Lint the api app
	$(PNPM) --filter api lint

clean: ## Remove build output and node_modules
	rm -rf node_modules apps/*/node_modules apps/*/dist apps/*/.next .turbo
