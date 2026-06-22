import { getTranslations } from "next-intl/server"

import type { MetricsResponse } from "@/lib/api"
import { siteConfig } from "@/site.config"

import { MetricsGrid } from "./metrics-grid"

async function fetchMetrics(): Promise<MetricsResponse | null> {
  try {
    const baseUrl = process.env.SITE_URL
      ? process.env.SITE_URL.replace(/\/$/, "")
      : `https://${siteConfig.domain}`
    const res = await fetch(`${baseUrl}/api/metrics`, {
      next: { revalidate: 600 },
    })
    if (!res.ok) return null
    return (await res.json()) as MetricsResponse
  } catch {
    return null
  }
}

export async function LiveMetrics() {
  const t = await getTranslations("liveMetrics")
  const data = await fetchMetrics()

  const labels = {
    heading: t("heading"),
    live: t("live"),
    github: {
      repos: t("github.repos"),
      stars: t("github.stars"),
      contributions: t("github.contributions"),
      lastCommit: t("github.lastCommit"),
    },
    npm: {
      weeklyDownloads: t("npm.weeklyDownloads"),
    },
    uptime: t("uptime"),
    deploy: t("deploy"),
    status: {
      up: t("status.up"),
      degraded: t("status.degraded"),
      down: t("status.down"),
      ready: t("status.ready"),
      building: t("status.building"),
      error: t("status.error"),
    },
  }

  return (
    <section
      id="live-metrics"
      className="px-6 py-24"
      aria-labelledby="live-metrics-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3b30] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff3b30]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
            {labels.live}
          </span>
        </div>

        <h2
          id="live-metrics-heading"
          className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold uppercase tracking-wider text-[#ff3b30]"
        >
          {labels.heading}
        </h2>

        <MetricsGrid initialData={data} labels={labels} />
      </div>
    </section>
  )
}
