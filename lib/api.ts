export const API_ENDPOINTS = {
  github: "https://api.github.com",
  npmDownloads: "https://api.npmjs.org/downloads/point/last-week",
} as const

export type GithubMetrics = {
  repos: number
  stars: number
  contributions: number
  lastCommit: string
}

export type NpmMetrics = {
  weeklyDownloads: number
}

export type UptimeStatus = "up" | "degraded" | "down"

export type DeployStatus = "ready" | "error" | "building"

export type MetricsResponse = {
  github: GithubMetrics
  npm: NpmMetrics
  uptime: { status: UptimeStatus; label: string }
  deploy: { status: DeployStatus; label: string }
  fetchedAt: number
}
