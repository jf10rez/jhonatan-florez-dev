"use client"

import { useEffect, useMemo, useState } from "react"
import { useTranslations } from "next-intl"

import type { MetricsResponse } from "@/lib/api"

type Labels = {
  heading: string
  live: string
  github: {
    repos: string
    stars: string
    contributions: string
    lastCommit: string
  }
  npm: {
    weeklyDownloads: string
  }
}

type Props = {
  initialData: MetricsResponse | null
  labels: Labels
}

function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—"
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(value)
}

function formatRelativeTime(dateInput: string | number | Date | null | undefined): string {
  if (!dateInput) return "—"
  const date = new Date(dateInput)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (Number.isNaN(seconds)) return "—"

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })
  const ranges: [number, Intl.RelativeTimeFormatUnit, number][] = [
    [60, "second", 1],
    [3600, "minute", 60],
    [86400, "hour", 3600],
    [2592000, "day", 86400],
    [31536000, "month", 2592000],
  ]

  for (const [limit, unit, divisor] of ranges) {
    if (Math.abs(seconds) < limit) {
      return rtf.format(-Math.floor(seconds / divisor), unit)
    }
  }

  return rtf.format(-Math.floor(seconds / 31536000), "year")
}

function GreenDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
    </span>
  )
}

export function MetricsGrid({ initialData, labels }: Props) {
  const t = useTranslations("liveMetrics")
  const [data, setData] = useState<MetricsResponse | null>(initialData)
  const [isLoading, setIsLoading] = useState(!initialData)

  useEffect(() => {
    let cancelled = false

    const refresh = async () => {
      try {
        const res = await fetch("/api/metrics", { cache: "no-store" })
        if (!res.ok) return
        const json = (await res.json()) as MetricsResponse
        if (!cancelled) setData(json)
      } catch {
        // Ignore client-side refresh errors to keep UI stable.
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    refresh()
    const id = setInterval(refresh, 60000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const cards = useMemo(() => {
    const github = data?.github
    const npm = data?.npm

    return [
      {
        id: "github",
        value: formatNumber(github?.repos),
        label: labels.github.repos,
        sublabel: github
          ? `${formatNumber(github.stars)} ${labels.github.stars.toLowerCase()} · ${formatNumber(github.contributions)} ${labels.github.contributions.toLowerCase()}`
          : "—",
      },
      {
        id: "npm",
        value: formatNumber(npm?.weeklyDownloads),
        label: labels.npm.weeklyDownloads,
        sublabel: npm ? t("status.ready") : "—",
      },
    ]
  }, [data, labels, t])

  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.8)] p-6 animate-pulse"
            aria-hidden="true"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#111111]" />
              <div className="h-3 w-20 rounded bg-[#111111]" />
            </div>
            <div className="mt-4 h-9 w-24 rounded bg-[#111111]" />
            <div className="mt-2 h-4 w-32 rounded bg-[#111111]" />
          </div>
        ))}
      </div>
    )
  }

  const updatedAt = data?.fetchedAt ? formatRelativeTime(data.fetchedAt) : "—"

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.8)] p-6 backdrop-blur-sm transition-all hover:border-[rgba(255,59,48,0.4)] hover:shadow-[0_0_15px_rgba(255,59,48,0.15)]"
          >
            <div className="flex items-center gap-2">
              <GreenDot />
              <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
                {card.label}
              </span>
            </div>
            <span className="mt-4 text-4xl font-bold tracking-tight text-white font-mono sm:text-5xl">
              {card.value}
            </span>
            <span className="mt-1 text-sm text-[#a1a1aa]">{card.sublabel}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa]">
        {t("lastUpdated", { time: updatedAt })}
      </p>
    </>
  )
}
