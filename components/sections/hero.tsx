"use client"

import { useTranslations } from "next-intl"
import { Download } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const currentlyKeys = ["aiAgents", "infrastructure", "saasProducts"] as const

export function Hero() {
  const t = useTranslations("hero")

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-scanlines"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <p className="font-display text-2xl font-bold uppercase tracking-wider text-[#ff3b30] sm:text-3xl md:text-4xl">
          {t("hello")}
        </p>

        <h1 className="mt-2 text-6xl font-black tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
          JHONATAN FLOREZ
        </h1>

        <p className="mt-6 text-lg font-bold uppercase tracking-wider text-[#ff3b30] sm:text-xl">
          {t("role")}
        </p>

        <p className="mt-4 max-w-2xl text-base text-[#a1a1aa] sm:text-lg">
          {t("valueProposition")}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#projects"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            {t("viewProjects")}
          </Link>
          <a
            href="/resume.pdf"
            download
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <Download className="mr-2 size-4" aria-hidden="true" />
            {t("downloadResume")}
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ff3b30]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff3b30] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#ff3b30]" />
            </span>
            {t("currently.label")}
          </span>
          <ul className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
            {currentlyKeys.map((key) => (
              <li
                key={key}
                className="flex items-center gap-2 font-mono text-sm text-[#a1a1aa]"
              >
                <span className="text-[#ff3b30]" aria-hidden="true">
                  ●
                </span>
                {t(`currently.items.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
