/**
 * Simple in-memory rate limiter
 * For production with multiple servers, consider using @upstash/ratelimit with Redis
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Store rate limit data in memory (per server instance)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the time window
   */
  maxRequests: number;

  /**
   * Time window in seconds
   */
  windowSeconds: number;

  /**
   * Optional: identifier to use for rate limiting (defaults to IP address)
   */
  identifier?: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier for the rate limit (e.g., user ID, IP address)
 * @param config - Rate limit configuration
 * @returns Rate limit result with success status and metadata
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = `${identifier}:${config.windowSeconds}`;

  let entry = rateLimitStore.get(key);

  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired one
    entry = {
      count: 0,
      resetTime: now + config.windowSeconds * 1000,
    };
    rateLimitStore.set(key, entry);
  }

  // Check if limit is exceeded
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    reset: entry.resetTime,
  };
}

/**
 * Higher-order function to wrap API routes with rate limiting
 * @param handler - The API route handler
 * @param config - Rate limit configuration
 * @returns Wrapped handler with rate limiting
 */
export function withRateLimit(
  handler: (req: Request) => Promise<Response>,
  config: RateLimitConfig
): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    // Get identifier from config or fall back to IP address
    const identifier =
      config.identifier ||
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      'unknown';

    const result = checkRateLimit(identifier, config);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests',
          message: `Rate limit exceeded. Try again after ${new Date(result.reset).toISOString()}`,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.reset.toString(),
            'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Add rate limit headers to successful response
    const response = await handler(req);

    response.headers.set('X-RateLimit-Limit', result.limit.toString());
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    response.headers.set('X-RateLimit-Reset', result.reset.toString());

    return response;
  };
}

/**
 * Get rate limit identifier from request (IP or user ID)
 * Prioritizes user ID from session for authenticated requests
 */
export async function getRateLimitIdentifier(
  req: Request,
  userId?: string
): Promise<string> {
  // Use user ID if authenticated, otherwise use IP
  if (userId) {
    return `user:${userId}`;
  }

  // Try to get IP address from headers
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return `ip:${forwardedFor.split(',')[0].trim()}`;
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return `ip:${realIp}`;
  }

  return 'ip:unknown';
}
