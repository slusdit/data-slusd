// Prisma 7 client. Connections go through the MariaDB driver adapter (Prisma 7
// no longer ships its own query engine binary for MySQL). dotenv is loaded so
// command-line scripts that import this module see DATABASE_URL; inside Next it
// is a no-op because the variables are already present.
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }
  return new PrismaClient({ adapter: new PrismaMariaDb(url) })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
