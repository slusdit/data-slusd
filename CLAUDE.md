# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev         # Start Next.js development server
npm run host        # Start dev server with network access (0.0.0.0)
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npx tsx <file.ts>   # Execute TypeScript files directly
```

### Database Operations
```bash
npx prisma generate     # Generate Prisma client
npx prisma db push      # Push schema changes to database
npx prisma studio       # Open Prisma Studio GUI
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.3 with App Router
- **Language**: TypeScript with ES modules (`"type": "module"`)
- **Database**: MySQL via Prisma ORM + Direct MSSQL for Aeries queries
- **Auth**: NextAuth v5 with Google OAuth
- **UI**: Radix UI components + Tailwind CSS
- **Tables**: AG-Grid Enterprise for data tables
- **Charts**: AG-Charts Enterprise + Recharts

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
- `lib/signinMiddleware.ts` - User sync with Aeries on login
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