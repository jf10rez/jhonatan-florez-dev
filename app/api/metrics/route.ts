import { caseStudies } from "@/content/case-studies"
import { API_ENDPOINTS } from "@/lib/api"
import type { MetricsResponse } from "@/lib/api"
import { siteConfig } from "@/site.config"

export const revalidate = 600

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME

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

export async function GET(): Promise<Response> {
  const username = getGithubUsername()

  const [github, npm] = await Promise.all([
    username ? fetchGitHubMetrics(username) : Promise.resolve(null),
    fetchNpmMetrics(),
  ])

  const data: MetricsResponse = {
    github,
    npm,
    fetchedAt: Date.now(),
  }

  return Response.json(data)
}
