/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
declare namespace NodeJS {
    interface ProcessEnv {
      // Prisma
      DATABASE_URL: string;
  
      // Google OAuth for Auth.js
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
  
      // Auth.js setup
      AUTH_SECRET: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
  
      // Aeries connection
      DB_USER: string;
      DB_PASSWORD: string;
      DB_SERVER: string;
      DB_DATABASE: string;
  
      // Aeries API
      AERIES_API_KEY: string;
      NEXT_PUBLIC_AERIES_URL: string;
  
      // Query IDs
      QUERY_ASSESSMENT_GRADE_PERCENTAGE: string;
  
      // AG Grid License
      NEXT_PUBLIC_AG_GRID_LICENSE_KEY: string;
    }
  }