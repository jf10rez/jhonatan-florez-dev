"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, ScrambleTextPlugin } from "@/lib/gsap"

export function useScramble<T extends HTMLElement = HTMLElement>(
  finalText: string,
  duration = 1,
) {
  const ref = useRef<T | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = finalText
      setDone(true)
      return
    }

    void ScrambleTextPlugin
    const tween = gsap.to(el, {
      duration,
      scrambleText: { text: finalText, chars: "upper" },
      onComplete: () => setDone(true),
    })

    return () => {
      tween.kill()
    }
  }, [finalText, duration])

  return { ref, done }
}
