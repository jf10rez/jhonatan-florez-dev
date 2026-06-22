/* eslint-disable @next/next/no-img-element -- SVGs require dangerouslyAllowSVG for next/image; plain <img> is intentional */
"use client"

import { useEffect, useRef } from "react"

import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import type { Technology } from "@/content/technologies"

const RADIUS = 200
const MAX_SCALE = 1.6
const DURATION = 0.35

type Props = {
  items: Technology[]
}

export function TechnologiesGrid({ items }: Props) {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const cellsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const stage = stageRef.current
    const cells = cellsRef.current.filter(Boolean) as HTMLDivElement[]
    if (!stage || cells.length === 0) return

    const ctx = gsap.context(() => {
      const scalers = cells.map((cell) => {
        const xTo = gsap.quickTo(cell, "scaleX", {
          duration: DURATION,
          ease: "power2.out",
        })
        const yTo = gsap.quickTo(cell, "scaleY", {
          duration: DURATION,
          ease: "power2.out",
        })
        return (v: number) => {
          xTo(v)
          yTo(v)
        }
      })

      const onMove = (e: MouseEvent) => {
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i]!
          const r = cell.getBoundingClientRect()
          const d = Math.hypot(
            e.clientX - (r.left + r.width / 2),
            e.clientY - (r.top + r.height / 2),
          )
          const p = gsap.utils.clamp(
            0,
            1,
            gsap.utils.mapRange(0, RADIUS, 1, 0, d),
          )
          scalers[i]!(1 + (MAX_SCALE - 1) * p)
        }
      }

      const onLeave = () => {
        for (let i = 0; i < scalers.length; i++) {
          scalers[i]!(1)
        }
      }

      stage.addEventListener("mousemove", onMove)
      stage.addEventListener("mouseleave", onLeave)

      return () => {
        stage.removeEventListener("mousemove", onMove)
        stage.removeEventListener("mouseleave", onLeave)
      }
    }, stageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={stageRef}
      className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7"
    >
      {items.map((tech, i) => (
        <div
          key={tech.id}
          ref={(el) => {
            cellsRef.current[i] = el
          }}
          style={{ rotate: `${tech.rotation}deg` }}
          className={cn(
            "group flex aspect-square flex-col items-center justify-center gap-2",
            "rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.8)] p-4",
            "backdrop-blur-sm transition-colors duration-300",
            "hover:border-[rgba(255,59,48,0.4)] hover:shadow-[0_0_15px_rgba(255,59,48,0.15)]",
            "[will-change:transform]",
          )}
        >
          <img
            src={tech.icon}
            alt={tech.name}
            width={40}
            height={40}
            loading="lazy"
            className={cn(
              "h-10 w-10 object-contain",
              "brightness-0 invert opacity-60 transition-all duration-300",
              "group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100",
            )}
          />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa]">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  )
}
