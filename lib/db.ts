// Prisma 7 client. Connections go through the MariaDB driver adapter (Prisma 7
// no longer ships its own query engine binary for MySQL). dotenv is loaded so
// command-line scripts that import this module see DATABASE_URL; inside Next it
// is a no-op because the variables are already present.
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

// MySQL 8 accounts use caching_sha2_password. On a plain (non-TLS) connection
// the server only allows the fast auth path while its in-memory cache holds the
// account, so the first connection after a MySQL restart needs full RSA
// authentication, and the MariaDB driver refuses that unless it has the server's
// RSA public key. Without it every connection after a reboot fails with
// ER_CANNOT_RETRIEVE_RSA_KEY ("pool failed to retrieve a connection from pool")
// and sign-in dies with a NextAuth "Configuration" error. Pin the key out of
// band: DATABASE_RSA_PUBLIC_KEY_PATH points at a PEM file holding the output of
// SHOW STATUS LIKE 'Caching_sha2_password_rsa_public_key' (see .env.example).
const connectionString = (url: string): string => {
  const keyPath = process.env.DATABASE_RSA_PUBLIC_KEY_PATH
  if (!keyPath) return url
  try {
    const parsed = new URL(url)
    if (!parsed.searchParams.has('cachingRsaPublicKey')) {
      parsed.searchParams.set('cachingRsaPublicKey', keyPath)
    }
    return parsed.toString()
  } catch {
    return url
  }
}

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }
  return new PrismaClient({ adapter: new PrismaMariaDb(connectionString(url)) })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
