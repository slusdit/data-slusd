# data-slusd - API Reference

**Location**: `C:\Users\dmellons\projects\data-slusd`
**Last Updated**: 2025-12-09

## Base URL

```
http://localhost:3000
```

## Authentication

Authentication is required for protected endpoints. See the auth module for details.

## Endpoints

### General

#### GET /


**Handler**: `app\page.tsx:Page`




---

#### GET /


**Handler**: `app\page.tsx:Page`




---

### ADMIN

#### GET /admin


**Handler**: `app\admin\page.tsx:Page`




---

#### GET /admin


**Handler**: `app\admin\page.tsx:Page`




---

### AI-QUERY

#### GET /ai-query


**Handler**: `app\ai-query\page.tsx:Page`




---

#### GET /ai-query


**Handler**: `app\ai-query\page.tsx:Page`




---

### ATTENDANCE

#### GET /attendance


**Handler**: `app\attendance\page.tsx:Page`




---

#### GET /attendance


**Handler**: `app\attendance\page.tsx:Page`




---

### GRADEDISTRIBUTION

#### GET /gradedistribution


**Handler**: `app\gradedistribution\page.tsx:Page`




---

#### GET /gradedistribution


**Handler**: `app\gradedistribution\page.tsx:Page`




---

### INTERVENTIONS

#### GET /interventions


**Handler**: `app\interventions\page.tsx:Page`




---

#### GET /interventions


**Handler**: `app\interventions\page.tsx:Page`




---

### PROFILE

#### GET /profile


**Handler**: `app\profile\page.tsx:Page`




---

#### GET /profile


**Handler**: `app\profile\page.tsx:Page`




---

### TESTS

#### GET /tests


**Handler**: `app\tests\page.tsx:Page`




---

#### GET /tests/:label


**Handler**: `app\tests\[label]\page.tsx:Page`




---

#### GET /tests


**Handler**: `app\tests\page.tsx:Page`




---

#### GET /tests/:label


**Handler**: `app\tests\[label]\page.tsx:Page`




---

### QUERY

#### GET /query/:category/:id


**Handler**: `app\query\[category]\[id]\page.tsx:Page`




---

#### GET /query/:category/:id


**Handler**: `app\query\[category]\[id]\page.tsx:Page`




---

### SPED

#### GET /sped/uploadIEP


**Handler**: `app\sped\uploadIEP\page.tsx:Page`




---

#### GET /sped/uploadIEP


**Handler**: `app\sped\uploadIEP\page.tsx:Page`




---

### :SC

#### GET /:sc/student/:id


**Handler**: `app\[sc]\student\[id]\page.tsx:Page`




---

#### GET /:sc/student/:id


**Handler**: `app\[sc]\student\[id]\page.tsx:Page`




---

### API

#### POST /api/admin/emulate


**Handler**: `app\api\admin\emulate\route.ts:POST`




---

#### DELETE /api/admin/emulate


**Handler**: `app\api\admin\emulate\route.ts:DELETE`




---

#### GET /api/admin/fragments


**Handler**: `app\api\admin\fragments\route.ts:GET`




---

#### POST /api/admin/fragments


**Handler**: `app\api\admin\fragments\route.ts:POST`




---

#### GET /api/admin/fragments/:id


**Handler**: `app\api\admin\fragments\[id]\route.ts:GET`




---

#### PUT /api/admin/fragments/:id


**Handler**: `app\api\admin\fragments\[id]\route.ts:PUT`




---

#### DELETE /api/admin/fragments/:id


**Handler**: `app\api\admin\fragments\[id]\route.ts:DELETE`




---

#### POST /api/ai-query/generate


**Handler**: `app\api\ai-query\generate\route.ts:POST`




---

#### GET /api/auth/:...nextauth


**Handler**: `app\api\auth\[...nextauth]\route.ts:GET`




---

#### POST /api/fastapi/token


**Handler**: `app\api\fastapi\token\route.ts:POST`




---

#### POST /api/fastapi/upload


**Handler**: `app\api\fastapi\upload\route.ts:POST`




---

#### POST /api/admin/emulate


**Handler**: `app\api\admin\emulate\route.ts:POST`




---

#### DELETE /api/admin/emulate


**Handler**: `app\api\admin\emulate\route.ts:DELETE`




---

#### GET /api/admin/fragments


**Handler**: `app\api\admin\fragments\route.ts:GET`




---

#### POST /api/admin/fragments


**Handler**: `app\api\admin\fragments\route.ts:POST`




---

#### GET /api/admin/fragments/:id


**Handler**: `app\api\admin\fragments\[id]\route.ts:GET`




---

#### PUT /api/admin/fragments/:id


**Handler**: `app\api\admin\fragments\[id]\route.ts:PUT`




---

#### DELETE /api/admin/fragments/:id


**Handler**: `app\api\admin\fragments\[id]\route.ts:DELETE`




---

#### POST /api/ai-query/generate


**Handler**: `app\api\ai-query\generate\route.ts:POST`




---

#### GET /api/auth/:...nextauth


**Handler**: `app\api\auth\[...nextauth]\route.ts:GET`




---

#### POST /api/fastapi/token


**Handler**: `app\api\fastapi\token\route.ts:POST`




---

#### POST /api/fastapi/upload


**Handler**: `app\api\fastapi\upload\route.ts:POST`




---


## Public Functions

### layout

#### `async function SpedLayout()`




### loading

#### `function Loading()`




### page

#### `function MailingSetupPage()`




### route

#### `async function POST(request: NextRequest)`


**Parameters:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `request` | `NextRequest` | - | - |


### ActiveSchool

#### `function ActiveSchool()`




### AddClassToUserButton

#### `function AddClassToUserButton()`




### AdminTabs

#### `function AdminTabs()`




### AggridChart

#### `function StackedBarChartComponent()`




### AIQueryClient

#### `function FilterDisplay()`




#### `function AIQueryClient()`




### ApiGradeDistribution

#### `function PercentCellRenderer(props)`


**Parameters:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `props` | `Any` | - | - |


#### `function ApiGradeDistribution()`





## Public Classes

### `LLMClient`



**Methods:**

- `function constructor(config: LLMConfig)` - No description
- `async function chat(messages: ChatMessage[]): Promise<LLMResponse>` - No description

### `QueryComposer`



**Methods:**

- `function constructor(library: FragmentLibrary)` - No description
- `function buildIndex(library: FragmentLibrary): Map<string, Fragment>` - No description
- `function getFragment(id: string): Fragment | undefined` - No description
- `function compose(interpretation: AIInterpretation): CompositionResult` - No description
- `function resolveDependencies(fragments: Fragment[], errors: CompositionError[]): Fragment[]` - No description
- `function assembleQuery(fragments: Fragment[], parameters: Record<string, unknown>): string` - No description
- `function substituteParameters(query: string, parameters: Record<string, unknown>): string` - No description
- `function formatQuery(query: string): string` - No description
- `function estimateComplexity(fragments: Fragment[]): 'simple' | 'moderate' | 'complex'` - No description
- `function generateExplanation(fragments: Fragment[], interpretation: AIInterpretation): QueryExplanation` - No description

### `LLMClient`



**Methods:**

- `function constructor(config: LLMConfig)` - No description
- `async function chat(messages: ChatMessage[]): Promise<LLMResponse>` - No description

### `QueryComposer`



**Methods:**

- `function constructor(library: FragmentLibrary)` - No description
- `function buildIndex(library: FragmentLibrary): Map<string, Fragment>` - No description
- `function getFragment(id: string): Fragment | undefined` - No description
- `function compose(interpretation: AIInterpretation): CompositionResult` - No description
- `function resolveDependencies(fragments: Fragment[], errors: CompositionError[]): Fragment[]` - No description
- `function assembleQuery(fragments: Fragment[], parameters: Record<string, unknown>): string` - No description
- `function substituteParameters(query: string, parameters: Record<string, unknown>): string` - No description
- `function formatQuery(query: string): string` - No description
- `function estimateComplexity(fragments: Fragment[]): 'simple' | 'moderate' | 'complex'` - No description
- `function generateExplanation(fragments: Fragment[], interpretation: AIInterpretation): QueryExplanation` - No description

### `settings.local`

JSON object with 1 keys: permissions



### `.eslintrc`

JSON object with 1 keys: extends



### `settings`

JSON object with 1 keys: sqltools.connections



### `AERIES_SQL_QUERY_VUILDER_TECHNICAL_SPEC`

Markdown document with 2126 lines, 64 headings.
Structure: Aeries SQL Query Builder - Technical Implementation Specification, Project Overview, Technology Stack, File Structure, Data Structures, Fragment Library Schema (`data/query-builder/fragments.json`), AI Interpretation Response Schema, Composition Result Schema, API Endpoints, POST `/api/query-builder/generate`

Preview:
# Aeries SQL Query Builder - Technical Implementation Specification

## Project Overview

Build a Next.js feature that allows users to type natural language requests like "give me all students at Jefferson with an IEP" and receive a valid SQL query for the Aeries Student Information System (SIS). The system uses an LLM to interpret the request and maps it to pre-defined SQL fragments stored in a JSON database, then composes them into executable queries.

**Integration Note**: This feature will b...



### `CLAUDE`

Markdown document with 93 lines, 19 headings.
Structure: CLAUDE.md, Project Overview, Development Commands, Install dependencies, Run development server (localhost only), Run development server (accessible from network), Build for production, Run linting, Sync Prisma schema to database, Generate Prisma client after schema changes

Preview:
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SLUSD Data is an internal data dashboard for San Leandro Unified School District. It provides school staff with access to student data, reports, and analytics through a role-based permission system.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost only)
npm run dev

# Run development server (accessible f...



### `CLAUDE_NOTES`

Markdown document with 361 lines, 35 headings.
Structure: SLUSD Data - Project Notes, Overview, Tech Stack, Core, UI, Data, Auth, Forms, Project Structure, Key Features

Preview:
# SLUSD Data - Project Notes

## Overview
**Project:** SLUSD Data Analytics Platform
**URL:** https://data.slusd.us
**Purpose:** Real-time educational data dashboard for San Luis Unified School District - attendance, grades, interventions, IEP management

---

## Tech Stack

### Core
- **Next.js 15.3.1** (App Router, Server Components, Turbopack)
- **React 18** + **TypeScript 5**
- **Tailwind CSS 3.4.1**

### UI
- **Radix UI** + **shadcn/ui** - Component library
- **AG Grid Enterprise** - Data t...



### `components`

JSON object with 6 keys: $schema, style, rsc, tsx, tailwind, aliases



### `API_REFERENCE`

Markdown document with 812 lines, 121 headings.
Structure: data-slusd - API Reference, Base URL, Authentication, Endpoints, General, GET /, GET /, ADMIN, GET /admin, GET /admin

Preview:
# data-slusd - API Reference

**Location**: `C:\Users\dmellons\projects\data-slusd`
**Last Updated**: 2025-12-09

## Base URL

```
http://localhost:3000
```

## Authentication

Authentication is required for protected endpoints. See the auth module for details.

## Endpoints

### General

#### GET /


**Handler**: `app\page.tsx:Page`




---

#### GET /


**Handler**: `app\page.tsx:Page`




---

### ADMIN

#### GET /admin


**Handler**: `app\admin\page.tsx:Page`




---

#### GET /admin


**Han...



### `ARCHITECTURE`

Markdown document with 379 lines, 19 headings.
Structure: data-slusd - Architecture, System Overview, Technology Stack, Components, app\[sc], app\[sc]\student\[id], app\admin, app\ai-query, app\api\admin\emulate, app\api\admin\fragments\[id]

Preview:
# data-slusd - Architecture

**Location**: `C:\Users\dmellons\projects\data-slusd`
**Last Updated**: 2025-12-09

## System Overview

The described TypeScript project is built using Next.js, a popular React framework that supports server-side rendering (SSR) and static site generation (SSG). The project has a modular structure with 361 modules organized into various directories, each serving specific functionalities. At the top level, the `app` directory contains most of the application's compone...



### `CONFIGURATION`

Markdown document with 130 lines, 16 headings.
Structure: data-slusd - Configuration, Overview, Environment Variables, Configuration Files, package.json, tsconfig.json, .env.example, Package Configuration, package.json, next.config.js

Preview:
# data-slusd - Configuration

**Location**: `C:\Users\dmellons\projects\data-slusd`
**Last Updated**: 2025-12-09

## Overview

This document describes the configuration options for data-slusd.

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Configuration variable | No | - |
| `AUTH_GOOGLE_ID` | Configuration variable | No | - |
| `AUTH_GOOGLE_SECRET` | Configuration variable | No | - |
| `AUTH_SECRET` |...



### `2025-12-09`

Markdown document with 2103 lines, 303 headings.
Structure: Daily Log - 2025-12-09, Session: Documentation for data-slusd, Goals, Completed, 1. Generated readme, 2. Generated architecture, 3. Generated dependencies, 4. Generated api_reference, 5. Generated configuration, 6. Generated database

Preview:
# Daily Log - 2025-12-09

## Session: Documentation for data-slusd

### Goals
Generate vault-style documentation for data-slusd

### Completed

#### 1. Generated readme
- **Location:** `README.md`
Created data-slusd README


#### 2. Generated architecture
- **Location:** `ARCHITECTURE.md`
Created data-slusd Architecture


#### 3. Generated dependencies
- **Location:** `DEPENDENCIES.md`
Created data-slusd Dependencies


#### 4. Generated api_reference
- **Location:** `API_REFERENCE.md`
Created da...



### `DATABASE`

Markdown document with 594 lines, 27 headings.
Structure: Database Schema, Overview, Tables, User, Account, Session, VerificationToken, Authenticator, Role, SchoolInfo

Preview:
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
| `updatedAt` | DateTime | NO |  | None...



### `DEPENDENCIES`

Markdown document with 303 lines, 8 headings.
Structure: data-slusd - File Dependencies, Overview, Most Depended-Upon Files, Files With Most Dependencies, Entry Points, External Dependencies, Dependency Graph, Understanding the Graph

Preview:
# data-slusd - File Dependencies

> Auto-generated dependency analysis
> Generated: 2025-12-09

## Overview

| Metric | Value |
|--------|-------|
| Total Files | 195 |
| Internal Dependencies | 0 |
| External Packages | 30 |

---

## Most Depended-Upon Files

These files are imported by many other files. Changes here may have wide impact:


---

## Files With Most Dependencies

These files import many other modules:


---

## Entry Points

Files that are not imported by other project files (pot...



### `.eslintrc`

Markdown document with 43 lines, 5 headings.
Structure: .eslintrc, Overview, Classes, `.eslintrc`, Related Modules

Preview:
# .eslintrc

**Location**: `.eslintrc.json`
**Language**: Unknown
**Lines**: 0

## Overview

**Asset Type:** JSON
**File Size:** 43.0 B

**Structure:**
  - type: object
  - keys: extends
  - key_count: 1

**Content:**
JSON object with 1 keys: extends


## Classes

### `.eslintrc`

JSON object with 1 keys: extends






---




## Related Modules


---

**Generated by**: doc-agent
**Last Generated**: 2025-12-09T09:07:09.298948...



### `ActiveSchool`

Markdown document with 52 lines, 6 headings.
Structure: ActiveSchool, Overview, Dependencies, Functions, `ActiveSchool`, Related Modules

Preview:
# ActiveSchool

**Location**: `app\components\ActiveSchool.tsx`
**Language**: Typescript
**Lines**: 124

## Overview

The `ActiveSchool.tsx` file in the `app/components` directory is a TypeScript React component module. It contains the `ActiveSchool` function, which is likely responsible for rendering UI elements related to an active school context within an application. The module may also include classes that support or enhance the functionality of the `ActiveSchool` component.

## Dependencie...



### `AddClassToUserButton`

Markdown document with 49 lines, 6 headings.
Structure: AddClassToUserButton, Overview, Dependencies, Functions, `AddClassToUserButton`, Related Modules

Preview:
# AddClassToUserButton

**Location**: `app\components\AddClassToUserButton.tsx`
**Language**: Typescript
**Lines**: 39

## Overview

This TypeScript module, located at `app/components/AddClassToUserButton.tsx`, contains a React component named `AddClassToUserButton`. This component is designed to facilitate the addition of a class to a user, likely through an interactive button in a web application's user interface.

## Dependencies

- `@/components/ui/button` (Button)
- `@/components/ui/input` ...




## Error Handling

Standard HTTP error codes are returned for failed requests.

## Related Documentation

- [[README]] - Project overview
- [[ARCHITECTURE]] - System architecture

---

**Generated by**: doc-agent
**Last Generated**: 2025-12-09T09:09:29.970886