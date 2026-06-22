"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis()
    const onScroll = ScrollTrigger.update
    lenis.on("scroll", onScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement
      let el: HTMLElement | null = target

      while (el && el !== document.body) {
        const style = window.getComputedStyle(el)
        const overflowY = style.overflowY
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          const { scrollTop } = el
          const atTop = scrollTop <= 0
          const atBottom = scrollTop + el.clientHeight >= el.scrollHeight - 1
          const scrollingDown = e.deltaY > 0
          const scrollingUp = e.deltaY < 0

          const shouldPropagate =
            (atTop && scrollingUp) || (atBottom && scrollingDown)

          if (!shouldPropagate) {
            lenis.stop()
          } else {
            lenis.start()
          }
          return
        }
        el = el.parentElement
      }

      lenis.start()
    }

    window.addEventListener("wheel", handleWheel, { passive: true, capture: true })

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true })
      gsap.ticker.remove(raf)
      lenis.off("scroll", onScroll)
      lenis.destroy()
    }
  }, [])
}
