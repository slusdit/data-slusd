/**
 * In-memory LRU cache for query results
 * This can be easily replaced with Redis in production
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
   * Generate a cache key from query string and parameters
   */
  private generateKey(query: string, params?: Record<string, any>): string {
    const normalizedQuery = query.trim().toLowerCase();
    const paramsKey = params ? JSON.stringify(params) : '';
    return `${normalizedQuery}:${paramsKey}`;
  }

  /**
   * Get cached data if it exists and hasn't expired
   */
  get<T>(query: string, params?: Record<string, any>): T | null {
    const key = this.generateKey(query, params);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set cache data with optional TTL
   */
  set<T>(query: string, data: T, params?: Record<string, any>, ttlSeconds?: number): void {
    const key = this.generateKey(query, params);
    const ttl = ttlSeconds ? ttlSeconds * 1000 : this.defaultTTL;

    // If cache is full, remove oldest entry (LRU)
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttl,
    });
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

// Cleanup expired entries every 5 minutes
setInterval(() => {
  queryCache.cleanup();
}, 5 * 60 * 1000);
