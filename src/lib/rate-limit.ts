// In-memory rate limiter (per-process). Swap with Upstash for production.
type Bucket = { count: number; resetAt: number };
const store = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 20, windowMs = 60_000) {
    const now = Date.now();
    const b = store.get(key);
    if (!b || b.resetAt < now) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return { ok: true, remaining: limit - 1 };
    }
    if (b.count >= limit) return { ok: false, remaining: 0, retryAfter: b.resetAt - now };
    b.count++;
    return { ok: true, remaining: limit - b.count };
}
