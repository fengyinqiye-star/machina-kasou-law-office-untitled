const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS = 3;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}
