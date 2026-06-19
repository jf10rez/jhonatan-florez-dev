"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function useGsap<T extends HTMLElement = HTMLElement>(
  setup: (context: gsap.Context, self: T | null) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const scope = gsap.context((self) => {
      setup(self, ref.current)
    }, ref)

    return () => scope.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

export { ScrollTrigger }
