import { getTranslations } from "next-intl/server"

import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/site.config"
import { cn } from "@/lib/utils"

export async function Footer() {
  const t = await getTranslations("footer")
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[rgba(255,59,48,0.2)] py-8">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-lg font-bold uppercase tracking-wider text-white sm:text-xl">
            {t("cta")}
          </span>

          <a
            href={`mailto:${siteConfig.email}`}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {t("ctaButton")}
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[rgba(255,59,48,0.1)] pt-6 text-xs text-[#a1a1aa] sm:flex-row">
          <span className="font-mono">
            {t("rights", { year, name: siteConfig.name })}
          </span>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono transition-colors hover:text-[#ff3b30]"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono transition-colors hover:text-[#ff3b30]"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono transition-colors hover:text-[#ff3b30]"
              aria-label="Email"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
