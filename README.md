# MTYM Monorepo Setup Guide

## Prerequisites

Make sure the following tools are installed:

- Docker (CLI + Engine)
- Node.js & npm
- pnpm
- Git
- PostgreSQL

---

# 1. Install Required Tools

## Node.js & npm

### Ubuntu / Debian
```sh
sudo apt update
sudo apt install nodejs npm
```

### Alpine Linux
```sh
sudo apk add nodejs npm
```

### Arch Linux (yay)
```sh
yay -S nodejs npm
```

Or download the latest LTS version from:

https://nodejs.org/

---

## pnpm

Install pnpm globally:

```sh
npm install -g pnpm
```

Official installation guide:

https://pnpm.io/installation

---

## Git

### Ubuntu / Debian
```sh
sudo apt install git
```

### Alpine Linux
```sh
sudo apk add git
```

### Arch Linux (yay)
```sh
yay -S git
```

Or download Git from:

https://git-scm.com/

---

## PostgreSQL

### Ubuntu / Debian
```sh
sudo apt install postgresql
```

### Alpine Linux
```sh
sudo apk add postgresql
```

### Arch Linux (yay)
```sh
yay -S postgresql
```

---

# 2. Install Project Dependencies

From the root of the monorepo:

```sh
pnpm install
```

---

# 3. Configure Environment Variables

## Copy the Example Environment File

### Linux / macOS
```sh
cp .env.example .env
```

### Windows
```sh
copy .env.example .env
```

---

## Edit `.env`

Open the `.env` file and configure your PostgreSQL credentials:

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=supersecret
POSTGRES_DATABASE=mtym_dev
```

> Replace these values with your own credentials.  
> These environment variables are used by the backend and Docker containers to connect to PostgreSQL.

---

# 4. Start PostgreSQL with Docker

From the root of the monorepo:

```sh
pnpm run start:db
```

---

# 5. Run Database Migrations

Navigate to the API app:

```sh
cd apps/api
```

Install dependencies:

```sh
npm install
```

Run migrations:

```sh
npm run migration:run
```

---

# 6. Start the Development Environment

From the root of the monorepo:

```sh
pnpm run dev
```

This starts:

- NestJS API
- Next.js frontend
- Required development services