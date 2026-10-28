# Role catalogue migration runbook

Branch: `roles-table-migration`. Replaces the `ROLE` enum with a data-driven
`Role` table and adds an admin **Roles** tab. Written 2026-10-28.

## Why

Roles used to be a Prisma/MySQL enum, so every new role meant a schema change,
a client regeneration, a production `db push` and a build. The district now
needs roles for people who have no Aeries account (board members first, more
expected), so roles become rows a super admin can create at runtime.

## What changes

| Area | Before | After |
|------|--------|-------|
| `Role.role` | `ROLE` enum, indexed | `VARCHAR(191)`, unique |
| `Role` columns | `id, role, queryId` | `id, role, label, description, isSystem, createdAt, updatedAt` |
| `User.primaryRole` | `ROLE` enum | `VARCHAR(191)` with FK to `Role.role` (restrict delete, cascade update) |
| Per-report roles | `Role.queryId` (one role row per report) | `_QueryToRole` join table (0 reports used the old shape) |
| `_UserRole` | legacy join table, unread by the app | dropped (its rows are listed in the SQL file) |
| Admin UI | roles hard-coded in `UserAdminGrid` | **Roles** tab (`RoleAdminGrid`), pickers read the table |
| Code | `ROLE` enum imports | plain strings; `lib/roles.ts` lists the system roles the code checks by name |

System roles (`lib/roles.ts` → `SYSTEM_ROLES`) are seeded and flagged on
every admin page load by `ensureSystemRoles()`. They cannot be deleted. Data
roles are created on the Roles tab and can be deleted only when nothing
references them.

## Important: there is no separate dev database

The dev `.env` `DATABASE_URL` points at the production application database.
Rehearse the migration against a copy before the window:

```bash
# on the DB host or anywhere with mysqldump access
mysqldump -h <host> -u <user> -p --single-transaction --routines data_slusd > data_slusd-pre-roles.sql
# load into a scratch database (local MySQL 8 / MariaDB container), point a
# throwaway .env DATABASE_URL at it, then run the steps below against it
```

## Maintenance window

Do this from the dev box with the branch checked out and `npx prisma generate`
already run (the client must match the new schema for the snapshot script's
second run).

1. Stop the production app so no sign-in writes roles mid-migration:
   `sudo systemctl stop data-slusd` on the prod host.
2. Take a dump (command above). This is the rollback.
3. Snapshot the current state:
   ```bash
   npx tsx scripts/snapshot-roles.ts > roles-before.json
   ```
4. Apply the migration:
   ```bash
   npx prisma db execute --file prisma/manual-migrations/2026-10-28-role-catalogue.sql
   ```
5. Confirm the database now matches the Prisma schema (exit code 0 means no
   difference):
   ```bash
   npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code
   ```
6. Confirm nobody's access changed:
   ```bash
   npx tsx scripts/snapshot-roles.ts > roles-after.json
   diff roles-before.json roles-after.json
   ```
   The only acceptable difference is `BOARDMEMBER` appearing in the `roles` list.
7. Deploy the build from this branch on the prod host (pull, `npm ci`,
   `npm run build`, `sudo systemctl start data-slusd`), per the usual process.
8. Sign in as a super admin, open **Admin → Roles**. The system roles should
   show the **System** badge with labels filled in, and `BOARDMEMBER` should be
   listed with nobody assigned. Open **Users**, edit a user, and confirm the
   Primary Role and Additional Roles pickers list `Board Member (BOARDMEMBER)`.

## Rollback

Restore the dump from step 2 and redeploy the previous build. Nothing in the
new code writes anywhere the old schema cannot read until a data role is
assigned to someone, so a rollback shortly after deploy loses at most those
assignments.

## After the migration

- Assign `BOARDMEMBER` to board members on the Users tab once they have signed
  in with an `@slusd.us` Google account. The Aeries sync skips accounts it
  cannot find, so their primary role and assignments stay as set.
- Add `BOARDMEMBER` to the report categories board members should see
  (Categories tab).
- The 17 legacy `_UserRole` links listed at the bottom of the SQL file were not
  in effect before the migration. Re-grant any that are still wanted.
- `User.addedRoles` / `User.blockedRoles` (comma-separated text overrides) are
  unchanged and still accepted. Nobody uses them today; `blockedRoles` remains
  the only way to stop the Aeries sync re-adding a title role.
