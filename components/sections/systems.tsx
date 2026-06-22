"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"

import { caseStudies, type CaseStudy } from "@/content/case-studies"

function tierBadgeClass(tier: number) {
  switch (tier) {
    case 1:
      return "border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] text-[#10b981]"
    case 2:
      return "border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.1)] text-[#3b82f6]"
    case 3:
      return "border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.1)] text-[#f59e0b]"
    default:
      return "border-[rgba(255,59,48,0.2)] bg-[rgba(17,17,17,0.8)] text-[#a1a1aa]"
  }
}

function ArchitectureDiagram({ study }: { study: CaseStudy }) {
  if (!study.diagram) return null

  const nodeX: Record<string, number> = {
    discord: 40,
    agent: 160,
    llm: 280,
    storage: 400,
  }
  const nodeY = 40

  return (
    <figure className="mt-4 w-full overflow-hidden rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(17,17,17,0.5)] p-4">
      <figcaption className="sr-only">
        Architecture diagram for {study.title}
      </figcaption>
      <svg
        role="img"
        aria-label={`Architecture diagram for ${study.title}`}
        viewBox="0 0 480 90"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#a1a1aa" />
          </marker>
        </defs>

        {study.diagram.edges.map((edge, i) => {
          const fromX = nodeX[edge.from]
          const toX = nodeX[edge.to]
          if (fromX == null || toX == null) return null
          const x1 = fromX + 40
          const y1 = nodeY
          const x2 = toX - 40
          const y2 = nodeY
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#a1a1aa"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
          )
        })}

        {study.diagram.nodes.map((node) => {
          const x = nodeX[node.id]
          if (x == null) return null
          return (
            <g key={node.id}>
              <rect
                x={x - 38}
                y={nodeY - 18}
                width="76"
                height="36"
                rx="6"
                fill="#111111"
                stroke="rgba(255,59,48,0.2)"
                strokeWidth="1"
              />
              <text
                x={x}
                y={nodeY + 4}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontFamily="var(--font-mono)"
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}

function CaseStudyCard({
  study,
  t,
}: {
  study: CaseStudy
  t: ReturnType<typeof useTranslations<"systems">>
}) {
  const prefix = `items.${study.id}` as const
  const statusLabel =
    study.status === "deployed" ? t("status.deployed") : t("status.inDevelopment")

  return (
    <article className="flex h-full flex-col rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.8)] p-6 backdrop-blur-sm transition-all hover:border-[rgba(255,59,48,0.4)] hover:shadow-[0_0_15px_rgba(255,59,48,0.15)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-xl font-bold tracking-tight text-white">{study.title}</h3>
        <span
          className={`rounded-md border px-2.5 py-1 font-mono text-xs uppercase tracking-wider ${tierBadgeClass(
            study.tier
          )}`}
        >
          {study.tier === 1
            ? t("tier.full")
            : study.tier === 2
              ? t("tier.architecture")
              : t("tier.development")}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4 text-sm">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
            {t("problem")}
          </span>
          <p className="mt-1 text-[#a1a1aa]">
            {t(`${prefix}.problem` as Parameters<typeof t>[0])}
          </p>
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
            {t("solution")}
          </span>
          <p className="mt-1 text-[#a1a1aa]">
            {t(`${prefix}.solution` as Parameters<typeof t>[0])}
          </p>
        </div>

        <div className="rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(17,17,17,0.5)] p-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
            {t("impact")}
          </span>
          <div className="mt-2 flex flex-col gap-2">
            {study.impactMetricKey && (
              <span className="text-2xl font-bold text-[#ff3b30] font-mono">
                {t(`${prefix}.metric` as Parameters<typeof t>[0])}
              </span>
            )}
            <p className="text-[#a1a1aa]">
              {t(`${prefix}.impact` as Parameters<typeof t>[0])}
            </p>
          </div>
        </div>
      </div>

      {study.tier === 2 && <ArchitectureDiagram study={study} />}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        {study.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-[rgba(255,59,48,0.2)] bg-[rgba(17,17,17,0.8)] px-2 py-1 font-mono text-xs text-[#a1a1aa]"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[rgba(255,59,48,0.2)] pt-4">
        {study.isPrivate ? (
          <span className="font-mono text-xs text-[#a1a1aa]">
            {t("status.private")} · {statusLabel}
          </span>
        ) : (
          <>
            {study.repoUrl && (
              <a
                href={study.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#ff3b30] underline-offset-4 hover:underline"
              >
                {t("links.repo")}
              </a>
            )}
            {study.npmUrl && (
              <a
                href={study.npmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#ff3b30] underline-offset-4 hover:underline"
              >
                {t("links.npm")}
              </a>
            )}
            {study.demoUrl && (
              <a
                href={study.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#ff3b30] underline-offset-4 hover:underline"
              >
                {t("links.demo")}
              </a>
            )}
            {study.status === "in-development" && (
              <span className="ml-auto rounded-md border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.1)] px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-[#f59e0b]">
                {t("status.inDevelopment")}
              </span>
            )}
          </>
        )}
      </div>
    </article>
  )
}

export function Systems() {
  const t = useTranslations("systems")
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [checkScroll])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("article")?.getBoundingClientRect().width ?? 400
    const scrollAmount = cardWidth + 24
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold uppercase tracking-wider text-[#ff3b30] sm:text-4xl">
            {t("heading")}
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="rounded-full border border-[rgba(255,59,48,0.3)] bg-[rgba(10,10,10,0.9)] p-2.5 text-[#ff3b30] backdrop-blur-sm transition-all hover:border-[rgba(255,59,48,0.6)] hover:bg-[rgba(255,59,48,0.1)] disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="rounded-full border border-[rgba(255,59,48,0.3)] bg-[rgba(10,10,10,0.9)] p-2.5 text-[#ff3b30] backdrop-blur-sm transition-all hover:border-[rgba(255,59,48,0.6)] hover:bg-[rgba(255,59,48,0.1)] disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-12 flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-thin scrollbar-thumb-[rgba(255,59,48,0.3)] scrollbar-track-[rgba(255,59,48,0.1)]"
          style={{ scrollbarGutter: "stable" }}
        >
          {caseStudies.map((study) => (
            <div key={study.id} className="w-[85vw] shrink-0 sm:w-[400px] lg:w-[380px]">
              <CaseStudyCard study={study} t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
