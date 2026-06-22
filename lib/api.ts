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

export type MetricsResponse = {
  github: GithubMetrics | null
  npm: NpmMetrics | null
  fetchedAt: number
}
