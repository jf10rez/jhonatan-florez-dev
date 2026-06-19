import type { MetricsResponse } from "@/lib/api"

export const revalidate = 600

export async function GET(): Promise<Response> {
  const data: MetricsResponse = {
    github: { repos: 0, stars: 0, contributions: 0, lastCommit: "" },
    npm: { weeklyDownloads: 0 },
    uptime: { status: "up", label: "operational" },
    deploy: { status: "ready", label: "ready" },
    fetchedAt: Date.now(),
  }

  return Response.json(data)
}
