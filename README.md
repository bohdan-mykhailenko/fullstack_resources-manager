## Description

Freelance MVP for an **animal shelter** product used by volunteers and staff: browse shelters, leave feedback, and let admins verify listings and review activity. The client’s brief **started narrower** (bird-related volunteering) and **shifted to general animal shelters**—the domain and naming were updated mid-build to match. This repo is a **fast, solid foundation** meant for handoff—another developer continues feature work and picks a long-term API style.

## Client & scope

The client needed a working scratch quickly. The next developer on the project (already comfortable with **GraphQL**) asked for **both** a **REST-style HTTP API** and **GraphQL** in parallel so they could **compare** which fit the product before standardizing on one.

## Features

- **Shelters:** Browse and open shelter profiles with ratings and details.
- **Feedback:** Volunteers can submit feedback on shelters.
- **Auth:** Sign up, sign in, email confirmation, token refresh.
- **Admin:** Shelter verification, user statistics, and moderation-oriented flows.
- **Dual API surface:** Same domain behind Encore **HTTP routes** and a **`/graphql`** endpoint for side-by-side evaluation.

## Technologies

**Runtime & tooling**

- [Bun](https://bun.sh)

**Frontend (`apps/web`)**

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [TanStack Form](https://tanstack.com/form)
- [Chakra UI](https://chakra-ui.com/)
- [Zod](https://zod.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [GraphQL](https://graphql.org/) (client + [GraphQL Code Generator](https://the-guild.dev/graphql/codegen))
- [Ky](https://github.com/sindresorhus/ky)

**Backend (`apps/api`)**

- [Encore](https://encore.dev/) (TypeScript services)
- [GraphQL](https://graphql.org/) via [Apollo Server](https://www.apollographql.com/docs/apollo-server/) on `/graphql`
- [Vitest](https://vitest.dev/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (JWT)
- [Nodemailer](https://nodemailer.com/)

## Architecture

- **`apps/web`** — SPA: file-based routes, forms, client state, calls to the API over HTTP (REST-style and GraphQL as configured).
- **`apps/api`** — One Encore app, multiple **services**:
  - `users` — auth and account flows
  - `admin` — verification and statistics
  - `animal-shelters` — core listings, **feedback**, **ratings**
  - `graphql` — Apollo on `/graphql`
- Each service owns its data access and validation; **HTTP handlers** are the primary Encore surface; GraphQL mirrors the same product surface for comparison.
- **CORS** is set in `encore.app` for local dev and deploy previews (e.g. Vercel).

## Data layer

**Data layer:** [PostgreSQL](https://www.postgresql.org/) via Encore’s [`SQLDatabase`](https://encore.dev/docs/ts/primitives/databases) using parameterized SQL (tagged templates)—no ORM. Chosen for speed of delivery, direct control over queries, and alignment with Encore’s documented SQL workflow for this MVP.

## Run locally

**API** — from `apps/api`:

```bash
bun install
bun run dev
```

**Web** — from `apps/web` (point the app at your Encore URL; local API is often `http://localhost:4000`):

```bash
bun install
bun run dev
```

- Web dev server: port **4573** by default.
- Regenerate GraphQL types when the schema changes: `bun run generate:graphql` in each app that uses codegen.
