# MTYM Monorepo

## Prerequisites
- Docker (CLI + Engine)
- npm
- pnpm (https://pnpm.io/installation)

## Install dependencies
```
# In root of monorepo
pnpm i
```

## Initialize & Start Postgres docker container
```
# In root of monorepo
pnpm run start:db

# In apps/api
npm i
npm run migration:run
```

## Start Nest API, and Next Front
```
# In root of monorepo
pnpm run dev
```
