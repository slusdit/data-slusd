import { z } from "zod";

/**
 * Server environment validation.
 *
 * Kept lazy on purpose: evaluating (and throwing) at module import time would
 * break `next build`, which loads modules without a full runtime env. Call
 * `validateServerEnv()` from a server entrypoint (or a health check) to fail
 * fast with a single aggregated message instead of opaque errors deep in a
 * request. `getServerEnv()` returns the parsed, typed values.
 */
const serverEnvSchema = z.object({
  // Prisma / MySQL
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // Auth.js
  AUTH_SECRET: z.string().min(1).optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  AUTH_GOOGLE_ID: z.string().min(1, "AUTH_GOOGLE_ID is required"),
  AUTH_GOOGLE_SECRET: z.string().min(1, "AUTH_GOOGLE_SECRET is required"),

  // MSSQL Aeries
  DB_USER: z.string().min(1, "DB_USER is required"),
  DB_PASSWORD: z.string().min(1, "DB_PASSWORD is required"),
  DB_SERVER: z.string().min(1, "DB_SERVER is required"),
  DB_DATABASE: z.string().min(1, "DB_DATABASE is required"),
})
  // Exactly one of the auth secrets must be present.
  .refine((env) => env.AUTH_SECRET || env.NEXTAUTH_SECRET, {
    message: "One of AUTH_SECRET or NEXTAUTH_SECRET is required",
    path: ["AUTH_SECRET"],
  });

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

export function validateServerEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid or missing environment variables:\n${issues}`);
  }
  cached = parsed.data;
  return cached;
}

export function getServerEnv(): ServerEnv {
  return validateServerEnv();
}
