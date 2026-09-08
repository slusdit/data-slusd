/**
 * MSSQL connection pools for the Aeries databases, one per database name.
 *
 * Pools are created lazily on first use (nothing connects at import time), so
 * a boot-time outage surfaces as a per-request error instead of an unhandled
 * rejection (finding P10). Free of session/auth imports so scripts can reuse it.
 */
import sql from "mssql";

const baseConfig: Omit<sql.config, "database"> = {
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PASSWORD ?? "",
  server: process.env.DB_SERVER ?? "",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  // Driver default is 15000ms; some Aeries reports (e.g. grade distribution)
  // legitimately run longer, so allow more time before timing out.
  requestTimeout: 60000,
  connectionTimeout: 30000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

const poolCache = new Map<string, Promise<sql.ConnectionPool>>();

/** Get (or lazily create) the connection pool for one Aeries database. */
export async function getPoolForDatabase(database: string): Promise<sql.ConnectionPool> {
  let pending = poolCache.get(database);
  if (!pending) {
    pending = new sql.ConnectionPool({ ...baseConfig, database })
      .connect()
      .catch((err) => {
        console.error(`Database connection failed for ${database}:`, err);
        poolCache.delete(database); // let the next call retry
        throw err;
      });
    poolCache.set(database, pending);
  }
  return pending;
}

/** Close every open pool (clean shutdown for scripts). */
export async function closeAllPools(): Promise<void> {
  const pools = [...poolCache.values()];
  poolCache.clear();
  await Promise.allSettled(pools.map(async (p) => (await p).close()));
}
