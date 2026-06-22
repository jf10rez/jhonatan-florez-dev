import { caseStudies } from "@/content/case-studies"
import { API_ENDPOINTS } from "@/lib/api"
import type { DeployStatus, MetricsResponse, UptimeStatus } from "@/lib/api"
import { siteConfig } from "@/site.config"

export const revalidate = 600

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const UPTIME_API_URL = process.env.UPTIME_API_URL
const UPTIME_API_KEY = process.env.UPTIME_API_KEY
const DEPLOY_PLATFORM = (process.env.DEPLOY_PLATFORM ?? siteConfig.metrics.deployPlatform) as
  | "vercel"
  | "cloudflare"
  | "none"
const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID
const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID
const CF_PAGES_PROJECT = process.env.CF_PAGES_PROJECT
const CF_API_TOKEN = process.env.CF_API_TOKEN

const USER_AGENT = "portfolio-metrics-bot"

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 8000
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    return res
  } finally {
    clearTimeout(id)
  }
}

function getGithubUsername(): string | null {
  if (GITHUB_USERNAME) return GITHUB_USERNAME
  const match = siteConfig.social.github.match(/github\.com\/([^/]+)/)
  return match?.[1] ?? null
}

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": USER_AGENT,
  }
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`
  return headers
}

async function fetchGitHubMetrics(username: string): Promise<MetricsResponse["github"]> {
  const headers = githubHeaders()

  const [reposRes, eventsRes] = await Promise.all([
    fetchWithTimeout(`https://api.github.com/users/${username}/repos?type=owner&per_page=100`, {
      headers,
    }),
    fetchWithTimeout(`https://api.github.com/users/${username}/events/public`, { headers }),
  ])

  let repos = 0
  let stars = 0

  if (reposRes.ok) {
    const items: Array<{ stargazers_count: number }> = await reposRes.json()
    repos = items.length
    stars = items.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0)
  }

  let contributions: number | null = null
  if (GITHUB_TOKEN) {
    const now = new Date()
    const from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    const to = now
    const query = `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
          }
        }
      }
    `
    const gqlRes = await fetchWithTimeout("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          login: username,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    })
    if (gqlRes.ok) {
      const gql = await gqlRes.json()
      const c = gql?.data?.user?.contributionsCollection
      if (c) {
        contributions =
          (c.totalCommitContributions ?? 0) +
          (c.totalIssueContributions ?? 0) +
          (c.totalPullRequestContributions ?? 0) +
          (c.totalPullRequestReviewContributions ?? 0)
      }
    }
  }

  let lastCommit: string | null = null
  if (eventsRes.ok) {
    const events: Array<{ type: string; created_at: string }> = await eventsRes.json()
    const push = events.find((e) => e.type === "PushEvent")
    if (push) lastCommit = push.created_at
  }

  if (!reposRes.ok && !eventsRes.ok && contributions === null) return null

  return {
    repos,
    stars,
    contributions: contributions ?? 0,
    lastCommit,
  }
}

async function fetchNpmMetrics(): Promise<MetricsResponse["npm"]> {
  const pkg = caseStudies.find((c) => c.tier === 1 && c.npmPackage)?.npmPackage
  if (!pkg || pkg.includes("<") || pkg.trim().length === 0) return null

  const res = await fetchWithTimeout(`${API_ENDPOINTS.npmDownloads}/${encodeURIComponent(pkg)}`).catch(() => null)
  if (!res) return null

  const data: { downloads?: number } = await res.json().catch(() => ({}))
  if (typeof data.downloads !== "number") return null

  return { weeklyDownloads: data.downloads }
}

async function fetchUptimeMetrics(): Promise<MetricsResponse["uptime"]> {
  const provider = siteConfig.metrics.uptimeProvider
  if (provider === "none" || !UPTIME_API_URL || !UPTIME_API_KEY) return null

  const headers: Record<string, string> = { "User-Agent": USER_AGENT }

  if (provider === "betterstack") {
    headers.Authorization = `Bearer ${UPTIME_API_KEY}`
    const res = await fetchWithTimeout(UPTIME_API_URL, { headers }).catch(() => null)
    if (!res || !res.ok) return null
    const data = await res.json().catch(() => null)
    const monitors: Array<{ attributes?: { status?: string; uptime?: number } }> =
      data?.data ?? []
    if (monitors.length === 0) return null

    const statusValues = monitors
      .map((m) => m.attributes?.status?.toLowerCase())
      .filter(Boolean) as string[]

    let status: UptimeStatus = "up"
    if (statusValues.some((s) => s === "down")) status = "down"
    else if (statusValues.some((s) => s === "degraded" || s === "warning")) status = "degraded"

    const uptimes = monitors
      .map((m) => m.attributes?.uptime)
      .filter((u): u is number => typeof u === "number")
    const uptimePercent = uptimes.length
      ? Number((uptimes.reduce((a, b) => a + b, 0) / uptimes.length).toFixed(2))
      : 99.99

    return { status, uptimePercent }
  }

  if (provider === "uptimerobot") {
    headers["Content-Type"] = "application/x-www-form-urlencoded"
    const res = await fetchWithTimeout(UPTIME_API_URL, {
      method: "POST",
      headers,
      body: new URLSearchParams({ api_key: UPTIME_API_KEY, format: "json" }),
    }).catch(() => null)
    if (!res || !res.ok) return null
    const data = await res.json().catch(() => null)
    const monitors: Array<{ status: number; all_time_uptime_ratio?: string }> =
      data?.monitors ?? []
    if (monitors.length === 0) return null

    let status: UptimeStatus = "up"
    if (monitors.some((m) => m.status === 9 || m.status === 8)) status = "down"
    else if (monitors.some((m) => m.status === 2)) status = "up"
    else status = "degraded"

    const ratios = monitors
      .map((m) => parseFloat(m.all_time_uptime_ratio ?? "0"))
      .filter((n) => !Number.isNaN(n))
    const uptimePercent = ratios.length
      ? Number((ratios.reduce((a, b) => a + b, 0) / ratios.length).toFixed(2))
      : 99.99

    return { status, uptimePercent }
  }

  return null
}

async function fetchDeployMetrics(): Promise<MetricsResponse["deploy"]> {
  if (DEPLOY_PLATFORM === "none") return null

  if (DEPLOY_PLATFORM === "vercel" && VERCEL_TOKEN && VERCEL_PROJECT_ID) {
    const res = await fetchWithTimeout(
      `https://api.vercel.com/v6/deployments?projectId=${encodeURIComponent(
        VERCEL_PROJECT_ID
      )}&limit=1`,
      { headers: { Authorization: `Bearer ${VERCEL_TOKEN}`, "User-Agent": USER_AGENT } }
    ).catch(() => null)
    if (!res || !res.ok) return null
    const data = await res.json().catch(() => null)
    const d = data?.deployments?.[0]
    if (!d) return null

    const state = (d.state ?? "").toLowerCase()
    let status: DeployStatus = "ready"
    if (state === "error" || state === "canceled") status = "error"
    else if (state === "building" || state === "queued") status = "building"

    return { status, lastDeploy: d.created ?? null }
  }

  if (DEPLOY_PLATFORM === "cloudflare" && CF_API_TOKEN && CF_ACCOUNT_ID && CF_PAGES_PROJECT) {
    const res = await fetchWithTimeout(
      `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(
        CF_ACCOUNT_ID
      )}/pages/projects/${encodeURIComponent(CF_PAGES_PROJECT)}/deployments`,
      {
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "User-Agent": USER_AGENT,
        },
      }
    ).catch(() => null)
    if (!res || !res.ok) return null
    const data = await res.json().catch(() => null)
    const d = data?.result?.[0]
    if (!d) return null

    const stage = (d.latest_stage?.status ?? "").toLowerCase()
    let status: DeployStatus = "ready"
    if (stage === "failure" || d.environment === "failure") status = "error"
    else if (stage === "active" || stage === "success") status = "ready"
    else status = "building"

    return { status, lastDeploy: d.created_on ?? null }
  }

  return null
}

export async function GET(): Promise<Response> {
  const username = getGithubUsername()

  const [github, npm, uptime, deploy] = await Promise.all([
    username ? fetchGitHubMetrics(username) : Promise.resolve(null),
    fetchNpmMetrics(),
    fetchUptimeMetrics(),
    fetchDeployMetrics(),
  ])

  const data: MetricsResponse = {
    github,
    npm,
    uptime,
    deploy,
    fetchedAt: Date.now(),
  }

  return Response.json(data)
}
