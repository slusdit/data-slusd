
# data-slusd Review Handoff (2026-09-08)

## How to start the new Claude Code session on the dev box

This file was produced by a review session that ran on the **production host** by mistake. No code
was changed there. Start Claude Code in the dev checkout and paste this as the first prompt:

> Read `docs/handoff-2026-09-08-review.md` in full. It contains verified security, performance and
> UX findings and a phased implementation plan that I have already approved (decisions are in the
> Context section). Work through the phases in order, one PR per phase, starting with Phase 1
> (environment and dependencies) then Phase 2 (security). Re-verify each finding's line numbers
> against the current code before editing, since the review was done at commit `cd05164`. Run
> `npm test`, `npx tsc --noEmit`, and `npm run lint` after each phase.

Before starting on the dev box, make sure the production host's six uncommitted files have been
committed and pushed (they are listed under "What happens on the production host"); otherwise a
clean dev checkout is missing changes that production already runs.

Dev-box preconditions: Node 22, a `.env` pointing at a **dev** MySQL (or accept that `prisma db push`
in Phase 3 adds one column to the shared app DB), Aeries MSSQL read credentials, Google OAuth
client for `http://localhost:3000`.

---

# data-slusd: Review Findings and Improvement Plan (handoff to local dev)

Date: 2026-09-08. Reviewed at commit `cd05164` on `main` plus six uncommitted working-tree files.

## Context

The user asked for a whole-repo review covering security, speed, functionality and UX gaps, plus a
concrete feature: column totals at the bottom of reports, starting with the **Projected CALPADS
UPP(%)** report. Mid-review the user decided this work must happen on a **local dev box**, not on
this production host (production serves `npm start` from this very directory via
`data-slusd.service`, and `next build` empties `.next` under the running server).

So this document is the handoff. Decisions already made by the user:

| Decision             | Choice                                                                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Totals configuration | Per-query column list set by query editors,**plus** a computed `UPP %` column on the UPP report whose footer is `SUM(# UPP) / SUM(Total)` |
| Dependency upgrades  | Security patches and safe minors only. No Next 16 / React 19 / Prisma 7 / AG Grid 36 / Tailwind 4                                                   |
| Scope                | Full backlog (all findings below), implemented in the phased order given                                                                            |
| Where                | Local dev checkout. Production host: only commit the in-flight work and push                                                                        |

### What happens on the production host (this machine) once the plan is approved

Nothing that touches `node_modules`, `.next`, or the running service.

1. Commit the six uncommitted files (they are already in the running build from 2026-09-04, so a
   clean checkout elsewhere would otherwise regress them):
   `app/components/AIQueryClient.tsx`, `app/components/ActiveSchool.tsx`,
   `app/components/MainHeader.tsx`, `lib/aeries.ts`, `lib/schoolYear.ts`, `lib/signinMiddleware.ts`.
   They are one coherent change: school permissions resolved from the Aeries `USR` table with exact
   login matching, `redirect()` removed from `updateActiveSchool`/`updateActiveDbYear`, header school
   list resolved server-side, DB year 26 added.
2. Copy this plan into the repo as `docs/handoff-2026-09-08-review.md` (no secrets in it) and commit.
3. Push `main` so the dev box can pull.
4. Save a memory: work for this project is done on the dev box, never on the prod host.

### One thing that should not wait for the dev cycle

Finding **S1** below is an unauthenticated, internet-reachable read of the entire Aeries student
database. The fix is one line (drop `"use server"` from `lib/aeries.ts` and add `import "server-only"`),
but every client component that imports `runQuery` then fails to compile, so it is a small refactor
(see Phase 2, S1) and needs a prod build and restart. Recommendation: do S1 and S3 (credential
rotation) as an expedited hotfix from the dev box within days, ahead of the rest of the backlog.
The user decides the timing.

---

## Part A: Findings

Line numbers are as of `cd05164` + working tree. Verified by reading code, `.next` manifests, and a
read-only `SELECT` against the app database; not assumed.

### A1. Security

| #   | Sev                | Finding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Where                                                                                                                 |
| --- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| S1  | **Critical** | `lib/aeries.ts` is a `"use server"` module, so `runQuery`, `runQueryStandalone`, `runParameterizedQuery` are registered Server Actions. `runQuery` calls `auth()` but never checks a session exists. `runQueryStandalone(q, true)` fabricates a district-wide session. `runQuery` is imported by client components (`Dashboard.tsx:33`, `FavoritesSectionGrid.tsx:6`, `QueryInput.tsx:4`, `CustomQueryClient.tsx:9`, `charts/BarChartCustom.tsx:6`, `SchoolEnrollmentGraph.tsx:3`), so its action ID ships in the public landing-page chunk. `middleware.ts:26` exempts `/`. Result: unauthenticated `POST /` with a `Next-Action` header runs any `SELECT`/`WITH`/`UNION` against Aeries. | `lib/aeries.ts:1,359-378,490-500`                                                                                   |
| S2  | **Critical** | `updateActiveSchool` never validates the new value against `user.schools`. `activeSchool` (default `0` = district-wide) is then trusted as the authoritative scope by `custom-query/execute/route.ts:97`, `ai-query/view-generate/route.ts:121`, `aeries.ts:426-449` (`@@asc`), and `app/[sc]/layout.tsx:21`. Any signed-in user can widen their own scope.                                                                                                                                                                                                                                                                                                                                                          | `lib/signinMiddleware.ts:247-257`                                                                                   |
| S3  | **Critical** | A live MySQL password for the app DB is committed in`settings.json` (a `sqltools.connections` block, git-tracked since `43769ff`). `.env` itself is correctly untracked.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `settings.json:25`                                                                                                  |
| S4  | High               | SQL injection in custom-query school filter: when the user has zero schools,`allowedSchools.length === 0` short-circuits to allow-all, and the raw client strings are joined into `school_id IN (...)`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `app/api/custom-query/execute/route.ts:88-90`, `lib/ai-query/view-query-builder.ts:35,55`                         |
| S5  | High               | Report pages do not enforce roles.`Query.roles`, `QueryCategory.roles`, `publicQuery` exist in the schema but are never checked server-side; filtering is client-side only. Any signed-in user can run any query by id, including HR/discipline. The page also serializes every query's id/name to every viewer.                                                                                                                                                                                                                                                                                                                                                                                                                 | `app/query/[category]/[id]/page.tsx:22-67`, `lib/getQuery.ts:183-234`                                             |
| S6  | High               | `/api/fastapi/token` returns the FastAPI service token to any signed-in user (no SPED/IEPUPLOAD role). `/api/fastapi/upload` forwards a client-supplied `Authorization` header and does no server-side file validation (type, size, count); limits exist only in the dropzone props.                                                                                                                                                                                                                                                                                                                                                                                                                                             | `app/api/fastapi/token/route.ts:5-32`, `app/api/fastapi/upload/route.ts:13-29`, `IepUploadDropzone.tsx:211-214` |
| S7  | High               | No security headers (no CSP, HSTS, frame-ancestors, nosniff, referrer-policy).`typescript.ignoreBuildErrors: true` masks a broken import in `lib/xlsx.ts:4`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `next.config.mjs:1-19`                                                                                              |
| S8  | High               | Dependencies: 17 audit findings (3 critical, 10 high).`@auth/core` 0.41.0 nested under `next-auth` (OAuth state/PKCE cookies not provider-bound; homoglyph email bypass, relevant to the `endsWith("@slusd.us")` check at `auth.ts:139`), `next` 15.5.9 DoS, `axios`, `postcss`, `ngrok` (unused). `node_modules` is stale versus the lockfile (next 15.5.9 vs 15.5.18, axios 1.13.2 vs 1.16.1, tsx broken, eslint not installed).                                                                                                                                                                                                                                                                                   | `package.json`, `node_modules`                                                                                    |
| S9  | Medium             | `/custom-query` page and route require only a session, whereas `/ai-query` requires admin/AIQUERY/SUPERADMIN. Both run generated SQL on the same views. Dashboard still links to it from `Dashboard.tsx:191-196`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `app/custom-query/page.tsx:26-33`, `execute/route.ts:21-24`                                                       |
| S10 | Medium             | `app/[sc]/layout.tsx:21` gates on `activeSchool` rather than `userCanAccessSchool(user, sc)`. Combined with S2 it is a bypass; on its own it blocks legitimate cross-school student links (UX gap U2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `app/[sc]/layout.tsx:21`                                                                                            |
| S11 | Medium             | Raw MSSQL error text returned to clients (`SQL error: ${message}`, `error.message` in JSON).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `lib/aeries.ts:479`, `custom-query/execute/route.ts:147`                                                          |
| S12 | Medium             | Rate limiting is a per-process`Map`, applied only to emulate and custom-query. `/api/ai-query/view-generate` (paid LLM calls, up to 4 per request), `/api/fastapi/*` are unlimited.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `lib/rateLimit.ts:12`                                                                                               |
| S13 | Medium             | No enforced row cap anywhere; only a prompt hint "use TOP 500" that the LLM may ignore.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `lib/ai-query/sql-validator.ts`, `view-prompt-builder.ts:294`                                                     |
| S14 | Medium             | `adminCheck()` is truthy for SUPERADMIN, SITEADMIN and PRINCIPAL alike, and the fragments API checks only `isAdmin`, so principals can edit SQL fragments. Admin page also ships all query SQL to site admins who cannot see the Queries tab.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `lib/adminCheck.ts:38`, `app/api/admin/fragments/**`, `app/admin/page.tsx:61-85,178`                            |
| S15 | Medium             | `validateQueryWhitelist` permits multiple `;`-separated statements and uses a weaker denylist than `lib/ai-query/sql-validator.ts` (missing OPENROWSET/OPENQUERY/OPENDATASOURCE/WAITFOR). Also `removeCommentsFromQuery` output is computed and then ignored (line 464 runs the original).                                                                                                                                                                                                                                                                                                                                                                                                                                     | `lib/aeries.ts:224-233,284-316,464`                                                                                 |
| S16 | Medium             | No test runner.`lib/authorization.test.ts` (node:test, 94 lines, covers deny cases) is never run; no `test` script.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `package.json`                                                                                                      |
| S17 | Low                | `getSetting`/`getAllSettings` server actions have no auth guard; `NEXT_PUBLIC_AERIES_URL` should be `AERIES_URL`; `console.log` of student-adjacent data in `TeacherStudentGradesDialog.tsx:47,55` and `getActiveSchoolInfo.ts:265`; `eslint-config-next` 14 vs next 15; `mailing/`, `test-grade-sync.ts` (declares `prisma` twice, would not compile), `scripts/remove-duplicate-grades.ts` and `migrate-fragments.ts` mutate prod with no dry-run; `QueryInput.tsx` (dead) pipes a textarea into `runQuery`; `.vscode/settings.json` tracked; `IEPUPLOAD` role exists but `app/sped/layout.tsx:15` only admits SPED/SUPERADMIN.                                                                  | various                                                                                                               |

Done well already (PR #24): `lib/authorization.ts` predicates with tests; most server actions gated
(`requireQueryEditor`, `requireAdmin`) and ignore caller-supplied user ids; emulation stored
server-side with `EmulationLog` audit and re-check of `admin` on every session; strong allowlist
validator for AI queries; `injectSecurityFilters` parenthesizes existing predicates; student page uses
`runParameterizedQuery` with bound params; no student PII sent to the LLM; `lib/env.ts` Zod
validation; `robots.ts` disallows sensitive paths.

### A2. Performance

| #   | Finding                                                                                                                                                                                                                                                                   | Where                                                                                                                 | Effort |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------ |
| P1  | AG-Grid + AG-Charts Enterprise registered at module scope in a provider wrapped around the root layout: about 3.9 MB of JS on every page including the signed-out landing page.                                                                                           | `app/components/providers/AGGridProvider.tsx:9-12`, `app/layout.tsx:48`                                           | M      |
| P2  | Dashboard re-runs every favorite chart query against MSSQL when the theme toggles (`resolvedTheme` in the fetch effect deps); deps use `chartFavorites.length` not identity.                                                                                          | `Dashboard.tsx:97-168`                                                                                              | S      |
| P3  | `auth()` is not request-memoized; called in layout, page, and again inside `runQuery`; the session callback does a 5-include Prisma query each time. About 9 MySQL round trips per report view before Aeries work. 25 call sites.                                     | `auth.ts:145-301`, `lib/aeries.ts:331,366,507`                                                                    | S      |
| P4  | `MainHeader` runs four Prisma queries on every navigation, including all queries in the DB unfiltered by role, serialized to the client where filtering happens.                                                                                                        | `MainHeader.tsx:33-67`, `ReportsDropdown.tsx:59-77`                                                               | M      |
| P5  | Report pages return unbounded row sets and serialize them into client props; AG-Grid pagination is client-side only.`quickStats` does 5 passes over the full set on every filter change.                                                                                | `app/query/[category]/[id]/page.tsx:78`, `QueryPageClient.tsx:276-300`                                            | M      |
| P6  | Grade distribution page aggregates every school year and term for every visible school although defaults are computed a few lines later; two independent awaits run sequentially.                                                                                         | `app/gradedistribution/page.tsx:30-53`, `lib/syncGradeDistribution.ts:315-335`                                    | S      |
| P7  | Sign-in fetches the entire district staff list twice and filters in JS; one Aeries request per school for teacher credentials; classes inserted one row at a time; two syncs run sequentially in the blocking`signIn` event.                                            | `lib/aeries.ts:758-872`, `lib/signinMiddleware.ts:207,305,358-398`, `auth.ts:115-133`                           | M      |
| P8  | `queryCache`: key duplicates query text, eviction is not LRU, module-scope `setInterval` never `unref()`d, no invalidation on query edit/delete or year change. Scoping is correct only because `@@sc` substitution happens before keying.                        | `lib/queryCache.ts:25-29,114-121`                                                                                   | S      |
| P9  | Zero`Suspense`, `loading.tsx` only at root and student page; no streaming for `/query/*`, `/gradedistribution`, `/admin`, `/ai-query`.                                                                                                                        | `app/**`                                                                                                            | S      |
| P10 | Default MSSQL pool opened eagerly at import; a boot-time outage becomes an unhandled rejection. No retry on transient errors. Pool config itself is sound (per-DB pools, max 10).                                                                                         | `lib/aeries.ts:170-183`                                                                                             | S      |
| P11 | `next.config.mjs`: no `optimizePackageImports`, `ignoreBuildErrors: true`.                                                                                                                                                                                          | `next.config.mjs`                                                                                                   | S      |
| P12 | Three chart libraries: ag-charts (live), recharts (only via dead components), chart.js (zero imports).`json-as-xlsx` only via dead `DataTable` path; `lib/xlsx.ts` is leftover from another project with a broken import.                                           | `package.json`, `app/components/charts/*`, `lib/xlsx.ts`                                                        | S      |
| P13 | `lib/db.ts:3` imports `toast` from sonner into the Prisma module. Prompt builder and fragment service rebuild/re-parse everything per request. AI route streams heartbeats only, not tokens, during 100 s local-model calls. Rate limiter is another per-process map. | `lib/db.ts`, `lib/prompt-builder.ts:47-66`, `lib/fragment-service.ts:21-60`, `view-generate/route.ts:158-212` | S/M    |
| P14 | Outside the repo: nginx`proxy_read_timeout` default 60 s will kill the 105 s AI query request (per `docs/ai-query-server-handoff.md`).                                                                                                                                | reverse proxy                                                                                                         | S      |

### A3. UX and functionality gaps

| #   | Finding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Where                                                                                                 | Effort |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------ |
| U1  | Report grid (canonical grid is the inline`AgGridReact` in `QueryPageClient.tsx:636`, not `DataTableAgGrid`): no totals footer, no number/percent `valueFormatter`, column types inferred from `data[0]` only (a NULL first row demotes a numeric column to text), CSV export only (Enterprise Excel export is licensed but unused), no column-state persistence, fixed `calc(100vh - 280px)` height poor on mobile.                                                                                                                                                                                                                                                                                                                                                        | `QueryPageClient.tsx:325-372,483-490,634-656`                                                       | M      |
| U2  | Student links from district-wide reports dead-end on Access Denied for users who legitimately have that school (layout checks`activeSchool`, page checks `user.schools`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `app/[sc]/layout.tsx:21`                                                                            | S      |
| U3  | Two school pickers backed by two lists: header uses`user.schools` (respects added/blocked overrides); `/profile` feeds `SchoolPicker` from raw `UserSchool` and takes the user id from the first row.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `app/profile/page.tsx:16-20`, `SchoolPicker.tsx:53-66`                                            | S      |
| U4  | School/year switch refresh strategy differs per caller (`router.refresh()` vs `router.replace(?_t=)`); some client state does not reset.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `ActiveSchool.tsx`, `YearSelector.tsx:36`, `SchoolPicker.tsx:53-57`                             | S      |
| U5  | Stubs linked as if live:`/assessment` ("Coming soon"), `/interventions` (238 lines of hard-coded fake students, banner on page only).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `app/assessment/page.tsx`, `app/interventions/page.tsx:8-256`                                     | S      |
| U6  | Admin Edit Query dialog persists only the SQL:`updateQuery(data, "query")` writes one field, so name/description/category/hiddenCols/chart edits silently do not save (local grid state makes it look saved). `chartStackKey` is a Boolean in Prisma but compared to the string `"true"`, so stacking never works, and the admin form writes a string into it. Dead breadcrumb link to `/query/<category>` (no such route). `QueryCategory.sort` never used. `widgetLinkOverride`, `chartSeriesOverride`, `publicQuery` unused.                                                                                                                                                                                                                                        | `lib/formActions.ts:40-58`, `QueryAdminGrid.tsx:287,524`, `QueryPageClient.tsx:116,455,596,687` | S      |
| U7  | Feedback uneven: admin grids toast heavily; report/data paths swallow errors into generic strings;`AIQueryClient` has 2 toasts in a multi-minute flow.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `Dashboard.tsx:142-151`, `GradeDistribution.tsx`                                                  | S      |
| U8  | Destructive admin actions: user delete and all bulk deletes use`window.confirm()`; single deletes use `AlertDialog`. Bulk delete is a sequential loop of server actions. No audit log for user/query/category/fragment mutations (only `EmulationLog`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `UserAdminGrid.tsx:375`, `QueryAdminGrid.tsx:335-342`, `FragmentAdminGrid.tsx:395`              | M      |
| U9  | Admin tabs:`defaultValue` with no URL sync; `grid-cols-${n}` dynamic Tailwind class is never generated.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `AdminTabs.tsx:70,78`                                                                               | S      |
| U10 | Accessibility: icon-only buttons without`aria-label` (`QueryPageClient.tsx:782,793`, `Dashboard.tsx:290`, `CategoryAdminGrid.tsx:276,283`, `YearSelector.tsx:46-59`). Dark mode coverage including AG-Grid themes is good.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | various                                                                                               | S      |
| U11 | Dead code with zero importers (about 2,000+ lines):`AggridChart`, `ApiGradeDistribution` (1,088-line duplicate), `AuthGuard`, `ClassBreakdownModal`, `DataGrid`, `DataTablePagination`, `DropdownSelector`, `DynamicTable`, `ExportCsvButton`, `FavoritesSectionGrid`, `QueiesSheet`, `QueryInput`, `RenewSchools`, `ReportGrid`, `Sidebar`, `TestLogButton`, `AddClassToUserButton`, `SchoolAttendanceGraph`, `GoogleAuthButton`/`SessionLogger`, `components/ui/dropzone.tsx`, empty `app/components/test.ts`, `MainFooter` imported but never rendered, `lib/xlsx.ts`, `lib/exportData.ts`, `mailing/`, root `test-grade-sync.ts`. `DataTable` (TanStack) and the recharts tree are reachable only through dead components. | `app/components/*`                                                                                  | S      |
| U12 | Only one real form (`AddQueryForm` with zod + RHF); admin edit dialogs are hand-rolled state without validation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `app/components/forms/`                                                                             | M      |

### A4. The UPP report (data facts, from a read-only SELECT)

| Field      | Value                                                                           |
| ---------- | ------------------------------------------------------------------------------- |
| id         | `cm2du2rlf0009e6fvkoogt3ze`                                                   |
| name       | `Projected CALPADS UPP(%) ` (trailing space, no space before the parenthesis) |
| URL        | `/query/ada/cm2du2rlf0009e6fvkoogt3ze`                                        |
| category   | ADA Reports (`ada`)                                                           |
| chart      | on, bar, x`School`, y `# UPP, Total`                                        |
| hiddenCols | empty                                                                           |
| roles      | none assigned                                                                   |

Output columns: `Sch#`, `School`, `# UPP`, `# ELL`, `# FR`, `# FR (no PDC)`, `Total`. All numeric
columns are integer counts (one row per school, 16 schools hard-coded in `stu.sc IN (...)`, no
`@@sc` placeholder, year taken from `Db_name()`). There is **no percent column** today despite the
name. A plain SUM footer is correct for the five count columns and wrong for `Sch#`, which is why
totals must be an explicit per-query column list rather than "sum every numeric column".

Report definitions live only in the MySQL `Query` table (30 queries, 21 categories). No seed files.

---

## Part B: Implementation plan (on the local dev box)

Order matters: Phase 1 makes the toolchain work, Phase 2 removes the exposure, Phase 3 is the
requested feature, Phases 4 to 6 are the backlog, Phase 7 ships. Each phase is a separate PR.

### Phase 1: Environment and dependencies (Tier 1 only)

1. Pull `main` (after the prod-host commit above). Confirm `.env` on the dev box points at a **dev**
   copy of MySQL, or accept that `prisma db push` in Phase 3 alters the shared app DB (it is additive:
   one nullable/defaulted column).
2. `package.json` changes:
   - `next-auth` `^5.0.0-beta.32`, `@auth/prisma-adapter` `^2.11.3`, `next` `^15.5.25`,
     `axios` `^1.20.0`, `@prisma/client` `^6.19.3`, `prisma` `^6.19.3`, `postcss` `^8.5.28`,
     `eslint-config-next` `^15.5.25` (keep eslint 8), `tsx` unchanged (fresh install restores esbuild),
     add `ag-grid-community` `^33.3.2` explicitly (imported directly in 6 files but only transitive).
   - Remove `ngrok` and `chart.js`. Keep `recharts` and `json-as-xlsx` until Phase 6 deletes their
     last importers, then remove them too.
   - Add `"test": "tsx --test lib/*.test.ts"`.
   - `overrides`: keep `glob`; after install run `npm audit --omit=dev` and `npm ls @auth/core postcss deepmerge-ts`,
     and add overrides for `@auth/core` (`^0.41.3`), `deepmerge-ts`, or `postcss` **only if still flagged**
     (next-auth beta.30 exact-pinned a nested `@auth/core` 0.41.0; verify beta.32's pin).
3. `rm -rf node_modules && npm install`, `npx prisma generate`, `npm test`, `npm run lint`,
   `npx tsc --noEmit | grep "error TS" | sort > tsc-baseline.txt` (pre-existing errors expected, e.g. `lib/xlsx.ts`).
4. After install, re-grep `node_modules/@auth/core/lib/utils/cookie.js` for `session-token`: the
   middleware relies on the cookie names `authjs.session-token` / `__Secure-authjs.session-token`.
5. Verify `next dev` works on the dev box, sign in, open one report. This is the first time
   `eslint-config-next` 15 runs here, so expect lint backlog; fix only blockers.

Deferred majors and their concrete breakage in this repo (for a later branch): Next 16
(`middleware.ts` becomes `proxy.ts`, `next lint` removed), React 19 (peer blockers `next-themes` 0.3,
`lucide-react` 0.396, `react-dropzone` 14; 28 `forwardRef` files in `components/ui`), Prisma 7
(`prisma.config.ts`, driver adapter in `lib/db.ts`, generator rename), AG Grid 34 to 36 with AG Charts
in lockstep (theming API already in use; confirm license renewal date first or the grid watermarks),
Tailwind 4 (config to CSS `@theme`, `tailwindcss-animate` replacement).

### Phase 2: Security fixes

**S1 (do first, small refactor).**

- `lib/aeries.ts`: remove `"use server"`, add `import "server-only"`. Add `await requireUser()`
  (from `lib/authGuard.ts`) at the top of `runQuery` and `runParameterizedQuery`. Delete the
  `standalone` bypass in `runQueryStandalone`; scripts that need it get their own non-action
  entrypoint under `scripts/`.
- Add one new server action file, e.g. `lib/actions/runSavedQuery.ts` (`"use server"`), exporting
  `runSavedQuery(queryId: string)`: `requireUser()`, load the `Query` with `category.roles` and
  `roles`, enforce the role check (shared helper from S5), then `runQuery(query.query)`. Never accepts
  SQL text from the client.
- Replace every client-side `runQuery(sql)` call with `runSavedQuery(id)`: `Dashboard.tsx:33`,
  `charts/BarChartCustom.tsx:6`, `CustomQueryClient.tsx:9` (custom query goes through its API route
  already; drop the import). `FavoritesSectionGrid`, `QueryInput`, `SchoolEnrollmentGraph` are dead
  and get deleted in Phase 6; delete them here if that is simpler than patching.
- Verify: `grep -rn "lib/aeries" app | xargs grep -l '"use client"'` returns nothing; the action id
  for `runQuery` no longer appears in `.next/static/chunks/app/page-*.js` after a build.

**S3.** Delete the `sqltools.connections` block from `settings.json`; add `settings.json` and
`.vscode/` to `.gitignore`; **rotate the `data_user` MySQL credential** (user action, on the DB
server) and update `.env` on prod and dev. Purging the blob from git history is optional and
destructive to shared history; rotation is what actually matters.

**S2 + S10 + U2 (school scoping pass).**

- `lib/signinMiddleware.ts` `updateActiveSchool`: reject any value not in `sessionUser.schools`
  (allow `0` only when the user has at least one school; admins may keep `0`).
- Add `resolveSchoolScope(user)` in `lib/authorization.ts` returning the intersection of
  `activeSchool` with `user.schools` (admins: unrestricted). Use it in
  `app/api/custom-query/execute/route.ts:97`, `app/api/ai-query/view-generate/route.ts:121`,
  `lib/aeries.ts` `@@asc` substitution.
- `app/[sc]/layout.tsx:21`: replace the `activeSchool` comparison with
  `userCanAccessSchool(user, Number(params.sc))` from `lib/authorization.ts:53`. Add tests to
  `lib/authorization.test.ts` for `resolveSchoolScope`.

**S4.** In `custom-query/execute/route.ts:88-90`: parse every `schoolFilter` element with
`Number.parseInt`, reject non-integers (reuse `validateSchoolCodes` from `lib/aeries.ts:241`),
and treat `allowedSchools.length === 0` as deny for non-admins.

**S5 (report authorization).**

- New helper `userCanRunQuery(user, query)` in `lib/authorization.ts`: true if user is admin, or
  `query.publicQuery`, or the user holds any role in `query.roles` or `query.category.roles`; if
  the query and its category have no roles at all, keep today's behaviour (any signed-in user) so
  existing reports keep working, and log a warning listing such queries at admin page load.
- Enforce in `app/query/[category]/[id]/page.tsx` (return `notFound()`), `lib/getQuery.ts`
  `getQueryData`, and the new `runSavedQuery`. Filter `allQueries` and categories passed to the
  client by the same predicate (also fixes P4 partially). Validate that `urlCategory` matches the
  query's category or redirect to the canonical URL.

**S6.** Delete `app/api/fastapi/token/route.ts`. In `upload/route.ts`: require the SPED or
IEPUPLOAD role (fix `app/sped/layout.tsx:15` to admit IEPUPLOAD too), mint the FastAPI token
server-side via `lib/fastAPI.ts`, and validate every `File` entry: `type === "application/pdf"`,
`%PDF-` magic bytes, size <= 10 MB, count <= 10. Update `IepUploadDropzone.tsx` to stop fetching a
token. Add rate limiting (S12).

**S7.** `next.config.mjs`: add `headers()` with `Strict-Transport-Security`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
`X-Frame-Options: DENY`, `Permissions-Policy`, and a CSP in **report-only** mode first
(`Content-Security-Policy-Report-Only`) because AG-Grid/AG-Charts and Google sign-in need
`'unsafe-inline'` styles and specific script origins; promote to enforcing after a week of clean
reports. Add `experimental.optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']` (P11).
Remove `typescript.ignoreBuildErrors` once Phase 6 deletes `lib/xlsx.ts` and `tsc` is clean.

**S9.** Decide custom-query's fate: it is half-removed. Recommended: gate `app/custom-query/page.tsx`
and `execute/route.ts` with the same `canAccessAI` check as `app/ai-query/page.tsx:16-23`, and remove
the leftover header button at `Dashboard.tsx:191-196` if the tile stays removed.

**S11.** In `runQuery` catch and the custom-query route: log the driver error with a generated
correlation id server-side, return `"Query failed (ref <id>)"` to the client; show the full message
only when `user.admin || isQueryEditor`.

**S12.** Apply `rateLimit` to `/api/ai-query/view-generate` (e.g. 10/min/user) and
`/api/fastapi/upload` (5/min). Keep in-memory (single instance); note in the file header.

**S13.** In `lib/aeries.ts` `runQuery`: after execution, if `recordset.length > MAX_ROWS` (10,000),
truncate and return `{ rows, truncated: true }`; report pages show a banner "Showing first 10,000
rows, refine the query". For AI/custom queries, reject SQL without `TOP n` (n <= 5000) in
`sql-validator.ts`.

**S14.** Fragments routes: require `result.isQueryEditor` from `adminCheck()` rather than truthiness.
`app/admin/page.tsx`: fetch `queries` (with SQL) only when the viewer is a query editor, mirroring
how `users` is already withheld.

**S15.** `validateQueryWhitelist`: reject `;` outside string literals; merge the blocklist with the
one in `lib/ai-query/sql-validator.ts:41-59` (single shared constant). Execute `cleanQuery` or stop
computing it.

**S16.** `npm test` in CI (add `.github/workflows/ci.yml`: install, `prisma generate`, `tsc --noEmit`,
`lint`, `test`, `next build`).

**S17.** Guard `getSetting`/`getAllSettings` with `requireUser()`; rename `NEXT_PUBLIC_AERIES_URL` to
`AERIES_URL` (update `lib/env.ts`, `.env.example`, both `.env` files); remove the console.logs; move
`scripts/remove-duplicate-grades.ts`, `scripts/migrate-fragments.ts` under `scripts/dangerous/` with
a `--confirm` flag; delete `test-grade-sync.ts` and `mailing/`.

### Phase 3: Column totals footer, with UPP %

**Data model.** `prisma/schema.prisma`, model `Query`: add
`totalColumns String @default("") @db.Text`. Format: comma-separated entries, each
`<column>` (defaults to `sum`) or `<column>:<fn>` where `fn` is `sum | avg | min | max | count | ratio(<numeratorCol>,<denominatorCol>)`. Example for UPP:
`# UPP, # ELL, # FR, # FR (no PDC), Total, UPP %:ratio(# UPP,Total)`. Then `npx prisma db push`
and `npx prisma generate`. Parsing lives in one new module `lib/reportTotals.ts` (pure functions,
unit-tested with node:test): `parseTotalColumns(str)`, `computeTotalsRow(rows, specs, labelColumn)`.

**Server.** `app/query/[category]/[id]/page.tsx:84-88`: parse `result.totalColumns` next to
`hiddenColumns` and pass `totalSpecs` as a prop (the page already does `findUnique` without
`select`, so the new column arrives for free).

**Client** (`app/query/[category]/[id]/QueryPageClient.tsx`):

- Extend `QueryPageClientProps` (lines 107-131) with `totalSpecs`.
- New `pinnedBottomRow = useMemo(...)` next to `quickStats` (line 276): compute over
  `selectedRows.length ? selectedRows : filteredData` (same source as `quickStats`, so it
  recomputes on filter/sort/selection with no new handlers, because `updateFilteredData` at 316-322
  already runs on `onFilterChanged` and `onSortChanged`). `ratio` = `100 * sum(num) / sum(den)`,
  guarded for zero. Put the label `"Total"` (or `"Selected"` when a selection is active) in the
  first column that is not totaled and holds strings (`School` here); fall back to the first column.
  Return `undefined` when `totalSpecs` is empty.
- Pass `pinnedBottomRowData={pinnedBottomRow}` to `AgGridReact` (line 636). Pinned rows are included
  in CSV export by default and stay visible across pagination pages, which is why `pinnedBottomRowData`
  is chosen over `grandTotalRow` (which needs `aggFunc` per column, cannot express a ratio of two
  other columns, and sits on the last page only).
- Column defs (lines 340-372): add `cellClass` for `params.node.rowPinned === "bottom"` (bold,
  top border); guard `IdCellRenderer` with `if (props.node.rowPinned) return value` so the pinned
  row never links to `/undefined/student/Total`; add a `valueFormatter` for number columns
  (`toLocaleString`, percent columns detected by a `%` in the header render with 1 decimal and a
  `%` suffix); infer column type from the first non-null value across up to 50 rows instead of
  `data[0]` alone (fixes the NULL-first-row bug in U1).
- Also apply the same footer to `DataTableAgGrid.tsx` behind an optional `totalSpecs` prop so AI
  and custom queries can use it later (optional; the shared-grid work in Phase 5 makes this free).

**Admin.**

- `lib/formActions.ts`: replace the single-field `updateQuery(data, field)` with
  `updateQuery(id, data)` validated by a zod schema whitelisting the editable Query fields
  (`name, categoryId, description, query, chart, chartXKey, chartYKey, chartTypeKey, chartStackKey (boolean), hiddenCols, totalColumns, publicQuery`). Fixes U6 as a side effect. Update the single
  call site `QueryAdminGrid.tsx:287`.
- `QueryAdminGrid.tsx` edit dialog: add a "Total Columns" input beside "Hidden Columns" (lines
  558-566) with helper text showing the `col:fn` and `ratio(a,b)` syntax; make `chartStackKey` a
  checkbox. Fix `QueryPageClient.tsx:116,455` to treat `chartStackKey` as boolean.
- `app/components/forms/AddQueryForm.tsx:59-71,100-112` and `formActions.ts` `addQuery`: add
  `totalColumns`.

**UPP report content change (data, done through the admin UI after deploy, or a one-off script).**

- Add a `UPP %` column to the SQL's final SELECT, as a number not a string, e.g.
  `CAST(100.0 * SUM(<UPP case>) / NULLIF(COUNT(all_stu.id), 0) AS DECIMAL(5,1)) AS 'UPP %'`
  (reuse the exact `# UPP` CASE expression). Fix the name to `Projected CALPADS UPP (%)`.
- Set `totalColumns` to `# UPP, # ELL, # FR, # FR (no PDC), Total, UPP %:ratio(# UPP,Total)`.
  `Sch#` deliberately excluded. Consider `chartYKey` `# UPP, Total` unchanged.
- Note `lib/queryCache.ts` holds results 300 s, so re-test after the TTL or after implementing P8's
  invalidation on query edit.

### Phase 4: Performance

- **P3.** Wrap `auth()` with React `cache()` (export `getSession = cache(auth)` from `auth.ts` or
  a new `lib/session.ts`) and switch the 25 call sites; `runQuery` accepts an optional pre-fetched
  session.
- **P2.** `Dashboard.tsx:97-168`: split fetch effect from theme; derive `chartOptions` in a
  `useMemo` on `resolvedTheme`; depend on favorite ids, not `length`.
- **P4.** `MainHeader.tsx`: filter categories and queries server-side with `userCanRunQuery` (S5)
  and cache the catalogue with `unstable_cache` keyed by role set, revalidated from the query/category
  server actions (`revalidateTag("query-catalogue")`).
- **P5/S13.** Row cap plus truncation banner (done in S13). Memoize `quickStats` by column.
- **P6.** `app/gradedistribution/page.tsx`: pass `schoolYear` and `term` into
  `aggregateTeacherGradeSummaries`; `Promise.all` the two independent awaits.
- **P7.** `lib/aeries.ts`: fetch one staff member by email (Aeries API supports
  `/api/v5/staff?email=` or the per-id endpoint; verify against the district's Aeries version),
  dedupe the two `getAeriesStaff` calls in sign-in, `createMany` classes then one `findMany`,
  `Promise.all` the two syncs in `auth.ts:115-133`.
- **P8.** `lib/queryCache.ts`: key on `{sql, dbYear}` only once, make `get` reorder for true LRU,
  `unref()` the interval, add `invalidateByQueryId` called from `updateQuery`/`deleteQuery`, and
  clear on `updateActiveDbYear`.
- **P1.** Move `AGGridProvider` out of `app/layout.tsx` into a `(grid)` route group layout (or
  `next/dynamic` with `ssr: false`) so the landing page and non-grid routes do not load AG-Grid.
  Register only needed modules instead of `AllEnterpriseModule` once the shared grid (Phase 5)
  clarifies which are used. Measure with `.next/app-build-manifest.json` before and after.
- **P9.** Add `loading.tsx` to `app/query/[category]/[id]/`, `app/gradedistribution/`, `app/admin/`,
  `app/ai-query/`; wrap the grid in `Suspense` so breadcrumbs stream first.
- **P10.** Make the default pool lazy (remove the import-time `poolPromise` or attach a `.catch`);
  add one retry with backoff for transient MSSQL codes (`ETIMEOUT`, `ECONNRESET`).
- **P13.** Remove `toast` import from `lib/db.ts`; memoize prompt building per fragment-library
  version; consider token streaming in `view-generate` later.
- **P14.** Raise nginx `proxy_read_timeout` for `/api/ai-query/` to 300 s (outside repo; document in
  `docs/ai-query-server-handoff.md`).

### Phase 5: UX and functionality

- **U1 shared grid.** Extract the inline grid from `QueryPageClient.tsx` into
  `app/components/ReportDataGrid.tsx` (props: rows, hiddenColumns, totalSpecs, onFilteredChange,
  exportName). Have `DataTableAgGrid.tsx` use it. Add: Excel export via `gridApi.exportDataAsExcel`
  (Enterprise, already licensed) next to CSV at `QueryPageClient.tsx:856`; column-state persistence
  per query id in `localStorage` (the file already persists query history at 162-188) with a
  "Reset columns" action; responsive height (`min-h` with flex instead of fixed calc).
- **U3/U4.** `/profile` renders `ActiveSchool` fed from `user.schools`; delete `SchoolPicker.tsx`.
  One `useSchoolYearSwitch()` hook (action + `router.refresh()` + toast) used by `ActiveSchool`
  and `YearSelector`.
- **U5.** Mark Assessment and Interventions as "Preview" in nav and dashboard tiles; keep the
  interventions banner.
- **U6.** Fixed by Phase 3 (`updateQuery`, `chartStackKey`). Remove the dead breadcrumb link or add
  `app/query/[category]/page.tsx` listing that category's reports (small, useful). Order categories
  by `sort` then `label`.
- **U7.** Toasts on refresh, export, AI generation success/failure; show the error reason to query
  editors (S11).
- **U8.** Replace `window.confirm` with `AlertDialog` (typed confirmation for bulk and user
  deletes); bulk delete via one server action taking ids. Add `AdminAuditLog` model
  (`actorId, action, entity, entityId, before Json?, after Json?, createdAt`) written from
  `addQuery/updateQuery/deleteQuery`, category actions, `updateUser`, fragments routes; read-only
  "Audit" tab for SUPERADMIN.
- **U9.** `AdminTabs.tsx`: drive the tab from `?tab=`; replace `grid-cols-${n}` with an explicit
  map.
- **U10.** `aria-label` on every icon-only button listed; run an axe pass on the report page.
- **U12.** Convert the Edit Query and Edit User dialogs to zod + react-hook-form using
  `AddQueryForm`'s pattern.

### Phase 6: Cleanup

Delete the dead files listed in U11 (verify each with `grep -rn "<Name>" app lib components`
before deleting), then remove `recharts`, `json-as-xlsx`, `components/ui/chart.tsx`, `lib/xlsx.ts`,
`lib/exportData.ts`, `DataTable.tsx`. Remove `typescript.ignoreBuildErrors` once `tsc --noEmit` is
clean. Update `CLAUDE.md` ("Charts: AG-Charts Enterprise" only; add "never run `next dev` or
`next build` on the prod host"; add `npm test`). Regenerate `docs/` or delete the 180 stub module
docs, which are auto-generated noise.

### Phase 7: Deploy to production (maintenance window, about 5 to 8 minutes)

There is no safe in-place "build while serving": `next build` deletes `.next/server` first and
`npm ci` deletes `node_modules` under the running process. A `.next` built elsewhere cannot be
swapped in because 48 server chunks bake the absolute path `/home/administrator/data-slusd`.

```
cd /home/administrator/data-slusd
git status --short                      # must be clean
git pull --ff-only
sudo systemctl stop data-slusd
mv node_modules node_modules.prev
rsync -a --exclude cache .next/ .next.prev/
npm ci
npx prisma generate
npx prisma db push                      # Phase 3 column (additive) and AdminAuditLog table
npm run build
sudo systemctl start data-slusd
```

Verify:

```
sudo systemctl status data-slusd --no-pager
journalctl -u data-slusd -n 100 --no-pager
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/                    # 200
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/api/auth/providers  # 200
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/admin               # 307
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/api/admin/fragments # 401
```

Then sign in, open `/query/ada/cm2du2rlf0009e6fvkoogt3ze`, confirm the totals row. Rollback: stop
service, `mv node_modules.prev node_modules`, `rm -rf .next && mv .next.prev .next`, revert
`package.json`/lockfile, start. Delete the `.prev` copies after 24 clean hours.

---

## Part C: Verification checklist (dev box, per phase)

- `npm test` passes, including new tests for `lib/reportTotals.ts` (`parseTotalColumns`,
  `computeTotalsRow` with sum/avg/ratio/zero-denominator/null cells) and `resolveSchoolScope` /
  `userCanRunQuery` in `lib/authorization.test.ts`.
- `npx tsc --noEmit` shows no new errors versus `tsc-baseline.txt`; zero errors by end of Phase 6.
- `npm audit --omit=dev` shows no critical or high.
- Security manual checks: unauthenticated `POST /` with the old `runQuery` action id returns an
  error and no data; a non-admin user with school 15 cannot set `activeSchool` to 16 or 0; opening
  a report whose category role the user lacks returns 404; `/api/fastapi/token` is gone;
  `/api/fastapi/upload` rejects a `.txt` renamed to `.pdf`; response headers include HSTS, nosniff,
  frame-options.
- Totals: on the UPP report the footer shows sums for the five count columns, `UPP %` equal to
  `100 * sum(# UPP) / sum(Total)` to one decimal, `Sch#` blank, label "Total" under `School`;
  filtering to three schools recomputes the footer; selecting two rows shows "Selected"; CSV and
  Excel exports include the footer; a report with empty `totalColumns` shows no footer; editing
  Total Columns in the admin dialog persists after reload (verifies the `updateQuery` fix).
- Performance: `/layout` JS in `.next/app-build-manifest.json` drops from about 3.9 MB once
  AG-Grid leaves the root layout; a report page view issues one session lookup (log Prisma queries
  in dev with `log: ['query']` temporarily); toggling dark mode on the dashboard triggers no MSSQL
  queries.
- Lint: `npm run lint` clean of errors.
