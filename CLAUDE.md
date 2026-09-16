# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev         # Start Next.js development server
npm run host        # Start dev server with network access (0.0.0.0)
npm run build       # Build for production
npm start           # Start production server
npm run lint        # ESLint 9 flat config (eslint.config.mjs); ESLint 10 and TypeScript 7 are blocked by the Next/typescript-eslint toolchain
npm test            # Unit tests (node:test via tsx, lib/*.test.ts)
npx tsc --noEmit    # Type check (must stay clean; the build no longer ignores type errors)
npx tsx <file.ts>   # Execute TypeScript files directly
```

Never run `next dev` or `next build` on the production host: it serves `npm start` from its own
checkout and a build empties `.next` under the running server. Develop on the dev box and deploy
in a maintenance window (see `docs/handoff-2026-09-08-review.md`, Phase 7).

### Database Operations
```bash
npx prisma generate     # Generate Prisma client
npx prisma db push      # Push schema changes to database
npx prisma studio       # Open Prisma Studio GUI
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router (Turbopack builds; the request gate is `proxy.ts`, not middleware)
- **Language**: TypeScript with ES modules (`"type": "module"`)
- **Database**: MySQL via Prisma 7 (MariaDB driver adapter in `lib/db.ts`; connection URL for the CLI lives in `prisma.config.ts`) + direct MSSQL for Aeries queries
- **Auth**: NextAuth v5 with Google OAuth
- **UI**: React 19, Radix UI components, Tailwind CSS 4 (JS config still loaded via `@config` in `app/globals.css`)
- **Tables**: AG Grid Enterprise 36 (row selection through `lib/agGridSelection.ts`, licence registered in `AGGridProvider` / `AgChartsSetup`)
- **Charts**: AG-Charts Enterprise (standalone `AgCharts` on the dashboard, integrated charts in the report grid)

### Core Architecture

#### Database Layer
- **Prisma**: Primary ORM for MySQL application database (users, roles, queries, etc.)
- **MSSQL**: Direct connection to Aeries school database via `mssql` package
- **Dual Database Pattern**: App data in MySQL, school/student data in MSSQL Aeries

#### Authentication & Authorization
- Google OAuth via NextAuth in `auth.ts`
- Role-based access control (RBAC) with `ROLE` enum
- School-based access control with `UserSchool` relationships
- User emulation system for admin support

#### Route Structure
- `/app/[sc]/` - School-specific routes (sc = school code)
- `/app/admin/` - Admin panel
- `/app/ai-query/` - AI query builder interface
- `/app/api/` - API routes for data operations
- `/app/gradedistribution/` - Grade distribution analysis
- `/app/interventions/` - Student intervention tracking

#### Key Services
- `lib/aeries.ts` - Aeries database integration
- `lib/signinSync.ts` - User sync with Aeries on login (server-only; runs in the NextAuth signIn event)
- `lib/signinMiddleware.ts` - Server actions for the session user's active school / year
- `lib/fragment-service.ts` - AI query fragment management
- `lib/query-composer.ts` - SQL query composition for AI
- `lib/llm-client.ts` - LLM integration for query generation

#### Data Models
- Multi-tenant with school isolation
- School year tracking (activeDbYear field)
- Complex role hierarchy (teachers, admins, staff, etc.)
- Query system with favorites and categories
- AI fragment system for composable SQL queries

#### Component Architecture
- Server Components by default
- Client Components marked with "use client"
- Providers in `app/components/providers/`
- Shared UI components in `components/ui/`
- Chart components in `app/components/charts/`

## Key Patterns

### Path Imports
- Use `@/` prefix for absolute imports from root
- Example: `import prisma from "@/lib/db"`

### Type Safety
- Strict TypeScript enabled
- Prisma generates types from schema
- Custom types in `types/types.ts`

### Session Management
- Extended session type `SessionUser` includes schools, roles, classes
- Session available server-side via `auth()` function
- Client-side via SessionProvider

### Error Handling
- API routes return appropriate HTTP status codes
- Use `toast` from sonner for user notifications
- Server actions handle errors with try-catch

## Environment Variables

Critical for operation:
- `DATABASE_URL` - MySQL connection string
- `AUTH_SECRET` / `NEXTAUTH_SECRET` - Auth encryption
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` - Google OAuth
- `DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_DATABASE` - MSSQL Aeries connection
- `NEXT_PUBLIC_AG_GRID_LICENSE_KEY` - AG-Grid license

## Development Tips

### Working with Prisma
- Schema changes require `npx prisma db push` 
- Always regenerate client after schema changes
- Use Prisma Studio to inspect data

### TypeScript Execution
- Use `npx tsx` to run TypeScript files directly
- Example: `npx tsx scripts/sync-data.ts`

### Testing Database Queries
- Check `lib/aeries.ts` for Aeries query patterns
- Use `lib/db.ts` for Prisma queries
- Test complex queries in isolation first

### Component Development
- Follow existing patterns in `components/ui/`
- Use Radix UI primitives when available
- Apply consistent styling with Tailwind classes