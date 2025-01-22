/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      AUTH_GOOGLE_ID: string
      AUTH_GOOGLE_SECRET: string
      AUTH_SECRET: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
      DB_USER: string
      DB_PASSWORD: string
      DB_SERVER: string
      DB_DATABASE: string
      AERIES_API_KEY: string
      NEXT_PUBLIC_AERIES_URL: string
      QUERY_ASSESSMENT_GRADE_PERCENTAGE: string
    }
  }