# Database Schema

## Overview

- **Dialect:** generic
- **Tables:** 20
- **Views:** 0
- **Stored Procedures/Functions:** 0

## Tables

### User


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `name` | String | NO |  | None |
| `email` | String | NO |  | None |
| `image` | String | YES |  | None |
| `admin` | Boolean | NO |  | false |
| `createdAt` | DateTime | NO |  | now( |
| `updatedAt` | DateTime | NO |  | None |
| `queryEdit` | Boolean | NO |  | false |
| `primaryRole` | ROLE | NO |  | USER |
| `emailVerified` | DateTime | YES |  | None |
| `primarySchool` | Int | YES |  | None |
| `psl` | Int | YES |  | None |
| `activeSchool` | Int | NO |  | 0 |
| `manualSchool` | Int | YES |  | None |
| `emulatingId` | String | YES |  | None |
| `blockedSchools` | String | YES |  | None |
| `addedSchools` | String | YES |  | None |
| `blockedRoles` | String | YES |  | None |
| `addedRoles` | String | YES |  | None |
| `favorites` | Query[] | NO |  | None |
| `Account` | Account | YES |  | None |
| `Authenticator` | Authenticator[] | NO |  | None |
| `Session` | Session[] | NO |  | None |
| `UserClass` | UserClass[] | NO |  | None |
| `UserRole` | UserRole[] | NO |  | None |
| `UserSchool` | UserSchool[] | NO |  | None |
| `userRole` | Role[] | NO |  | None |
| `school` | SchoolInfo[] | NO |  | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:10`*

### Account


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `userId` | String | NO |  | None |
| `type` | String | NO |  | None |
| `provider` | String | NO |  | None |
| `providerAccountId` | String | NO |  | None |
| `refresh_token` | String | YES |  | None |
| `access_token` | String | YES |  | None |
| `expires_at` | Int | YES |  | None |
| `token_type` | String | YES |  | None |
| `scope` | String | YES |  | None |
| `id_token` | String | YES |  | None |
| `session_state` | String | YES |  | None |
| `createdAt` | DateTime | NO |  | now( |
| `refresh_token_expires_in` | Int | YES |  | None |
| `updatedAt` | DateTime | NO |  | None |
| `user` | User | NO | FK | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:42`*

### Session


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `sessionToken` | String | NO |  | None |
| `userId` | String | NO |  | None |
| `expires` | DateTime | NO |  | None |
| `createdAt` | DateTime | NO |  | now( |
| `updatedAt` | DateTime | NO |  | None |
| `user` | User | NO | FK | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:64`*

### VerificationToken


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `identifier` | String | NO |  | None |
| `token` | String | NO |  | None |
| `expires` | DateTime | NO |  | None |



*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:76`*

### Authenticator


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `credentialID` | String | NO |  | None |
| `userId` | String | NO |  | None |
| `providerAccountId` | String | NO |  | None |
| `credentialPublicKey` | String | NO |  | None |
| `counter` | Int | NO |  | None |
| `credentialDeviceType` | String | NO |  | None |
| `credentialBackedUp` | Boolean | NO |  | None |
| `transports` | String | YES |  | None |
| `user` | User | NO | FK | None |



*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:84`*

### Role


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `role` | ROLE | NO |  | None |
| `queryId` | String | YES |  | None |
| `Query` | Query | YES | FK | None |
| `UserRole` | UserRole[] | NO |  | None |
| `QueryCategory` | QueryCategory[] | NO |  | None |
| `users` | User[] | NO |  | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:98`*

### SchoolInfo


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `sc` | String | NO |  | None |
| `name` | String | NO |  | None |
| `logo` | String | YES |  | None |
| `UserSchool` | UserSchool[] | NO |  | None |
| `users` | User[] | NO |  | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:110`*

### UserSchool


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `userId` | String | NO |  | None |
| `schoolSc` | String | NO |  | None |
| `school` | SchoolInfo | NO | FK | None |
| `user` | User | NO | FK | None |



*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:119`*

### UserRole


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `userId` | String | NO |  | None |
| `roleId` | String | NO |  | None |
| `role` | Role | NO | FK | None |
| `user` | User | NO | FK | None |



*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:129`*

### UserClass


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `classId` | String | NO |  | None |
| `userId` | String | NO |  | None |
| `class` | Class | NO | FK | None |
| `user` | User | NO | FK | None |



*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:139`*

### Class


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `sc` | Int | NO |  | None |
| `tn` | Int | NO |  | None |
| `psl` | Int | NO |  | None |
| `email` | String | YES |  | None |
| `StaffID2` | Int | YES |  | None |
| `StaffID3` | Int | YES |  | None |
| `activeOverride` | Boolean | NO |  | false |
| `UserClass` | UserClass[] | NO |  | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:149`*

### Query


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `query` | String | NO |  | None |
| `name` | String | NO |  | None |
| `label` | String | NO |  | None |
| `createdBy` | String | NO |  | None |
| `description` | String | NO |  | None |
| `publicQuery` | Boolean | NO |  | false |
| `categoryId` | String | YES |  | None |
| `hiddenCols` | String | NO |  | "" |
| `chart` | Boolean | NO |  | false |
| `chartXKey` | String | YES |  | None |
| `chartYKey` | String | YES |  | None |
| `chartTypeKey` | String | YES |  | None |
| `chartStackKey` | Boolean | NO |  | false |
| `widgetLinkOverride` | String | YES |  | None |
| `chartSeriesOverride` | String | YES |  | None |
| `Chart` | Chart[] | NO |  | None |
| `category` | QueryCategory | YES | FK | None |
| `roles` | Role[] | NO |  | None |
| `User` | User[] | NO |  | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:161`*

### QueryCategory


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `label` | String | NO |  | None |
| `value` | String | NO |  | None |
| `sort` | Int | NO |  | 0 |
| `queries` | Query[] | NO |  | None |
| `roles` | Role[] | NO |  | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:186`*

### Chart


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `type` | CHARTTYPE | NO |  | None |
| `title` | String | NO |  | None |
| `chartConfig` | Json | NO |  | None |
| `queryId` | String | NO |  | None |
| `query` | Query | NO | FK | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:195`*

### GradeDistribution


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `source` | String | YES |  | None |
| `schoolYear` | String | NO |  | None |
| `sc` | Int | NO |  | None |
| `studentId` | String | NO |  | None |
| `studentNumber` | String | NO |  | None |
| `grade` | String | YES |  | None |
| `gender` | String | YES |  | None |
| `period` | String | YES |  | None |
| `departmentCode` | String | YES |  | None |
| `course` | String | YES |  | None |
| `divisionCode` | String | YES |  | None |
| `courseNumber` | String | YES |  | None |
| `courseTitle` | String | YES |  | None |
| `teacherNumber` | String | NO |  | None |
| `section` | String | YES |  | None |
| `term` | String | NO |  | None |
| `mark` | String | NO |  | None |
| `teacherName` | String | NO |  | None |
| `specialEd` | String | YES |  | None |
| `ell` | String | YES |  | None |
| `ard` | String | YES |  | None |
| `dli` | String | YES |  | None |
| `createdAt` | DateTime | NO |  | now( |
| `updatedAt` | DateTime | NO |  | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:209`*

### TeacherGradeSummary


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|



*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:252`*

### AIFragment


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `fragmentId` | String | NO |  | None |
| `name` | String | NO |  | None |
| `description` | String | NO |  | None |
| `snippet` | String | NO |  | None |
| `type` | FragmentType | NO |  | None |
| `categoryId` | String | NO |  | None |
| `subcategory` | String | NO |  | None |
| `tables` | String | NO |  | "[]" |
| `dependencies` | String | NO |  | "[]" |
| `conflicts` | String | NO |  | "[]" |
| `parameters` | String | NO |  | "[]" |
| `outputColumns` | String | NO |  | "[]" |
| `tags` | String | NO |  | "[]" |
| `isActive` | Boolean | NO |  | true |
| `sortOrder` | Int | NO |  | 0 |
| `createdAt` | DateTime | NO |  | now( |
| `updatedAt` | DateTime | NO |  | None |
| `category` | AIFragmentCategory | NO | FK | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:322`*

### AIFragmentCategory


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `name` | String | NO |  | None |
| `displayName` | String | NO |  | None |
| `description` | String | YES |  | None |
| `sortOrder` | Int | NO |  | 0 |
| `isActive` | Boolean | NO |  | true |
| `createdAt` | DateTime | NO |  | now( |
| `updatedAt` | DateTime | NO |  | None |
| `fragments` | AIFragment[] | NO |  | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:348`*

### AICteQuery


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `cteId` | String | NO |  | None |
| `name` | String | NO |  | None |
| `description` | String | NO |  | None |
| `cteSql` | String | NO |  | None |
| `joinColumn` | String | NO |  | None |
| `outputColumns` | String | NO |  | None |
| `tables` | String | NO |  | "[]" |
| `tags` | String | NO |  | "[]" |
| `isActive` | Boolean | NO |  | true |
| `sortOrder` | Int | NO |  | 0 |
| `createdAt` | DateTime | NO |  | now( |
| `updatedAt` | DateTime | NO |  | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:371`*

### AeriesColumnMeta


| Column | Type | Nullable | Key | Default |
|--------|------|----------|-----|---------|
| `id` | String | NO | PK | cuid( |
| `tableName` | String | NO |  | None |
| `columnName` | String | NO |  | None |
| `displayName` | String | NO |  | None |
| `description` | String | YES |  | None |
| `dataType` | String | YES |  | None |
| `exampleValues` | String | YES |  | None |
| `isActive` | Boolean | NO |  | true |
| `createdAt` | DateTime | NO |  | now( |
| `updatedAt` | DateTime | NO |  | None |

**Primary Key:** id


*Source: `C:\Users\dmellons\projects\data-slusd\prisma\schema.prisma:390`*





## Query Patterns in Code

### By Framework


| Framework | SELECT | INSERT | UPDATE | DELETE |
|-----------|--------|--------|--------|--------|
| prisma | 20 | 0 | 4 | 14 |
| raw | 23 | 4 | 12 | 1 |
| sqlalchemy | 17 | 4 | 15 | 3 |

### Tables Referenced

| Table | Operations | Files |
|-------|------------|-------|
| `User` | OTHER | C:\Users\dmellons\projects\data-slusd\auth.ts, C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js... |
| `SQL` | OTHER | C:\Users\dmellons\projects\data-slusd\test-grade-sync.ts, C:\Users\dmellons\projects\data-slusd\lib\syncGradeDistribution.ts |
| `tch` | OTHER | C:\Users\dmellons\projects\data-slusd\lib\aeries.ts, C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js... |
| `the` | OTHER | C:\Users\dmellons\projects\data-slusd\lib\formActions.ts, C:\Users\dmellons\projects\data-slusd\lib\query-composer.ts, C:\Users\dmellons\projects\data-slusd\app\api\ai-query\generate\route.ts... |
| `GradeDistribution` | OTHER | C:\Users\dmellons\projects\data-slusd\lib\prismaActions.ts, C:\Users\dmellons\projects\data-slusd\lib\syncGradeDistribution.ts |
| `for` | OTHER | C:\Users\dmellons\projects\data-slusd\lib\query-composer.ts |
| `filters` | OTHER | C:\Users\dmellons\projects\data-slusd\lib\query-composer.ts |
| `of` | OTHER | C:\Users\dmellons\projects\data-slusd\lib\query-composer.ts |
| `STF` | OTHER | C:\Users\dmellons\projects\data-slusd\lib\signinMiddleware.ts, C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js... |
| `Aeries` | OTHER | C:\Users\dmellons\projects\data-slusd\lib\signinMiddleware.ts, C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js... |
| `USR` | OTHER | C:\Users\dmellons\projects\data-slusd\lib\signinMiddleware.ts, C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js... |
| `DB` | OTHER | C:\Users\dmellons\projects\data-slusd\lib\signinMiddleware.ts, C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js... |
| `STU` | OTHER, SELECT | C:\Users\dmellons\projects\data-slusd\scripts\update-fragments.ts, C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js... |
| `COD` | OTHER | C:\Users\dmellons\projects\data-slusd\scripts\update-fragments.ts |
| `clause` | OTHER | C:\Users\dmellons\projects\data-slusd\app\api\ai-query\generate\route.ts |
| `real` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\ai-query\page.js... |
| `webpack` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\ai-query\page.js... |
| `ssgCacheKey` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\app\ai-query\page.js... |
| `being` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\app\page.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js... |
| `a` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js... |
| `some` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `acquireTokenSilent` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `requesting` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `local` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `and` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `network` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `cache` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\webpack.js... |
| `key` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `extraQueryParameters` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `request` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next-auth.js |
| `memory` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `an` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\readable-stream.js |
| `certificate` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `within` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\tedious.js |
| `ADFS` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `each` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `server` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app-pages-internals.js |
| `IdToken` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `interface` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `AccountInfo` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `account` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `response` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `set` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `space` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `array` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `user` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `given` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `disk` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `newState` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `ADAL` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@azure.js |
| `overflowing` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@floating-ui.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\page.js... |
| `having` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\@radix-ui.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\page.js |
| `one` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-charts-community.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js... |
| `theme` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-charts-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\page.js... |
| `pool` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-charts-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\page.js... |
| `trying` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `creating` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `their` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `dom` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `SyncService` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `moving` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `following` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `position` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `DOM` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `API` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `Grid` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js... |
| `event` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `filter` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js... |
| `inside` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-community.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js... |
| `Operator` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `childrenMapped` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `childrenAfterGroup` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `all` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\mssql.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js... |
| `operator` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `operators` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `labels` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `values` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `other` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `last` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `defaultColDef` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `node` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `provided` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `column` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `getData` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-enterprise.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `working` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\ag-grid-react.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\ai-query\page.js... |
| `context` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\cmdk.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js |
| `visual` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\cmdk.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js |
| `tagged` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\mssql.js |
| `database` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next-auth.js |
| `session` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next-auth.js |
| `browser` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next-auth.js |
| `allowing` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next-auth.js |
| `chunked` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next-auth.js |
| `that` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next-auth.js |
| `tail` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js |
| `its` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js |
| `input` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js |
| `prerenders` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js |
| `either` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `this` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js, C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\readable-stream.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js... |
| `app` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `treeAtTimeOfPrefetch` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `Normalize` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `unknown` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js |
| `index` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js |
| `data` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\next.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `DDL` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\sql-formatter.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js |
| `ONLY` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\sql-formatter.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js |
| `functions` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\sql-formatter.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js |
| `int` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\sql-formatter.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js |
| `classParts` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\tailwind-merge.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\page.js... |
| `hashlru` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\tailwind-merge.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\page.js... |
| `https` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\tailwind-merge.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\page.js... |
| `Position` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\tailwind-merge.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\page.js... |
| `occurring` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\tedious.js |
| `sp_prepare` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\tedious.js |
| `require` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\vendor-chunks\tedious.js |
| `school` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js, C:\Users\dmellons\projects\data-slusd\.next\static\webpack\app\admin\page.38dc28df7ee922a2.hot-update.js... |
| `role` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\app\admin\page.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js, C:\Users\dmellons\projects\data-slusd\.next\static\webpack\app\admin\page.38dc28df7ee922a2.hot-update.js... |
| `localStorage` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\server\app\query\[category]\[id]\page.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\query\[category]\[id]\page.js |
| `automatically` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `leaking` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `it` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `FlightRouterState` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `__PAGE__` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `page` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `multiple` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `similar` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `vm` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `render` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `whatever` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\main-app.js |
| `module` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\webpack.js |
| `disposed` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\webpack.js |
| `previous` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\webpack.js |
| `nodejs` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\layout.js |
| `is` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js |
| `controlled` | OTHER | C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\admin\page.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\ai-query\page.js, C:\Users\dmellons\projects\data-slusd\.next\static\chunks\app\query\[category]\[id]\page.js |



---

## Notes

This database schema appears to manage user authentication, authorization, and possibly educational institution-related data. Notable patterns include tables for user management, session tracking, role-based access control, and school information, indicating a system that integrates identity verification with institutional affiliations. Potential optimization considerations could involve indexing frequently queried fields such as `userId` and `sessionToken` to improve query performance, and normalizing further if there are redundant data structures across tables.
