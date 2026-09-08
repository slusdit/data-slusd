// Prisma 7 configuration. The CLI (db push, migrate, studio) reads the
// connection URL from here; the runtime client gets its connection through the
// MariaDB driver adapter in lib/db.ts.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
