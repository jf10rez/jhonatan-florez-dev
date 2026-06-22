export const API_ENDPOINTS = {
  github: "https://api.github.com",
  npmDownloads: "https://api.npmjs.org/downloads/point/last-week",
} as const

export type GithubMetrics = {
  repos: number
  stars: number
  contributions: number
  lastCommit: string | null
}

export type NpmMetrics = {
  weeklyDownloads: number
}

export type UptimeStatus = "up" | "degraded" | "down"

export type DeployStatus = "ready" | "building" | "error"

export type MetricsResponse = {
  github: GithubMetrics | null
  npm: NpmMetrics | null
  uptime: { status: UptimeStatus; uptimePercent: number } | null
  deploy: { status: DeployStatus; lastDeploy: string | null } | null
  fetchedAt: number
}
