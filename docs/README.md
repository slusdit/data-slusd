# data-slusd

**Location**: `C:\Users\dmellons\projects\data-slusd`
**Last Updated**: 2025-12-09

## Overview

The "data-slusd" project is a sophisticated web application developed using TypeScript, leveraging the Next.js framework for building server-side rendered (SSR) and statically generated web pages. The project consists of 506 files, encompassing 446 functions and 177 classes, which collectively facilitate a robust and dynamic user experience. The application is structured around several key modules, each serving distinct functionalities.

At the core of the application are the entry points defined in `app/page.tsx` and `app/layout.tsx`, which serve as the primary interfaces for users navigating through the system. The project's architecture is modular, with specific components handling different aspects such as student management (`app\[sc]\student\[id]`) and administrative tasks (`app\admin`). The AI-driven query module (`app\ai-query`) allows users to interact with an artificial intelligence system for generating responses or insights based on their queries.

The backend of the application is well-organized, featuring several API routes that handle various operations. These include routes for admin emulation (`app\api\admin\emulate`), managing fragments (`app\api\admin\fragments`), and interacting with an AI query generation service (`app\api\ai-query`). Additionally, there's a route for handling authentication tokens via FastAPI (`app\api\fastapi\token`).

Overall, the "data-slusd" project is designed to provide a comprehensive platform for managing data, offering both user-friendly interfaces and powerful backend capabilities. Its modular structure ensures scalability and maintainability, making it suitable for evolving requirements and expanding functionalities in the future.

## Features

```markdown
- **Modular Architecture**: The project is organized into multiple classes and functions, promoting code reusability and maintainability.
- **Comprehensive Routing**: With 46 API endpoints, the project supports a wide range of functionalities through robust routing.
- **Next.js Framework**: Leveraging Next.js for server-side rendering and other performance optimizations, enhancing user experience.
- **Data Management**: Functions like `POST`, `DELETE`, `GET`, and `PUT` are implemented to handle CRUD operations efficiently.
- **School-Specific Features**: Classes such as `SchoolLayout`, `StudentDemoPage`, `AdminPage`, and `AIQueryPage` cater to specific school-related functionalities.
- **Security Measures**: The inclusion of an `AuthGuard` suggests robust security measures to protect routes and data.
- **Advanced UI Components**: Components like `StackedBarChartComponent`, `PercentCellRenderer`, and `FilterDisplay` indicate a focus on interactive and informative user interfaces.
- **AI Integration**: Classes such as `AIQueryClient` and functions like `filterFragmentsByAccess` suggest integration with AI technologies for enhanced querying capabilities.
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd data-slusd

# Install dependencies
npm install
# or: yarn install
```

## Usage

```bash
npm run dev   # Development mode
npm run build # Production build
npm start     # Start production server
```

## Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Configuration variable | No |
| `AUTH_GOOGLE_ID` | Configuration variable | No |
| `AUTH_GOOGLE_SECRET` | Configuration variable | No |
| `AUTH_SECRET` | Configuration variable | No |
| `NEXTAUTH_SECRET` | Configuration variable | No |
| `NEXTAUTH_URL` | Configuration variable | No |
| `DB_USER` | Configuration variable | No |
| `DB_PASSWORD` | Configuration variable | No |
| `DB_SERVER` | Configuration variable | No |
| `DB_DATABASE` | Configuration variable | No |
| `AERIES_API_KEY` | Configuration variable | No |
| `NEXT_PUBLIC_AERIES_URL` | Configuration variable | No |
| `QUERY_ASSESSMENT_GRADE_PERCENTAGE` | Configuration variable | No |
| `NEXT_PUBLIC_AG_GRID_LICENSE_KEY` | Configuration variable | No |
| `NEXT_PUBLIC_FAST_API_URL` | Configuration variable | No |
| `NEXT_PUBLIC_FAST_API_USER` | Configuration variable | No |
| `NEXT_PUBLIC_FAST_API_PASSWORD` | Configuration variable | No |
| `LLM_PROVIDER` | Configuration variable | No |
| `LLM_BASE_URL` | Configuration variable | No |
| `LLM_MODEL` | Configuration variable | No |
| `LLM_TEMPERATURE` | Configuration variable | No |
| `LLM_MAX_TOKENS` | Configuration variable | No |
| `DATABASE_URL` | Configuration variable | No |
| `AUTH_GOOGLE_ID` | Configuration variable | No |
| `AUTH_GOOGLE_SECRET` | Configuration variable | No |
| `AUTH_SECRET` | Configuration variable | No |
| `NEXTAUTH_SECRET` | Configuration variable | No |
| `NEXTAUTH_URL` | Configuration variable | No |
| `DB_USER` | Configuration variable | No |
| `DB_PASSWORD` | Configuration variable | No |
| `DB_SERVER` | Configuration variable | No |
| `DB_DATABASE` | Configuration variable | No |
| `AERIES_API_KEY` | Configuration variable | No |
| `NEXT_PUBLIC_AERIES_URL` | Configuration variable | No |
| `QUERY_ASSESSMENT_GRADE_PERCENTAGE` | Configuration variable | No |
| `NEXT_PUBLIC_AG_GRID_LICENSE_KEY` | Configuration variable | No |
| `NEXT_PUBLIC_FAST_API_URL` | Configuration variable | No |
| `NEXT_PUBLIC_FAST_API_USER` | Configuration variable | No |
| `NEXT_PUBLIC_FAST_API_PASSWORD` | Configuration variable | No |
| `LLM_PROVIDER` | Configuration variable | No |
| `LLM_BASE_URL` | Configuration variable | No |
| `LLM_MODEL` | Configuration variable | No |
| `LLM_TEMPERATURE` | Configuration variable | No |
| `LLM_MAX_TOKENS` | Configuration variable | No |

## Directory Structure

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

## Entry Points

- `app/page.tsx`
- `app/layout.tsx`
- `app/page.tsx`
- `app/layout.tsx`

## Dependencies

### Main Dependencies

| Package | Version |
|---------|---------|
| `@auth/prisma-adapter` | ^2.4.1 |
| `@hookform/resolvers` | ^3.6.0 |
| `@prisma/client` | ^6.8.2 |
| `@radix-ui/react-accordion` | ^1.2.0 |
| `@radix-ui/react-avatar` | ^1.1.0 |
| `@radix-ui/react-checkbox` | ^1.1.0 |
| `@radix-ui/react-collapsible` | ^1.1.12 |
| `@radix-ui/react-dialog` | ^1.1.1 |
| `@radix-ui/react-dropdown-menu` | ^2.1.1 |
| `@radix-ui/react-icons` | ^1.3.0 |
| `@radix-ui/react-label` | ^2.1.0 |
| `@radix-ui/react-navigation-menu` | ^1.2.0 |
| `@radix-ui/react-popover` | ^1.1.1 |
| `@radix-ui/react-progress` | ^1.1.7 |
| `@radix-ui/react-scroll-area` | ^1.1.0 |
| `@radix-ui/react-select` | ^2.1.1 |
| `@radix-ui/react-separator` | ^1.1.4 |
| `@radix-ui/react-slot` | ^1.2.4 |
| `@radix-ui/react-switch` | ^1.1.0 |
| `@radix-ui/react-tabs` | ^1.1.13 |
| `@radix-ui/react-tooltip` | ^1.1.2 |
| `@tanstack/react-table` | ^8.19.2 |
| `ag-charts-enterprise` | ^11.0.4 |
| `ag-charts-react` | ^11.0.4 |
| `ag-grid-enterprise` | ^33.0.4 |
| `ag-grid-react` | ^33.0.4 |
| `axios` | ^1.12.2 |
| `chart.js` | ^4.4.3 |
| `class-variance-authority` | ^0.7.0 |
| `clsx` | ^2.1.1 |
| `cmdk` | ^1.0.0 |
| `dotenv` | ^16.5.0 |
| `json-as-xlsx` | ^2.5.6 |
| `lucide-react` | ^0.396.0 |
| `mssql` | ^11.0.0 |
| `next` | ^15.3.1 |
| `next-auth` | ^5.0.0-beta.27 |
| `next-themes` | ^0.3.0 |
| `ngrok` | 5.0.0-beta.2 |
| `react` | ^18 |
| `react-dom` | ^18 |
| `react-dropzone` | ^14.3.8 |
| `react-hook-form` | ^7.52.0 |
| `recharts` | ^2.12.7 |
| `sonner` | ^1.5.0 |
| `sql-formatter` | ^15.4.3 |
| `tailwind-merge` | ^2.3.0 |
| `tailwindcss-animate` | ^1.0.7 |
| `xlsx` | ^0.18.5 |
| `zod` | ^3.23.8 |
| `@auth/prisma-adapter` | ^2.4.1 |
| `@hookform/resolvers` | ^3.6.0 |
| `@prisma/client` | ^6.8.2 |
| `@radix-ui/react-accordion` | ^1.2.0 |
| `@radix-ui/react-avatar` | ^1.1.0 |
| `@radix-ui/react-checkbox` | ^1.1.0 |
| `@radix-ui/react-collapsible` | ^1.1.12 |
| `@radix-ui/react-dialog` | ^1.1.1 |
| `@radix-ui/react-dropdown-menu` | ^2.1.1 |
| `@radix-ui/react-icons` | ^1.3.0 |
| `@radix-ui/react-label` | ^2.1.0 |
| `@radix-ui/react-navigation-menu` | ^1.2.0 |
| `@radix-ui/react-popover` | ^1.1.1 |
| `@radix-ui/react-progress` | ^1.1.7 |
| `@radix-ui/react-scroll-area` | ^1.1.0 |
| `@radix-ui/react-select` | ^2.1.1 |
| `@radix-ui/react-separator` | ^1.1.4 |
| `@radix-ui/react-slot` | ^1.2.4 |
| `@radix-ui/react-switch` | ^1.1.0 |
| `@radix-ui/react-tabs` | ^1.1.13 |
| `@radix-ui/react-tooltip` | ^1.1.2 |
| `@tanstack/react-table` | ^8.19.2 |
| `ag-charts-enterprise` | ^11.0.4 |
| `ag-charts-react` | ^11.0.4 |
| `ag-grid-enterprise` | ^33.0.4 |
| `ag-grid-react` | ^33.0.4 |
| `axios` | ^1.12.2 |
| `chart.js` | ^4.4.3 |
| `class-variance-authority` | ^0.7.0 |
| `clsx` | ^2.1.1 |
| `cmdk` | ^1.0.0 |
| `dotenv` | ^16.5.0 |
| `json-as-xlsx` | ^2.5.6 |
| `lucide-react` | ^0.396.0 |
| `mssql` | ^11.0.0 |
| `next` | ^15.3.1 |
| `next-auth` | ^5.0.0-beta.27 |
| `next-themes` | ^0.3.0 |
| `ngrok` | 5.0.0-beta.2 |
| `react` | ^18 |
| `react-dom` | ^18 |
| `react-dropzone` | ^14.3.8 |
| `react-hook-form` | ^7.52.0 |
| `recharts` | ^2.12.7 |
| `sonner` | ^1.5.0 |
| `sql-formatter` | ^15.4.3 |
| `tailwind-merge` | ^2.3.0 |
| `tailwindcss-animate` | ^1.0.7 |
| `xlsx` | ^0.18.5 |
| `zod` | ^3.23.8 |

### Development Dependencies

| Package | Version |
|---------|---------|
| `@types/mssql` | ^9.1.5 |
| `@types/node` | ^20 |
| `@types/react` | ^18 |
| `@types/react-dom` | ^18 |
| `eslint` | ^8 |
| `eslint-config-next` | 14.2.4 |
| `postcss` | ^8 |
| `prisma` | ^6.8.2 |
| `tailwindcss` | ^3.4.1 |
| `tsx` | ^4.20.3 |
| `typescript` | ^5 |
| `@types/mssql` | ^9.1.5 |
| `@types/node` | ^20 |
| `@types/react` | ^18 |
| `@types/react-dom` | ^18 |
| `eslint` | ^8 |
| `eslint-config-next` | 14.2.4 |
| `postcss` | ^8 |
| `prisma` | ^6.8.2 |
| `tailwindcss` | ^3.4.1 |
| `tsx` | ^4.20.3 |
| `typescript` | ^5 |

## API Reference

See [[API_REFERENCE]] for detailed endpoint documentation.

## Architecture

See [[ARCHITECTURE]] for system design documentation.

## Related Documentation

- [[ARCHITECTURE]] - System architecture documentation
- [[API_REFERENCE]] - API endpoint documentation
- [[CONFIGURATION]] - Configuration guide

---

**Generated by**: doc-agent
**Last Generated**: 2025-12-09T09:09:19.424304