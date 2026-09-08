/**
 * In-memory LRU cache for report query results (one per server process).
 *
 * Keys are the fully scoped SQL plus the database year. Entries are cleared
 * whenever a saved report is edited or deleted (lib/formActions.ts,
 * lib/deleteQuery.ts). This could be swapped for Redis if the app ever runs
 * on more than one instance.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class QueryCache {
  private cache: Map<string, CacheEntry<any>>;
  private maxSize: number;
  private defaultTTL: number; // in milliseconds

  constructor(maxSize: number = 100, defaultTTLSeconds: number = 300) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTLSeconds * 1000;
  }

  /**
   * Generate a cache key from the query text and parameters (e.g. { dbYear }).
   */
  private generateKey(query: string, params?: Record<string, any>): string {
    const normalizedQuery = query.trim().toLowerCase();
    const paramsKey = params ? JSON.stringify(params) : "";
    return `${normalizedQuery}:${paramsKey}`;
  }

  /**
   * Get cached data if it exists and hasn't expired. A hit is moved to the
   * most-recently-used position so eviction is true LRU.
   */
  get<T>(query: string, params?: Record<string, any>): T | null {
    const key = this.generateKey(query, params);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // Map preserves insertion order: re-insert to mark as recently used
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.data as T;
  }

  /**
   * Set cache data with optional TTL
   */
  set<T>(query: string, data: T, params?: Record<string, any>, ttlSeconds?: number): void {
    const key = this.generateKey(query, params);
    const ttl = ttlSeconds ? ttlSeconds * 1000 : this.defaultTTL;

    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Evict the least recently used entry (first key in insertion order)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttl,
    });
  }

  /** Drop every entry (a saved report changed, so any cached rows may be stale). */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Invalidate specific query or all queries matching a pattern
   */
  invalidate(queryPattern?: string): void {
    if (!queryPattern) {
      this.cache.clear();
      return;
    }

    const pattern = queryPattern.trim().toLowerCase();
    for (const [key] of this.cache) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      defaultTTL: this.defaultTTL / 1000,
    };
  }

  /**
   * Clean expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

// Create singleton instance
export const queryCache = new QueryCache(
  100, // Max 100 cached queries
  300  // 5 minute TTL by default
);

// Cleanup expired entries every 5 minutes. unref() so the timer never keeps a
// script or test process alive on its own.
const cleanupTimer = setInterval(() => {
  queryCache.cleanup();
}, 5 * 60 * 1000);
cleanupTimer.unref?.();
