type Bucket = number[];

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit = MAX_REQUESTS,
  windowMs = WINDOW_MS
): { success: true } | { success: false; retryAfterSec: number } {
  const now = Date.now();
  const cutoff = now - windowMs;
  const prior = buckets.get(key) ?? [];
  const recent = prior.filter((ts) => ts > cutoff);

  if (recent.length >= limit) {
    const oldest = recent[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    buckets.set(key, recent);
    return { success: false, retryAfterSec };
  }

  recent.push(now);
  buckets.set(key, recent);
  return { success: true };
}
