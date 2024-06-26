---
name: Vercel Postgres Next.js Starter
slug: postgres-starter
description: Simple Next.js template that uses Vercel Postgres as the database.
framework: Next.js
useCase: Starter
css: Tailwind
database: Vercel Postgres
deployUrl: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fexamples%2Ftree%2Fmain%2Fstorage%2Fpostgres-starter&project-name=postgres-starter&repository-name=postgres-starter&demo-title=Vercel%20Postgres%20Next.js%20Starter&demo-description=Simple%20Next.js%20template%20that%20uses%20Vercel%20Postgres%20as%20the%20database.&demo-url=https%3A%2F%2Fpostgres-starter.vercel.app%2F&demo-image=https%3A%2F%2Fpostgres-starter.vercel.app%2Fopengraph-image.png&stores=%5B%7B"type"%3A"postgres"%7D%5D
demoUrl: https://postgres-starter.vercel.app/
relatedTemplates:
  - postgres-prisma
  - postgres-kysely
  - postgres-sveltekit
---

# Vercel Postgres Next.js Starter

Simple Next.js template that uses [Vercel Postgres](https://vercel.com/postgres) as the database.

Next, run Next.js in development mode:

```bash
pnpm dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples) ([Documentation](https://nextjs.org/docs/deployment)).

To interact with Vercel PG in CLI (secret hidden):

```
psql "postgres://default:************@ep-morning-sky-a4gu1riu.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&options=endpoint%3Dep-morning-sky-a4gu1riu"
```

To run script for psql:

```
pnpm ts-node --project tsconfig.scripts.json scripts/[script file]
```