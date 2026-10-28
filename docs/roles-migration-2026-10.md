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

## Maintenance window (run on the prod host, about 10 minutes)

Everything is on `main`. The only step beyond the usual pull, build and
restart is the SQL file, which must run **after** `git pull` (so the file and
the matching Prisma schema are present) and **before** `npm run build` (so the
new code never serves against the old columns). Do not run `npx prisma db push`
for this release: it would try to make the same changes interactively and stop
on a data-loss prompt. The SQL file is the push.

```bash
cd /home/administrator/data-slusd
git status --short                      # must be clean
git pull --ff-only                      # if this refuses: git fetch origin && git reset --hard origin/main
sudo systemctl stop data-slusd

# rollback point
mysqldump -h 10.100.4.98 -u data_user -p --single-transaction data_slusd > ~/data_slusd-pre-roles-$(date +%F).sql

# keep the copies OUTSIDE the project: tsconfig type-checks every .ts under it,
# so a node_modules.prev inside the tree makes `npm run build` fail
mkdir -p ~/data-slusd-prev
mv node_modules ~/data-slusd-prev/node_modules
rsync -a --exclude cache .next/ ~/data-slusd-prev/.next/
npm ci
npx prisma generate

npm run roles:snapshot > ~/roles-before.json   # who holds what, before
npm run roles:migrate                          # the SQL file
npm run roles:verify                           # exit 0 = database matches the schema
npm run roles:snapshot > ~/roles-after.json
diff ~/roles-before.json ~/roles-after.json    # only BOARDMEMBER may appear in "roles"

npm run build
sudo systemctl start data-slusd
```

Verify:

```bash
sudo systemctl status data-slusd --no-pager
journalctl -u data-slusd -n 50 --no-pager
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/          # 200
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/admin     # 307
```

Then sign in as a super admin and open **Admin → Roles**. The system roles
should show the **System** badge with labels filled in (the first admin page
load seeds them), and `BOARDMEMBER` should be listed with nobody assigned.
Open **Users**, edit a user, and confirm the Primary Role and Additional Roles
pickers list `Board Member (BOARDMEMBER)`.

If `npm run roles:migrate` fails part-way (MySQL DDL is not transactional),
restore the dump before retrying: `mysql -h 10.100.4.98 -u data_user -p data_slusd < ~/data_slusd-pre-roles-<date>.sql`.

## Rollback

Stop the service, restore the dump, then put the previous build back:
`rm -rf node_modules && mv ~/data-slusd-prev/node_modules node_modules`,
`rm -rf .next && mv ~/data-slusd-prev/.next .next`,
`git checkout <previous main sha> -- package.json package-lock.json` (or
`git reset --hard <previous main sha>`), start the service. Nothing in the
new code writes anywhere the old schema cannot read until a data role is
assigned to someone, so a rollback shortly after deploy loses at most those
assignments. Delete `~/data-slusd-prev` after 24 clean hours.

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
