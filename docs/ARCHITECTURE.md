# data-slusd - Architecture

**Location**: `C:\Users\dmellons\projects\data-slusd`
**Last Updated**: 2025-12-09

## System Overview

The described TypeScript project is built on top of Next.js, a popular React framework that supports server-side rendering (SSR) and static generation. The project has a modular structure with 506 modules organized into various directories, each serving specific functionalities. At the top level, we have several key directories such as `app`, `components`, `api`, and `admin`. 

The `app` directory contains subdirectories like `[sc]`, `student`, `ai-query`, `attendance`, and `assessment`, which likely represent different sections or features of the application. The use of dynamic routing with brackets (e.g., `[id]`) suggests that these directories handle routes for specific entities, such as student profiles or assessment results.

The `components` directory houses reusable UI components, including a `charts` subdirectory, indicating that there are visualizations used throughout the application. This modular approach to component organization promotes code reusability and maintainability.

The `api` directory is crucial for handling backend logic and API routes. It contains several subdirectories like `fastapi`, `admin`, and `ai-query`, each responsible for different types of API interactions. For instance, `fastapi/token` might handle authentication tokens using FastAPI, a Python framework, while `admin/fragments` could manage administrative functionalities related to fragments.

The interaction between these components is facilitated by Next.js's built-in routing system and React's component-based architecture. The modular structure allows for clear separation of concerns, making it easier to develop, test, and scale individual parts of the application independently. Additionally, the use of API routes enables serverless functions and backend integrations, enhancing the project's flexibility and performance.

Overall, this architecture is designed to support a complex web application with multiple features and functionalities, leveraging Next.js's capabilities for efficient rendering and management of both client-side and server-side logic.

## Technology Stack

| Layer | Technology |
|-------|------------|
| Language | Typescript |
| Framework | Nextjs |
| Frontend | React |
| Framework | Next.js |
| ORM | Prisma |

## Components

### app\[sc]

**Purpose**: Application core
**Location**: `app\[sc]`



**Key Files:**
- `app\[sc]\layout.tsx` - layout
- `app\[sc]\layout.tsx` - layout


**Key Functions:**
- `SchoolLayout()` - No description
- `SchoolLayout()` - No description

### app\[sc]\student\[id]

**Purpose**: Application core
**Location**: `app\[sc]\student\[id]`



**Key Files:**
- `app\[sc]\student\[id]\loading.tsx` - loading
- `app\[sc]\student\[id]\page.tsx` - page
- `app\[sc]\student\[id]\loading.tsx` - loading
- `app\[sc]\student\[id]\page.tsx` - page


**Key Functions:**
- `Loading()` - No description
- `StudentDemoPage()` - No description
- `Loading()` - No description
- `StudentDemoPage()` - No description

### app\admin

**Purpose**: Application core
**Location**: `app\admin`



**Key Files:**
- `app\admin\page.tsx` - page
- `app\admin\page.tsx` - page


**Key Functions:**
- `AdminPage()` - No description
- `AdminPage()` - No description

### app\ai-query

**Purpose**: Application core
**Location**: `app\ai-query`



**Key Files:**
- `app\ai-query\page.tsx` - page
- `app\ai-query\page.tsx` - page


**Key Functions:**
- `AIQueryPage()` - No description
- `AIQueryPage()` - No description

### app\api\admin\emulate

**Purpose**: API endpoints
**Location**: `app\api\admin\emulate`



**Key Files:**
- `app\api\admin\emulate\route.ts` - route
- `app\api\admin\emulate\route.ts` - route


**Key Functions:**
- `POST()` - No description
- `DELETE()` - No description
- `POST()` - No description
- `DELETE()` - No description

### app\api\admin\fragments\[id]

**Purpose**: API endpoints
**Location**: `app\api\admin\fragments\[id]`



**Key Files:**
- `app\api\admin\fragments\[id]\route.ts` - route
- `app\api\admin\fragments\[id]\route.ts` - route


**Key Functions:**
- `GET()` - No description
- `PUT()` - No description
- `DELETE()` - No description
- `GET()` - No description
- `PUT()` - No description
- `DELETE()` - No description

### app\api\admin\fragments

**Purpose**: API endpoints
**Location**: `app\api\admin\fragments`



**Key Files:**
- `app\api\admin\fragments\route.ts` - route
- `app\api\admin\fragments\route.ts` - route


**Key Functions:**
- `GET()` - No description
- `POST()` - No description
- `GET()` - No description
- `POST()` - No description

### app\api\ai-query\generate

**Purpose**: API endpoints
**Location**: `app\api\ai-query\generate`



**Key Files:**
- `app\api\ai-query\generate\route.ts` - route
- `app\api\ai-query\generate\route.ts` - route


**Key Functions:**
- `filterFragmentsByAccess()` - No description
- `extractSchoolCodesFromSql()` - No description
- `injectSchoolScope()` - No description
- `POST()` - No description
- `filterFragmentsByAccess()` - No description
- `extractSchoolCodesFromSql()` - No description
- `injectSchoolScope()` - No description
- `POST()` - No description

### app\api\fastapi\token

**Purpose**: API endpoints
**Location**: `app\api\fastapi\token`



**Key Files:**
- `app\api\fastapi\token\route.ts` - route
- `app\api\fastapi\token\route.ts` - route


**Key Functions:**
- `POST()` - No description
- `POST()` - No description

### app\api\fastapi\upload

**Purpose**: API endpoints
**Location**: `app\api\fastapi\upload`



**Key Files:**
- `app\api\fastapi\upload\route.ts` - route
- `app\api\fastapi\upload\route.ts` - route


**Key Functions:**
- `POST()` - No description
- `POST()` - No description


## Data Flow

```
Request → Router → Handler → Service → Database
                              ↓
                          Response
```

## API Endpoints

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| GET | `/` | `Page` | - |
| GET | `/admin` | `Page` | - |
| GET | `/ai-query` | `Page` | - |
| GET | `/attendance` | `Page` | - |
| GET | `/gradedistribution` | `Page` | - |
| GET | `/interventions` | `Page` | - |
| GET | `/profile` | `Page` | - |
| GET | `/tests` | `Page` | - |
| GET | `/query/:category/:id` | `Page` | - |
| GET | `/sped/uploadIEP` | `Page` | - |
| GET | `/tests/:label` | `Page` | - |
| GET | `/:sc/student/:id` | `Page` | - |
| POST | `/api/admin/emulate` | `POST` | - |
| DELETE | `/api/admin/emulate` | `DELETE` | - |
| GET | `/api/admin/fragments` | `GET` | - |
| POST | `/api/admin/fragments` | `POST` | - |
| GET | `/api/admin/fragments/:id` | `GET` | - |
| PUT | `/api/admin/fragments/:id` | `PUT` | - |
| DELETE | `/api/admin/fragments/:id` | `DELETE` | - |
| POST | `/api/ai-query/generate` | `POST` | - |
| GET | `/api/auth/:...nextauth` | `GET` | - |
| POST | `/api/fastapi/token` | `POST` | - |
| POST | `/api/fastapi/upload` | `POST` | - |
| GET | `/` | `Page` | - |
| GET | `/admin` | `Page` | - |
| GET | `/ai-query` | `Page` | - |
| GET | `/attendance` | `Page` | - |
| GET | `/gradedistribution` | `Page` | - |
| GET | `/interventions` | `Page` | - |
| GET | `/profile` | `Page` | - |
| GET | `/tests` | `Page` | - |
| GET | `/query/:category/:id` | `Page` | - |
| GET | `/sped/uploadIEP` | `Page` | - |
| GET | `/tests/:label` | `Page` | - |
| GET | `/:sc/student/:id` | `Page` | - |
| POST | `/api/admin/emulate` | `POST` | - |
| DELETE | `/api/admin/emulate` | `DELETE` | - |
| GET | `/api/admin/fragments` | `GET` | - |
| POST | `/api/admin/fragments` | `POST` | - |
| GET | `/api/admin/fragments/:id` | `GET` | - |
| PUT | `/api/admin/fragments/:id` | `PUT` | - |
| DELETE | `/api/admin/fragments/:id` | `DELETE` | - |
| POST | `/api/ai-query/generate` | `POST` | - |
| GET | `/api/auth/:...nextauth` | `GET` | - |
| POST | `/api/fastapi/token` | `POST` | - |
| POST | `/api/fastapi/upload` | `POST` | - |

## Module Dependencies

External dependencies: @/app/components/AIQueryClient, @/app/components/BackButton, @/auth, @/components/ui/alert, @/components/ui/badge, @/components/ui/button, @/components/ui/card, @/components/ui/chart, @/components/ui/checkbox, @/components/ui/collapsible, @/components/ui/dropdown-menu, @/components/ui/input, @/components/ui/label, @/components/ui/separator, @/components/ui/skeleton


## File Structure

```
data-slusd/
├── .eslintrc.json
├── AERIES_SQL_QUERY_VUILDER_TECHNICAL_SPEC.md
├── Aeries_Database_Schema.sql
├── CLAUDE.md
├── CLAUDE_NOTES.md
├── README.md
├── auth.ts
├── auth.ts
├── components.json
├── next.config.mjs
├── .claude/
│   ├── settings.local.json
├── .vscode/
│   ├── settings.json
├── app/
│   ├── layout.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── page.tsx
├── app\[sc]/
│   ├── layout.tsx
│   ├── layout.tsx
├── app\[sc]\student\[id]/
│   ├── loading.tsx
│   ├── loading.tsx
│   ├── page.tsx
│   ├── page.tsx
├── app\admin/
│   ├── page.tsx
│   ├── page.tsx
├── app\ai-query/
│   ├── page.tsx
│   ├── page.tsx
├── app\api\admin\emulate/
│   ├── route.ts
│   ├── route.ts
├── app\api\admin\fragments/
│   ├── route.ts
│   ├── route.ts
├── app\api\admin\fragments\[id]/
│   ├── route.ts
│   ├── route.ts
├── app\api\ai-query\generate/
│   ├── route.ts
│   ├── route.ts
├── app\api\fastapi\token/
│   ├── route.ts
│   ├── route.ts
├── app\api\fastapi\upload/
│   ├── route.ts
│   ├── route.ts
├── app\assessment/
│   ├── layout.tsx
│   ├── layout.tsx
├── app\attendance/
│   ├── page.tsx
│   ├── page.tsx
├── app\components/
│   ├── AIQueryClient.tsx
│   ├── AIQueryClient.tsx
│   ├── ActiveSchool.tsx
│   ├── ActiveSchool.tsx
│   ├── AddClassToUserButton.tsx
│   ├── AddClassToUserButton.tsx
│   ├── AdminTabs.tsx
│   ├── AdminTabs.tsx
│   ├── AggridChart.tsx
│   ├── AggridChart.tsx
├── app\components\charts/
│   ├── AreaChart.tsx
│   ├── AreaChart.tsx
│   ├── AttendanceOverTime.tsx
│   ├── AttendanceOverTime.tsx
│   ├── BarChart.tsx
│   ├── BarChart.tsx
│   ├── BarChartCustom.tsx
│   ├── BarChartCustom.tsx
│   ├── ChartWrapper.tsx
│   ├── ChartWrapper.tsx
├── app\components\forms/
│   ├── AddQueryForm.tsx
│   ├── AddQueryForm.tsx
│   ├── FormDialog.tsx
│   ├── FormDialog.tsx
├── app\components\providers/
│   ├── AGGridProvider.tsx
│   ├── AGGridProvider.tsx
│   ├── SessionProvider.tsx
│   ├── SessionProvider.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeProvider.tsx
```

## Related Documentation

- [[README]] - Project overview
- [[API_REFERENCE]] - API documentation
- [[CONFIGURATION]] - Configuration guide

---

**Generated by**: doc-agent
**Last Generated**: 2025-12-09T09:09:29.939703