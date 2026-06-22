"use client"

import { useRef, useEffect } from "react"
import { useTranslations } from "next-intl"

import { experience } from "@/content/experience"

export function Experience() {
  const t = useTranslations("experience")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const atTop = scrollTop <= 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1
      const scrollingDown = e.deltaY > 0
      const scrollingUp = e.deltaY < 0

      if ((atTop && scrollingUp) || (atBottom && scrollingDown)) {
        return
      }

      e.stopPropagation()
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl font-bold uppercase tracking-wider text-[#ff3b30] sm:text-4xl">
          {t("heading")}
        </h2>

        <div
          ref={scrollRef}
          className="mt-12 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[rgba(255,59,48,0.3)] scrollbar-track-[rgba(255,59,48,0.1)]"
        >
          <ul className="relative space-y-12">
            <div
              className="absolute left-4 top-0 bottom-0 w-px bg-[rgba(255,59,48,0.2)] md:left-1/2 md:-translate-x-px"
              aria-hidden="true"
            />

            {experience.map((item, index) => {
              const prefix = `items.${item.id}`
              const isLeft = index % 2 === 0

              return (
                <li key={item.id} className="relative md:grid md:grid-cols-2 md:gap-8">
                  <div
                    className={`pl-12 md:pl-0 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div
                      className={`rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.8)] p-6 backdrop-blur-sm transition-all hover:border-[rgba(255,59,48,0.4)] hover:shadow-[0_0_15px_rgba(255,59,48,0.15)] ${
                        isLeft ? "md:ml-auto" : ""
                      }`}
                    >
                      <div
                        className={`flex flex-col gap-1 ${
                          isLeft ? "md:items-end" : ""
                        }`}
                      >
                        <span className="font-mono text-xs uppercase tracking-widest text-[#ff3b30]">
                          {item.start} — {item.end}
                        </span>
                        <h3 className="text-xl font-bold tracking-tight text-white">
                          {item.company}
                        </h3>
                        <p className="text-sm text-[#a1a1aa]">{item.role}</p>
                      </div>

                      <div
                        className={`mt-4 flex flex-wrap gap-2 ${
                          isLeft ? "md:justify-end" : ""
                        }`}
                      >
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-[rgba(255,59,48,0.2)] bg-[rgba(17,17,17,0.8)] px-2 py-1 font-mono text-xs text-[#a1a1aa]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 space-y-4 text-sm">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
                            {t("challenge")}
                          </span>
                          <p className="mt-1 text-[#a1a1aa]">
                            {t(`${prefix}.challenge`)}
                          </p>
                        </div>

                        <div>
                          <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
                            {t("actions")}
                          </span>
                          <ul className="mt-1 list-disc space-y-1 pl-4 text-[#a1a1aa]">
                            {item.actionsKeys.map((actionKey, i) => (
                              <li key={i}>{t(`${prefix}.action${i + 1}`)}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(17,17,17,0.5)] p-4">
                          <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
                            {t("results")}
                          </span>
                          <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                            {item.resultHighlight && (
                              <span className="text-2xl font-bold text-[#ff3b30] font-mono">
                                {item.resultHighlight}
                              </span>
                            )}
                            <ul className="list-disc space-y-1 pl-4 text-[#a1a1aa]">
                              {item.resultsKeys.map((resultKey, i) => (
                                <li key={i}>{t(`${prefix}.result${i + 1}`)}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute left-4 top-6 -translate-x-1/2 md:left-1/2 ${
                      isLeft ? "md:top-6" : "md:top-6"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="block size-3 rounded-full border-2 border-[#ff3b30] bg-[#050505]" />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
