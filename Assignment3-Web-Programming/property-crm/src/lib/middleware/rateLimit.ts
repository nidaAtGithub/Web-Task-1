import { NextRequest, NextResponse } from "next/server";

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// In-memory store (use Redis in production)
const store = new Map<string, RateLimitStore>();

const WINDOW_MS = 60 * 1000; // 1 minute

export function createRateLimiter(maxRequests: number) {
  return function rateLimit(req: NextRequest, identifier: string): NextResponse | null {
    const now = Date.now();
    const key = identifier;

    const record = store.get(key);

    if (!record || now > record.resetTime) {
      store.set(key, { count: 1, resetTime: now + WINDOW_MS });
      return null; // Allow request
    }

    if (record.count >= maxRequests) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((record.resetTime - now) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((record.resetTime - now) / 1000)),
            "X-RateLimit-Limit": String(maxRequests),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    record.count++;
    return null; // Allow request
  };
}

// Agent rate limiter: 50 requests/minute
export const agentRateLimiter = createRateLimiter(50);

// Admin rate limiter: 500 requests/minute (effectively no limit)
export const adminRateLimiter = createRateLimiter(500);

// Auth rate limiter: 10 requests/minute (prevent brute force)
export const authRateLimiter = createRateLimiter(10);

export function getRateLimiter(role?: string) {
  if (role === "admin") return adminRateLimiter;
  return agentRateLimiter;
}
