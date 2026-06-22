"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface LazyVideoProps {
  src: string
  alt?: string
  className?: string
}

export function LazyVideo({ src, alt, className }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasBeenVisible = useRef(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasBeenVisible.current) {
          hasBeenVisible.current = true
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "100px" }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current
    if (video && isVisible) {
      setIsHovered(true)
      video.play().catch(() => {})
    }
  }, [isVisible])

  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current
    if (video) {
      setIsHovered(false)
      video.pause()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!hasLoaded && (
        <div className="absolute inset-0 bg-[#111111]" />
      )}
      {isVisible && (
        <>
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setHasLoaded(true)}
            className={className}
            aria-label={alt}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity ${
              isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <svg
              className="h-12 w-12 text-white drop-shadow-lg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}
