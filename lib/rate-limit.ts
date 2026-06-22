const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS = 3

type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get("x-real-ip")
  if (realIp) return realIp.trim()
  return "unknown"
}

export function checkRateLimit(request: Request): {
  rateLimited: boolean
  retryAfter: number
  remaining: number
} {
  const now = Date.now()

  if (store.size > 0) {
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) store.delete(key)
    }
  }

  const key = getClientIp(request)
  const entry = store.get(key)

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { rateLimited: false, retryAfter: 0, remaining: MAX_REQUESTS - 1 }
  }

  entry.count += 1

  if (entry.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return { rateLimited: true, retryAfter, remaining: 0 }
  }

  return {
    rateLimited: false,
    retryAfter: 0,
    remaining: MAX_REQUESTS - entry.count,
  }
}
