"use client"

import { createElement, useMemo, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import {
  Box,
  Cloud,
  Container,
  Cpu,
  Database,
  HardDrive,
  Layers,
  Server,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { infraEdges, infraNodes, type InfraNode } from "@/content/infrastructure"

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  user: User,
  cloudflare: Cloud,
  nginx: Server,
  nextjs: Layers,
  nodejs: Cpu,
  postgres: Database,
  docker: Container,
  vps: HardDrive,
}

const getIcon = (id: string) => iconMap[id] ?? Box

const isContainerNode = (node: InfraNode) =>
  node.type === "runtime" || node.type === "host"

export function Infrastructure() {
  const t = useTranslations()
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({})
  const [activeId, setActiveId] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  })

  const nodeMap = useMemo(
    () =>
      infraNodes.reduce<Record<string, InfraNode>>((acc, node) => {
        acc[node.id] = node
        return acc
      }, {}),
    []
  )

  const isNodeActive = (node: InfraNode) => activeId === node.id

  const isNodeDimmed = (node: InfraNode) => {
    if (!activeId) return false
    if (isNodeActive(node)) return false
    return !infraEdges.some(
      (e) =>
        (e.from === activeId && e.to === node.id) ||
        (e.to === activeId && e.from === node.id)
    )
  }

  const isEdgeDimmed = (edge: (typeof infraEdges)[number]) => {
    if (!activeId) return false
    return edge.from !== activeId && edge.to !== activeId
  }

  const isEdgeHighlighted = (edge: (typeof infraEdges)[number]) => {
    if (!activeId) return false
    return edge.from === activeId || edge.to === activeId
  }

  const positionTooltip = (el: SVGGElement) => {
    const container = containerRef.current?.getBoundingClientRect()
    const rect = el.getBoundingClientRect()
    if (!container) return
    const tooltipHalfWidth = 112 // matches w-56 (14rem ≈ 224px)
    setTooltipPos({
      left: Math.max(
        tooltipHalfWidth,
        Math.min(
          container.width - tooltipHalfWidth,
          rect.left - container.left + rect.width / 2
        )
      ),
      top: rect.top - container.top - 8,
    })
  }

  const handleActivate = (id: string, el: SVGGElement) => {
    setActiveId(id)
    positionTooltip(el)
  }

  const handleDeactivate = () => setActiveId(null)

  const handleKeyDown = (
    e: React.KeyboardEvent<SVGGElement>,
    node: InfraNode
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const el = nodeRefs.current[node.id]
      if (!el) return
      if (activeId === node.id) {
        handleDeactivate()
      } else {
        handleActivate(node.id, el)
      }
    }
    if (e.key === "Escape") {
      handleDeactivate()
    }
  }

  const activeNode = activeId ? nodeMap[activeId] : null
  const description = activeNode ? t(activeNode.descriptionKey) : ""
  const tooltipLabel = activeNode ? activeNode.label : ""

  return (
    <section
      id="infrastructure"
      className="py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="infrastructure-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="infrastructure-heading"
          className="text-center text-[clamp(1.75rem,4vw,2.5rem)] font-bold uppercase tracking-wider text-white"
        >
          {t("infrastructure.heading")}
        </h2>

        <div
          ref={containerRef}
          className="relative mt-12 select-none"
          role="application"
          aria-label={t("infrastructure.heading")}
        >
          <svg
            viewBox="0 0 940 300"
            className="h-auto w-full"
            role="img"
            aria-label="Infrastructure topology diagram"
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
              <marker
                id="arrowhead-active"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#ff3b30" />
              </marker>
            </defs>

            {/* Hosting containers */}
            {infraNodes.filter(isContainerNode).map((node) => (
              <g
                key={node.id}
                role="img"
                aria-label={`${node.label}: ${t(node.descriptionKey)}`}
              >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    rx="8"
                    className="fill-transparent stroke-[rgba(255,59,48,0.3)]"
                    strokeDasharray="6 6"
                    strokeWidth="1.5"
                  />
                  <foreignObject
                    x={node.x + 12}
                    y={node.y + 8}
                    width={24}
                    height={24}
                  >
                    <div className="flex h-full w-full items-center justify-center text-[#a1a1aa]">
                      {createElement(getIcon(node.icon), { size: 16, strokeWidth: 1.5 })}
                    </div>
                  </foreignObject>
                  <text
                    x={node.x + 40}
                    y={node.y + 24}
                    className="fill-[#a1a1aa] text-[11px] font-medium uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {node.label}
                  </text>
                </g>
            ))}

            {/* Edges */}
            {infraEdges.map((edge) => {
              const from = nodeMap[edge.from]
              const to = nodeMap[edge.to]
              if (!from || !to) return null

              const isHosting = edge.type === "hosting"
              const dimmed = isEdgeDimmed(edge)
              const highlighted = isEdgeHighlighted(edge)

              let x1: number
              let y1: number
              let x2: number
              let y2: number

              if (isHosting) {
                if (edge.from === "vps") {
                  x1 = from.x + from.width / 2
                  y1 = from.y + from.height
                  x2 = to.x + to.width / 2
                  y2 = to.y + to.height
                } else {
                  x1 = to.x + to.width / 2
                  y1 = to.y
                  x2 = from.x + from.width / 2
                  y2 = from.y
                }
              } else {
                x1 = from.x + from.width
                y1 = from.y + from.height / 2
                x2 = to.x
                y2 = to.y + to.height / 2
              }

              const midX = (x1 + x2) / 2
              const midY = (y1 + y2) / 2

              return (
                <g key={`${edge.from}->${edge.to}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className={cn(
                      "transition-all duration-200",
                      isHosting
                        ? "stroke-[#a1a1aa]"
                        : "stroke-[rgba(161,161,170,0.7)]",
                      highlighted && !isHosting && "stroke-[#ff3b30]",
                      highlighted && isHosting && "stroke-white"
                    )}
                    strokeWidth={highlighted ? 2 : 1.5}
                    strokeDasharray={isHosting ? "5 5" : undefined}
                    markerEnd={
                      highlighted && !isHosting
                        ? "url(#arrowhead-active)"
                        : !isHosting
                          ? "url(#arrowhead)"
                          : undefined
                    }
                    opacity={dimmed ? 0.2 : 1}
                  />
                  {edge.label && (
                    <text
                      x={midX}
                      y={midY - 6}
                      textAnchor="middle"
                      className={cn(
                        "fill-[#a1a1aa] text-[9px] uppercase tracking-wider transition-opacity duration-200",
                        highlighted && "fill-white"
                      )}
                      style={{ fontFamily: "var(--font-mono)" }}
                      opacity={dimmed ? 0.25 : 0.8}
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Nodes */}
            {infraNodes
              .filter((node) => !isContainerNode(node))
              .map((node) => {
                const active = isNodeActive(node)
                const dimmed = isNodeDimmed(node)
                const label = t(node.descriptionKey)

                return (
                  <g
                    key={node.id}
                    ref={(el) => {
                      nodeRefs.current[node.id] = el
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.label}: ${label}`}
                    className={cn(
                      "cursor-pointer transition-opacity duration-200 focus:outline-none",
                      active && "opacity-100"
                    )}
                    opacity={dimmed ? 0.35 : 1}
                    onMouseEnter={(e) =>
                      handleActivate(node.id, e.currentTarget)
                    }
                    onMouseMove={(e) => positionTooltip(e.currentTarget)}
                    onMouseLeave={handleDeactivate}
                    onFocus={(e) => handleActivate(node.id, e.currentTarget)}
                    onBlur={handleDeactivate}
                    onKeyDown={(e) => handleKeyDown(e, node)}
                  >
                    <rect
                      x={node.x}
                      y={node.y}
                      width={node.width}
                      height={node.height}
                      rx="6"
                      className={cn(
                        "fill-[#0a0a0a] stroke-[rgba(255,59,48,0.2)] transition-all duration-200",
                        active && "stroke-[#ff3b30] fill-[#111111]"
                      )}
                      strokeWidth={active ? 2 : 1}
                    />
                    <foreignObject
                      x={node.x + 12}
                      y={node.y + 12}
                      width={24}
                      height={24}
                    >
                      <div
                        className={cn(
                          "flex h-full w-full items-center justify-center transition-colors duration-200",
                          active ? "text-[#ff3b30]" : "text-[#a1a1aa]"
                        )}
                      >
                        {createElement(getIcon(node.icon), { size: 18, strokeWidth: 1.5 })}
                      </div>
                    </foreignObject>
                    <text
                      x={node.x + node.width / 2}
                      y={node.y + node.height / 2 + 4}
                      textAnchor="middle"
                      className={cn(
                        "fill-white text-[11px] font-medium transition-colors duration-200",
                        active && "fill-[#ff3b30]"
                      )}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {node.label}
                    </text>
                    {/* Focus ring */}
                    <rect
                      x={node.x - 2}
                      y={node.y - 2}
                      width={node.width + 4}
                      height={node.height + 4}
                      rx="8"
                      className="fill-none stroke-[#ff3b30]"
                      strokeWidth={2}
                      opacity={active ? 1 : 0}
                      pointerEvents="none"
                    />
                  </g>
                )
              })}
          </svg>

          {/* Tooltip */}
          <div
            className={cn(
              "pointer-events-none absolute z-10 w-56 -translate-x-1/2 -translate-y-full rounded-md border border-[rgba(255,59,48,0.2)] bg-[#0a0a0a] px-3 py-2 shadow-lg transition-opacity duration-200",
              activeId ? "opacity-100" : "opacity-0"
            )}
            style={{
              left: tooltipPos.left,
              top: tooltipPos.top,
            }}
            role="tooltip"
            aria-hidden={!activeId}
          >
            <div className="text-xs font-semibold text-white">
              {tooltipLabel}
            </div>
            <div className="mt-1 text-xs leading-relaxed text-[#a1a1aa]">
              {description}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
